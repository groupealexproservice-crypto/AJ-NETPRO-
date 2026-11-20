import { layout, PACKS, COMMUNAUTAIRE, ADDONS, money, saving, perMonth, ctaBand, tbd } from '../lib.mjs';
import { faqHtml, faqSchema, FAQ } from '../parts.mjs';

// Structure d'une formation : ajouter une entrée dans PACKS (src/lib.mjs) la fait apparaître ici et dans les tarifs.
const detail = (p, tone) => `
<section class="slab" data-tone="${tone}" id="${p.id}" aria-labelledby="t-${p.id}">
  <div class="wrap split">
    <div class="split-sticky">
      <h2 id="t-${p.id}" class="h2">${p.name}</h2>
      <p class="lead">${p.tagline}. ${p.pitch}</p>
      <p class="price-line"><span class="price-big">${money(p.monthly)}</span><span class="price-unit">pour 1 mois, avant taxes</span></p>
      <div class="actions"><a class="btn ${tone === 'ink' ? 'btn--primary' : 'btn--dark'}" href="inscription.html?pack=${p.id}&amp;duree=six">Acheter ${p.name}</a><a class="btn btn--ghost" href="#tarifs">Comparer les durées</a></div>
    </div>
    <div class="wall wall--2">
      <div class="block value"><h3>Public cible</h3><p>${p.for}</p></div>
      <div class="block value"><h3>Durée</h3><p>Forfaits de 1, 6 ou 12 mois, en paiement unique. Votre plan commence après la visio d’évaluation.</p></div>
      <div class="block value" style="grid-column:1/-1"><h3>Contenu</h3><ul class="ticks">${p.includes.map((i) => `<li>${i}</li>`).join('')}</ul><ul class="${tone === 'ink' ? 'chips' : 'tag-list'}" style="margin-top:18px">${p.distances.map((d) => `<li>${d}</li>`).join('')}</ul></div>
    </div>
  </div>
</section>`;

const card = (p) => `
<article class="price-card" id="prix-${p.id}" data-pack="${p.id}">
  <div><h3>${p.name}</h3><p class="tag">${p.tagline}</p></div>
  <div class="term" data-term="monthly"><p class="term-label">Forfait 1 mois</p><p class="price-line"><span class="price-big">${money(p.monthly)}</span><span class="price-unit">pour 1 mois</span></p><p class="save">Paiement unique, sans renouvellement.</p></div>
  <div class="term" data-term="six"><p class="term-label">Forfait 6 mois</p><p class="price-line"><span class="price-big">${money(p.six)}</span><span class="price-unit">pour 6 mois</span></p><p class="save">Paiement unique. Soit ${money(perMonth(p.six, 6))} par mois : vous économisez ${money(saving(p, 'six'))}.</p></div>
  <div class="term" data-term="year"><p class="term-label">Forfait 12 mois</p><p class="price-line"><span class="price-big">${money(p.year)}</span><span class="price-unit">pour 12 mois</span></p><p class="save">Paiement unique. Soit ${money(perMonth(p.year, 12))} par mois : vous économisez ${money(saving(p, 'year'))}.</p></div>
  <a class="btn btn--primary" data-choose="${p.id}" href="inscription.html?pack=${p.id}&amp;duree=six">Acheter ${p.name}</a>
</article>`;

const subset = FAQ.filter(([q]) => /renouvellent|taxes|forfaits de 6|Quelle formation/i.test(q));

