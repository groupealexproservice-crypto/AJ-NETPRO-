import { SITE } from '../lib.mjs';

const draft = `<p class="draft-note"><strong>Version de travail.</strong> Ce texte est un modèle à faire valider par un juriste du Québec avant la mise en ligne, et à compléter avec les informations de l’entreprise (entre crochets).</p>`;
const head = (t, d) => `<section class="page-head"><div class="wrap"><h1 class="h1">${t}</h1><p class="lead">${d}</p></div></section>`;
const wrap = (inner) => `<section class="slab" data-tone="chalk"><div class="wrap">${draft}<div class="prose">${inner}</div></div></section>`;

export const cgv = {
  file: 'conditions-de-vente.html',
  title: 'Conditions de vente',
  description: 'Conditions de vente des services de coaching de course à pied de Caementum Performance.',
  schema: [],
  body: head('Conditions de vente', 'Les règles qui encadrent votre abonnement, en langage clair.') + wrap(`
<h2>1. Qui vend ?</h2>
<p>Les services sont offerts par [nom légal du prestataire], [travailleur autonome ou société], exerçant sous le nom Caementum Performance, à Montréal (Québec). Contact : <a href="mailto:${SITE.email}">${SITE.email}</a>.</p>
<h2>2. Les services</h2>
<p>Caementum Performance offre du coaching de course à pied à distance : plans d’entraînement personnalisés, diagnostic vidéo, débriefings hebdomadaires et ajustements, selon le programme choisi (Piste, Route, Trail ou Communautaire) décrit sur le site.</p>
<h2>2.1 Vêtements</h2>
<p>La boutique propose des vêtements de la marque. [Produits, délais de livraison, frais d’expédition, politique d’échange et de retour à définir à l’ouverture de la boutique, en conformité avec la Loi sur la protection du consommateur.]</p>
<h2>3. Prix et taxes</h2>
<p>Les prix sont affichés en dollars canadiens, avant taxes. La TPS et la TVQ s’ajoutent au paiement lorsqu’elles s’appliquent. [Numéros de TPS et de TVQ à indiquer.]</p>
<h2>4. Paiement</h2>
<p>Le paiement est effectué en ligne par l’entremise d’un fournisseur de paiement sécurisé. Nous ne conservons pas vos données de carte. Les forfaits de 1, 6 et 12 mois sont payables en un paiement unique, sans renouvellement automatique. Le pack Communautaire est un abonnement mensuel récurrent.</p>
<h2>5. Durée, renouvellement et résiliation</h2>
<ul>
<li>Le pack Communautaire peut être arrêté en tout temps en nous écrivant, avec effet à la prochaine échéance.</li>
<li>Les forfaits de 1, 6 et 12 mois sont conclus pour la durée choisie. [Conditions de remboursement ou de résiliation anticipée à préciser, en conformité avec la Loi sur la protection du consommateur.]</li>
<li>Vos droits prévus par la Loi sur la protection du consommateur du Québec ne sont pas limités par ces conditions.</li>
</ul>
<h2>6. Santé et responsabilité</h2>
<p>La course à pied comporte des risques. Vous déclarez être apte à pratiquer une activité physique et vous engagez à signaler toute blessure ou limite de santé. Nous vous recommandons de consulter un professionnel de la santé avant de commencer. Les plans sont des recommandations d’entraînement et ne remplacent pas un avis médical.</p>
<h2>7. Résultats</h2>
<p>Les résultats dépendent de nombreux facteurs, dont votre assiduité. Nous ne garantissons aucun chrono ni aucune performance.</p>
<h2>8. Propriété intellectuelle</h2>
<p>Les plans, contenus et marques de Caementum Performance sont destinés à votre usage personnel. Ils ne peuvent pas être revendus ni partagés publiquement.</p>
<h2>9. Langue et droit applicable</h2>
<p>Ces conditions sont rédigées en français. Elles sont régies par les lois du Québec et du Canada.</p>
<h2>10. Questions</h2>
<p>Écrivez-nous à <a href="mailto:${SITE.email}">${SITE.email}</a>.</p>`),
};

