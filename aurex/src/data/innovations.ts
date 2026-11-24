import type { Localized, LocalizedList } from "../content";

const L = (fr: string, en: string): Localized => ({ fr, en });
const LL = (fr: string[], en: string[]): LocalizedList => ({ fr, en });

/**
 * Availability of each offer. This classification is a recommendation to be validated by management before
 * publication: "available" = delivered by the team today, "developing" = being built or piloted, "ambition" = direction only.
 */
export type Availability = "available" | "developing" | "ambition";

export const availabilityLabel: Record<Availability, Localized> = {
  available: L("Disponible", "Available"),
  developing: L("En développement", "In development"),
  ambition: L("Ambition", "Ambition"),
};

/** Seven integrated business solutions, each combining several expertises around one objective. */
export type BusinessSolution = { slug: string; name: string; objective: Localized; client: Localized; includes: LocalizedList; kpis: LocalizedList; expertises: string[] };

export const businessSolutions: BusinessSolution[] = [
  { slug: "business-launch", name: "BUSINESS LAUNCH", objective: L("Créer, structurer et lancer une entreprise.", "Create, structure and launch a business."),
    client: L("Entrepreneurs et jeunes entreprises.", "Entrepreneurs and young companies."),
    includes: LL(["Plan d’affaires et étude de faisabilité", "Positionnement et identité", "Site vitrine et présence numérique", "Plan de lancement et premiers clients"], ["Business plan and feasibility study", "Positioning and identity", "Showcase website and digital presence", "Launch plan and first customers"]),
    kpis: LL(["Délai avant le lancement", "Premiers prospects qualifiés", "Coût d’acquisition initial"], ["Time to launch", "First qualified prospects", "Initial acquisition cost"]),
    expertises: ["creation-developpement-croissance", "conseil-strategique-analyse-affaires", "sites-web-solutions-numeriques"] },
  { slug: "business-growth", name: "BUSINESS GROWTH", objective: L("Acquérir davantage de clients et développer le chiffre d’affaires.", "Win more customers and grow revenue."),
    client: L("PME qui veulent un flux régulier de clients.", "SMEs that want a steady flow of customers."),
    includes: LL(["Stratégie marketing et acquisition", "Campagnes publicitaires et suivi du rendement", "Prospection B2B encadrée", "Fidélisation et relance"], ["Marketing and acquisition strategy", "Advertising campaigns and performance tracking", "Structured B2B prospecting", "Retention and follow-up"]),
    kpis: LL(["Prospects par mois", "Taux de conversion", "Coût d’acquisition client", "Chiffre d’affaires attribué"], ["Prospects per month", "Conversion rate", "Customer acquisition cost", "Attributed revenue"]),
    expertises: ["marketing-strategique-numerique", "publicite-numerique-ppc", "customer-marketing-experience-client"] },
  { slug: "digital-transformation", name: "DIGITAL TRANSFORMATION", objective: L("Moderniser les outils et les infrastructures numériques.", "Modernize digital tools and infrastructure."),
    client: L("Entreprises dont les outils freinent la croissance.", "Companies whose tools hold growth back."),
    includes: LL(["Audit des outils existants", "Plateformes web, CRM et intégrations", "Migration et formation des équipes", "Maintenance et évolution"], ["Audit of existing tools", "Web platforms, CRM and integrations", "Migration and team training", "Maintenance and evolution"]),
    kpis: LL(["Temps de traitement d’une demande", "Adoption des outils", "Disponibilité du site"], ["Request handling time", "Tool adoption", "Site availability"]),
    expertises: ["sites-web-solutions-numeriques", "conseil-strategique-analyse-affaires", "solutions-operationnelles"] },
  { slug: "ai-automation", name: "AI & AUTOMATION", objective: L("Automatiser les activités et intégrer des agents intelligents.", "Automate activities and integrate intelligent agents."),
    client: L("Équipes submergées par les tâches répétitives.", "Teams overwhelmed by repetitive tasks."),
    includes: LL(["Cartographie des tâches automatisables", "Automatisations commerciales, administratives et marketing", "Agents IA supervisés", "Gouvernance, sécurité et formation"], ["Mapping of automatable tasks", "Sales, administrative and marketing automations", "Supervised AI agents", "Governance, security and training"]),
    kpis: LL(["Heures économisées par mois", "Délai de réponse", "Taux d’erreur"], ["Hours saved per month", "Response time", "Error rate"]),
    expertises: ["intelligence-artificielle-automatisation", "solutions-operationnelles", "marketing-strategique-numerique"] },
  { slug: "operational-excellence", name: "OPERATIONAL EXCELLENCE", objective: L("Réduire les coûts, améliorer la productivité et optimiser les opérations.", "Reduce costs, improve productivity and optimize operations."),
    client: L("Entreprises dont les marges s’érodent.", "Companies whose margins are eroding."),
    includes: LL(["Audit opérationnel", "Optimisation et standardisation des processus", "Tableaux de bord de performance", "Gestion du changement et amélioration continue"], ["Operational audit", "Process optimization and standardization", "Performance dashboards", "Change management and continuous improvement"]),
    kpis: LL(["Coût unitaire d’un processus", "Productivité par employé", "Taux de reprise"], ["Unit cost of a process", "Productivity per employee", "Rework rate"]),
    expertises: ["solutions-operationnelles", "intelligence-artificielle-automatisation", "conseil-strategique-analyse-affaires"] },
  { slug: "supply-chain-performance", name: "SUPPLY CHAIN PERFORMANCE", objective: L("Optimiser les stocks, les approvisionnements et la logistique.", "Optimize inventory, procurement and logistics."),
    client: L("Distributeurs, commerçants et manufacturiers.", "Distributors, retailers and manufacturers."),
    includes: LL(["Diagnostic des flux et des stocks", "Prévision de la demande", "Coordination des fournisseurs et traçabilité", "Indicateurs logistiques"], ["Flow and inventory diagnostic", "Demand forecasting", "Supplier coordination and traceability", "Logistics indicators"]),
    kpis: LL(["Rotation des stocks", "Taux de rupture", "Coût logistique par commande"], ["Inventory turnover", "Stock-out rate", "Logistics cost per order"]),
    expertises: ["logistique-chaine-approvisionnement", "solutions-operationnelles", "intelligence-artificielle-automatisation"] },
  { slug: "enterprise-transformation", name: "ENTERPRISE TRANSFORMATION", objective: L("Accompagner la transformation globale d’une organisation.", "Support the overall transformation of an organization."),
    client: L("Organisations qui transforment plusieurs départements à la fois.", "Organizations transforming several departments at once."),
    includes: LL(["Diagnostic global et feuille de route", "Pilotage intégré de plusieurs chantiers", "Gouvernance, risques et conformité", "Suivi des résultats par indicateurs"], ["Global diagnostic and roadmap", "Integrated management of several workstreams", "Governance, risk and compliance", "Results tracking through indicators"]),
    kpis: LL(["Avancement de la feuille de route", "Indicateurs par département", "Adoption par les équipes"], ["Roadmap progress", "Indicators per department", "Team adoption"]),
    expertises: ["conseil-strategique-analyse-affaires", "solutions-operationnelles", "intelligence-artificielle-automatisation", "sites-web-solutions-numeriques"] },
];

