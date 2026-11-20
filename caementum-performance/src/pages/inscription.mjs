import { layout, PACKS, COMMUNAUTAIRE, ADDONS, money } from '../lib.mjs';

export default {
  file: 'inscription.html',
  title: 'Inscription',
  description: 'Inscrivez-vous à votre programme de coaching de course à pied avec Alexandre Ben Ammar.',
  noindex: true,
  schema: [],
  body: `
<section class="page-head">
  <div class="wrap">
    <h1 class="h1">Votre inscription.</h1>
    <p class="lead">Quelques informations pour qu’Alexandre prépare votre diagnostic. Le paiement se fait à la dernière étape.</p>
  </div>
</section>

<section class="slab" data-tone="chalk" aria-labelledby="form-titre">
  <div class="wrap contact-grid">
    <div>
      <h2 id="form-titre" class="h2" style="margin-bottom:28px">Parlez-nous de vous</h2>
      <form class="form" name="inscription" method="POST" action="merci.html?statut=demande" data-form="inscription" novalidate>
        <input type="hidden" name="form-name" value="inscription">
        <input type="hidden" name="programme" id="f-programme">
        <input type="hidden" name="duree" id="f-duree">
        <p class="hp" aria-hidden="true"><label>Ne pas remplir <input name="bot-field" tabindex="-1" autocomplete="off"></label></p>
        <div class="form-row">
          <div class="field"><label for="i-prenom">Prénom</label><input class="input" id="i-prenom" name="prenom" autocomplete="given-name" required></div>
          <div class="field"><label for="i-nom">Nom</label><input class="input" id="i-nom" name="nom" autocomplete="family-name" required></div>
        </div>
        <div class="form-row">
          <div class="field"><label for="i-courriel">Courriel</label><input class="input" id="i-courriel" name="courriel" type="email" autocomplete="email" required></div>
          <div class="field"><label for="i-tel">Téléphone <span class="hint">(facultatif)</span></label><input class="input" id="i-tel" name="telephone" type="tel" autocomplete="tel"></div>
        </div>
        <div class="field">
          <label for="i-niveau">Votre niveau</label>
          <select class="select" id="i-niveau" name="niveau" required>
            <option value="">Choisir</option>
            <option>Débutant</option><option>Intermédiaire</option><option>Compétiteur</option><option>Élite</option>
          </select>
        </div>
        <div class="form-row">
          <div class="field"><label for="i-course">Prochaine course visée <span class="hint">(facultatif)</span></label><input class="input" id="i-course" name="course"></div>
          <div class="field"><label for="i-date">Date de la course <span class="hint">(facultatif)</span></label><input class="input" id="i-date" name="date_course" type="date"></div>
        </div>
        <div class="field">
          <label for="i-objectif">Votre objectif</label>
          <textarea class="textarea" id="i-objectif" name="objectif" required></textarea>
          <span class="hint">Un chrono, une distance, une régularité : décrivez ce que vous voulez accomplir.</span>
        </div>
        <div class="field">
          <label for="i-sante">Blessures ou limites à connaître <span class="hint">(facultatif)</span></label>
          <textarea class="textarea" id="i-sante" name="sante" style="min-height:100px"></textarea>
        </div>
        <fieldset class="field" style="border:0;padding:0;margin:0">
          <legend>Options à la carte <span class="hint">(facultatif, paiement unique)</span></legend>
          <div style="display:grid;gap:12px;margin-top:10px">
            ${ADDONS.map((a) => `<label class="check"><input type="checkbox" name="option" value="${a.name}" data-price="${a.price}"><span>${a.name} <strong>+ ${money(a.price)}</strong></span></label>`).join('')}
          </div>
        </fieldset>
        <label class="check"><input type="checkbox" name="conditions" required><span>J’ai lu et j’accepte les <a class="link" href="conditions-de-vente.html">conditions de vente</a> et la <a class="link" href="confidentialite.html">politique de confidentialité</a>.</span></label>
        <div class="form-status" role="status" aria-live="polite" hidden></div>
        <div><button class="btn btn--primary" type="submit" data-submit>Continuer vers le paiement</button></div>
      </form>
    </div>
    <aside class="summary" aria-labelledby="resume">
      <h2 id="resume" class="h3-display">Votre choix</h2>
      <dl>
        <div><dt>Formation</dt><dd data-sum="programme">Piste</dd></div>
        <div><dt>Durée</dt><dd data-sum="duree">12 mois</dd></div>
        <div data-sum-row="options" hidden><dt>Options</dt><dd data-sum="options"></dd></div>
        <div><dt>Total avant taxes</dt><dd class="total" data-sum="total">${money(PACKS.piste.six)}</dd></div>
      </dl>
      <p class="fine">La TPS et la TVQ s’ajoutent au paiement. <a class="link" href="formations.html#tarifs">Modifier mon choix</a></p>
    </aside>
  </div>
</section>
<script type="application/json" id="catalogue">${JSON.stringify({
    piste: { nom: 'Piste', monthly: PACKS.piste.monthly, six: PACKS.piste.six, year: PACKS.piste.year },
    route: { nom: 'Route', monthly: PACKS.route.monthly, six: PACKS.route.six, year: PACKS.route.year },
    trail: { nom: 'Trail', monthly: PACKS.trail.monthly, six: PACKS.trail.six, year: PACKS.trail.year },
    communautaire: { nom: 'Communautaire', monthly: COMMUNAUTAIRE.monthly, six: COMMUNAUTAIRE.monthly, year: COMMUNAUTAIRE.monthly },
  })}</script>
`,
};
