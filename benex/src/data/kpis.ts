import type { Localized } from "../content";

export type KpiKey = "roi" | "roas" | "cac" | "conversion" | "revenue" | "margin" | "opcost" | "productivity" | "timeSaved" | "retention";

/** Plain definitions of the indicators used across the site. Formulas only: no figure here is a result. */
export const kpis: Record<KpiKey, { label: Localized; definition: Localized; formula: Localized }> = {
  roi: {
    label: { fr: "Retour sur investissement (ROI)", en: "Return on investment (ROI)" },
    definition: { fr: "Ce qu’un investissement rapporte par rapport à ce qu’il a coûté.", en: "What an investment returns compared with what it cost." },
    formula: { fr: "(gain − coût) ÷ coût", en: "(gain − cost) ÷ cost" },
  },
  roas: {
    label: { fr: "Rendement publicitaire (ROAS)", en: "Return on ad spend (ROAS)" },
    definition: { fr: "Les revenus générés pour chaque dollar investi en publicité.", en: "Revenue generated for every dollar spent on advertising." },
    formula: { fr: "revenus attribuables ÷ dépenses publicitaires", en: "attributable revenue ÷ ad spend" },
  },
  cac: {
    label: { fr: "Coût d’acquisition client (CAC)", en: "Customer acquisition cost (CAC)" },
    definition: { fr: "Ce qu’il en coûte, en moyenne, pour obtenir un nouveau client.", en: "What it costs, on average, to win a new customer." },
    formula: { fr: "dépenses d’acquisition ÷ nouveaux clients", en: "acquisition spend ÷ new customers" },
  },
  conversion: {
    label: { fr: "Taux de conversion", en: "Conversion rate" },
    definition: { fr: "La part des visiteurs ou des prospects qui passent à l’action souhaitée.", en: "The share of visitors or prospects who take the desired action." },
    formula: { fr: "conversions ÷ visiteurs ou prospects", en: "conversions ÷ visitors or prospects" },
  },
  revenue: {
    label: { fr: "Chiffre d’affaires", en: "Revenue" },
    definition: { fr: "Le total des ventes sur une période donnée.", en: "Total sales over a given period." },
    formula: { fr: "nombre de ventes × valeur moyenne d’une vente", en: "number of sales × average sale value" },
  },
  margin: {
    label: { fr: "Marge bénéficiaire", en: "Profit margin" },
    definition: { fr: "La part du chiffre d’affaires qui reste après les coûts.", en: "The share of revenue left after costs." },
    formula: { fr: "(revenus − coûts) ÷ revenus", en: "(revenue − costs) ÷ revenue" },
  },
  opcost: {
    label: { fr: "Coûts opérationnels", en: "Operating costs" },
    definition: { fr: "Les dépenses nécessaires pour faire fonctionner l’entreprise au quotidien.", en: "The expenses needed to run the business day to day." },
    formula: { fr: "somme des dépenses d’exploitation sur la période", en: "sum of operating expenses over the period" },
  },
  productivity: {
    label: { fr: "Productivité", en: "Productivity" },
    definition: { fr: "Ce qu’une équipe produit pour chaque heure de travail.", en: "What a team produces for each hour of work." },
    formula: { fr: "production ÷ heures travaillées", en: "output ÷ hours worked" },
  },
  timeSaved: {
    label: { fr: "Temps économisé", en: "Time saved" },
    definition: { fr: "Les heures libérées par une tâche simplifiée ou automatisée.", en: "Hours freed by a task that is simplified or automated." },
    formula: { fr: "heures avant − heures après", en: "hours before − hours after" },
  },
  retention: {
    label: { fr: "Taux de fidélisation", en: "Retention rate" },
    definition: { fr: "La part des clients qui restent d’une période à l’autre.", en: "The share of customers who stay from one period to the next." },
    formula: { fr: "clients conservés ÷ clients au départ", en: "customers kept ÷ customers at the start" },
  },
};
