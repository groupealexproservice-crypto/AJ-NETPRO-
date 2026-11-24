/**
 * Generates the bilingual brochures (public/brochures/*.pdf) and the social-share images
 * (public/images/og-benex-{fr,en}.png) from src/content.ts, so wording never drifts from the site.
 * Development tool only: needs Playwright + Chromium (not a runtime dependency).
 *   npx tsx scripts/build-assets.ts
 */
import { createRequire } from "node:module";
import { readFileSync } from "node:fs";
import { expertises, methodSteps, solutions, sectors, type Lang } from "../src/content";

const { chromium } = createRequire(import.meta.url)("playwright") as typeof import("playwright");
const photo = `data:image/webp;base64,${readFileSync("public/images/architecture.webp").toString("base64")}`;
const fonts = `@import url('https://fonts.googleapis.com/css2?family=Marcellus&family=Noto+Sans:wght@400;500;600&display=swap');`;
const palette = `:root{--graphite:#101010;--anthracite:#30343B;--silver:#B8BDC4;--ivory:#F5F5F2;--cobalt:#1746D1}`;

const copy = {
  fr: {
    lang: "fr-CA", slogan: "Transformer les ambitions en résultats.", title: "Construire. Transformer. Accélérer.",
    intro: "BENEX Solutions est un cabinet de conseil en stratégie, transformation numérique et développement des entreprises. Il accompagne les entrepreneurs, les PME et les organisations de la création vers l’expansion, en coordonnant stratégie, technologie, développement commercial, marketing et opérations.",
    expertise: "Huit expertises", solutions: "Six offres", method: "Une méthode en cinq étapes", sectors: "Dix secteurs d’activité",
    quote: "Mandats ponctuels et accompagnements mensuels, sur devis. BENEX 360 peut assurer une direction stratégique, commerciale, numérique et opérationnelle externalisée.",
    next: "Prochaine étape", cta: "Planifiez une consultation ou demandez un diagnostic sur le site de BENEX Solutions.",
    legal: "Document d’information. Aucune tarification, aucun résultat ni aucune référence client n’y figurent.",
  },
  en: {
    lang: "en-CA", slogan: "Turning ambition into results.", title: "Build. Transform. Accelerate.",
    intro: "BENEX Solutions is a consulting firm in strategy, digital transformation and business development. It supports entrepreneurs, SMEs and creative organizations toward expansion, coordinating strategy, technology, business development, marketing and operations.",
    expertise: "Eight areas of expertise", solutions: "Six offers", method: "A five-stage method", sectors: "Ten industries",
    quote: "One-off mandates and monthly support, quoted on request. BENEX 360 can provide outsourced strategic, commercial, digital and operational leadership.",
    next: "Next step", cta: "Schedule a consultation or request a diagnostic on the BENEX Solutions website.",
    legal: "Information document. It contains no pricing, results or client references.",
  },
} as const;

