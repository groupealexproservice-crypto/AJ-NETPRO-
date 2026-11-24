import { z } from "zod";
import { randomInt } from "node:crypto";
import { and, eq } from "drizzle-orm";
import { TRPCError } from "@trpc/server";
import { CONSENT_TEXT_VERSION, ENGAGEMENT_TYPES, TIME_SLOTS } from "@contracts/constants";
import { createRouter, publicQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { leads, notifications } from "@db/schema";
import { aiTiers, expertises, sectors, tiers } from "../src/content";
import { emit } from "./integrations";

const ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
export function newReference(): string {
  const code = Array.from({ length: 5 }, () => ALPHABET[randomInt(ALPHABET.length)]).join("");
  return `BNX-${new Date().getFullYear()}-${code}`;
}

const sectorSlugs = new Set(sectors.map((s) => s.slug));
const expertiseSlugs = new Set(expertises.map((e) => e.slug));
const solutionSlugs = new Set([...tiers, ...aiTiers].map((s) => s.slug));

const text = (min: number, max: number) => z.string().trim().min(min).max(max);
const optional = (max: number) => z.string().trim().max(max).optional().default("");

const leadInput = z.object({
  mode: z.enum(["contact", "diagnostic", "quote", "appointment"]),
  name: text(2, 255),
  email: z.string().trim().toLowerCase().pipe(z.email().max(320)),
  company: text(1, 255),
  phone: z.string().trim().max(50).regex(/^[0-9+()\-.\s]*$/, "phone").optional().default(""),
  sector: optional(120),
  budget: optional(80),
  currentSituation: optional(4000),
  objectives: optional(4000),
  challenges: optional(4000),
  message: optional(8000),
  services: z.array(z.string().max(120)).max(8).default([]),
  solution: optional(80),
  engagementType: optional(40),
  preferredDate: optional(10),
  timeSlot: optional(40),
  consent: z.literal(true),
  locale: z.enum(["fr", "en"]),
  website: z.string().max(200).optional().default(""),
}).superRefine((v, ctx) => {
  const fail = (path: string, message: string) => ctx.addIssue({ code: "custom", path: [path], message });
  if (v.sector && !sectorSlugs.has(v.sector)) fail("sector", "unknown sector");
  if (v.services.some((s) => !expertiseSlugs.has(s))) fail("services", "unknown expertise");
  if (v.solution && !solutionSlugs.has(v.solution)) fail("solution", "unknown solution");
  if (v.engagementType && !(ENGAGEMENT_TYPES as readonly string[]).includes(v.engagementType)) fail("engagementType", "unknown engagement type");
  if (v.mode === "contact" && v.message.length < 10) fail("message", "required");
  if (v.mode === "diagnostic") {
    if (!v.sector) fail("sector", "required");
    if (v.currentSituation.length < 10) fail("currentSituation", "required");
    if (v.objectives.length < 10) fail("objectives", "required");
    if (v.challenges.length < 10) fail("challenges", "required");
    if (v.services.length < 1) fail("services", "required");
  }
  if (v.mode === "quote" || v.mode === "appointment") {
    if (!v.sector) fail("sector", "required");
    if (v.message.length < 10) fail("message", "required");
    if (!v.engagementType) fail("engagementType", "required");
  }
  if (v.mode === "appointment") {
    if (!(TIME_SLOTS as readonly string[]).includes(v.timeSlot)) fail("timeSlot", "required");
    const date = /^\d{4}-\d{2}-\d{2}$/.test(v.preferredDate) ? new Date(`${v.preferredDate}T12:00:00`) : null;
    const today = new Date(); today.setHours(0, 0, 0, 0);
    const limit = new Date(today); limit.setFullYear(limit.getFullYear() + 1);
    if (!date || Number.isNaN(date.getTime()) || date < today || date > limit) fail("preferredDate", "invalid date");
  }
});

export const leadsRouter = createRouter({
  create: publicQuery.input(leadInput).mutation(async ({ input }) => {
    // Honeypot: report success without storing anything, so bots learn nothing.
    if (input.website) return { reference: "BNX-0000-00000", status: "received" as const };
    const db = getDb();
    let reference = newReference();
    for (let attempt = 0; attempt < 4; attempt += 1) {
      const clash = await db.select({ id: leads.id }).from(leads).where(eq(leads.reference, reference)).limit(1);
      if (!clash.length) break;
      reference = newReference();
    }
    const id = await db.transaction(async (tx) => {
      const [{ id: leadId }] = await tx.insert(leads).values({
        reference,
        mode: input.mode,
        name: input.name,
        email: input.email,
        company: input.company,
        phone: input.phone || null,
        sector: input.sector || null,
        budget: input.budget || null,
        currentSituation: input.currentSituation || null,
        objectives: input.objectives || null,
        challenges: input.challenges || null,
        message: input.message || null,
        services: input.services,
        solution: input.solution || null,
        engagementType: input.engagementType || null,
        preferredDate: input.preferredDate || null,
        timeSlot: input.timeSlot || null,
        consent: true,
        consentTextVersion: CONSENT_TEXT_VERSION,
        locale: input.locale,
      }).$returningId();
      await tx.insert(notifications).values({ leadId, message: `${reference} · ${input.mode} · ${input.company} / ${input.name}` });
      return leadId;
    });
    // Only after the durable write: best-effort outbound integrations (never block or fail the visitor).
    void emit("crm", `lead.${input.mode}`, reference, { id, mode: input.mode, company: input.company, name: input.name, email: input.email, sector: input.sector, solution: input.solution, engagementType: input.engagementType, preferredDate: input.preferredDate, timeSlot: input.timeSlot });
    void emit("notify", "lead.created", reference, { mode: input.mode, company: input.company });
    return { reference, status: input.mode === "appointment" ? ("to_confirm" as const) : ("received" as const) };
  }),

  subscribe: publicQuery.input(z.object({
    email: z.string().trim().toLowerCase().pipe(z.email().max(320)),
    consent: z.literal(true),
    locale: z.enum(["fr", "en"]),
    website: z.string().max(200).optional().default(""),
  })).mutation(async ({ input }) => {
    if (input.website) return { ok: true };
    const db = getDb();
    const [existing] = await db.select().from(leads).where(and(eq(leads.email, input.email), eq(leads.mode, "newsletter"))).limit(1);
    if (existing) {
      if (existing.unsubscribedAt) await db.update(leads).set({ unsubscribedAt: null, consentAt: new Date(), consentTextVersion: CONSENT_TEXT_VERSION }).where(eq(leads.id, existing.id));
      return { ok: true };
    }
    const reference = newReference();
    const [{ id }] = await db.insert(leads).values({
      reference, mode: "newsletter", email: input.email, consent: true, consentTextVersion: CONSENT_TEXT_VERSION, locale: input.locale, services: [],
    }).$returningId();
    await db.insert(notifications).values({ leadId: id, message: `${reference} · infolettre · ${input.email}` });
    void emit("marketing", "newsletter.subscribed", reference, { email: input.email, locale: input.locale, consentAt: new Date().toISOString() });
    return { ok: true };
  }),

  unsubscribe: publicQuery.input(z.object({ email: z.string().trim().toLowerCase().pipe(z.email().max(320)) })).mutation(async ({ input }) => {
    const res = await getDb().update(leads).set({ unsubscribedAt: new Date() }).where(and(eq(leads.email, input.email), eq(leads.mode, "newsletter")));
    void emit("marketing", "newsletter.unsubscribed", input.email, { email: input.email });
    if (!res) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
    return { ok: true };
  }),
});
