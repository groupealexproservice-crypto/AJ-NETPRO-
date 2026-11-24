import type { Localized, LocalizedList } from "../content";

const L = (fr: string, en: string): Localized => ({ fr, en });
const LL = (fr: string[], en: string[]): LocalizedList => ({ fr, en });

/** What a visitor wants to achieve. Each outcome points to the expertise that delivers it. */
export const outcomes: Array<{ key: string; title: Localized; text: Localized; expertises: string[] }> = [
  { key: "clients", title: L("Gagner davantage de clients", "Win more customers"), text: L("Visibilité, acquisition, publicité et prospection B2B organisées autour d’un pipeline suivi.", "Visibility, acquisition, advertising and B2B prospecting organized around a tracked pipeline."), expertises: ["marketing-strategique-numerique", "publicite-numerique-ppc", "creation-developpement-croissance"] },
  { key: "revenue", title: L("Augmenter le chiffre d’affaires", "Increase revenue"), text: L("Meilleure conversion, ventes complémentaires, fidélisation et nouveaux marchés.", "Better conversion, cross-selling, retention and new markets."), expertises: ["sites-web-solutions-numeriques", "customer-marketing-experience-client", "analyse-marche-intelligence-economique"] },
  { key: "costs", title: L("Réduire les coûts", "Reduce costs"), text: L("Processus simplifiés, tâches automatisées et dépenses mieux contrôlées.", "Simplified processes, automated tasks and better-controlled spending."), expertises: ["solutions-operationnelles", "intelligence-artificielle-automatisation"] },
  { key: "operations", title: L("Optimiser les opérations", "Optimize operations"), text: L("Organisation, logistique et tableaux de bord pour décider avec des faits.", "Organization, logistics and dashboards to decide with facts."), expertises: ["solutions-operationnelles", "logistique-chaine-approvisionnement"] },
  { key: "profitability", title: L("Améliorer la rentabilité", "Improve profitability"), text: L("Analyse des marges, des risques et des priorités avant d’investir.", "Analysis of margins, risks and priorities before investing."), expertises: ["conseil-strategique-analyse-affaires", "publicite-numerique-ppc"] },
  { key: "growth", title: L("Construire une croissance durable", "Build sustainable growth"), text: L("Une entreprise structurée, une feuille de route et des indicateurs suivis dans le temps.", "A structured business, a roadmap and indicators tracked over time."), expertises: ["creation-developpement-croissance", "conseil-strategique-analyse-affaires"] },
];

export type Tier = {
  slug: string;
  name: string;
  verb: Localized;
  audience: Localized;
  includes: LocalizedList;
  expertises: string[];
  deliverables: LocalizedList;
  support: LocalizedList;
  economics: LocalizedList;
  conditions: LocalizedList;
};

const standardConditions = LL(["Tarif et délai établis par devis après un diagnostic partagé.", "Montants en dollars canadiens (CAD), taxes en sus.", "Résultats suivis par des indicateurs convenus ; aucune performance n’est garantie."], ["Rate and timeline set by proposal after a shared diagnostic.", "Amounts in Canadian dollars (CAD), taxes extra.", "Results tracked through agreed indicators; no performance is guaranteed."]);

