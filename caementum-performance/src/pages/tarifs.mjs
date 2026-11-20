import { layout, PACKS, COMMUNAUTAIRE, ADDONS, money, saving, perMonth, ctaBand } from '../lib.mjs';
import { faqHtml, faqSchema, FAQ } from '../parts.mjs';

const card = (p) => `
<article class="price-card" id="${p.id}" data-pack="${p.id}">
  <div><h3>${p.name}</h3><p class="tag">${p.tagline}</p></div>
  <div class="term" data-term="monthly">
    <p class="term-label">Forfait 1 mois</p>
    <p class="price-line"><span class="price-big">${money(p.monthly)}</span><span class="price-unit">pour 1 mois</span></p>
    <p class="save">Paiement unique, sans renouvellement.</p>
  </div>
  <div class="term" data-term="six">
    <p class="term-label">Forfait 6 mois</p>
    <p class="price-line"><span class="price-big">${money(p.six)}</span><span class="price-unit">pour 6 mois</span></p>
    <p class="save">Paiement unique. Soit ${money(perMonth(p.six, 6))} par mois : vous économisez ${money(saving(p, 'six'))}.</p>
  </div>
  <div class="term" data-term="year">
    <p class="term-label">Forfait 12 mois</p>
    <p class="price-line"><span class="price-big">${money(p.year)}</span><span class="price-unit">pour 12 mois</span></p>
    <p class="save">Paiement unique. Soit ${money(perMonth(p.year, 12))} par mois : vous économisez ${money(saving(p, 'year'))}.</p>
  </div>
  <p class="dist" style="color:var(--dim-on-chalk)">Distances : ${p.distances.join(', ')}.</p>
  <ul class="ticks">${p.includes.map((i) => `<li>${i}</li>`).join('')}</ul>
  <a class="btn btn--dark" data-choose="${p.id}" href="inscription.html?pack=${p.id}&amp;duree=six">Choisir ${p.name}</a>
</article>`;

const subset = FAQ.filter(([q]) => /renouvellent|taxes|forfaits de 6|changer/i.test(q));

export default {
  file: 'tarifs.html',
  title: 'Tarifs du coaching de course à pied',
  description: 'Tarifs clairs, avant taxes : piste 150 $, route 120 $ et trail 80 $ pour 1 mois. Économisez 10 % avec 6 mois et 20 % avec 12 mois. Communauté dès 19,99 $ par mois.',
  schema: [faqSchema(subset)],
  body: `
<section class="page-head">
  <div class="wrap">
    <h1 class="h1">Des tarifs clairs, sans surprise.</h1>
    <p class="lead">Un prix par programme, des économies si vous vous engagez sur la durée d’une vraie préparation. Tout est en dollars canadiens, avant taxes.</p>
  </div>
</section>

<section class="slab" data-tone="chalk" aria-labelledby="choix">
  <div class="wrap">
    <h2 id="choix" class="sr">Choisir un programme et un forfait</h2>
    <fieldset class="seg" data-seg style="border:0;padding:0;margin:0 0 clamp(28px,4vw,48px)">
      <legend class="sr">Durée du forfait</legend>
      <label><input type="radio" name="term" value="monthly"><span>1 mois<small>Paiement unique</small></span></label>
      <label><input type="radio" name="term" value="six" checked><span>6 mois<small>Économisez 10 %</small></span></label>
      <label><input type="radio" name="term" value="year"><span>12 mois<small>Économisez 20 %</small></span></label>
    </fieldset>
    <div class="wall wall--3">
      ${Object.values(PACKS).map(card).join('\n')}
    </div>
    <p class="fine mt-l">Les forfaits de 1, 6 et 12 mois sont des paiements uniques, sans renouvellement automatique. Prix avant taxes : la TPS et la TVQ s’ajoutent au paiement. Voir les <a class="link" href="conditions-de-vente.html">conditions de vente</a>.</p>
  </div>
</section>

<section class="slab" data-tone="ink" aria-labelledby="inclus">
  <div class="wrap">
    <div class="section-head">
      <h2 id="inclus" class="h2">Ce que contient chaque forfait.</h2>
      <p class="lead">Plus la préparation est longue, plus le suivi est présent.</p>
    </div>
    <div class="incl">
      <div class="block">
        <h3>Forfait 1 mois</h3>
        <ul class="ticks">
          <li>Visioconférence d’évaluation complète</li>
          <li>Plan d’entraînement créé à la main pour vous</li>
          <li>Livraison de votre programme détaillé</li>
        </ul>
      </div>
      <div class="block">
        <h3>Forfaits 6 et 12 mois</h3>
        <ul class="ticks">
          <li>Tout le forfait 1 mois</li>
          <li>Une visioconférence de suivi chaque mois</li>
          <li>Analyse de votre progression et de vos performances</li>
          <li>Un nouveau plan personnalisé livré chaque mois</li>
        </ul>
      </div>
    </div>
  </div>
</section>

<section class="slab" data-tone="chalk" id="communautaire" aria-labelledby="comm">
  <div class="wrap">
    <div class="squad" style="background:var(--limestone)">
      <div style="display:grid;gap:16px">
        <h2 id="comm" class="h3-display">Pack Communautaire</h2>
        <p class="lead" style="color:var(--dim-on-chalk)">La porte d’entrée : courir avec un cadre, des partenaires et les conseils du coach.</p>
        <ul class="ticks">${COMMUNAUTAIRE.includes.map((i) => `<li>${i}</li>`).join('')}</ul>
      </div>
      <div style="display:grid;gap:16px;justify-items:start">
        <p class="price-line"><span class="price-big">${money(COMMUNAUTAIRE.monthly)}</span><span class="price-unit" style="color:var(--dim-on-chalk)">par mois</span></p>
        <p class="fine" style="margin:0">Abonnement mensuel, à arrêter en tout temps.</p>
        <a class="btn btn--dark" href="inscription.html?pack=communautaire&amp;duree=monthly">Rejoindre la communauté</a>
      </div>
    </div>
  </div>
</section>

<section class="slab" data-tone="ink" aria-labelledby="addons">
  <div class="wrap">
    <div class="section-head"><h2 id="addons" class="h2">À la carte, quand vous en avez besoin.</h2></div>
    <div class="stack">
      ${ADDONS.map((a) => `<div class="addon"><h3>${a.name}</h3><p>${a.text}</p><span class="addon-price">+ ${money(a.price)}</span></div>`).join('')}
    </div>
  </div>
</section>

<section class="slab" data-tone="chalk" aria-labelledby="faq">
  <div class="wrap">
    <div class="section-head"><h2 id="faq" class="h2">Avant de choisir</h2></div>
    ${faqHtml(subset)}
  </div>
</section>

${ctaBand({
    title: 'Pas certain du bon programme ?',
    text: 'Un échange avec Alexandre suffit pour trancher entre piste, route et trail.',
    primary: '<a class="btn btn--light" href="contact.html#appel">Parler à Alexandre</a>',
  })}
`,
};
