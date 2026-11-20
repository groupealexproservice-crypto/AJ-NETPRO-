// Briques communes du site Caementum Performance : données, formats, marque, gabarit de page.
import { pixelRunner } from '../tools/pixels.mjs';

export const SITE = {
  name: 'Caementum Performance',
  url: process.env.SITE_URL || 'https://caementumperformance.com', // à remplacer par le vrai domaine
  email: 'bonjour@caementumperformance.com', // à remplacer
  locale: 'fr-CA',
  city: 'Montréal',
};

// ----- Offres et prix (hors taxes, en dollars canadiens) -----
export const PACKS = {
  piste: {
    id: 'piste', name: 'Piste', tagline: 'Performance et élite',
    pitch: 'Pour viser un chrono : vitesse maximale aérobie, technique de course et séances spécifiques à la piste.',
    for: 'Compétiteurs et élites qui veulent des gains précis sur 800 m, 1 500 m, 3 000 m steeple ou 5 000 m.',
    includes: ['Plan spécifique piste', 'Analyse technique vidéo', 'Débriefing hebdomadaire avec votre entraîneur'],
    monthly: 150, six: 810, year: 1440,
  },
  route: {
    id: 'route', name: 'Route', tagline: 'Marathon et distance',
    pitch: '10 km, semi-marathon ou marathon : une préparation construite autour de votre date de course et de votre stratégie.',
    for: 'Coureurs engagés qui préparent une course sur route, du premier 10 km au marathon visé au chrono.',
    includes: ['Plan marathon, semi-marathon ou 10 km', 'Stratégie de course personnalisée', 'Débriefing hebdomadaire avec votre entraîneur'],
    monthly: 120, six: 650, year: 1150,
  },
  trail: {
    id: 'trail', name: 'Trail', tagline: 'Nature et ultra',
    pitch: 'Dénivelé, terrain technique, longues distances : un plan qui prépare les jambes à la montagne et la tête à la durée.',
    for: 'Coureurs de sentiers, du premier trail court à l’ultra, qui veulent gérer le dénivelé sans se blesser.',
    includes: ['Gestion du dénivelé', 'Renforcement musculaire spécifique', 'Débriefing hebdomadaire avec votre entraîneur'],
    monthly: 80, six: 430, year: 770,
  },
};
export const SQUAD = { monthly: 19.99 };
export const ADDONS = [
  { name: 'Visioconférence individuelle', price: 49, text: 'Un appel vidéo privé avec Alexandre pour un point précis : technique, plan, blessure légère.' },
  { name: 'Analyse des objectifs et des compétitions', price: 29, text: 'Votre calendrier de courses passé au crible pour placer les bons objectifs aux bons moments.' },
  { name: 'Orientation nutrition et récupération', price: 39, text: 'Des repères concrets pour mieux manger, mieux dormir et mieux récupérer entre vos séances.' },
];

const nf = (n) => new Intl.NumberFormat('fr-CA', {
  style: 'currency', currency: 'CAD',
  minimumFractionDigits: Number.isInteger(n) ? 0 : 2, maximumFractionDigits: 2,
}).format(n);
export const money = nf;
export const perMonth = (total, months) => Math.round(total / months);
export const saving = (p, term) => (term === 'six' ? p.monthly * 6 - p.six : p.monthly * 12 - p.year);

// ----- Marque : le C en blocs de pierre -----
const pt = (cx, cy, r, a) => [cx + r * Math.cos((a * Math.PI) / 180), cy + r * Math.sin((a * Math.PI) / 180)];
export function markPaths(cx, cy, R) {
  const r = R * 0.66;
  const widths = [40, 35, 30, 25, 20, 16, 12, 9, 6];
  const gaps = [2.5, 3.5, 4.5, 6, 7.5, 9, 11, 13];
  let a = 38;
  const out = [];
  widths.forEach((w, i) => {
    const a1 = a, a2 = a + w;
    const [x1, y1] = pt(cx, cy, R, a1), [x2, y2] = pt(cx, cy, R, a2);
    const [x3, y3] = pt(cx, cy, r, a2), [x4, y4] = pt(cx, cy, r, a1);
    const mid = ((a1 + a2) / 2) * Math.PI / 180;
    out.push({
      d: `M${x1.toFixed(2)},${y1.toFixed(2)} A${R},${R} 0 0 1 ${x2.toFixed(2)},${y2.toFixed(2)} L${x3.toFixed(2)},${y3.toFixed(2)} A${r},${r} 0 0 0 ${x4.toFixed(2)},${y4.toFixed(2)} Z`,
      tx: Math.cos(mid), ty: Math.sin(mid),
    });
    if (i < gaps.length) a = a2 + gaps[i];
  });
  const s = R * 0.17;
  return { blocks: out, square: { x: cx - s / 2 + R * 0.08, y: cy - s / 2, s } };
}
export function markSvg({ className = '', size = 260, animate = false, title = '' } = {}) {
  const R = size / 2 - 6, c = size / 2;
  const { blocks, square } = markPaths(c, c, R);
  const paths = blocks
    .map((b, i) => `<path${animate ? ` class="mk" style="--i:${i};--tx:${b.tx.toFixed(3)};--ty:${b.ty.toFixed(3)}"` : ''} d="${b.d}"/>`)
    .join('');
  const sq = `<rect${animate ? ' class="mk mk-sq" style="--i:9;--tx:0;--ty:0"' : ''} x="${square.x.toFixed(2)}" y="${square.y.toFixed(2)}" width="${square.s.toFixed(2)}" height="${square.s.toFixed(2)}"/>`;
  return `<svg class="${className}" viewBox="0 0 ${size} ${size}" fill="currentColor" role="img" aria-label="${title}"${title ? '' : ' aria-hidden="true"'}>${paths}${sq}</svg>`;
}
export { pixelRunner };

