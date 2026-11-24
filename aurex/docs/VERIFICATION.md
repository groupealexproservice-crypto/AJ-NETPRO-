# Liste de vérification de la version finale

Cochez dans l'ordre. Les points 1 à 4 se font dans l'**aperçu figé** (lecture seule) ; les points 5 à 8 demandent le **site complet** (voir `README.md`, section Démarrage).

## Dans l'aperçu figé
1. **Accueil FR et EN** : titre « Construire. Transformer. Accélérer. » / « Build. Transform. Accelerate. », signature « Stratégie | Technologie | Intelligence artificielle | Performance | Croissance » (logo officiel), identité noir, argent et or.
2. **Navigation** : Accueil, À propos, Nos expertises, Nos solutions, Secteurs d'activité, Notre méthode, Réalisations, Perspectives et analyses, Contact ; « Planifier une consultation » toujours visible, y compris sur mobile.
3. **Contenu** : 8 expertises (enjeux, services, livrables, prochaine étape), 6 offres (objectif, périmètre, livrables, résultats, sur devis), 10 secteurs (problématiques et solutions possibles, jamais présentées comme des missions réalisées), méthode en 5 étapes.
4. **Aucun faux contenu** : ni client, ni témoignage, ni partenaire, ni chiffre. La page Réalisations l'explique.

## Sur le site complet
5. **Diagnostic** (`/fr/diagnostic`) : 3 étapes ; refus sans consentement ; la référence `AUR-AAAA-XXXXX` n'apparaît qu'après l'enregistrement ; la demande se retrouve dans `/admin` → Demandes.
6. **Consultation** (`/fr/consultation`) : présentée comme demande à confirmer ; solution, type d'accompagnement, date et plage horaire transmis à l'administration.
7. **Espace client** : avec `npm run db:seed:demo`, connexion en `alpha@demo.aurex.test` ; rien de l'organisation Bêta n'apparaît ; téléchargement d'un document.
8. **Sculpture 3D** (accueil) : elle pivote au glisser et reste immobile en mode mouvement réduit.

## À fournir ou à valider par AUREX avant la publication
- coordonnées publiques (courriel, téléphone, adresse) ;
- textes de consentement et politique de confidentialité (voir `docs/CONFORMITE.md`) ;
- responsable de la protection des renseignements personnels, durées de conservation ;
- fournisseur de courriel, CRM, calendrier, outil marketing (points de raccordement prêts, rien de branché) ;
- domaine, hébergement, HTTPS, sauvegardes.
