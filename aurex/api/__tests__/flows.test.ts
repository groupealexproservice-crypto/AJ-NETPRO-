import { beforeAll, describe, expect, it } from "vitest";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { migrate } from "drizzle-orm/mysql2/migrator";
import mysql from "mysql2/promise";
import app from "../boot";
import { appRouter } from "../router";
import { getDb } from "../queries/connection";
import { clientItems, organizations, projects, users } from "@db/schema";
import { hashPassword, passwordProblem, verifyPassword } from "../auth/password";
import { signSession } from "../auth/session";
import type { TrpcContext } from "../context";

const tomorrow = () => { const d = new Date(); d.setDate(d.getDate() + 2); return d.toISOString().slice(0, 10); };
const yesterday = () => { const d = new Date(); d.setDate(d.getDate() - 2); return d.toISOString().slice(0, 10); };

const base = {
  name: "Marie Tremblay", email: "marie@example.com", company: "Atelier Exemple", phone: "514 555 0100", locale: "fr" as const,
  consent: true as const, website: "",
};
const diagnostic = {
  ...base, mode: "diagnostic" as const, sector: "services-professionnels", budget: "a-definir",
  currentSituation: "Équipe de dix personnes, suivi des clients dispersé.", objectives: "Structurer l’acquisition d’ici douze mois.",
  challenges: "Prospection irrégulière et outils non connectés.", services: ["conseil-strategique-analyse-affaires"], message: "",
};

let adminUser: typeof users.$inferSelect, clientA: typeof users.$inferSelect, clientB: typeof users.$inferSelect;
let orgA: number, orgB: number, itemA: number, projectB: number;

const caller = (user?: typeof users.$inferSelect) =>
  appRouter.createCaller({ req: new Request("http://localhost/api/trpc"), resHeaders: new Headers(), user } as TrpcContext);
const cookieFor = async (user: typeof users.$inferSelect) => ({ cookie: `aurex_sid=${await signSession(user.id)}` });

beforeAll(async () => {
  const connection = await mysql.createConnection(process.env.DATABASE_URL!);
  await migrate(drizzle(connection), { migrationsFolder: "./db/migrations" });
  await connection.query("SET FOREIGN_KEY_CHECKS=0");
  for (const table of ["clientItems", "projects", "users", "organizations", "leads", "notifications", "integrationEvents", "offerPricing", "trustItems", "analyticsEvents"]) await connection.query(`TRUNCATE TABLE \`${table}\``);
  await connection.end();

  const db = getDb();
  [{ id: orgA }] = await db.insert(organizations).values({ name: "Organisation A" }).$returningId();
  [{ id: orgB }] = await db.insert(organizations).values({ name: "Organisation B" }).$returningId();
  const make = async (email: string, role: "admin" | "client", organizationId: number | null) => {
    const [{ id }] = await db.insert(users).values({ email, name: email, role, organizationId, passwordHash: hashPassword("Mot-de-passe-2026") }).$returningId();
    return (await db.select().from(users).where(sql`${users.id} = ${id}`))[0];
  };
  adminUser = await make("admin@test.local", "admin", null);
  clientA = await make("a@test.local", "client", orgA);
  clientB = await make("b@test.local", "client", orgB);
  [{ id: projectB }] = await db.insert(projects).values({ organizationId: orgB, name: "Projet confidentiel B" }).$returningId();

  await mkdir(process.env.UPLOAD_DIR!, { recursive: true });
  const key = "a".repeat(32);
  await writeFile(path.join(process.env.UPLOAD_DIR!, key), "contenu confidentiel de A");
  [{ id: itemA }] = await db.insert(clientItems).values({ organizationId: orgA, type: "document", title: "Rapport A", fileKey: key, fileName: "rapport-a.pdf", fileMime: "application/pdf", fileSize: 25 }).$returningId();
  await db.insert(clientItems).values({ organizationId: orgB, type: "report", title: "Rapport B secret" });
});

describe("passwords", () => {
  it("hashes and verifies, and rejects weak passwords", () => {
    const hash = hashPassword("Une-phrase-2026");
    expect(verifyPassword("Une-phrase-2026", hash)).toBe(true);
    expect(verifyPassword("autre", hash)).toBe(false);
    expect(passwordProblem("court1")).toBeTruthy();
    expect(passwordProblem("uniquementdeslettres")).toBeTruthy();
  });
});

