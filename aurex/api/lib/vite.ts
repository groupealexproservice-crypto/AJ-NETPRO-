import type { Hono } from "hono";
import type { HttpBindings } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";
import fs from "node:fs";
import path from "node:path";
import { metaFor, localizePath, parseLocalized } from "../../src/routes";
import { originOf } from "../routes/seo";
import { env } from "./env";
import { expertises } from "../../src/content";

type App = Hono<{ Bindings: HttpBindings }>;

const esc = (value: string) => value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

/** Injects per-page title, description, canonical, hreflang and social tags so crawlers see them without running JavaScript. */
/** Structured data: the firm (Montréal, Quebec, Canada) and, on expertise pages, the service. Only facts AUREX has set are included. */
export function jsonLd(origin: string, canonical: string, lang: "fr" | "en"): string {
  const c = env.company;
  const org: Record<string, unknown> = {
    "@type": "ProfessionalService", "@id": `${origin}/#organization`, name: c.legalName || "AUREX Solutions", alternateName: "AUREX Solutions", url: `${origin}/fr`,
    logo: `${origin}/icons/icon-512.png`, image: `${origin}/images/og-aurex-${lang}.png`,
    description: lang === "fr" ? "Cabinet multidisciplinaire de conseil, de marketing, de développement commercial, d’intelligence artificielle et de performance opérationnelle, basé à Montréal." : "Multidisciplinary firm in consulting, marketing, business development, artificial intelligence and operational performance, based in Montréal.",
    address: { "@type": "PostalAddress", addressLocality: "Montréal", addressRegion: "QC", addressCountry: "CA", ...(c.street ? { streetAddress: c.street } : {}), ...(c.postalCode ? { postalCode: c.postalCode } : {}) },
    areaServed: [{ "@type": "City", name: "Montréal" }, { "@type": "AdministrativeArea", name: "Québec" }, { "@type": "Country", name: "Canada" }],
    availableLanguage: ["fr-CA", "en-CA"], slogan: lang === "fr" ? "Intelligence. Innovation. Excellence." : "Intelligence. Innovation. Excellence.",
    ...(c.email ? { email: c.email } : {}), ...(c.phone ? { telephone: c.phone } : {}), ...(c.linkedin ? { sameAs: [c.linkedin] } : {}),
  };
  const graph: unknown[] = [org, { "@type": "WebSite", "@id": `${origin}/#website`, url: `${origin}/${lang}`, name: "AUREX Solutions", inLanguage: lang === "fr" ? "fr-CA" : "en-CA", publisher: { "@id": `${origin}/#organization` } }];
  const [, section, slug] = canonical.split("/");
  const expertise = section === "expertises" ? expertises.find((e) => e.slug === slug) : undefined;
  if (expertise) graph.push({ "@type": "Service", name: expertise.title[lang], description: expertise.intro[lang], provider: { "@id": `${origin}/#organization` }, areaServed: { "@type": "Country", name: "Canada" }, url: `${origin}${localizePath(canonical, lang)}`, inLanguage: lang === "fr" ? "fr-CA" : "en-CA" });
  return `<script type="application/ld+json">${JSON.stringify({ "@context": "https://schema.org", "@graph": graph }).replace(/</g, "\\u003c")}</script>`;
}

export function renderHead(html: string, pathname: string, origin: string): string {
  const parsed = parseLocalized(pathname);
  const isAdmin = pathname === "/admin" || pathname.startsWith("/admin/");
  const lang = parsed?.lang ?? "fr";
  const canonical = parsed?.canonical ?? "/";
  const meta = isAdmin ? { title: "Administration", description: "", noindex: true } : parsed ? metaFor(canonical, lang) : pathname === "/" ? metaFor("/", "fr") : null;
  const known = Boolean(meta);
  const m = meta ?? { title: lang === "fr" ? "Page introuvable" : "Page not found", description: "", noindex: true };
  const title = canonical === "/" && !isAdmin ? `AUREX Solutions — ${m.title}` : `${m.title} | AUREX Solutions`;
  const url = origin + (parsed ? localizePath(canonical, lang) : "/fr");
  const tags: string[] = [
    `<meta name="description" content="${esc(m.description)}" />`,
    `<meta property="og:title" content="${esc(title)}" />`,
    `<meta property="og:description" content="${esc(m.description)}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="AUREX Solutions" />`,
    `<meta property="og:locale" content="${lang === "fr" ? "fr_CA" : "en_CA"}" />`,
    `<meta property="og:locale:alternate" content="${lang === "fr" ? "en_CA" : "fr_CA"}" />`,
    `<meta property="og:image" content="${origin}/images/og-aurex-${lang}.png" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:image" content="${origin}/images/og-aurex-${lang}.png" />`,
  ];
  if (m.noindex || !known) tags.push(`<meta name="robots" content="noindex, nofollow" />`);
  if (parsed && known && !m.noindex) {
    tags.push(`<link rel="canonical" href="${esc(url)}" />`);
    tags.push(`<link rel="alternate" hreflang="fr-CA" href="${esc(origin + localizePath(canonical, "fr"))}" />`);
    tags.push(`<link rel="alternate" hreflang="en-CA" href="${esc(origin + localizePath(canonical, "en"))}" />`);
    tags.push(`<link rel="alternate" hreflang="x-default" href="${esc(origin + localizePath(canonical, "fr"))}" />`);
    tags.push(jsonLd(origin, canonical, lang));
  }
  return html
    .replace(/<html lang="[^"]*"/, `<html lang="${lang === "fr" ? "fr-CA" : "en-CA"}"`)
    .replace(/<title>.*?<\/title>/, `<title>${esc(title)}</title>`)
    .replace("<!--SEO-->", tags.join("\n    "));
}

export function serveStaticFiles(app: App) {
  const distPath = path.resolve(import.meta.dirname, "../dist/public");
  const template = () => fs.readFileSync(path.resolve(distPath, "index.html"), "utf-8");

  // Hashed build files never change; images and PDFs rarely do; pages are always revalidated.
  app.use("*", serveStatic({
    root: "./dist/public",
    onFound: (filePath, c) => {
      if (/\/assets\//.test(filePath)) c.header("Cache-Control", "public, max-age=31536000, immutable");
      else if (/\.(webp|png|svg|pdf|glb|woff2?)$/.test(filePath)) c.header("Cache-Control", "public, max-age=604800");
      else c.header("Cache-Control", "no-cache");
    },
  }));

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