export default {
  file: 'formations.html',
  title: 'Formations de course à pied : piste, route et trail',
  description: 'Formations de coaching de course à pied avec un athlète international : piste, route (10 km, semi, marathon) et trail. Plans écrits à la main, dès 80 $. Achat en ligne.',
  schema: [faqSchema(subset)],
  body: `
<section class="page-head">
  <div class="wrap">
    <p class="eyebrow">Formations</p>
    <h1 class="h1">Votre plan, <span class="hl">écrit à la main.</span></h1>
    <p class="lead">Piste, route ou trail : chaque formation est conçue et suivie par Alexandre, avec une visioconférence d’évaluation et un plan créé à la main.</p>
    <div class="actions"><a class="btn btn--primary" href="#tarifs">Voir les tarifs</a></div>
  </div>
</section>
${detail(PACKS.piste, 'chalk')}
${detail(PACKS.route, 'ink')}
${detail(PACKS.trail, 'chalk')}

<section class="slab" data-tone="ink" id="tarifs" aria-labelledby="choix">
  <div class="wrap">
    <div class="section-head">
      <p class="eyebrow">Les tarifs</p><h2 id="choix" class="h2">Choisissez votre <span class="hl">terrain.</span></h2>
      <p class="lead">Un prix par formation, des économies si vous vous engagez sur la durée d’une vraie préparation. Prix en dollars canadiens, avant taxes.</p>
    </div>
    <fieldset class="seg" data-seg style="border:0;padding:0;margin:0 0 clamp(28px,4vw,48px)">
      <legend class="sr">Durée du forfait</legend>
      <label><input type="radio" name="term" value="monthly"><span>1 mois<small>Paiement unique</small></span></label>
      <label><input type="radio" name="term" value="six" checked><span>6 mois<small>Économisez 10 %</small></span></label>
      <label><input type="radio" name="term" value="year"><span>12 mois<small>Économisez 20 %</small></span></label>
    </fieldset>
    <div class="wall wall--3 on-ink">
      ${Object.values(PACKS).map(card).join('\n')}
    </div>
    <p class="fine mt-l">Les forfaits de 1, 6 et 12 mois sont des paiements uniques, sans renouvellement automatique. La TPS et la TVQ s’ajoutent au paiement. Voir les <a class="link" href="conditions-de-vente.html">conditions de vente</a>.</p>
  </div>
</section>

<section class="slab" data-tone="chalk" aria-labelledby="inclus">
  <div class="wrap">
    <div class="section-head"><h2 id="inclus" class="h2">Ce que contient <span class="hl">chaque forfait.</span></h2><p class="lead">Plus la préparation est longue, plus le suivi est présent.</p></div>
    <div class="wall wall--2">
      <div class="block value"><h3>Forfait 1 mois</h3><ul class="ticks"><li>Visioconférence d’évaluation complète</li><li>Plan d’entraînement créé à la main pour vous</li><li>Livraison de votre programme détaillé</li></ul></div>
      <div class="block value"><h3>Forfaits 6 et 12 mois</h3><ul class="ticks"><li>Tout le forfait 1 mois</li><li>Une visioconférence de suivi chaque mois</li><li>Analyse de votre progression</li><li>Un nouveau plan personnalisé livré chaque mois</li></ul></div>
    </div>
  </div>
</section>

<section class="slab" data-tone="ink" id="communautaire" aria-labelledby="comm">
  <div class="wrap">
    <div class="squad">
      <div style="display:grid;gap:16px">
        <h2 id="comm" class="h3-display">Pack Communautaire</h2>
        <p class="lead">La porte d’entrée : courir avec un cadre, des partenaires et les conseils du coach.</p>
        <ul class="ticks">${COMMUNAUTAIRE.includes.map((i) => `<li>${i}</li>`).join('')}</ul>
      </div>
      <div style="display:grid;gap:16px;justify-items:start">
        <p class="price-line"><span class="price-big">${money(COMMUNAUTAIRE.monthly)}</span><span class="price-unit">par mois</span></p>
        <p class="fine" style="margin:0">Abonnement mensuel, à arrêter en tout temps.</p>
        <a class="btn btn--primary" href="inscription.html?pack=communautaire&amp;duree=monthly">Rejoindre la communauté</a>
      </div>
    </div>
  </div>
</section>

<section class="slab" data-tone="chalk" aria-labelledby="addons">
  <div class="wrap">
    <div class="section-head"><h2 id="addons" class="h2">À la carte.</h2></div>
    <div class="stack">${ADDONS.map((a) => `<div class="addon" style="background:var(--limestone);color:var(--ink)"><h3>${a.name}</h3><p style="color:var(--dim-on-chalk)">${a.text}</p><span class="addon-price">+ ${money(a.price)}</span></div>`).join('')}</div>
  </div>
</section>

<section class="slab" data-tone="ink" aria-labelledby="faq">
  <div class="wrap"><div class="section-head"><h2 id="faq" class="h2">Avant de choisir</h2></div>${faqHtml(subset)}</div>
</section>

${ctaBand({
    title: 'Un vêtement pour la route aussi.',
    text: 'Complétez votre préparation avec les vêtements de la marque.',
    primary: '<a class="btn btn--primary" href="boutique.html">Aller à la boutique</a>',
    secondary: '<a class="btn btn--ghost" href="contact.html">Poser une question</a>',
  })}
`,
};
