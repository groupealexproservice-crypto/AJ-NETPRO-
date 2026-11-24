# AUREX Solutions — site, espace client et administration

Plateforme bilingue (français québécois `/fr`, anglais canadien `/en`) : site public, diagnostic en trois étapes, soumission et consultation, infolettre, espace client protégé et administration.

**Pile technique** : React 19 + Vite, Hono (Node 22), tRPC, Drizzle ORM, MySQL 8 / MariaDB 10.6+. Un seul processus Node sert l'API, les pages et les documents.

Ce dossier (`aurex/`) est autonome. Le site statique « AJ NETPRO » à la racine du dépôt n'est pas modifié.

---

## Démarrage local

```bash
cd aurex
cp .env.example .env            # puis renseigner APP_SECRET, DATABASE_URL, ADMIN_EMAIL, ADMIN_PASSWORD
npm install
npm run db:migrate              # applique db/migrations
npm run dev                     # http://localhost:3000  (redirige vers /fr ou /en)
```

Le premier administrateur est créé au démarrage à partir de `ADMIN_EMAIL` / `ADMIN_PASSWORD` s'il n'existe aucun administrateur. Connexion : `/fr/connexion` (l'administrateur est redirigé vers `/admin`).

Données de démonstration (**jamais en production**) : `npm run db:seed:demo` crée deux organisations fictives (`alpha@demo.aurex.test`, `beta@demo.aurex.test`) pour essayer l'isolation entre clients.

## Vérifications

| Commande | Contenu |
|---|---|
| `npm run check` | Compilation TypeScript (client et serveur) |
| `npm run lint` | ESLint |
| `npm test` | 36 tests Vitest sur une vraie base MySQL/MariaDB (`TEST_DATABASE_URL`, défaut `aurex_test`) : validation serveur, références, isolation par organisation, téléchargements, rôles, CSRF |
| `npm run e2e` | Parcours Playwright dans un navigateur (serveur démarré + `db:seed:demo`) : 63 contrôles — langues, 84 pages explorées, diagnostic jusqu'à l'administration, consultation, infolettre, refus d'accès entre clients, clavier, mobile, mouvement réduit |
| `npm run a11y` | Audit d'accessibilité axe-core (WCAG 2.1 A/AA) sur 19 pages FR/EN + le panneau du conseiller, et contrôle des violations de CSP (modèle 3D compris) : 0 violation |
| `npm run assets` | Régénère brochures PDF FR/EN et images de partage depuis `src/content.ts` (Playwright requis) |

## Production

```bash
npm ci
npm run build                   # dist/public (client) + dist/boot.js (serveur)
npm run db:migrate              # sur la base de production
npm start                       # NODE_ENV=production, écoute sur $PORT (3000)
```

Variables : voir `.env.example` (toutes documentées). En production, le serveur refuse de démarrer sans `APP_SECRET` (32 caractères minimum) ni `DATABASE_URL`.

### Hostinger (Node.js + MySQL)
1. hPanel → créer la base MySQL et l'utilisateur ; `DATABASE_URL=mysql://utilisateur:motdepasse@127.0.0.1:3306/base` (l'hôte `srvNNNN.hstgr.io` ne sert qu'aux connexions externes).
2. Déployer le dépôt (dossier racine `aurex`), commande de build `npm run build`, fichier de démarrage `dist/boot.js`.
3. Définir les variables d'environnement (jamais dans le code ni dans un `.env` versionné) : `APP_SECRET`, `DATABASE_URL`, `PUBLIC_URL`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `UPLOAD_DIR`.
4. `UPLOAD_DIR` doit pointer vers un dossier **persistant, hors du build** (ex. `/home/<compte>/aurex-storage/uploads`) : un redéploiement ne doit pas effacer les documents clients.
5. Exécuter `npm run db:migrate`, puis ouvrir `/fr/connexion`, changer le mot de passe administrateur et retirer `ADMIN_PASSWORD` de l'environnement.
6. Activer HTTPS (le témoin de session est `Secure` en production) et vérifier `PUBLIC_URL`.

### Docker
`docker build -t aurex .` puis monter un volume sur `/app/storage` et fournir les variables d'environnement.

## Positionnement, contenus et fonctions commerciales (v2)

- **Architecture** : six départements (Strategy, Marketing, Digital, Operations, Logistics, Growth) et une unité transversale **AUREX AI & Automation**. Dix expertises (A à J), chacune avec une page répondant aux huit questions : problème, solution, intervention, livrables, bénéfices, mesure (indicateurs), coût, pourquoi AUREX. Onze secteurs, méthodologie en six étapes. Données dans `src/data/` et `src/content.ts`, textes bilingues.
- **Accueil** : `/` ouvre directement la page française (`/fr`), sans écran de choix de langue ; l'anglais est dans le menu.
- **Tarifs et offres** (`/tarifs`) : quatre offres (ESSENTIEL, PERFORMANCE, BUSINESS, ENTERPRISE) et quatre offres IA (AI START, BUSINESS, PERFORMANCE, ENTERPRISE). **Aucun tarif ni délai n'est inventé** : tant que la direction ne les saisit pas et ne les publie pas (Administration → Tarifs), le site affiche « Tarif sur devis ».
- **Simulateur de rentabilité** (`/simulateur`) : calcul transparent (formules affichées), hypothèses modifiables, trois scénarios, clairement étiqueté « simulation ». Logique testée dans `src/simulator.ts`.
- **AUREX AI & Automation** (`/intelligence-artificielle`) : agents, familles d'automatisation, intégrations (présentées comme possibilités, jamais comme partenariats), gouvernance, offres IA.
- **Crédibilité** : témoignages, partenaires, certifications, rapports et équipe se saisissent dans Administration → Crédibilité ; ils ne s'affichent que s'ils sont **vérifiés et publiés**. Les études de cas exigent l'autorisation consignée du client.
- **Mesures de conversion** : événements anonymes (nom, page, langue ; aucun témoin, aucune adresse IP) → entonnoir dans l'administration, plus la liste « À relancer » (demandes nouvelles depuis plus de 48 h).
- **Conseiller IA** (bouton « Conseiller IA » sur tout le site, champ « Posez votre question » sur l'accueil et la page IA) : répond en français ou en anglais et explique les expertises, offres, secteurs, indicateurs et la démarche. Deux modes :
  - *IA générative* si `ANTHROPIC_API_KEY` est défini : un modèle de langage répond, **uniquement à partir du contenu AUREX** (passages retrouvés + règles strictes : aucun prix, client, délai, résultat ou partenariat inventé ; tarifs publiés seulement ; refus des instructions qui contournent les règles ; orientation vers la consultation).
  - *Guide de connaissances* sans clé (ou si le modèle est indisponible) : réponses composées par le serveur à partir du même contenu, sans IA générative.
  Garde-fous : courriels et numéros masqués avant tout envoi, conversation **non conservée** (seul un compteur anonyme), 20 questions / 10 min par visiteur, questions limitées à 800 caractères. Le sélecteur à deux questions (secteur, besoin) reste disponible sur la page Diagnostic.
- **Thème « Aurora »** : surfaces nuit profonde, papier froid, bleu cobalt AUREX avec lumière électrique ; Sora, IBM Plex Sans et IBM Plex Mono ; réseau de nœuds animé (désactivé en mouvement réduit).

## Montréal, coordonnées publiques et qualité de livraison

- **Ancrage** : la ville, la province et le pays (Montréal, QC, Canada) sont fixes dans le site (pied de page, contact, À propos, données structurées). **Aucune adresse, aucun téléphone ni courriel n'est inventé** : ils s'affichent seulement quand ils sont renseignés par variables d'environnement (`COMPANY_*`, `PRIVACY_OFFICER_*`, voir `.env.example`). La page Confidentialité affiche alors le responsable de la protection des renseignements personnels.
- **Langue** : le français est la langue principale (`/` → `/fr`), l'anglais est dans le menu ; montants en CAD.
- **SEO** : balises par page, canonique, hreflang (fr-CA, en-CA, x-default), plan de site, images de partage, données structurées `ProfessionalService` (Montréal) et `Service` pour chaque expertise, générées côté serveur.
- **Sécurité** : CSP stricte (aucun script en ligne), HSTS en HTTPS, `X-Frame-Options`, `Permissions-Policy`, `nosniff`, cookies de session `HttpOnly`/`Secure`.
- **Performance** : compression, cache d'un an pour les fichiers hachés, découpage du code par page (le moteur 3D et l'animation d'en-tête ne se chargent qu'au besoin).
- **Accessibilité** : voir `npm run a11y`.

## Sculpture 3D

Section « Trois repères qui montent ensemble » de l'accueil (`src/components/Sculpture3D.tsx`). Le modèle `public/models/sculpture-aurex.glb` (460 Ko) est affiché avec `@google/model-viewer`. L'image fixe `public/images/sculpture-aurex.webp` s'affiche d'abord ; le moteur 3D (~300 Ko compressés) n'est téléchargé que lorsque la section approche de l'écran. Si WebGL ou le téléchargement échoue, l'image reste. Pas de zoom ni de panoramique (le défilement de la page n'est pas capturé) ; la rotation automatique est désactivée en mode mouvement réduit. Le fichier source Blender est dans `assets-3d/sculpture-aurex.blend`.