function brochure(lang: Lang) {
  const c = copy[lang];
  return `<!doctype html><html lang="${c.lang}"><meta charset="utf-8"><style>${fonts}${palette}
@page{size:Letter;margin:0}*{box-sizing:border-box}body{margin:0;font-family:'Noto Sans',Arial,sans-serif;color:var(--graphite);font-size:10.5pt;line-height:1.55}
h1,h2,h3{font-family:Marcellus,Georgia,serif;font-weight:400;margin:0}
.page{width:8.5in;height:11in;padding:.55in .75in;position:relative;page-break-after:always;overflow:hidden}
.cover{background:var(--graphite);color:var(--ivory);padding:0}.cover img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:.42;filter:grayscale(1)}
.cover .in{position:absolute;inset:.8in .8in;display:flex;flex-direction:column;justify-content:space-between}
.brand{font-size:20pt;letter-spacing:.2em;font-weight:600}.brand small{display:block;font-size:6.5pt;letter-spacing:.4em;margin-top:6px;font-weight:500}
.cover h1{font-size:50pt;line-height:1.02;max-width:5.6in}.cover p{max-width:4.8in;font-size:12pt;color:var(--silver)}
.sig{letter-spacing:.2em;font-size:8pt;text-transform:uppercase;color:var(--silver)}.bar{width:60px;height:3px;background:var(--cobalt);margin:18px 0}
h2{font-size:22pt;margin-bottom:10px}.sub{color:var(--anthracite)}.rule{border-top:1px solid var(--silver);padding:7px 0}
.grid{display:grid;grid-template-columns:1fr 1fr;gap:0 .4in}.rule b{display:block;font-size:10.5pt}.rule span{color:var(--anthracite);font-size:9.5pt}
.steps{counter-reset:s}.steps .rule{display:grid;grid-template-columns:.4in 1fr}.steps .rule:before{counter-increment:s;content:counter(s);font-family:Marcellus,serif;color:var(--cobalt);font-size:16pt}
.foot{position:absolute;left:.75in;right:.75in;bottom:.3in;font-size:8pt;color:var(--anthracite);display:flex;justify-content:space-between}
.cta{margin-top:14px;background:var(--graphite);color:var(--ivory);padding:16px 26px;margin-bottom:.5in}.cta h3{font-size:18pt;margin-bottom:6px}
</style><body>
<section class="page cover"><img src="${photo}" alt=""><div class="in"><div class="brand">BENEX<small>SOLUTIONS</small></div>
<div><div class="sig">Strategy. Innovation. Growth.</div><div class="bar"></div><h1>${c.title}</h1><p>${c.slogan}</p></div><p>${c.intro}</p></div></section>
<section class="page"><h2>${c.expertise}</h2><div class="grid">${expertises.map((e) => `<div class="rule"><b>${e.title[lang]}</b><span>${e.short[lang]}</span></div>`).join("")}</div>
<h2 style="margin-top:30px">${c.solutions}</h2><div class="grid">${solutions.map((s) => `<div class="rule"><b>${s.name} — ${s.category[lang]}</b><span>${s.summary[lang]}</span></div>`).join("")}</div>
<p class="sub" style="margin-top:14px">${c.quote}</p><div class="foot"><span>BENEX Solutions</span><span>${c.legal}</span></div></section>
<section class="page"><h2>${c.method}</h2><div class="steps">${methodSteps.map((m) => `<div class="rule"><div><b>${m.title[lang]}</b><span>${m.text[lang]}</span></div></div>`).join("")}</div>
<h2 style="margin-top:30px">${c.sectors}</h2><div class="grid">${sectors.map((s) => `<div class="rule"><b>${s.name[lang]}</b><span>${s.intro[lang]}</span></div>`).join("")}</div>
<div class="cta"><h3>${c.next}</h3><div>${c.cta}</div></div><div class="foot"><span>Strategy. Innovation. Growth.</span><span>BENEX Solutions</span></div></section></body></html>`;
}

function share(lang: Lang) {
  const c = copy[lang];
  return `<!doctype html><meta charset="utf-8"><style>${fonts}${palette}*{box-sizing:border-box}body{margin:0;width:1200px;height:630px;background:var(--graphite);color:var(--ivory);font-family:'Noto Sans',sans-serif;position:relative;overflow:hidden}
img{position:absolute;right:0;top:0;width:560px;height:630px;object-fit:cover;filter:grayscale(1);opacity:.7}.shade{position:absolute;right:0;top:0;width:560px;height:630px;background:linear-gradient(90deg,var(--graphite),transparent 60%)}
.in{position:absolute;left:72px;top:64px;bottom:64px;width:680px;display:flex;flex-direction:column;justify-content:space-between}
.brand{font-family:Marcellus,serif;font-size:30px;letter-spacing:.22em}.brand small{display:block;font-size:10px;letter-spacing:.42em;margin-top:8px;font-family:'Noto Sans'}
h1{font-family:Marcellus,serif;font-weight:400;font-size:76px;line-height:1.02;margin:0}.bar{width:84px;height:4px;background:var(--cobalt);margin-bottom:24px}
p{margin:0;color:var(--silver);font-size:24px;letter-spacing:.02em}.sig{font-size:15px;letter-spacing:.28em;text-transform:uppercase;color:var(--silver)}</style>
<body><img src="${photo}" alt=""><div class="shade"></div><div class="in"><div class="brand">BENEX<small>SOLUTIONS</small></div><div><div class="bar"></div><h1>${c.title}</h1></div><div><p>${c.slogan}</p><div class="sig" style="margin-top:14px">Strategy. Innovation. Growth.</div></div></div></body>`;
}

const browser = await chromium.launch();
for (const lang of ["fr", "en"] as Lang[]) {
  const page = await browser.newPage();
  await page.setContent(brochure(lang), { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await page.pdf({ path: `public/brochures/benex-solutions-${lang}.pdf`, width: "8.5in", height: "11in", printBackground: true });
  const og = await browser.newPage({ viewport: { width: 1200, height: 630 } });
  await og.setContent(share(lang), { waitUntil: "networkidle" });
  await og.evaluate(() => document.fonts.ready);
  await og.screenshot({ path: `public/images/og-benex-${lang}.png` });
}
await browser.close();
console.log("Assets generated.");
