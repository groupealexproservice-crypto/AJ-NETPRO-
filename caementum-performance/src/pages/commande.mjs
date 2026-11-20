import { PRODUCTS, money } from '../lib.mjs';

export default {
  file: 'commande.html',
  title: 'Commande',
  description: 'Commandez un vêtement de la marque Caementum Performance.',
  noindex: true,
  schema: [],
  body: `
<section class="page-head">
  <div class="wrap">
    <h1 class="h1" data-commande-titre>Votre commande.</h1>
    <p class="lead">Quelques informations pour préparer votre commande.</p>
  </div>
</section>
<section class="slab" data-tone="chalk" aria-labelledby="cmd">
  <div class="wrap contact-grid">
    <div>
      <h2 id="cmd" class="h2" style="margin-bottom:28px">Vos informations</h2>
      <form class="form" name="commande" method="POST" action="merci.html?statut=commande" data-form="commande" novalidate>
        <input type="hidden" name="form-name" value="commande">
        <input type="hidden" name="produit" id="o-produit">
        <p class="hp" aria-hidden="true"><label>Ne pas remplir <input name="bot-field" tabindex="-1" autocomplete="off"></label></p>
        <div class="form-row">
          <div class="field"><label for="o-taille">Taille</label><select class="select" id="o-taille" name="taille"></select></div>
          <div class="field"><label for="o-qte">Quantité</label><input class="input" id="o-qte" name="quantite" type="number" min="1" max="10" value="1" required></div>
        </div>
        <div class="form-row">
          <div class="field"><label for="o-prenom">Prénom</label><input class="input" id="o-prenom" name="prenom" autocomplete="given-name" required></div>
          <div class="field"><label for="o-nom">Nom</label><input class="input" id="o-nom" name="nom" autocomplete="family-name" required></div>
        </div>
        <div class="form-row">
          <div class="field"><label for="o-courriel">Courriel</label><input class="input" id="o-courriel" name="courriel" type="email" autocomplete="email" required></div>
          <div class="field"><label for="o-tel">Téléphone <span class="hint">(facultatif)</span></label><input class="input" id="o-tel" name="telephone" type="tel" autocomplete="tel"></div>
        </div>
        <div class="field"><label for="o-adresse">Adresse de livraison <span class="hint">(facultatif tant que la boutique n’est pas ouverte)</span></label><textarea class="textarea" id="o-adresse" name="adresse" autocomplete="street-address" style="min-height:100px"></textarea></div>
        <label class="check"><input type="checkbox" name="conditions" required><span>J’accepte les <a class="link" href="conditions-de-vente.html">conditions de vente</a> et la <a class="link" href="confidentialite.html">politique de confidentialité</a>.</span></label>
        <div class="form-status" role="status" aria-live="polite" hidden></div>
        <div><button class="btn btn--primary" type="submit" data-submit>Envoyer</button></div>
      </form>
    </div>
    <aside class="summary" aria-labelledby="resume">
      <h2 id="resume" class="h3-display">Votre pièce</h2>
      <dl>
        <div><dt>Produit</dt><dd data-osum="produit">T-shirt de course</dd></div>
        <div><dt>Taille</dt><dd data-osum="taille">M</dd></div>
        <div><dt>Prix avant taxes</dt><dd class="total" data-osum="prix">À confirmer</dd></div>
      </dl>
      <p class="fine">Les prix et la livraison seront confirmés à l’ouverture de la boutique. <a class="link" href="boutique.html">Modifier mon choix</a></p>
    </aside>
  </div>
</section>
<script type="application/json" id="catalogue-produits">${JSON.stringify(Object.fromEntries(PRODUCTS.map((p) => [p.id, { nom: p.name, tailles: p.sizes, prix: p.price }])))}</script>
`,
};
