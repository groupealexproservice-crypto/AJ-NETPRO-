# Catalogue, grille tarifaire, plan de développement — AUREX Solutions

> **Document pour la direction. Aucun prix de ce document n’est publié sur le site.** Les tarifs ne s’affichent qu’après validation et saisie dans l’administration (onglet *Tarifs*). Le site affiche « Tarif sur devis » tant que rien n’est publié.

Date : 24 novembre 2026. Données de marché : voir `docs/ETUDE-DE-MARCHE.md` (section 2, avec réserves sur la fiabilité).

---

## 1. Catalogue des services : décisions d’intégration

Pertinence = demande + capacité de livrer + risque. **Statut** : disponible (à offrir au lancement), en développement (à bâtir ou piloter), ambition (direction seulement). Ces statuts sont affichés sur les pages *Automatisation* et *Innovations* et **doivent être confirmés par la direction avant publication**.

| Département | Services retenus | Statut proposé | Remarque |
|---|---|---|---|
| Strategy | Conseil, analyse d’affaires, plans d’affaires, faisabilité, études de marché, intelligence économique, analyse concurrentielle, modèles économiques, expansion, rentabilité | Disponible | Offre d’entrée : diagnostic |
| Marketing | Stratégie, marketing relationnel, réseaux sociaux, contenu, marque, courriel, génération de prospects, fidélisation, SEO/AEO | Disponible | AEO = nouveauté différenciante |
| Media & Advertising | Google, Meta, LinkedIn, Microsoft Ads, remarketing, achat média, optimisation de conversion, analyse du rendement | Disponible | Revenu récurrent |
| Digital | Sites institutionnels, e-commerce, applications web/mobiles, CRM, SaaS, maintenance, hébergement | Disponible (sites, CRM) / en développement (applications, SaaS) | Les applications sur mesure exigent une équipe de développement confirmée |
| Intelligence | IA générative, agents, assistants, analyse prédictive, IA ventes/marketing/opérations/logistique, formation | Disponible (formation, assistants, gouvernance) / en développement (prédictif) | Supervision humaine systématique |
| Automation | Voir catalogue à 12 familles (page *Automatisation*) | 6 disponibles, 5 en développement, 1 ambition (multiagents) | Statut par ligne dans `src/data/innovations.ts` |
| Operations | Audit, organisation, processus, productivité, standardisation, coûts, gestion de projet, changement, amélioration continue, tableaux de bord | Disponible | — |
| Supply Chain | Logistique, stocks, entrepôts, approvisionnements, fournisseurs, flux, prévision, traçabilité, pertes | En développement | Expertise à confirmer avant d’annoncer des mandats |
| Growth | Lancement d’entreprise, prospection B2B, offres, acquisition, nouveaux marchés, expansion, PME | Disponible | — |

**Services oubliés ajoutés au catalogue** (voir *Innovations*) : visibilité dans les moteurs de réponse IA ; projet pilote IA en 100 jours ; cadre de gouvernance de l’IA ; tableau de bord de pilotage ; veille concurrentielle assistée ; direction marketing ou opérations à temps partiel ; prévisions de ventes et de demande ; plateforme d’outils pour PME.

**Retiré / non retenu** : aucune prestation de la liste n’est exclue ; mais les services en « ambition » ne doivent pas être vendus.

## 2. Solutions d’affaires intégrées (sept)

Détail (client idéal, inclusions, indicateurs, tarification) : page *Solutions*, section « Solutions d’affaires intégrées » (`src/data/innovations.ts`). Tarification : **sur devis**, par assemblage des lignes de la grille ci-dessous.

| Solution | Combinaison type | Modalité |
|---|---|---|
| Business Launch | Diagnostic + plan d’affaires + identité + site vitrine + plan de lancement | Forfait |
| Business Growth | Marketing + gestion publicitaire + prospection encadrée + fidélisation | Abonnement mensuel |
| Digital Transformation | Audit des outils + plateformes + CRM + formation | Projet puis maintenance |
| AI & Automation | Cartographie + automatisations + agents supervisés + gouvernance | Installation + abonnement |
| Operational Excellence | Audit + processus + tableaux de bord + changement | Projet |
| Supply Chain Performance | Diagnostic des flux + prévision + fournisseurs | Projet (en développement) |
| Enterprise Transformation | Diagnostic global + pilotage de plusieurs chantiers + gouvernance | Mandat sur mesure |

