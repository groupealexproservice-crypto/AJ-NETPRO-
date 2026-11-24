import { useCallback, useEffect, useRef, useState, type FormEvent, type KeyboardEvent, type ReactNode } from "react";
import { ArrowRight, Send, Sparkles, X } from "lucide-react";
import { useLanguage } from "../i18n";
import { trpc } from "../providers/trpc";
import { Link } from "./LocaleLink";
import { OPEN_ASSISTANT_EVENT, openAssistant } from "../lib/assistant";

type Source = { title: string; path: string };
type Turn = { role: "user" | "assistant"; content: string; sources?: Source[]; mode?: "ai" | "knowledge"; degraded?: boolean };


/** A question box that hands the visitor's words to the advisor. */
export function AskAurex({ placeholder, label }: { placeholder: string; label: string }) {
  const [value, setValue] = useState("");
  const submit = (event: FormEvent) => { event.preventDefault(); openAssistant(value.trim() || undefined); setValue(""); };
  return (
    <form className="ask-aurex" onSubmit={submit}>
      <label className="sr-only" htmlFor="ask-aurex-input">{label}</label>
      <input id="ask-aurex-input" value={value} onChange={(e) => setValue(e.target.value)} placeholder={placeholder} maxLength={300} autoComplete="off" />
      <button type="submit" aria-label={label}><Send size={18} /></button>
    </form>
  );
}

/** Minimal, safe formatting: paragraphs, "- " lists and **bold**. No HTML is ever injected. */
function inline(text: string): ReactNode[] {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) => (part.startsWith("**") && part.endsWith("**") ? <strong key={i}>{part.slice(2, -2)}</strong> : part));
}
function Formatted({ text }: { text: string }) {
  const blocks = text.split(/\n{2,}/);
  return <>{blocks.map((block, i) => {
    const lines = block.split("\n").filter(Boolean);
    const items = lines.filter((l) => /^\s*[-•]\s+/.test(l));
    if (items.length && items.length === lines.length) return <ul key={i}>{lines.map((l, j) => <li key={j}>{inline(l.replace(/^\s*[-•]\s+/, ""))}</li>)}</ul>;
    return <p key={i}>{lines.map((l, j) => <span key={j}>{j > 0 && <br />}{inline(l)}</span>)}</p>;
  })}</>;
}

/** Reveals an answer word by word, unless the visitor prefers reduced motion. */
function Reveal({ text, animate, onTick }: { text: string; animate: boolean; onTick: () => void }) {
  const words = text.split(/(\s+)/);
  const [count, setCount] = useState(animate ? 0 : words.length);
  useEffect(() => {
    if (!animate) return;
    const timer = window.setInterval(() => { setCount((c) => { const next = Math.min(c + 8, words.length); if (next >= words.length) window.clearInterval(timer); return next; }); onTick(); }, 22);
    return () => window.clearInterval(timer);
  }, [animate, words.length, onTick]);
  return <Formatted text={words.slice(0, count).join("")} />;
}

