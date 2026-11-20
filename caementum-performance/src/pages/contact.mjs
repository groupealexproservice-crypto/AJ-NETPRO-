import { layout, SITE } from '../lib.mjs';
import { faqHtml, FAQ } from '../parts.mjs';

export default {
  file: 'contact.html',
  title: 'Contact et prise de rendez-vous',
  description: 'Écrivez à Alexandre Ben Ammar ou demandez un appel pour choisir votre programme de coaching de course à pied. Montréal et partout au Québec.',
  schema: [],
  body: `
<section class="page-head">
  <div class="wrap">
    <h1 class="h1">Parlons de votre course.</h1>
    <p class="lead">Posez votre question ou demandez un appel. Alexandre vous répond personnellement.</p>
  </div>
</section>

<section class="slab" data-tone="chalk" aria-labelledby="ecrire">
  <div class="wrap contact-grid">
    <div id="appel">
      <h2 id="ecrire" class="h2" style="margin-bottom:28px" tabindex="-1">Écrire à Alexandre</h2>
      <form class="form" name="contact" method="POST" action="merci.html?statut=message" data-form="contact" novalidate>
        <input type="hidden" name="form-name" value="contact">
        <p class="hp" aria-hidden="true"><label>Ne pas remplir <input name="bot-field" tabindex="-1" autocomplete="off"></label></p>
        <div class="form-row">
          <div class="field"><label for="c-nom">Prénom et nom</label><input class="input" id="c-nom" name="nom" autocomplete="name" required></div>
          <div class="field"><label for="c-courriel">Courriel</label><input class="input" id="c-courriel" name="courriel" type="email" autocomplete="email" required></div>
        </div>
        <div class="field">
          <label for="c-sujet">Votre projet</label>
          <select class="select" id="c-sujet" name="sujet">
            <option value="">Choisir</option>
            <option>Piste</option><option>Route (10 km, semi, marathon)</option><option>Trail</option>
            <option value="collectif">Offre collective (entreprise, école, association)</option>
            <option>Je ne sais pas encore</option>
          </select>
        </div>
        <div class="field">
          <label for="c-message">Votre message</label>
          <textarea class="textarea" id="c-message" name="message" required></textarea>
          <span class="hint">Parlez-nous de votre niveau, de votre prochaine course et de ce que vous voulez améliorer.</span>
        </div>
        <label class="check"><input type="checkbox" name="consentement" required><span>J’accepte que mes renseignements servent à répondre à ma demande. Voir la <a class="link" href="confidentialite.html">politique de confidentialité</a>.</span></label>
        <div class="form-status" role="status" aria-live="polite" hidden></div>
        <div><button class="btn btn--dark" type="submit">Envoyer le message</button></div>
      </form>
    </div>
    <aside style="display:grid;gap:var(--mortar)">
      <div class="info-block">
        <h3>Appel avec Alexandre</h3>
        <p>Un échange pour choisir entre piste, route et trail, et vérifier que le coaching vous convient.</p>
        <div><a class="btn btn--light" data-booking href="#ecrire">Demander un appel</a></div>
      </div>
      <div class="info-block">
        <h3>Coordonnées</h3>
        <p><a data-email href="mailto:${SITE.email}">${SITE.email}</a></p>
        <p>Montréal, Québec. Coaching à distance partout au Québec.</p>
      </div>
    </aside>
  </div>
</section>

<section class="slab" data-tone="ink" aria-labelledby="faq">
  <div class="wrap">
    <div class="section-head"><h2 id="faq" class="h2">Réponses rapides</h2></div>
    ${faqHtml(FAQ.slice(0, 5))}
  </div>
</section>
`,
};
