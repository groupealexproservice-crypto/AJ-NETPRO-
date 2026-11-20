# Caementum Performance — site web

Site statique en français (Québec) pour vendre les programmes de coaching de course à pied : piste, route, trail et Squad. Aucun framework, aucun outil de suivi, chargement rapide.

## Voir le site en local

```bash
cd caementum-performance
python3 -m http.server 8765
# puis ouvrir http://localhost:8765
```

## Modifier le contenu

Les pages sont générées à partir de `src/` :

- `src/lib.mjs` : **prix**, programmes, options à la carte, gabarit commun (en-tête, pied de page).
- `src/pages/*.mjs` : le texte de chaque page.
- `assets/css/styles.css` : tout le design.
- `assets/js/config.js` : liens de paiement, réservation d’appel, courriel.

Après toute modification de `src/` :

```bash
node tools/build.mjs          # régénère les pages HTML
node tools/render-images.mjs  # (optionnel) régénère l’image de partage et l’icône
```

## À compléter avant la mise en ligne

1. **Domaine et courriel** : remplacer `caementumperformance.com` dans `src/lib.mjs` (`SITE.url`, `SITE.email`) et `assets/js/config.js`, puis relancer le build. *Le domaine n’est pas encore vérifié ni réservé.*
2. **Paiement Stripe** : créer un lien de paiement (Payment Link) par programme et par durée, puis les coller dans `assets/js/config.js` (`checkout`). Sans lien, l’inscription est envoyée à Alexandre qui confirme le paiement manuellement.
3. **Appel et diagnostic** : coller le lien Calendly (ou autre) dans `bookingUrl` de `config.js`.
4. **Formulaires** : le site est prévu pour Netlify Forms (aucun code serveur). Sur un autre hébergeur, indiquer l’adresse du service dans `formEndpoint`.
5. **Photo d’Alexandre** : remplacer les blocs `figure.portrait` (accueil et page Le coach) par une vraie photo. Ne pas utiliser les images des anciens documents : elles viennent de banques d’images.
6. **Textes juridiques** : `conditions-de-vente.html`, `confidentialite.html` et `mentions-legales.html` sont des modèles. Compléter les `[crochets]` et les **faire valider par un juriste du Québec** (Loi sur la protection du consommateur, Loi 25).
7. **Taxes** : les prix sont affichés avant taxes (TPS 5 %, TVQ 9,975 %). Un travailleur autonome doit s’inscrire aux fichiers de la TPS et de la TVQ lorsque ses revenus taxables dépassent 30 000 $ sur quatre trimestres consécutifs.
8. **Marque** : faire vérifier « Caementum » à l’OPIC (voir la voisine CIMENTUM) avant d’investir dans la publicité.

## Hypothèses prises (à confirmer)

- Prix repris du plan d’affaires : Piste 150 $, Route 120 $, Trail 80 $ par mois ; 6 mois : 810 / 650 / 430 $ ; 12 mois : 1 440 / 1 150 / 770 $ ; Squad 19,99 $ par mois.
- Options à la carte (49 $, 29 $, 39 $) présentées comme des achats ponctuels : confirmer si elles sont mensuelles.
- Abonnement mensuel présenté « sans engagement ».
- Les noms AXON ne sont pas utilisés sur le site.

## Mise en ligne (Netlify)

Publier le dossier `caementum-performance/` tel quel (`netlify.toml` fournit les en-têtes de sécurité). Le dossier `src/` et `tools/` peuvent rester dans le dépôt, ils ne sont pas nécessaires au fonctionnement.

## Polices

Cinzel et Inter, sous licence SIL Open Font License, hébergées localement (aucun appel à Google).
