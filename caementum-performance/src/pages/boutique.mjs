import { layout, PRODUCTS, ctaBand, tbd } from '../lib.mjs';
import { productCard } from '../parts.mjs';

export default {
  file: 'boutique.html',
  title: 'Boutique de vêtements de sport',
  description: 'Les vêtements de la marque Caementum Performance : t-shirts, shorts, coupe-vent et accessoires pour courir et s’entraîner. Commande en ligne.',
  schema: [],
  body: `
<section class="page-head">
  <div class="wrap">
    <h1 class="h1">Portez la marque.</h1>
    <p class="lead">Des vêtements conçus pour courir, sous les marques développées par le projet. Choisissez votre pièce, votre taille, et commandez en ligne.</p>
  </div>
</section>

<section class="slab" data-tone="chalk" aria-labelledby="coll">
  <div class="wrap">
    <div class="section-head">
      <h2 id="coll" class="h2">La collection.</h2>
      <p class="lead">${tbd('Texte provisoire')} Les produits, les photos et les prix seront ajoutés à l’ouverture de la boutique. Vous pouvez dès maintenant demander à être prévenu de la sortie d’une pièce.</p>
    </div>
    <div class="shop">
      ${PRODUCTS.map(productCard).join('\n')}
    </div>
  </div>
</section>

<section class="slab" data-tone="ink" aria-labelledby="infos">
  <div class="wrap">
    <div class="section-head"><h2 id="infos" class="h2">Avant de commander.</h2></div>
    <div class="wall wall--3 who">
      <div class="block"><h3>Tailles</h3><p>${tbd('À compléter')} Guide des tailles à ajouter : mesures par taille et conseils de coupe.</p></div>
      <div class="block"><h3>Livraison</h3><p>${tbd('À compléter')} Délais et frais de livraison à confirmer. Les prix affichés s’entendent avant taxes.</p></div>
      <div class="block"><h3>Échanges et retours</h3><p>${tbd('À compléter')} Politique d’échange à définir avant l’ouverture, conformément à la Loi sur la protection du consommateur.</p></div>
    </div>
  </div>
</section>

${ctaBand({
    title: 'Courez avec quelqu’un derrière vous.',
    text: 'Une formation avec Alexandre, un vêtement pour l’occasion.',
    primary: '<a class="btn btn--primary" href="formations.html">Voir les formations</a>',
    secondary: '<a class="btn btn--ghost" href="contact.html">Nous écrire</a>',
  })}
`,
};