export const confidentialite = {
  file: 'confidentialite.html',
  title: 'Politique de confidentialité',
  description: 'Comment Caementum Performance recueille, utilise et protège vos renseignements personnels.',
  schema: [],
  body: head('Politique de confidentialité', 'Ce que nous recueillons, pourquoi, et comment vous gardez le contrôle.') + wrap(`
<h2>1. Responsable de la protection des renseignements personnels</h2>
<p>[Nom de la personne responsable], joignable à <a href="mailto:${SITE.email}">${SITE.email}</a>.</p>
<h2>2. Ce que nous recueillons</h2>
<ul>
<li>Coordonnées : nom, courriel, téléphone (facultatif).</li>
<li>Informations utiles au coaching : niveau, objectif, course visée, blessures ou limites que vous choisissez de nous communiquer.</li>
<li>Genre et pronoms, uniquement si vous choisissez de les indiquer (facultatif). Ils servent à bien vous nommer et à choisir le bon programme avec vous.</li>
<li>Informations de paiement : traitées directement par notre fournisseur de paiement. Nous ne conservons pas votre numéro de carte.</li>
</ul>
<h2>3. Pourquoi</h2>
<p>Pour répondre à vos demandes, préparer votre diagnostic, concevoir et ajuster votre plan, facturer et vous communiquer l’information liée à votre abonnement. Nous n’utilisons pas vos renseignements de santé à d’autres fins.</p>
<h2>4. Ce que nous ne faisons pas</h2>
<p>Nous ne vendons pas vos renseignements. Ce site n’utilise pas de témoins de suivi publicitaire. [Si un outil de mesure d’audience est ajouté, le préciser ici et demander votre consentement au préalable.]</p>
<h2>5. Partage</h2>
<p>Vos renseignements peuvent être traités par des fournisseurs de service nécessaires au fonctionnement du site et de l’abonnement (hébergement, formulaires, paiement, courriel). [Liste des fournisseurs et lieux de traitement à compléter.]</p>
<h2>6. Conservation</h2>
<p>Nous conservons vos renseignements le temps nécessaire à votre accompagnement et aux obligations légales, puis nous les détruisons ou les anonymisons.</p>
<h2>7. Vos droits</h2>
<p>Vous pouvez demander l’accès à vos renseignements, leur correction ou leur suppression, et retirer votre consentement en tout temps en écrivant au responsable indiqué plus haut. Vous pouvez aussi déposer une plainte auprès de la Commission d’accès à l’information du Québec.</p>
<h2>8. Incident de confidentialité</h2>
<p>En cas d’incident présentant un risque sérieux de préjudice, nous aviserons les personnes concernées et la Commission d’accès à l’information, conformément à la loi.</p>`),
};

export const mentions = {
  file: 'mentions-legales.html',
  title: 'Mentions légales',
  description: 'Informations légales sur Caementum Performance.',
  schema: [],
  body: head('Mentions légales', 'Qui édite ce site et comment nous joindre.') + wrap(`
<h2>Éditeur</h2>
<p>[Nom légal], exerçant sous le nom Caementum Performance.<br>[Adresse], Montréal (Québec), Canada.<br>[Numéro d’entreprise du Québec (NEQ), si applicable.]<br>Courriel : <a href="mailto:${SITE.email}">${SITE.email}</a></p>
<h2>Hébergement</h2>
<p>[Nom et adresse de l’hébergeur.]</p>
<h2>Propriété intellectuelle</h2>
<p>Le nom Caementum Performance, le logo et les contenus de ce site sont protégés. Toute reproduction sans autorisation est interdite.</p>
<h2>Crédits</h2>
<p>Typographies : Archivo et Inter, sous licence SIL Open Font License.</p>`),
};

export const notFound = {
  file: '404.html',
  title: 'Page introuvable',
  description: 'Cette page n’existe pas ou a été déplacée.',
  noindex: true,
  schema: [],
  body: `<section class="page-head"><div class="wrap"><h1 class="h1">Cette page est introuvable.</h1><p class="lead">Elle a peut-être été déplacée. Retournez à l’accueil ou consultez les programmes.</p><div class="actions"><a class="btn btn--light" href="index.html">Retour à l’accueil</a><a class="btn btn--ghost" href="formations.html">Voir les formations</a></div></div></section>`,
};
