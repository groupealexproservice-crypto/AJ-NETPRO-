import { Hono } from "hono";
import { eq } from "drizzle-orm";
import { posts } from "@db/schema";
import { env } from "../lib/env";
import { getDb } from "../queries/connection";
import { indexablePaths, localizePath } from "../../src/routes";

export const seoRoutes = new Hono();

export function originOf(req: Request): string {
  if (env.publicUrl) return env.publicUrl;
  const url = new URL(req.url);
  const proto = req.headers.get("x-forwarded-proto") ?? url.protocol.replace(":", "");
  return `${proto}://${req.headers.get("x-forwarded-host") ?? url.host}`;
}

const escapeXml = (value: string) => value.replace(/&/g, "&amp;").replace(/</g, "&lt;");

seoRoutes.get("/sitemap.xml", async (c) => {
  const origin = originOf(c.req.raw);
  const paths = indexablePaths();
  try {
    const rows = await getDb().select({ slug: posts.slug }).from(posts).where(eq(posts.status, "published"));
    for (const row of rows) if (!paths.includes(`/perspectives/${row.slug}`)) paths.push(`/perspectives/${row.slug}`);
  } catch { /* the database is optional for the sitemap */ }
  const entry = (path: string, lang: "fr" | "en") => {
    const alternates = (["fr", "en"] as const)
      .map((l) => `    <xhtml:link rel="alternate" hreflang="${l === "fr" ? "fr-CA" : "en-CA"}" href="${escapeXml(origin + localizePath(path, l))}"/>`)
      .concat(`    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(origin + localizePath(path, "fr"))}"/>`)
      .join("\n");
    return `  <url>\n    <loc>${escapeXml(origin + localizePath(path, lang))}</loc>\n${alternates}\n  </url>`;
  };
  const body = paths.flatMap((path) => [entry(path, "fr"), entry(path, "en")]).join("\n");
  c.header("Content-Type", "application/xml; charset=utf-8");
  c.header("Cache-Control", "public, max-age=3600");
  return c.body(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${body}\n</urlset>`);
});

seoRoutes.get("/robots.txt", (c) => {
  const origin = originOf(c.req.raw);
  c.header("Content-Type", "text/plain; charset=utf-8");
  return c.body(
    "User-agent: *\nAllow: /\nDisallow: /admin\nDisallow: /fr/espace-client\nDisallow: /en/client-portal\nDisallow: /fr/connexion\nDisallow: /en/sign-in\nDisallow: /api/\n\n" +
    `Sitemap: ${origin}/sitemap.xml\n`,
  );
});
