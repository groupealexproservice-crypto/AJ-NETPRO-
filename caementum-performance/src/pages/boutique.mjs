import { layout, PRODUCTS, ctaBand, tbd, hasPhoto } from '../lib.mjs';
import { productCard } from '../parts.mjs';

export default {
  file: 'boutique.html',
  title: 'Boutique de vêtements de sport',
  description: 'Les vêtements de la marque Caementum Performance : t-shirts, shorts, coupe-vent et accessoires pour courir et s’entraîner. Commande en ligne.',
  schema: [],
  body: `
<section class="page-head${hasPhoto('boutique.jpg') ? ' page-head--photo' : ''}">
  ${hasPhoto('boutique.jpg') ? '<div class="page-head-photo" aria-hidden="true"><img src="assets/img/photos/boutique.jpg" alt="" width="1600" height="1000"></div>' : ''}
  <div class="wrap">
    <p class="eyebrow">Boutique</p>
    <h1 class="h1">Portez <span class="hl">la croisée.</span></h1>
    <p class="lead">Des vêtements conçus pour courir, sous les marques développées par le projet. Choisissez votre pièce, votre taille, et commandez en ligne.</p>
  </div>
</section>

<section class="slab" data-tone="chalk" aria-labelledby="coll">
  <div class="wrap">
    <div class="section-head">
      <div class="notice"><strong>Collection en préparation.</strong> Les visuels sont provisoires (dessins de présentation, pas des photos des produits). Les prix, les descriptions et les photos seront ajoutés dès que les vêtements seront définis. Vous pouvez déjà remplir votre panier : Alexandre vous confirme les prix et la livraison avant tout paiement.</div>
      <h2 id="coll" class="h2" style="margin-top:36px">La collection.</h2>
      <div class="filters" role="group" aria-label="Filtrer par catégorie"><button type="button" class="chip is-on" data-filter="tous">Tous</button><button type="button" class="chip" data-filter="haut">Hauts</button><button type="button" class="chip" data-filter="bas">Bas</button><button type="button" class="chip" data-filter="accessoire">Accessoires</button></div>
    </div>
    <div class="shop" data-shop>
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
