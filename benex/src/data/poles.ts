import type { Localized } from "../content";

export type PoleKey = "strategy" | "marketing" | "digital" | "operations" | "logistics" | "growth";

/** BENEX architecture: six departments plus a transversal AI & Automation unit. Names are proposals to be validated. */
export const poles: Array<{ key: PoleKey; name: string; tagline: Localized }> = [
  { key: "strategy", name: "Strategy", tagline: { fr: "Conseil et analyse d’affaires", en: "Consulting and business analysis" } },
  { key: "marketing", name: "Marketing", tagline: { fr: "Acquisition et publicité", en: "Acquisition and advertising" } },
  { key: "digital", name: "Digital", tagline: { fr: "Sites web et applications", en: "Websites and applications" } },
  { key: "operations", name: "Operations", tagline: { fr: "Performance et organisation", en: "Performance and organization" } },
  { key: "logistics", name: "Logistics", tagline: { fr: "Stocks et approvisionnement", en: "Inventory and supply" } },
  { key: "growth", name: "Growth", tagline: { fr: "Développement des entreprises", en: "Business development" } },
];

export const aiPole = {
  name: "BENEX AI & Automation",
  tagline: { fr: "Intelligence artificielle transversale à tous les départements", en: "Artificial intelligence across every department" } as Localized,
};