/** Automation catalogue with a recommended availability status (to validate). */
export const automationCatalog: Array<{ key: string; title: Localized; text: Localized; status: Availability }> = [
  { key: "sales", title: L("Automatisation commerciale", "Sales automation"), text: L("Qualification des demandes, relances et suivi du pipeline.", "Lead qualification, follow-ups and pipeline tracking."), status: "available" },
  { key: "admin", title: L("Automatisation administrative", "Administrative automation"), text: L("Classement, courriels types, rappels et préparation de documents.", "Filing, template e-mails, reminders and document preparation."), status: "available" },
  { key: "marketing", title: L("Automatisation marketing", "Marketing automation"), text: L("Calendriers, courriels automatisés et rapports de campagne.", "Calendars, automated e-mails and campaign reports."), status: "available" },
  { key: "quotes", title: L("Automatisation des soumissions", "Quote automation"), text: L("Modèles de soumission, calculs et relances de suivi.", "Quote templates, calculations and follow-up reminders."), status: "available" },
  { key: "reports", title: L("Automatisation des rapports", "Report automation"), text: L("Rapports et tableaux de bord alimentés par vos données.", "Reports and dashboards fed by your data."), status: "available" },
  { key: "service", title: L("Automatisation du service client", "Customer service automation"), text: L("Assistants conversationnels et acheminement des demandes.", "Conversational assistants and request routing."), status: "available" },
  { key: "documents", title: L("Automatisation documentaire", "Document automation"), text: L("Extraction, classement et rédaction de brouillons.", "Extraction, filing and draft writing."), status: "developing" },
  { key: "billing", title: L("Automatisation de la facturation", "Billing automation"), text: L("Facturation récurrente, rappels de paiement et rapprochements.", "Recurring invoicing, payment reminders and reconciliation."), status: "developing" },
  { key: "hr", title: L("Automatisation des ressources humaines", "HR automation"), text: L("Accueil des employés, demandes internes et suivi des dossiers.", "Employee onboarding, internal requests and file tracking."), status: "developing" },
  { key: "prospecting", title: L("Automatisation de la prospection", "Prospecting automation"), text: L("Recherche de prospects, dans le respect du consentement et de la LCAP.", "Prospect research, within consent rules and CASL."), status: "developing" },
  { key: "integration", title: L("Intégration des logiciels métiers", "Business software integration"), text: L("Connexion de vos outils par API et plateformes d’automatisation.", "Connecting your tools through APIs and automation platforms."), status: "developing" },
  { key: "multiagent", title: L("Systèmes multiagents", "Multi-agent systems"), text: L("Plusieurs agents IA qui se répartissent les tâches sous supervision humaine.", "Several AI agents sharing tasks under human supervision."), status: "ambition" },
];

