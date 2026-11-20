// Génère l'image de partage (Open Graph) et l'icône d'appareil : node tools/render-images.mjs
import { createRequire } from 'node:module';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { markSvg } from '../src/lib.mjs';
const require = createRequire(import.meta.url);
const { chromium } = require('playwright');
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const fonts = `@font-face{font-family:D;src:url(file://${root}/assets/fonts/manrope.woff2);font-weight:200 800}@font-face{font-family:Inter;src:url(file://${root}/assets/fonts/inter-medium.woff2);font-weight:500}`;
const og = `<html><style>${fonts}*{margin:0;box-sizing:border-box}body{width:1200px;height:630px;background:#111;color:#fff;display:flex;align-items:center;gap:70px;padding:0 90px;box-shadow:inset 0 -14px 0 #1652f0}
svg{width:380px;height:380px;flex:none}.t{display:grid;gap:18px}.n{font-family:D;font-weight:800;font-size:92px;line-height:1;letter-spacing:-.02em}.s{font-family:Inter;font-weight:500;font-size:30px;letter-spacing:.5em;color:#c6ff00}.l{font-family:Inter;font-weight:500;font-size:30px;line-height:1.35;color:#e6e6e6;max-width:560px;margin-top:14px}</style>
<body>${markSvg({})}<div class="t"><div class="n">Caementum</div><div class="s">PERFORMANCE</div><div class="l">Coaching de course à pied 100 % humain et vêtements de sport.</div></div></body></html>`;
const icon = `<html><style>*{margin:0}body{width:180px;height:180px;background:#111;display:grid;place-items:center;color:#fff}svg{width:132px;height:132px}</style><body>${markSvg({})}</body></html>`;
const b = await chromium.launch();
let p = await b.newPage({ viewport: { width: 1200, height: 630 } });
await p.setContent(og); await p.waitForTimeout(500); await p.screenshot({ path: path.join(root, 'assets/img/og-image.png') });
p = await b.newPage({ viewport: { width: 180, height: 180 } });
await p.setContent(icon); await p.screenshot({ path: path.join(root, 'assets/img/apple-touch-icon.png') });
await b.close(); console.log('Images générées.');
