import { SITE, logoSvg, photo, ctaBand, faqHtml, FAQ } from '../lib.mjs';

const why = [
  ['Équipe fiable et professionnelle', 'Du personnel formé, discret et de confiance pour intervenir dans vos environnements sensibles.'],
  ['Service personnalisé', 'Chaque mandat est conçu sur mesure selon vos besoins, votre horaire et vos exigences.'],
  ['Prix compétitifs', 'Une tarification claire et juste, sans surprise, pour un excellent rapport qualité-prix.'],
  ['Réactivité rapide', 'Une réponse en moins de 24 heures et une grande flexibilité pour les besoins urgents.'],
  ['Approche long terme', 'Des partenariats durables avec les entreprises : contrats récurrents et conseiller dédié.'],
];

export default {
  file: 'index.html',
  title: 'Accueil',
  description: 'Benax Service : entretien commercial et résidentiel à Montréal et environs. Équipe fiable, service discret, soumission gratuite en moins de 24 heures.',
  schema: [{
    '@context': 'https://schema.org', '@type': 'HomeAndConstructionBusiness', name: SITE.name, url: SITE.url,
    description: 'Entretien commercial et résidentiel à Montréal et dans les environs.',
    telephone: '+1-438-304-9159', email: SITE.email,
    areaServed: { '@type': 'City', name: 'Montréal' },
    address: { '@type': 'PostalAddress', addressLocality: 'Montréal', addressRegion: 'QC', addressCountry: 'CA' },
    openingHoursSpecification: [{ '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'], opens: '07:00', closes: '21:00' }],
    makesOffer: ['Entretien commercial', 'Entretien résidentiel', 'Nettoyage en profondeur', 'Nettoyage après déménagement'].map((n) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: n } })),
  }],
  body: `
<section class="hero" aria-labelledby="h1">
  <div class="wrap hero-grid">
    <div class="hero-copy">
      <h1 id="h1" class="h1">Des espaces impeccables, jour après jour.</h1>
      <p class="lead">Benax Service assure l’entretien commercial et résidentiel à Montréal et dans les environs, avec une équipe fiable, discrète et constante.</p>
      <div class="actions">
        <a class="btn btn--light" href="soumission.html">Demander une soumission gratuite</a>
        <a class="btn btn--ghost" href="tel:${SITE.phoneHref}">${SITE.phone}</a>
      </div>
      <p class="hero-note">Réponse en moins de 24 heures. Sans engagement.</p>
    </div>
    ${logoSvg({ className: 'hero-logo', animate: true, title: 'Logo Benax Service : un immeuble dont les fenêtres s’allument, au-dessus d’une usine' })}
  </div>
  <div class="wrap">
    <div class="wall wall--4 cred">
      <div class="block"><p class="cred-main">Réponse en moins de 24 h</p><p class="cred-sub">Soumission gratuite et personnalisée.</p></div>
      <div class="block"><p class="cred-main">Du lundi au dimanche</p><p class="cred-sub">Horaires flexibles, y compris pour les urgences.</p></div>
      <div class="block"><p class="cred-main">Équipe de confiance</p><p class="cred-sub">Personnel vérifié, formé et discret.</p></div>
      <div class="block"><p class="cred-main">Satisfaction garantie</p><p class="cred-sub">Sinon, nous revenons corriger.</p></div>
    </div>
    <div class="band">${photo('hero-team.jpg', 'Un membre de l’équipe Benax Service polit un plancher dans un espace commercial', { ratio: '21 / 9' })}</div>
  </div>
  <div style="height:clamp(56px,8vw,112px)"></div>
</section>

<section class="slab" data-tone="chalk" aria-labelledby="apropos">
  <div class="wrap split">
    <div class="split-sticky">
      <h2 id="apropos" class="h2">Une approche rigoureuse, orientée résultats.</h2>
      <p class="lead">Benax Service est une entreprise montréalaise spécialisée dans l’entretien commercial et résidentiel. Notre mission : offrir aux entreprises et aux propriétaires un service impeccable, discret et constant.</p>
      <p class="measure">Chaque mandat est traité avec sérieux, transparence et attention aux détails, parce que la propreté de vos espaces reflète la qualité de votre marque.</p>
    </div>
    <div class="wall wall--2">
      <div class="stack">
        ${photo('team-window.jpg', 'Un technicien lave les vitres d’une résidence', { ratio: '4 / 5' })}
      </div>
      <div class="stack">
        ${photo('team-floor.jpg', 'Un technicien travaille sur un plancher', { ratio: '4 / 5' })}
      </div>
      <div class="block"><h3 class="mini">Vision</h3><p>Bâtir des relations à long terme grâce à un service constant et fiable.</p></div>
      <div class="block"><h3 class="mini">Engagement</h3><p>Qualité, rigueur et respect des standards à chaque intervention.</p></div>
    </div>
  </div>
</section>

<section class="slab" data-tone="ink" aria-labelledby="serv">
  <div class="wrap">
    <div class="section-head">
      <h2 id="serv" class="h2">Des solutions d’entretien sur mesure.</h2>
      <p class="lead">Bureau, commerce, immeuble ou résidence : nous adaptons nos services à vos exigences et à votre horaire.</p>
    </div>
    <div class="wall wall--2">
      <article class="panel panel--text">
        <h3>Commercial</h3>
        <p class="tag">Notre priorité : les entreprises</p>
        <p>Un service rigoureux pour maintenir vos espaces professionnels à leur meilleur, jour après jour.</p>
        <ul class="ticks"><li>Bureaux et espaces corporatifs</li><li>Commerces et boutiques</li><li>Immeubles et aires communes</li><li>Nettoyage régulier et contrats long terme</li></ul>
        <div class="panel-foot"><div class="panel-links"><a class="btn btn--light" href="soumission.html?service=commercial">Soumission commerciale</a><a class="link" href="services.html#commercial">En savoir plus</a></div></div>
      </article>
      <article class="panel panel--text">
        <h3>Résidentiel</h3>
        <p class="tag">Soigné, discret, fiable</p>
        <p>Un nettoyage soigné pour les résidences exigeantes, les copropriétés et les logements locatifs.</p>
        <ul class="ticks"><li>Maisons et condos</li><li>Appartements et locations</li><li>Nettoyage en profondeur</li><li>Nettoyage après déménagement</li></ul>
        <div class="panel-foot"><div class="panel-links"><a class="btn btn--light" href="soumission.html?service=residentiel">Soumission résidentielle</a><a class="link" href="services.html#residentiel">En savoir plus</a></div></div>
      </article>
    </div>
    <p class="fine mt-l">Aussi offerts : vitres et surfaces vitrées, désinfection sanitaire, planchers et tapis, produits écologiques sur demande.</p>
  </div>
</section>

<section class="slab" data-tone="chalk" id="pourquoi" aria-labelledby="pq">
  <div class="wrap">
    <div class="section-head"><h2 id="pq" class="h2">Cinq raisons de nous confier vos espaces.</h2></div>
    <div class="wall wall--3">
      ${why.map(([t, d]) => `<div class="block principle"><h3>${t}</h3><p>${d}</p></div>`).join('\n      ')}
      <div class="block block--ink" style="display:grid;gap:14px;align-content:center"><p class="cred-main">Parlons de vos espaces.</p><div><a class="btn btn--light" href="soumission.html">Soumission gratuite</a></div></div>
    </div>
  </div>
</section>

<section class="slab" data-tone="ink" id="equipe" aria-labelledby="eq">
  <div class="wrap">
    <div class="section-head">
      <h2 id="eq" class="h2">Une équipe en action, sur le terrain.</h2>
      <p class="lead">Formée, équipée et identifiable, toujours dans le respect de vos espaces.</p>
    </div>
    <div class="gallery">
      ${photo('team-1.jpg', 'Polissage de plancher dans un espace commercial', { ratio: '4 / 3' })}
      ${photo('team-2.jpg', 'Entretien d’une aire commune d’immeuble', { ratio: '4 / 3' })}
      ${photo('team-3.jpg', 'Lavage de vitres en hauteur', { ratio: '4 / 3' })}
      ${photo('team-4.jpg', 'Lavage mécanisé d’un hall d’immeuble corporatif', { ratio: '4 / 3' })}
    </div>
  </div>
</section>

<section class="slab" data-tone="chalk" aria-labelledby="faq">
  <div class="wrap">
    <div class="section-head"><h2 id="faq" class="h2">Questions fréquentes</h2></div>
    ${faqHtml()}
  </div>
</section>

${ctaBand({
    title: 'Recevez votre soumission en moins de 24 heures.',
    text: 'Un seul formulaire, une réponse personnalisée. Sans engagement.',
    primary: '<a class="btn btn--light" href="soumission.html">Demander une soumission</a>',
    secondary: `<a class="btn btn--ghost" href="tel:${SITE.phoneHref}">Appeler ${SITE.phone}</a>`,
  })}
`,
};
