import type { Localized, LocalizedList } from "../content";

const L = (fr: string, en: string): Localized => ({ fr, en });
const LL = (fr: string[], en: string[]): LocalizedList => ({ fr, en });

export const agents: Array<{ key: string; title: Localized; text: Localized }> = [
  { key: "sales", title: L("Agent commercial", "Sales agent"), text: L("Prépare les suivis, les relances et les résumés d’opportunités.", "Prepares follow-ups, reminders and opportunity summaries.") },
  { key: "marketing", title: L("Agent marketing", "Marketing agent"), text: L("Propose des contenus, des calendriers et des analyses de campagne.", "Proposes content, calendars and campaign analyses.") },
  { key: "prospecting", title: L("Agent de prospection", "Prospecting agent"), text: L("Recherche et qualifie des prospects selon vos critères et vos règles de consentement.", "Researches and qualifies prospects against your criteria and consent rules.") },
  { key: "service", title: L("Agent de service client", "Customer service agent"), text: L("Répond aux questions courantes et oriente les demandes complexes vers une personne.", "Answers common questions and routes complex requests to a person.") },
  { key: "admin", title: L("Agent administratif", "Administrative agent"), text: L("Classe les documents, rédige des brouillons et planifie les rendez-vous.", "Sorts documents, drafts messages and schedules appointments.") },
  { key: "data", title: L("Agent d’analyse de données", "Data analysis agent"), text: L("Consolide vos données et produit des rapports lisibles.", "Consolidates your data and produces readable reports.") },
  { key: "logistics", title: L("Agent de gestion logistique", "Logistics management agent"), text: L("Surveille les stocks, les commandes et les délais, et signale les écarts.", "Watches stock, orders and lead times, and flags deviations.") },
  { key: "operations", title: L("Agent de gestion opérationnelle", "Operations management agent"), text: L("Suit les indicateurs de productivité et alerte sur les dérives.", "Tracks productivity indicators and alerts on drift.") },
  { key: "intel", title: L("Agent de veille concurrentielle", "Competitive monitoring agent"), text: L("Surveille les sources convenues et résume ce qui change sur votre marché.", "Monitors agreed sources and summarizes what changes in your market.") },
  { key: "executive", title: L("Assistant intelligent de direction", "Executive AI assistant"), text: L("Prépare les synthèses, les ordres du jour et les suivis de décisions.", "Prepares briefings, agendas and decision follow-ups.") },
];

export const automations: Array<{ key: string; title: Localized; items: LocalizedList; benefits: Localized }> = [
  { key: "sales", title: L("Automatisation commerciale", "Sales automation"), items: LL(["Recherche et qualification des prospects", "Gestion automatisée des contacts", "Préparation des communications commerciales", "Relance des prospects", "Préparation des soumissions", "Intégration CRM", "Planification des rendez-vous", "Suivi des opportunités", "Analyse des performances de vente"], ["Prospect research and qualification", "Automated contact management", "Preparation of sales communications", "Prospect follow-up", "Bid preparation", "CRM integration", "Appointment scheduling", "Opportunity tracking", "Sales performance analysis"]), benefits: L("Davantage d’opportunités suivies, moins de tâches manuelles, meilleur suivi client, gain de productivité.", "More opportunities followed up, fewer manual tasks, better customer follow-up, productivity gains.") },
  { key: "marketing", title: L("Automatisation marketing", "Marketing automation"), items: LL(["Création assistée de contenu", "Planification des publications", "Campagnes par courriel automatisées", "Segmentation intelligente des audiences", "Personnalisation des communications", "Analyse des campagnes PPC", "Remarketing intelligent", "Optimisation des budgets publicitaires", "Rapports de performance automatisés"], ["Assisted content creation", "Publication scheduling", "Automated email campaigns", "Intelligent audience segmentation", "Communication personalization", "PPC campaign analysis", "Intelligent remarketing", "Ad budget optimization", "Automated performance reports"]), benefits: L("Meilleure exploitation du budget, gain de temps, meilleures conversions, visibilité accrue.", "Better use of budget, time savings, better conversions, greater visibility.") },
  { key: "admin", title: L("Automatisation administrative", "Administrative automation"), items: LL(["Traitement des documents", "Gestion des courriels", "Préparation des rapports", "Organisation des fichiers", "Gestion des rendez-vous", "Extraction intelligente des données", "Automatisation des processus internes", "Coordination des équipes"], ["Document processing", "Email management", "Report preparation", "File organization", "Appointment management", "Intelligent data extraction", "Internal process automation", "Team coordination"]), benefits: L("Moins de coûts administratifs, moins d’erreurs, du temps de travail libéré.", "Lower administrative costs, fewer errors, working time freed.") },
  { key: "operations", title: L("Automatisation opérationnelle et logistique", "Operations and logistics automation"), items: LL(["Gestion intelligente des stocks", "Suivi des inventaires", "Prévision des besoins", "Planification des opérations", "Coordination des fournisseurs", "Suivi des commandes", "Gestion des approvisionnements", "Alertes opérationnelles", "Analyse de la productivité", "Tableaux de bord automatisés"], ["Intelligent inventory management", "Inventory tracking", "Demand forecasting", "Operations planning", "Supplier coordination", "Order tracking", "Supply management", "Operational alerts", "Productivity analysis", "Automated dashboards"]), benefits: L("Moins de pertes, ressources mieux utilisées, délais améliorés, rentabilité accrue.", "Fewer losses, better-used resources, improved lead times, higher profitability.") },
  { key: "intelligence", title: L("Intelligence économique et décisionnelle", "Economic and decision intelligence"), items: LL(["Analyse intelligente des données", "Prévisions commerciales", "Analyse des tendances du marché", "Veille concurrentielle", "Identification des opportunités", "Analyse des risques", "Simulation financière", "Tableaux de bord décisionnels", "Rapports stratégiques automatisés"], ["Intelligent data analysis", "Sales forecasting", "Market trend analysis", "Competitive monitoring", "Opportunity identification", "Risk analysis", "Financial simulation", "Decision dashboards", "Automated strategic reports"]), benefits: L("Décisions mieux éclairées, meilleure anticipation, avantage concurrentiel à construire.", "Better-informed decisions, better anticipation, a competitive advantage to build.") },
  { key: "service", title: L("Service client intelligent", "Intelligent customer service"), items: LL(["Assistants conversationnels", "Chatbots personnalisés", "Assistance multilingue", "Qualification des demandes", "Réponses automatisées", "Gestion des réclamations", "Orientation vers les services appropriés", "Assistance 24 h/24 selon la solution déployée"], ["Conversational assistants", "Custom chatbots", "Multilingual assistance", "Request qualification", "Automated replies", "Complaint handling", "Routing to the right services", "24/7 assistance depending on the solution deployed"]), benefits: L("Réactivité accrue, délais de réponse réduits, meilleure expérience client.", "Greater responsiveness, shorter response times, better customer experience.") },
];

