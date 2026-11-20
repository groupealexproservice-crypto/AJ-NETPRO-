import { layout, PACKS, SQUAD, ADDONS, money, saving, perMonth, ctaBand } from '../lib.mjs';
import { faqHtml, faqSchema, FAQ } from '../parts.mjs';

const card = (p) => `
<article class="price-card" id="${p.id}" data-pack="${p.id}">
  <div><h3>${p.name}</h3><p class="tag">${p.tagline}</p></div>
  <div class="term" data-term="monthly">
    <p class="term-label">Mensuel</p>
    <p class="price-line"><span class="price-big">${money(p.monthly)}</span><span class="price-unit">par mois</span></p>
    <p class="save">Sans engagement</p>
  </div>
  <div class="term" data-term="six">
    <p class="term-label">6 mois</p>
    <p class="price-line"><span class="price-big">${money(p.six)}</span><span class="price-unit">pour 6 mois</span></p>
    <p class="save">Soit ${money(perMonth(p.six, 6))} par mois. Vous économisez ${money(saving(p, 'six'))}.</p>
  </div>
  <div class="term" data-term="year">
    <p class="term-label">12 mois</p>
    <p class="price-line"><span class="price-big">${money(p.year)}</span><span class="price-unit">pour 12 mois</span></p>
    <p class="save">Soit ${money(perMonth(p.year, 12))} par mois. Vous économisez ${money(saving(p, 'year'))}.</p>
  </div>
  <ul class="ticks">${p.includes.map((i) => `<li>${i}</li>`).join('')}</ul>
  <a class="btn btn--dark" data-choose="${p.id}" href="inscription.html?pack=${p.id}&amp;duree=six">Choisir ${p.name}</a>
</article>`;

const subset = FAQ.filter(([q]) => /annuler|taxes|forfaits|changer/i.test(q));

export default {
  file: 'tarifs.html',
  title: 'Tarifs du coaching de course à pied',
  description: 'Tarifs clairs, avant taxes : piste 150 $, route 120 $ et trail 80 $ par mois. Économisez 10 % avec 6 mois et 20 % avec 12 mois. Coaching à distance partout au Québec.',
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
    <h2 id="choix" class="sr">Choisir un programme et une durée</h2>
    <fieldset class="seg" data-seg style="border:0;padding:0;margin:0 0 clamp(28px,4vw,48px)">
      <legend class="sr">Durée de l’engagement</legend>
      <label><input type="radio" name="term" value="monthly"><span>Mensuel<small>Sans engagement</small></span></label>
      <label><input type="radio" name="term" value="six" checked><span>6 mois<small>Économisez 10 %</small></span></label>
      <label><input type="radio" name="term" value="year"><span>12 mois<small>Économisez 20 %</small></span></label>
    </fieldset>
    <div class="wall wall--3">
      ${Object.values(PACKS).map(card).join('\n')}
    </div>
    <p class="fine mt-l">Les forfaits de 6 et 12 mois suivent le rythme d’une préparation de marathon ou d’ultra. Prix avant taxes : la TPS et la TVQ s’ajoutent au paiement. Voir les <a class="link" href="conditions-de-vente.html">conditions de vente</a>.</p>
  </div>
</section>

<section class="slab" data-tone="ink" aria-labelledby="squad">
  <div class="wrap">
    <div class="squad">
      <div style="display:grid;gap:14px">
        <h2 id="squad" class="h3-display">Squad</h2>
        <p class="lead">La porte d’entrée : une séance clé par semaine et l’accès à la communauté, pour prendre l’habitude de courir avec un cadre.</p>
      </div>
      <div style="display:grid;gap:16px;justify-items:start">
        <p class="price-line"><span class="price-big">${money(SQUAD.monthly)}</span><span class="price-unit">par mois</span></p>
        <a class="btn btn--light" href="inscription.html?pack=squad&amp;duree=monthly">Rejoindre la Squad</a>
      </div>
    </div>
  </div>
</section>

<section class="slab" data-tone="chalk" aria-labelledby="addons">
  <div class="wrap">
    <div class="section-head"><h2 id="addons" class="h2">À la carte, quand vous en avez besoin.</h2></div>
    <div class="stack">
      ${ADDONS.map((a) => `<div class="addon" style="background:var(--limestone)"><h3>${a.name}</h3><p style="color:var(--dim-on-chalk)">${a.text}</p><span class="addon-price">+ ${money(a.price)}</span></div>`).join('')}
    </div>
  </div>
</section>

<section class="slab" data-tone="ink" aria-labelledby="faq">
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
