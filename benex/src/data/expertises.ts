import type { Localized, LocalizedList } from "../content";
import type { KpiKey } from "./kpis";
import type { PoleKey } from "./poles";

const L = (fr: string, en: string): Localized => ({ fr, en });
const LL = (fr: string[], en: string[]): LocalizedList => ({ fr, en });

export type Expertise = {
  slug: string;
  letter: string;
  /** Department it belongs to; "ai" is the transversal unit. */
  pole: PoleKey | "ai";
  title: Localized;
  short: Localized;
  intro: Localized;
  problems: LocalizedList;
  solution: Localized;
  approach: LocalizedList;
  services: LocalizedList;
  deliverables: LocalizedList;
  benefits: LocalizedList;
  kpis: KpiKey[];
  ai: Localized;
  pricing: Localized;
  note?: Localized;
};

const pricingStandard = L(
  "Prestation individuelle, forfait de projet, abonnement mensuel ou intervention sur mesure, établis sur devis après diagnostic. Les tarifs publiés sont ceux validés par la direction.",
  "Individual service, project package, monthly subscription or tailored engagement, quoted after diagnosis. Published rates are those validated by management.",
);

export const expertises: Expertise[] = [
  {
    slug: "marketing-strategique-numerique", letter: "A", pole: "marketing",
    title: L("Marketing stratégique et numérique", "Strategic and digital marketing"),
    short: L("Une stratégie marketing cohérente, du positionnement à l’acquisition de clients.", "A coherent marketing strategy, from positioning to customer acquisition."),
    intro: L("Nous construisons un marketing qui sert vos objectifs de vente : un positionnement net, des canaux choisis avec méthode et un suivi qui montre ce qui fonctionne.", "We build marketing that serves your sales objectives: clear positioning, channels chosen with method, and tracking that shows what works."),
    problems: LL(["Une visibilité insuffisante auprès des clients que vous voulez atteindre.", "Un budget marketing dispersé dont le rendement reste difficile à mesurer.", "Un positionnement flou face à des concurrents plus visibles."], ["Too little visibility with the customers you want to reach.", "A scattered marketing budget whose return is hard to measure.", "Unclear positioning against more visible competitors."]),
    solution: L("Une stratégie marketing documentée, exécutée sur les canaux qui comptent pour votre marché, avec des indicateurs convenus dès le départ.", "A documented marketing strategy, run on the channels that matter for your market, with indicators agreed from the start."),
    approach: LL(["Audit de votre présence, de vos audiences et des données disponibles", "Stratégie, calendrier et plan de contenu priorisés", "Exécution coordonnée sur les canaux retenus", "Rapports réguliers et ajustements"], ["Audit of your presence, audiences and available data", "Prioritized strategy, calendar and content plan", "Coordinated execution on the chosen channels", "Regular reporting and adjustments"]),
    services: LL(["Élaboration de stratégies marketing", "Positionnement de marque", "Marketing numérique", "Gestion des réseaux sociaux", "Création de contenu", "Marketing par courriel", "Acquisition de prospects", "Génération de leads", "Référencement naturel (SEO)", "Analyse des performances marketing"], ["Marketing strategy development", "Brand positioning", "Digital marketing", "Social media management", "Content creation", "Email marketing", "Prospect acquisition", "Lead generation", "Search engine optimization (SEO)", "Marketing performance analysis"]),
    deliverables: LL(["Plan marketing et positionnement documentés", "Calendrier éditorial et bibliothèque de contenus", "Campagnes et séquences courriel configurées", "Tableau de bord de suivi marketing"], ["Documented marketing plan and positioning", "Editorial calendar and content library", "Configured campaigns and email sequences", "Marketing tracking dashboard"]),
    benefits: LL(["Augmentation de la visibilité", "Acquisition de nouveaux clients", "Amélioration de la notoriété", "Réduction du coût d’acquisition", "Développement du chiffre d’affaires", "Meilleure utilisation du budget marketing"], ["Greater visibility", "New customer acquisition", "Stronger brand awareness", "Lower acquisition cost", "Revenue growth", "Better use of the marketing budget"]),
    kpis: ["cac", "conversion", "revenue", "roi"],
    ai: L("Création de contenu assistée, segmentation intelligente des audiences et rapports de performance automatisés, toujours relus et validés par une personne.", "Assisted content creation, intelligent audience segmentation and automated performance reports, always reviewed and approved by a person."),
    pricing: pricingStandard,
  },
  {
    slug: "customer-marketing-experience-client", letter: "B", pole: "marketing",
    title: L("Customer marketing et expérience client", "Customer marketing and customer experience"),
    short: L("Fidéliser, réactiver et faire grandir la valeur de chaque client.", "Retain, reactivate and grow the value of every customer."),
    intro: L("Conserver un client coûte généralement moins cher qu’en acquérir un nouveau. Nous structurons le parcours, les communications et la relation pour que vos clients reviennent.", "Keeping a customer usually costs less than winning a new one. We structure the journey, communications and relationship so your customers come back."),
    problems: LL(["Des clients qui achètent une fois puis disparaissent.", "Une relation client gérée à la main, sans vue d’ensemble.", "Des occasions de ventes complémentaires jamais exploitées."], ["Customers who buy once and disappear.", "A customer relationship managed by hand, without an overview.", "Cross-sell opportunities that are never used."]),
    solution: L("Un parcours client cartographié, un CRM bien utilisé et des communications automatisées qui accompagnent chaque étape de la relation.", "A mapped customer journey, a CRM that is actually used, and automated communications that support each stage of the relationship."),
    approach: LL(["Cartographie du parcours et des points de rupture", "Segmentation des audiences et définition des scénarios", "Mise en place du CRM et des automatisations", "Suivi de la fidélisation et optimisation"], ["Mapping of the journey and its break points", "Audience segmentation and scenario design", "CRM setup and automations", "Retention tracking and optimization"]),
    services: LL(["Analyse du parcours client", "Fidélisation", "Segmentation des audiences", "Gestion de la relation client (CRM)", "Automatisation des communications", "Stratégies de rétention", "Campagnes de réactivation", "Optimisation de l’expérience client", "Développement des ventes complémentaires"], ["Customer journey analysis", "Loyalty programs", "Audience segmentation", "Customer relationship management (CRM)", "Communication automation", "Retention strategies", "Reactivation campaigns", "Customer experience optimization", "Cross-sell and upsell development"]),
    deliverables: LL(["Carte du parcours client", "Segments et scénarios de communication", "CRM configuré et documenté", "Tableau de suivi de la fidélisation"], ["Customer journey map", "Segments and communication scenarios", "Configured, documented CRM", "Retention tracking dashboard"]),
    benefits: LL(["Augmentation du taux de fidélisation", "Réduction de la perte de clients", "Développement des achats récurrents", "Amélioration de la satisfaction", "Augmentation de la valeur économique de chaque client"], ["Higher retention rate", "Fewer lost customers", "More repeat purchases", "Improved satisfaction", "Higher economic value per customer"]),
    kpis: ["retention", "revenue", "conversion", "margin"],
    ai: L("Détection des clients à risque, personnalisation des messages et relances automatisées dans un cadre de consentement clair.", "Detection of at-risk customers, message personalization and automated follow-ups within a clear consent framework."),
    pricing: pricingStandard,
  },
  {
    slug: "publicite-numerique-ppc", letter: "C", pole: "marketing",
    title: L("Publicité numérique et campagnes PPC", "Digital advertising and PPC campaigns"),
    short: L("Des campagnes payantes pilotées par le rendement, pas par la dépense.", "Paid campaigns steered by return, not by spend."),
    intro: L("Nous planifions, lançons et optimisons vos campagnes publicitaires avec une règle simple : chaque dollar investi doit pouvoir être expliqué.", "We plan, launch and optimize your ad campaigns with a simple rule: every dollar invested must be explainable."),
    problems: LL(["Des dépenses publicitaires dont on ne sait pas ce qu’elles rapportent.", "Des campagnes qui attirent des visiteurs, pas des clients.", "Des comptes publicitaires mal structurés et difficiles à contrôler."], ["Ad spend whose return nobody can state.", "Campaigns that attract visitors, not customers.", "Poorly structured ad accounts that are hard to control."]),
    solution: L("Des comptes structurés, des audiences testées et un suivi de conversion fiable, pour concentrer le budget là où il produit des résultats mesurables.", "Structured accounts, tested audiences and reliable conversion tracking, to concentrate budget where it produces measurable results."),
    approach: LL(["Audit des comptes et du suivi des conversions", "Structure de campagnes, audiences et messages", "Lancement, tests A/B et optimisation continue", "Rapport de rendement et recommandations budgétaires"], ["Audit of accounts and conversion tracking", "Campaign structure, audiences and messages", "Launch, A/B tests and continuous optimization", "Return report and budget recommendations"]),
    services: LL(["Google Ads", "Meta Ads", "Facebook Ads", "Instagram Ads", "LinkedIn Ads", "Microsoft Ads", "Campagnes PPC", "Retargeting et remarketing", "Optimisation des conversions", "Tests A/B", "Gestion des budgets publicitaires", "Analyse du retour sur investissement publicitaire"], ["Google Ads", "Meta Ads", "Facebook Ads", "Instagram Ads", "LinkedIn Ads", "Microsoft Ads", "PPC campaigns", "Retargeting and remarketing", "Conversion optimization", "A/B testing", "Ad budget management", "Advertising return-on-investment analysis"]),
    deliverables: LL(["Structure de comptes et plan de campagnes", "Suivi des conversions configuré", "Créations et variantes testées", "Rapport mensuel de rendement (ROAS, CAC)"], ["Account structure and campaign plan", "Configured conversion tracking", "Tested creatives and variants", "Monthly return report (ROAS, CAC)"]),
    benefits: LL(["Acquisition de prospects qualifiés", "Augmentation des conversions", "Réduction des dépenses publicitaires inefficaces", "Amélioration du rendement publicitaire", "Meilleur contrôle des investissements", "Développement des ventes"], ["Qualified prospect acquisition", "Higher conversions", "Less wasted ad spend", "Better advertising return", "Tighter control of investment", "Sales growth"]),
    kpis: ["roas", "cac", "conversion", "roi"],
    ai: L("Optimisation des enchères et des budgets, analyse des créations et rapports automatisés, avec plafonds de dépense définis par vous.", "Bid and budget optimization, creative analysis and automated reports, with spending caps set by you."),
    pricing: pricingStandard,
    note: L("Deux montants distincts. Le budget publicitaire est ce que vous investissez directement auprès des plateformes (Google, Meta, LinkedIn…) : il vous appartient et vous le contrôlez. Les honoraires de gestion sont ce que BENEX Solutions facture pour planifier, piloter et optimiser les campagnes. Les deux sont indiqués séparément dans chaque devis.", "Two distinct amounts. The ad budget is what you invest directly with the platforms (Google, Meta, LinkedIn…): it belongs to you and you control it. Management fees are what BENEX Solutions charges to plan, run and optimize the campaigns. Both appear separately in every proposal."),
  },
  {
    slug: "sites-web-solutions-numeriques", letter: "D", pole: "digital",
    title: L("Création de sites web et solutions numériques", "Website creation and digital solutions"),
    short: L("Des plateformes crédibles, rapides et conçues pour convertir.", "Credible, fast platforms designed to convert."),
    intro: L("Votre site est souvent la première rencontre avec votre entreprise. Nous le concevons pour inspirer confiance, répondre vite et transformer les visites en demandes.", "Your website is often the first encounter with your business. We design it to inspire trust, answer quickly and turn visits into enquiries."),
    problems: LL(["Un site vieillissant qui nuit à la crédibilité et aux conversions.", "Des outils isolés qui multiplient les saisies manuelles.", "Une expérience difficile sur mobile ou trop lente."], ["An aging site that hurts credibility and conversions.", "Disconnected tools that multiply manual entry.", "A difficult or slow mobile experience."]),
    solution: L("Une plateforme sur mesure, accessible en permanence, reliée à vos outils et mesurée en continu.", "A tailored platform, always available, connected to your tools and measured continuously."),
    approach: LL(["Cadrage des objectifs, des parcours et du contenu", "Conception UX/UI et validation", "Développement, intégrations et tests", "Mise en ligne, mesure et maintenance"], ["Scoping of goals, journeys and content", "UX/UI design and approval", "Development, integrations and testing", "Launch, measurement and maintenance"]),
    services: LL(["Sites institutionnels", "Sites vitrines professionnels", "Boutiques électroniques", "Plateformes de réservation", "Applications web", "Refonte de sites existants", "Développement sur mesure", "Intégration CRM", "Optimisation SEO", "Maintenance et sécurité", "Optimisation de la vitesse et des conversions"], ["Institutional websites", "Professional showcase sites", "Online stores", "Booking platforms", "Web applications", "Redesign of existing sites", "Custom development", "CRM integration", "SEO optimization", "Maintenance and security", "Speed and conversion optimization"]),
    deliverables: LL(["Architecture fonctionnelle et maquettes validées", "Plateforme responsive et accessible", "Intégrations et documentation technique", "Plan de maintenance et tableau de suivi"], ["Functional architecture and approved designs", "Responsive, accessible platform", "Integrations and technical documentation", "Maintenance plan and tracking dashboard"]),
    benefits: LL(["Une image professionnelle et crédible", "Une présence numérique accessible en permanence", "Une meilleure conversion des visiteurs", "De nouvelles opportunités commerciales", "Une réduction des tâches administratives", "Une infrastructure numérique évolutive"], ["A professional, credible image", "A digital presence available at all times", "Better visitor conversion", "New commercial opportunities", "Less administrative work", "A scalable digital infrastructure"]),
    kpis: ["conversion", "revenue", "timeSaved", "cac"],
    ai: L("Assistants de qualification des demandes, personnalisation du parcours et génération assistée de contenu, intégrés au site avec supervision.", "Enquiry-qualification assistants, journey personalization and assisted content generation, built into the site under supervision."),
    pricing: pricingStandard,
  },
  {
    slug: "conseil-strategique-analyse-affaires", letter: "E", pole: "strategy",
    title: L("Conseil stratégique et analyse d’affaires", "Strategic consulting and business analysis"),
    short: L("Des décisions éclairées par une lecture rigoureuse de votre entreprise.", "Decisions informed by a rigorous reading of your business."),
    intro: L("Avant d’investir, il faut savoir où l’entreprise gagne et où elle perd. Nous analysons, hiérarchisons et traduisons en plan d’action chiffré.", "Before investing, you need to know where the business wins and where it loses. We analyze, prioritize and turn it into a costed action plan."),
    problems: LL(["Des décisions prises à l’intuition, sans données consolidées.", "Une croissance envisagée sans mesure de rentabilité ni des risques.", "Trop de priorités et des ressources limitées."], ["Decisions made by gut feeling, without consolidated data.", "Growth planned without profitability or risk measurement.", "Too many priorities and limited resources."]),
    solution: L("Un diagnostic complet, des priorités classées par impact et une feuille de route avec ses indicateurs de performance.", "A full diagnostic, priorities ranked by impact and a roadmap with its performance indicators."),
    approach: LL(["Collecte et analyse des données financières et commerciales", "Analyse des forces, faiblesses, risques et opportunités", "Construction du modèle économique et des scénarios", "Feuille de route, indicateurs et suivi"], ["Collection and analysis of financial and commercial data", "Analysis of strengths, weaknesses, risks and opportunities", "Business model and scenario building", "Roadmap, indicators and follow-up"]),
    services: LL(["Diagnostic d’entreprise", "Analyse financière et commerciale", "Analyse SWOT", "Élaboration de plans d’affaires", "Analyse de rentabilité", "Identification des risques", "Développement de modèles économiques", "Stratégies de croissance", "Planification stratégique", "Définition des indicateurs de performance"], ["Business diagnostic", "Financial and commercial analysis", "SWOT analysis", "Business plan development", "Profitability analysis", "Risk identification", "Business model development", "Growth strategies", "Strategic planning", "Performance indicator definition"]),
    deliverables: LL(["Rapport de diagnostic", "Plan d’affaires ou plan stratégique", "Analyse de rentabilité et scénarios", "Feuille de route et indicateurs de performance"], ["Diagnostic report", "Business or strategic plan", "Profitability analysis and scenarios", "Roadmap and performance indicators"]),
    benefits: LL(["Une meilleure prise de décision", "Une vision claire des priorités", "Une identification des opportunités", "Une réduction des risques", "Une meilleure allocation des ressources", "Une croissance structurée et maîtrisée"], ["Better decision-making", "A clear view of priorities", "Opportunity identification", "Reduced risk", "Better allocation of resources", "Structured, controlled growth"]),
    kpis: ["margin", "revenue", "roi", "opcost"],
    ai: L("Analyse accélérée de vos données, simulations financières et rapports stratégiques automatisés, la décision restant humaine.", "Faster analysis of your data, financial simulations and automated strategic reports, with the decision remaining human."),
    pricing: pricingStandard,
  },
  {
    slug: "analyse-marche-intelligence-economique", letter: "F", pole: "strategy",
    title: L("Analyse de marché et intelligence économique", "Market analysis and business intelligence"),
    short: L("Comprendre le marché avant d’y investir, et garder une longueur d’avance.", "Understand the market before investing, and stay one step ahead."),
    intro: L("Un lancement, une expansion ou un changement de prix se préparent. Nous transformons l’information de marché en choix clairs.", "A launch, an expansion or a price change has to be prepared. We turn market information into clear choices."),
    problems: LL(["Un marché mal connu et des concurrents mal compris.", "Des investissements engagés sans étude de faisabilité.", "Une veille irrégulière qui n’éclaire aucune décision."], ["A poorly known market and poorly understood competitors.", "Investments committed without a feasibility study.", "Irregular monitoring that informs no decision."]),
    solution: L("Des études ciblées, une veille organisée et des recommandations pour choisir les marchés, les prix et le moment.", "Targeted studies, organized monitoring and recommendations to choose markets, prices and timing."),
    approach: LL(["Définition des questions de décision", "Collecte et analyse des sources de marché", "Synthèse, scénarios et recommandations", "Veille périodique selon vos besoins"], ["Defining the decision questions", "Collecting and analyzing market sources", "Synthesis, scenarios and recommendations", "Periodic monitoring as needed"]),
    services: LL(["Études de marché", "Analyse concurrentielle", "Analyse des tendances", "Identification des marchés émergents", "Segmentation de clientèle", "Études de faisabilité", "Analyse du positionnement tarifaire", "Stratégies de pénétration de marché", "Veille stratégique"], ["Market studies", "Competitive analysis", "Trend analysis", "Emerging market identification", "Customer segmentation", "Feasibility studies", "Price positioning analysis", "Market-entry strategies", "Strategic monitoring"]),
    deliverables: LL(["Étude de marché documentée et sourcée", "Cartographie concurrentielle", "Étude de faisabilité et scénarios", "Bulletin de veille périodique"], ["Documented, sourced market study", "Competitive map", "Feasibility study and scenarios", "Periodic monitoring bulletin"]),
    benefits: LL(["Une meilleure compréhension du marché", "Une identification des opportunités commerciales", "Un positionnement plus compétitif", "Une réduction des risques d’investissement", "Une meilleure préparation des lancements"], ["A better understanding of the market", "Identification of commercial opportunities", "A more competitive position", "Lower investment risk", "Better-prepared launches"]),
    kpis: ["revenue", "margin", "roi", "conversion"],
    ai: L("Veille concurrentielle automatisée, détection de tendances et synthèses de sources, vérifiées par un analyste avant diffusion.", "Automated competitor monitoring, trend detection and source summaries, checked by an analyst before release."),
    pricing: pricingStandard,
  },
  {
    slug: "solutions-operationnelles", letter: "G", pole: "operations",
    title: L("Solutions opérationnelles", "Operational solutions"),
    short: L("Des opérations plus fluides, des coûts mieux maîtrisés, des marges protégées.", "Smoother operations, better-controlled costs, protected margins."),
    intro: L("La croissance révèle les failles de l’organisation. Nous clarifions les processus, outillons les équipes et installons une discipline d’amélioration continue.", "Growth exposes the cracks in an organization. We clarify processes, equip teams and set up a discipline of continuous improvement."),
    problems: LL(["Des processus qui varient d’une personne à l’autre.", "Des erreurs et des reprises qui coûtent du temps et de l’argent.", "Peu de visibilité sur la productivité réelle."], ["Processes that vary from one person to another.", "Errors and rework that cost time and money.", "Little visibility on real productivity."]),
    solution: L("Des opérations cartographiées, standardisées et mesurées, avec des tableaux de bord que vos responsables utilisent vraiment.", "Operations that are mapped, standardized and measured, with dashboards your managers actually use."),
    approach: LL(["Audit et cartographie des opérations", "Identification des gaspillages et priorités", "Standardisation, outils et formation", "Tableaux de bord et amélioration continue"], ["Operations audit and mapping", "Identification of waste and priorities", "Standardization, tools and training", "Dashboards and continuous improvement"]),
    services: LL(["Audit des opérations", "Optimisation des processus", "Organisation des équipes", "Gestion de la productivité", "Standardisation des procédures", "Réduction des coûts opérationnels", "Mise en place de tableaux de bord", "Gestion des ressources", "Amélioration continue", "Accompagnement des responsables opérationnels"], ["Operations audit", "Process optimization", "Team organization", "Productivity management", "Procedure standardization", "Operating cost reduction", "Dashboard implementation", "Resource management", "Continuous improvement", "Coaching of operations managers"]),
    deliverables: LL(["Diagnostic opérationnel et cartographie", "Procédures standardisées", "Plan d’optimisation chiffré", "Tableau de bord de performance"], ["Operational diagnostic and mapping", "Standardized procedures", "Costed optimization plan", "Performance dashboard"]),
    benefits: LL(["Réduction des coûts de fonctionnement", "Amélioration de la productivité", "Réduction des erreurs", "Meilleure organisation interne", "Gain de temps", "Amélioration des marges bénéficiaires"], ["Lower running costs", "Higher productivity", "Fewer errors", "Better internal organization", "Time savings", "Improved profit margins"]),
    kpis: ["opcost", "productivity", "timeSaved", "margin"],
    ai: L("Automatisation des rapports, détection d’anomalies et suivi de la productivité par tableaux de bord automatisés.", "Report automation, anomaly detection and productivity tracking through automated dashboards."),
    pricing: pricingStandard,
  },
  {
    slug: "logistique-chaine-approvisionnement", letter: "H", pole: "logistics",
    title: L("Solutions logistiques et chaîne d’approvisionnement", "Logistics and supply chain solutions"),
    short: L("Les bons produits, au bon endroit, au bon coût.", "The right products, in the right place, at the right cost."),
    intro: L("Stocks, entrepôts, fournisseurs, expéditions : chaque maillon pèse sur vos délais et vos marges. Nous les relions dans une vue cohérente.", "Inventory, warehouses, suppliers, shipments: every link weighs on your lead times and margins. We connect them in one coherent view."),
    problems: LL(["Des ruptures de stock et, en parallèle, des surplus immobilisés.", "Des flux d’entrepôt et d’expédition mal organisés.", "Des coûts logistiques que personne ne suit précisément."], ["Stock-outs alongside tied-up surplus.", "Poorly organized warehouse and shipping flows.", "Logistics costs that nobody tracks precisely."]),
    solution: L("Des stocks pilotés par des règles claires, des flux optimisés et des indicateurs logistiques suivis dans le temps.", "Stocks steered by clear rules, optimized flows and logistics indicators tracked over time."),
    approach: LL(["Analyse des stocks, des flux et des coûts logistiques", "Conception de l’organisation et des règles d’approvisionnement", "Mise en place des outils et de la traçabilité", "Suivi des indicateurs et ajustements"], ["Analysis of stock, flows and logistics costs", "Design of organization and supply rules", "Tooling and traceability setup", "Indicator tracking and adjustments"]),
    services: LL(["Optimisation des stocks", "Gestion des inventaires", "Organisation des entrepôts", "Optimisation des flux", "Planification des approvisionnements", "Coordination des fournisseurs", "Optimisation des expéditions", "Traçabilité", "Analyse des coûts logistiques", "Mise en place d’indicateurs de performance"], ["Inventory optimization", "Inventory management", "Warehouse organization", "Flow optimization", "Supply planning", "Supplier coordination", "Shipping optimization", "Traceability", "Logistics cost analysis", "Performance indicator implementation"]),
    deliverables: LL(["Diagnostic logistique et analyse des coûts", "Règles de stock et d’approvisionnement", "Plan d’organisation des flux et des espaces", "Tableau de bord logistique"], ["Logistics diagnostic and cost analysis", "Stock and supply rules", "Flow and space organization plan", "Logistics dashboard"]),
    benefits: LL(["Réduction des pertes", "Réduction des coûts logistiques", "Amélioration des délais", "Meilleure disponibilité des produits", "Optimisation des espaces", "Amélioration de la performance globale"], ["Fewer losses", "Lower logistics costs", "Shorter lead times", "Better product availability", "Optimized space", "Better overall performance"]),
    kpis: ["opcost", "productivity", "margin", "timeSaved"],
    ai: L("Prévision des besoins, alertes d’approvisionnement et suivi des commandes automatisés, avec seuils validés par vos responsables.", "Demand forecasting, supply alerts and order tracking automated, with thresholds approved by your managers."),
    pricing: pricingStandard,
  },
  {
    slug: "intelligence-artificielle-automatisation", letter: "I", pole: "ai",
    title: L("Intelligence artificielle et automatisation", "Artificial intelligence and automation"),
    short: L("Des agents et des automatisations fiables, supervisés et utiles dès le premier jour.", "Reliable, supervised agents and automations that are useful from day one."),
    intro: L("L’IA n’a de valeur que si elle règle un problème réel. Nous choisissons les cas d’usage rentables, les déployons avec des garde-fous et formons vos équipes.", "AI is only valuable if it solves a real problem. We choose the cases that pay off, deploy them with safeguards and train your teams."),
    problems: LL(["Des tâches répétitives qui occupent des équipes à faible valeur.", "Des données dispersées et des rapports faits à la main.", "Un intérêt pour l’IA sans cas d’usage ni cadre de gouvernance."], ["Repetitive tasks that occupy teams at low value.", "Scattered data and hand-made reports.", "An interest in AI with no use case or governance framework."]),
    solution: L("Des cas d’usage priorisés par la valeur, des agents et automatisations adaptés à vos outils, des permissions définies et une supervision humaine.", "Use cases prioritized by value, agents and automations adapted to your tools, defined permissions and human oversight."),
    approach: LL(["Repérage des tâches et des cas d’usage à fort potentiel", "Conception, permissions et règles de supervision", "Déploiement pilote, tests et documentation", "Formation, suivi et extension progressive"], ["Spotting tasks and high-potential use cases", "Design, permissions and oversight rules", "Pilot deployment, testing and documentation", "Training, follow-up and gradual extension"]),
    services: LL(["Intégration de solutions d’intelligence artificielle", "Création d’agents intelligents", "Automatisation des processus administratifs", "Automatisation commerciale", "Automatisation marketing", "Assistants virtuels", "Intégration des outils numériques", "Analyse automatisée des données", "Automatisation des rapports", "Optimisation des flux de travail"], ["Integration of artificial intelligence solutions", "Creation of intelligent agents", "Administrative process automation", "Sales automation", "Marketing automation", "Virtual assistants", "Digital tool integration", "Automated data analysis", "Report automation", "Workflow optimization"]),
    deliverables: LL(["Feuille de route des cas d’usage", "Agents et automatisations configurés et documentés", "Règles de permissions et de supervision", "Formation et suivi d’adoption"], ["Use-case roadmap", "Configured, documented agents and automations", "Permission and oversight rules", "Training and adoption follow-up"]),
    benefits: LL(["Réduction des tâches répétitives", "Gain de temps", "Réduction des coûts administratifs", "Amélioration de la réactivité", "Augmentation de la capacité opérationnelle", "Meilleure exploitation des données"], ["Fewer repetitive tasks", "Time savings", "Lower administrative costs", "Faster responsiveness", "Greater operating capacity", "Better use of data"]),
    kpis: ["timeSaved", "productivity", "opcost", "roi"],
    ai: L("C’est notre pôle transversal : il s’applique à chacune des autres expertises. Consultez la page BENEX AI & Automation pour le détail des agents, des intégrations et de la gouvernance.", "This is our cross-cutting unit: it applies to every other expertise. See the BENEX AI & Automation page for details on agents, integrations and governance."),
    pricing: pricingStandard,
  },
  {
    slug: "creation-developpement-croissance", letter: "J", pole: "growth",
    title: L("Création, développement et croissance des entreprises", "Business creation, development and growth"),
    short: L("De l’idée au marché, puis à l’expansion, avec une entreprise bien structurée.", "From idea to market to expansion, with a well-structured business."),
    intro: L("Lancer ou faire croître une entreprise exige un modèle clair, une offre structurée et un développement commercial régulier. Nous construisons ces fondations avec vous.", "Launching or growing a business takes a clear model, a structured offer and steady business development. We build those foundations with you."),
    problems: LL(["Une idée sans modèle d’affaires ni plan de lancement.", "Une prospection irrégulière qui dépend du temps des dirigeants.", "Une expansion envisagée sans structure ni indicateurs."], ["An idea without a business model or launch plan.", "Irregular prospecting that depends on executive time.", "Expansion planned without structure or indicators."]),
    solution: L("Un modèle d’affaires solide, une identité claire, un pipeline commercial suivi et un plan de croissance par étapes.", "A solid business model, a clear identity, a tracked sales pipeline and a staged growth plan."),
    approach: LL(["Construction du modèle d’affaires et de l’offre", "Identité de marque et plan de lancement", "Mise en place de la prospection et du pipeline", "Plan d’expansion et suivi de la croissance"], ["Building the business model and offer", "Brand identity and launch plan", "Setting up prospecting and pipeline", "Expansion plan and growth tracking"]),
    services: LL(["Accompagnement des entrepreneurs", "Construction de modèles d’affaires", "Structuration de nouvelles entreprises", "Développement de l’identité de marque", "Stratégies de lancement", "Développement commercial", "Prospection B2B", "Structuration des offres", "Développement de nouveaux marchés", "Accompagnement à l’expansion", "Transformation organisationnelle"], ["Entrepreneur coaching", "Business model construction", "Structuring of new businesses", "Brand identity development", "Launch strategies", "Business development", "B2B prospecting", "Offer structuring", "New market development", "Expansion support", "Organizational transformation"]),
    deliverables: LL(["Modèle d’affaires et offre structurée", "Identité de marque et supports essentiels", "Pipeline commercial et séquences de prospection", "Plan de croissance et indicateurs"], ["Business model and structured offer", "Brand identity and essential materials", "Sales pipeline and prospecting sequences", "Growth plan and indicators"]),
    benefits: LL(["Accélération du lancement", "Construction d’une entreprise structurée", "Développement du portefeuille client", "Amélioration de la rentabilité", "Réduction des erreurs stratégiques", "Création de conditions favorables à une croissance durable"], ["Faster launch", "A well-structured business", "A growing customer portfolio", "Improved profitability", "Fewer strategic mistakes", "Conditions for sustainable growth"]),
    kpis: ["revenue", "cac", "conversion", "margin"],
    ai: L("Recherche et qualification de prospects, préparation de soumissions et suivi des opportunités assistés, dans le respect des règles de consentement.", "Assisted prospect research and qualification, bid preparation and opportunity follow-up, within consent rules."),
    pricing: pricingStandard,
  },
];
