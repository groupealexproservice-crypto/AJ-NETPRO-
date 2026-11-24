# BENEX Solutions — site, espace client et administration

Plateforme bilingue (français québécois `/fr`, anglais canadien `/en`) : site public, diagnostic en trois étapes, soumission et consultation, infolettre, espace client protégé et administration.

**Pile technique** : React 19 + Vite, Hono (Node 22), tRPC, Drizzle ORM, MySQL 8 / MariaDB 10.6+. Un seul processus Node sert l'API, les pages et les documents.

Ce dossier (`benex/`) est autonome. Le site statique « AJ NETPRO » à la racine du dépôt n'est pas modifié.

---

## Démarrage local

```bash
cd benex
cp .env.example .env            # puis renseigner APP_SECRET, DATABASE_URL, ADMIN_EMAIL, ADMIN_PASSWORD
npm install
npm run db:migrate              # applique db/migrations
npm run dev                     # http://localhost:3000  (redirige vers /fr ou /en)
```

Le premier administrateur est créé au démarrage à partir de `ADMIN_EMAIL` / `ADMIN_PASSWORD` s'il n'existe aucun administrateur. Connexion : `/fr/connexion` (l'administrateur est redirigé vers `/admin`).

Données de démonstration (**jamais en production**) : `npm run db:seed:demo` crée deux organisations fictives (`alpha@demo.benex.test`, `beta@demo.benex.test`) pour essayer l'isolation entre clients.

## Vérifications

| Commande | Contenu |
|---|---|
| `npm run check` | Compilation TypeScript (client et serveur) |
| `npm run lint` | ESLint |
| `npm test` | 15 tests Vitest sur une vraie base MySQL/MariaDB (`TEST_DATABASE_URL`, défaut `benex_test`) : validation serveur, références, isolation par organisation, téléchargements, rôles, CSRF |
| `npm run e2e` | Parcours Playwright dans un navigateur (serveur démarré + `db:seed:demo`) : 31 contrôles — langues, 84 pages explorées, diagnostic jusqu'à l'administration, consultation, infolettre, refus d'accès entre clients, clavier, mobile, mouvement réduit |
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
2. Déployer le dépôt (dossier racine `benex`), commande de build `npm run build`, fichier de démarrage `dist/boot.js`.
3. Définir les variables d'environnement (jamais dans le code ni dans un `.env` versionné) : `APP_SECRET`, `DATABASE_URL`, `PUBLIC_URL`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `UPLOAD_DIR`.
4. `UPLOAD_DIR` doit pointer vers un dossier **persistant, hors du build** (ex. `/home/<compte>/benex-storage/uploads`) : un redéploiement ne doit pas effacer les documents clients.
5. Exécuter `npm run db:migrate`, puis ouvrir `/fr/connexion`, changer le mot de passe administrateur et retirer `ADMIN_PASSWORD` de l'environnement.
6. Activer HTTPS (le témoin de session est `Secure` en production) et vérifier `PUBLIC_URL`.

### Docker
`docker build -t benex .` puis monter un volume sur `/app/storage` et fournir les variables d'environnement.

## Architecture et sécurité

- **Authentification** : courriel + mot de passe (scrypt), témoin de session `HttpOnly`, `SameSite=Lax`, `Secure` en production, durée 12 h, limitation des tentatives. Les comptes clients sont créés par l'équipe (administration → Clients). Pas de service d'identité externe : l'application fonctionne telle quelle sur un hébergement Node standard.
- **Autorisations côté serveur** : le rôle et l'organisation sont lus en base à chaque requête (jamais depuis le navigateur). Toutes les requêtes du portail sont filtrées par l'organisation de l'utilisateur ; toute procédure `admin.*` exige le rôle administrateur.
- **Documents** : stockés hors de la racine web sous un nom aléatoire ; téléchargement uniquement via `/api/files/:id` après contrôle (administrateur, ou organisation propriétaire). « Introuvable » et « interdit » donnent la même réponse 404. Types de fichiers en liste blanche, taille limitée (`MAX_UPLOAD_MB`).
- **CSRF** : écritures `/api/*` refusées si l'en-tête `Origin` n'est pas celui du site.
- **Formulaires** : validation serveur (Zod) selon le type de demande ; honeypot anti-robot ; enregistrement transactionnel ; la confirmation (référence `BNX-AAAA-XXXXX`) n'est affichée qu'**après** l'enregistrement réussi.
- **Consultation** : enregistrée comme *demande à confirmer* (statut « Nouvelle »), avec solution, type d'accompagnement, date et plage horaire préférées ; l'administration saisit le rendez-vous confirmé.
- **SEO** : `<title>`, description, canonique, `hreflang` (fr-CA, en-CA, x-default) et balises sociales générés **côté serveur** par page ; `/sitemap.xml` avec alternates ; `/robots.txt` ; images de partage `public/images/og-benex-{fr,en}.png` ; pages portail et administration en `noindex`.
- **Accessibilité** : lien d'évitement, focus visible, navigation clavier, mouvement réduit respecté (défilement fluide et animations désactivés).

## Intégrations (points de raccordement)

Rien n'est envoyé tant qu'une URL n'est pas configurée ; chaque tentative est consignée (Administration → Intégrations).

| Canal | Variables | Reçoit |
|---|---|---|
| CRM | `CRM_WEBHOOK_URL`, `CRM_WEBHOOK_SECRET` | `lead.diagnostic`, `lead.quote`, `lead.appointment`, `lead.contact` |
| Notifications | `NOTIFY_WEBHOOK_URL`, `NOTIFY_WEBHOOK_SECRET` | `lead.created`, `client.message` |
| Marketing | `MARKETING_WEBHOOK_URL`, `MARKETING_WEBHOOK_SECRET` | `newsletter.subscribed`, `newsletter.unsubscribed` (avec date du consentement) |
| Calendrier | `CALENDAR_BOOKING_URL` | Lien de réservation de l'équipe (les rendez-vous restent « à confirmer ») |

Format : `POST` JSON `{ event, ref, sentAt, data }`, en-têtes `X-Benex-Event` et `X-Benex-Signature` (HMAC-SHA256 du corps avec le secret). Le code est dans `api/integrations/index.ts`.

## Ce qui reste à raccorder, valider et tester avant publication

**À raccorder (non branché, non testé avec un vrai service)**
- Courriel transactionnel : aucun courriel n'est envoyé aux visiteurs ni à l'équipe sans service raccordé via `NOTIFY_WEBHOOK_URL` (relais Make/Zapier/Slack ou fournisseur). Les alertes internes existent dans l'administration.
- CRM, calendrier, outil marketing : points d'entrée prêts, aucun fournisseur choisi.
- Domaine, HTTPS, `PUBLIC_URL`, sauvegardes de la base et du dossier `UPLOAD_DIR`.
- Réinitialisation de mot de passe en libre-service : non incluse (l'équipe réinitialise via un nouveau compte ; changement de mot de passe disponible côté API `auth.changePassword`).

**À valider par BENEX / un conseiller juridique** (voir `docs/CONFORMITE.md`) : textes de consentement, politique de confidentialité, responsable de la protection des renseignements personnels, identification de l'expéditeur pour la LCAP, durées de conservation.

**Contenus** : aucun client, témoignage, partenaire, chiffre ou résultat n'est présenté. Les réalisations ne se publient que si l'autorisation du client est consignée. Coordonnées publiques (courriel, téléphone, adresse) : à fournir, aucune n'est inventée. Photographie : Pexels, « Modern Architecture Black and White Facade », <https://www.pexels.com/photo/modern-architecture-black-and-white-facade-35534777/>.
