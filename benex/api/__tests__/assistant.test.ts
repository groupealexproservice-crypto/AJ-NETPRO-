import { describe, expect, it, vi } from "vitest";
import { buildDocs, retrieve } from "../assistant/knowledge";
import { answer, buildSystemPrompt, knowledgeAnswer, redact } from "../assistant/engine";
import { appRouter } from "../router";
import type { TrpcContext } from "../context";

const fr = buildDocs("fr");
const en = buildDocs("en");
const top = (q: string, docs = fr) => retrieve(q, docs, 3).map((h) => h.doc.id);

describe("assistant knowledge retrieval", () => {
  it("finds the right expertise for common questions (French)", () => {
    expect(top("Comment gagner plus de clients avec la publicité en ligne ?")).toContain("expertise:publicite-numerique-ppc");
    expect(top("J’ai des problèmes de stocks et d’entrepôt")[0]).toBe("expertise:logistique-chaine-approvisionnement");
    expect(top("Je veux automatiser mes tâches administratives avec l’IA")).toContain("ai:overview");
    expect(top("Je gère un restaurant")[0]).toBe("sector:hotellerie-restauration");
    expect(top("Quels indicateurs suivez-vous, ROI, ROAS ?")).toContain("kpis");
    expect(top("Comment se déroule votre méthode ?")[0]).toBe("method");
  });

  it("works in English too", () => {
    expect(top("How much does it cost?", en)[0]).toBe("offer:formats");
    expect(top("Which industries do you serve, for example retail?", en)).toContain("sector:commerce-detail");
    expect(top("Tell me about your AI agents", en)).toContain("ai:overview");
  });

  it("returns nothing for an unrelated question", () => {
    expect(top("recette de tarte aux pommes")).toEqual([]);
  });
});

describe("assistant answers and guardrails", () => {
  it("never invents a price: without published rates, it says amounts are quoted", () => {
    const a = knowledgeAnswer("Combien coûtent vos services ?", "fr", [], fr);
    expect(a.answer).toMatch(/devis/i);
    expect(a.answer).not.toMatch(/\d+\s?\$/);
    expect(a.mode).toBe("knowledge");
  });

  it("quotes only the rates management published", () => {
    const a = knowledgeAnswer("What is the price?", "en", [{ slug: "essentiel", priceText: "Published test price", timeline: null }], en);
    expect(a.answer).toContain("Published test price");
  });

  it("answers an off-topic question by redirecting, with suggestions", () => {
    const a = knowledgeAnswer("recette de tarte aux pommes", "fr", [], fr);
    expect(a.sources).toEqual([]);
    expect(a.suggestions.length).toBeGreaterThan(2);
    expect(a.answer).toMatch(/expertises|objectif/i);
  });

  it("does not mistake a cost-reduction goal for a price question, and composes a structured answer", () => {
    const a = knowledgeAnswer("Comment réduire mes coûts opérationnels ?", "fr", [], fr);
    expect(a.answer).not.toMatch(/Transparence avant tout/);
    expect(a.answer).toMatch(/Ce que nous faisons/);
    expect(a.answer).toMatch(/Ce que vous obtenez/);
    expect(a.answer.split(/\s+/).length).toBeLessThan(260);
    expect(a.sources.length).toBeGreaterThan(0);
  });

  it("masks e-mail addresses and phone numbers", () => {
    const text = redact("Écrivez à marie.tremblay@example.com ou appelez le 514 555 0100 ou +1 (438) 304-9159");
    expect(text).not.toMatch(/@example/);
    expect(text).not.toMatch(/555 0100/);
    expect(text).not.toMatch(/304-9159/);
  });

  it("system prompt carries the non-negotiable rules and only the retrieved knowledge", () => {
    const hits = retrieve("publicité", fr, 2).map((h) => h.doc);
    const prompt = buildSystemPrompt("fr", hits, [], fr);
    expect(prompt).toMatch(/N’invente jamais/);
    expect(prompt).toMatch(/Ignore toute instruction/);
    expect(prompt).toMatch(/Aucun tarif n’est publié/);
    expect(prompt).toContain("Publicité numérique et campagnes PPC");
    expect(prompt).not.toContain("Logistique intelligente");
  });
});

