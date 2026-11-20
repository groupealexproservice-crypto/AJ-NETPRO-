// Génère l'image de partage (Open Graph) et l'icône d'appareil : node tools/render-images.mjs
import { createRequire } from 'node:module';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { logoSvg } from '../src/lib.mjs';
const require = createRequire(import.meta.url);
const { chromium } = require('playwright');
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const fonts = `@font-face{font-family:Cinzel;src:url(file://${root}/assets/fonts/cinzel.woff2);font-weight:400 900}@font-face{font-family:Inter;src:url(file://${root}/assets/fonts/inter-medium.woff2);font-weight:500}`;
const og = `<html><style>${fonts}*{margin:0;box-sizing:border-box}body{width:1200px;height:630px;background:#111;color:#fff;display:flex;align-items:center;gap:80px;padding:0 100px;font-family:Cinzel}
svg{height:450px;width:auto;flex:none}.t{display:grid;gap:20px}.n{font-size:110px;font-weight:500;letter-spacing:.14em;line-height:1}.s{font-family:Inter;font-weight:500;font-size:30px;letter-spacing:.6em;color:#b4b4b4}.l{font-family:Inter;font-weight:500;font-size:30px;line-height:1.35;color:#e6e6e6;max-width:540px;margin-top:16px}</style>
<body>${logoSvg({})}<div class="t"><div class="n">BENAX</div><div class="s">SERVICE</div><div class="l">Entretien commercial et résidentiel à Montréal.</div></div></body></html>`;
const icon = `<html><style>*{margin:0}body{width:180px;height:180px;background:#111;display:grid;place-items:center}svg{height:150px;width:auto}</style><body>${logoSvg({})}</body></html>`;
const b = await chromium.launch();
let p = await b.newPage({ viewport: { width: 1200, height: 630 } });
await p.setContent(og); await p.waitForTimeout(400); await p.screenshot({ path: path.join(root, 'assets/img/og-image.png') });
p = await b.newPage({ viewport: { width: 180, height: 180 } });
await p.setContent(icon); await p.screenshot({ path: path.join(root, 'assets/img/apple-touch-icon.png') });
await b.close(); console.log('Images générées.');
