/**
 * Exports a frozen, read-only copy of the public pages (no server, no JavaScript framework) for review.
 * Forms, sign-in, the client portal and the administration only work on the full site.
 *   BASE_URL=http://127.0.0.1:3100 OUT_DIR=./preview npx tsx scripts/export-preview.ts
 */
import { createRequire } from "node:module";
import { cpSync, mkdirSync, readdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { indexablePaths, localizePath } from "../src/routes";

const { chromium } = createRequire(import.meta.url)("playwright") as typeof import("playwright");
const BASE = process.env.BASE_URL ?? "http://127.0.0.1:3100";
const OUT = path.resolve(process.env.OUT_DIR ?? "./preview");
const canonicals = indexablePaths();
const pagePaths = new Map<string, string>(); // public path -> file path (relative to OUT)
for (const lang of ["fr", "en"] as const) for (const c of canonicals) { const p = localizePath(c, lang); pagePaths.set(p, `${p.slice(1)}/index.html`); }
for (const lang of ["fr", "en"] as const) for (const c of ["/desabonnement"]) { const p = localizePath(c, lang); pagePaths.set(p, `${p.slice(1)}/index.html`); }

mkdirSync(OUT, { recursive: true });
const css = readdirSync("dist/public/assets").find((f) => f.endsWith(".css"))!;
mkdirSync(path.join(OUT, "assets"), { recursive: true });
cpSync(`dist/public/assets/${css}`, path.join(OUT, "assets", css)); // scripts are not exported
for (const dir of ["images", "icons", "brochures"]) cpSync(`public/${dir}`, path.join(OUT, dir), { recursive: true });

const banner = {
  fr: "Aperçu figé pour révision. Formulaires, connexion, espace client et administration fonctionnent sur le site complet.",
  en: "Frozen preview for review. Forms, sign-in, client portal and administration work on the full site.",
};

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
let count = 0;
for (const [publicPath, file] of pagePaths) {
  await page.goto(BASE + publicPath, { waitUntil: "networkidle" });
  await page.waitForTimeout(250);
  const lang = publicPath.startsWith("/en") ? "en" : "fr";
  const other = lang === "fr" ? "en" : "fr";
  const canonical = canonicals.find((c) => localizePath(c, lang) === publicPath) ?? "/desabonnement";
  const depth = file.split("/").length - 1;
  const up = "../".repeat(depth);
  const known = [...pagePaths.entries()].map(([p, f]) => [p, f] as const);
  const html = await page.evaluate(({ known, up, lang, other, otherPath, cssFile, banner }) => {
    const map = new Map(known);
    document.querySelectorAll("script, link[rel=modulepreload], link[rel=manifest], link[rel=preconnect]").forEach((n) => n.remove());
    document.querySelectorAll<HTMLLinkElement>("link[rel=stylesheet]").forEach((l) => { l.href = `${up}assets/${cssFile}`; });
    document.querySelectorAll("link[rel=icon], link[rel=apple-touch-icon]").forEach((l) => { const h = l.getAttribute("href")!; l.setAttribute("href", up + h.replace(/^\//, "")); });
    document.querySelectorAll("img").forEach((img) => { const s = img.getAttribute("src"); if (s?.startsWith("/")) img.setAttribute("src", up + s.slice(1)); });
    document.querySelectorAll<HTMLElement>("[style*='url(']").forEach((el) => { el.setAttribute("style", el.getAttribute("style")!.replace(/url\(["']?\//g, `url(${up}`)); });
    document.querySelectorAll("a[href]").forEach((a) => {
      const href = a.getAttribute("href")!;
      const [pathOnly] = href.split(/[?#]/);
      if (map.has(pathOnly)) a.setAttribute("href", up + map.get(pathOnly));
      else if (href.startsWith("/brochures/")) a.setAttribute("href", up + href.slice(1));
      else if (href.startsWith("/")) { a.setAttribute("href", "#"); a.setAttribute("title", lang === "fr" ? "Disponible sur le site complet" : "Available on the full site"); a.setAttribute("data-full-site", ""); }
    });
    document.querySelectorAll(".language-switch button").forEach((b) => {
      const isOther = b.textContent?.trim().toLowerCase() === other;
      if (!isOther) return;
      const a = document.createElement("a"); a.textContent = b.textContent; a.href = up + map.get(otherPath)!; a.className = "static-lang"; a.setAttribute("hreflang", other); b.replaceWith(a);
    });
    const note = document.createElement("div"); note.className = "preview-note"; note.textContent = banner; document.body.appendChild(note);
    const menu = document.querySelector(".menu-trigger"); menu?.setAttribute("data-static-menu", "");
    const nav = [...document.querySelectorAll(".desktop-nav a")].map((a) => `<a href="${a.getAttribute("href")}">${a.querySelector(".rollover > span")?.textContent ?? a.textContent}</a>`).join("");
    const cta = document.querySelector<HTMLAnchorElement>(".header-cta");
    const drawer = document.createElement("nav"); drawer.id = "static-drawer"; drawer.hidden = true; drawer.innerHTML = nav + (cta ? `<a href="${cta.getAttribute("href")}">${cta.querySelector(".rollover > span")?.textContent ?? cta.textContent}</a>` : ""); document.body.appendChild(drawer);
    return "<!doctype html>\n" + document.documentElement.outerHTML;
  }, { known, up, lang, other, otherPath: localizePath(canonical, other), cssFile: css, banner: banner[lang] });
  const injected = html.replace("</head>", `<style>
.preview-note{position:fixed;left:0;right:0;bottom:0;z-index:200;padding:10px max(16px,env(safe-area-inset-right,0px)) calc(10px + env(safe-area-inset-bottom,0px)) max(16px,env(safe-area-inset-left,0px));background:#101010;color:#f5f5f2;font:12px/1.4 system-ui,sans-serif;text-align:center}
.static-lang{opacity:.55;font-weight:600;font-size:11px;padding:14px 6px;min-width:28px;text-align:center}.static-lang:hover{opacity:1}
#static-drawer{position:fixed;inset:0;z-index:150;overflow:auto;padding:96px 24px 80px;background:#16181c;display:flex;flex-direction:column}
#static-drawer[hidden]{display:none}#static-drawer a{color:#f5f5f2;font:26px/1.2 Marcellus,Georgia,serif;padding:16px 0;border-bottom:1px solid #30343b}
.mobile-menu,.skip-link{display:none}.hero-character{animation:none!important;opacity:1!important}
</style></head>`).replace("</body>", `<script>
(function(){var d=document.getElementById("static-drawer"),b=document.querySelector("[data-static-menu]");if(b&&d){b.addEventListener("click",function(){d.hidden=!d.hidden;b.setAttribute("aria-expanded",String(!d.hidden));});d.addEventListener("click",function(e){if(e.target.tagName==="A")d.hidden=true;});document.addEventListener("keydown",function(e){if(e.key==="Escape")d.hidden=true;});}
document.addEventListener("submit",function(e){e.preventDefault();var n=document.querySelector(".preview-note");if(n){n.textContent="${banner[lang]}";}});
document.addEventListener("click",function(e){var a=e.target.closest&&e.target.closest("[data-full-site]");if(a)e.preventDefault();});})();
</script></body>`);
  const target = path.join(OUT, file);
  mkdirSync(path.dirname(target), { recursive: true });
  writeFileSync(target, injected);
  count += 1;
}
await browser.close();
console.log(`Exported ${count} pages to ${OUT}`);
