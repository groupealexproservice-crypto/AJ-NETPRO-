import { layout } from '../lib.mjs';

export default {
  file: 'merci.html',
  title: 'Merci',
  description: 'Merci pour votre demande. Voici la suite.',
  noindex: true,
  schema: [],
  body: `
<section class="page-head">
  <div class="wrap">
    <h1 class="h1" data-merci-titre>Merci, c’est bien reçu.</h1>
    <p class="lead" data-merci-texte>Nous vous répondons personnellement dans les meilleurs délais.</p>
    <div class="actions"><a class="btn btn--primary" href="formations.html">Voir les formations</a><a class="btn btn--ghost" href="boutique.html">Voir la boutique</a></div>
  </div>
</section>
<section class="slab" data-tone="chalk" aria-labelledby="suite">
  <div class="wrap">
    <div class="section-head"><h2 id="suite" class="h2">La suite</h2></div>
    <ol class="wall wall--3">
      <li class="block step"><span class="step-n" aria-hidden="true">1</span><h3>Vérifiez votre courriel</h3><p>Vous recevrez une confirmation. Pensez à regarder vos courriels indésirables.</p></li>
      <li class="block step"><span class="step-n" aria-hidden="true">2</span><h3>Réservez votre visio de diagnostic</h3><p>Un appel vidéo avec Alexandre pour comprendre votre niveau, vos contraintes et votre objectif.</p><div><a class="btn btn--dark" data-booking href="contact.html#appel">Choisir un moment</a></div></li>
      <li class="block step"><span class="step-n" aria-hidden="true">3</span><h3>Recevez votre plan</h3><p>Alexandre écrit votre plan à la main, à partir de votre diagnostic.</p></li>
    </ol>
  </div>
</section>
`,
};