/** Content of the four tiers is a proposal for management to validate; prices and timelines are entered in the administration. */
export const tiers: Tier[] = [
  {
    slug: "essentiel", name: "ESSENTIEL", verb: L("Lancer", "Launch"),
    audience: L("Entrepreneurs et petites entreprises qui construisent leurs bases commerciales et numériques.", "Entrepreneurs and small businesses building their commercial and digital foundations."),
    includes: LL(["Diagnostic de départ et priorités", "Modèle d’affaires et offre structurée", "Identité de marque essentielle", "Site vitrine ou présence numérique de base", "Plan de lancement"], ["Starting diagnostic and priorities", "Business model and structured offer", "Essential brand identity", "Showcase site or basic digital presence", "Launch plan"]),
    expertises: ["creation-developpement-croissance", "sites-web-solutions-numeriques", "marketing-strategique-numerique"],
    deliverables: LL(["Dossier de positionnement et plan de lancement", "Identité et supports essentiels", "Site en ligne et suivi de base"], ["Positioning file and launch plan", "Essential identity and materials", "Live site and basic tracking"]),
    support: LL(["Rencontres de lancement et de revue", "Documentation remise à la fin du mandat"], ["Launch and review meetings", "Documentation handed over at the end of the mandate"]),
    economics: LL(["Démarrer sur des bases solides plutôt que corriger plus tard.", "Éviter les dépenses dispersées dès le lancement."], ["Start on solid foundations instead of fixing later.", "Avoid scattered spending from the launch."]),
    conditions: standardConditions,
  },
  {
    slug: "performance", name: "PERFORMANCE", verb: L("Développer", "Grow"),
    audience: L("Entreprises qui veulent acquérir plus de clients, optimiser leur marketing et augmenter leurs ventes.", "Businesses that want more customers, better marketing and higher sales."),
    includes: LL(["Stratégie marketing et acquisition", "Campagnes publicitaires (PPC) et suivi des conversions", "Référencement naturel (SEO)", "CRM et automatisations de suivi", "Rapport de rendement (ROAS, CAC)"], ["Marketing and acquisition strategy", "Advertising (PPC) campaigns and conversion tracking", "Search engine optimization (SEO)", "CRM and follow-up automations", "Return report (ROAS, CAC)"]),
    expertises: ["marketing-strategique-numerique", "customer-marketing-experience-client", "publicite-numerique-ppc"],
    deliverables: LL(["Plan d’acquisition et campagnes configurées", "CRM et séquences de suivi", "Tableau de bord mensuel"], ["Acquisition plan and configured campaigns", "CRM and follow-up sequences", "Monthly dashboard"]),
    support: LL(["Abonnement mensuel ou mandat de projet", "Revue mensuelle des indicateurs"], ["Monthly subscription or project mandate", "Monthly indicator review"]),
    economics: LL(["Concentrer le budget sur ce qui produit des clients.", "Rendre le coût d’acquisition visible et pilotable."], ["Concentrate budget on what produces customers.", "Make acquisition cost visible and manageable."]),
    conditions: standardConditions,
  },
  {
    slug: "business", name: "BUSINESS", verb: L("Optimiser", "Optimize"),
    audience: L("Entreprises qui veulent améliorer leur organisation, leur logistique, leur rentabilité et leur performance globale.", "Businesses that want to improve their organization, logistics, profitability and overall performance."),
    includes: LL(["Audit des opérations et des processus", "Analyse de rentabilité et des coûts", "Organisation logistique et gestion des stocks", "Standardisation des procédures", "Tableaux de bord de performance"], ["Operations and process audit", "Profitability and cost analysis", "Logistics organization and inventory management", "Procedure standardization", "Performance dashboards"]),
    expertises: ["solutions-operationnelles", "logistique-chaine-approvisionnement", "conseil-strategique-analyse-affaires"],
    deliverables: LL(["Diagnostic et plan d’optimisation chiffré", "Procédures et règles de gestion", "Tableaux de bord opérationnels"], ["Diagnostic and costed optimization plan", "Procedures and management rules", "Operational dashboards"]),
    support: LL(["Accompagnement des responsables", "Amélioration continue sur abonnement"], ["Coaching of managers", "Continuous improvement by subscription"]),
    economics: LL(["Repérer les coûts évitables et les gaspillages.", "Protéger les marges en gagnant en productivité."], ["Spot avoidable costs and waste.", "Protect margins by gaining productivity."]),
    conditions: standardConditions,
  },
  {
    slug: "enterprise", name: "ENTERPRISE", verb: L("Transformer", "Transform"),
    audience: L("Organisations qui ont besoin d’un accompagnement stratégique, technologique et opérationnel personnalisé.", "Organizations that need tailored strategic, technological and operational support."),
    includes: LL(["Diagnostic global et gouvernance", "Combinaison personnalisée des expertises", "Intelligence artificielle et automatisation", "Pilotage de projet et comité de suivi", "Direction externalisée (AUREX 360), selon le besoin"], ["Global diagnostic and governance", "Tailored combination of expertise", "Artificial intelligence and automation", "Project steering and review committee", "Outsourced leadership (AUREX 360), as needed"]),
    expertises: ["conseil-strategique-analyse-affaires", "intelligence-artificielle-automatisation", "solutions-operationnelles", "creation-developpement-croissance"],
    deliverables: LL(["Feuille de route intégrée", "Comité de pilotage et indicateurs communs", "Plans de projet coordonnés"], ["Integrated roadmap", "Steering committee and shared indicators", "Coordinated project plans"]),
    support: LL(["Équipe pluridisciplinaire dédiée", "Un interlocuteur unique pour l’ensemble des chantiers"], ["Dedicated multidisciplinary team", "A single point of contact across all workstreams"]),
    economics: LL(["Aligner les initiatives plutôt que les multiplier.", "Décider plus vite, avec des données communes."], ["Align initiatives instead of multiplying them.", "Decide faster, with shared data."]),
    conditions: standardConditions,
  },
];

