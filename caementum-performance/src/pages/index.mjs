import { layout, markSvg, PACKS, money, ctaBand, SITE, COMMUNAUTAIRE, A_VENIR } from '../lib.mjs';
import { packPanel, faqHtml, faqSchema } from '../parts.mjs';

const steps = [
  ['Réservation et paiement', 'Vous choisissez votre programme et votre forfait, puis vous payez en ligne en toute sécurité.'],
  ['Planification de la visio', 'Alexandre vous contacte pour fixer le moment de votre visioconférence d’évaluation.'],
  ['Visio d’évaluation', 'Une conversation d’environ 20 à 30 minutes : objectifs, niveau, antécédents, disponibilités et contraintes.'],
  ['Conception manuelle', 'Alexandre écrit votre plan lui-même, adapté à votre profil unique. Aucune automatisation.'],
  ['Livraison de votre plan', 'Vous recevez votre programme détaillé, prêt à suivre dès la première semaine.'],
  ['Suivi et ajustements', 'Avec les forfaits de 6 et 12 mois : une visio de suivi chaque mois et un nouveau plan adapté à votre progression.'],
];

export default {
  file: 'index.html',
  title: 'Accueil',
  description: 'Coaching de course à pied 100 % humain par Alexandre Ben Ammar, athlète olympique. Piste, route et trail, partout au Québec. Dès 80 $ par mois.',
  schema: [
    {
      '@context': 'https://schema.org', '@type': 'ProfessionalService', name: SITE.name, url: SITE.url,
      description: 'Coaching de course à pied personnalisé, par un athlète olympique, partout au Québec.',
      areaServed: [{ '@type': 'AdministrativeArea', name: 'Québec' }, { '@type': 'City', name: 'Montréal' }],
      address: { '@type': 'PostalAddress', addressLocality: 'Montréal', addressRegion: 'QC', addressCountry: 'CA' },
      priceRange: '80 $ à 150 $ par mois',
      founder: { '@type': 'Person', name: 'Alexandre Ben Ammar' },
      hasOfferCatalog: {
        '@type': 'OfferCatalog', name: 'Programmes de coaching',
        itemListElement: Object.values(PACKS).map((p) => ({
          '@type': 'Offer', name: `Programme ${p.name}`, description: p.pitch, priceCurrency: 'CAD', price: String(p.monthly),
          priceSpecification: { '@type': 'UnitPriceSpecification', price: String(p.monthly), priceCurrency: 'CAD', unitText: 'mois' },
        })),
      },
    },
    faqSchema(),
  ],
  body: `
<section class="hero" aria-labelledby="h1">
  <div class="wrap hero-grid">
    <div class="hero-copy">
      <h1 id="h1" class="h1">La performance se construit.</h1>
      <p class="lead">Coaching de course à pied 100 % humain, signé Alexandre Ben Ammar, athlète olympique. Piste, route ou trail, partout au Québec.</p>
      <div class="actions">
        <a class="btn btn--light" href="programmes.html">Voir les programmes</a>
        <a class="btn btn--ghost" href="contact.html#appel">Parler à Alexandre</a>
      </div>
      <p class="hero-note">Chaque plan est écrit à la main. Aucun algorithme.</p>
    </div>
    ${markSvg({ className: 'hero-mark', size: 520, animate: true, title: 'Le logo Caementum : un C fait de blocs de pierre qui se desserrent comme une foulée' })}
  </div>
  <div class="wrap">
    <div class="wall wall--4 cred">
      <div class="block"><p class="cred-main">Qualifié aux Jeux olympiques de Rio 2016</p><p class="cred-sub">Athlète de haut niveau, toujours en activité.</p></div>
      <div class="block"><p class="cred-main">22 titres nationaux</p><p class="cred-sub">2 000 m, 3 000 m steeple et 5 000 m, plus 5 titres français.</p></div>
      <div class="block"><p class="cred-main">Champion de la Méditerranée</p><p class="cred-sub">Sacré en 2016.</p></div>
      <div class="block"><p class="cred-main">13 min 16 s au 5 000 m</p><p class="cred-sub">28 min 22 s au 10 km.</p></div>
    </div>
  </div>
  <div style="height:clamp(56px,8vw,112px)"></div>
</section>

<section class="slab" data-tone="chalk" aria-labelledby="philo">
  <div class="wrap split">
    <div class="split-sticky">
      <h2 id="philo" class="h2">Une application vous donne un plan. Ici, quelqu’un le lit chaque semaine.</h2>
      <p class="lead">Beaucoup de coureurs abandonnent faute de suivi. Caementum remplace l’automatisme par une présence.</p>
    </div>
    <div class="wall wall--2">
      <div class="block principle"><h3>Écrit à la main</h3><p>Chaque séance est conçue par Alexandre après l’analyse de vos retours. Pas de modèle générique, pas d’automatisation.</p></div>
      <div class="block principle"><h3>Ajusté à votre vie</h3><p>Horaire chargé, fatigue, petite blessure : votre plan suit votre état de forme réel, pas un calendrier théorique.</p></div>
      <div class="block principle"><h3>Une vraie personne répond</h3><p>Un canal direct avec votre entraîneur et un débriefing chaque semaine pour garder le cap.</p></div>
      <div class="block principle"><h3>Pensé à 360°</h3><p>Entraînement, nutrition, récupération et prévention travaillent ensemble plutôt que chacun de son côté.</p></div>
    </div>
  </div>
</section>

<section class="slab" data-tone="ink" id="programmes" aria-labelledby="prog">
  <div class="wrap">
    <div class="section-head">
      <h2 id="prog" class="h2">Trois disciplines, un seul entraîneur.</h2>
      <p class="lead">Chaque programme a son plan, ses séances et son suivi. Choisissez celui de votre terrain.</p>
    </div>
    <div class="wall wall--3">
      ${Object.values(PACKS).map((p) => packPanel(p)).join('\n')}
    </div>
    <p class="fine mt-l">Forfaits de 6 mois (−10 %) et de 12 mois (−20 %) disponibles. Prix avant taxes, en dollars canadiens. <a class="link" href="tarifs.html">Voir tous les tarifs</a>.</p>
  </div>
</section>

<section class="slab" data-tone="chalk" id="methode" aria-labelledby="meth">
  <div class="wrap">
    <div class="section-head">
      <h2 id="meth" class="h2">De l’inscription à la ligne de départ.</h2>
      <p class="lead">Un parcours simple, en six étapes, où l’humain garde la main du début à la fin.</p>
    </div>
    <ol class="wall wall--3">
      ${steps.map(([t, d], i) => `<li class="block step"><span class="step-n" aria-hidden="true">${i + 1}</span><h3>${t}</h3><p>${d}</p></li>`).join('\n      ')}
    </ol>
    <p class="quote">« Zéro automatisation. Chaque séance est écrite par le coach après l’analyse de vos retours. »</p>
  </div>
</section>

<section class="slab" data-tone="ink" aria-labelledby="qui">
  <div class="wrap">
    <div class="section-head">
      <h2 id="qui" class="h2">Pour chaque coureur, un objectif différent.</h2>
    </div>
    <div class="wall wall--3 who">
      <div class="block"><h3>Débutants</h3><p><strong>Structure et sécurité.</strong> Une progression claire pour prendre de bonnes habitudes et éviter la blessure.</p></div>
      <div class="block"><h3>Compétiteurs</h3><p><strong>Chrono et affûtage.</strong> Des séances ciblées pour battre votre record le jour de la course.</p></div>
      <div class="block"><h3>Élites</h3><p><strong>Gains marginaux.</strong> Le détail qui fait la différence quand l’écart se joue à quelques secondes.</p></div>
    </div>
  </div>
</section>

<section class="slab" data-tone="chalk" aria-labelledby="coach">
  <div class="wrap split">
    <figure class="portrait" aria-label="Portrait d’Alexandre Ben Ammar" data-photo-placeholder>
      ${markSvg({ size: 300 })}
    </figure>
    <div class="split-sticky">
      <h2 id="coach" class="h2">Alexandre Ben Ammar</h2>
      <p class="lead">Athlète olympique à Rio en 2016, champion de la Méditerranée la même année et 22 fois champion national. Il entraîne comme il a appris à courir : sur la piste, pas dans les manuels.</p>
      <p class="measure">Toujours en activité, Alexandre vise une nouvelle qualification olympique. Sa méthode vient du terrain, et il la met au service de tous les profils : du coureur qui débute à celui qui prépare le chrono de sa vie.</p>
      <div class="actions"><a class="btn btn--dark" href="a-propos.html">Découvrir son parcours</a></div>
    </div>
  </div>
</section>

<section class="slab" data-tone="ink" aria-labelledby="cmp">
  <div class="wrap">
    <div class="section-head">
      <h2 id="cmp" class="h2">Entre l’application et le coach privé, il y avait un vide.</h2>
      <p class="lead">Caementum offre l’expertise d’un olympique à un prix accessible pour le coureur engagé.</p>
    </div>
    <div class="table-wrap">
      <table class="compare">
        <thead><tr><th scope="col"><span class="sr">Critère</span></th><th scope="col">Application</th><th scope="col" class="is-us">Caementum</th><th scope="col">Coach privé</th></tr></thead>
        <tbody>
          <tr><th scope="row">Plan écrit par un humain</th><td class="dim">Non, généré automatiquement</td><td class="is-us">Oui, à la main</td><td>Oui</td></tr>
          <tr><th scope="row">Ajustement selon vos retours</th><td class="dim">Limité</td><td class="is-us">Chaque semaine</td><td>Oui</td></tr>
          <tr><th scope="row">Échange direct avec l’entraîneur</th><td class="dim">Non</td><td class="is-us">Oui</td><td>Oui</td></tr>
          <tr><th scope="row">Expérience olympique</th><td class="dim">Non</td><td class="is-us">Oui, Rio 2016</td><td class="dim">Variable</td></tr>
          <tr><th scope="row">Prix par mois</th><td class="dim">Faible</td><td class="is-us">80 $ à 150 $</td><td>Environ 300 $ et plus</td></tr>
        </tbody>
      </table>
    </div>
  </div>
</section>

<section class="slab" data-tone="chalk" aria-labelledby="plus">
  <div class="wrap">
    <div class="section-head">
      <h2 id="plus" class="h2">Et pour aller plus loin.</h2>
      <p class="lead">Courir seul, en groupe ou en équipe : Caementum s’adapte à votre façon de progresser.</p>
    </div>
    <div class="wall wall--3">
      <div class="block principle"><h3>Communautaire</h3><p>${money(COMMUNAUTAIRE.monthly)} par mois. Une communauté privée, un entraînement collectif par semaine et les conseils du coach.</p><p style="margin-top:14px"><a class="link" href="tarifs.html#communautaire">Rejoindre la communauté</a></p></div>
      <div class="block principle"><h3>Collectif</h3><p>Entreprises, écoles, associations et résidences : des séances collectives pour installer une culture de santé et de performance.</p><p style="margin-top:14px"><a class="link" href="collectif.html">Découvrir l’offre collective</a></p></div>
      <div class="block principle"><h3>Bientôt</h3><p>L’application, la synchronisation avec votre montre, la nutrition et la récupération, les camps d’entraînement et plus encore.</p><p style="margin-top:14px"><a class="link" href="bientot.html">Voir ce qui s’en vient</a></p></div>
    </div>
  </div>
</section>

<section class="slab" data-tone="chalk" aria-labelledby="faq">
  <div class="wrap">
    <div class="section-head"><h2 id="faq" class="h2">Questions fréquentes</h2></div>
    ${faqHtml()}
  </div>
</section>

${ctaBand({
    title: 'Posez la première pierre.',
    text: 'Parlez à Alexandre pour choisir le bon programme, ou inscrivez-vous directement.',
    primary: '<a class="btn btn--light" href="contact.html#appel">Parler à Alexandre</a>',
    secondary: '<a class="btn btn--ghost" href="tarifs.html">Voir les tarifs</a>',
  })}
`,
};
