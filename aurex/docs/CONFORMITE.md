# Conformité — points à faire valider avant publication

> Ce document décrit ce que le site fait techniquement et ce qu’AUREX doit faire valider. **Il ne constitue pas un avis juridique et n'affirme aucune conformité complète.** Une validation par un conseiller qualifié est requise.

## Loi 25 (Québec) — protection des renseignements personnels

| Élément | Ce que fait le site | À valider / compléter par AUREX |
|---|---|---|
| Consentement | Case non cochée par défaut, texte lié à la politique de confidentialité ; consentement horodaté, avec la **version du texte** (`CONSENT_TEXT_VERSION`) et la langue, stocké avec chaque demande | Texte exact des consentements (`src/i18n.tsx`: `consent`, `newsletterConsent`) ; incrémenter `CONSENT_TEXT_VERSION` à chaque changement |
| Finalités | Réponse aux demandes, propositions, suivi commercial, portail, infolettre (page Confidentialité) | Exhaustivité et exactitude de la liste des finalités |
| Responsable de la protection des renseignements personnels | Page Confidentialité renvoie à la page Contact | **Désigner la personne responsable et publier ses coordonnées** |
| Droits d'accès, rectification, retrait | Demande via Contact ; désabonnement via `/fr/desabonnement` | Procédure interne et délais de réponse |
| Conservation | Les demandes sont conservées sans purge automatique | **Fixer et appliquer des durées de conservation** (aucune suppression automatique n'est programmée) |
| Sécurité | Authentification, autorisations serveur, documents hors racine web, HTTPS requis en production | Sauvegardes, journalisation, gestion des incidents |
| Hébergement / transferts hors Québec | Non déterminé par le code | Lieu d'hébergement (Hostinger) et évaluation des transferts |
| Témoins | Langue (stockage local) et témoin de session du portail ; aucun outil publicitaire ni d'analyse | Si un outil d'analyse est ajouté : bannière de consentement préalable |

## Loi canadienne antipourriel (LCAP / CASL)

| Élément | Ce que fait le site | À valider / compléter par AUREX |
|---|---|---|
| Consentement exprès à l'infolettre | Consentement **distinct** de celui du formulaire de contact, case non cochée, requis pour s'inscrire, horodaté | Preuve de consentement à conserver ; texte |
| Désabonnement | Page `/fr/desabonnement`, effet immédiat ; l'événement est transmis au canal marketing | Lien de désabonnement et exécution en ≤ 10 jours dans **chaque** courriel envoyé |
| Identification de l'expéditeur | Non applicable tant qu'aucun courriel n'est envoyé | Nom, adresse postale et coordonnées dans chaque message commercial |
| Prospection B2B (expertise « Développement commercial ») | Le texte du site mentionne le respect des règles de consentement | Politique interne de prospection (consentement tacite/exprès, exceptions) |

Le site n'envoie **aucun** courriel commercial. Toute campagne devra être envoyée depuis un outil raccordé qui gère les désabonnements.

## Contenu

- Aucun client, témoignage, partenaire, chiffre ou résultat n'est affiché. Les « Réalisations » ne se publient qu'avec l'autorisation consignée du client (contrôle côté serveur).
- Exemples sectoriels : présentés comme des **problématiques et solutions possibles**, pas comme des missions réalisées.
- Brochures PDF : contiennent uniquement la description des expertises, offres, secteurs et méthode ; aucune tarification.

## Engagements et ton (src/vision.ts)

Les cinq engagements (écouter avant de proposer, sérieux et discrétion, parler vrai, protéger les renseignements, mesurer et rendre compte) et les phrases « Notre engagement envers vous » décrivent une **manière de travailler**, jamais un résultat. AUREX doit confirmer qu'elle peut les tenir et les faire appliquer (en particulier « chaque demande est examinée par l'équipe » et la confidentialité des documents) avant publication.

## Mesures de conversion, simulateur, tarifs et technologies citées

- **Mesures** : seuls le nom de l'événement, la page et la langue sont enregistrés. Aucune adresse IP, aucun témoin, aucun identifiant. À confirmer dans la politique de confidentialité.
- **Simulateur** : les valeurs de départ sont illustratives et les pourcentages des scénarios sont des hypothèses modifiables ; la page rappelle que ce n'est ni une prévision ni une garantie. Les résultats ne sont pas enregistrés.
- **Tarifs et délais** : jamais affichés avant publication par la direction. Contenu des quatre offres et des quatre offres IA = **proposition à valider** (services inclus, livrables, modalités).
- **Noms de départements** (Strategy, Marketing, Digital, Operations, Logistics, Growth, AUREX AI & Automation) : propositions à valider.
- **Technologies citées** (OpenAI, Microsoft 365, Google Workspace, HubSpot, Salesforce, Shopify, WordPress, n8n, Make, Zapier, Slack, Meta Ads, Google Ads) : possibilités d'intégration seulement ; marques appartenant à leurs propriétaires ; aucun partenariat affirmé.
- **Agents IA et automatisations** : les capacités décrites doivent correspondre à ce qu’AUREX peut réellement livrer (permissions, supervision, tests).

## Conseiller IA

- **Modèle externe** : si `ANTHROPIC_API_KEY` est défini, le texte des questions (courriels et numéros masqués) est transmis à Anthropic pour produire la réponse. À mentionner dans la politique de confidentialité (fournisseur, finalité, hébergement hors Québec possible) et à évaluer au regard de la Loi 25 (transferts hors Québec). Sans clé, aucune donnée ne sort du serveur.
- **Aucune conservation** du contenu des conversations ; seul un compteur anonyme est enregistré.
- **Exactitude** : l'avis affiché rappelle que les réponses sont automatiques et à valider avec l'équipe. Les règles du conseiller (src : `api/assistant/engine.ts`) interdisent d'inventer prix, clients, résultats, partenariats ; AUREX doit relire ces règles et tester le conseiller avec sa clé avant publication.
- **Non testé ici** : l'appel réel au modèle (aucune clé dans cet environnement). Le flux est testé avec un modèle simulé ; le mode « connaissances » est testé de bout en bout.

## Langue et affichage au Québec

- **Charte de la langue française (loi 96)** : le site s'ouvre en français et l'anglais est une version équivalente ; les montants sont en dollars canadiens. À faire valider par un conseiller pour les mentions obligatoires de votre secteur.
- **Mentions légales de l'entreprise** : raison sociale, NEQ, adresse et courriel se renseignent par variables (`COMPANY_LEGAL_NAME`, `COMPANY_NEQ`, …) et s'affichent alors dans le pied de page et la page Contact. Rien n'est affiché tant que ces valeurs sont vides.
- **Responsable de la protection des renseignements personnels** : `PRIVACY_OFFICER_NAME` / `PRIVACY_OFFICER_EMAIL` alimentent la page Confidentialité. Cette désignation et la publication de ses coordonnées sont obligatoires : à faire avant la mise en ligne.
