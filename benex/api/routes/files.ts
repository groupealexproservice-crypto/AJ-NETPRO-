import { Hono } from "hono";
import { randomBytes } from "node:crypto";
import { createReadStream } from "node:fs";
import { mkdir, stat, unlink, writeFile } from "node:fs/promises";
import path from "node:path";
import { Readable } from "node:stream";
import { eq } from "drizzle-orm";
import { clientItems } from "@db/schema";
import { env } from "../lib/env";
import { getDb } from "../queries/connection";
import { userFromHeaders } from "../auth/session";

const ALLOWED: Record<string, string> = {
  pdf: "application/pdf", png: "image/png", jpg: "image/jpeg", jpeg: "image/jpeg",
  docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  pptx: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  csv: "text/csv", txt: "text/plain",
};

const root = () => path.resolve(env.uploadDir);
const pathFor = (key: string) => path.join(root(), key);

export async function deleteStoredFile(key: string) {
  if (!/^[a-f0-9]{32}$/.test(key)) return;
  await unlink(pathFor(key)).catch(() => undefined);
}

export const fileRoutes = new Hono();

/** Administrators upload a document first, then attach it to a client item. Files are stored outside the web root under random names. */
fileRoutes.post("/api/admin/upload", async (c) => {
  const user = await userFromHeaders(c.req.raw.headers);
  if (!user || user.role !== "admin") return c.json({ error: "Forbidden" }, user ? 403 : 401);
  const form = await c.req.formData().catch(() => null);
  const file = form?.get("file");
  if (!(file instanceof File)) return c.json({ error: "A file is required" }, 400);
  const extension = file.name.split(".").pop()?.toLowerCase() ?? "";
  if (!ALLOWED[extension]) return c.json({ error: "Unsupported file type" }, 415);
  if (file.size === 0 || file.size > env.maxUploadMb * 1024 * 1024) return c.json({ error: `File must be between 1 byte and ${env.maxUploadMb} MB` }, 413);
  const key = randomBytes(16).toString("hex");
  await mkdir(root(), { recursive: true });
  await writeFile(pathFor(key), Buffer.from(await file.arrayBuffer()));
  return c.json({ key, name: file.name.slice(0, 255), mime: ALLOWED[extension], size: file.size });
});

/** Authorization is decided here, per item: administrators, or users whose organization owns the item. */
fileRoutes.get("/api/files/:id", async (c) => {
  const user = await userFromHeaders(c.req.raw.headers);
  if (!user) return c.json({ error: "Authentication required" }, 401);
  const id = Number(c.req.param("id"));
  if (!Number.isInteger(id) || id < 1) return c.json({ error: "Not found" }, 404);
  const [item] = await getDb().select().from(clientItems).where(eq(clientItems.id, id)).limit(1);
  const allowed = item && item.fileKey && (user.role === "admin" || (user.organizationId !== null && user.organizationId === item.organizationId));
  // The same answer for "missing" and "not yours", so identifiers cannot be probed.
  if (!allowed || !item.fileKey) return c.json({ error: "Not found" }, 404);
  const file = pathFor(item.fileKey);
  const info = await stat(file).catch(() => null);
  if (!info) return c.json({ error: "Not found" }, 404);
  const safeName = (item.fileName ?? "document").replace(/[^\w.\- ]+/g, "_");
  return new Response(Readable.toWeb(createReadStream(file)) as ReadableStream, {
    headers: {
      "Content-Type": item.fileMime ?? "application/octet-stream",
      "Content-Length": String(info.size),
      "Content-Disposition": `attachment; filename="${safeName}"`,
      "X-Content-Type-Options": "nosniff",
      "Cache-Control": "private, no-store",
    },
  });
});
