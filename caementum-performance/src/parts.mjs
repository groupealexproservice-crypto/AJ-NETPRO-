// Éléments de page partagés entre plusieurs pages.
import { PACKS, money, pixelRunner, markSvg } from './lib.mjs';

export const ground = {
  piste: `<svg class="ground" viewBox="0 0 300 18" preserveAspectRatio="none" fill="currentColor" aria-hidden="true"><rect y="0" width="300" height="3"/><rect y="7" width="300" height="3"/><rect y="14" width="300" height="3"/></svg>`,
  route: `<svg class="ground" viewBox="0 0 300 18" preserveAspectRatio="none" fill="currentColor" aria-hidden="true">${Array.from({ length: 9 }, (_, i) => `<rect x="${i * 34}" y="7" width="22" height="5"/>`).join('')}</svg>`,
  trail: `<svg class="ground" viewBox="0 0 300 18" preserveAspectRatio="none" fill="currentColor" aria-hidden="true"><polygon points="0,18 0,10 30,0 30,10 60,0 60,10 90,0 90,10 120,0 120,10 150,0 150,10 180,0 180,10 210,0 210,10 240,0 240,10 270,0 270,10 300,0 300,18"/></svg>`,
};

export function packPanel(p, { withLinks = true } = {}) {
  return `<article class="panel" id="${p.id}">
    <div class="panel-art">
      ${pixelRunner(p.id, { className: 'runner' })}
      ${ground[p.id]}
    </div>
    <div class="panel-body">
      <h3>${p.name}</h3>
      <p class="tag">${p.tagline}</p>
      <p>${p.pitch}</p>
      <p class="dist">Distances : ${p.distances.join(', ')}.</p>
      <ul class="ticks">${p.includes.map((i) => `<li>${i}</li>`).join('')}</ul>
      <div class="panel-foot">
        <p class="price-line"><span class="price-big">${money(p.monthly)}</span><span class="price-unit">par mois, avant taxes</span></p>
        ${withLinks ? `<div class="panel-links"><a class="btn btn--light" href="inscription.html?pack=${p.id}&amp;duree=six">Choisir ce programme</a><a class="link" href="tarifs.html#${p.id}">Voir les durées</a></div>` : ''}
      </div>
    </div>
  </article>`;
}

export const FAQ = [
  ['Est-ce vraiment sans algorithme ?', '<p>Oui. Chaque plan est écrit à la main par Alexandre après avoir lu vos retours. Il n’y a ni générateur de plans, ni intelligence artificielle qui décide de vos séances.</p>'],
  ['Quel programme choisir ?', '<p>Le programme suit votre terrain. Piste pour viser un chrono sur 800 m à 5 000 m, route pour préparer un 10 km, un semi ou un marathon, trail pour le dénivelé et l’ultra. En cas de doute, un appel avec Alexandre sert justement à choisir avec vous.</p>'],
  ['Je débute. Est-ce pour moi ?', '<p>Oui. Les programmes s’adaptent à votre niveau, du premier 10 km à la compétition. Un débutant y gagne surtout de la structure et de la sécurité : une progression qui évite la blessure et le découragement.</p>'],
  ['Comment se passe la visio d’évaluation ?', '<p>Après votre paiement, Alexandre vous contacte pour planifier une visioconférence d’environ 20 à 30 minutes. Il fait le tour de votre niveau, de vos objectifs, de vos antécédents, de votre disponibilité et de vos contraintes, puis il crée votre plan à la main.</p>'],
  ['Puis-je changer de programme en cours de route ?', '<p>Oui, par exemple passer de la route au trail à la fin d’une préparation. Écrivez-nous et nous ajustons votre abonnement.</p>'],
  ['Les forfaits se renouvellent-ils automatiquement ?', '<p>Non. Les forfaits de 1, 6 et 12 mois sont des paiements uniques : rien ne se renouvelle sans votre accord. Seul le pack Communautaire est un abonnement mensuel, que vous pouvez arrêter en tout temps. Les détails sont dans les <a class="link" href="conditions-de-vente.html">conditions de vente</a>.</p>'],
  ['Les prix incluent-ils les taxes ?', '<p>Non. Tous les prix sont en dollars canadiens et s’affichent avant taxes. La TPS et la TVQ s’ajoutent au paiement.</p>'],
  ['Pourquoi des forfaits de 6 et 12 mois ?', '<p>Une préparation de marathon ou d’ultra se construit en cycles de plusieurs mois. Avec les forfaits de 6 et 12 mois, vous avez une visioconférence de suivi chaque mois, un nouveau plan à chaque étape, et vous économisez : 10 % sur 6 mois, 20 % sur 12 mois.</p>'],
  ['Le coaching se fait-il à distance ?', '<p>Oui. Alexandre est à Montréal et coache partout au Québec par vidéo et par échanges directs, selon votre horaire.</p>'],
];
export function faqHtml(items = FAQ) {
  return `<div class="faq">${items.map(([q, a]) => `<details><summary>${q}</summary><div class="answer">${a}</div></details>`).join('')}</div>`;
}
export const faqSchema = (items = FAQ) => ({
  '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: items.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a.replace(/<[^>]+>/g, '') } })),
});
