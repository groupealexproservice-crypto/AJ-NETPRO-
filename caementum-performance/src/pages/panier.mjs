export default {
  file: 'panier.html',
  title: 'Panier',
  description: 'Votre panier de vêtements Caementum Performance.',
  noindex: true,
  schema: [],
  body: `
<section class="page-head">
  <div class="wrap">
    <p class="eyebrow">Panier</p>
    <h1 class="h1">Votre <span class="hl">panier.</span></h1>
    <p class="lead">Vérifiez vos pièces, puis envoyez votre commande. Alexandre vous confirme les prix et la livraison avant tout paiement.</p>
  </div>
</section>
<section class="slab" data-tone="chalk" aria-labelledby="cmd">
  <div class="wrap contact-grid">
    <div>
      <h2 id="cmd" class="h2" style="margin-bottom:28px">Vos articles</h2>
      <div id="cart-empty" hidden>
        <p class="lead">Votre panier est vide.</p>
        <div class="actions"><a class="btn btn--dark" href="boutique.html">Voir la boutique</a></div>
      </div>
      <ul id="cart-list" class="cart-list" aria-label="Articles du panier"></ul>
      <form class="form" id="cart-form" name="commande" method="POST" action="merci.html?statut=commande" data-form="commande" novalidate hidden style="margin-top:40px">
        <h3 class="h3-display">Vos coordonnées</h3>
        <input type="hidden" name="form-name" value="commande">
        <input type="hidden" name="articles" id="o-articles">
        <p class="hp" aria-hidden="true"><label>Ne pas remplir <input name="bot-field" tabindex="-1" autocomplete="off"></label></p>
        <div class="form-row">
          <div class="field"><label for="o-prenom">Prénom</label><input class="input" id="o-prenom" name="prenom" autocomplete="given-name" required></div>
          <div class="field"><label for="o-nom">Nom</label><input class="input" id="o-nom" name="nom" autocomplete="family-name" required></div>
        </div>
        <div class="form-row">
          <div class="field"><label for="o-courriel">Courriel</label><input class="input" id="o-courriel" name="courriel" type="email" autocomplete="email" required></div>
          <div class="field"><label for="o-tel">Téléphone <span class="hint">(facultatif)</span></label><input class="input" id="o-tel" name="telephone" type="tel" autocomplete="tel"></div>
        </div>
        <div class="field"><label for="o-adresse">Adresse de livraison <span class="hint">(facultatif pour l’instant)</span></label><textarea class="textarea" id="o-adresse" name="adresse" autocomplete="street-address" style="min-height:100px"></textarea></div>
        <label class="check"><input type="checkbox" name="conditions" required><span>J’accepte les <a class="link" href="conditions-de-vente.html">conditions de vente</a> et la <a class="link" href="confidentialite.html">politique de confidentialité</a>.</span></label>
        <div class="form-status" role="status" aria-live="polite" hidden></div>
        <div><button class="btn btn--primary" type="submit" data-submit>Envoyer ma commande</button></div>
      </form>
    </div>
    <aside class="summary" aria-labelledby="resume">
      <h2 id="resume" class="h3-display">Récapitulatif</h2>
      <dl>
        <div><dt>Articles</dt><dd data-cart-total-n>0</dd></div>
        <div><dt>Total avant taxes</dt><dd class="total" data-cart-total>À confirmer</dd></div>
      </dl>
      <p class="fine">Les prix, la livraison et les taxes seront confirmés avant tout paiement. <a class="link" href="boutique.html">Continuer mes achats</a></p>
    </aside>
  </div>
</section>
`,
};
