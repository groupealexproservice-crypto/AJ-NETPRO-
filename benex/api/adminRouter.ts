import { z } from "zod";
import { and, count, desc, eq, lt, sql } from "drizzle-orm";
import { TRPCError } from "@trpc/server";
import { LEAD_STATUSES } from "@contracts/constants";
import { createRouter, adminQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { analyticsEvents, campaigns, caseStudies, clientItems, integrationEvents, leads, notifications, offerPricing, organizations, posts, projects, solutionContent, trustItems, users } from "@db/schema";
import { hashPassword, passwordProblem } from "./auth/password";
import { integrationStatus } from "./integrations";
import { deleteStoredFile } from "./routes/files";

const slug = z.string().trim().min(2).max(180).regex(/^[a-z0-9-]+$/);
const date = z.string().regex(/^(\d{4}-\d{2}-\d{2})?$/);
const itemTypes = ["milestone", "proposal", "document", "report", "kpi", "invoice", "recommendation", "message"] as const;

const postInput = z.object({
  id: z.number().optional(), slug,
  titleFr: z.string().trim().min(2).max(255), titleEn: z.string().trim().min(2).max(255),
  excerptFr: z.string().trim().min(2).max(5000), excerptEn: z.string().trim().min(2).max(5000),
  bodyFr: z.string().trim().min(10).max(50000), bodyEn: z.string().trim().min(10).max(50000),
  status: z.enum(["draft", "published"]),
});

const caseInput = z.object({
  id: z.number().optional(), slug,
  titleFr: z.string().trim().min(2).max(255), titleEn: z.string().trim().min(2).max(255),
  summaryFr: z.string().trim().min(10).max(8000), summaryEn: z.string().trim().min(10).max(8000),
  clientPermission: z.boolean(), status: z.enum(["draft", "published"]),
});

export const adminRouter = createRouter({
  overview: adminQuery.query(async () => {
    const db = getDb();
    const [pricingRows, trustRows] = await Promise.all([db.select().from(offerPricing), db.select().from(trustItems).orderBy(desc(trustItems.createdAt))]);
    const [leadRows, orgRows, projectRows, itemRows, userRows, postRows, caseRows, campaignRows, notificationRows, solutionRows, eventRows] = await Promise.all([
      db.select().from(leads).orderBy(desc(leads.createdAt)),
      db.select().from(organizations).orderBy(organizations.name),
      db.select().from(projects).orderBy(desc(projects.updatedAt)),
      db.select().from(clientItems).orderBy(desc(clientItems.createdAt)),
      db.select().from(users).orderBy(desc(users.createdAt)),
      db.select().from(posts).orderBy(desc(posts.updatedAt)),
      db.select().from(caseStudies).orderBy(desc(caseStudies.createdAt)),
      db.select().from(campaigns).orderBy(desc(campaigns.createdAt)),
      db.select().from(notifications).orderBy(desc(notifications.createdAt)).limit(30),
      db.select().from(solutionContent),
      db.select().from(integrationEvents).orderBy(desc(integrationEvents.createdAt)).limit(25),
    ]);
    return {
      leads: leadRows, organizations: orgRows, projects: projectRows,
      items: itemRows.map(({ fileKey, ...item }) => ({ ...item, hasFile: Boolean(fileKey) })),
      users: userRows.map((user) => ({ id: user.id, email: user.email, name: user.name, role: user.role, organizationId: user.organizationId, active: user.active, createdAt: user.createdAt, lastSignInAt: user.lastSignInAt })),
      posts: postRows, caseStudies: caseRows, campaigns: campaignRows, notifications: notificationRows,
      solutions: solutionRows, integrationEvents: eventRows, integrations: integrationStatus(), pricing: pricingRows, trust: trustRows,
    };
  }),

  stats: adminQuery.query(async () => {
    const db = getDb();
    const byMode = await db.select({ mode: leads.mode, total: count() }).from(leads).groupBy(leads.mode);
    const byStatus = await db.select({ status: leads.status, total: count() }).from(leads).groupBy(leads.status);
    const bySector = await db.select({ sector: leads.sector, total: count() }).from(leads).where(sql`${leads.sector} is not null`).groupBy(leads.sector);
    const last30 = await db.select({ total: count() }).from(leads).where(sql`${leads.createdAt} >= (now() - interval 30 day)`);
    const events = await db.select({ name: analyticsEvents.name, total: count() }).from(analyticsEvents).where(sql`${analyticsEvents.createdAt} >= (now() - interval 30 day)`).groupBy(analyticsEvents.name);
    const eventCount = (name: string) => events.find((e) => e.name === name)?.total ?? 0;
    const submitted = await db.select({ total: count() }).from(leads).where(and(sql`${leads.createdAt} >= (now() - interval 30 day)`, sql`${leads.mode} <> 'newsletter'`));
    // Leads still "new" after 48 hours: the follow-up reminder list.
    const overdue = await db.select({ id: leads.id, reference: leads.reference, company: leads.company, name: leads.name, mode: leads.mode, createdAt: leads.createdAt }).from(leads).where(and(eq(leads.status, "new"), lt(leads.createdAt, sql`(now() - interval 2 day)`), sql`${leads.mode} <> 'newsletter'`)).orderBy(leads.createdAt).limit(20);
    return {
      byMode, byStatus, bySector, last30: last30[0]?.total ?? 0, overdue,
      funnel: { visits: eventCount("page_view"), simulator: eventCount("simulator_run"), formStarted: eventCount("form_started"), consultationClicks: eventCount("cta_consultation"), quoteClicks: eventCount("cta_quote"), submitted: submitted[0]?.total ?? 0 },
    };
  }),

  updateLead: adminQuery.input(z.object({
    id: z.number(), status: z.enum(LEAD_STATUSES).optional(),
    internalNotes: z.string().max(8000).optional(), confirmedAt: z.string().max(40).optional(),
  })).mutation(async ({ input }) => {
    const { id, ...changes } = input;
    if (!Object.keys(changes).length) return { ok: true };
    await getDb().update(leads).set(changes).where(eq(leads.id, id));
    return { ok: true };
  }),

  createOrganization: adminQuery.input(z.object({ name: z.string().trim().min(2).max(255) })).mutation(async ({ input }) => {
    const [{ id }] = await getDb().insert(organizations).values({ name: input.name }).$returningId();
    return { id };
  }),

  createClientUser: adminQuery.input(z.object({
    name: z.string().trim().min(2).max(255),
    email: z.string().trim().toLowerCase().pipe(z.email().max(320)),
    organizationId: z.number(), password: z.string().max(200),
  })).mutation(async ({ input }) => {
    const problem = passwordProblem(input.password);
    if (problem) throw new TRPCError({ code: "BAD_REQUEST", message: problem });
    const db = getDb();
    const [org] = await db.select().from(organizations).where(eq(organizations.id, input.organizationId)).limit(1);
    if (!org) throw new TRPCError({ code: "NOT_FOUND", message: "Organization not found" });
    const [existing] = await db.select({ id: users.id }).from(users).where(eq(users.email, input.email)).limit(1);
    if (existing) throw new TRPCError({ code: "CONFLICT", message: "This e-mail address already has an account" });
    const [{ id }] = await db.insert(users).values({ name: input.name, email: input.email, organizationId: input.organizationId, passwordHash: hashPassword(input.password), role: "client" }).$returningId();
    return { id };
  }),

  setUserActive: adminQuery.input(z.object({ userId: z.number(), active: z.boolean() })).mutation(async ({ ctx, input }) => {
    if (ctx.user.id === input.userId) throw new TRPCError({ code: "FORBIDDEN", message: "You cannot deactivate your own account" });
    await getDb().update(users).set({ active: input.active }).where(eq(users.id, input.userId));
    return { ok: true };
  }),

  createProject: adminQuery.input(z.object({
    organizationId: z.number(), name: z.string().trim().min(2).max(255), description: z.string().max(8000),
    status: z.enum(["planning", "active", "on_hold", "completed"]), startDate: date, endDate: date,
  })).mutation(async ({ input }) => {
    const [{ id }] = await getDb().insert(projects).values({
      organizationId: input.organizationId, name: input.name, description: input.description || null,
      status: input.status, startDate: input.startDate || null, endDate: input.endDate || null,
    }).$returningId();
    return { id };
  }),
  updateProjectStatus: adminQuery.input(z.object({ id: z.number(), status: z.enum(["planning", "active", "on_hold", "completed"]) })).mutation(async ({ input }) => {
    await getDb().update(projects).set({ status: input.status }).where(eq(projects.id, input.id));
    return { ok: true };
  }),

  createClientItem: adminQuery.input(z.object({
    organizationId: z.number(), projectId: z.number().optional(), type: z.enum(itemTypes),
    title: z.string().trim().min(2).max(255), body: z.string().max(10000), status: z.string().max(80),
    value: z.string().max(120), dueDate: date,
    file: z.object({ key: z.string().regex(/^[a-f0-9]{32}$/), name: z.string().max(255), mime: z.string().max(120), size: z.number() }).optional(),
  })).mutation(async ({ input }) => {
    const db = getDb();
    if (input.projectId) {
      const [project] = await db.select().from(projects).where(eq(projects.id, input.projectId)).limit(1);
      if (!project || project.organizationId !== input.organizationId) throw new TRPCError({ code: "BAD_REQUEST", message: "The project does not belong to this organization" });
    }
    const [{ id }] = await db.insert(clientItems).values({
      organizationId: input.organizationId, projectId: input.projectId ?? null, type: input.type, title: input.title,
      body: input.body || null, status: input.status || null, value: input.value || null, dueDate: input.dueDate || null,
      fileKey: input.file?.key ?? null, fileName: input.file?.name ?? null, fileMime: input.file?.mime ?? null, fileSize: input.file?.size ?? null,
      author: "benex", authorUserId: null,
    }).$returningId();
    return { id };
  }),
  deleteClientItem: adminQuery.input(z.object({ id: z.number() })).mutation(async ({ input }) => {
    const db = getDb();
    const [item] = await db.select().from(clientItems).where(eq(clientItems.id, input.id)).limit(1);
    if (!item) return { ok: true };
    await db.delete(clientItems).where(eq(clientItems.id, input.id));
    if (item.fileKey) await deleteStoredFile(item.fileKey);
    return { ok: true };
  }),

  upsertPost: adminQuery.input(postInput).mutation(async ({ input }) => {
    const db = getDb();
    const { id, ...fields } = input;
    const values = { ...fields, publishedAt: input.status === "published" ? new Date() : null };
    if (id) await db.update(posts).set(values).where(eq(posts.id, id));
    else await db.insert(posts).values(values).onDuplicateKeyUpdate({ set: values });
    return { ok: true };
  }),
  deletePost: adminQuery.input(z.object({ id: z.number() })).mutation(async ({ input }) => {
    await getDb().delete(posts).where(eq(posts.id, input.id));
    return { ok: true };
  }),

  upsertCaseStudy: adminQuery.input(caseInput).mutation(async ({ input }) => {
    const db = getDb();
    const { id, ...fields } = input;
    if (fields.status === "published" && !fields.clientPermission) throw new TRPCError({ code: "BAD_REQUEST", message: "Record the client's permission before publishing" });
    const values = { ...fields, publishedAt: fields.status === "published" ? new Date() : null };
    if (id) await db.update(caseStudies).set(values).where(eq(caseStudies.id, id));
    else await db.insert(caseStudies).values(values).onDuplicateKeyUpdate({ set: values });
    return { ok: true };
  }),
  deleteCaseStudy: adminQuery.input(z.object({ id: z.number() })).mutation(async ({ input }) => {
    await getDb().delete(caseStudies).where(eq(caseStudies.id, input.id));
    return { ok: true };
  }),

  updateSolution: adminQuery.input(z.object({
    slug: z.string().max(100), nameFr: z.string().trim().min(2).max(255), nameEn: z.string().trim().min(2).max(255),
    summaryFr: z.string().trim().min(10).max(5000), summaryEn: z.string().trim().min(10).max(5000),
  })).mutation(async ({ input }) => {
    await getDb().insert(solutionContent).values(input).onDuplicateKeyUpdate({ set: input });
    return { ok: true };
  }),

  upsertPricing: adminQuery.input(z.object({
    slug: z.string().regex(/^[a-z0-9-]{2,60}$/), priceText: z.string().trim().max(200), timeline: z.string().trim().max(200), published: z.boolean(),
  })).mutation(async ({ input }) => {
    const values = { slug: input.slug, priceText: input.priceText || null, timeline: input.timeline || null, published: input.published };
    if (input.published && !input.priceText && !input.timeline) throw new TRPCError({ code: "BAD_REQUEST", message: "Enter a price or a timeline before publishing" });
    await getDb().insert(offerPricing).values(values).onDuplicateKeyUpdate({ set: values });
    return { ok: true };
  }),

  upsertTrustItem: adminQuery.input(z.object({
    id: z.number().optional(), kind: z.enum(["testimonial", "partner", "certification", "report", "team"]),
    titleFr: z.string().trim().min(2).max(255), titleEn: z.string().trim().min(2).max(255),
    bodyFr: z.string().max(5000), bodyEn: z.string().max(5000), name: z.string().max(255), role: z.string().max(255),
    url: z.string().max(500).refine((v) => v === "" || /^https?:\/\//.test(v), "URL must use HTTP or HTTPS"),
    verified: z.boolean(), published: z.boolean(),
  })).mutation(async ({ input }) => {
    if (input.published && !input.verified) throw new TRPCError({ code: "BAD_REQUEST", message: "Verify the item before publishing it" });
    const { id, ...fields } = input;
    const values = { ...fields, bodyFr: fields.bodyFr || null, bodyEn: fields.bodyEn || null, name: fields.name || null, role: fields.role || null, url: fields.url || null };
    if (id) await getDb().update(trustItems).set(values).where(eq(trustItems.id, id));
    else await getDb().insert(trustItems).values(values);
    return { ok: true };
  }),
  deleteTrustItem: adminQuery.input(z.object({ id: z.number() })).mutation(async ({ input }) => {
    await getDb().delete(trustItems).where(eq(trustItems.id, input.id));
    return { ok: true };
  }),

  createCampaign: adminQuery.input(z.object({
    name: z.string().trim().min(2).max(255), channel: z.string().trim().min(2).max(120), objective: z.string().max(5000),
  })).mutation(async ({ input }) => {
    const [{ id }] = await getDb().insert(campaigns).values({ ...input, objective: input.objective || null }).$returningId();
    return { id };
  }),
  updateCampaignStatus: adminQuery.input(z.object({ id: z.number(), status: z.enum(["draft", "active", "paused", "completed"]) })).mutation(async ({ input }) => {
    await getDb().update(campaigns).set({ status: input.status }).where(eq(campaigns.id, input.id));
    return { ok: true };
  }),

  markNotificationsRead: adminQuery.mutation(async () => {
    await getDb().update(notifications).set({ isRead: true }).where(eq(notifications.isRead, false));
    return { ok: true };
  }),
});
