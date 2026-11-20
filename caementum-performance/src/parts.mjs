// Éléments de page partagés.
import { PACKS, money, markSvg, markInner, tbd } from './lib.mjs';

export const FAQ = [
  ['Est-ce vraiment sans algorithme ?', '<p>Oui. Chaque plan est écrit à la main par Alexandre après avoir lu vos retours. Il n’y a ni générateur de plans, ni intelligence artificielle qui décide de vos séances.</p>'],
  ['Quelle formation choisir ?', '<p>Piste pour viser un chrono du 800 m au 10 000 m, route pour préparer un 10 km ou un marathon, trail pour le dénivelé et l’ultra. En cas de doute, écrivez-nous : nous vous aidons à choisir.</p>'],
  ['La formation est-elle la même pour tout le monde ?', '<p>Oui, il y a une seule formation par discipline, ouverte à toutes les personnes, quel que soit leur genre. Votre plan est ensuite écrit à la main selon votre niveau, votre objectif, vos disponibilités et vos antécédents.</p>'],
  ['Je débute. Est-ce pour moi ?', '<p>Oui. Les programmes s’adaptent à votre niveau, du premier 10 km à la compétition. Un débutant y gagne de la structure et de la sécurité : une progression qui évite la blessure et le découragement.</p>'],
  ['Comment se passe la visio d’évaluation ?', '<p>Après votre paiement, Alexandre vous contacte pour planifier une visioconférence. Il fait le tour de votre niveau, de vos objectifs, de vos antécédents, de votre disponibilité et de vos contraintes, puis il crée votre plan à la main.</p>'],
  ['Les forfaits se renouvellent-ils automatiquement ?', '<p>Non. Les forfaits de 1, 6 et 12 mois sont des paiements uniques : rien ne se renouvelle sans votre accord. Seul le pack Communautaire est un abonnement mensuel, que vous pouvez arrêter en tout temps.</p>'],
  ['Les prix incluent-ils les taxes ?', '<p>Non. Tous les prix sont en dollars canadiens et s’affichent avant taxes. La TPS et la TVQ s’ajoutent au paiement.</p>'],
  ['Pourquoi des forfaits de 6 et 12 mois ?', '<p>Une préparation de marathon ou d’ultra se construit en cycles de plusieurs mois. Avec les forfaits de 6 et 12 mois, vous avez une visioconférence de suivi chaque mois et un nouveau plan à chaque étape, et vous économisez : 10 % sur 6 mois, 20 % sur 12 mois.</p>'],
  ['Le coaching se fait-il à distance ?', '<p>Oui. Alexandre est à Montréal et coache partout au Québec par vidéo et par échanges directs, selon votre horaire.</p>'],
  ['Comment fonctionne la boutique ?', '<p>Les vêtements Caementum se commandent en ligne : vous choisissez le produit et la taille, puis vous finalisez votre commande. Les produits, les prix et les délais de livraison seront confirmés à l’ouverture de la boutique.</p>'],
];
export function faqHtml(items = FAQ) {
  return `<div class="faq">${items.map(([q, a]) => `<details><summary>${q}</summary><div class="answer">${a}</div></details>`).join('')}</div>`;
}
export const faqSchema = (items = FAQ) => ({
  '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: items.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a.replace(/<[^>]+>/g, '') } })),
});

// Illustrations provisoires des vêtements (dessins de présentation, pas des photos)
const X = (x, y, k, c) => `<g transform="translate(${x} ${y}) scale(${k})" fill="${c}">${markInner()}</g>`;
const GARMENT = {
  tshirt: `<path d="M62 38 L90 28 Q100 42 110 28 L138 38 L176 70 L158 94 L142 82 L142 172 L58 172 L58 82 L42 94 L24 70 Z" fill="#111"/><path d="M24 70 L42 94 M176 70 L158 94" stroke="#1652f0" stroke-width="6"/>${X(86, 70, .28, '#fff')}`,
  camisole: `<path d="M72 28 L86 28 Q100 58 114 28 L128 28 L138 84 L132 172 L68 172 L62 84 Z" fill="#fff" stroke="#111" stroke-width="3"/><path d="M68 160 H132 V172 H68 Z" fill="#1652f0"/>${X(86, 80, .28, '#1652f0')}`,
  short: `<path d="M50 58 H150 L160 152 L108 152 L100 104 L92 152 L40 152 Z" fill="#111"/><path d="M50 58 L40 152 M150 58 L160 152" stroke="#1652f0" stroke-width="6"/><path d="M50 58 H150 V68 H50 Z" fill="#2a2a2a"/>${X(54, 84, .22, '#fff')}`,
  'coupe-vent': `<path d="M62 36 L90 26 H110 L138 36 L176 62 L166 150 L148 148 L146 176 H54 L52 148 L34 150 L24 62 Z" fill="#1652f0"/><path d="M100 28 V176" stroke="#0d2f8f" stroke-width="3"/><path d="M34 150 L52 148 M166 150 L148 148" stroke="#111" stroke-width="8"/>${X(112, 66, .22, '#fff')}`,
  kangourou: `<path d="M76 34 Q100 16 124 34 L130 58 H70 Z" fill="#222"/><path d="M62 54 L38 72 L20 146 L44 152 L52 104 L52 178 H148 V104 L156 152 L180 146 L162 72 L138 54 Q100 70 62 54 Z" fill="#111"/><path d="M70 130 H130 L124 160 H76 Z" fill="#1c1c1c"/><path d="M90 60 V90 M110 60 V90" stroke="#fff" stroke-width="3"/>${X(86, 92, .26, '#1652f0')}`,
  casquette: `<path d="M38 116 Q38 58 100 58 Q162 58 162 116 Z" fill="#111"/><path d="M38 108 H162 V118 H38 Z" fill="#1652f0"/><path d="M100 118 Q176 114 188 136 Q150 140 100 128 Z" fill="#111"/>${X(80, 70, .24, '#fff')}`,
};
export const garment = (id, cls = 'garment') => `<svg class="${cls}" viewBox="0 0 200 200" role="img" aria-label="Visuel provisoire du produit">${GARMENT[id] || ''}</svg>`;

export function productCard(p) {
  const hasPhoto = p.photo && fs.existsSync(path.join(root, 'assets/img/produits', p.photo));
  const photo = hasPhoto
    ? `<img src="assets/img/produits/${p.photo}" alt="${p.name}" loading="lazy" decoding="async">`
    : `<div class="product-ph">${garment(p.id)}<span class="ph-tag">Visuel provisoire</span></div>`;
  const price = p.price == null ? `<p class="product-price"><span class="tbd">Prix à définir</span></p>` : `<p class="product-price">${money(p.price)}</p>`;
  const sizes = p.sizes.length > 1
    ? `<fieldset class="sizes"><legend>Taille</legend>${p.sizes.map((z, i) => `<label><input type="radio" name="t-${p.id}" value="${z}"${i === 2 ? ' checked' : ''}><span>${z}</span></label>`).join('')}</fieldset>`
    : `<p class="fine" style="margin:0">Taille unique</p>`;
  return `<article class="product" data-product="${p.id}" data-cat="${p.cat}" data-name="${p.name}" data-price="${p.price == null ? '' : p.price}">
  <div class="product-photo">${photo}</div>
  <div class="product-body">
    <h3>${p.name}</h3>
    ${price}
    <p class="product-desc">${p.provisoire ? tbd('À compléter') + ' ' : ''}${p.desc}</p>
    ${sizes}
    <a class="btn btn--dark" data-add href="panier.html">Ajouter au panier</a>
  </div>
</article>`;
}
