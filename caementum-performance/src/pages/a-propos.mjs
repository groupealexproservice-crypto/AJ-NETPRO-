import { layout, markSvg, ctaBand, SITE } from '../lib.mjs';

export default {
  file: 'a-propos.html',
  title: 'Alexandre Ben Ammar, athlète olympique et entraîneur',
  description: 'Alexandre Ben Ammar : athlète olympique à Rio 2016, champion de la Méditerranée et 22 fois champion national. Découvrez la méthode derrière Caementum Performance.',
  schema: [{
    '@context': 'https://schema.org', '@type': 'Person', name: 'Alexandre Ben Ammar',
    jobTitle: 'Entraîneur de course à pied et athlète olympique', url: `${SITE.url}/a-propos.html`,
    workLocation: { '@type': 'City', name: 'Montréal' },
  }],
  body: `
<section class="page-head">
  <div class="wrap">
    <h1 class="h1">Un champion qui entraîne, pas un entraîneur qui commente.</h1>
    <p class="lead">Alexandre Ben Ammar court au plus haut niveau. Ce qu’il apprend sur la piste, il le met dans vos plans.</p>
  </div>
</section>

<section class="slab" data-tone="chalk" aria-labelledby="parcours">
  <div class="wrap split">
    <figure class="portrait" aria-label="Portrait d’Alexandre Ben Ammar" data-photo-placeholder>
      ${markSvg({ size: 300 })}
    </figure>
    <div style="display:grid;gap:22px;align-content:start">
      <h2 id="parcours" class="h2">Un parcours forgé sur la piste.</h2>
      <p class="lead">Athlète olympique à Rio en 2016 et 22 fois champion national, Alexandre est aussi champion de la Méditerranée. Il court toujours et vise une nouvelle qualification olympique.</p>
      <p class="measure">Cette expérience, il la rend accessible. Sa conviction est simple : la performance durable demande une relation directe et sincère entre l’entraîneur et l’athlète. C’est pourquoi chaque plan est conçu à la main, et pourquoi chaque semaine se termine par une vraie conversation.</p>
      <ul class="facts">
        <li><b>Jeux olympiques de Rio 2016</b><span>Athlète olympique.</span></li>
        <li><b>22 titres nationaux</b><span>2 000 m, 3 000 m steeple et 5 000 m.</span></li>
        <li><b>Champion de la Méditerranée</b><span>Titre remporté en 2016.</span></li>
        <li><b>13 min 16 s au 5 000 m</b><span>Record personnel. Au 10 km : 28 min 22 s.</span></li>
      </ul>
    </div>
  </div>
</section>

<section class="slab" data-tone="ink" aria-labelledby="valeurs">
  <div class="wrap">
    <div class="section-head"><h2 id="valeurs" class="h2">Ce qui guide chaque plan.</h2></div>
    <div class="wall wall--3 who">
      <div class="block"><h3>Sincérité</h3><p>Une performance durable exige une connexion réelle entre l’entraîneur et l’athlète. Vous parlez à une personne, pas à un tableau de bord.</p></div>
      <div class="block"><h3>Exigence</h3><p>La rigueur du haut niveau, transmise à tous les profils, à la mesure de ce que vous pouvez réellement faire.</p></div>
      <div class="block"><h3>Présence</h3><p>Un plan évolutif, ajusté selon vos retours, votre horaire et votre forme du jour. Vous n’êtes jamais seul avec votre plan.</p></div>
    </div>
  </div>
</section>

<section class="slab" data-tone="chalk" aria-labelledby="nom">
  <div class="wrap split split--even">
    <div style="display:grid;gap:20px;align-content:start">
      <h2 id="nom" class="h2">Pourquoi « Caementum » ?</h2>
      <p class="lead">En latin, le <em>caementum</em> est le matériau qui liait les pierres des constructions romaines. Le mot a donné « ciment ».</p>
    </div>
    <div style="display:grid;gap:18px;align-content:start">
      <p>Une belle performance ne tient pas sur un coup d’éclat. Elle tient sur des semaines de travail posées les unes sur les autres, solidement liées entre elles.</p>
      <p>Notre logo reprend cette idée : un C bâti de blocs de pierre qui se desserrent en montant, comme la foulée qui passe de la fondation au mouvement.</p>
    </div>
  </div>
</section>

${ctaBand({
    title: 'Courons dans la même direction.',
    text: 'Choisissez votre programme, ou parlez d’abord à Alexandre.',
    primary: '<a class="btn btn--light" href="programmes.html">Voir les programmes</a>',
    secondary: '<a class="btn btn--ghost" href="contact.html#appel">Parler à Alexandre</a>',
  })}
`,
};
