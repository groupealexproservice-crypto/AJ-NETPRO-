import { layout, markSvg, PACKS, PRODUCTS, money, ctaBand, SITE, COMMUNAUTAIRE } from '../lib.mjs';
import { productCard, faqHtml, faqSchema } from '../parts.mjs';

const steps = [
  ['Réservation et paiement', 'Vous choisissez votre formation et votre forfait, puis vous payez en ligne en toute sécurité.'],
  ['Planification de la visio', 'Alexandre vous contacte pour fixer le moment de votre visioconférence d’évaluation.'],
  ['Visio d’évaluation', 'Une conversation sur vos objectifs, votre niveau, vos antécédents, vos disponibilités et vos contraintes.'],
  ['Conception manuelle', 'Alexandre écrit votre plan lui-même, adapté à votre profil unique. Aucune automatisation.'],
  ['Livraison de votre plan', 'Vous recevez votre programme détaillé, prêt à suivre dès la première semaine.'],
  ['Suivi et ajustements', 'Avec les forfaits de 6 et 12 mois : une visio de suivi chaque mois et un nouveau plan adapté à votre progression.'],
];

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
  <div class="wrap hero-grid">
    <div class="hero-copy">
      <h1 id="h1" class="h1">La performance se construit.</h1>
      <p class="lead">Coaching de course à pied 100 % humain, plans écrits à la main, et vêtements de sport pour celles et ceux qui s’entraînent sérieusement.</p>
      <div class="actions">
        <a class="btn btn--primary" href="formations.html">Voir les formations</a>
        <a class="btn btn--ghost" href="boutique.html">Découvrir la boutique</a>
      </div>
      <p class="hero-note">Piste, route ou trail. Partout au Québec.</p>
    </div>
    ${markSvg({ className: 'hero-mark', animate: true, title: 'Le logo Caementum Performance : un X fait de bandes diagonales' })}
  </div>
  <div class="wrap">
    <div class="wall wall--4 cred">
      <a class="block door" href="formations.html#piste"><h3>Piste</h3><p>Du 800 m au 5 000 m : le chrono avant tout.</p><span class="go">Voir la formation</span></a>
      <a class="block door" href="formations.html#route"><h3>Route</h3><p>Du 5 km au marathon et à l’ultra.</p><span class="go">Voir la formation</span></a>
      <a class="block door" href="formations.html#trail"><h3>Trail</h3><p>Dénivelé, nature et ultra-trail.</p><span class="go">Voir la formation</span></a>
      <a class="block door" href="boutique.html"><h3>Boutique</h3><p>Les vêtements de la marque, pour courir et s’entraîner.</p><span class="go">Entrer dans la boutique</span></a>
    </div>
  </div>
  <div style="height:clamp(56px,8vw,112px)"></div>
</section>

<section class="slab" data-tone="chalk" aria-labelledby="mission">
  <div class="wrap split">
    <div class="split-sticky">
      <h2 id="mission" class="h2">Rendre le haut niveau accessible.</h2>
      <p class="lead">Caementum est né d’une conviction : la performance durable demande une relation directe et sincère entre un entraîneur et un coureur. Pas un algorithme, une personne.</p>
      <p class="measure">Du nom latin du matériau qui liait les pierres de Rome, <em>caementum</em> raconte notre méthode : des semaines de travail posées l’une sur l’autre, solidement liées entre elles.</p>
    </div>
    <div class="wall wall--2">
      <div class="block value"><h3>Humain</h3><p>Chaque plan est écrit à la main, après l’analyse de vos retours. Aucune automatisation.</p></div>
      <div class="block value"><h3>Exigence</h3><p>La rigueur du haut niveau, transmise à tous les profils et dosée pour vous.</p></div>
      <div class="block value"><h3>Sincérité</h3><p>Un canal direct avec votre entraîneur, des conseils honnêtes, des objectifs réalistes.</p></div>
      <div class="block value"><h3>Constance</h3><p>Un suivi qui dure et un plan qui évolue avec votre forme, votre horaire et vos imprévus.</p></div>
    </div>
  </div>
</section>

