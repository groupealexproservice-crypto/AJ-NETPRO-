# Benax Service — site web

Entretien commercial et résidentiel à Montréal. Même design que Caementum Performance (mur de pierres, noir et blanc, Cinzel et Inter), avec le logo Benax Service : l'immeuble et l'usine.

## Ajouter les photos réelles

Déposez vos photos dans `assets/img/photos/` **avec ces noms exacts**, puis relancez `node tools/build.mjs`. Tant qu'un fichier manque, le site affiche une dalle noire avec le logo à sa place.

| Fichier | Où il apparaît | Format conseillé |
|---|---|---|
| `hero-team.jpg` | Grande bannière sous l'accueil | Horizontal, 21:9 |
| `team-window.jpg` | À propos : technicien qui lave des vitres | Vertical, 4:5 |
| `team-floor.jpg` | À propos : technicien sur un plancher | Vertical, 4:5 |
| `team-1.jpg` | Galerie + page Services (commercial) : polissage de plancher | 4:3 ou 4:5 |
| `team-2.jpg` | Galerie : aire commune d'immeuble | 4:3 |
| `team-3.jpg` | Galerie + page Services (résidentiel) : vitres en hauteur | 4:3 ou 4:5 |
| `team-4.jpg` | Galerie : lavage mécanisé d'un hall | 4:3 |

Conseil : redimensionnez à 1600 px de large et exportez en JPG à moins de 300 Ko chacune, pour un site rapide. Vérifiez que chaque personne photographiée a donné son accord.

## Modifier le contenu

- `src/lib.mjs` : coordonnées, navigation, pied de page, logo, foire aux questions.
- `src/pages/*.mjs` : le texte de chaque page.
- `assets/css/styles.css` : le design.
- `assets/js/config.js` : courriel et envoi des formulaires.

```bash
node tools/build.mjs          # régénère les pages
node tools/render-images.mjs  # régénère l'image de partage et l'icône
python3 -m http.server 8766   # aperçu local
```

## À vérifier avant la mise en ligne

1. **Les engagements affichés** (« Satisfaction garantie », « Personnel vérifié », réponse en moins de 24 h, horaires 7 jours sur 7) viennent de l'ancien site AJ NETPRO : ne les gardez que s'ils sont vrais.
2. **Le nom légal.** Si Benax Service est un nom d'usage d'AJ NETPRO INC., il doit être déclaré au Registraire des entreprises du Québec. Complétez les `[crochets]` de la page Mentions légales.
3. **Les textes légaux** (confidentialité, mentions) sont des modèles : à faire valider par un juriste du Québec.
4. **Le domaine** `benaxservice.ca` n'est pas encore vérifié ni réservé.
5. **Formulaires** : prévus pour Netlify Forms. Ailleurs, indiquez l'adresse du service dans `formEndpoint` (`config.js`).
6. **Témoignages et avant/après** : volontairement absents. Ajoutez-les quand ils seront réels et que les clients auront donné leur accord.
