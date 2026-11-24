import { eq } from "drizzle-orm";
import { users } from "@db/schema";
import { env } from "./lib/env";
import { log } from "./lib/logger";
import { getDb } from "./queries/connection";
import { hashPassword, passwordProblem } from "./auth/password";

/** Creates the first administrator from ADMIN_EMAIL / ADMIN_PASSWORD when none exists yet. */
export async function ensureAdmin() {
  if (!env.adminEmail || !env.adminPassword) return;
  const db = getDb();
  const [existing] = await db.select().from(users).where(eq(users.role, "admin")).limit(1);
  if (existing) return;
  const problem = passwordProblem(env.adminPassword);
  if (problem) { log.error("ADMIN_PASSWORD rejected", { problem }); return; }
  await db.insert(users).values({ email: env.adminEmail, name: "Administration BENEX", passwordHash: hashPassword(env.adminPassword), role: "admin" });
  log.info("Initial administrator created", { email: env.adminEmail });
}