export function AssistantChat() {
  const { lang, t } = useLanguage();
  const fr = lang === "fr";
  const [open, setOpen] = useState(false);
  const [turns, setTurns] = useState<Turn[]>([]);
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const status = trpc.assistant.status.useQuery(undefined, { staleTime: 5 * 60_000 });
  const ask = trpc.assistant.ask.useMutation();
  const reduced = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const suggestions = fr
    ? ["Comment AUREX peut-il m’aider à gagner plus de clients ?", "Comment fonctionne l’automatisation par l’IA ?", "Combien coûtent vos services ?", "Quels indicateurs suivez-vous ?"]
    : ["How can AUREX help me win more customers?", "How does AI automation work?", "How much do your services cost?", "Which indicators do you track?"];

  const scroll = useCallback(() => { const el = listRef.current; if (el) el.scrollTop = el.scrollHeight; }, []);
  useEffect(scroll, [turns, ask.isPending, scroll]);

  const send = useCallback((text: string) => {
    const content = text.trim();
    if (!content || ask.isPending) return;
    setError("");
    const next: Turn[] = [...turns, { role: "user", content }];
    setTurns(next);
    setInput("");
    ask.mutate({ lang, messages: next.slice(-10).map(({ role, content: c }) => ({ role, content: c.slice(0, role === "user" ? 800 : 1500) })) }, {
      onSuccess: (result) => setTurns((current) => [...current, { role: "assistant", content: result.answer, sources: result.sources, mode: result.mode, degraded: result.degraded }]),
      onError: (e) => setError(e.data?.code === "TOO_MANY_REQUESTS" ? (fr ? "Trop de questions pour le moment. Réessayez dans quelques minutes ou demandez une consultation." : "Too many questions right now. Try again in a few minutes or request a consultation.") : (fr ? "Le conseiller est momentanément indisponible. Vous pouvez demander une consultation." : "The advisor is temporarily unavailable. You can request a consultation.")),
    });
  }, [ask, lang, turns, fr]);

  useEffect(() => {
    const handler = (event: Event) => {
      const query = (event as CustomEvent<{ query?: string }>).detail?.query;
      setOpen(true);
      if (query) window.setTimeout(() => send(query), 50);
    };
    window.addEventListener(OPEN_ASSISTANT_EVENT, handler);
    return () => window.removeEventListener(OPEN_ASSISTANT_EVENT, handler);
  }, [send]);

  const wasOpen = useRef(false);
  useEffect(() => {
    if (open) inputRef.current?.focus();
    else if (wasOpen.current) launcherRef.current?.focus();
    wasOpen.current = open;
  }, [open]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: globalThis.KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const onKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => { if (event.key === "Enter" && !event.shiftKey) { event.preventDefault(); send(input); } };
  const mode = status.data?.mode;
  const lastIndex = turns.length - 1;

  return (
    <>
      {!open && (
        <button ref={launcherRef} type="button" className="assistant-launcher" onClick={() => setOpen(true)} aria-haspopup="dialog" aria-label={lang === "fr" ? "Ouvrir le conseiller IA" : "Open the AI advisor"}>
          <Sparkles size={18} aria-hidden="true" /><span>{fr ? "Conseiller IA" : "AI advisor"}</span><i aria-hidden="true" />
        </button>
      )}
      {open && (
        <section className="assistant-panel" role="dialog" aria-label={fr ? "Conseiller IA AUREX" : "AUREX AI advisor"}>
          <header>
            <div><strong>{fr ? "Conseiller IA AUREX" : "AUREX AI advisor"}</strong><span className="assistant-mode">{mode === "ai" ? (fr ? "IA générative" : "Generative AI") : (fr ? "Guide de connaissances AUREX" : "AUREX knowledge guide")}</span></div>
            <button type="button" onClick={() => setOpen(false)} aria-label={t("close")}><X size={20} /></button>
          </header>
          <p className="assistant-notice">{fr ? "Réponses générées automatiquement à partir de l’information publiée par AUREX : à valider avec l’équipe. Ne saisissez aucun renseignement personnel ici ; la conversation n’est pas conservée." : "Answers are generated automatically from information published by AUREX: to be validated with the team. Do not enter personal information here; the conversation is not stored."}</p>
          <div className="assistant-messages" ref={listRef} aria-live="polite">
            <div className="assistant-bubble assistant-bubble-bot">
              <p>{fr ? "Bonjour. Je peux vous expliquer les expertises, les offres, les secteurs et la démarche d’AUREX Solutions. Quel est votre objectif ?" : "Hello. I can explain AUREX Solutions' expertise, offers, industries and approach. What is your objective?"}</p>
            </div>
            {turns.length === 0 && <div className="assistant-chips">{suggestions.map((s) => <button key={s} type="button" onClick={() => send(s)}>{s}</button>)}</div>}
            {turns.map((turn, index) => (
              <div key={index} className={`assistant-bubble ${turn.role === "user" ? "assistant-bubble-user" : "assistant-bubble-bot"}`}>
                {turn.role === "user" ? <p>{turn.content}</p> : (
                  <>
                    <Reveal text={turn.content} animate={!reduced && index === lastIndex} onTick={scroll} />
                    {turn.sources && turn.sources.length > 0 && (
                      <div className="assistant-sources"><span>{fr ? "Pour aller plus loin" : "Learn more"}</span>{turn.sources.map((s) => <Link key={s.path} to={s.path.replace(/^\/(fr|en)/, "") || "/"} onClick={() => setOpen(false)}>{s.title}<ArrowRight size={14} /></Link>)}</div>
                    )}
                    <div className="assistant-actions"><Link to="/consultation" onClick={() => setOpen(false)}>{t("consult")}</Link><Link to="/simulateur" onClick={() => setOpen(false)}>{t("simulator")}</Link></div>
                  </>
                )}
              </div>
            ))}
            {ask.isPending && <div className="assistant-bubble assistant-bubble-bot assistant-typing" aria-label={fr ? "Le conseiller rédige une réponse" : "The advisor is writing"}><i /><i /><i /></div>}
            {error && <p className="form-error" role="alert">{error}</p>}
          </div>
          <form className="assistant-form" onSubmit={(e) => { e.preventDefault(); send(input); }}>
            <label className="sr-only" htmlFor="assistant-input">{fr ? "Votre question" : "Your question"}</label>
            <textarea id="assistant-input" ref={inputRef} rows={2} maxLength={800} value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={onKeyDown} placeholder={fr ? "Posez votre question…" : "Ask your question…"} />
            <button type="submit" disabled={ask.isPending || !input.trim()} aria-label={fr ? "Envoyer" : "Send"}><Send size={18} /></button>
          </form>
        </section>
      )}
    </>
  );
}
