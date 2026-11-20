import { layout, ctaBand, COLLECTIF } from '../lib.mjs';

export default {
  file: 'collectif.html',
  title: 'Caementum Collectif : séances de groupe pour organisations',
  description: 'Séances collectives de course et de mise en forme pour entreprises, écoles, collectivités, associations et résidences. Offre sur mesure, au Québec.',
  schema: [],
  body: `
<section class="page-head">
  <div class="wrap">
    <h1 class="h1">Faire entrer la performance dans votre organisation.</h1>
    <p class="lead">Caementum Collectif apporte la culture de la santé et de l’effort partagé aux équipes, aux élèves et aux aînés, avec la rigueur du haut niveau.</p>
  </div>
</section>

<section class="slab" data-tone="chalk" aria-labelledby="pour">
  <div class="wrap">
    <div class="section-head"><h2 id="pour" class="h2">Pour qui ?</h2></div>
    <div class="wall wall--3">
      <div class="block principle"><h3>Entreprises</h3><p>Bien-être et cohésion d’équipe, pour les entrepreneurs et leurs employés.</p></div>
      <div class="block principle"><h3>Écoles et collectivités</h3><p>Des habitudes sportives chez les jeunes et des programmes sport-santé locaux.</p></div>
      <div class="block principle"><h3>Aînés et associations</h3><p>Des séances adaptées aux personnes aînées, en résidence ou en association.</p></div>
    </div>
  </div>
</section>

<section class="slab" data-tone="ink" aria-labelledby="forfaits">
  <div class="wrap">
    <div class="section-head">
      <h2 id="forfaits" class="h2">Trois forfaits récurrents.</h2>
      <p class="lead">Choisissez la fréquence qui convient à votre structure. Chaque offre est ajustée à votre groupe et à votre budget.</p>
    </div>
    <div class="wall wall--3 who">
      ${COLLECTIF.map((c) => `<div class="block"><h3>${c.name}</h3><p>${c.text}</p></div>`).join('')}
    </div>
    <p class="fine mt-l">Tarification sur devis, selon la taille du groupe et la fréquence des séances.</p>
  </div>
</section>
${ctaBand({
    title: 'Parlons de votre groupe.',
    text: 'Décrivez votre organisation et vos besoins : Alexandre vous propose une offre sur mesure.',
    primary: '<a class="btn btn--light" href="contact.html?sujet=collectif#ecrire">Demander une offre collective</a>',
  })}
`,
};