describe("commercial requests", () => {
  it("stores a diagnostic and shows it to the administrator with a tracking reference", async () => {
    const result = await caller().leads.create(diagnostic);
    expect(result.reference).toMatch(/^AUR-\d{4}-[A-Z0-9]{5}$/);
    const overview = await caller(adminUser).admin.overview();
    const lead = overview.leads.find((l) => l.reference === result.reference);
    expect(lead).toMatchObject({ mode: "diagnostic", status: "new", company: "Atelier Exemple", consent: true, consentTextVersion: "2026-11-v1" });
    expect(lead?.currentSituation).toContain("dix personnes");
  });

  it("rejects incomplete diagnostics and missing consent", async () => {
    await expect(caller().leads.create({ ...diagnostic, objectives: "" })).rejects.toThrow();
    await expect(caller().leads.create({ ...diagnostic, services: [] })).rejects.toThrow();
    await expect(caller().leads.create({ ...diagnostic, sector: "inconnu" })).rejects.toThrow();
    await expect(caller().leads.create({ ...diagnostic, consent: false as unknown as true })).rejects.toThrow();
  });

  it("records a consultation as a request to confirm, with solution, engagement type and slot", async () => {
    const result = await caller().leads.create({ ...base, mode: "appointment", sector: "construction-immobilier", solution: "performance", engagementType: "monthly", preferredDate: tomorrow(), timeSlot: "afternoon", message: "Premier échange sur l’acquisition." });
    expect(result.status).toBe("to_confirm");
    const lead = (await caller(adminUser).admin.overview()).leads.find((l) => l.reference === result.reference);
    expect(lead).toMatchObject({ solution: "performance", engagementType: "monthly", timeSlot: "afternoon", status: "new", confirmedAt: null });
  });

  it("rejects consultation dates in the past and unknown slots", async () => {
    const appointment = { ...base, mode: "appointment" as const, sector: "construction-immobilier", engagementType: "mandate", message: "Premier échange.", timeSlot: "morning" };
    await expect(caller().leads.create({ ...appointment, preferredDate: yesterday() })).rejects.toThrow();
    await expect(caller().leads.create({ ...appointment, preferredDate: tomorrow(), timeSlot: "midnight" })).rejects.toThrow();
  });

  it("silently ignores honeypot submissions", async () => {
    const before = (await caller(adminUser).admin.overview()).leads.length;
    await caller().leads.create({ ...diagnostic, website: "http://spam.example" });
    expect((await caller(adminUser).admin.overview()).leads.length).toBe(before);
  });

  it("requires a distinct consent for the newsletter and is idempotent", async () => {
    await expect(caller().leads.subscribe({ email: "x@example.com", consent: false as unknown as true, locale: "fr", website: "" })).rejects.toThrow();
    await caller().leads.subscribe({ email: "nl@example.com", consent: true, locale: "en", website: "" });
    await caller().leads.subscribe({ email: "nl@example.com", consent: true, locale: "en", website: "" });
    const rows = (await caller(adminUser).admin.overview()).leads.filter((l) => l.mode === "newsletter" && l.email === "nl@example.com");
    expect(rows).toHaveLength(1);
    await caller().leads.unsubscribe({ email: "nl@example.com" });
    const after = (await caller(adminUser).admin.overview()).leads.find((l) => l.email === "nl@example.com");
    expect(after?.unsubscribedAt).toBeTruthy();
  });
});

