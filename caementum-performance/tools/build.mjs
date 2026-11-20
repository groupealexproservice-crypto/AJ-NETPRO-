// Génère le site statique : node tools/build.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { layout, SITE, markSvg } from '../src/lib.mjs';
import index from '../src/pages/index.mjs';
import formations from '../src/pages/formations.mjs';
import boutique from '../src/pages/boutique.mjs';
import aPropos from '../src/pages/a-propos.mjs';
import contact from '../src/pages/contact.mjs';
import groupes from '../src/pages/groupes.mjs';
import panier from '../src/pages/panier.mjs';
import inscription from '../src/pages/inscription.mjs';
import merci from '../src/pages/merci.mjs';
import { cgv, confidentialite, mentions, notFound } from '../src/pages/legal.mjs';

const root = process.env.OUT_DIR ? path.resolve(process.env.OUT_DIR) : path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
fs.mkdirSync(root, { recursive: true });
fs.mkdirSync(path.join(root, 'assets/img'), { recursive: true });
const pages = [index, formations, groupes, boutique, aPropos, contact, panier, inscription, merci, cgv, confidentialite, mentions, notFound];

for (const p of pages) fs.writeFileSync(path.join(root, p.file), layout(p));

const indexable = pages.filter((p) => !p.noindex);
const today = new Date().toISOString().slice(0, 10);
fs.writeFileSync(path.join(root, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${indexable.map((p) => `  <url><loc>${SITE.url}/${p.file === 'index.html' ? '' : p.file}</loc><lastmod>${today}</lastmod></url>`).join('\n')}
</urlset>
`);
fs.writeFileSync(path.join(root, 'robots.txt'), `User-agent: *\nAllow: /\nDisallow: /inscription.html\nDisallow: /panier.html\nDisallow: /merci.html\nSitemap: ${SITE.url}/sitemap.xml\n`);
fs.writeFileSync(path.join(root, 'manifest.webmanifest'), JSON.stringify({
  name: SITE.name, short_name: 'Caementum', lang: 'fr-CA', start_url: './index.html', display: 'standalone',
  background_color: '#111111', theme_color: '#111111',
  icons: [{ src: 'assets/img/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }, { src: 'assets/img/favicon.svg', sizes: 'any', type: 'image/svg+xml' }],
}, null, 2));

// Favicon : le X sur fond noir
const mk = markSvg({}).replace(/^<svg[^>]*>/, '').replace('</svg>', '');
fs.writeFileSync(path.join(root, 'assets/img/favicon.svg'), `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-12 -12 124 124" fill="#fff"><rect x="-12" y="-12" width="124" height="124" fill="#111"/>${mk}</svg>`);

fs.writeFileSync(path.join(root, 'netlify.toml'), `[build]
  publish = "."

[[headers]]
  for = "/*"
  [headers.values]
    X-Content-Type-Options = "nosniff"
    X-Frame-Options = "DENY"
    Referrer-Policy = "strict-origin-when-cross-origin"
    Permissions-Policy = "camera=(), microphone=(), geolocation=()"
    Content-Security-Policy = "default-src 'self'; img-src 'self' data:; style-src 'self' 'unsafe-inline'; script-src 'self'; font-src 'self'; connect-src 'self'; form-action 'self' https://buy.stripe.com https://checkout.stripe.com; frame-ancestors 'none'; base-uri 'self'"

[[headers]]
  for = "/assets/*"
  [headers.values]
    Cache-Control = "public, max-age=3600"

[[redirects]]
  from = "/*"
  to = "/404.html"
  status = 404
`);
console.log(`Site généré : ${pages.length} pages.`);
