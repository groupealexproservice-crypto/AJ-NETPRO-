# Caementum Performance : site web

Site statique en français (Québec) pour vendre des **formations de course à pied** (piste, route, trail, communauté) et des **vêtements de la marque**. Aucun framework, aucun outil de suivi, chargement rapide.

## Pages

| Page | Rôle |
|---|---|
| `index.html` | Accueil : marque, mission, valeurs, accès aux formations et à la boutique |
| `formations.html` | Formations : contenu, public, durée, prix, achat |
| `boutique.html` | Vêtements : fiches produits, tailles, prix, ajout au panier |
| `panier.html` | Panier (conservé dans le navigateur) et envoi de la commande |
| `a-propos.html` | Origine du projet, palmarès, approche |
| `contact.html` | Formulaire et réseaux sociaux |
| `inscription.html`, `merci.html` | Parcours d'achat des formations et pages de remerciement |
| `conditions-de-vente`, `confidentialite`, `mentions-legales` | Pages légales (modèles) |

## Voir le site en local

```bash
cd caementum-performance
python3 -m http.server 8765   # puis ouvrir http://localhost:8765
```

## Compléter le contenu

Tout se modifie dans `src/lib.mjs`, puis `node tools/build.mjs` régénère les pages.

- **Ajouter ou modifier une formation** : entrée dans `PACKS` (nom, public, contenu, distances, prix 1 / 6 / 12 mois). Elle apparaît à la fois dans la section détaillée et dans les tarifs.
- **Ajouter un vêtement** : entrée dans `PRODUCTS` (nom, description, tailles, prix en dollars canadiens, nom de la photo). Déposer la photo dans `assets/img/produits/`. Tant que `price` vaut `null`, la fiche affiche « Prix à confirmer » et le bouton devient « Me prévenir de la sortie ».
- **Réseaux sociaux** : coller l'adresse de chaque compte dans `SITE.socials`.
- **Textes provisoires** : repérés par l'étiquette verte « Provisoire » ou « À compléter » sur le site.

## À configurer avant la mise en ligne (`assets/js/config.js`)

1. **Paiement** : un lien de paiement Stripe par formation et par durée (`checkout`). Sans lien, la demande est envoyée à Alexandre. Les commandes de vêtements arrivent par formulaire (le panier envoie la liste des articles) ; un vrai paiement en ligne pour la boutique reste à brancher une fois les produits et les prix définis.
2. **Domaine et courriel** : remplacer `caementumperformance.com` dans `src/lib.mjs` et `config.js` (le domaine n'est pas encore vérifié ni réservé).
3. **Formulaires** : prévus pour Netlify Forms. Ailleurs, indiquer l'adresse du service dans `formEndpoint`.
4. **Photo d'Alexandre** : remplacer le bloc `figure.portrait` de la page À propos. N'utilisez pas les images des anciens documents (banques d'images).
5. **Textes légaux** : compléter les `[crochets]` et faire valider par un juriste du Québec.
6. **Taxes** : prix avant taxes (TPS 5 %, TVQ 9,975 %). Inscription aux fichiers de la TPS et de la TVQ obligatoire au-delà de 30 000 $ de revenus taxables sur quatre trimestres.
7. **Marque** : faire vérifier « Caementum » à l'OPIC avant d'investir dans la publicité.

## Photos

Les photos sont dans `assets/img/photos/` : `hero.jpg` (bannière d'accueil, affichée en noir et blanc) et `fondateur.jpg` (recadrage serré, section du fondateur et page À propos). Pour les remplacer, déposer une nouvelle photo sous le même nom puis `node tools/build.mjs`. Format conseillé : JPG, 1600 px de large, moins de 300 Ko.

**Droits d'auteur :** confirmer que vous détenez les droits de la photo utilisée. Une autre photo fournie porte le filigrane « © Manu Chapelle / Photoathle.fr » : elle n'est pas utilisée, car elle appartient à ce photographe (licence nécessaire, et le filigrane ne doit pas être retiré).

## Identité visuelle

D'après le logo fourni et les captures de référence : un X fait de bandes diagonales, noir et blanc, bleu électrique `#1652f0` en accent, lignes diagonales bleues, photos en noir et blanc, bordure inclinée, frise d'étapes. Titres en Barlow Condensed, nom de marque en Archivo italique gras, texte en Inter (licence SIL Open Font License, hébergées localement). Le logo de l'image portait le nom **PACENAX** : seul le symbole a été repris, avec le nom Caementum Performance.

## Points à confirmer

- Palmarès affiché d'après votre dictée : Jeux olympiques de Rio (participation), championnats du monde (finaliste, deux participations), cinq fois champion de France, vingt fois champion de Tunisie, champion de la Méditerranée, finaliste aux championnats d'Afrique. Les anciens documents disaient 22 titres nationaux : le site suit votre dictée.
- Prix des formations : plan d'affaires avec rabais (810 / 650 / 430 $ pour 6 mois, 1 440 / 1 150 / 770 $ pour 12 mois). Les spécifications techniques indiquaient 900 / 720 / 480 $ et 1 800 / 1 440 / 960 $ (sans rabais).
- Forfaits de 1, 6 et 12 mois : paiements uniques ; pack Communautaire (19,99 $) : abonnement mensuel.
- Les éléments d'IA, de crypto et de t-shirt capteur des présentations investisseurs ne sont **pas** repris : ils contredisent l'offre de coaching 100 % humain.

## Pas encore livré

Espace client, dépôt des plans par le coach, tableau de bord, factures automatiques, application mobile : cela demande un serveur et une base de données.

## Mise en ligne (Netlify)

Publier le dossier `caementum-performance/` tel quel (`netlify.toml` fournit les en-têtes de sécurité).
