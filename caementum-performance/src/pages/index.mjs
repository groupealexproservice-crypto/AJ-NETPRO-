import { layout, markSvg, PACKS, PRODUCTS, money, ctaBand, SITE, COMMUNAUTAIRE, hasPhoto } from '../lib.mjs';
import { productCard, garment, faqHtml, faqSchema } from '../parts.mjs';

const steps = [
  ['Réservation et paiement', 'Vous choisissez votre formation et votre forfait, puis vous payez en ligne en toute sécurité.'],
  ['Planification de la visio', 'Alexandre vous contacte pour fixer le moment de votre visioconférence d’évaluation.'],
  ['Visio d’évaluation', 'Une conversation sur vos objectifs, votre niveau, vos antécédents, vos disponibilités et vos contraintes.'],
  ['Conception manuelle', 'Alexandre écrit votre plan lui-même, adapté à votre profil. Aucune automatisation.'],
  ['Livraison de votre plan', 'Vous recevez votre programme détaillé, prêt à suivre dès la première semaine.'],
  ['Suivi et ajustements', 'Avec les forfaits de 6 et 12 mois : une visio de suivi chaque mois et un nouveau plan.'],
];

// Fonds illustrés des services (en attendant des photos de terrain)
const art = {
  piste: `<svg viewBox="0 0 300 380" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><rect width="300" height="380" fill="#171b24"/><g stroke="#2f3647" stroke-width="3" fill="none"><path d="M-40 380 L150 110"/><path d="M20 380 L160 110"/><path d="M90 380 L170 110"/><path d="M170 380 L180 110"/><path d="M250 380 L190 110"/><path d="M320 380 L200 110"/><path d="M380 380 L210 110"/></g></svg>`,
  route: `<svg viewBox="0 0 300 380" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><rect width="300" height="380" fill="#171b24"/><path d="M135 110 H165 L290 380 H10 Z" fill="#10131a"/><g fill="#3a4357"><path d="M148 140 h4 v14 h-4z"/><path d="M146 186 h8 v26 h-8z"/><path d="M143 252 h14 v42 h-14z"/><path d="M138 336 h24 v44 h-24z"/></g></svg>`,
  trail: `<svg viewBox="0 0 300 380" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><rect width="300" height="380" fill="#171b24"/><path d="M0 240 L70 140 L120 205 L190 100 L300 240 V380 H0Z" fill="#232a38"/><path d="M0 290 L90 210 L160 270 L240 180 L300 260 V380 H0Z" fill="#1c2230"/><path d="M0 345 L110 290 L200 335 L300 295 V380 H0Z" fill="#141923"/></svg>`,
  groupes: `<svg viewBox="0 0 300 380" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><rect width="300" height="380" fill="#171b24"/><g fill="#3a4357"><circle cx="90" cy="190" r="16"/><circle cx="140" cy="170" r="16"/><circle cx="190" cy="190" r="16"/><circle cx="115" cy="225" r="16"/><circle cx="165" cy="225" r="16"/><circle cx="215" cy="215" r="16"/></g><g stroke="#2f3647" stroke-width="3" fill="none"><path d="M0 300 H300"/><path d="M0 320 H300"/><path d="M0 340 H300"/></g></svg>`,
};

