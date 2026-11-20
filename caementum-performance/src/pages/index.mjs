import { layout, markSvg, PACKS, PRODUCTS, money, ctaBand, SITE, COMMUNAUTAIRE, hasPhoto } from '../lib.mjs';
import { productCard, garment, faqHtml, faqSchema } from '../parts.mjs';

const steps = [
  ['Paiement sécurisé', 'Vous choisissez votre formation et votre durée, puis vous payez en ligne.'],
  ['Planification', 'Alexandre vous contacte pour fixer votre visioconférence d’évaluation.'],
  ['Visio d’évaluation', 'Objectifs, niveau, antécédents, disponibilités et contraintes.'],
  ['Conception manuelle', 'Alexandre écrit votre plan lui-même, sans automatisation.'],
  ['Livraison sur mesure', 'Vous recevez votre programme détaillé, prêt à suivre.'],
  ['Suivi et ajustements', 'Visio de suivi chaque mois avec les forfaits de 6 et 12 mois.'],
];

// Fonds illustrés des trois disciplines (en attendant des photos de terrain)
const art = {
  piste: `<svg viewBox="0 0 300 400" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><rect width="300" height="400" fill="#262626"/><g stroke="#4a4a4a" stroke-width="3" fill="none"><path d="M-40 400 L150 120"/><path d="M20 400 L160 120"/><path d="M90 400 L170 120"/><path d="M170 400 L180 120"/><path d="M250 400 L190 120"/><path d="M320 400 L200 120"/><path d="M380 400 L210 120"/></g><rect y="110" width="300" height="12" fill="#3a3a3a"/></svg>`,
  route: `<svg viewBox="0 0 300 400" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><rect width="300" height="400" fill="#2a2a2a"/><path d="M130 120 H170 L300 400 H-0 Z" fill="#1c1c1c"/><g fill="#6a6a6a"><path d="M148 150 h4 v14 h-4z"/><path d="M146 196 h8 v26 h-8z"/><path d="M143 262 h14 v42 h-14z"/><path d="M138 346 h24 v54 h-24z"/></g><rect y="110" width="300" height="12" fill="#3a3a3a"/></svg>`,
  trail: `<svg viewBox="0 0 300 400" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><rect width="300" height="400" fill="#242424"/><path d="M0 250 L70 150 L120 215 L190 110 L300 250 V400 H0Z" fill="#363636"/><path d="M0 300 L90 220 L160 280 L240 190 L300 270 V400 H0Z" fill="#2c2c2c"/><path d="M0 360 L110 300 L200 350 L300 310 V400 H0Z" fill="#1f1f1f"/></svg>`,
};

