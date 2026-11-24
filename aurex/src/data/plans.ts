import type { Localized, LocalizedList } from "../content";

const L = (fr: string, en: string): Localized => ({ fr, en });
const LL = (fr: string[], en: string[]): LocalizedList => ({ fr, en });

/**
 * Permanent plans: ongoing monthly partnership (image, website, visibility, AI) to keep clients over the long term.
 * Prices in CAD per month, taxes extra, decided by management on 24 Nov 2026 (see docs/PLAN-ET-TARIFS.md, section 11).
 * Each plan includes a fixed number of working hours per month; extra work is quoted. No result is promised.
 */
export type Plan = {
  slug: string;
  name: string;
  tagline: Localized;
  audience: Localized;
  monthly: number;
  /** Price per month with a 12-month commitment (5 % lower). */
  yearly: number;
  hours: number;
  includes: LocalizedList;
  excludes: LocalizedList;
  highlight?: boolean;
};

export const planTerms = {
  minMonths: 6,
  noticeDays: 30,
  terms: LL(
    ["Engagement minimum de 6 mois, puis mensuel avec préavis de 30 jours", "Heures de travail incluses chaque mois ; tout travail additionnel est soumis à votre approbation", "Budget publicitaire, licences et frais de tiers en sus, au coût réel", "Rapport mensuel et bilan trimestriel avec indicateurs convenus"],
    ["6-month minimum commitment, then monthly with 30 days’ notice", "Working hours included each month; any extra work is subject to your approval", "Ad budget, licences and third-party fees extra, at cost", "Monthly report and quarterly review with agreed indicators"],
  ),
};

export const plans: Plan[] = [
  {
    slug: "plan-presence", name: "AUREX PRÉSENCE",
    tagline: L("Une image et un site toujours à jour.", "An image and a website that stay current."),
    audience: L("Petites entreprises et travailleurs autonomes qui veulent une présence professionnelle sans s’en occuper.", "Small businesses and self-employed professionals who want a professional presence without managing it."),
    monthly: 790, yearly: 750, hours: 9,
    includes: LL(["Maintenance, hébergement et sauvegardes du site", "Mises à jour et petites modifications du contenu", "Réseaux sociaux : 1 profil, 8 publications par mois", "Fiche Google à jour et suivi des avis", "Rapport mensuel simple"], ["Website maintenance, hosting and backups", "Updates and small content changes", "Social media: 1 profile, 8 posts per month", "Up-to-date Google profile and review monitoring", "Simple monthly report"]),
    excludes: LL(["Publicité payante", "Refonte du site"], ["Paid advertising", "Website redesign"]),
  },
  {
    slug: "plan-croissance", name: "AUREX CROISSANCE",
    tagline: L("Plus de visibilité, plus de demandes.", "More visibility, more enquiries."),
    audience: L("PME qui veulent un flux régulier de nouveaux clients et un suivi des résultats.", "SMEs that want a steady flow of new customers and tracked results."),
    monthly: 1490, yearly: 1415, hours: 17, highlight: true,
    includes: LL(["Tout AUREX PRÉSENCE", "Réseaux sociaux : 2 plateformes, 12 publications par mois", "SEO local et visibilité IA (une page ou un article par mois)", "Gestion Google Ads (le budget publicitaire est en sus)", "Optimisation mensuelle du site et des formulaires", "Tableau de bord des demandes et bilan trimestriel"], ["Everything in AUREX PRÉSENCE", "Social media: 2 platforms, 12 posts per month", "Local SEO and AI visibility (one page or article per month)", "Google Ads management (ad budget extra)", "Monthly optimization of the site and forms", "Enquiry dashboard and quarterly review"]),
    excludes: LL(["Développement sur mesure", "Systèmes d’IA complexes"], ["Custom development", "Complex AI systems"]),
  },
  {
    slug: "plan-partenaire", name: "AUREX PARTENAIRE",
    tagline: L("Un partenaire de croissance, au quotidien.", "A growth partner, every day."),
    audience: L("Entreprises qui veulent confier plusieurs départements : image, acquisition, opérations et automatisation.", "Companies that want to entrust several departments: image, acquisition, operations and automation."),
    monthly: 2990, yearly: 2840, hours: 35,
    includes: LL(["Tout AUREX CROISSANCE", "Automatisations suivies et améliorées chaque mois", "Assistant IA sur votre contenu, mis à jour", "Rencontre stratégique mensuelle et feuille de route", "Veille concurrentielle synthétisée", "Tableau de bord de pilotage et bilan trimestriel détaillé"], ["Everything in AUREX CROISSANCE", "Automations monitored and improved each month", "AI assistant on your content, kept up to date", "Monthly strategy meeting and roadmap", "Summarized competitive monitoring", "Management dashboard and detailed quarterly review"]),
    excludes: LL(["Projets d’envergure (soumis séparément)"], ["Large-scale projects (quoted separately)"]),
  },
];

export const planBySlug = (slug: string) => plans.find((p) => p.slug === slug);
