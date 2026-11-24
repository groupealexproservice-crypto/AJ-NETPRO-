import type { Localized } from "../content";

export type PoleKey = "strategy" | "marketing" | "media" | "digital" | "intelligence" | "automation" | "operations" | "logistics" | "growth";

/** AUREX architecture: nine departments, with AI built into each. Names are proposals to be validated. `expertise` is the page each department opens. */
export const poles: Array<{ key: PoleKey; name: string; tagline: Localized; expertise: string }> = [
  { key: "strategy", name: "Strategy", tagline: { fr: "Conseil et analyse d’affaires", en: "Consulting and business analysis" }, expertise: "conseil-strategique-analyse-affaires" },
  { key: "marketing", name: "Marketing", tagline: { fr: "Marque, contenu et fidélisation", en: "Brand, content and retention" }, expertise: "marketing-strategique-numerique" },
  { key: "media", name: "Media & Advertising", tagline: { fr: "Campagnes et rendement publicitaire", en: "Campaigns and advertising performance" }, expertise: "publicite-numerique-ppc" },
  { key: "digital", name: "Digital", tagline: { fr: "Sites web et plateformes", en: "Websites and platforms" }, expertise: "sites-web-solutions-numeriques" },
  { key: "intelligence", name: "Intelligence", tagline: { fr: "IA, données et décision", en: "AI, data and decisions" }, expertise: "intelligence-artificielle-automatisation" },
  { key: "automation", name: "Automation", tagline: { fr: "Processus et agents automatisés", en: "Automated processes and agents" }, expertise: "intelligence-artificielle-automatisation" },
  { key: "operations", name: "Operations", tagline: { fr: "Performance et organisation", en: "Performance and organization" }, expertise: "solutions-operationnelles" },
  { key: "logistics", name: "Supply Chain", tagline: { fr: "Stocks et approvisionnement", en: "Inventory and supply" }, expertise: "logistique-chaine-approvisionnement" },
  { key: "growth", name: "Growth", tagline: { fr: "Développement des entreprises", en: "Business development" }, expertise: "creation-developpement-croissance" },
];

export const aiPole = {
  name: "AUREX AI & Automation",
  tagline: { fr: "Intelligence artificielle transversale à tous les départements", en: "Artificial intelligence across every department" } as Localized,
};
