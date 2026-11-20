import { layout, ctaBand, A_VENIR } from '../lib.mjs';

export default {
  file: 'bientot.html',
  title: 'Ce qui s’en vient chez Caementum',
  description: 'Application, synchronisation avec votre montre, nutrition et récupération, camps d’entraînement, webinaires : découvrez la suite de Caementum Performance.',
  schema: [],
  body: `
<section class="page-head">
  <div class="wrap">
    <h1 class="h1">Ce qui s’en vient.</h1>
    <p class="lead">Caementum grandit comme une construction : une pierre à la fois. Voici ce que nous préparons pour les coureurs de la communauté.</p>
  </div>
</section>

<section class="slab" data-tone="ink" aria-labelledby="liste">
  <div class="wrap">
    <h2 id="liste" class="sr">Les projets en préparation</h2>
    <div class="wall wall--3">
      ${A_VENIR.map((a) => `<div class="block soon"><h3>${a.name}</h3><p>${a.text}</p></div>`).join('')}
    </div>
    <p class="fine mt-l">Ces projets sont en préparation. Les dates et les conditions seront annoncées aux personnes inscrites à la liste d’attente.</p>
  </div>
</section>

<section class="slab" data-tone="chalk" aria-labelledby="attente">
  <div class="wrap contact-grid">
    <div>
      <h2 id="attente" class="h2" style="margin-bottom:28px">Soyez les premiers informés.</h2>
      <form class="form" name="liste-attente" method="POST" action="merci.html?statut=attente" data-form="attente" novalidate>
        <input type="hidden" name="form-name" value="liste-attente">
        <p class="hp" aria-hidden="true"><label>Ne pas remplir <input name="bot-field" tabindex="-1" autocomplete="off"></label></p>
        <div class="form-row">
          <div class="field"><label for="a-nom">Prénom</label><input class="input" id="a-nom" name="prenom" autocomplete="given-name" required></div>
          <div class="field"><label for="a-courriel">Courriel</label><input class="input" id="a-courriel" name="courriel" type="email" autocomplete="email" required></div>
        </div>
        <fieldset class="field" style="border:0;padding:0;margin:0">
          <legend>Ce qui vous intéresse</legend>
          <div style="display:grid;gap:10px;margin-top:8px">
            <label class="check"><input type="checkbox" name="interet" value="application"><span>L’application</span></label>
            <label class="check"><input type="checkbox" name="interet" value="camps"><span>Les camps d’entraînement</span></label>
            <label class="check"><input type="checkbox" name="interet" value="webinaires"><span>Les webinaires</span></label>
            <label class="check"><input type="checkbox" name="interet" value="nutrition"><span>Nutrition et récupération</span></label>
          </div>
        </fieldset>
        <label class="check"><input type="checkbox" name="consentement" required><span>J’accepte de recevoir des nouvelles de Caementum Performance. Je peux me désabonner en tout temps. Voir la <a class="link" href="confidentialite.html">politique de confidentialité</a>.</span></label>
        <div class="form-status" role="status" aria-live="polite" hidden></div>
        <div><button class="btn btn--dark" type="submit">Je m’inscris</button></div>
      </form>
    </div>
    <aside class="info-block">
      <h3>En attendant</h3>
      <p>Les programmes Piste, Route et Trail sont disponibles dès aujourd’hui, avec un plan écrit à la main et un suivi par visioconférence.</p>
      <div><a class="btn btn--light" href="tarifs.html">Voir les tarifs</a></div>
    </aside>
  </div>
</section>
`,
};