// ----- Gabarit de page -----
const NAV = [
  ['programmes.html', 'Programmes'],
  ['index.html#methode', 'Méthode'],
  ['tarifs.html', 'Tarifs'],
  ['a-propos.html', 'Le coach'],
  ['contact.html', 'Contact'],
];

export function layout({ file, title, description, body, tone = 'ink', schema = [], noindex = false, bodyClass = '' }) {
  const url = `${SITE.url}/${file === 'index.html' ? '' : file}`;
  const fullTitle = file === 'index.html' ? `${SITE.name} | Coaching de course à pied avec un athlète olympique` : `${title} | ${SITE.name}`;
  const jsonld = schema.length
    ? `<script type="application/ld+json">${JSON.stringify(schema.length === 1 ? schema[0] : { '@context': 'https://schema.org', '@graph': schema.map((s) => { const { ['@context']: _c, ...rest } = s; return rest; }) })}</script>`
    : '';
  return `<!doctype html>
<html lang="fr-CA">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${fullTitle}</title>
<meta name="description" content="${description}">
<link rel="canonical" href="${url}">
${noindex ? '<meta name="robots" content="noindex">' : ''}
<meta name="theme-color" content="#111111">
<meta property="og:type" content="website">
<meta property="og:locale" content="fr_CA">
<meta property="og:site_name" content="${SITE.name}">
<meta property="og:title" content="${fullTitle}">
<meta property="og:description" content="${description}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${SITE.url}/assets/img/og-image.png">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="assets/img/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="assets/img/apple-touch-icon.png">
<link rel="manifest" href="manifest.webmanifest">
<link rel="preload" href="assets/fonts/cinzel.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="assets/fonts/inter-regular.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="assets/css/styles.css">
${jsonld}
</head>
<body class="${bodyClass}">
<a class="skip" href="#contenu">Aller au contenu</a>
<header class="site-header">
  <div class="wrap bar">
    <a class="brand" href="index.html" aria-label="Caementum Performance, accueil">
      ${markSvg({ className: 'brand-mark', size: 120 })}
      <span class="brand-text"><span class="brand-name">Caementum</span><span class="brand-sub">Performance</span></span>
    </a>
    <nav id="nav" class="nav" aria-label="Navigation principale">
      ${NAV.map(([h, l]) => `<a href="${h}">${l}</a>`).join('\n      ')}
    </nav>
    <a class="btn btn--light btn--sm bar-cta" href="contact.html#appel">Parler à Alexandre</a>
    <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="nav"><span class="nav-toggle-bars" aria-hidden="true"></span><span class="sr">Menu</span></button>
  </div>
</header>
<main id="contenu" tabindex="-1">
${body}
</main>
<footer class="site-footer">
  <div class="wrap">
    <div class="foot-grid">
      <div class="foot-brand">
        ${markSvg({ className: 'foot-mark', size: 160 })}
        <p class="foot-name">Caementum</p>
        <p class="foot-sub">Performance</p>
        <p class="foot-tag">Coaching de course à pied, 100 % humain.</p>
      </div>
      <nav aria-label="Pied de page">
        <h2 class="foot-h">Explorer</h2>
        <ul>
          <li><a href="programmes.html">Programmes</a></li>
          <li><a href="tarifs.html">Tarifs</a></li>
          <li><a href="a-propos.html">Le coach</a></li>
          <li><a href="contact.html">Contact</a></li>
        </ul>
      </nav>
      <nav aria-label="Informations légales">
        <h2 class="foot-h">Informations</h2>
        <ul>
          <li><a href="conditions-de-vente.html">Conditions de vente</a></li>
          <li><a href="confidentialite.html">Confidentialité</a></li>
          <li><a href="mentions-legales.html">Mentions légales</a></li>
        </ul>
      </nav>
      <div>
        <h2 class="foot-h">Nous joindre</h2>
        <ul>
          <li><a data-email href="mailto:${SITE.email}">${SITE.email}</a></li>
          <li>${SITE.city}, Québec</li>
          <li>Coaching à distance partout au Québec</li>
        </ul>
      </div>
    </div>
    <p class="foot-legal">© <span data-year>2026</span> Caementum Performance. Prix en dollars canadiens, taxes (TPS et TVQ) en sus.</p>
  </div>
</footer>
<script src="assets/js/config.js"></script>
<script src="assets/js/main.js" defer></script>
</body>
</html>
`;
}

// Petits composants réutilisables
export const btn = (href, label, variant = 'light', extra = '') => `<a class="btn btn--${variant} ${extra}" href="${href}">${label}</a>`;
export function ctaBand({ title, text, primary, secondary }) {
  return `<section class="slab" data-tone="ink" aria-labelledby="cta-titre">
  <div class="wrap cta-band">
    ${markSvg({ className: 'cta-mark', size: 260 })}
    <div>
      <h2 id="cta-titre" class="h2">${title}</h2>
      <p class="lead">${text}</p>
      <div class="actions">${primary}${secondary || ''}</div>
    </div>
  </div>
</section>`;
}
