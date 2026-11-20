import { layout, ctaBand, money, COMMUNAUTAIRE, tbd, SITE, hasPhoto } from '../lib.mjs';
import { faqHtml, faqSchema } from '../parts.mjs';

const GROUPE_FAQ = [
  ['Est-ce une formation ?', '<p>Non. Les groupes de course sont un service à part : une activité de course à pied organisée chaque semaine, en groupe. Pour un plan d’entraînement écrit pour vous par Alexandre, consultez nos <a class="link" href="formations.html">formations</a>.</p>'],
  ['Comment fonctionne l’abonnement ?', `<p>Vous payez ${money(COMMUNAUTAIRE.monthly)} par mois, avant taxes, par abonnement mensuel. Vous pouvez l’arrêter en tout temps en nous écrivant, avec effet à la prochaine échéance.</p>`],
  ['Les taxes sont-elles incluses ?', '<p>Non. Le prix est en dollars canadiens et s’affiche avant taxes. La TPS et la TVQ s’ajoutent au paiement.</p>'],
  ['Où et quand ont lieu les sorties ?', `<p>${tbd('À compléter')} Le jour, l’heure et le lieu des sorties seront confirmés aux membres.</p>`],
];

export default {
  file: 'groupes.html',
  title: 'Groupes de course à pied, une sortie chaque semaine',
  description: `Rejoignez un groupe de course : une activité de course à pied organisée chaque semaine, pour ${money(COMMUNAUTAIRE.monthly)} par mois. Abonnement mensuel, sans engagement.`,
  schema: [faqSchema(GROUPE_FAQ)],
  body: `
<section class="page-head">
  <div class="wrap">
    <p class="eyebrow">Groupes de course</p>
    <h1 class="h1">Courez ensemble, chaque semaine.</h1>
    <p class="lead">Une activité de course à pied organisée une fois par semaine, en groupe, pour ${money(COMMUNAUTAIRE.monthly)} par mois. Vous venez, nous organisons.</p>
    <div class="actions"><a class="btn btn--primary" href="inscription.html?pack=communautaire&amp;duree=monthly">Rejoindre un groupe</a></div>
  </div>
</section>

<section class="slab" data-tone="chalk" aria-labelledby="offre">
  <div class="wrap split">
    <div class="split-sticky">
      <h2 id="offre" class="h2">Un abonnement simple.</h2>
      <p class="lead">Un prix par mois, une sortie par semaine, un groupe privé pour rester en contact. Sans engagement.</p>
    </div>
    <div class="price-box">
      <p class="price-line"><span class="price-big">${money(COMMUNAUTAIRE.monthly)}</span><span class="price-unit">par mois, avant taxes</span></p>
      <ul class="ticks">${COMMUNAUTAIRE.includes.map((i) => `<li>${i}</li>`).join('')}</ul>
      <p class="fine" style="margin:0">Abonnement mensuel, à arrêter en tout temps. Taxes en sus.</p>
      <a class="btn btn--primary" href="inscription.html?pack=communautaire&amp;duree=monthly">Rejoindre un groupe</a>
    </div>
  </div>
</section>

${hasPhoto('groupes.jpg') ? '<section class="slab slab--tight" data-tone="chalk" aria-label="Photo"><div class="wrap"><figure class="frame-photo frame-photo--wide"><img src="assets/img/photos/groupes.jpg" alt="Groupe de coureurs et de coureuses en sortie, au lever du soleil" width="1400" height="933" loading="lazy" decoding="async"></figure></div></section>' : ''}

<section class="slab slab--mist" data-tone="chalk" aria-labelledby="comment">
  <div class="wrap">
    <div class="section-head"><h2 id="comment" class="h2">Comment ça fonctionne.</h2></div>
    <ol class="timeline timeline--3">
      <li><span class="tl-n">1</span><h3>Vous vous abonnez</h3><p>Vous choisissez l’abonnement mensuel et vous payez en ligne en toute sécurité.</p></li>
      <li><span class="tl-n">2</span><h3>Vous rejoignez le groupe</h3><p>Vous recevez l’accès au groupe privé, où les sorties sont annoncées.</p></li>
      <li><span class="tl-n">3</span><h3>Vous courez chaque semaine</h3><p>Une activité de course à pied est organisée une fois par semaine. Vous n’avez qu’à venir.</p></li>
    </ol>
  </div>
</section>

<section class="slab" data-tone="chalk" aria-labelledby="infos">
  <div class="wrap split">
    <div class="split-sticky"><h2 id="infos" class="h2">Informations pratiques.</h2><p class="lead">Les détails des sorties seront confirmés avant l’ouverture des inscriptions.</p></div>
    <dl class="facts-list">
      <div><dt>Jour</dt><dd>${tbd('À compléter')}</dd></div>
      <div><dt>Heure</dt><dd>${tbd('À compléter')}</dd></div>
      <div><dt>Lieu de rendez-vous</dt><dd>${tbd('À compléter')}</dd></div>
      <div><dt>Niveau</dt><dd>${tbd('À compléter')}</dd></div>
    </dl>
  </div>
</section>

<section class="slab slab--mist" data-tone="chalk" aria-labelledby="faq">
  <div class="wrap"><div class="section-head"><h2 id="faq" class="h2">Questions fréquentes.</h2></div>${faqHtml(GROUPE_FAQ)}</div>
</section>

${ctaBand({
    title: 'Venez courir avec nous.',
    text: 'Rejoignez un groupe de course, ou choisissez une formation pour un plan écrit rien que pour vous.',
    primary: '<a class="btn btn--primary" href="inscription.html?pack=communautaire&amp;duree=monthly">Rejoindre un groupe</a>',
    secondary: '<a class="btn btn--ghost" href="formations.html">Voir les formations</a>',
  })}
`,
};