export const aiTiers: Tier[] = [
  {
    slug: "ai-start", name: "AI START", verb: L("Amorcer", "Begin"),
    audience: L("Entrepreneurs et petites entreprises qui veulent une première intégration de l’intelligence artificielle.", "Entrepreneurs and small businesses wanting a first integration of artificial intelligence."),
    includes: LL(["Repérage des cas d’usage à forte valeur", "Un assistant ou une automatisation pilote", "Règles d’utilisation et de confidentialité", "Formation de base de l’équipe"], ["Identification of high-value use cases", "One pilot assistant or automation", "Usage and confidentiality rules", "Basic team training"]),
    expertises: ["intelligence-artificielle-automatisation"],
    deliverables: LL(["Feuille de route des cas d’usage", "Solution pilote documentée"], ["Use-case roadmap", "Documented pilot solution"]),
    support: LL(["Suivi des premières semaines d’utilisation"], ["Follow-up of the first weeks of use"]),
    economics: LL(["Mesurer le temps libéré avant d’étendre."], ["Measure the time freed before expanding."]),
    conditions: standardConditions,
  },
  {
    slug: "ai-business", name: "AI BUSINESS", verb: L("Automatiser", "Automate"),
    audience: L("Entreprises qui veulent automatiser des processus commerciaux et administratifs.", "Businesses wanting to automate commercial and administrative processes."),
    includes: LL(["Automatisation commerciale et suivi de prospects", "Automatisation administrative (documents, courriels, rapports)", "Intégration à votre CRM et à vos outils", "Tableaux de bord de suivi"], ["Sales automation and prospect follow-up", "Administrative automation (documents, email, reports)", "Integration with your CRM and tools", "Tracking dashboards"]),
    expertises: ["intelligence-artificielle-automatisation", "creation-developpement-croissance"],
    deliverables: LL(["Automatisations configurées et testées", "Documentation et procédures de supervision"], ["Configured, tested automations", "Documentation and oversight procedures"]),
    support: LL(["Maintenance et ajustements sur abonnement"], ["Maintenance and adjustments by subscription"]),
    economics: LL(["Réduire les tâches manuelles et accélérer le suivi."], ["Cut manual tasks and speed up follow-up."]),
    conditions: standardConditions,
  },
  {
    slug: "ai-performance", name: "AI PERFORMANCE", verb: L("Déployer", "Deploy"),
    audience: L("Entreprises qui veulent déployer plusieurs agents intelligents et optimiser leurs opérations.", "Businesses wanting to deploy several intelligent agents and optimize operations."),
    includes: LL(["Plusieurs agents (commercial, marketing, service client, opérations)", "Automatisation logistique et opérationnelle", "Intelligence décisionnelle et tableaux de bord", "Gouvernance, permissions et journalisation"], ["Several agents (sales, marketing, customer service, operations)", "Logistics and operational automation", "Decision intelligence and dashboards", "Governance, permissions and logging"]),
    expertises: ["intelligence-artificielle-automatisation", "solutions-operationnelles", "logistique-chaine-approvisionnement"],
    deliverables: LL(["Agents configurés avec permissions définies", "Plan de supervision et de contrôle de qualité"], ["Configured agents with defined permissions", "Oversight and quality-control plan"]),
    support: LL(["Équipe d’accompagnement et revue périodique"], ["Support team and periodic review"]),
    economics: LL(["Augmenter la capacité sans augmenter proportionnellement les effectifs."], ["Increase capacity without a proportional increase in headcount."]),
    conditions: standardConditions,
  },
  {
    slug: "ai-enterprise", name: "AI ENTERPRISE", verb: L("Transformer", "Transform"),
    audience: L("Organisations qui visent une transformation technologique personnalisée à l’échelle de l’organisation.", "Organizations aiming for a tailored, organization-wide technology transformation."),
    includes: LL(["Stratégie IA et gouvernance à l’échelle", "Architecture d’intégration avec vos systèmes", "Sécurité, conformité et contrôle humain", "Conduite du changement et formation"], ["AI strategy and governance at scale", "Integration architecture with your systems", "Security, compliance and human oversight", "Change management and training"]),
    expertises: ["intelligence-artificielle-automatisation", "conseil-strategique-analyse-affaires"],
    deliverables: LL(["Feuille de route de transformation", "Solutions intégrées et documentées"], ["Transformation roadmap", "Integrated, documented solutions"]),
    support: LL(["Équipe dédiée, comité de gouvernance"], ["Dedicated team, governance committee"]),
    economics: LL(["Industrialiser les cas d’usage qui ont fait leurs preuves."], ["Scale the use cases that have proven themselves."]),
    conditions: standardConditions,
  },
];

