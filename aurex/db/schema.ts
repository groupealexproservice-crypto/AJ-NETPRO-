import {
  mysqlTable, mysqlEnum, varchar, text, timestamp, bigint, boolean, json, int, index,
} from "drizzle-orm/mysql-core";

const id = (name: string) => bigint(name, { mode: "number", unsigned: true });
// Explicit BIGINT UNSIGNED AUTO_INCREMENT: portable across MySQL and MariaDB (drizzle's serial is not accepted by MariaDB).
const pk = () => bigint("id", { mode: "number", unsigned: true }).autoincrement().primaryKey();

export const organizations = mysqlTable("organizations", {
  id: pk(),
  name: varchar("name", { length: 255 }).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const users = mysqlTable("users", {
  id: pk(),
  email: varchar("email", { length: 320 }).notNull().unique(),
  passwordHash: varchar("passwordHash", { length: 255 }).notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  role: mysqlEnum("role", ["client", "admin"]).default("client").notNull(),
  organizationId: id("organizationId"),
  active: boolean("active").default(true).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  lastSignInAt: timestamp("lastSignInAt"),
}, (t) => [index("users_org_idx").on(t.organizationId)]);

export const leads = mysqlTable("leads", {
  id: pk(),
  reference: varchar("reference", { length: 24 }).notNull().unique(),
  mode: mysqlEnum("mode", ["contact", "diagnostic", "quote", "appointment", "newsletter"]).notNull(),
  status: mysqlEnum("status", ["new", "in_progress", "qualified", "quoted", "scheduled", "won", "closed", "archived"]).default("new").notNull(),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 320 }).notNull(),
  company: varchar("company", { length: 255 }),
  phone: varchar("phone", { length: 50 }),
  sector: varchar("sector", { length: 120 }),
  budget: varchar("budget", { length: 80 }),
  currentSituation: text("currentSituation"),
  objectives: text("objectives"),
  challenges: text("challenges"),
  message: text("message"),
  services: json("services").$type<string[]>(),
  solution: varchar("solution", { length: 80 }),
  engagementType: varchar("engagementType", { length: 40 }),
  preferredDate: varchar("preferredDate", { length: 10 }),
  timeSlot: varchar("timeSlot", { length: 40 }),
  confirmedAt: varchar("confirmedAt", { length: 40 }),
  internalNotes: text("internalNotes"),
  consent: boolean("consent").notNull(),
  consentAt: timestamp("consentAt").defaultNow().notNull(),
  consentTextVersion: varchar("consentTextVersion", { length: 40 }).notNull(),
  locale: varchar("locale", { length: 5 }).default("fr").notNull(),
  unsubscribedAt: timestamp("unsubscribedAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull().$onUpdate(() => new Date()),
}, (t) => [index("leads_mode_idx").on(t.mode), index("leads_email_idx").on(t.email)]);

export const projects = mysqlTable("projects", {
  id: pk(),
  organizationId: id("organizationId").notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  status: mysqlEnum("status", ["planning", "active", "on_hold", "completed"]).default("planning").notNull(),
  startDate: varchar("startDate", { length: 10 }),
  endDate: varchar("endDate", { length: 10 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull().$onUpdate(() => new Date()),
}, (t) => [index("projects_org_idx").on(t.organizationId)]);

export const clientItems = mysqlTable("clientItems", {
  id: pk(),
  organizationId: id("organizationId").notNull(),
  projectId: id("projectId"),
  type: mysqlEnum("type", ["milestone", "proposal", "document", "report", "kpi", "invoice", "recommendation", "message"]).notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  body: text("body"),
  status: varchar("status", { length: 80 }),
  value: varchar("value", { length: 120 }),
  fileKey: varchar("fileKey", { length: 120 }),
  fileName: varchar("fileName", { length: 255 }),
  fileMime: varchar("fileMime", { length: 120 }),
  fileSize: int("fileSize"),
  dueDate: varchar("dueDate", { length: 10 }),
  author: mysqlEnum("author", ["aurex", "client"]).default("aurex").notNull(),
  authorUserId: id("authorUserId"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
}, (t) => [index("items_org_idx").on(t.organizationId)]);

export const posts = mysqlTable("posts", {
  id: pk(),
  slug: varchar("slug", { length: 180 }).notNull().unique(),
  titleFr: varchar("titleFr", { length: 255 }).notNull(),
  titleEn: varchar("titleEn", { length: 255 }).notNull(),
  excerptFr: text("excerptFr").notNull(),
  excerptEn: text("excerptEn").notNull(),
  bodyFr: text("bodyFr").notNull(),
  bodyEn: text("bodyEn").notNull(),
  status: mysqlEnum("status", ["draft", "published"]).default("draft").notNull(),
  publishedAt: timestamp("publishedAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull().$onUpdate(() => new Date()),
});

export const caseStudies = mysqlTable("caseStudies", {
  id: pk(),
  slug: varchar("slug", { length: 180 }).notNull().unique(),
  titleFr: varchar("titleFr", { length: 255 }).notNull(),
  titleEn: varchar("titleEn", { length: 255 }).notNull(),
  summaryFr: text("summaryFr").notNull(),
  summaryEn: text("summaryEn").notNull(),
  clientPermission: boolean("clientPermission").default(false).notNull(),
  status: mysqlEnum("status", ["draft", "published"]).default("draft").notNull(),
  publishedAt: timestamp("publishedAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const campaigns = mysqlTable("campaigns", {
  id: pk(),
  name: varchar("name", { length: 255 }).notNull(),
  channel: varchar("channel", { length: 120 }).notNull(),
  objective: text("objective"),
  status: mysqlEnum("status", ["draft", "active", "paused", "completed"]).default("draft").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const notifications = mysqlTable("notifications", {
  id: pk(),
  leadId: id("leadId"),
  message: varchar("message", { length: 500 }).notNull(),
  isRead: boolean("isRead").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const solutionContent = mysqlTable("solutionContent", {
  slug: varchar("slug", { length: 100 }).primaryKey(),
  nameFr: varchar("nameFr", { length: 255 }).notNull(),
  nameEn: varchar("nameEn", { length: 255 }).notNull(),
  summaryFr: text("summaryFr").notNull(),
  summaryEn: text("summaryEn").notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull().$onUpdate(() => new Date()),
});

export const integrationEvents = mysqlTable("integrationEvents", {
  id: pk(),
  channel: varchar("channel", { length: 40 }).notNull(),
  event: varchar("event", { length: 80 }).notNull(),
  refId: varchar("refId", { length: 60 }),
  status: mysqlEnum("status", ["not_configured", "delivered", "failed"]).notNull(),
  detail: varchar("detail", { length: 500 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

/** Prices and timelines are entered by management; nothing is shown publicly until published. */
export const offerPricing = mysqlTable("offerPricing", {
  slug: varchar("slug", { length: 60 }).primaryKey(),
  priceText: varchar("priceText", { length: 200 }),
  timeline: varchar("timeline", { length: 200 }),
  published: boolean("published").default(false).notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull().$onUpdate(() => new Date()),
});

/** Verified credibility content: testimonials, partners, certifications, reports, team. Public only when verified and published. */
export const trustItems = mysqlTable("trustItems", {
  id: pk(),
  kind: mysqlEnum("kind", ["testimonial", "partner", "certification", "report", "team"]).notNull(),
  titleFr: varchar("titleFr", { length: 255 }).notNull(),
  titleEn: varchar("titleEn", { length: 255 }).notNull(),
  bodyFr: text("bodyFr"),
  bodyEn: text("bodyEn"),
  name: varchar("name", { length: 255 }),
  role: varchar("role", { length: 255 }),
  url: varchar("url", { length: 500 }),
  verified: boolean("verified").default(false).notNull(),
  published: boolean("published").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

/** Anonymous, cookie-free product analytics: an event name, a path and a language. No IP, no identifier. */
export const analyticsEvents = mysqlTable("analyticsEvents", {
  id: pk(),
  name: varchar("name", { length: 40 }).notNull(),
  path: varchar("path", { length: 200 }).notNull(),
  lang: varchar("lang", { length: 5 }).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
}, (t) => [index("events_name_idx").on(t.name, t.createdAt)]);

export type User = typeof users.$inferSelect;
export type Lead = typeof leads.$inferSelect;
export type Project = typeof projects.$inferSelect;
export type ClientItem = typeof clientItems.$inferSelect;
export type Post = typeof posts.$inferSelect;