export default {
  file: 'index.html',
  title: 'Accueil',
  description: 'Caementum Performance : formations de course à pied avec un athlète international, groupes de course hebdomadaires et vêtements de sport de la marque. Piste, route et trail, partout au Québec.',
  schema: [
    {
      '@context': 'https://schema.org', '@type': 'ProfessionalService', name: SITE.name, url: SITE.url,
      description: 'Formations de course à pied personnalisées par un athlète international, groupes de course et vêtements de sport.',
      areaServed: [{ '@type': 'AdministrativeArea', name: 'Québec' }, { '@type': 'City', name: 'Montréal' }],
      address: { '@type': 'PostalAddress', addressLocality: 'Montréal', addressRegion: 'QC', addressCountry: 'CA' },
      priceRange: '19,98 $ à 150 $',
      founder: { '@type': 'Person', name: 'Alexandre Ben Ammar' },
    },
    faqSchema(),
  ],
  body: `
<section class="hero" aria-labelledby="h1">
  <div class="wrap hero-grid">
    <div class="hero-copy">
      <p class="eyebrow">Coaching de course à pied</p>
      <h1 id="h1" class="h1">La performance se construit.</h1>
      <p class="lead">Des formations écrites à la main par un athlète international, des groupes de course chaque semaine et des vêtements de sport de la marque. Piste, route ou trail, partout au Québec.</p>
      <div class="actions">
        <a class="btn btn--primary" href="formations.html">Voir les formations</a>
        <a class="btn btn--ghost" href="groupes.html">Rejoindre un groupe de course</a>
      </div>
    </div>
    ${hasPhoto('hero.jpg')
      ? '<figure class="hero-figure"><img src="assets/img/photos/hero.jpg" alt="Coureur en montagne à la lumière du lever du jour" width="1800" height="1200" fetchpriority="high"></figure>'
      : `<div class="hero-art" aria-hidden="true">${markSvg({ className: 'hero-mark' })}</div>`}
  </div>
  <div class="wrap">
    <ul class="hero-facts" aria-label="Palmarès en chiffres">
      <li><b>20</b><span>fois champion de Tunisie</span></li>
      <li><b>5</b><span>fois champion de France</span></li>
      <li><b>2</b><span>participations aux championnats du monde</span></li>
      <li><b>40+</b><span>ans d’expérience dans le milieu</span></li>
    </ul>
  </div>
</section>

<section class="slab" data-tone="chalk" aria-labelledby="serv">
  <div class="wrap">
    <div class="section-head">
      <p class="eyebrow">Nos services</p>
      <h2 id="serv" class="h2">Trois formations, un groupe de course.</h2>
      <p class="lead">Choisissez la formule qui vous convient : un plan écrit pour vous, ou une sortie de groupe chaque semaine.</p>
    </div>
    <div class="disc-grid">
      ${Object.values(PACKS).map((p) => `<a class="disc" href="formations.html#${p.id}"><span class="disc-art">${hasPhoto(p.id + '.jpg') ? `<img class="disc-img" src="assets/img/photos/${p.id}.jpg" alt="" loading="lazy" decoding="async">` : art[p.id]}</span><span class="disc-tag">Formation</span><span class="disc-body"><span class="disc-name">${p.name}</span><span class="disc-txt">${p.distances.join(', ')}.</span><span class="disc-price">Dès ${money(Math.round(p.year / 12))} par mois</span><span class="disc-note">Forfait 12 mois, paiement unique</span></span></a>`).join('')}
      <a class="disc" href="groupes.html"><span class="disc-art">${hasPhoto('groupes.jpg') ? '<img class="disc-img" src="assets/img/photos/groupes.jpg" alt="" loading="lazy" decoding="async">' : art.groupes}</span><span class="disc-tag">Abonnement</span><span class="disc-body"><span class="disc-name">Groupes de course</span><span class="disc-txt">Une activité de course à pied organisée chaque semaine.</span><span class="disc-price">${money(COMMUNAUTAIRE.monthly)} par mois</span><span class="disc-note">Sans engagement</span></span></a>
    </div>
    <p class="fine mt-l">Prix avant taxes. Formations : prix par mois avec le forfait de 12 mois (−20 %), payé en une fois, ou forfaits de 6 mois (−10 %) et de 1 mois. <a class="link" href="formations.html#tarifs">Voir tous les tarifs</a>.</p>
  </div>
</section>

<section class="slab slab--mist" data-tone="chalk" aria-labelledby="mission">
  <div class="wrap split">
    <div class="split-sticky">
      <p class="eyebrow">Notre approche</p>
      <h2 id="mission" class="h2">Un coach, pas un algorithme.</h2>
      <p class="lead">Les applications distribuent des plans standardisés, sans suivi réel. Chez Caementum, un coach analyse, conçoit et ajuste chaque plan à la main, avec une relation directe et sincère.</p>
      <div><a class="btn btn--dark" href="a-propos.html">Découvrir notre approche</a></div>
    </div>
    <div class="wall wall--2">
      <div class="block value"><span class="num">01</span><h3>Aucun algorithme</h3><p>Chaque plan est conçu et ajusté à la main par un coach expert, jamais généré par une machine.</p></div>
      <div class="block value"><span class="num">02</span><h3>Suivi par un athlète professionnel et des coachs</h3><p>Vous êtes guidé par un athlète qui connaît la compétition de l’intérieur et par des coachs, avec plus de 40 ans d’expérience dans le milieu.</p></div>
      <div class="block value"><span class="num">03</span><h3>100 % sur mesure</h3><p>Votre niveau, votre objectif, votre horaire et vos blessures passées : tout est pris en compte.</p></div>
      <div class="block value"><span class="num">04</span><h3>Un plan qui évolue</h3><p>Un suivi régulier et des ajustements selon vos retours réels, pas un calendrier figé.</p></div>
    </div>
  </div>
</section>

<section class="slab" data-tone="chalk" id="methode" aria-labelledby="meth">
  <div class="wrap">
    <div class="section-head">
      <p class="eyebrow">Le parcours</p>
      <h2 id="meth" class="h2">Six étapes, un seul coach.</h2>
      <p class="lead">De l’inscription au suivi, vous savez toujours ce qui vous attend.</p>
    </div>
    <ol class="timeline">
      ${steps.map(([t, d], i) => `<li><span class="tl-n">${i + 1}</span><h3>${t}</h3><p>${d}</p></li>`).join('')}
    </ol>
  </div>
</section>

<section class="slab" data-tone="ink" aria-labelledby="fond">
  <div class="wrap split split--even founder">
    <div style="display:grid;gap:22px;align-content:center">
      <p class="eyebrow">Le fondateur</p>
      <h2 id="fond" class="h2">Alexandre Ben Ammar</h2>
      <p class="lead">Athlète international, Alexandre a fondé Caementum pour transmettre à chaque coureur la rigueur du haut niveau et une vraie relation humaine.</p>
      <div class="actions"><a class="btn btn--light" href="a-propos.html">Notre histoire</a></div>
    </div>
    <ul class="rows">
      <li><b>2×</b><span>Participations aux championnats du monde, dont une finale</span></li>
      <li><b>5×</b><span>Champion de France</span></li>
      <li><b>20×</b><span>Champion de Tunisie</span></li>
      <li><b class="dash" aria-hidden="true"></b><span>Champion de la Méditerranée</span></li>
      <li><b class="dash" aria-hidden="true"></b><span>Finaliste aux championnats d’Afrique</span></li>
    </ul>
  </div>
</section>

<section class="slab slab--mist" data-tone="chalk" aria-labelledby="shop">
  <div class="wrap split split--even">
    <div style="display:grid;gap:22px;align-content:center">
      <p class="eyebrow">La boutique</p>
      <h2 id="shop" class="h2">Les vêtements de la marque.</h2>
      <p class="lead">Des vêtements de course pensés pour s’entraîner, courir et se reconnaître. La collection est en préparation.</p>
      <div class="actions"><a class="btn btn--dark" href="boutique.html">Voir la boutique</a></div>
    </div>
    ${hasPhoto('boutique.jpg') ? '<figure class="frame-photo"><img src="assets/img/photos/boutique.jpg" alt="Vêtements de la marque portés en course" loading="lazy" decoding="async"></figure>' : '<div class="band-art">' + garment('tshirt', 'garment garment--lg') + garment('casquette', 'garment garment--md') + '</div>'}
  </div>
</section>

<section class="slab" data-tone="chalk" aria-labelledby="faq">
  <div class="wrap">
    <div class="section-head"><p class="eyebrow">Questions fréquentes</p><h2 id="faq" class="h2">Avant de commencer.</h2></div>
    ${faqHtml()}
  </div>
</section>

${ctaBand({
    title: 'Prêt à passer à l’action ?',
    text: 'Choisissez votre formation, rejoignez un groupe de course ou écrivez-nous pour trouver la bonne formule.',
    primary: '<a class="btn btn--primary" href="formations.html#tarifs">Acheter une formation</a>',
    secondary: '<a class="btn btn--ghost" href="groupes.html">Rejoindre un groupe</a>',
  })}
`,
};
