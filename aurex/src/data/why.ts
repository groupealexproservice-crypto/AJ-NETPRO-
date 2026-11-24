import type { Localized } from "../content";

const L = (fr: string, en: string): Localized => ({ fr, en });

export const methodSteps = [
  { number: "01", title: L("Diagnostic", "Diagnostic"), text: L("Comprendre l’entreprise, ses difficultés, ses ambitions et ses performances actuelles.", "Understand the business, its difficulties, its ambitions and its current performance.") },
  { number: "02", title: L("Analyse", "Analysis"), text: L("Identifier les opportunités, les risques et les leviers de croissance.", "Identify opportunities, risks and growth levers.") },
  { number: "03", title: L("Stratégie", "Strategy"), text: L("Construire une feuille de route personnalisée.", "Build a tailored roadmap.") },
  { number: "04", title: L("Déploiement", "Deployment"), text: L("Mettre en œuvre les solutions sélectionnées.", "Implement the selected solutions.") },
  { number: "05", title: L("Mesure", "Measurement"), text: L("Suivre les résultats à travers des indicateurs précis.", "Track results through precise indicators.") },
  { number: "06", title: L("Optimisation", "Optimization"), text: L("Améliorer continuellement les performances et accompagner la croissance.", "Continuously improve performance and support growth.") },
];

export const whyAurex: Array<{ title: Localized; text: Localized }> = [
  { title: L("Une approche multidisciplinaire", "A multidisciplinary approach"), text: L("Marketing, stratégie, technologie et opérations réunis, au lieu de plusieurs fournisseurs qui ne se parlent pas.", "Marketing, strategy, technology and operations together, instead of several suppliers who do not talk to each other.") },
  { title: L("Un interlocuteur pour plusieurs expertises", "One contact for several areas of expertise"), text: L("Une seule relation, des priorités communes et une coordination assumée.", "One relationship, shared priorities and coordination we take ownership of.") },
  { title: L("Des solutions personnalisées", "Tailored solutions"), text: L("Chaque mandat part de votre situation, pas d’un forfait standard.", "Every mandate starts from your situation, not a standard package.") },
  { title: L("Des tarifs transparents et compétitifs", "Transparent, competitive pricing"), text: L("Des devis détaillés qui distinguent honoraires, coûts d’outils et budgets publicitaires.", "Detailed proposals that separate fees, tool costs and advertising budgets.") },
  { title: L("Une approche orientée rentabilité", "A profitability-driven approach"), text: L("Chaque recommandation est reliée à un effet sur vos revenus, vos coûts ou vos marges.", "Every recommendation is tied to an effect on your revenue, costs or margins.") },
  { title: L("L’intégration de technologies modernes", "Integration of modern technology"), text: L("Intelligence artificielle, automatisation et outils connectés, déployés avec des garde-fous.", "Artificial intelligence, automation and connected tools, deployed with safeguards.") },
  { title: L("Une vision stratégique à long terme", "A long-term strategic vision"), text: L("Des gains rapides quand ils existent, sans sacrifier la solidité de l’entreprise.", "Quick wins when they exist, without sacrificing the strength of the business.") },
  { title: L("Un accompagnement humain", "Human support"), text: L("Des personnes qui prennent le temps de vous écouter et de former vos équipes.", "People who take the time to listen to you and train your teams.") },
  { title: L("Des décisions fondées sur les données", "Data-based decisions"), text: L("Les faits d’abord, l’intuition ensuite, et toujours une hypothèse écrite.", "Facts first, intuition second, and always a written assumption.") },
  { title: L("Des résultats suivis et mesurables", "Tracked, measurable results"), text: L("Des indicateurs convenus au départ et des rapports réguliers.", "Indicators agreed at the start and regular reports.") },
];

export const trustKinds = ["testimonial", "partner", "certification", "report", "team"] as const;
export type TrustKind = (typeof trustKinds)[number];

export const trustLabels: Record<TrustKind, Localized> = {
  testimonial: L("Témoignages vérifiés", "Verified testimonials"),
  partner: L("Partenaires", "Partners"),
  certification: L("Certifications", "Certifications"),
  report: L("Rapports de performance", "Performance reports"),
  team: L("Équipe", "Team"),
};