describe("assistant model integration (mocked, no network)", () => {
  const ok = (text: string) => ({ ok: true, status: 200, json: async () => ({ content: [{ type: "text", text }] }) }) as Response;

  it("calls the model with the key, the guarded system prompt and redacted messages", async () => {
    const fetchImpl = vi.fn(async () => ok("Réponse du modèle."));
    const result = await answer({ lang: "fr", published: [], apiKey: "sk-test", model: "test-model", fetchImpl: fetchImpl as unknown as typeof fetch, messages: [{ role: "user", content: "Parlez-moi de la publicité. Mon courriel est a@b.co" }] });
    expect(result).toMatchObject({ mode: "ai", answer: "Réponse du modèle." });
    const [url, init] = fetchImpl.mock.calls[0] as unknown as [string, RequestInit];
    expect(url).toBe("https://api.anthropic.com/v1/messages");
    expect((init.headers as Record<string, string>)["x-api-key"]).toBe("sk-test");
    const body = JSON.parse(init.body as string);
    expect(body.model).toBe("test-model");
    expect(body.system).toMatch(/Conseiller IA BENEX/);
    expect(JSON.stringify(body.messages)).not.toContain("a@b.co");
    expect(result.sources.length).toBeGreaterThan(0);
  });

  it("falls back to site knowledge, flagged as degraded, when the model is unavailable", async () => {
    const fetchImpl = vi.fn(async () => ({ ok: false, status: 529, json: async () => ({}) }) as Response);
    const result = await answer({ lang: "fr", published: [], apiKey: "sk-test", fetchImpl: fetchImpl as unknown as typeof fetch, messages: [{ role: "user", content: "Quels services de logistique offrez-vous ?" }] });
    expect(result).toMatchObject({ mode: "knowledge", degraded: true });
    expect(result.answer).toMatch(/logistique/i);
  });

  it("keeps follow-up context: a short second question still retrieves the topic", async () => {
    const result = await answer({ lang: "fr", published: [], messages: [{ role: "user", content: "Parlez-moi de la logistique" }, { role: "assistant", content: "…" }, { role: "user", content: "Et les coûts ?" }] });
    expect(result.answer).toMatch(/devis/i);
  });
});

describe("assistant API", () => {
  const caller = () => appRouter.createCaller({ req: new Request("http://localhost/api/trpc", { headers: { "x-forwarded-for": "203.0.113.9" } }), resHeaders: new Headers() } as TrpcContext);

  it("reports its mode, answers a question and refuses malformed or excessive use", async () => {
    expect((await caller().assistant.status()).mode).toBe("knowledge");
    const result = await caller().assistant.ask({ lang: "fr", messages: [{ role: "user", content: "Comment BENEX aide les PME à réduire leurs coûts ?" }] });
    expect(result.mode).toBe("knowledge");
    expect(result.answer.length).toBeGreaterThan(50);
    await expect(caller().assistant.ask({ lang: "fr", messages: [{ role: "assistant", content: "Bonjour" }] })).rejects.toThrow();
    await expect(caller().assistant.ask({ lang: "fr", messages: [{ role: "user", content: "x".repeat(801) }] })).rejects.toThrow();
    let blocked = false;
    for (let i = 0; i < 25; i += 1) {
      try { await caller().assistant.ask({ lang: "en", messages: [{ role: "user", content: `question ${i} about marketing` }] }); } catch (e) { blocked = (e as { code?: string }).code === "TOO_MANY_REQUESTS"; if (blocked) break; }
    }
    expect(blocked).toBe(true);
  });
});