## Architecture et sécurité

- **Authentification** : courriel + mot de passe (scrypt), témoin de session `HttpOnly`, `SameSite=Lax`, `Secure` en production, durée 12 h, limitation des tentatives. Les comptes clients sont créés par l'équipe (administration → Clients). Pas de service d'identité externe : l'application fonctionne telle quelle sur un hébergement Node standard.
- **Autorisations côté serveur** : le rôle et l'organisation sont lus en base à chaque requête (jamais depuis le navigateur). Toutes les requêtes du portail sont filtrées par l'organisation de l'utilisateur ; toute procédure `admin.*` exige le rôle administrateur.
- **Documents** : stockés hors de la racine web sous un nom aléatoire ; téléchargement uniquement via `/api/files/:id` après contrôle (administrateur, ou organisation propriétaire). « Introuvable » et « interdit » donnent la même réponse 404. Types de fichiers en liste blanche, taille limitée (`MAX_UPLOAD_MB`).
- **CSRF** : écritures `/api/*` refusées si l'en-tête `Origin` n'est pas celui du site.
- **Formulaires** : validation serveur (Zod) selon le type de demande ; honeypot anti-robot ; enregistrement transactionnel ; la confirmation (référence `AUR-AAAA-XXXXX`) n'est affichée qu'**après** l'enregistrement réussi.
- **Consultation** : enregistrée comme *demande à confirmer* (statut « Nouvelle »), avec solution, type d'accompagnement, date et plage horaire préférées ; l'administration saisit le rendez-vous confirmé.
- **SEO** : `<title>`, description, canonique, `hreflang` (fr-CA, en-CA, x-default) et balises sociales générés **côté serveur** par page ; `/sitemap.xml` avec alternates ; `/robots.txt` ; images de partage `public/images/og-aurex-{fr,en}.png` ; pages portail et administration en `noindex`.
- **Accessibilité** : lien d'évitement, focus visible, navigation clavier, mouvement réduit respecté (défilement fluide et animations désactivés).

