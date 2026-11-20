import { layout, PACKS, money, saving, ctaBand, ADDONS, pixelRunner } from '../lib.mjs';
import { ground } from '../parts.mjs';

const WORK = {
  piste: ['Vitesse maximale aérobie (VMA) et séances de qualité', 'Technique de course, analysée sur vidéo', 'Séances spécifiques à la piste, du 800 m au 5 000 m'],
  route: ['Préparation construite autour de votre date de course', 'Allures cibles et stratégie de course', 'Du premier 10 km au marathon, en passant par le semi'],
  trail: ['Gestion du dénivelé, en montée comme en descente', 'Renforcement musculaire spécifique au trail', 'Endurance sur terrain varié, du trail court à l’ultra'],
};

const section = (p, tone) => `
<section class="slab" data-tone="${tone}" id="${p.id}" aria-labelledby="t-${p.id}">
  <div class="wrap split split--even">
    <div class="stack">
      <div class="block ${tone === 'ink' ? '' : 'block--ink'}" style="display:grid;gap:18px;min-height:340px;align-content:end;color:#fff">
        <div class="panel-art" style="height:auto">${pixelRunner(p.id, { className: 'runner' })}${ground[p.id]}</div>
      </div>
      <div class="block">
        <p class="price-line"><span class="price-big">${money(p.monthly)}</span><span class="price-unit">pour 1 mois</span></p>
        <p class="fine" style="margin-top:10px">Forfait 1 mois. 6 mois : ${money(p.six)} (économie de ${money(saving(p, 'six'))}). 12 mois : ${money(p.year)} (économie de ${money(saving(p, 'year'))}). Paiements uniques, avant taxes.</p>
      </div>
    </div>
    <div style="display:grid;gap:22px;align-content:start">
      <h2 id="t-${p.id}" class="h2">${p.name} : ${p.tagline.toLowerCase()}</h2>
      <p class="lead">${p.pitch}</p>
      <p><strong>Pour qui ?</strong> ${p.for}</p>
      <div><h3 style="font-weight:600;margin-bottom:10px">Distances couvertes</h3><ul class="tag-list">${p.distances.map((d) => `<li>${d}</li>`).join('')}</ul></div>
      <div>
        <h3 style="font-weight:600;margin-bottom:10px">Ce que vous travaillez</h3>
        <ul class="ticks">${WORK[p.id].map((w) => `<li>${w}</li>`).join('')}</ul>
      </div>
      <div>
        <h3 style="font-weight:600;margin-bottom:10px">Inclus dans votre abonnement</h3>
        <ul class="ticks">${p.includes.map((w) => `<li>${w}</li>`).join('')}</ul>
      </div>
      <div class="actions">
        <a class="btn ${tone === 'ink' ? 'btn--light' : 'btn--dark'}" href="inscription.html?pack=${p.id}&amp;duree=six">Choisir ${p.name}</a>
        <a class="btn btn--ghost" href="tarifs.html#${p.id}">Comparer les durées</a>
      </div>
    </div>
  </div>
</section>`;

export default {
  file: 'programmes.html',
  title: 'Programmes de coaching : piste, route et trail',
  description: 'Trois programmes de coaching de course à pied : piste, route (10 km, semi, marathon) et trail. Plans écrits à la main par un athlète olympique. Dès 80 $ par mois.',
  schema: [],
  body: `
<section class="page-head">
  <div class="wrap">
    <h1 class="h1">Trois terrains. Un plan écrit pour vous.</h1>
    <p class="lead">Piste, route ou trail : chaque programme est conçu et suivi par Alexandre, avec un débriefing chaque semaine.</p>
  </div>
</section>
${section(PACKS.piste, 'chalk')}
${section(PACKS.route, 'ink')}
${section(PACKS.trail, 'chalk')}
<section class="slab" data-tone="ink" aria-labelledby="addons">
  <div class="wrap">
    <div class="section-head">
      <h2 id="addons" class="h2">Pour aller plus loin, à la carte.</h2>
      <p class="lead">Ajoutez ce dont vous avez besoin à votre programme, au moment où vous en avez besoin.</p>
    </div>
    <div class="stack">
      ${ADDONS.map((a) => `<div class="addon"><h3>${a.name}</h3><p>${a.text}</p><span class="addon-price">+ ${money(a.price)}</span></div>`).join('')}
    </div>
    <p class="fine mt-l">Prix avant taxes, en dollars canadiens.</p>
  </div>
</section>
${ctaBand({
    title: 'Un seul premier pas à faire.',
    text: 'Choisissez votre programme et votre durée. Alexandre s’occupe de la suite.',
    primary: '<a class="btn btn--light" href="tarifs.html">Voir les tarifs</a>',
    secondary: '<a class="btn btn--ghost" href="contact.html#appel">Parler à Alexandre</a>',
  })}
`,
};