export const formats: Array<{ key: string; title: Localized; text: Localized }> = [
  { key: "service", title: L("Prestation individuelle", "Individual service"), text: L("Un besoin précis, un périmètre fermé, un devis. Idéal pour un diagnostic, un site, une étude ou une campagne.", "One clear need, a closed scope, one proposal. Ideal for a diagnostic, a site, a study or a campaign.") },
  { key: "subscription", title: L("Abonnement mensuel", "Monthly subscription"), text: L("Une équipe disponible chaque mois pour piloter, optimiser et rendre compte. Le périmètre est défini au devis.", "A team available every month to steer, optimize and report. The scope is defined in the proposal.") },
  { key: "custom", title: L("Intervention sur mesure", "Tailored engagement"), text: L("Une combinaison d’expertises construite autour de votre situation, pour les besoins plus larges ou plus complexes.", "A combination of expertise built around your situation, for broader or more complex needs.") },
];

/** The four cost components of an AI engagement, explained without amounts. */
export const aiCosts: Array<{ title: Localized; text: Localized }> = [
  { title: L("Installation", "Setup"), text: L("Cadrage, configuration, intégrations, tests et documentation. Facturée une fois, selon le périmètre.", "Scoping, configuration, integrations, testing and documentation. Billed once, according to scope.") },
  { title: L("Maintenance", "Maintenance"), text: L("Surveillance, correctifs et ajustements. Souvent mensuelle, selon la criticité des automatisations.", "Monitoring, fixes and adjustments. Often monthly, depending on how critical the automations are.") },
  { title: L("Utilisation", "Usage"), text: L("Licences et consommation des services tiers (modèles d’IA, outils connectés). Indiquées séparément, au coût réel.", "Licences and consumption of third-party services (AI models, connected tools). Shown separately, at actual cost.") },
  { title: L("Accompagnement", "Support"), text: L("Formation, suivi d’adoption et évolution des cas d’usage, à la demande ou en abonnement.", "Training, adoption follow-up and evolution of use cases, on demand or by subscription.") },
];

/** Which expertises AUREX would bring first to each industry. The single source for "related" links in both directions. */
export const sectorExpertises: Record<string, string[]> = {
  "pme-entrepreneurs": ["creation-developpement-croissance", "conseil-strategique-analyse-affaires", "marketing-strategique-numerique"],
  "commerce-detail": ["customer-marketing-experience-client", "logistique-chaine-approvisionnement", "marketing-strategique-numerique"],
  "commerce-electronique": ["sites-web-solutions-numeriques", "publicite-numerique-ppc", "customer-marketing-experience-client"],
  "construction-immobilier": ["creation-developpement-croissance", "sites-web-solutions-numeriques", "solutions-operationnelles"],
  "industrie-fabrication": ["solutions-operationnelles", "logistique-chaine-approvisionnement", "intelligence-artificielle-automatisation"],
  "transport-logistique": ["logistique-chaine-approvisionnement", "solutions-operationnelles", "intelligence-artificielle-automatisation"],
  "hotellerie-restauration": ["marketing-strategique-numerique", "customer-marketing-experience-client", "solutions-operationnelles"],
  "services-professionnels": ["marketing-strategique-numerique", "creation-developpement-croissance", "intelligence-artificielle-automatisation"],
  "entretien-maintenance": ["marketing-strategique-numerique", "solutions-operationnelles", "creation-developpement-croissance"],
  "sport-bien-etre": ["customer-marketing-experience-client", "marketing-strategique-numerique", "sites-web-solutions-numeriques"],
  "sante": ["sites-web-solutions-numeriques", "solutions-operationnelles", "intelligence-artificielle-automatisation"],
  "grandes-organisations": ["conseil-strategique-analyse-affaires", "solutions-operationnelles", "intelligence-artificielle-automatisation"],
  "technologies-innovation": ["analyse-marche-intelligence-economique", "creation-developpement-croissance", "conseil-strategique-analyse-affaires"],
};
