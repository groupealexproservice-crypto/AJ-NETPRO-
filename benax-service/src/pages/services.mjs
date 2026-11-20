import { SITE, photo, ctaBand } from '../lib.mjs';

const split = (id, tone, title, lead, items, extra, cta, img) => `
<section class="slab" data-tone="${tone}" id="${id}" aria-labelledby="t-${id}">
  <div class="wrap split split--even">
    <div class="stack">${img}</div>
    <div style="display:grid;gap:22px;align-content:start">
      <h2 id="t-${id}" class="h2">${title}</h2>
      <p class="lead">${lead}</p>
      <ul class="ticks">${items.map((i) => `<li>${i}</li>`).join('')}</ul>
      <p class="measure">${extra}</p>
      <div class="actions">${cta}</div>
    </div>
  </div>
</section>`;

export default {
  file: 'services.html',
  title: 'Services d’entretien commercial et résidentiel',
  description: 'Entretien de bureaux, commerces, immeubles, maisons et condos à Montréal. Nettoyage en profondeur, après déménagement, vitres, planchers et désinfection.',
  schema: [],
  body: `
<section class="page-head">
  <div class="wrap">
    <h1 class="h1">Un entretien pensé pour vos espaces.</h1>
    <p class="lead">Du bureau corporatif à la résidence exigeante, chaque mandat est conçu sur mesure selon votre horaire et vos standards.</p>
  </div>
</section>
${split('commercial', 'chalk', 'Entretien commercial',
    'Un service rigoureux pour maintenir vos espaces professionnels à leur meilleur, jour après jour.',
    ['Bureaux et espaces corporatifs', 'Commerces et boutiques', 'Immeubles et aires communes', 'Nettoyage régulier et contrats long terme'],
    'Pour les entreprises, nous privilégions les contrats récurrents avec un conseiller dédié. Les interventions peuvent se faire en dehors des heures d’ouverture pour que vos locaux soient impeccables à l’arrivée de votre équipe.',
    '<a class="btn btn--dark" href="soumission.html?service=commercial">Obtenir une soumission commerciale</a>',
    photo('team-1.jpg', 'Polissage de plancher dans un espace commercial', { ratio: '4 / 5' }))}
${split('residentiel', 'ink', 'Entretien résidentiel',
    'Un nettoyage soigné, discret et fiable pour les résidences exigeantes et les copropriétés.',
    ['Maisons et condos', 'Appartements et locations', 'Nettoyage en profondeur', 'Nettoyage après déménagement'],
    'Pour un entretien régulier ou un grand ménage ponctuel, nous nous adaptons à votre horaire et à vos préférences, y compris pour les produits.',
    '<a class="btn btn--light" href="soumission.html?service=residentiel">Soumission résidentielle</a>',
    photo('team-3.jpg', 'Lavage de vitres en hauteur', { ratio: '4 / 5' }))}

<section class="slab" data-tone="chalk" id="complements" aria-labelledby="compl">
  <div class="wrap">
    <div class="section-head">
      <h2 id="compl" class="h2">Services complémentaires.</h2>
      <p class="lead">Ajoutez-les à votre contrat ou commandez-les à l’unité.</p>
    </div>
    <div class="wall wall--4">
      <div class="block principle"><h3>Vitres et surfaces vitrées</h3><p>Lavage intérieur et extérieur, y compris en hauteur.</p></div>
      <div class="block principle"><h3>Désinfection sanitaire</h3><p>Une propreté profonde des zones à fort contact.</p></div>
      <div class="block principle"><h3>Planchers et tapis</h3><p>Polissage, lavage mécanisé et entretien des revêtements.</p></div>
      <div class="block principle"><h3>Produits écologiques</h3><p>Disponibles sur demande pour tous nos services.</p></div>
    </div>
  </div>
</section>
${ctaBand({
    title: 'Dites-nous ce dont vous avez besoin.',
    text: 'Une soumission gratuite et personnalisée, en moins de 24 heures.',
    primary: '<a class="btn btn--light" href="soumission.html">Demander une soumission</a>',
    secondary: `<a class="btn btn--ghost" href="tel:${SITE.phoneHref}">Appeler ${SITE.phone}</a>`,
  })}
`,
};
