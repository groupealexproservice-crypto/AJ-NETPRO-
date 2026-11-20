// Génère le site statique : node tools/build.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { layout, SITE, logoSvg } from '../src/lib.mjs';
import index from '../src/pages/index.mjs';
import services from '../src/pages/services.mjs';
import soumission from '../src/pages/soumission.mjs';
import contact from '../src/pages/contact.mjs';
import merci from '../src/pages/merci.mjs';
import { confidentialite, mentions, notFound } from '../src/pages/legal.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const pages = [index, services, soumission, contact, merci, confidentialite, mentions, notFound];
fs.mkdirSync(path.join(root, 'assets/img'), { recursive: true });

for (const p of pages) fs.writeFileSync(path.join(root, p.file), layout(p));

const today = new Date().toISOString().slice(0, 10);
fs.writeFileSync(path.join(root, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.filter((p) => !p.noindex).map((p) => `  <url><loc>${SITE.url}/${p.file === 'index.html' ? '' : p.file}</loc><lastmod>${today}</lastmod></url>`).join('\n')}
</urlset>
`);
fs.writeFileSync(path.join(root, 'robots.txt'), `User-agent: *\nAllow: /\nDisallow: /merci.html\nSitemap: ${SITE.url}/sitemap.xml\n`);

// Favicon : le logo centré sur un carré noir
const inner = logoSvg({ tone: 'dark' }).replace(/^<svg[^>]*>/, '').replace('</svg>', '');
fs.writeFileSync(path.join(root, 'assets/img/favicon.svg'), `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 900"><rect width="900" height="900" fill="#111"/><g transform="translate(245,40) scale(1)">${inner}</g></svg>`);

fs.writeFileSync(path.join(root, 'netlify.toml'), `[build]
  publish = "."

[[headers]]
  for = "/*"
  [headers.values]
    X-Content-Type-Options = "nosniff"
    X-Frame-Options = "DENY"
    Referrer-Policy = "strict-origin-when-cross-origin"
    Permissions-Policy = "camera=(), microphone=(), geolocation=()"
    Content-Security-Policy = "default-src 'self'; img-src 'self' data:; style-src 'self' 'unsafe-inline'; script-src 'self'; font-src 'self'; connect-src 'self'; form-action 'self'; frame-ancestors 'none'; base-uri 'self'"

[[headers]]
  for = "/assets/*"
  [headers.values]
    Cache-Control = "public, max-age=3600"
`);
console.log(`Site généré : ${pages.length} pages.`);