## 3. Grille tarifaire recommandée (CAD, hors taxes) — à valider

Repères de marché (section 2 de l’étude) : agence 90–250 $/h ; retainers marketing 1 500–5 000 $/mois ; gestion publicitaire 15–20 % du budget avec minimum 750–1 500 $ ; sites 2 000–25 000 $ ; automatisation IA 1 500–5 000 $ à l’installation, 500–1 500 $/mois d’abonnement (petite entreprise). Objectif : **sous la moyenne des agences établies pour le niveau accessible, au marché pour le niveau professionnel, à l’échelon haut pour le premium** sans dévaloriser l’expertise.

| Prestation | Accessible | Professionnel | Premium | Type |
|---|---|---|---|---|
| Honoraires horaires de référence | 95 $/h | 140 $/h | 195 $/h | Heure |
| Diagnostic stratégique | 1 500 $ | 2 500 $ | 4 500 $ | Forfait |
| Plan d’affaires / étude de faisabilité | 2 500 $ | 5 000 $ | 9 000 $ | Forfait |
| Étude de marché et veille (initiale) | 2 000 $ | 4 500 $ | 8 500 $ | Forfait |
| Marketing stratégique et contenu | 1 200 $/mois | 2 500 $/mois | 4 500 $/mois | Abonnement (publicité en sus) |
| Gestion publicitaire | 12 % du budget, min. 750 $ | 15 %, min. 1 000 $ | 18 %, min. 1 800 $ (avec optimisation de conversion) | Abonnement |
| Site vitrine | 3 000 $ | 6 500 $ | 12 000 $ | Forfait |
| Site corporatif bilingue | 8 000 $ | 14 000 $ | 25 000 $ | Forfait |
| Boutique en ligne | 6 000 $ | 12 000 $ | 25 000 $ | Forfait |
| Maintenance et hébergement | 90 $/mois | 190 $/mois | 390 $/mois | Abonnement |
| Automatisation (installation) | 1 500 $ | 4 000 $ | 9 000 $ | Forfait |
| Automatisation (suivi) | 400 $/mois | 1 000 $/mois | 2 500 $/mois | Abonnement |
| Agent IA personnalisé (installation) | 3 000 $ | 7 500 $ | 18 000 $ | Forfait + API au coût |
| Agent IA (suivi) | 600 $/mois | 1 500 $/mois | 3 500 $/mois | Abonnement |
| Formation à l’IA (demi-journée, groupe) | 900 $ | 1 800 $ | 3 500 $ | Atelier |
| Audit opérationnel | 2 500 $ | 5 500 $ | 12 000 $ | Forfait |
| Diagnostic supply chain | 3 000 $ | 6 000 $ | 12 000 $ | Forfait (en développement) |
| Prospection B2B encadrée | 1 500 $/mois | 3 000 $/mois | 5 500 $/mois | Abonnement |
| SEO / AEO | 900 $/mois | 1 600 $/mois | 3 200 $/mois | Abonnement |

**Frais séparés** : licences et API facturés au coût réel ; frais de média publicitaire payés directement par le client ; prestations de maintenance après la première année.

## 4. Coûts, marges et seuil de rentabilité (hypothèses à remplacer)

**Hypothèses** (non vérifiées — à remplacer par vos coûts réels) : coût interne complet **55 $/h** (salaire, charges, outils et frais généraux) ; frais fixes mensuels de l’entreprise **4 000 $** (hors rémunération des fondateurs). Les heures ci-dessous sont des **estimations de travail** : si les heures réelles dépassent ces valeurs, la marge baisse.

| Prestation (niveau professionnel) | Prix | Heures estimées | Coût (55 $/h) | Marge brute |
|---|---|---|---|---|
| Diagnostic stratégique | 2 500 $ | 25 | 1 375 $ | 45 % |
| Plan d’affaires | 5 000 $ | 50 | 2 750 $ | 45 % |
| Étude de marché | 4 500 $ | 45 | 2 475 $ | 45 % |
| Site corporatif bilingue | 14 000 $ | 140 | 7 700 $ | 45 % |
| Gestion publicitaire (mois) | 1 000 $ | 10 | 550 $ | 45 % |
| Automatisation (installation) | 4 000 $ | 40 | 2 200 $ | 45 % |
| Automatisation (suivi, mois) | 1 000 $ | 10 | 550 $ | 45 % |
| Agent IA (installation) | 7 500 $ | 75 | 4 125 $ | 45 % |
| Audit opérationnel | 5 500 $ | 55 | 3 025 $ | 45 % |
| Formation IA (atelier) | 1 800 $ | 16 | 880 $ | 51 % |

