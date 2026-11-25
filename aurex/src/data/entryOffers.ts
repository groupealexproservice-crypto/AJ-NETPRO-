import type { Localized, LocalizedList } from "../content";

const L = (fr: string, en: string): Localized => ({ fr, en });
const LL = (fr: string[], en: string[]): LocalizedList => ({ fr, en });

/**
 * Entry offers with published prices (CAD, taxes extra). Decided by management on 24 Nov 2026 from the market
 * study in docs/PLAN-ET-TARIFS.md (sections 9-10). Each entry offer has a deliberately limited scope; the full
 * version is the upgrade path. Prices must be re-verified against the market before launch.
 */
export type EntryOffer = {
  slug: string;
  title: Localized;
  price: number;
  unit: "month" | "once";
  /** "A la carte" projects without a lower local benchmark are flagged as projects. */
  group: "entry" | "project" | "monthly";
  scope: LocalizedList;
  upgrade?: { label: Localized; price: number; unit: "month" | "once" };
  /** Related offers shown on the same card (for example the monthly upkeep of a one-off installation). */
  extras?: Array<{ label: Localized; price: number; unit: "month" | "once" }>;
};

export const entryOffers: EntryOffer[] = [
  { slug: "entree-diagnostic", title: L("Diagnostic stratégique express", "Express strategic diagnostic"), price: 567, unit: "once", group: "entry",
    scope: LL(["Rencontre de 3 heures", "Lecture de votre situation et de vos priorités", "Rapport écrit avec plan d’action"], ["3-hour meeting", "Reading of your situation and priorities", "Written report with action plan"]) },
  { slug: "entree-seo", title: L("SEO local — Départ", "Local SEO — Starter"), price: 239, unit: "month", group: "entry",
    scope: LL(["Audit de départ", "Fiche Google optimisée", "Une page optimisée par mois"], ["Starting audit", "Optimized Google profile", "One optimized page per month"]),
    upgrade: { label: L("SEO local et visibilité IA — complet", "Local SEO and AI visibility — full"), price: 449, unit: "month" } },
  { slug: "entree-reseaux", title: L("Réseaux sociaux — Départ", "Social media — Starter"), price: 365, unit: "month", group: "entry",
    scope: LL(["1 profil", "8 publications par mois assistées par IA", "Rapport mensuel simple"], ["1 profile", "8 AI-assisted posts per month", "Simple monthly report"]),
    upgrade: { label: L("2 plateformes, 12 publications", "2 platforms, 12 posts"), price: 495, unit: "month" } },
  { slug: "entree-ads", title: L("Gestion Google Ads", "Google Ads management"), price: 449, unit: "month", group: "entry",
    scope: LL(["Ou 12 % du budget publicitaire (le plus élevé des deux)", "Création et optimisation des campagnes", "Rapport mensuel, compte à votre nom", "Budget publicitaire payé directement à Google"], ["Or 12% of ad spend (whichever is higher)", "Campaign setup and optimization", "Monthly report, account in your name", "Ad budget paid directly to Google"]) },
  { slug: "entree-site", title: L("Site vitrine — Gabarit", "Showcase website — Template"), price: 469, unit: "once", group: "entry",
    scope: LL(["Gabarit de 3 pages, français et anglais", "Contenu fourni par vous", "Adapté aux mobiles"], ["3-page template, French and English", "Content provided by you", "Mobile-ready"]),
    upgrade: { label: L("Site vitrine complet de 5 pages, rédaction incluse", "Full 5-page showcase site, copywriting included"), price: 1490, unit: "once" } ,
    extras: [{ label: L("Site corporatif bilingue : structure, rédaction, français et anglais", "Bilingual corporate website: structure, copywriting, French and English"), price: 4900, unit: "once" }] },
  { slug: "entree-automatisation", title: L("Automatisation simple", "Simple automation"), price: 990, unit: "once", group: "entry",
    scope: LL(["Un processus automatisé", "Documentation remise", "Prise en main de votre équipe"], ["One automated process", "Documentation provided", "Hand-over to your team"]) ,
    extras: [{ label: L("Suivi mensuel de l’automatisation", "Monthly automation upkeep"), price: 290, unit: "month" }] },
  { slug: "entree-assistant", title: L("Assistant IA — FAQ", "AI assistant — FAQ"), price: 1190, unit: "once", group: "entry",
    scope: LL(["Assistant conversationnel sur le contenu que vous fournissez", "Un canal (site web)", "Règles de prudence et renvoi vers une personne"], ["Conversational assistant on content you provide", "One channel (website)", "Safety rules and hand-off to a person"]),
    upgrade: { label: L("Assistant IA complet, plusieurs sources", "Full AI assistant, several sources"), price: 1490, unit: "once" } ,
    extras: [{ label: L("Suivi mensuel de l’assistant", "Monthly assistant upkeep"), price: 349, unit: "month" }] },
  { slug: "entree-identite", title: L("Identité visuelle essentielle", "Essential visual identity"), price: 690, unit: "once", group: "entry",
    scope: LL(["Logo, palette de couleurs et typographies", "2 propositions et 2 rondes de révisions", "Fichiers finaux et mini-guide d’utilisation"], ["Logo, colour palette and typefaces", "2 proposals and 2 rounds of revisions", "Final files and short usage guide"]) },
  { slug: "entree-campagne", title: L("Campagne publicitaire à durée déterminée — mise en place", "Fixed-term ad campaign — setup"), price: 450, unit: "once", group: "entry",
    scope: LL(["Objectifs, ciblage et création de la campagne", "Suivi des conversions", "Gestion ensuite dès 449 $ par mois (minimum 2 mois) ; budget publicitaire payé à la plateforme"], ["Objectives, targeting and campaign creation", "Conversion tracking", "Management then from $449 per month (2-month minimum); ad budget paid to the platform"]) },
  { slug: "entree-courriel", title: L("Campagne de prospection par courriel — 3 mois", "Email prospecting campaign — 3 months"), price: 1490, unit: "once", group: "entry",
    scope: LL(["Stratégie, messages et séquences approuvés par vous", "Listes et méthodes conformes aux règles applicables, validées avec vous avant l’envoi", "Rapport mensuel ; ensuite 399 $ par mois si vous poursuivez"], ["Strategy, messages and sequences approved by you", "Lists and methods consistent with applicable rules, validated with you before sending", "Monthly report; then $399 per month if you continue"]) },
  { slug: "entree-agent-telephone", title: L("Agent téléphonique IA — installation", "AI phone agent — setup"), price: 990, unit: "once", group: "entry",
    scope: LL(["Configuration pour appels entrants, avec transfert à une personne", "Script basé sur vos renseignements approuvés, tests avec scénarios réels", "Ensuite dès 299 $ par mois (300 minutes) ; frais de téléphonie et de plateforme selon le fournisseur"], ["Setup for inbound calls, with transfer to a person", "Script based on your approved information, tests with real scenarios", "Then from $299 per month (300 minutes); telephony and platform fees per provider"]) },
  { slug: "projet-plan-affaires", title: L("Plan d’affaires / étude de marché", "Business plan / market study"), price: 1990, unit: "once", group: "project",
    scope: LL(["Analyse du marché et de la concurrence", "Modèle d’affaires et projections", "Document remis et présenté"], ["Market and competition analysis", "Business model and projections", "Document delivered and presented"]) },
  { slug: "mensuel-maintenance", title: L("Maintenance et hébergement du site", "Website maintenance and hosting"), price: 90, unit: "month", group: "monthly",
    scope: LL(["Hébergement et certificat de sécurité", "Sauvegardes et mises à jour", "Petites modifications du contenu"], ["Hosting and security certificate", "Backups and updates", "Small content changes"]) },
  { slug: "mensuel-courriel", title: L("Infolettre mensuelle", "Monthly newsletter"), price: 249, unit: "month", group: "monthly",
    scope: LL(["Une infolettre rédigée et envoyée par mois", "Liste avec consentement et désabonnement", "Statistiques d’ouverture et de clics"], ["One newsletter written and sent per month", "Consent-based list with unsubscribe", "Open and click statistics"]) },
  { slug: "mensuel-veille", title: L("Veille concurrentielle", "Competitive monitoring"), price: 199, unit: "month", group: "monthly",
    scope: LL(["Surveillance de vos concurrents et de votre marché", "Synthèse mensuelle écrite", "Pistes d’action"], ["Monitoring of your competitors and market", "Written monthly summary", "Action ideas"]) },
  { slug: "mensuel-tableau", title: L("Tableau de bord mensuel", "Monthly dashboard"), price: 149, unit: "month", group: "monthly",
    scope: LL(["Vos indicateurs clés réunis en une page", "Commentaire d’analyse", "Rencontre de présentation de 30 minutes"], ["Your key indicators on one page", "Analysis commentary", "30-minute review meeting"]) },
];

export const entryOfferBySlug = (slug: string) => entryOffers.find((o) => o.slug === slug);