/** Services judged worth adding after benchmarking; each has a rationale and a recommended status. */
export const innovationIdeas: Array<{ key: string; title: Localized; text: Localized; status: Availability }> = [
  { key: "aeo", title: L("Visibilité dans les moteurs de réponse IA", "Visibility in AI answer engines"), text: L("Contenus structurés pour être cités par les assistants et moteurs de recherche assistés par IA (SEO, AEO).", "Structured content to be cited by assistants and AI-assisted search engines (SEO, AEO)."), status: "available" },
  { key: "pilot100", title: L("Projet pilote IA en 100 jours", "100-day AI pilot"), text: L("Un cas d’usage cadré, mesuré et livré en cent jours, avant toute extension.", "One scoped, measured use case delivered in a hundred days, before any extension."), status: "available" },
  { key: "training", title: L("Formation et accompagnement à l’IA", "AI training and coaching"), text: L("Ateliers pratiques pour que les équipes utilisent l’IA avec méthode et prudence.", "Hands-on workshops so teams use AI with method and care."), status: "available" },
  { key: "governance", title: L("Cadre de gouvernance de l’IA", "AI governance framework"), text: L("Politique d’usage, registre des outils, règles sur les renseignements personnels et revue humaine.", "Usage policy, tool register, personal-information rules and human review."), status: "available" },
  { key: "dashboard", title: L("Tableau de bord de pilotage", "Management dashboard"), text: L("Ventes, marketing, opérations et finances réunis dans une vue unique.", "Sales, marketing, operations and finance in a single view."), status: "developing" },
  { key: "monitoring", title: L("Veille concurrentielle assistée", "Assisted competitive monitoring"), text: L("Surveillance de sources convenues et synthèses périodiques sur votre marché.", "Monitoring of agreed sources and periodic summaries of your market."), status: "developing" },
  { key: "fractional", title: L("Direction marketing ou opérations à temps partiel", "Fractional marketing or operations lead"), text: L("Un responsable expérimenté, quelques jours par mois, pour piloter sans embaucher à temps plein.", "An experienced lead, a few days a month, to steer without a full-time hire."), status: "developing" },
  { key: "predictive", title: L("Prévisions de ventes et de demande", "Sales and demand forecasting"), text: L("Modèles prédictifs appuyés sur vos données historiques, avec marges d’erreur expliquées.", "Predictive models built on your historical data, with explained error margins."), status: "ambition" },
  { key: "platform", title: L("Plateforme AUREX d’outils pour PME", "AUREX toolkit platform for SMEs"), text: L("Calculateurs, diagnostics et tableaux de bord offerts par abonnement.", "Calculators, diagnostics and dashboards offered by subscription."), status: "ambition" },
];
