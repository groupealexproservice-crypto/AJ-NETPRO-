# Prompt d'amélioration — AUREX Solutions

Copiez le bloc ci-dessous tel quel dans une nouvelle session.

```
MISSION — AMÉLIORATION ET MISE EN PRODUCTION DU SITE AUREX SOLUTIONS

Contexte
Le site AUREX Solutions (cabinet multidisciplinaire de Montréal : stratégie, marketing, IA, automatisation, opérations, supply chain, croissance) existe déjà dans le dépôt, dossier aurex/ (React 19, Vite, Hono, tRPC, Drizzle/MySQL). Il contient : accueil direct en français (anglais via le sélecteur FR/EN), 10 expertises, 13 secteurs, 9 départements, 7 solutions d'affaires, tarifs, simulateur, 3 calculateurs, pages Automatisation et Innovations, conseiller IA, diagnostic, soumission, consultation, espace client, administration, SEO serveur, tests (npm test, npm run e2e, npm run a11y). Lis d'abord aurex/README.md, aurex/docs/ETUDE-DE-MARCHE.md et aurex/docs/PLAN-ET-TARIFS.md. Préserve tout ce qui fonctionne.

Règles non négociables
- N'invente aucun client, témoignage, partenaire, certification, prix, résultat chiffré, équipe ou présence internationale. Une simulation reste une simulation.
- Les prix ne sont publiés qu'après validation de la direction (administration > Tarifs).
- N'affirme aucune conformité complète à la Loi 25, à la LCAP ou à la loi 96 : documente ce qui reste à valider par un juriste.
- Tout texte français est en français canadien ; tout texte anglais est en anglais canadien.
- Teste chaque changement ; dis clairement ce qui a échoué ou n'a pas pu être vérifié.

Phase 1 — Mesurer (avant de modifier)
1. Mesure avec Lighthouse (mobile et ordinateur) l'accueil, une page d'expertise, Tarifs, Calculateurs : LCP, INP, CLS, poids transféré. Cibles : performance ≥ 90, accessibilité 100, bonnes pratiques ≥ 95, SEO 100.
2. Audit manuel d'accessibilité WCAG 2.2 AA : clavier seul, lecteur d'écran (NVDA ou VoiceOver), zoom 200 %, mouvement réduit, contrastes de l'or sur fond clair.
3. Vérifie le rendu sur 3 largeurs (390, 768, 1440 px) pour chaque page publique et liste les défauts visuels (alignements, textes coupés, chevauchements).

Phase 2 — Performance
- Réduire le JavaScript initial (actuellement ≈ 794 Ko, ≈ 227 Ko gzip) : découper par route, différer les composants non essentiels (assistant, champ neuronal), vérifier le poids des dépendances.
- Optimiser les images : images de partage (≈ 620 Ko), photo d'architecture (≈ 460 Ko), modèle 3D (≈ 460 Ko) ; formats modernes, tailles responsives, chargement différé, précharger uniquement le nécessaire.
- Le visualiseur 3D (≈ 1 Mo) ne doit jamais bloquer le chargement initial.

Phase 3 — Direction artistique
- La sculpture 3D actuelle est un graphique à barres recoloré ; elle ne reflète pas la pyramide du logo. Concevoir une sculpture pyramidale (structure, élévation, vision), sobre, noir/graphite/or, avec affiche statique et mode mouvement réduit.
- Remplacer la photo d'architecture générique par des visuels authentiques et libres de droits ou fournis par l'entreprise (Montréal, travail d'équipe, tableaux de bord), avec textes alternatifs.
- Corriger l'alignement du bloc d'introduction du héros (retrait irrégulier par rapport au titre sur ordinateur) et vérifier la cohérence des espacements sur toutes les pages.
- Rester sobre : aucun effet décoratif sans fonction.

Phase 4 — Contenu et crédibilité
- Faire relire par un humain tous les textes FR et EN ; supprimer les formules génériques, varier les pages d'expertise et de secteur (elles se ressemblent trop), ajouter des exemples chiffrés sous forme de simulations clairement étiquetées.
- Passer de 3 à au moins 20 ressources utiles (guides Loi 25 et LCAP, coûts d'un site au Québec, IA pour PME, indicateurs, logistique), chacune avec sources et date de mise à jour.
- Préparer les gabarits pour : page Équipe (vide tant que rien n'est fourni), études de cas (avec autorisation écrite du client), témoignages vérifiables, certifications réelles. Ne rien publier d'inventé.

Phase 5 — Conversion
- Auditer chaque parcours (accueil → diagnostic, tarifs → soumission, calculateurs → consultation) : chaque clic perdu, chaque champ inutile, chaque message d'erreur.
- Ajouter un aimant à prospects réel (guide PDF téléchargeable contre courriel, avec consentement exprès et désabonnement).
- Brancher la réservation de consultation à un vrai calendrier (variable d'environnement existante) et prévoir l'envoi de courriels de confirmation et de relance (fournisseur à choisir avec la direction).
- Une fois les tarifs validés, les publier via l'administration et vérifier l'affichage sur les pages Tarifs et expertises.
- Vérifier que l'analytique sans témoin couvre l'entonnoir complet et construire un tableau de bord lisible dans l'administration.

Phase 6 — Intelligence artificielle
- Tester le conseiller IA avec une vraie clé ANTHROPIC_API_KEY : jeu de 50 questions (services, prix, conformité, hors sujet, tentatives de contournement), mesurer exactitude, refus appropriés, absence de promesses de résultats, respect de la vie privée (aucun renseignement personnel envoyé).
- Journaliser (sans données personnelles) les questions sans réponse pour enrichir la base de connaissances.

Phase 7 — Technique et exploitation
- Mettre en place l'intégration continue (tests, lint, build, a11y) et la surveillance des erreurs.
- Procédure de sauvegarde et de restauration de la base ; durcissement (en-têtes, limites de débit, mots de passe, rotation des secrets) ; revue de sécurité des routes d'administration et du portail client.
- Déploiement : domaine, HTTPS, variables d'environnement (COMPANY_*, ADMIN_*, SMTP/CRM), première création d'administrateur. Ne déploie rien sans l'accord explicite de la direction.

Phase 8 — Recherche à compléter
- Étendre le benchmark de 17 à 60 firmes (marché local, Canada, États-Unis, Europe), en ne citant que ce qui est lu sur leurs sites, avec date de consultation.
- Relever les prix réels : soumissions demandées à quelques agences, tarifs publics, ou entrevues avec 10 PME montréalaises ; réviser la grille de docs/PLAN-ET-TARIFS.md avec ces données.
- Recherche de mots-clés (volumes, intentions) pour hiérarchiser les pages et les ressources.

Livrables
1. Rapport de mesures avant/après (Lighthouse, accessibilité, captures).
2. Code modifié, testé, commité sur la branche de développement ; npm test, npm run e2e et npm run a11y doivent passer.
3. docs/ mis à jour : modifications, décisions, limites, éléments à valider.
4. Liste ordonnée de ce que seule la direction peut fournir ou valider.

Critères de réussite
Performance ≥ 90 mobile, accessibilité 100, aucun contenu inventé, aucun test en échec, chaque limite documentée.
```
