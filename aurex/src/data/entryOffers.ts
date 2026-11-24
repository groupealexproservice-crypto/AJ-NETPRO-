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
  group: "entry" | "project";
  scope: LocalizedList;
  upgrade?: { label: Localized; price: number; unit: "month" | "once" };
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
    upgrade: { label: L("Site vitrine complet de 5 pages, rédaction incluse", "Full 5-page showcase site, copywriting included"), price: 1490, unit: "once" } },
  { slug: "entree-automatisation", title: L("Automatisation simple", "Simple automation"), price: 990, unit: "once", group: "entry",
    scope: LL(["Un processus automatisé", "Documentation remise", "Prise en main de votre équipe"], ["One automated process", "Documentation provided", "Hand-over to your team"]) },
  { slug: "entree-assistant", title: L("Assistant IA — FAQ", "AI assistant — FAQ"), price: 1190, unit: "once", group: "entry",
    scope: LL(["Assistant conversationnel sur le contenu que vous fournissez", "Un canal (site web)", "Règles de prudence et renvoi vers une personne"], ["Conversational assistant on content you provide", "One channel (website)", "Safety rules and hand-off to a person"]),
    upgrade: { label: L("Assistant IA complet, plusieurs sources", "Full AI assistant, several sources"), price: 1490, unit: "once" } },
  { slug: "projet-plan-affaires", title: L("Plan d’affaires / étude de marché", "Business plan / market study"), price: 1990, unit: "once", group: "project",
    scope: LL(["Analyse du marché et de la concurrence", "Modèle d’affaires et projections", "Document remis et présenté"], ["Market and competition analysis", "Business model and projections", "Document delivered and presented"]) },
  { slug: "projet-site-corporatif", title: L("Site corporatif bilingue", "Bilingual corporate website"), price: 4900, unit: "once", group: "project",
    scope: LL(["Structure et rédaction des pages", "Français et anglais", "Référencement de base et formulaires"], ["Page structure and copywriting", "French and English", "Basic SEO and forms"]) },
];

export const entryOfferBySlug = (slug: string) => entryOffers.find((o) => o.slug === slug);
