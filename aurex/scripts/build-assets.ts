/**
 * Generates the bilingual brochures (public/brochures/*.pdf) and the social-share images
 * (public/images/og-aurex-{fr,en}.png) from src/content.ts, so wording never drifts from the site.
 * Development tool only: needs Playwright + Chromium (not a runtime dependency).
 *   npx tsx scripts/build-assets.ts
 */
import { createRequire } from "node:module";
import { readFileSync } from "node:fs";
import { expertises, methodSteps, poles, sectors, tiers, aiPole, type Lang } from "../src/content";

void tiers;
const { chromium } = createRequire(import.meta.url)("playwright") as typeof import("playwright");
const logo = `data:image/png;base64,${readFileSync("public/brand/aurex-lockup.png").toString("base64")}`;
const photo = `data:image/webp;base64,${readFileSync("public/images/architecture.webp").toString("base64")}`;
const fonts = `@import url('https://fonts.googleapis.com/css2?family=Sora:wght@200;300;400;600&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap');`;
const palette = `:root{--graphite:#0B0B0E;--anthracite:#3A3A42;--silver:#C9CBD3;--ivory:#F6F5F1;--cobalt:#A9822C;--electric:#E6BC5C}`;

const copy = {
  fr: {
    lang: "fr-CA", slogan: "Stratégie | Technologie | Intelligence artificielle | Performance | Croissance", title: "Des stratégies intelligentes. Des résultats mesurables. Une croissance durable.",
    intro: "AUREX Solutions est un cabinet multidisciplinaire de conseil, de marketing, de développement commercial, d’intelligence artificielle et de performance opérationnelle. Il accompagne les entrepreneurs, les PME et les organisations dans la construction, le développement et la transformation de leurs activités.",
    expertise: "Dix expertises", solutions: "Quatre offres, quatre offres IA", method: "Une méthodologie en six étapes", sectors: "Treize secteurs d’activité",
    quote: "Prestations individuelles, abonnements mensuels et interventions sur mesure, en dollars canadiens, établis sur devis. Les tarifs publiés sont ceux validés par la direction.",
    next: "Prochaine étape", cta: "Planifiez une consultation ou demandez un diagnostic sur le site d’AUREX Solutions.",
    legal: "Document d’information. Aucune tarification, aucun résultat ni aucune référence client n’y figurent.",
  },
  en: {
    lang: "en-CA", slogan: "Strategy | Technology | Artificial intelligence | Performance | Growth", title: "Smart strategies. Measurable results. Sustainable growth.",
    intro: "AUREX Solutions is a multidisciplinary firm in consulting, marketing, business development, artificial intelligence and operational performance. It supports entrepreneurs, SMEs and organizations in building, growing and transforming their businesses.",
    expertise: "Ten areas of expertise", solutions: "Four offers, four AI offers", method: "A six-step methodology", sectors: "Thirteen industries",
    quote: "Individual services, monthly subscriptions and tailored engagements, in Canadian dollars, quoted on request. Published rates are those validated by management.",
    next: "Next step", cta: "Schedule a consultation or request a diagnostic on the AUREX Solutions website.",
    legal: "Information document. It contains no pricing, results or client references.",
  },
} as const;