## Intégrations (points de raccordement)

Rien n'est envoyé tant qu'une URL n'est pas configurée ; chaque tentative est consignée (Administration → Intégrations).

| Canal | Variables | Reçoit |
|---|---|---|
| CRM | `CRM_WEBHOOK_URL`, `CRM_WEBHOOK_SECRET` | `lead.diagnostic`, `lead.quote`, `lead.appointment`, `lead.contact` |
| Notifications | `NOTIFY_WEBHOOK_URL`, `NOTIFY_WEBHOOK_SECRET` | `lead.created`, `client.message` |
| Marketing | `MARKETING_WEBHOOK_URL`, `MARKETING_WEBHOOK_SECRET` | `newsletter.subscribed`, `newsletter.unsubscribed` (avec date du consentement) |
| Calendrier | `CALENDAR_BOOKING_URL` | Lien de réservation de l'équipe (les rendez-vous restent « à confirmer ») |

Format : `POST` JSON `{ event, ref, sentAt, data }`, en-têtes `X-Aurex-Event` et `X-Aurex-Signature` (HMAC-SHA256 du corps avec le secret). Le code est dans `api/integrations/index.ts`.

## Ce qui reste à raccorder, valider et tester avant publication

**À raccorder (non branché, non testé avec un vrai service)**
- Courriel transactionnel : aucun courriel n'est envoyé aux visiteurs ni à l'équipe sans service raccordé via `NOTIFY_WEBHOOK_URL` (relais Make/Zapier/Slack ou fournisseur). Les alertes internes existent dans l'administration.
- CRM, calendrier, outil marketing : points d'entrée prêts, aucun fournisseur choisi.
- Domaine, HTTPS, `PUBLIC_URL`, sauvegardes de la base et du dossier `UPLOAD_DIR`.
- Réinitialisation de mot de passe oublié en libre-service : non incluse (le changement de mot de passe connecté est disponible dans les portails ; en cas d’oubli, l’équipe recrée le compte).

**À valider par AUREX / un conseiller juridique** (voir `docs/CONFORMITE.md`) : textes de consentement, politique de confidentialité, responsable de la protection des renseignements personnels, identification de l'expéditeur pour la LCAP, durées de conservation.

**Contenus** : aucun client, témoignage, partenaire, chiffre ou résultat n'est présenté. Les réalisations ne se publient que si l'autorisation du client est consignée. Coordonnées publiques (courriel, téléphone, adresse) : à fournir, aucune n'est inventée. Photographie : Pexels, « Modern Architecture Black and White Facade », <https://www.pexels.com/photo/modern-architecture-black-and-white-facade-35534777/>.
