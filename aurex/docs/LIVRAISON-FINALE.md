# AUREX Solutions — livraison finale (version 3.0.0)

Date : 25 novembre 2026. Branche : `claude/benex-solutions-website-0y0gfy`, dossier `aurex/`.

## Ce que contient cette version
**Identité** : logo officiel, thème sombre « Nocturne » (noir profond, verre dépoli, filets dorés, grille discrète), sculpture 3D pyramidale avec orbite dorée, français par défaut et anglais via le sélecteur FR / EN, aucune page de choix de langue.

**Offre commerciale**
- Quatre forfaits mensuels : ESSENTIEL 100 $, CROISSANCE 300 $, DÉVELOPPEMENT 500 $, PARTENAIRE 1 500 $ (prix de départ, taxes en sus ; −5 % avec engagement de 12 mois).
- Site Web de base offert avec 12 mois (CROISSANCE et au-dessus), conditions et annulation écrites.
- Six packs intégrés ; services à l'unité (9) et services mensuels à la carte (7) avec prix de départ ; chaque installation affiche son suivi mensuel.
- Six domaines de services et trois façons de travailler (accueil et page Solutions).
- Aucun chiffre de travail interne (heures) n'est affiché au client.

**Outils** : diagnostic, simulateur de rentabilité, trois calculateurs, orientation en deux questions, conseiller IA (base de connaissances ; modèle réel avec `ANTHROPIC_API_KEY`), demande de soumission, consultation, infolettre, espace client sécurisé, administration (leads, clients, projets, contenus, crédibilité, campagnes, intégrations, tarifs en lecture seule).

**Automatisation et agents IA** : page détaillée (sept familles d'agents, méthode en 8 étapes, budgets 100 à 1 500 $, confidentialité, FAQ).

**Qualité** : 52 tests unitaires, 77 contrôles de parcours, audit d'accessibilité sans défaut, en-têtes de sécurité et CSP stricte, polices auto-hébergées, SEO serveur bilingue (balises, hreflang, JSON-LD, sitemap).

## Mesures finales
Voir `docs/PLAN-ET-TARIFS.md` (section 8) et `scripts/lighthouse.sh`. Accessibilité 100, SEO 100, performance ordinateur ≥ 95 ; **performance mobile limitée (≈ 60–70)** : pré-rendu serveur de la première vue non fait.

## Ce qui n'est PAS fait (et pourquoi)
| Élément | Raison |
|---|---|
| **Mise en ligne** (domaine, HTTPS, hébergement) | domaine et accord pour Hostinger non fournis |
| Test du conseiller IA avec un vrai modèle | clé `ANTHROPIC_API_KEY` à saisir par vous dans les variables d'environnement |
| Coordonnées publiques réelles (raison sociale, NEQ, courriel, téléphone, adresse) | à fournir ; variables `COMPANY_*` |
| Études de cas, témoignages, équipe, certifications | aucun contenu vérifié n'existe encore ; rien n'est inventé |
| Validation juridique (Loi 25, LCAP, clauses d'engagement et d'annulation, appels automatisés) | avis d'un juriste requis ; aucune conformité n'est affirmée |
| Pré-rendu serveur (performance mobile ≥ 90) | chantier structurel à décider |
| Courriel de confirmation, calendrier réel, CRM | points de raccordement prêts, fournisseurs à choisir |
| Recherche : 17 firmes sur 60, Europe non étudiée | voir `docs/ETUDE-DE-MARCHE.md` |

## Avant de publier (liste de contrôle)
1. Nom AUREX : marque, domaine, NEQ.
2. Valider la grille tarifaire, les portées et les statuts des services (disponible / en développement / ambition).
3. Mesurer les heures réelles sur les cinq premiers mandats ; ajuster les portées si la marge < 30 % (`docs/OFFRE-COMMERCIALE.md`, annexe interne).
4. Revérifier les prix des concurrents à la veille de la publication.
5. Faire valider les textes de consentement, la confidentialité et les clauses.
6. Renseigner `COMPANY_*`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `ANTHROPIC_API_KEY`, CRM et notifications dans l'hébergement.
7. Déployer, puis relancer `npm run e2e`, `npm run a11y`, `bash scripts/lighthouse.sh` sur le site en ligne.

## Documents
`README.md` (démarrage, architecture, sécurité) · `docs/OFFRE-COMMERCIALE.md` · `docs/OFFRE-AUTOMATISATION-IA.md` · `docs/ANALYSE-STRATEGIQUE.md` · `docs/ETUDE-DE-MARCHE.md` · `docs/PLAN-ET-TARIFS.md` · `docs/CONFORMITE.md` · `docs/VERIFICATION.md` · `docs/PROMPT-AMELIORATION.md` · `docs/RAPPORT-CONSEILLER-SANS-CLE.md`.

## Mise en ligne : état au 25 novembre 2026
- Le compte Hostinger connecté ne contient qu'un site : `benaxservices.ca` (autre entreprise). **Aucun domaine n'existe pour AUREX** ; rien n'a été déployé et le site existant n'a pas été touché.
- Pour publier le **site complet** (formulaires, soumissions, espace client, administration, conseiller IA), il faut : (1) un nom de domaine AUREX, (2) un hébergement Node.js avec base MySQL, (3) l'accord explicite de la direction, (4) les variables d'environnement (voir plus haut).
- L'aperçu figé n'enregistre rien : ses formulaires et ses liens vers le site complet affichent un message d'explication.
