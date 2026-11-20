// Briques communes du site Caementum Performance : données, formats, marque, gabarit de page.

export const SITE = {
  name: 'Caementum Performance',
  url: process.env.SITE_URL || 'https://caementumperformance.com', // à remplacer par le vrai domaine
  email: 'bonjour@caementumperformance.com', // à remplacer
  locale: 'fr-CA',
  city: 'Montréal',
  // Réseaux sociaux : coller l'adresse complète de chaque compte. Vide = affiché comme « lien à venir ».
  socials: [
    { name: 'Instagram', url: '' },
    { name: 'Strava', url: '' },
    { name: 'TikTok', url: '' },
    { name: 'Facebook', url: '' },
  ],
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
export const COMMUNAUTAIRE = {
  monthly: 19.99,
  includes: ['Accès à la communauté privée', 'Un entraînement collectif par semaine', 'Échanges entre membres', 'Conseils et motivation du coach'],
};
PACKS.piste.distances = ['800 m', '1 500 m', '3 000 m', '3 000 m steeple', '5 000 m'];
PACKS.route.distances = ['5 km', '10 km', 'Semi-marathon', 'Marathon', 'Ultra-marathon'];
PACKS.trail.distances = ['Trail court', 'Trail long', 'Ultra-trail'];

export const PALMARES = [
  ['Jeux olympiques de Rio', 'Participation'],
  ['Championnats du monde', 'Finaliste, deux participations'],
  ['Championnats de France', 'Cinq fois champion'],
  ['Championnats de Tunisie', 'Vingt fois champion'],
  ['Championnats de la Méditerranée', 'Champion'],
  ['Championnats d’Afrique', 'Finaliste'],
];
export const RECORDS = [
  ['800 m', '1:47'],
  ['1 500 m', '3:47'],
  ['3 000 m steeple', '8:33'],
  ['5 000 m (piste)', '13:16'],
  ['10 km (route)', '28:22'],
];

// ----- Boutique : fiches PROVISOIRES. Remplacer nom, description, prix et photo quand les produits seront définis. -----
// photo : nom d'un fichier déposé dans assets/img/produits/ (laisser '' tant qu'il n'y a pas de photo).
// price : nombre en dollars canadiens, ou null tant que le prix n'est pas fixé.
const TAILLES = ['TP', 'P', 'M', 'G', 'TG', 'TTG'];
export const PRODUCTS = [
  { id: 'tshirt', name: 'T-shirt de course', desc: '[Description provisoire : matière, coupe, usage.]', sizes: TAILLES, price: null, photo: '', provisoire: true },
  { id: 'camisole', name: 'Camisole de course', desc: '[Description provisoire : matière, coupe, usage.]', sizes: TAILLES, price: null, photo: '', provisoire: true },
  { id: 'short', name: 'Short de course', desc: '[Description provisoire : matière, longueur, poches.]', sizes: TAILLES, price: null, photo: '', provisoire: true },
  { id: 'coupe-vent', name: 'Coupe-vent', desc: '[Description provisoire : matière, protection, poids.]', sizes: TAILLES, price: null, photo: '', provisoire: true },
  { id: 'kangourou', name: 'Chandail à capuchon', desc: '[Description provisoire : matière, coupe, usage.]', sizes: TAILLES, price: null, photo: '', provisoire: true },
  { id: 'casquette', name: 'Casquette', desc: '[Description provisoire : matière, ajustement.]', sizes: ['Taille unique'], price: null, photo: '', provisoire: true },
];
export const tbd = (label = 'Provisoire') => `<span class="tbd">${label}</span>`;

export const COLLECTIF = [
  { name: 'Essentiel', text: 'Une séance collective par semaine. Idéal pour les petites structures.' },
  { name: 'Performance', text: 'Deux séances par semaine et suivi numérique inclus. Le choix le plus complet pour une organisation.' },
  { name: 'Premium', text: 'Jusqu’à trois séances par semaine, avec des bilans individuels personnalisés.' },
];
export const A_VENIR = [
  { name: 'L’application Caementum', text: 'Votre planning, le détail de chaque séance, le suivi de vos performances et la messagerie directe avec votre entraîneur, au même endroit.' },
  { name: 'Synchronisation avec votre montre', text: 'Envoi des séances et retour des données avec Apple Watch, Garmin, COROS et Strava.' },
  { name: 'Nutrition et récupération', text: 'Des repères concrets pour mieux manger, dormir et récupérer, intégrés à votre programme.' },
  { name: 'Camps d’entraînement', text: 'Des stages en personne avec Alexandre, pour vivre l’entraînement de haut niveau de l’intérieur.' },
  { name: 'Webinaires', text: 'Des rencontres en ligne sur la physiologie, la biomécanique et les stratégies d’entraînement.' },
  { name: 'Programme de parrainage', text: 'Une façon de remercier les coureurs qui font découvrir Caementum à leur entourage.' },
];
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

// ----- Marque : le X en bandes diagonales (deux longues barres, deux paires de barres courtes) -----
export function markSvg({ className = '', animate = false, title = '' } = {}) {
  const a = (c) => (animate ? ` class="${c}"` : '');
  return `<svg class="${className}" viewBox="0 0 100 100" fill="currentColor" role="img" aria-label="${title}"${title ? '' : ' aria-hidden="true"'}>
<g transform="rotate(-45 50 50)"><rect${a('mk mk-l1')} x="5" y="41.5" width="90" height="7"/><rect${a('mk mk-l2')} x="5" y="51.5" width="90" height="7"/></g>
<g transform="rotate(45 50 50)"><rect${a('mk mk-s1')} x="9" y="40.5" width="26" height="8.5"/><rect${a('mk mk-s1')} x="9" y="51" width="26" height="8.5"/><rect${a('mk mk-s2')} x="65" y="40.5" width="26" height="8.5"/><rect${a('mk mk-s2')} x="65" y="51" width="26" height="8.5"/></g>
</svg>`;
}

// ----- Gabarit de page -----
const NAV = [
  ['index.html', 'Accueil'],
  ['formations.html', 'Formations'],
  ['boutique.html', 'Boutique'],
  ['a-propos.html', 'À propos'],
  ['contact.html', 'Contact'],
];

// Espaces insécables dans les nombres et unités (texte seulement, jamais dans les attributs)
const nbText = (html) => html.replace(/>([^<]+)</g, (m, t) => '>' + t
  .replace(/(\d) (?=\d{3}(?!\d))/g, '$1\u00a0')
  .replace(/(\d) (m|km|s|min|h|mois|titres|%|\$)(?![\p{L}])/gu, '$1\u00a0$2') + '<');

export const socialItems = () => SITE.socials.map((x) => (x.url
  ? `<li><a href="${x.url}" rel="noopener me" target="_blank">${x.name}</a></li>`
  : `<li>${x.name} <span class="tbd">lien à venir</span></li>`)).join('');

export function layout({ file, title, description, body: rawBody, tone = 'ink', schema = [], noindex = false, bodyClass = '' }) {
  const body = nbText(rawBody);
  const url = `${SITE.url}/${file === 'index.html' ? '' : file}`;
  const fullTitle = file === 'index.html' ? `${SITE.name} | Coaching de course à pied et vêtements de sport` : `${title} | ${SITE.name}`;
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
<link rel="preload" href="assets/fonts/archivo-black-italic.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="assets/fonts/inter-regular.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="assets/css/styles.css">
${jsonld}
</head>
<body class="${bodyClass}">
<a class="skip" href="#contenu">Aller au contenu</a>
<header class="site-header">
  <div class="wrap bar">
    <a class="brand" href="index.html" aria-label="Caementum Performance, accueil">
      ${markSvg({ className: 'brand-mark' })}
      <span class="brand-text"><span class="brand-name">Caementum</span><span class="brand-sub">Performance</span></span>
    </a>
    <nav id="nav" class="nav" aria-label="Navigation principale">
      ${NAV.map(([h, l]) => `<a href="${h}">${l}</a>`).join('\n      ')}
    </nav>
    <a class="btn btn--primary btn--sm bar-cta" href="formations.html#tarifs">Acheter une formation</a>
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
        ${markSvg({ className: 'foot-mark' })}
        <p class="foot-name">Caementum</p>
        <p class="foot-sub">Performance</p>
        <p class="foot-tag">Coaching de course à pied 100 % humain et vêtements de sport.</p>
      </div>
      <nav aria-label="Pied de page">
        <h2 class="foot-h">Explorer</h2>
        <ul>
          <li><a href="formations.html">Formations</a></li>
          <li><a href="boutique.html">Boutique</a></li>
          <li><a href="a-propos.html">À propos</a></li>
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
          ${socialItems()}
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
    ${markSvg({ className: 'cta-mark' })}
    <div>
      <h2 id="cta-titre" class="h2">${title}</h2>
      <p class="lead">${text}</p>
      <div class="actions">${primary}${secondary || ''}</div>
    </div>
  </div>
</section>`;
}