La grille vise une **marge brute d’environ 45 %**. **Seuil de rentabilité** = frais fixes ÷ marge brute = 4 000 $ ÷ 0,45 ≈ **8 900 $ de revenus par mois**. Exemple : 6 abonnements de 1 000 $ (≈ 6 000 $/mois, marge ≈ 2 700 $) + 1 projet de 4 000 $ par mois couvrent les frais fixes. Avec 12 000 $ de frais fixes, le seuil monte à ≈ 26 700 $/mois.

**Revenus récurrents possibles** : gestion publicitaire, marketing, SEO/AEO, suivi d’automatisation et d’agents, maintenance, prospection, veille, direction à temps partiel.

## 5. Démonstration de ce que rapportent les services

Les trois calculateurs du site (`/fr/calculateurs`) appliquent les formules ci-dessous. Les exemples utilisent leurs **valeurs de départ, illustratives**, et distinguent revenus, économies, coûts et investissement. **Aucun n’est un résultat réel ou garanti.**

| Exemple | Hypothèses | Calcul | Résultat estimé |
|---|---|---|---|
| Publicité | 3 000 $ de budget, 2,50 $/clic, 4 % de conversion, panier 180 $, marge 45 %, frais 15 % | 1 200 clics → 48 commandes → **revenus 8 640 $** ; marge brute 3 888 $ ; **coûts** 3 000 $ + 450 $ | Profit net ≈ **438 $/mois** ; ROAS 2,88 ; seuil d’équilibre 2,56 |
| Automatisation | 3 personnes × 6 h/semaine, 38 $/h, 50 % automatisable, outils 150 $/mois, installation 4 000 $ | 78 h/mois → **39 h libérées**, valeur 1 482 $ | Net 1 332 $/mois ; récupération ≈ **3 mois** ; gain net sur 12 mois ≈ 11 984 $ (**économie de capacité** : devient réelle si le temps est réaffecté) |
| Économies opérationnelles | 400 unités/mois à 22 $, −15 %, erreurs 6 % à 85 $ (−40 %), investissement 6 000 $ | Processus **1 320 $** + erreurs évitées **816 $** | **2 136 $/mois** ; récupération ≈ 2,8 mois ; gain net 12 mois ≈ 19 632 $ |

Fiches par service : chaque page d’expertise du site (10) présente déjà le problème, la solution, la méthode, les livrables, les bénéfices potentiels et les indicateurs ; les délais et prix se précisent après diagnostic. Les données économiques chiffrées par service (économies et revenus) doivent venir de **vos propres cas** une fois les premiers mandats livrés.

## 6. Plan de développement

**30 jours — fondations**
- Valider la grille (section 3), les statuts (section 1) et le nom AUREX (marque, domaine, NEQ).
- Renseigner les coordonnées réelles, nommer le responsable de la protection des renseignements personnels, faire valider les textes de consentement et la politique de confidentialité par un juriste.
- Déployer le site (domaine, HTTPS, base de données, sauvegardes), créer l’administrateur, publier les tarifs validés, brancher le webhook CRM et les notifications.
- *Ressources* : direction, juriste (quelques heures), hébergement (≈ 20–40 $/mois, à confirmer).

**90 jours — premières ventes**
- Lancer les offres d’entrée (diagnostic, SEO/AEO, gestion publicitaire, formation IA).
- Obtenir 3 à 5 mandats pilotes, avec autorisation écrite pour publier une étude de cas.
- Publier 6 à 8 ressources (guides Loi 25, LCAP, indicateurs).
- Mesurer : demandes reçues, taux de diagnostic complété, consultations, coût d’acquisition (analytique déjà en place).

**180 jours — structuration**
- Passer les offres « en développement » à « disponibles » seulement après un mandat réussi.
- Premiers abonnements récurrents ; automatiser soumissions et facturation internes.
- Publier les premières études de cas vérifiées ; ajouter témoignages **réels** si autorisés.