export default {
  file: 'index.html',
  title: 'Accueil',
  description: 'Caementum Performance : coaching de course à pied 100 % humain par un athlète international, et vêtements de sport de la marque. Piste, route et trail, partout au Québec.',
  schema: [
    {
      '@context': 'https://schema.org', '@type': 'ProfessionalService', name: SITE.name, url: SITE.url,
      description: 'Coaching de course à pied personnalisé par un athlète international, et vêtements de sport de la marque.',
      areaServed: [{ '@type': 'AdministrativeArea', name: 'Québec' }, { '@type': 'City', name: 'Montréal' }],
      address: { '@type': 'PostalAddress', addressLocality: 'Montréal', addressRegion: 'QC', addressCountry: 'CA' },
      priceRange: '80 $ à 150 $',
      founder: { '@type': 'Person', name: 'Alexandre Ben Ammar' },
    },
    faqSchema(),
  ],
  body: `
<section class="hero" aria-labelledby="h1">
  <svg class="hero-lanes" viewBox="0 0 600 600" preserveAspectRatio="xMaxYMin meet" aria-hidden="true"><path d="M330 0 L600 270"/><path d="M400 0 L600 200"/></svg>
  <div class="wrap hero-grid">
    <div class="hero-copy">
      <p class="eyebrow">Coaching de course à pied</p>
      <h1 id="h1" class="h1">La performance <span class="hl">se construit.</span></h1>
      <p class="lead">Aucun algorithme. Chaque plan est écrit à la main par un athlète international, après analyse de vos retours. Piste, route ou trail, partout au Québec.</p>
      <div class="actions">
        <a class="btn btn--primary" href="formations.html">Voir les formations</a>
        <a class="btn btn--ghost" href="boutique.html">Découvrir la boutique</a>
      </div>
    </div>
    <figure class="hero-figure"><img src="assets/img/photos/hero.jpg" alt="Alexandre Ben Ammar franchit la rivière lors d’un 3 000 m steeple" width="1600" height="1148" fetchpriority="high"></figure>
  </div>
  <div class="wrap">
    <ul class="hero-facts" aria-label="Palmarès en chiffres">
      <li><b>20</b><span>fois champion de Tunisie</span></li>
      <li><b>5</b><span>fois champion de France</span></li>
      <li><b>2</b><span>participations aux championnats du monde</span></li>
      <li><b>40+</b><span>ans d’expérience dans le milieu</span></li>
    </ul>
  </div>
  <div style="height:clamp(56px,8vw,120px)"></div>
</section>

<section class="slab slab--mist" data-tone="chalk" aria-labelledby="mission">
  <div class="wrap split">
    <div class="split-sticky">
      <h2 id="mission" class="h2">Caementum ne vend pas un outil, mais <span class="hl">un niveau de présence.</span></h2>
    </div>
    <div style="display:grid;gap:20px;align-content:start">
      <p class="lead">Les applications automatisées distribuent des plans standardisés, sans suivi réel. Beaucoup de coureurs finissent par abandonner faute de soutien.</p>
      <p class="measure">Caementum fait l’inverse : un coach analyse, conçoit et ajuste chaque plan à la main, avec une relation directe et sincère. Du latin <em>caementum</em>, le matériau qui liait les pierres de Rome : des semaines de travail posées l’une sur l’autre, solidement liées.</p>
      ${hasPhoto('coaching.jpg') ? '<figure class="frame-photo frame-photo--wide"><img src="assets/img/photos/coaching.jpg" alt="Alexandre accompagne un coureur lors d’une séance" loading="lazy" decoding="async"></figure>' : ''}
      <div><a class="btn btn--dark" href="a-propos.html">Découvrir notre approche</a></div>
    </div>
  </div>
</section>

<section class="slab" data-tone="chalk" aria-labelledby="haut">
  <div class="wrap">
    <div class="section-head">
      <h2 id="haut" class="h2">Le haut niveau, <span class="hl">à votre allure.</span></h2>
      <p class="lead">Un coaching premium, construit sur l’expertise du terrain et une vraie relation entre le coach et le coureur.</p>
    </div>
    <div class="wall wall--2">
      <div class="block value"><span class="num">01</span><h3>Aucun algorithme</h3><p>Chaque plan est conçu et ajusté à la main par un coach expert, jamais généré par une machine.</p></div>
      <div class="block value"><span class="num">02</span><h3>Suivi par un athlète professionnel et des coachs</h3><p>Vous êtes guidé par un athlète qui connaît la compétition de l’intérieur et par des coachs, avec plus de 40 ans d’expérience dans le milieu.</p></div>
      <div class="block value"><span class="num">03</span><h3>100 % sur mesure</h3><p>Votre niveau, votre objectif, votre horaire et vos blessures passées : tout est pris en compte.</p></div>
      <div class="block value"><span class="num">04</span><h3>Un plan qui évolue</h3><p>Un suivi régulier et des ajustements selon vos retours réels, pas un calendrier figé.</p></div>
    </div>
  </div>
</section>

<section class="slab" data-tone="ink" aria-labelledby="disc">
  <div class="wrap">
    <div class="section-head">
      <h2 id="disc" class="h2">Piste. Route. <span class="hl">Trail.</span></h2>
      <p class="lead">Un plan par terrain, écrit pour vous, ouvert à toutes les personnes. Choisissez votre discipline, nous écrivons la suite.</p>
    </div>
    <div class="disc-grid">
      ${Object.values(PACKS).map((p) => `<a class="disc" href="formations.html#${p.id}"><span class="disc-art">${hasPhoto(p.id + '.jpg') ? `<img class="disc-img" src="assets/img/photos/${p.id}.jpg" alt="" loading="lazy" decoding="async">` : art[p.id]}</span><span class="disc-tag">${p.tagline}</span><span class="disc-body"><span class="disc-name">${p.name}</span><span class="disc-txt">${p.distances.join(', ')}.</span><span class="disc-price">Dès ${money(Math.round(p.year / 12))} par mois</span><span class="disc-note">Forfait 12 mois, paiement unique.</span></span></a>`).join('')}
    </div>
    <p class="fine mt-l">Prix par mois avec le forfait de 12 mois (−20 %), payé en une fois. Forfaits de 6 mois (−10 %) et de 1 mois aussi offerts. Pack Communautaire dès ${money(COMMUNAUTAIRE.monthly)} par mois. Prix avant taxes. <a class="link" href="formations.html#tarifs">Voir tous les tarifs</a>.</p>
  </div>
</section>

<section class="slab" data-tone="chalk" id="methode" aria-labelledby="meth">
  <div class="wrap">
    <div class="section-head">
      <h2 id="meth" class="h2">Six étapes, <span class="hl">un seul coach.</span></h2>
      <p class="lead">De l’inscription au premier débriefing, vous savez toujours ce qui vous attend.</p>
    </div>
    <ol class="timeline">
      ${steps.map(([t, d], i) => `<li><span class="tl-n">${String(i + 1).padStart(2, '0')}</span><h3>${t}</h3><p>${d}</p></li>`).join('')}
    </ol>
    <p class="quote">« Zéro automatisation. Chaque séance est écrite par le coach après analyse de vos retours. »</p>
  </div>
</section>

<section class="slab slab--mist" data-tone="chalk" aria-labelledby="fond">
  <div class="wrap split split--even founder">
    <figure class="founder-photo"><img src="assets/img/photos/fondateur.jpg" alt="Alexandre Ben Ammar franchit la rivière lors d’un 3 000 m steeple" width="900" height="900" loading="lazy" decoding="async"></figure>
    <div style="display:grid;gap:22px;align-content:center">
      <h2 id="fond" class="h2">Alexandre Ben Ammar</h2>
      <p class="lead">Athlète international, Alexandre a fondé Caementum pour transmettre à chaque coureur la rigueur du haut niveau et une vraie relation humaine.</p>
      <ul class="rows">
        <li><b>2×</b><span>Participations aux championnats du monde, dont une finale</span></li>
        <li><b>5×</b><span>Champion de France</span></li>
        <li><b>20×</b><span>Champion de Tunisie</span></li>
        <li><b class="dash" aria-hidden="true"></b><span>Champion de la Méditerranée</span></li>
        <li><b class="dash" aria-hidden="true"></b><span>Finaliste aux championnats d’Afrique</span></li>
      </ul>
      <div class="actions"><a class="btn btn--dark" href="a-propos.html">Notre histoire</a></div>
    </div>
  </div>
</section>

<section class="slab slab--blue slab--slant" data-tone="ink" aria-labelledby="shop">
  <div class="wrap split split--even">
    <div style="display:grid;gap:22px;align-content:center">
      <h2 id="shop" class="h2">Portez la <span class="hl">croisée.</span></h2>
      <p class="lead">Des vêtements de course aux couleurs de la marque : pour s’entraîner, pour courir, pour se reconnaître. La collection est en préparation.</p>
      <div class="actions"><a class="btn btn--light" href="boutique.html">Voir la boutique</a></div>
    </div>
    ${hasPhoto('boutique.jpg') ? '<figure class="frame-photo frame-photo--light"><img src="assets/img/photos/boutique.jpg" alt="Vêtements de la marque portés en course" loading="lazy" decoding="async"></figure>' : '<div class="band-art">' + garment('tshirt', 'garment garment--lg') + garment('casquette', 'garment garment--md') + '</div>'}
  </div>
</section>

<section class="slab" data-tone="chalk" aria-labelledby="faq">
  <div class="wrap">
    <div class="section-head"><p class="eyebrow">Questions fréquentes</p><h2 id="faq" class="h2">Avant de <span class="hl">commencer.</span></h2></div>
    ${faqHtml()}
  </div>
</section>

${ctaBand({
    title: 'Courez avec un vrai coach.',
    text: 'Choisissez votre formation, réservez votre visio et recevez un plan écrit pour vous.',
    primary: '<a class="btn btn--primary" href="formations.html#tarifs">Acheter une formation</a>',
    secondary: '<a class="btn btn--ghost" href="contact.html">Poser une question</a>',
  })}
`,
};