function brochure(lang: Lang) {
  const c = copy[lang];
  return `<!doctype html><html lang="${c.lang}"><meta charset="utf-8"><style>${fonts}${palette}
@page{size:Letter;margin:0}*{box-sizing:border-box}body{margin:0;font-family:'IBM Plex Sans',Arial,sans-serif;color:var(--graphite);font-size:10.5pt;line-height:1.55}
h1,h2,h3{font-family:Sora,Arial,sans-serif;font-weight:400;margin:0}
.page{width:8.5in;height:11in;padding:.55in .75in;position:relative;page-break-after:always;overflow:hidden}
.cover{background:var(--graphite);color:var(--ivory);padding:0}.cover img:not(.logo){position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:.42;filter:grayscale(1)}
.cover .in{position:absolute;inset:.8in .8in;display:flex;flex-direction:column;justify-content:space-between}
.brand{font-size:20pt;letter-spacing:.2em;font-weight:600}.brand small{display:block;font-size:6.5pt;letter-spacing:.4em;margin-top:6px;font-weight:500}
.cover h1{font-size:50pt;line-height:1.02;max-width:5.6in}.cover p{max-width:4.8in;font-size:12pt;color:var(--silver)}
.sig{letter-spacing:.2em;font-size:8pt;text-transform:uppercase;color:var(--silver)}.bar{width:60px;height:3px;background:var(--cobalt);margin:18px 0}
h2{font-size:22pt;margin-bottom:10px}.sub{color:var(--anthracite)}.rule{border-top:1px solid var(--silver);padding:5px 0}
.grid{display:grid;grid-template-columns:1fr 1fr;gap:0 .4in}.rule b{display:block;font-size:10.5pt}.rule span{color:var(--anthracite);font-size:9pt}
.steps{counter-reset:s}.steps .rule{display:grid;grid-template-columns:.4in 1fr}.steps .rule:before{counter-increment:s;content:counter(s);font-family:Sora,sans-serif;color:var(--cobalt);font-size:16pt}
.foot{position:absolute;left:.75in;right:.75in;bottom:.3in;font-size:8pt;color:var(--anthracite);display:flex;justify-content:space-between}
.cta{margin-top:14px;background:var(--graphite);color:var(--ivory);padding:16px 26px;margin-bottom:.5in}.cta h3{font-size:18pt;margin-bottom:6px}
img.logo{position:static;width:260px;height:auto;filter:none;opacity:1;object-fit:contain}.cover img.logo{width:2.2in}</style><body>
<section class="page cover"><img src="${photo}" alt=""><div class="in"><img class="logo" src="${logo}" alt="AUREX Solutions">
<div><div class="sig">${c.slogan}</div><div class="bar"></div><h1>${c.title}</h1><p>${c.slogan}</p></div><p>${c.intro}</p></div></section>
<section class="page"><h2>${c.expertise}</h2><div class="grid">${expertises.map((e) => `<div class="rule"><b>${e.letter}. ${e.title[lang]}</b><span>${e.short[lang]}</span></div>`).join("")}</div>
<h2 style="margin-top:30px">${lang === "fr" ? "Neuf départements, l’IA intégrée à chacun" : "Nine departments, AI built into each"}</h2><div class="grid">${[...poles.map((p) => ({ name: p.name, text: p.tagline[lang] })), { name: aiPole.name, text: aiPole.tagline[lang] }].map((p) => `<div class="rule"><b>${p.name}</b><span>${p.text}</span></div>`).join("")}</div>
<p class="sub" style="margin-top:14px">${c.quote}</p><div class="foot"><span>AUREX Solutions</span><span>${c.legal}</span></div></section>
<section class="page"><h2>${c.method}</h2><div class="steps">${methodSteps.map((m) => `<div class="rule"><div><b>${m.title[lang]}</b><span>${m.text[lang]}</span></div></div>`).join("")}</div>
<h2 style="margin-top:30px">${c.sectors}</h2><div class="grid">${sectors.map((s) => `<div class="rule"><b>${s.name[lang]}</b><span>${s.intro[lang]}</span></div>`).join("")}</div>
<div class="cta"><h3>${c.next}</h3><div>${c.cta}</div></div><div class="foot"><span>${c.slogan}</span><span>AUREX Solutions</span></div></section></body></html>`;
}

function share(lang: Lang) {
  const c = copy[lang];
  return `<!doctype html><meta charset="utf-8"><style>${fonts}${palette}*{box-sizing:border-box}body{margin:0;width:1200px;height:630px;background:var(--graphite);color:var(--ivory);font-family:'IBM Plex Sans',sans-serif;position:relative;overflow:hidden}
img:not(.logo){position:absolute;right:0;top:0;width:560px;height:630px;object-fit:cover;filter:grayscale(1);opacity:.7}.shade{position:absolute;right:0;top:0;width:560px;height:630px;background:linear-gradient(90deg,var(--graphite),transparent 60%)}
.in{position:absolute;left:72px;top:64px;bottom:64px;width:680px;display:flex;flex-direction:column;justify-content:space-between}
.brand{font-family:Sora,sans-serif;font-size:30px;letter-spacing:.22em}.brand small{display:block;font-size:10px;letter-spacing:.42em;margin-top:8px;font-family:'IBM Plex Sans'}
h1{font-family:Sora,sans-serif;font-weight:400;font-size:54px;line-height:1.08;margin:0}.bar{width:84px;height:4px;background:var(--cobalt);margin-bottom:24px}
p{margin:0;color:var(--electric);font-size:17px;letter-spacing:.06em}.sig{font-size:15px;letter-spacing:.28em;text-transform:uppercase;color:var(--silver)}img.logo{position:static;width:260px;height:auto;filter:none;opacity:1;object-fit:contain}.cover img.logo{width:2.2in}</style>
<body><img src="${photo}" alt=""><div class="shade"></div><div class="in"><img class="logo" src="${logo}" alt="AUREX Solutions"><div><div class="bar"></div><h1>${c.title}</h1></div><div><p>${c.slogan}</p><div class="sig" style="margin-top:14px">AUREX Solutions</div></div></div></body>`;
}

const browser = await chromium.launch();
for (const lang of ["fr", "en"] as Lang[]) {
  const page = await browser.newPage();
  await page.setContent(brochure(lang), { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await page.pdf({ path: `public/brochures/aurex-solutions-${lang}.pdf`, width: "8.5in", height: "11in", printBackground: true });
  const og = await browser.newPage({ viewport: { width: 1200, height: 630 } });
  await og.setContent(share(lang), { waitUntil: "networkidle" });
  await og.evaluate(() => document.fonts.ready);
  await og.screenshot({ path: `public/images/og-aurex-${lang}.png` });
}
await browser.close();
console.log("Assets generated.");