<section class="slab" data-tone="ink" aria-labelledby="distingue">
  <div class="wrap">
    <div class="section-head">
      <h2 id="distingue" class="h2">Ce qui nous distingue.</h2>
      <p class="lead">Entre une application et un coach privé hors de prix, il y avait un vide. Caementum le comble.</p>
    </div>
    <div class="wall wall--3 who">
      <div class="block"><h3>Un athlète international</h3><p>Alexandre Ben Ammar a participé aux Jeux olympiques de Rio, et il est cinq fois champion de France et vingt fois champion de Tunisie. Son expérience vient du terrain.</p></div>
      <div class="block"><h3>Un plan écrit pour vous</h3><p>Votre niveau, vos blessures passées, votre horaire : tout est pris en compte, jamais un modèle générique.</p></div>
      <div class="block"><h3>Un accompagnement à 360°</h3><p>Entraînement, récupération, nutrition et prévention des blessures pensés ensemble.</p></div>
    </div>
    <div class="actions mt-l"><a class="btn btn--primary" href="a-propos.html">Découvrir l’origine du projet</a></div>
  </div>
</section>

<section class="slab" data-tone="chalk" aria-labelledby="forms">
  <div class="wrap">
    <div class="section-head">
      <h2 id="forms" class="h2">Les formations.</h2>
      <p class="lead">Trois disciplines, un seul entraîneur. Choisissez votre terrain, puis votre durée.</p>
    </div>
    <div class="wall wall--3">
      ${Object.values(PACKS).map((p) => `<article class="block value" style="display:grid;gap:12px;align-content:start"><h3>${p.name}</h3><p>${p.tagline}. ${p.pitch}</p><p class="price-line"><span class="price-big" style="font-size:2rem">${money(p.monthly)}</span><span class="price-unit">pour 1 mois, avant taxes</span></p><div class="actions"><a class="btn btn--dark" href="formations.html#${p.id}">Voir la formation</a></div></article>`).join('')}
    </div>
    <p class="fine mt-l">Forfaits de 6 mois (−10 %) et de 12 mois (−20 %). Pack Communautaire dès ${money(COMMUNAUTAIRE.monthly)} par mois. <a class="link" href="formations.html#tarifs">Voir tous les tarifs</a>.</p>
  </div>
</section>

<section class="slab" data-tone="ink" aria-labelledby="shop">
  <div class="wrap">
    <div class="section-head">
      <h2 id="shop" class="h2">La boutique.</h2>
      <p class="lead">Des vêtements de sport pensés pour courir, conçus sous la marque. La collection arrive : découvrez les premières pièces.</p>
    </div>
    <div class="shop">
      ${PRODUCTS.slice(0, 3).map(productCard).join('\n')}
    </div>
    <div class="actions mt-l"><a class="btn btn--light" href="boutique.html">Voir toute la boutique</a></div>
  </div>
</section>

<section class="slab" data-tone="chalk" id="methode" aria-labelledby="meth">
  <div class="wrap">
    <div class="section-head">
      <h2 id="meth" class="h2">De la découverte à la ligne de départ.</h2>
      <p class="lead">Un parcours simple, en six étapes, où l’humain garde la main du début à la fin.</p>
    </div>
    <ol class="wall wall--3">
      ${steps.map(([t, d], i) => `<li class="block step"><span class="step-n" aria-hidden="true">${i + 1}</span><h3>${t}</h3><p>${d}</p></li>`).join('\n      ')}
    </ol>
  </div>
</section>

<section class="slab" data-tone="ink" aria-labelledby="faq">
  <div class="wrap">
    <div class="section-head"><h2 id="faq" class="h2">Questions fréquentes</h2></div>
    ${faqHtml()}
  </div>
</section>

${ctaBand({
    title: 'Posez la première pierre.',
    text: 'Choisissez votre formation, ou écrivez à Alexandre pour trouver la bonne.',
    primary: '<a class="btn btn--primary" href="formations.html#tarifs">Acheter une formation</a>',
    secondary: '<a class="btn btn--ghost" href="contact.html">Nous écrire</a>',
  })}
`,
};
