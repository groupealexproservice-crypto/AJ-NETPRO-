import { layout, PACKS, COMMUNAUTAIRE, ADDONS, money, ctaBand, hasPhoto } from '../lib.mjs';
import { faqHtml, faqSchema, FAQ } from '../parts.mjs';

const perDay = (total, days) => new Intl.NumberFormat('fr-CA', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(total / days) + ' $';

// Structure d'une formation : ajouter une entrée dans PACKS (src/lib.mjs) la fait apparaître ici et dans les tarifs.
const detail = (p, tone) => `
<section class="slab" data-tone="${tone}" id="${p.id}" aria-labelledby="t-${p.id}">
  <div class="wrap split">
    <div class="split-sticky">
      <h2 id="t-${p.id}" class="h2">${p.name}</h2>
      <p class="lead">${p.tagline}. ${p.pitch}</p>
      <p class="price-line"><span class="price-big">${money(Math.round(p.year / 12))}</span><span class="price-unit">par mois avec le forfait 12 mois</span></p>
      <div class="actions"><a class="btn ${tone === 'ink' ? 'btn--primary' : 'btn--dark'}" data-choose="${p.id}" href="inscription.html?pack=${p.id}&amp;duree=year">Acheter ${p.name}</a><a class="btn btn--ghost" href="#tarifs">Comparer les durées</a></div>
      ${hasPhoto(p.id + '.jpg') ? `<figure class="frame-photo ${tone === 'ink' ? 'frame-photo--light' : ''}"><img src="assets/img/photos/${p.id}.jpg" alt="Formation ${p.name}" loading="lazy" decoding="async"></figure>` : ''}
    </div>
    <div class="wall wall--2">
      <div class="block value"><h3>Public cible</h3><p>${p.for}</p></div>
      <div class="block value"><h3>Pour toutes les personnes</h3><p>Une seule formation, ouverte à tous les genres. Alexandre écrit votre plan selon votre niveau, votre objectif et votre horaire.</p></div>
      <div class="block value" style="grid-column:1/-1"><h3>Contenu</h3><ul class="ticks">${p.includes.map((i) => `<li>${i}</li>`).join('')}</ul><p style="margin-top:18px;font-weight:600">Distances couvertes</p><ul class="${tone === 'ink' ? 'chips' : 'tag-list'}" style="margin-top:8px">${p.distances.map((d) => `<li>${d}</li>`).join('')}</ul></div>
    </div>
  </div>
</section>`;

// Un bloc de prix par durée : prix mensuel équivalent en vedette, prix barré, économie, coût par jour
const TERMS = (p) => [
  { key: 'monthly', label: 'Forfait 1 mois', total: p.monthly, months: 1, days: 30, full: null },
  { key: 'six', label: 'Forfait 6 mois', total: p.six, months: 6, days: 183, full: p.monthly * 6 },
  { key: 'year', label: 'Forfait 12 mois', total: p.year, months: 12, days: 365, full: p.monthly * 12 },
];
const termBlock = (t) => {
  const save = t.full ? t.full - t.total : 0;
  const pct = t.full ? Math.round((save / t.full) * 100) : 0;
  const main = t.key === 'monthly' ? money(t.total) : money(Math.round(t.total / t.months));
  const unit = t.key === 'monthly' ? 'pour 1 mois' : 'par mois';
  return `<div class="term" data-term="${t.key}">
    <p class="term-label">${t.label}</p>
    ${t.key === 'year' ? '<p class="best">Meilleure valeur</p>' : ''}
    <p class="price-line"><span class="price-big">${main}</span><span class="price-unit">${unit}</span></p>
    ${t.full
      ? `<p class="was"><s>${money(t.full)}</s> <strong>${money(t.total)}</strong> payés en une fois</p><p class="save-pill">−${pct} %, vous économisez ${money(save)}</p>`
      : '<p class="was">Paiement unique, sans renouvellement.</p>'}
    <p class="perday">Soit ${perDay(t.total, t.days)} par jour</p>
  </div>`;
};
const card = (p) => `
<article class="price-card" id="prix-${p.id}" data-pack="${p.id}">
  <div><h3>${p.name}</h3><p class="tag">${p.tagline}</p></div>
  ${TERMS(p).map(termBlock).join('')}
  <p class="dist">Distances : ${p.distances.join(', ')}.</p>
  <ul class="ticks">${p.includes.map((i) => `<li>${i}</li>`).join('')}</ul>
  <a class="btn btn--primary" data-choose="${p.id}" href="inscription.html?pack=${p.id}&amp;duree=year">Acheter ${p.name}</a>
</article>`;

const subset = FAQ.filter(([q]) => /renouvellent|taxes|forfaits de 6|Quelle formation|même pour tout le monde/i.test(q));

export default {
  file: 'formations.html',
  title: 'Formations de course à pied : piste, route et trail',
  description: 'Formations de coaching de course à pied pour toutes les personnes : piste (800 m au 10 000 m, steeple), route (10 km, marathon) et trail. Plans écrits à la main, dès 80 $. Achat en ligne.',
  schema: [faqSchema(subset)],
  body: `
<section class="page-head">
  <div class="wrap">
    <p class="eyebrow">Formations</p>
    <h1 class="h1">Votre plan, <span class="hl">écrit à la main.</span></h1>
    <p class="lead">Piste, route ou trail : une seule formation par discipline, ouverte à toutes les personnes, conçue et suivie par Alexandre.</p>
    <div class="actions"><a class="btn btn--primary" href="#tarifs">Voir les tarifs</a></div>
  </div>
</section>
${detail(PACKS.piste, 'chalk')}
${detail(PACKS.route, 'ink')}
${detail(PACKS.trail, 'chalk')}

<section class="slab" data-tone="chalk" id="tarifs" aria-labelledby="choix">
  <div class="wrap">
    <div class="section-head">
      <h2 id="choix" class="h2">Choisissez votre <span class="hl">terrain.</span></h2>
      <p class="lead">Plus vous vous engagez longtemps, moins chaque mois vous coûte. Le forfait de 12 mois est le plus avantageux. Prix en dollars canadiens, avant taxes.</p>
    </div>
    <div class="seg-row">
      <div class="seg-block"><p class="seg-title" id="seg-term">Durée</p>
        <fieldset class="seg" data-seg="term" aria-labelledby="seg-term" style="border:0;padding:0;margin:0">
          <label><input type="radio" name="term" value="monthly"><span>1 mois<small>Paiement unique</small></span></label>
          <label><input type="radio" name="term" value="six"><span>6 mois<small>Économisez 10 %</small></span></label>
          <label><input type="radio" name="term" value="year" checked><span>12 mois<small>Économisez 20 % · meilleure valeur</small></span></label>
        </fieldset>
      </div>
    </div>
    <div class="wall wall--3 on-ink">
      ${Object.values(PACKS).map(card).join('\n')}
    </div>
    <ul class="trust">
      <li>Plan écrit à la main, jamais généré</li>
      <li>Visioconférence d’évaluation incluse</li>
      <li>Paiement unique, aucun renouvellement</li>
      <li>Une formation ouverte à tous les genres</li>
    </ul>
    <p class="fine mt-l">Les forfaits de 1, 6 et 12 mois sont des paiements uniques, sans renouvellement automatique. Le prix mensuel affiché pour 6 et 12 mois est le prix du forfait divisé par la durée. La TPS et la TVQ s’ajoutent au paiement. Voir les <a class="link" href="conditions-de-vente.html">conditions de vente</a>.</p>
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
    ${hasPhoto('communaute.jpg') ? '<figure class="frame-photo frame-photo--wide frame-photo--light" style="margin-bottom:28px"><img src="assets/img/photos/communaute.jpg" alt="Course en groupe de la communauté" loading="lazy" decoding="async"></figure>' : ''}
    <div class="squad">
      <div style="display:grid;gap:16px">
        <h2 id="comm" class="h3-display">Pack Communautaire</h2>
        <p class="lead">La porte d’entrée : courir avec un cadre, des partenaires et les conseils du coach.</p>
        <ul class="ticks">${COMMUNAUTAIRE.includes.map((i) => `<li>${i}</li>`).join('')}</ul>
      </div>
      <div style="display:grid;gap:16px;justify-items:start">
        <p class="price-line"><span class="price-big">${money(COMMUNAUTAIRE.monthly)}</span><span class="price-unit">par mois</span></p>
        <p class="fine" style="margin:0">Abonnement mensuel, à arrêter en tout temps.</p>
        <a class="btn btn--primary" data-choose="communautaire" data-monthly href="inscription.html?pack=communautaire&amp;duree=monthly">Rejoindre la communauté</a>
      </div>
    </div>
  </div>
</section>

<section class="slab" data-tone="chalk" aria-labelledby="addons">
  <div class="wrap">
    <div class="section-head"><h2 id="addons" class="h2">Complétez avec <span class="hl">une option.</span></h2><p class="lead">Ajoutez-les à votre formation au moment de l’inscription.</p></div>
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
