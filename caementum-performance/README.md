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

## Conflits dans les documents sources (à trancher)

Les documents du projet ne disent pas tous la même chose. Le site suit le **plan d'affaires avec logo** (le plus récent) ; chaque choix se change dans `src/lib.mjs`.

| Sujet | Plan d'affaires (utilisé) | Autre source |
|---|---|---|
| Prix 6 et 12 mois | Piste 810 $ / 1 440 $, Route 650 $ / 1 150 $, Trail 430 $ / 770 $ (−10 % et −20 %) | Spécifications techniques : 900 $ / 1 800 $, 720 $ / 1 440 $, 480 $ / 960 $ (aucun rabais). Présentation professionnelle : 6 mois = 2 mois de prix, 12 mois = 4 mois de prix. |
| Nom du fondateur | Alexandre **Ben Ammar** | Les présentations investisseurs écrivent Ben **Amor**. |
| « 100 % humain » | Retenu partout sur le site | Les présentations investisseurs parlent d'IA prédictive, de crypto-monnaie ($AXON) et d'un t-shirt capteur : **non repris**, car cela contredit l'offre de coaching humain. |
| Pack d'entrée | « Pack Communautaire » à 19,99 $ par mois | Une ancienne version le fixait à 29,89 $ ; une autre l'appelle « Squad ». |

## Ce qui est livré et ce qui reste à construire

Livré (phase 1) : présentation, programmes, tarifs, inscription, paiement par liens Stripe, prise de rendez-vous par lien Calendly, offre collective, page « Bientôt » avec liste d'attente.

Pas encore livré (phase 2 des spécifications) : espace client sécurisé, dépôt des plans par le coach, tableau de bord et statistiques du coach, communauté intégrée, factures automatiques, application mobile. Ils demandent un serveur et une base de données ; ce n'est pas faisable avec un site statique seul.

## Hypothèses prises (à confirmer)

- Prix repris du plan d’affaires : Piste 150 $, Route 120 $, Trail 80 $ pour 1 mois ; 6 mois : 810 / 650 / 430 $ ; 12 mois : 1 440 / 1 150 / 770 $ ; Communautaire 19,99 $ par mois.
- Options à la carte (49 $, 29 $, 39 $) présentées comme des achats ponctuels : confirmer si elles sont mensuelles.
- Les forfaits de 1, 6 et 12 mois sont des paiements uniques sans renouvellement (spécifications techniques) ; seul le pack Communautaire est récurrent.
- Visio d'évaluation « d'environ 20 à 30 minutes » (présentation professionnelle) et débriefing hebdomadaire (plan d'affaires) : à confirmer.
- Les noms AXON ne sont pas utilisés sur le site.

## Mise en ligne (Netlify)

Publier le dossier `caementum-performance/` tel quel (`netlify.toml` fournit les en-têtes de sécurité). Le dossier `src/` et `tools/` peuvent rester dans le dépôt, ils ne sont pas nécessaires au fonctionnement.

## Polices

Cinzel et Inter, sous licence SIL Open Font License, hébergées localement (aucun appel à Google).
