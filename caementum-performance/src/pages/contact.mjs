import { layout, SITE, socialItems } from '../lib.mjs';
import { faqHtml, FAQ } from '../parts.mjs';

export default {
  file: 'contact.html',
  title: 'Contact',
  description: 'Écrivez à Caementum Performance : question sur une formation, une commande de vêtements ou un partenariat. Montréal et partout au Québec.',
  schema: [],
  body: `
<section class="page-head">
  <div class="wrap">
    <p class="eyebrow">Contact</p>
    <h1 class="h1">Parlons de <span class="hl">votre course.</span></h1>
    <p class="lead">Une question sur une formation, une commande ou un partenariat ? Écrivez-nous, Alexandre répond personnellement.</p>
  </div>
</section>

<section class="slab" data-tone="chalk" aria-labelledby="ecrire">
  <div class="wrap contact-grid">
    <div id="appel">
      <h2 id="ecrire" class="h2" style="margin-bottom:28px" tabindex="-1">Envoyer un message</h2>
      <form class="form" name="contact" method="POST" action="merci.html?statut=message" data-form="contact" novalidate>
        <input type="hidden" name="form-name" value="contact">
        <p class="hp" aria-hidden="true"><label>Ne pas remplir <input name="bot-field" tabindex="-1" autocomplete="off"></label></p>
        <div class="form-row">
          <div class="field"><label for="c-nom">Prénom et nom</label><input class="input" id="c-nom" name="nom" autocomplete="name" required></div>
          <div class="field"><label for="c-courriel">Courriel</label><input class="input" id="c-courriel" name="courriel" type="email" autocomplete="email" required></div>
        </div>
        <div class="field">
          <label for="c-sujet">Sujet</label>
          <select class="select" id="c-sujet" name="sujet">
            <option value="">Choisir</option>
            <option>Formation piste</option><option>Formation route</option><option>Formation trail</option>
            <option>Boutique et vêtements</option>
            <option>Partenariat ou offre collective</option>
            <option>Autre question</option>
          </select>
        </div>
        <div class="field">
          <label for="c-message">Votre message</label>
          <textarea class="textarea" id="c-message" name="message" required></textarea>
          <span class="hint">Parlez-nous de votre niveau, de votre prochaine course ou de la pièce qui vous intéresse.</span>
        </div>
        <label class="check"><input type="checkbox" name="consentement" required><span>J’accepte que mes renseignements servent à répondre à ma demande. Voir la <a class="link" href="confidentialite.html">politique de confidentialité</a>.</span></label>
        <div class="form-status" role="status" aria-live="polite" hidden></div>
        <div><button class="btn btn--primary" type="submit">Envoyer le message</button></div>
      </form>
    </div>
    <aside style="display:grid;gap:var(--mortar)">
      <div class="info-block">
        <h3>Coordonnées</h3>
        <p><a data-email href="mailto:${SITE.email}">${SITE.email}</a></p>
        <p>Montréal, Québec. Coaching à distance partout au Québec.</p>
      </div>
      <div class="info-block">
        <h3>Réseaux sociaux</h3>
        <ul class="social-list">${socialItems()}</ul>
      </div>
      <div class="info-block">
        <h3>Passer à l’action</h3>
        <p>Vous savez déjà ce que vous voulez ?</p>
        <div class="actions"><a class="btn btn--primary" href="formations.html">Formations</a><a class="btn btn--ghost" href="boutique.html">Boutique</a></div>
      </div>
    </aside>
  </div>
</section>

<section class="slab" data-tone="ink" aria-labelledby="faq">
  <div class="wrap"><div class="section-head"><h2 id="faq" class="h2">Réponses rapides</h2></div>${faqHtml(FAQ.slice(0, 5))}</div>
</section>
`,
};
