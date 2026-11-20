import { layout, markSvg, ctaBand, SITE, PALMARES, tbd } from '../lib.mjs';

export default {
  file: 'a-propos.html',
  title: 'À propos : Alexandre Ben Ammar et l’approche Caementum',
  description: 'Athlète international, participant aux Jeux olympiques de Rio, cinq fois champion de France et vingt fois champion de Tunisie : découvrez l’origine et l’approche de Caementum Performance.',
  schema: [{
    '@context': 'https://schema.org', '@type': 'Person', name: 'Alexandre Ben Ammar',
    jobTitle: 'Entraîneur de course à pied et athlète international', url: `${SITE.url}/a-propos.html`,
    workLocation: { '@type': 'City', name: 'Montréal' },
  }],
  body: `
<section class="page-head">
  <div class="wrap">
    <p class="eyebrow">À propos</p>
    <h1 class="h1">Un athlète international <span class="hl">derrière chaque plan.</span></h1>
    <p class="lead">Caementum Performance est le projet d’Alexandre Ben Ammar : mettre l’expérience du haut niveau au service de tous les coureurs.</p>
  </div>
</section>

<section class="slab" data-tone="chalk" aria-labelledby="origine">
  <div class="wrap split">
    <figure class="founder-photo"><img src="assets/img/photos/fondateur.jpg" alt="Alexandre Ben Ammar franchit la rivière lors d’un 3 000 m steeple" width="900" height="900" loading="lazy" decoding="async"></figure>
    <div style="display:grid;gap:22px;align-content:start">
      <h2 id="origine" class="h2">L’origine du projet.</h2>
      <p class="lead">Les applications d’entraînement distribuent des plans en grand nombre, mais très peu offrent un vrai suivi. Beaucoup de coureurs finissent seuls devant un calendrier qui ne tient pas compte de leur vie.</p>
      <p class="measure">Alexandre, athlète international de haut niveau, a voulu faire l’inverse : un accompagnement direct, sincère et exigeant, où chaque plan est écrit à la main. Rendre accessible ce que seuls les athlètes d’élite recevaient.</p>
      <p class="measure">${tbd('Texte provisoire')} Ajoutez ici l’histoire personnelle d’Alexandre : ses débuts, un souvenir marquant de course, ce qui l’a poussé à créer Caementum.</p>
    </div>
  </div>
</section>

<section class="slab" data-tone="ink" aria-labelledby="palmares">
  <div class="wrap">
    <div class="section-head"><h2 id="palmares" class="h2">Palmarès.</h2><p class="lead">Athlète international. Une carrière faite de départs, de finales et de titres.</p></div>
    <ul class="palm">${PALMARES.map(([a, b]) => `<li><b>${a}</b><span>${b}</span></li>`).join('')}</ul>
  </div>
</section>

<section class="slab" data-tone="chalk" aria-labelledby="approche">
  <div class="wrap">
    <div class="section-head"><h2 id="approche" class="h2">L’approche Caementum.</h2></div>
    <div class="wall wall--2">
      <div class="block value"><h3>Zéro algorithme</h3><p>Un expert conçoit, analyse et adapte chaque plan manuellement. Votre entraîneur lit vos retours.</p></div>
      <div class="block value"><h3>Une relation directe</h3><p>Un canal privilégié entre le coach et le coureur, pour la motivation, les doutes et les ajustements.</p></div>
      <div class="block value"><h3>Un plan qui évolue</h3><p>Votre progression, votre horaire et votre forme du jour font bouger le plan, semaine après semaine.</p></div>
      <div class="block value"><h3>Une vision à 360°</h3><p>Entraînement, nutrition, récupération et prévention des blessures, pensés comme un tout.</p></div>
    </div>
  </div>
</section>

<section class="slab" data-tone="ink" aria-labelledby="nom">
  <div class="wrap split split--even">
    <div style="display:grid;gap:20px;align-content:start"><h2 id="nom" class="h2">Pourquoi « Caementum » ?</h2><p class="lead">En latin, le <em>caementum</em> est le matériau qui liait les pierres des constructions romaines. Le mot a donné « ciment ».</p></div>
    <div style="display:grid;gap:18px;align-content:start">
      <p>Une belle performance ne tient pas sur un coup d’éclat. Elle tient sur des semaines de travail posées les unes sur les autres, solidement liées entre elles.</p>
      <p>Notre symbole, un X fait de barres qui se croisent, rappelle les couloirs d’une piste : des lignes parallèles, un même cap.</p>
    </div>
  </div>
</section>

${ctaBand({
    title: 'Courons dans la même direction.',
    text: 'Choisissez votre formation, ou écrivez-nous.',
    primary: '<a class="btn btn--primary" href="formations.html">Voir les formations</a>',
    secondary: '<a class="btn btn--ghost" href="contact.html">Nous écrire</a>',
  })}
`,
};
