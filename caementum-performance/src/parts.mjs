// Éléments de page partagés.
import { PACKS, money, markSvg, tbd } from './lib.mjs';

export const FAQ = [
  ['Est-ce vraiment sans algorithme ?', '<p>Oui. Chaque plan est écrit à la main par Alexandre après avoir lu vos retours. Il n’y a ni générateur de plans, ni intelligence artificielle qui décide de vos séances.</p>'],
  ['Quelle formation choisir ?', '<p>Piste pour viser un chrono du 800 m au 5 000 m, route pour préparer un 10 km, un semi ou un marathon, trail pour le dénivelé et l’ultra. En cas de doute, écrivez-nous : nous vous aidons à choisir.</p>'],
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

// Fiche produit de la boutique (photo si le fichier existe dans assets/img/produits/, sinon dalle de réserve avec le X de la marque)
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
export function productCard(p) {
  const hasPhoto = p.photo && fs.existsSync(path.join(root, 'assets/img/produits', p.photo));
  const photo = hasPhoto
    ? `<img src="assets/img/produits/${p.photo}" alt="${p.name}" loading="lazy" decoding="async">`
    : `<div class="product-ph" role="img" aria-label="Photo du produit à venir : ${p.name}">${markSvg({ className: 'product-ph-mark' })}</div>`;
  const price = p.price == null ? `<p class="product-price"><span class="tbd">Prix à confirmer</span></p>` : `<p class="product-price">${money(p.price)}</p>`;
  const sizes = p.sizes.length > 1
    ? `<fieldset class="sizes"><legend>Taille</legend>${p.sizes.map((z, i) => `<label><input type="radio" name="t-${p.id}" value="${z}"${i === 2 ? ' checked' : ''}><span>${z}</span></label>`).join('')}</fieldset>`
    : `<p class="fine" style="margin:0">Taille unique</p>`;
  const label = p.price == null ? 'Me prévenir de la sortie' : 'Commander';
  return `<article class="product" data-product="${p.id}">
  <div class="product-photo">${photo}</div>
  <div class="product-body">
    <h3>${p.name}</h3>
    ${p.provisoire ? `<p style="margin:0">${tbd('Fiche provisoire')}</p>` : ''}
    <p class="product-desc">${p.desc}</p>
    ${price}
    ${sizes}
    <a class="btn btn--primary" data-order="${p.id}" href="commande.html?produit=${p.id}">${label}</a>
  </div>
</article>`;
}
