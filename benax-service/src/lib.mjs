// Benax Service : briques communes (données, logo, gabarit). Même système de design que Caementum Performance.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

export const SITE = {
  name: 'Benax Service',
  url: process.env.SITE_URL || 'https://benaxservice.ca',
  email: 'Ajnetpro@gmail.com', // courriel actuel de l'entreprise
  phone: '438-304-9159',
  phoneHref: '+14383049159',
  city: 'Montréal',
};

// ----- Logo Benax Service : l'immeuble et l'usine -----
// Fenêtres : grille 3 x 3 sans la case du bas au centre. Usine : toit en dents de scie.
const WINDOWS = [[0, 0], [1, 0], [2, 0], [0, 1], [1, 1], [2, 1], [0, 2], [2, 2]];
export function logoSvg({ className = '', animate = false, tone = 'dark', title = '' } = {}) {
  const dark = tone === 'dark';
  const frame = dark ? '#fff' : '#111';
  const top = dark ? '#111' : '#fff';
  const bot = dark ? '#fff' : '#111';
  const fg = dark ? '#fff' : '#111';
  const fgBot = dark ? '#111' : '#fff';
  const wins = WINDOWS.map(([c, r], i) => `<rect${animate ? ` class="win" style="--i:${i}"` : ''} x="${113 + c * 69}" y="${113 + r * 69}" width="46" height="46" fill="${fg}"/>`).join('');
  return `<svg class="${className}" viewBox="0 0 410 819" role="img" aria-label="${title}"${title ? '' : ' aria-hidden="true"'}>
<rect width="410" height="819" fill="${frame}"/>
<rect x="8" y="8" width="394" height="394" fill="${top}"/>
<rect y="410" width="410" height="409" fill="${bot}"/>
${wins}
<path${animate ? ' class="fac"' : ''} d="M113,706 V591 L159,637 V591 L205,637 V591 L251,637 V591 L296,637 V706 Z" fill="${fgBot}"/>
</svg>`;
}

// ----- Photos réelles : si le fichier existe dans assets/img/photos, on l'utilise, sinon une dalle de réserve -----
export function photo(file, alt, { ratio = '4 / 3', className = '' } = {}) {
  const exists = fs.existsSync(path.join(root, 'assets/img/photos', file));
  if (exists) return `<figure class="photo ${className}" style="aspect-ratio:${ratio}"><img src="assets/img/photos/${file}" alt="${alt}" loading="lazy" decoding="async"></figure>`;
  return `<figure class="photo photo--empty ${className}" style="aspect-ratio:${ratio}" role="img" aria-label="${alt}" data-missing="${file}">${logoSvg({ className: 'photo-mark', tone: 'dark' })}</figure>`;
}

// ----- Gabarit de page -----
const NAV = [
  ['services.html', 'Services'],
  ['index.html#pourquoi', 'Pourquoi nous'],
  ['index.html#equipe', 'Notre équipe'],
  ['contact.html', 'Contact'],
];

