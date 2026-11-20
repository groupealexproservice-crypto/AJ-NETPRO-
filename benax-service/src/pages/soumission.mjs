import { SITE } from '../lib.mjs';

export default {
  file: 'soumission.html',
  title: 'Soumission gratuite',
  description: 'Demandez votre soumission gratuite pour l’entretien commercial ou résidentiel à Montréal. Réponse personnalisée en moins de 24 heures, sans engagement.',
  schema: [],
  body: `
<section class="page-head">
  <div class="wrap">
    <h1 class="h1">Votre soumission gratuite.</h1>
    <p class="lead">Un seul formulaire, une réponse personnalisée d’un membre de notre équipe en moins de 24 heures. Sans engagement.</p>
  </div>
</section>
<section class="slab" data-tone="chalk" aria-labelledby="demande">
  <div class="wrap contact-grid">
    <div>
      <h2 id="demande" class="h2" style="margin-bottom:28px">Demande de soumission</h2>
      <form class="form" name="soumission" method="POST" action="merci.html?statut=soumission" data-form="soumission" novalidate>
        <input type="hidden" name="form-name" value="soumission">
        <p class="hp" aria-hidden="true"><label>Ne pas remplir <input name="bot-field" tabindex="-1" autocomplete="off"></label></p>
        <div class="field"><label for="s-nom">Nom complet</label><input class="input" id="s-nom" name="nom" autocomplete="name" required></div>
        <div class="form-row">
          <div class="field"><label for="s-tel">Téléphone</label><input class="input" id="s-tel" name="telephone" type="tel" autocomplete="tel" required></div>
          <div class="field"><label for="s-courriel">Courriel</label><input class="input" id="s-courriel" name="courriel" type="email" autocomplete="email" required></div>
        </div>
        <div class="field">
          <label for="s-service">Type de service</label>
          <select class="select" id="s-service" name="service" required>
            <option value="">Choisir</option>
            <option value="commercial-bureaux">Entretien commercial : bureaux</option>
            <option value="commercial-commerce">Entretien commercial : commerce</option>
            <option value="commercial-immeuble">Entretien commercial : immeuble</option>
            <option value="residentiel-regulier">Entretien résidentiel : régulier</option>
            <option value="residentiel-profondeur">Entretien résidentiel : en profondeur</option>
            <option value="demenagement">Nettoyage après déménagement</option>
            <option value="autre">Autre</option>
          </select>
        </div>
        <div class="field">
          <label for="s-message">Message <span class="hint">(facultatif)</span></label>
          <textarea class="textarea" id="s-message" name="message"></textarea>
          <span class="hint">Superficie, fréquence souhaitée, adresse du secteur : tout ce qui nous aide à bien vous répondre.</span>
        </div>
        <label class="check"><input type="checkbox" name="consentement" required><span>J’accepte d’être contacté par Benax Service au sujet de ma demande. Voir la <a class="link" href="confidentialite.html">politique de confidentialité</a>.</span></label>
        <div class="form-status" role="status" aria-live="polite" hidden></div>
        <div><button class="btn btn--dark" type="submit">Envoyer ma demande</button></div>
      </form>
    </div>
    <aside style="display:grid;gap:var(--mortar)">
      <div class="info-block"><h3>Ce que vous recevez</h3><p>Une réponse rapide et personnalisée. Aucun engagement. Un conseiller dédié pour les contrats commerciaux.</p></div>
      <div class="info-block"><h3>Préférez-vous parler ?</h3><p><a href="tel:${SITE.phoneHref}">${SITE.phone}</a><br><a href="mailto:${SITE.email}">${SITE.email}</a></p></div>
    </aside>
  </div>
</section>
`,
};
