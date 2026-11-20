// Génère le site statique : node tools/build.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { layout, SITE, markSvg } from '../src/lib.mjs';
import index from '../src/pages/index.mjs';
import programmes from '../src/pages/programmes.mjs';
import tarifs from '../src/pages/tarifs.mjs';
import aPropos from '../src/pages/a-propos.mjs';
import contact from '../src/pages/contact.mjs';
import inscription from '../src/pages/inscription.mjs';
import merci from '../src/pages/merci.mjs';
import { cgv, confidentialite, mentions, notFound } from '../src/pages/legal.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const pages = [index, programmes, tarifs, aPropos, contact, inscription, merci, cgv, confidentialite, mentions, notFound];

for (const p of pages) fs.writeFileSync(path.join(root, p.file), layout(p));

const indexable = pages.filter((p) => !p.noindex);
const today = new Date().toISOString().slice(0, 10);
fs.writeFileSync(path.join(root, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${indexable.map((p) => `  <url><loc>${SITE.url}/${p.file === 'index.html' ? '' : p.file}</loc><lastmod>${today}</lastmod></url>`).join('\n')}
</urlset>
`);
fs.writeFileSync(path.join(root, 'robots.txt'), `User-agent: *\nAllow: /\nDisallow: /inscription.html\nDisallow: /merci.html\nSitemap: ${SITE.url}/sitemap.xml\n`);
fs.writeFileSync(path.join(root, 'manifest.webmanifest'), JSON.stringify({
  name: SITE.name, short_name: 'Caementum', lang: 'fr-CA', start_url: './index.html', display: 'standalone',
  background_color: '#111111', theme_color: '#111111',
  icons: [{ src: 'assets/img/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }, { src: 'assets/img/favicon.svg', sizes: 'any', type: 'image/svg+xml' }],
}, null, 2));

// Favicon : le C sur fond noir
const fav = markSvg({ size: 120 }).replace('<svg ', '<svg xmlns="http://www.w3.org/2000/svg" ').replace(/class="[^"]*"\s*/, '').replace('fill="currentColor"', 'fill="#ffffff"').replace(/role="img"[^>]*>/, '>');
fs.writeFileSync(path.join(root, 'assets/img/favicon.svg'), fav.replace('<svg ', '<svg ').replace('viewBox="0 0 120 120"', 'viewBox="-14 -14 148 148"').replace('>', '><rect x="-14" y="-14" width="148" height="148" fill="#111111"/>'));

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
