/**
 * DEMONSTRATION DATA ONLY — never run on a production database.
 * Creates two fictional client organizations so the access rules can be tried by hand.
 * Everything here is invented for testing; none of it is a real client, result or document.
 *   npm run db:seed:demo
 */
import "dotenv/config";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { eq } from "drizzle-orm";
import { getDb } from "../api/queries/connection";
import { env } from "../api/lib/env";
import { hashPassword } from "../api/auth/password";
import { clientItems, organizations, projects, users } from "./schema";

if (env.isProduction) throw new Error("Refusing to seed demonstration data in production.");
const db = getDb();
const password = process.env.DEMO_PASSWORD ?? "Demo-Benex-2026!";

async function organization(name: string) {
  const [existing] = await db.select().from(organizations).where(eq(organizations.name, name)).limit(1);
  if (existing) return existing.id;
  const [{ id }] = await db.insert(organizations).values({ name }).$returningId();
  return id;
}
async function client(email: string, name: string, organizationId: number) {
  const [existing] = await db.select().from(users).where(eq(users.email, email)).limit(1);
  if (!existing) await db.insert(users).values({ email, name, organizationId, role: "client", passwordHash: hashPassword(password) });
}

const a = await organization("DÉMO — Organisation Alpha");
const b = await organization("DÉMO — Organisation Bêta");
await client("alpha@demo.benex.test", "Alex Alpha (démo)", a);
await client("beta@demo.benex.test", "Béatrice Bêta (démo)", b);

await mkdir(path.resolve(env.uploadDir), { recursive: true });
const key = "d".repeat(32);
await writeFile(path.join(path.resolve(env.uploadDir), key), "Document de démonstration — Organisation Alpha.\nContenu fictif.\n");

const existing = await db.select().from(projects).where(eq(projects.organizationId, a));
if (!existing.length) {
  const [{ id: alphaProject }] = await db.insert(projects).values({ organizationId: a, name: "Démo — Feuille de route numérique", description: "Projet fictif pour tester l’espace client.", status: "active", startDate: "2026-11-01", endDate: "2027-02-28" }).$returningId();
  await db.insert(projects).values({ organizationId: b, name: "Démo — Projet confidentiel Bêta", description: "Ne doit jamais apparaître chez Alpha.", status: "planning" });
  await db.insert(clientItems).values([
    { organizationId: a, projectId: alphaProject, type: "milestone", title: "Atelier de cadrage", status: "Planifié", dueDate: "2026-12-10" },
    { organizationId: a, projectId: alphaProject, type: "document", title: "Document de démonstration Alpha", fileKey: key, fileName: "demo-alpha.txt", fileMime: "text/plain", fileSize: 70 },
    { organizationId: a, type: "recommendation", title: "Recommandation de démonstration", body: "Texte fictif." },
    { organizationId: b, type: "report", title: "Rapport confidentiel Bêta (démo)", body: "Invisible pour Alpha." },
  ]);
}
console.log(`Demo accounts ready (password: ${password}): alpha@demo.benex.test, beta@demo.benex.test`);
process.exit(0);
