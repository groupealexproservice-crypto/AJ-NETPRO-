# Brief pour une autre IA : site Caementum Performance

**Projet** : site statique en français (Québec) pour Caementum Performance : formations de course à pied (Piste, Route, Trail), abonnement « Groupes de course » à 19,98 $/mois avant taxes, boutique de vêtements, À propos, Contact.

**Commandes** : `node tools/build.mjs` génère les pages dans le dossier racine (HTML) à partir de `src/` ; aperçu local : `python3 -m http.server 8765`. Aucune dépendance npm.

**Où modifier** : textes et prix dans `src/lib.mjs` (SITE, PACKS, COMMUNAUTAIRE, PRODUCTS) ; pages dans `src/pages/*.mjs` ; style dans `assets/css/styles.css` ; comportements (panier, formulaires) dans `assets/js/main.js` ; liens de paiement et courriel dans `assets/js/config.js`. Ne pas éditer les `.html` générés à la main. Lire `README.md` pour les hypothèses et les points ouverts.

**Règles de la personne cliente**
- Aucune mention des Jeux olympiques ni de Rio (aucune participation).
- Demi-fond et fond seulement : aucun sprint. Piste : 800 m, 1 500 m, 3 000 m, 5 000 m, 10 000 m, 3 000 m steeple. Route : 10 km, semi-marathon, marathon. Trail : trail et ultra-trail.
- Une seule formation ouverte à tous les genres ; ne demander aucun genre dans les formulaires.
- Prix en dollars canadiens avant taxes (TPS 5 %, TVQ 9,975 %). Contenu provisoire clairement marqué « À compléter » ; ne rien inventer.
- Design : Manrope + Inter, sobre, professionnel, bleu #1652f0 réservé aux actions. Logo : un X formé de barres diagonales ; nom : Caementum Performance.

**À faire / ouvert** : jour, heure, lieu et niveau des groupes ; confirmer 19,98 $ ; liens Stripe ; vraies photos (les photos actuelles sont des photos Adobe Stock provisoires, IDs dans le README) ; domaine, courriel, réseaux sociaux ; pages légales à faire valider par un avocat du Québec ; vérification de la marque à l'OPIC.