**365 jours — expansion**
- Choisir un ou deux secteurs prioritaires selon les résultats.
- Évaluer la plateforme d’outils par abonnement, les partenariats et un premier marché hors Québec (anglophone canadien).
- Revoir la grille avec les coûts réels.

**Priorités** : 1) conformité et mise en ligne ; 2) offres à faible coût de lancement et à revenus récurrents ; 3) preuves (études de cas) ; 4) extension.

**Risques** : promesses non tenues sur des services « en développement » ; marge érodée par des heures sous-estimées ; non-conformité Loi 25/LCAP ; dépendance à quelques outils ; concurrence par les prix des agences IA ; collisions de nom de marque.

## 7. Modifications du site réalisées dans cette étape

- **Architecture** : neuf départements (ajout Media & Advertising, Intelligence, Automation ; Logistics devient Supply Chain) ; **treize secteurs** (ajout Santé et Grandes organisations ; « Technologies » devient Startups et entreprises technologiques).
- **Pages ajoutées** : *Calculateurs* (`/fr/calculateurs`), *Automatisation* (`/fr/automatisation`), *Innovations* (`/fr/innovations`) ; section « Solutions d’affaires intégrées » dans *Solutions*.
- **Outils** : trois calculateurs fonctionnels (rentabilité publicitaire, gains d’automatisation, économies opérationnelles), formules testées (`api/__tests__/calculators.test.ts`).
- **Navigation** : Automatisation, Intelligence artificielle, Innovations ajoutés ; l’anglais reste accessible depuis le sélecteur FR / EN.
- **Conseiller IA** : connaissances étendues aux solutions, au catalogue d’automatisation avec statuts et aux calculateurs.

**Non réalisé / limites** : générateur d’estimation tarifaire (volontairement **non publié** : les prix doivent être validés par la direction avant affichage — il sera branché sur les tarifs publiés dans l’administration) ; recommandation automatique de services (le diagnostic et l’orientation à deux questions existants en tiennent lieu) ; recherche portant sur 17 firmes au lieu de 60 ; Europe non étudiée ; prix des concurrents non relevés (aucun n’est public) ; aucune donnée de volume de recherche.

**À valider** : grille tarifaire, statuts des services, nom AUREX, textes juridiques, hypothèses de coûts (55 $/h, frais fixes), présence de l’équipe de développement pour applications/SaaS.

## 8. Journal de la passe d'amélioration (phases 1 à 3 du prompt)

**Mesures Lighthouse** (`bash scripts/lighthouse.sh`, serveur de production local, page d'accueil / expertise / tarifs / calculateurs) :

| | Avant | Après |
|---|---|---|
| Performance ordinateur | 78–93 | **95–99** |
| Performance mobile | 55–61 | **59–69** (varie d'une exécution à l'autre) |
| Accessibilité | 95 (mobile) / 100 | **100** partout |
| Décalage de mise en page (CLS) | 0,4 sur les pages intérieures | **0** |
| Bonnes pratiques | 96 | 96–100 |
| SEO | 100 | 100 |

**Changements** : polices auto-hébergées (plus de requête vers Google, CSP resserrée), logos et photo du héros redimensionnés (logo 280 → 11 Ko, photo 450 → 167 Ko), bibliothèque de défilement doux retirée (accessibilité et poids), réseau de nœuds décoratif démarré en différé et allégé sur mobile, espace réservé de chargement pleine hauteur, bouton du conseiller IA nommé, sculpture 3D remplacée par une pyramide avec orbite dorée (`scripts/build-sculpture.py`, `scripts/render-poster.cjs`), alignement du texte d'accueil corrigé.

**Non atteint** : performance mobile ≥ 90. Le site est une application rendue dans le navigateur : sur un téléphone simulé lent (CPU ×4), React prend 1 à 1,5 s à démarrer. Le levier restant est le **pré-rendu serveur de la première vue** (HTML déjà affiché avant le JavaScript), un chantier structurel à décider. Les phases 4 à 8 (contenu humain, aimant à prospects, test du conseiller avec clé réelle, intégration continue, déploiement, recherche complémentaire) dépendent de la direction ou de ressources externes et n'ont pas été faites.
