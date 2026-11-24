import type { Hono } from "hono";
import type { HttpBindings } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";
import fs from "node:fs";
import path from "node:path";
import { metaFor, localizePath, parseLocalized } from "../../src/routes";
import { originOf } from "../routes/seo";

type App = Hono<{ Bindings: HttpBindings }>;

const esc = (value: string) => value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

/** Injects per-page title, description, canonical, hreflang and social tags so crawlers see them without running JavaScript. */
export function renderHead(html: string, pathname: string, origin: string): string {
  const parsed = parseLocalized(pathname);
  const isAdmin = pathname === "/admin" || pathname.startsWith("/admin/");
  const lang = parsed?.lang ?? "fr";
  const canonical = parsed?.canonical ?? "/";
  const meta = isAdmin ? { title: "Administration", description: "", noindex: true } : parsed ? metaFor(canonical, lang) : pathname === "/" ? metaFor("/", "fr") : null;
  const known = Boolean(meta);
  const m = meta ?? { title: lang === "fr" ? "Page introuvable" : "Page not found", description: "", noindex: true };
  const title = canonical === "/" && !isAdmin ? `BENEX Solutions — ${m.title}` : `${m.title} | BENEX Solutions`;
  const url = origin + (parsed ? localizePath(canonical, lang) : "/fr");
  const tags: string[] = [
    `<meta name="description" content="${esc(m.description)}" />`,
    `<meta property="og:title" content="${esc(title)}" />`,
    `<meta property="og:description" content="${esc(m.description)}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="BENEX Solutions" />`,
    `<meta property="og:locale" content="${lang === "fr" ? "fr_CA" : "en_CA"}" />`,
    `<meta property="og:locale:alternate" content="${lang === "fr" ? "en_CA" : "fr_CA"}" />`,
    `<meta property="og:image" content="${origin}/images/og-benex-${lang}.png" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:image" content="${origin}/images/og-benex-${lang}.png" />`,
  ];
  if (m.noindex || !known) tags.push(`<meta name="robots" content="noindex, nofollow" />`);
  if (parsed && known && !m.noindex) {
    tags.push(`<link rel="canonical" href="${esc(url)}" />`);
    tags.push(`<link rel="alternate" hreflang="fr-CA" href="${esc(origin + localizePath(canonical, "fr"))}" />`);
    tags.push(`<link rel="alternate" hreflang="en-CA" href="${esc(origin + localizePath(canonical, "en"))}" />`);
    tags.push(`<link rel="alternate" hreflang="x-default" href="${esc(origin + localizePath(canonical, "fr"))}" />`);
  }
  return html
    .replace(/<html lang="[^"]*"/, `<html lang="${lang === "fr" ? "fr-CA" : "en-CA"}"`)
    .replace(/<title>.*?<\/title>/, `<title>${esc(title)}</title>`)
    .replace("<!--SEO-->", tags.join("\n    "));
}

export function serveStaticFiles(app: App) {
  const distPath = path.resolve(import.meta.dirname, "../dist/public");
  const template = () => fs.readFileSync(path.resolve(distPath, "index.html"), "utf-8");

  app.use("*", serveStatic({ root: "./dist/public" }));

  app.notFound((c) => {
    const accept = c.req.header("accept") ?? "";
    if (!accept.includes("text/html")) return c.json({ error: "Not Found" }, 404);
    const pathname = new URL(c.req.url).pathname;
    const html = renderHead(template(), pathname, originOf(c.req.raw));
    const parsed = parseLocalized(pathname);
    const known = pathname === "/" || pathname === "/admin" || (parsed && metaFor(parsed.canonical, parsed.lang));
    return c.html(html, known ? 200 : 404);
  });
}