export function layout({ file, title, description, body, schema = [], noindex = false }) {
  const url = `${SITE.url}/${file === 'index.html' ? '' : file}`;
  const fullTitle = file === 'index.html' ? `${SITE.name} | Entretien commercial et résidentiel à Montréal` : `${title} | ${SITE.name}`;
  const jsonld = schema.length ? `<script type="application/ld+json">${JSON.stringify(schema.length === 1 ? schema[0] : { '@context': 'https://schema.org', '@graph': schema.map(({ ['@context']: _c, ...r }) => r) })}</script>` : '';
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
<link rel="preload" href="assets/fonts/cinzel.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="assets/fonts/inter-regular.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="assets/css/styles.css">
${jsonld}
</head>
<body>
<a class="skip" href="#contenu">Aller au contenu</a>
<header class="site-header">
  <div class="wrap bar">
    <a class="brand" href="index.html" aria-label="Benax Service, accueil">
      ${logoSvg({ className: 'brand-logo' })}
      <span class="brand-text"><span class="brand-name">Benax</span><span class="brand-sub">Service</span></span>
    </a>
    <nav id="nav" class="nav" aria-label="Navigation principale">
      ${NAV.map(([h, l]) => `<a href="${h}">${l}</a>`).join('\n      ')}
    </nav>
    <a class="bar-phone" href="tel:${SITE.phoneHref}">${SITE.phone}</a>
    <a class="btn btn--light btn--sm bar-cta" href="soumission.html">Soumission gratuite</a>
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
        ${logoSvg({ className: 'foot-logo' })}
        <p class="foot-name">Benax</p>
        <p class="foot-sub">Service</p>
        <p class="foot-tag">Entretien commercial et résidentiel à Montréal.</p>
      </div>
      <nav aria-label="Pied de page">
        <h2 class="foot-h">Services</h2>
        <ul>
          <li><a href="services.html#commercial">Entretien commercial</a></li>
          <li><a href="services.html#residentiel">Entretien résidentiel</a></li>
          <li><a href="services.html#complements">Services complémentaires</a></li>
          <li><a href="soumission.html">Soumission gratuite</a></li>
        </ul>
      </nav>
      <nav aria-label="Informations légales">
        <h2 class="foot-h">Informations</h2>
        <ul>
          <li><a href="contact.html">Contact</a></li>
          <li><a href="confidentialite.html">Confidentialité</a></li>
          <li><a href="mentions-legales.html">Mentions légales</a></li>
        </ul>
      </nav>
      <div>
        <h2 class="foot-h">Nous joindre</h2>
        <ul>
          <li><a href="tel:${SITE.phoneHref}">${SITE.phone}</a></li>
          <li><a href="mailto:${SITE.email}">${SITE.email}</a></li>
          <li>${SITE.city} et environs, Québec</li>
          <li>Lundi au dimanche, horaires flexibles</li>
        </ul>
      </div>
    </div>
    <p class="foot-legal">© <span data-year>2026</span> Benax Service. Tous droits réservés.</p>
  </div>
</footer>
<script src="assets/js/config.js"></script>
<script src="assets/js/main.js" defer></script>
</body>
</html>
`;
}

export function ctaBand({ title, text, primary, secondary }) {
  return `<section class="slab" data-tone="ink" aria-labelledby="cta-titre">
  <div class="wrap cta-band">
    ${logoSvg({ className: 'cta-logo' })}
    <div>
      <h2 id="cta-titre" class="h2">${title}</h2>
      <p class="lead">${text}</p>
      <div class="actions">${primary}${secondary || ''}</div>
    </div>
  </div>
</section>`;
}

export const FAQ = [
  ['Comment obtenir une soumission ?', '<p>Remplissez le formulaire de soumission ou appelez-nous au ' + SITE.phone + '. Vous recevez une réponse personnalisée en moins de 24 heures, sans engagement.</p>'],
  ['Quels types d’espaces entretenez-vous ?', '<p>Bureaux, commerces, immeubles et aires communes, ainsi que maisons, condos et appartements, à Montréal et dans les environs.</p>'],
  ['Offrez-vous des contrats à long terme ?', '<p>Oui. Pour les entreprises, nous privilégions les contrats récurrents avec un conseiller dédié, afin de garder un service constant d’une semaine à l’autre.</p>'],
  ['Peut-on intervenir en dehors des heures d’ouverture ?', '<p>Oui. Nos horaires sont flexibles, du lundi au dimanche : vous pouvez, par exemple, retrouver des locaux impeccables à l’ouverture.</p>'],
  ['Utilisez-vous des produits écologiques ?', '<p>Oui, sur demande. Précisez-le dans votre soumission et nous adaptons les produits à vos exigences.</p>'],
  ['Que se passe-t-il si je ne suis pas satisfait ?', '<p>Dites-le-nous : nous revenons corriger le travail. La satisfaction de nos clients est notre priorité.</p>'],
];
export function faqHtml(items = FAQ) {
  return `<div class="faq">${items.map(([q, a]) => `<details><summary>${q}</summary><div class="answer">${a}</div></details>`).join('')}</div>`;
}