/** Technologies AUREX can connect to. Integration possibilities only: none implies an official partnership. */
export const integrations = ["OpenAI", "Microsoft 365", "Google Workspace", "HubSpot", "Salesforce", "Shopify", "WordPress", "n8n", "Make", "Zapier", "Slack", "Meta Ads", "Google Ads"];

export const aiAcrossExpertise: Array<{ title: Localized; slug: string }> = [
  { title: L("Marketing augmenté par l’IA", "AI-augmented marketing"), slug: "marketing-strategique-numerique" },
  { title: L("Publicité intelligente", "Intelligent advertising"), slug: "publicite-numerique-ppc" },
  { title: L("Développement web intelligent", "Intelligent web development"), slug: "sites-web-solutions-numeriques" },
  { title: L("Relation client automatisée", "Automated customer relations"), slug: "customer-marketing-experience-client" },
  { title: L("Analyse de marché prédictive", "Predictive market analysis"), slug: "analyse-marche-intelligence-economique" },
  { title: L("Conseil stratégique assisté par les données", "Data-assisted strategic consulting"), slug: "conseil-strategique-analyse-affaires" },
  { title: L("Logistique intelligente", "Intelligent logistics"), slug: "logistique-chaine-approvisionnement" },
  { title: L("Optimisation opérationnelle", "Operational optimization"), slug: "solutions-operationnelles" },
  { title: L("Développement commercial automatisé", "Automated business development"), slug: "creation-developpement-croissance" },
  { title: L("Transformation numérique", "Digital transformation"), slug: "intelligence-artificielle-automatisation" },
];

export const governance: Array<{ title: Localized; text: Localized }> = [
  { title: L("Contrôle humain", "Human oversight"), text: L("Chaque agent a un responsable désigné. Les actions sensibles (envoi, paiement, suppression) exigent une validation.", "Every agent has a named owner. Sensitive actions (sending, payment, deletion) require approval.") },
  { title: L("Permissions définies", "Defined permissions"), text: L("Un agent n’accède qu’aux données et aux outils que vous lui autorisez, et rien d’autre.", "An agent only reaches the data and tools you authorize, nothing more.") },
  { title: L("Confidentialité et protection des données", "Confidentiality and data protection"), text: L("Les données de l’entreprise ne servent pas à d’autres fins. Les fournisseurs de modèles sont choisis et documentés avec vous.", "Company data is not used for other purposes. Model providers are chosen and documented with you.") },
  { title: L("Fiabilité et tests", "Reliability and testing"), text: L("Chaque automatisation est documentée, testée avant la mise en service, puis surveillée.", "Every automation is documented, tested before going live, then monitored.") },
  { title: L("Cybersécurité", "Cybersecurity"), text: L("Accès minimaux, secrets protégés et journalisation des actions.", "Minimal access, protected secrets and action logging.") },
];

export const valueFramework: Array<{ title: Localized; text: Localized }> = [
  { title: L("Le problème", "The problem"), text: L("La tâche, le délai ou l’erreur que l’on veut réduire.", "The task, delay or error we want to reduce.") },
  { title: L("La solution", "The solution"), text: L("L’agent ou l’automatisation retenus, et son périmètre.", "The agent or automation chosen, and its scope.") },
  { title: L("Le fonctionnement", "How it works"), text: L("Les déclencheurs, les étapes, les permissions et la supervision.", "Triggers, steps, permissions and oversight.") },
  { title: L("Le temps et les coûts", "Time and costs"), text: L("Les heures libérées et les coûts évités, estimés avec vos chiffres.", "Hours freed and costs avoided, estimated with your figures.") },
  { title: L("L’investissement et le retour", "Investment and return"), text: L("Le coût de mise en place et d’usage, puis le retour estimé.", "The cost of setup and use, then the estimated return.") },
];
