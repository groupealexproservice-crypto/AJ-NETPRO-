import { SITE } from '../lib.mjs';
const draft = `<p class="draft-note"><strong>Version de travail.</strong> Ce texte est un modèle à faire valider par un juriste du Québec avant la mise en ligne, et à compléter avec les informations de l’entreprise (entre crochets).</p>`;
const head = (t, d) => `<section class="page-head"><div class="wrap"><h1 class="h1">${t}</h1><p class="lead">${d}</p></div></section>`;
const wrap = (inner) => `<section class="slab" data-tone="chalk"><div class="wrap">${draft}<div class="prose">${inner}</div></div></section>`;

export const confidentialite = {
  file: 'confidentialite.html',
  title: 'Politique de confidentialité',
  description: 'Comment Benax Service recueille, utilise et protège vos renseignements personnels.',
  schema: [],
  body: head('Politique de confidentialité', 'Ce que nous recueillons, pourquoi, et comment vous gardez le contrôle.') + wrap(`
<h2>1. Responsable de la protection des renseignements personnels</h2>
<p>[Nom de la personne responsable], joignable à <a href="mailto:${SITE.email}">${SITE.email}</a>.</p>
<h2>2. Ce que nous recueillons</h2>
<ul><li>Coordonnées : nom, téléphone, courriel.</li><li>Informations utiles à votre soumission : type de service, description de vos besoins.</li></ul>
<h2>3. Pourquoi</h2>
<p>Pour répondre à votre demande, préparer votre soumission et assurer le suivi du service. Nous n’utilisons pas vos renseignements à d’autres fins sans votre accord.</p>
<h2>4. Ce que nous ne faisons pas</h2>
<p>Nous ne vendons pas vos renseignements. Ce site n’utilise pas de témoins de suivi publicitaire. [Si un outil de mesure d’audience est ajouté, le préciser ici et demander votre consentement au préalable.]</p>
<h2>5. Partage</h2>
<p>Vos renseignements peuvent être traités par des fournisseurs nécessaires au fonctionnement du site (hébergement, formulaires, courriel). [Liste des fournisseurs et lieux de traitement à compléter.]</p>
<h2>6. Conservation</h2>
<p>Nous conservons vos renseignements le temps nécessaire au service et aux obligations légales, puis nous les détruisons ou les anonymisons.</p>
<h2>7. Vos droits</h2>
<p>Vous pouvez demander l’accès à vos renseignements, leur correction ou leur suppression, et retirer votre consentement en tout temps en écrivant au responsable indiqué plus haut. Vous pouvez aussi déposer une plainte auprès de la Commission d’accès à l’information du Québec.</p>
<h2>8. Incident de confidentialité</h2>
<p>En cas d’incident présentant un risque sérieux de préjudice, nous aviserons les personnes concernées et la Commission d’accès à l’information, conformément à la loi.</p>`),
};
export const mentions = {
  file: 'mentions-legales.html',
  title: 'Mentions légales',
  description: 'Informations légales sur Benax Service.',
  schema: [],
  body: head('Mentions légales', 'Qui édite ce site et comment nous joindre.') + wrap(`
<h2>Éditeur</h2>
<p>[Nom légal de l’entreprise, par exemple AJ NETPRO INC.], exerçant sous le nom Benax Service.<br>[Adresse], Montréal (Québec), Canada.<br>[Numéro d’entreprise du Québec (NEQ).]<br>Téléphone : <a href="tel:${SITE.phoneHref}">${SITE.phone}</a><br>Courriel : <a href="mailto:${SITE.email}">${SITE.email}</a></p>
<h2>Hébergement</h2>
<p>[Nom et adresse de l’hébergeur.]</p>
<h2>Propriété intellectuelle</h2>
<p>Le nom Benax Service, le logo et les contenus de ce site sont protégés. Toute reproduction sans autorisation est interdite.</p>
<h2>Crédits</h2>
<p>Typographies : Cinzel et Inter, sous licence SIL Open Font License.</p>`),
};
export const notFound = {
  file: '404.html', title: 'Page introuvable', description: 'Cette page n’existe pas ou a été déplacée.', noindex: true, schema: [],
  body: `<section class="page-head"><div class="wrap"><h1 class="h1">Cette page est introuvable.</h1><p class="lead">Elle a peut-être été déplacée. Retournez à l’accueil ou demandez une soumission.</p><div class="actions"><a class="btn btn--light" href="index.html">Retour à l’accueil</a><a class="btn btn--ghost" href="soumission.html">Soumission gratuite</a></div></div></section>`,
};
