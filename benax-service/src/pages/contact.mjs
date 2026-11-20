import { SITE, faqHtml, FAQ } from '../lib.mjs';

export default {
  file: 'contact.html',
  title: 'Contact',
  description: 'Joignez Benax Service : téléphone, courriel et zone desservie à Montréal et environs. Réponse en moins de 24 heures.',
  schema: [],
  body: `
<section class="page-head">
  <div class="wrap">
    <h1 class="h1">Parlons de votre projet.</h1>
    <p class="lead">Une question, un mandat ponctuel ou un contrat long terme ? Notre équipe vous répond rapidement.</p>
  </div>
</section>
<section class="slab" data-tone="chalk" aria-labelledby="coord">
  <div class="wrap">
    <h2 id="coord" class="sr">Coordonnées</h2>
    <div class="wall wall--4">
      <div class="block principle"><h3>Téléphone</h3><p><a class="link" href="tel:${SITE.phoneHref}">${SITE.phone}</a></p></div>
      <div class="block principle"><h3>Courriel</h3><p><a class="link" href="mailto:${SITE.email}">${SITE.email}</a></p></div>
      <div class="block principle"><h3>Zone desservie</h3><p>Montréal et environs, Québec.</p></div>
      <div class="block principle"><h3>Horaires</h3><p>Du lundi au dimanche, flexibles 7 jours sur 7.</p></div>
    </div>
    <div class="actions mt-l"><a class="btn btn--dark" href="soumission.html">Demander une soumission gratuite</a><a class="btn btn--ghost" href="tel:${SITE.phoneHref}">Appeler maintenant</a></div>
  </div>
</section>
<section class="slab" data-tone="ink" aria-labelledby="faq">
  <div class="wrap">
    <div class="section-head"><h2 id="faq" class="h2">Réponses rapides</h2></div>
    ${faqHtml(FAQ.slice(0, 4))}
  </div>
</section>
`,
};