describe("authorization", () => {
  it("lets a client see only their own organization", async () => {
    const view = await caller(clientA).portal.overview();
    expect(view.organization).toBe("Organisation A");
    expect(view.items.map((i) => i.title)).toEqual(["Rapport A"]);
    expect(view.projects).toHaveLength(0);
    expect(JSON.stringify(view)).not.toContain("fileKey");
    expect(JSON.stringify(view)).not.toContain("secret");
  });

  it("refuses a client who attaches a message to another organization's project", async () => {
    await expect(caller(clientA).portal.sendMessage({ projectId: projectB, title: "Bonjour", body: "Test d’accès" })).rejects.toMatchObject({ code: "FORBIDDEN" });
  });

  it("keeps administration for administrators only", async () => {
    await expect(caller().admin.overview()).rejects.toMatchObject({ code: "UNAUTHORIZED" });
    await expect(caller(clientA).admin.overview()).rejects.toMatchObject({ code: "FORBIDDEN" });
    await expect(caller(clientA).admin.createOrganization({ name: "Pirate" })).rejects.toMatchObject({ code: "FORBIDDEN" });
    await expect(caller().portal.overview()).rejects.toMatchObject({ code: "UNAUTHORIZED" });
  });

  it("serves a document to its own organization and to administrators, and refuses everyone else", async () => {
    const get = async (user?: typeof users.$inferSelect) => app.request(`/api/files/${itemA}`, { headers: user ? await cookieFor(user) : {} });
    const own = await get(clientA);
    expect(own.status).toBe(200);
    expect(await own.text()).toBe("contenu confidentiel de A");
    expect(own.headers.get("content-disposition")).toContain("attachment");
    expect((await get(adminUser)).status).toBe(200);
    expect((await get(clientB)).status).toBe(404);
    expect((await get()).status).toBe(401);
    expect((await app.request("/api/files/999999", { headers: await cookieFor(clientA) })).status).toBe(404);
  });

  it("refuses uploads from clients", async () => {
    const form = new FormData(); form.append("file", new File(["x"], "x.pdf", { type: "application/pdf" }));
    const res = await app.request("/api/admin/upload", { method: "POST", body: form, headers: await cookieFor(clientA) });
    expect(res.status).toBe(403);
  });

  it("refuses a deactivated account's session", async () => {
    const headers = await cookieFor(clientB);
    await getDb().update(users).set({ active: false }).where(sql`${users.id} = ${clientB.id}`);
    expect((await app.request(`/api/files/${itemA}`, { headers })).status).toBe(401);
    await getDb().update(users).set({ active: true }).where(sql`${users.id} = ${clientB.id}`);
  });

  it("rejects wrong credentials and issues an HttpOnly cookie for valid ones", async () => {
    await expect(caller().auth.login({ email: "a@test.local", password: "mauvais" })).rejects.toMatchObject({ code: "UNAUTHORIZED" });
    const headers = new Headers();
    const ctx = { req: new Request("http://localhost/api/trpc"), resHeaders: headers } as TrpcContext;
    await appRouter.createCaller(ctx).auth.login({ email: "a@test.local", password: "Mot-de-passe-2026" });
    expect(headers.get("set-cookie")).toMatch(/aurex_sid=.+HttpOnly/i);
  });

  it("refuses cross-site writes", async () => {
    const res = await app.request("/api/trpc/leads.subscribe", { method: "POST", headers: { origin: "https://evil.example", host: "aurex.test", "content-type": "application/json" }, body: "{}" });
    expect(res.status).toBe(403);
  });

  it("keeps prices and credibility content private until management publishes and verifies them", async () => {
    const admin = caller(adminUser);
    await expect(caller(clientA).admin.upsertPricing({ slug: "essentiel", priceText: "1 $", timeline: "", published: true })).rejects.toMatchObject({ code: "FORBIDDEN" });
    await expect(admin.admin.upsertPricing({ slug: "essentiel", priceText: "", timeline: "", published: true })).rejects.toThrow();
    expect(await caller().content.pricing()).toEqual([]);
    await admin.admin.upsertPricing({ slug: "essentiel", priceText: "Prix de test, taxes en sus", timeline: "", published: false });
    expect(await caller().content.pricing()).toEqual([]);
    await admin.admin.upsertPricing({ slug: "essentiel", priceText: "Prix de test, taxes en sus", timeline: "", published: true });
    expect(await caller().content.pricing()).toEqual([{ slug: "essentiel", priceText: "Prix de test, taxes en sus", timeline: null }]);

    const item = { kind: "testimonial" as const, titleFr: "Titre", titleEn: "Title", bodyFr: "", bodyEn: "", name: "", role: "", url: "", verified: false, published: false };
    await expect(admin.admin.upsertTrustItem({ ...item, published: true })).rejects.toThrow();
    await expect(admin.admin.upsertTrustItem({ ...item, verified: true, url: "javascript:alert(1)" })).rejects.toThrow();
    await admin.admin.upsertTrustItem({ ...item, verified: true, published: false });
    expect(await caller().content.trust()).toEqual([]);
    await admin.admin.upsertTrustItem({ ...item, titleFr: "Publié", verified: true, published: true });
    expect((await caller().content.trust()).map((t) => t.titleFr)).toEqual(["Publié"]);
  });

  it("records anonymous analytics events from an allowed list only", async () => {
    await caller().analytics.track({ name: "page_view", path: "/fr/tarifs", lang: "fr" });
    await expect(caller().analytics.track({ name: "secret" as never, path: "/fr", lang: "fr" })).rejects.toThrow();
    await expect(caller().analytics.track({ name: "page_view", path: "/fr?email=a@b.c", lang: "fr" })).rejects.toThrow();
    const stats = await caller(adminUser).admin.stats();
    expect(stats.funnel.visits).toBe(1);
  });

  it("exposes only the fixed Montréal identity until management sets other company details", async () => {
    const company = await caller().content.company();
    expect(company).toMatchObject({ city: "Montréal", region: "QC", country: "CA" });
    for (const key of ["email", "phone", "street", "postalCode", "privacyOfficerEmail", "legalName"] as const) expect(company[key]).toBeUndefined();
  });
});
