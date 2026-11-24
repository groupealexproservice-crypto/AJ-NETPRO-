export type Lang = "fr" | "en";
export type Localized = { fr: string; en: string };
export type LocalizedList = { fr: string[]; en: string[] };

export const tx = (value: Localized, lang: Lang) => value[lang];
export const txList = (value: LocalizedList, lang: Lang) => value[lang];

export type Expertise = {
  slug: string;
  number: string;
  title: Localized;
  short: Localized;
  intro: Localized;
  problems: LocalizedList;
  services: LocalizedList;
  deliverables: LocalizedList;
};

export const expertises: Expertise[] = [
  {
    slug: "identite-marque-communication",
    number: "01",
    title: { fr: "Identité de marque et communication", en: "Brand identity and communication" },
    short: {
      fr: "Une marque cohérente, reconnaissable et alignée sur votre ambition d’affaires.",
      en: "A coherent, recognizable brand aligned with your business ambition.",
    },
    intro: {
      fr: "Nous relions le positionnement stratégique, l’expression visuelle et les communications pour donner à votre entreprise une présence claire et crédible sur tous ses points de contact.",
      en: "We connect strategic positioning, visual expression and communications to give your business a clear, credible presence at every touchpoint.",
    },
    problems: {
      fr: ["Une image qui ne reflète plus la maturité de l’entreprise.", "Des messages et des supports incohérents d’un canal à l’autre.", "Une difficulté à se différencier dans un marché concurrentiel."],
      en: ["An image that no longer reflects the company’s maturity.", "Inconsistent messages and materials across channels.", "Difficulty standing out in a competitive market."],
    },
    services: {
      fr: ["Création et refonte de logos", "Identité visuelle complète", "Charte graphique", "Positionnement de marque", "Stratégie de communication", "Création de supports institutionnels", "Présentations commerciales", "Photographie et direction artistique", "Création de contenus numériques", "Gestion de la réputation en ligne"],
      en: ["Logo creation and redesign", "Complete visual identity", "Brand guidelines", "Brand positioning", "Communication strategy", "Institutional materials", "Sales presentations", "Photography and art direction", "Digital content creation", "Online reputation management"],
    },
    deliverables: {
      fr: ["Plateforme de marque et positionnement documenté", "Système d’identité visuelle et charte d’utilisation", "Bibliothèque de supports prioritaires", "Plan de communication et guide éditorial"],
      en: ["Brand platform and documented positioning", "Visual identity system and usage guidelines", "Library of priority materials", "Communication plan and editorial guide"],
    },
  },
  {
    slug: "developpement-web-transformation-numerique",
    number: "02",
    title: { fr: "Développement web et transformation numérique", en: "Web development and digital transformation" },
    short: {
      fr: "Des plateformes utiles, performantes et intégrées à vos opérations.",
      en: "Useful, high-performing platforms integrated with your operations.",
    },
    intro: {
      fr: "Nous concevons des écosystèmes numériques qui servent réellement vos clients et vos équipes, de la vitrine institutionnelle aux outils métiers connectés.",
      en: "We design digital ecosystems that genuinely serve your customers and teams, from institutional websites to connected business tools.",
    },
    problems: {
      fr: ["Un site vieillissant qui freine la crédibilité et les conversions.", "Des outils isolés qui multiplient les saisies manuelles.", "Une expérience utilisateur complexe sur mobile comme sur ordinateur."],
      en: ["An aging website that undermines credibility and conversions.", "Disconnected tools that multiply manual data entry.", "A complex user experience on mobile and desktop."],
    },
    services: {
      fr: ["Création de sites web institutionnels", "Sites vitrines professionnels", "Plateformes de commerce électronique", "Applications web", "Portails clients", "Refonte et optimisation de sites existants", "Référencement naturel SEO", "Optimisation de l’expérience utilisateur", "Intégration de systèmes CRM", "Maintenance et sécurité numérique", "Analyse du trafic et des conversions"],
      en: ["Institutional website development", "Professional showcase websites", "E-commerce platforms", "Web applications", "Client portals", "Website redesign and optimization", "Organic search optimization (SEO)", "User experience optimization", "CRM system integration", "Digital maintenance and security", "Traffic and conversion analysis"],
    },
    deliverables: {
      fr: ["Architecture fonctionnelle et parcours utilisateurs", "Plateforme responsive et accessible", "Intégrations et documentation technique", "Tableau de suivi des performances et plan de maintenance"],
      en: ["Functional architecture and user journeys", "Responsive, accessible platform", "Integrations and technical documentation", "Performance dashboard and maintenance plan"],
    },
  },
  {
    slug: "marketing-digital-publicite",
    number: "03",
    title: { fr: "Marketing et publicité", en: "Marketing and advertising" },
    short: {
      fr: "Des campagnes pilotées par les objectifs commerciaux, pas par la seule visibilité.",
      en: "Campaigns driven by business objectives, not visibility alone.",
    },
    intro: {
      fr: "Nous orchestrons les contenus, les audiences, les canaux et la mesure pour construire un système d’acquisition cohérent et améliorable.",
      en: "We orchestrate content, audiences, channels and measurement to build a coherent, continuously improvable acquisition system.",
    },
    problems: {
      fr: ["Des investissements publicitaires difficiles à relier aux ventes.", "Une présence irrégulière et des contenus sans ligne éditoriale.", "Des données de campagne dispersées et peu exploitables."],
      en: ["Advertising spend that is difficult to connect to sales.", "Irregular presence and content without an editorial direction.", "Scattered campaign data that is hard to use."],
    },
    services: {
      fr: ["Stratégie marketing complète", "Campagnes Meta Ads", "Campagnes Google Ads", "Publicité LinkedIn", "Gestion professionnelle des réseaux sociaux", "Calendriers éditoriaux", "Création de visuels publicitaires", "Campagnes de lancement", "Marketing de contenu", "Campagnes de courriels", "Optimisation des budgets publicitaires", "Analyse du retour sur investissement"],
      en: ["Comprehensive marketing strategy", "Meta Ads campaigns", "Google Ads campaigns", "LinkedIn advertising", "Professional social media management", "Editorial calendars", "Advertising creative", "Launch campaigns", "Content marketing", "Email campaigns", "Advertising budget optimization", "Return on investment analysis"],
    },
    deliverables: {
      fr: ["Plan d’acquisition multicanal", "Calendrier éditorial et concepts de campagne", "Configuration et suivi des campagnes", "Rapports de performance et recommandations d’optimisation"],
      en: ["Multichannel acquisition plan", "Editorial calendar and campaign concepts", "Campaign setup and monitoring", "Performance reports and optimization recommendations"],
    },
  },
  {
    slug: "developpement-commercial-acquisition",
    number: "04",
    title: { fr: "Développement commercial et acquisition client", en: "Business development and customer acquisition" },
    short: {
      fr: "Une fonction de développement des affaires structurée et externalisée.",
      en: "A structured, outsourced business development function.",
    },
    intro: {
      fr: "Nous organisons la recherche d’opportunités, la qualification et le suivi commercial pour créer un pipeline lisible et durable, dans le respect des règles de consentement applicables.",
      en: "We organize opportunity research, qualification and sales follow-up to create a clear, sustainable pipeline while respecting applicable consent rules.",
    },
    problems: {
      fr: ["Une prospection irrégulière qui dépend du temps des dirigeants.", "Des opportunités mal qualifiées ou perdues faute de suivi.", "Une difficulté à accéder aux appels d’offres et aux bons décideurs."],
      en: ["Irregular prospecting that depends on executive availability.", "Poorly qualified opportunities or losses due to missing follow-up.", "Difficulty accessing tenders and the right decision-makers."],
    },
    services: {
      fr: ["Identification de marchés cibles", "Recherche de prospects qualifiés", "Constitution de bases de données commerciales", "Prospection B2B", "Recherche d’opportunités contractuelles", "Veille sur les appels d’offres publics et privés", "Création de campagnes de prospection", "Rédaction de courriels commerciaux personnalisés", "Préparation de propositions et de soumissions", "Gestion du pipeline commercial", "Relance et suivi des prospects", "Développement de partenariats stratégiques", "Analyse des performances commerciales"],
      en: ["Target market identification", "Qualified prospect research", "Commercial database development", "B2B prospecting", "Contract opportunity research", "Public and private tender monitoring", "Outreach campaign development", "Personalized sales email writing", "Proposal and bid preparation", "Sales pipeline management", "Prospect follow-up", "Strategic partnership development", "Sales performance analysis"],
    },
    deliverables: {
      fr: ["Cartographie des marchés et profils de clients cibles", "Base de prospects documentée et conforme", "Séquences de prospection et argumentaires", "Pipeline, propositions commerciales et rapports de suivi"],
      en: ["Market mapping and target customer profiles", "Documented, compliant prospect database", "Outreach sequences and sales narratives", "Pipeline, sales proposals and follow-up reports"],
    },
  },
  {
    slug: "strategie-intelligence-economique",
    number: "05",
    title: { fr: "Stratégie et intelligence économique", en: "Strategy and business intelligence" },
    short: {
      fr: "Des décisions appuyées sur une lecture rigoureuse des marchés et des opportunités.",
      en: "Decisions supported by a rigorous reading of markets and opportunities.",
    },
    intro: {
      fr: "Nous transformons l’information sectorielle, concurrentielle et commerciale en choix stratégiques explicites, hiérarchisés et directement exploitables.",
      en: "We turn industry, competitive and commercial information into explicit, prioritized and actionable strategic choices.",
    },
    problems: {
      fr: ["Une croissance envisagée sans validation suffisante du marché.", "Des décisions tarifaires ou d’expansion fondées sur l’intuition.", "Une veille dispersée qui n’alimente pas la prise de décision."],
      en: ["Growth plans without sufficient market validation.", "Pricing or expansion decisions based on intuition.", "Scattered monitoring that does not inform decision-making."],
    },
    services: {
      fr: ["Études de marché", "Analyse sectorielle", "Analyse concurrentielle", "Analyse SWOT", "Études de faisabilité", "Plans d’affaires", "Stratégies de lancement", "Analyse du positionnement", "Stratégies tarifaires", "Identification des opportunités commerciales", "Plans de croissance", "Stratégies d’expansion géographique", "Veille stratégique"],
      en: ["Market research", "Industry analysis", "Competitive analysis", "SWOT analysis", "Feasibility studies", "Business plans", "Go-to-market strategies", "Positioning analysis", "Pricing strategies", "Commercial opportunity identification", "Growth plans", "Geographic expansion strategies", "Strategic monitoring"],
    },
    deliverables: {
      fr: ["Étude documentée et analyse concurrentielle", "Modèle d’affaires et hypothèses explicites", "Scénarios de croissance et matrice de priorisation", "Feuille de route stratégique et dispositif de veille"],
      en: ["Documented research and competitive analysis", "Business model and explicit assumptions", "Growth scenarios and prioritization matrix", "Strategic roadmap and monitoring framework"],
    },
  },
  {
    slug: "performance-operationnelle-logistique",
    number: "06",
    title: { fr: "Performance opérationnelle et logistique", en: "Operational performance and logistics" },
    short: {
      fr: "Des opérations plus fluides, mesurables et adaptées à la croissance.",
      en: "Smoother, measurable operations designed for growth.",
    },
    intro: {
      fr: "Nous examinons les processus, les rôles, les flux et les indicateurs pour réduire les frictions et renforcer la qualité de service sans perdre de vue la réalité des équipes.",
      en: "We examine processes, roles, flows and indicators to reduce friction and strengthen service quality while staying grounded in team realities.",
    },
    problems: {
      fr: ["Des processus informels qui ralentissent l’exécution.", "Des coûts et des délais difficiles à expliquer.", "Une organisation qui peine à absorber l’augmentation du volume."],
      en: ["Informal processes that slow execution.", "Costs and delays that are difficult to explain.", "An organization struggling to absorb increased volume."],
    },
    services: {
      fr: ["Audit des opérations", "Analyse des processus internes", "Optimisation des méthodes de travail", "Organisation des équipes", "Planification des ressources", "Optimisation des flux logistiques", "Gestion des stocks et des approvisionnements", "Réduction des coûts opérationnels", "Création de procédures internes", "Mise en place d’indicateurs de performance", "Amélioration continue", "Optimisation de la qualité de service"],
      en: ["Operations audit", "Internal process analysis", "Work method optimization", "Team organization", "Resource planning", "Logistics flow optimization", "Inventory and supply management", "Operating cost reduction", "Internal procedure development", "Performance indicator implementation", "Continuous improvement", "Service quality optimization"],
    },
    deliverables: {
      fr: ["Cartographie des processus et diagnostic des irritants", "Procédures et responsabilités clarifiées", "Plan d’optimisation des ressources et des flux", "Indicateurs de performance et rituel d’amélioration continue"],
      en: ["Process mapping and friction diagnostic", "Clarified procedures and responsibilities", "Resource and flow optimization plan", "Performance indicators and continuous improvement cadence"],
    },
  },
  {
    slug: "intelligence-artificielle-automatisation",
    number: "07",
    title: { fr: "Intelligence artificielle et automatisation", en: "Artificial intelligence and automation" },
    short: {
      fr: "Des technologies ciblées qui libèrent du temps et renforcent la décision.",
      en: "Targeted technologies that free up time and strengthen decision-making.",
    },
    intro: {
      fr: "Nous identifions les cas d’usage à valeur réelle, puis intégrons l’IA et l’automatisation dans des workflows maîtrisés, documentés et adoptés par les équipes.",
      en: "We identify high-value use cases, then integrate AI and automation into controlled, documented workflows that teams can adopt.",
    },
    problems: {
      fr: ["Des tâches répétitives qui mobilisent les équipes à faible valeur.", "Des données dispersées et des rapports produits manuellement.", "Un intérêt pour l’IA sans cas d’usage ni cadre de gouvernance."],
      en: ["Repetitive tasks consuming team time with little value.", "Scattered data and manually produced reports.", "Interest in AI without clear use cases or governance."],
    },
    services: {
      fr: ["Création et intégration d’agents IA", "Assistants virtuels professionnels", "Automatisation des tâches administratives", "Automatisation des processus commerciaux", "Automatisation des rapports", "Gestion intelligente des données", "Intégration des outils métiers", "Tableaux de bord décisionnels", "Automatisation des workflows", "Accompagnement à l’adoption de l’intelligence artificielle"],
      en: ["AI agent creation and integration", "Professional virtual assistants", "Administrative task automation", "Sales process automation", "Report automation", "Intelligent data management", "Business tool integration", "Decision-making dashboards", "Workflow automation", "AI adoption support"],
    },
    deliverables: {
      fr: ["Cartographie et priorisation des cas d’usage", "Workflows automatisés et règles de contrôle", "Agents ou assistants configurés et documentés", "Tableaux de bord et accompagnement à l’adoption"],
      en: ["Use-case mapping and prioritization", "Automated workflows and control rules", "Configured, documented agents or assistants", "Dashboards and adoption support"],
    },
  },
  {
    slug: "conseil-accompagnement-entreprises",
    number: "08",
    title: { fr: "Conseil et accompagnement des entreprises", en: "Business consulting and support" },
    short: {
      fr: "Une direction stratégique externe pour structurer et piloter le développement.",
      en: "External strategic leadership to structure and guide development.",
    },
    intro: {
      fr: "Nous accompagnons les dirigeants dans la durée pour clarifier les responsabilités, structurer les services, piloter les projets et maintenir l’alignement entre les objectifs et l’exécution.",
      en: "We support executives over time to clarify responsibilities, structure departments, guide projects and maintain alignment between objectives and execution.",
    },
    problems: {
      fr: ["Une entreprise qui grandit sans structure organisationnelle adaptée.", "Des projets nombreux, mais insuffisamment priorisés ou pilotés.", "Des dirigeants isolés face à des décisions transversales."],
      en: ["A company growing without an adapted organizational structure.", "Numerous projects without sufficient prioritization or oversight.", "Executives isolated when facing cross-functional decisions."],
    },
    services: {
      fr: ["Accompagnement à la création d’entreprise", "Structuration organisationnelle", "Définition des responsabilités internes", "Conseil en gestion", "Accompagnement des dirigeants", "Plans de transformation", "Pilotage de projets", "Stratégie de développement", "Suivi des objectifs", "Accompagnement à long terme"],
      en: ["Business creation support", "Organizational structuring", "Internal responsibility definition", "Management consulting", "Executive support", "Transformation plans", "Project leadership", "Development strategy", "Objective monitoring", "Long-term support"],
    },
    deliverables: {
      fr: ["Structure organisationnelle et matrice des responsabilités", "Plan de transformation priorisé", "Gouvernance de projet et outils de pilotage", "Rituel de suivi des objectifs et accompagnement des dirigeants"],
      en: ["Organizational structure and responsibility matrix", "Prioritized transformation plan", "Project governance and management tools", "Objective review cadence and executive support"],
    },
  },
];

export type Solution = {
  slug: string;
  name: string;
  category: Localized;
  summary: Localized;
  objective: Localized;
  scope: LocalizedList;
  deliverables: LocalizedList;
  outcomes: LocalizedList;
};

export const solutions: Solution[] = [
  {
    slug: "launch",
    name: "BENEX Launch",
    category: { fr: "Création", en: "Creation" },
    summary: { fr: "Passer d’une ambition à un lancement structuré, crédible et commercialisable.", en: "Move from ambition to a structured, credible and market-ready launch." },
    objective: { fr: "Réunir les fondations stratégiques, visuelles, numériques et commerciales nécessaires au démarrage d’une entreprise.", en: "Bring together the strategic, visual, digital and commercial foundations needed to start a business." },
    scope: { fr: ["Étude de marché initiale et positionnement", "Identité de marque et supports essentiels", "Site web et présence numérique", "Plan de lancement et stratégie commerciale"], en: ["Initial market research and positioning", "Brand identity and essential materials", "Website and digital presence", "Launch plan and sales strategy"] },
    deliverables: { fr: ["Dossier de positionnement", "Identité et charte graphique", "Plateforme web de lancement", "Feuille de route commerciale"], en: ["Positioning brief", "Identity and brand guidelines", "Launch web platform", "Commercial roadmap"] },
    outcomes: { fr: ["Clarifier l’offre et les marchés prioritaires", "Présenter une marque cohérente", "Disposer d’outils de vente utilisables", "Orchestrer les premières actions d’acquisition"], en: ["Clarify the offer and priority markets", "Present a coherent brand", "Provide usable sales tools", "Coordinate initial acquisition activities"] },
  },
  {
    slug: "digital",
    name: "BENEX Digital",
    category: { fr: "Transformation", en: "Transformation" },
    summary: { fr: "Faire de votre écosystème numérique un levier d’efficacité et de croissance.", en: "Turn your digital ecosystem into a lever for efficiency and growth." },
    objective: { fr: "Moderniser les points de contact numériques et connecter les outils qui soutiennent le parcours client.", en: "Modernize digital touchpoints and connect the tools supporting the customer journey." },
    scope: { fr: ["Site web et expérience utilisateur", "Référencement et présence digitale", "CRM et outils numériques", "Automatisation des parcours et mesure"], en: ["Website and user experience", "Search visibility and digital presence", "CRM and digital tools", "Journey automation and measurement"] },
    deliverables: { fr: ["Architecture et plateforme numérique", "Intégrations documentées", "Plan SEO et tableaux de suivi", "Guide d’utilisation et de maintenance"], en: ["Digital architecture and platform", "Documented integrations", "SEO plan and monitoring dashboards", "Usage and maintenance guide"] },
    outcomes: { fr: ["Améliorer les parcours de conversion", "Réduire les saisies redondantes", "Centraliser l’information client", "Piloter la performance numérique"], en: ["Improve conversion journeys", "Reduce duplicate data entry", "Centralize customer information", "Manage digital performance"] },
  },
  {
    slug: "growth",
    name: "BENEX Growth",
    category: { fr: "Acquisition", en: "Acquisition" },
    summary: { fr: "Structurer un moteur commercial qui transforme les marchés ciblés en opportunités suivies.", en: "Build a commercial engine that turns target markets into tracked opportunities." },
    objective: { fr: "Coordonner prospection, marketing et suivi commercial autour d’un pipeline partagé.", en: "Coordinate prospecting, marketing and sales follow-up around a shared pipeline." },
    scope: { fr: ["Recherche de clients et d’opportunités", "Campagnes marketing et prospection", "Propositions commerciales et appels d’offres", "Gestion du pipeline et analyse"], en: ["Customer and opportunity research", "Marketing and outreach campaigns", "Sales proposals and tenders", "Pipeline management and analysis"] },
    deliverables: { fr: ["Plan d’acquisition et ciblage", "Campagnes et argumentaires", "Pipeline et modèles de propositions", "Rapports de performance commerciale"], en: ["Acquisition plan and targeting", "Campaigns and sales narratives", "Pipeline and proposal templates", "Sales performance reports"] },
    outcomes: { fr: ["Accroître la régularité de la prospection", "Améliorer la qualification", "Renforcer le suivi des opportunités", "Éclairer les décisions d’investissement commercial"], en: ["Increase prospecting consistency", "Improve qualification", "Strengthen opportunity follow-up", "Inform commercial investment decisions"] },
  },
  {
    slug: "performance",
    name: "BENEX Performance",
    category: { fr: "Opérations", en: "Operations" },
    summary: { fr: "Aligner processus, ressources et logistique sur les exigences de votre croissance.", en: "Align processes, resources and logistics with your growth requirements." },
    objective: { fr: "Améliorer l’exécution et la qualité de service en agissant sur les irritants opérationnels mesurables.", en: "Improve execution and service quality by addressing measurable operational friction." },
    scope: { fr: ["Audit et cartographie des opérations", "Processus et organisation des équipes", "Flux logistiques, stocks et ressources", "Indicateurs et amélioration continue"], en: ["Operations audit and mapping", "Processes and team organization", "Logistics flows, inventory and resources", "Indicators and continuous improvement"] },
    deliverables: { fr: ["Diagnostic opérationnel", "Procédures et responsabilités", "Plan d’optimisation", "Tableau de bord de performance"], en: ["Operational diagnostic", "Procedures and responsibilities", "Optimization plan", "Performance dashboard"] },
    outcomes: { fr: ["Réduire les frictions et les reprises", "Clarifier l’organisation du travail", "Améliorer l’utilisation des ressources", "Installer une discipline d’amélioration"], en: ["Reduce friction and rework", "Clarify work organization", "Improve resource utilization", "Establish a discipline of improvement"] },
  },
  {
    slug: "intelligence",
    name: "BENEX Intelligence",
    category: { fr: "Technologie", en: "Technology" },
    summary: { fr: "Moderniser les opérations grâce à des cas d’usage IA et d’automatisation maîtrisés.", en: "Modernize operations through controlled AI and automation use cases." },
    objective: { fr: "Transformer les tâches répétitives et les données sous-exploitées en workflows fiables et en information décisionnelle.", en: "Turn repetitive tasks and underused data into reliable workflows and decision-ready information." },
    scope: { fr: ["Cadrage des cas d’usage et gouvernance", "Agents IA et assistants professionnels", "Automatisation des workflows", "Données, rapports et tableaux de bord"], en: ["Use-case framing and governance", "AI agents and professional assistants", "Workflow automation", "Data, reporting and dashboards"] },
    deliverables: { fr: ["Feuille de route des cas d’usage", "Solutions configurées et documentées", "Contrôles et règles d’utilisation", "Formation et suivi d’adoption"], en: ["Use-case roadmap", "Configured, documented solutions", "Controls and usage rules", "Training and adoption monitoring"] },
    outcomes: { fr: ["Libérer du temps pour les tâches à valeur", "Fiabiliser les rapports", "Améliorer l’accès à l’information", "Adopter l’IA avec des règles claires"], en: ["Free time for high-value work", "Improve reporting reliability", "Improve access to information", "Adopt AI with clear rules"] },
  },
  {
    slug: "360",
    name: "BENEX 360",
    category: { fr: "Conseil global", en: "Integrated consulting" },
    summary: { fr: "Une direction externalisée pour coordonner stratégie, commercial, numérique et opérations.", en: "External leadership coordinating strategy, sales, digital and operations." },
    objective: { fr: "Créer un accompagnement transversal et évolutif autour des priorités propres à votre organisation.", en: "Create cross-functional, scalable support around your organization’s specific priorities." },
    scope: { fr: ["Diagnostic global et gouvernance", "Combinaison personnalisée des expertises", "Pilotage de projets et accompagnement des dirigeants", "Suivi des objectifs et optimisation continue"], en: ["Comprehensive diagnostic and governance", "Custom combination of expertise", "Project leadership and executive support", "Objective monitoring and continuous optimization"] },
    deliverables: { fr: ["Feuille de route intégrée", "Comité de pilotage et indicateurs", "Plans de projet coordonnés", "Recommandations stratégiques périodiques"], en: ["Integrated roadmap", "Steering committee and indicators", "Coordinated project plans", "Periodic strategic recommendations"] },
    outcomes: { fr: ["Aligner les initiatives entre elles", "Simplifier la coordination des partenaires", "Accélérer la prise de décision", "Maintenir une vision globale de la performance"], en: ["Align initiatives", "Simplify partner coordination", "Accelerate decision-making", "Maintain a comprehensive view of performance"] },
  },
];

export type Sector = {
  slug: string;
  name: Localized;
  intro: Localized;
  challenges: LocalizedList;
  responses: LocalizedList;
};

export const sectors: Sector[] = [
  {
    slug: "services-professionnels",
    name: { fr: "Services professionnels", en: "Professional services" },
    intro: { fr: "Valoriser l’expertise, structurer l’acquisition et rendre la prestation plus efficace.", en: "Showcase expertise, structure acquisition and make service delivery more efficient." },
    challenges: { fr: ["Différencier une offre fondée sur l’expertise.", "Maintenir un pipeline régulier sans diluer la prestation.", "Standardiser les propositions et le suivi client."], en: ["Differentiate an expertise-led offer.", "Maintain a consistent pipeline without diluting delivery.", "Standardize proposals and client follow-up."] },
    responses: { fr: ["Positionnement, identité et contenus de démonstration.", "Prospection ciblée, campagnes et gestion du pipeline.", "Modèles de propositions, portail client et automatisation administrative."], en: ["Positioning, identity and thought-leadership content.", "Targeted outreach, campaigns and pipeline management.", "Proposal templates, client portal and administrative automation."] },
  },
  {
    slug: "commerce-distribution",
    name: { fr: "Commerce et distribution", en: "Retail and distribution" },
    intro: { fr: "Connecter les canaux de vente, les opérations et la connaissance client.", en: "Connect sales channels, operations and customer knowledge." },
    challenges: { fr: ["Coordonner inventaire, ventes et approvisionnement.", "Attirer et fidéliser les clients sur plusieurs canaux.", "Obtenir une lecture fiable de la rentabilité."], en: ["Coordinate inventory, sales and supply.", "Attract and retain customers across channels.", "Obtain a reliable view of profitability."] },
    responses: { fr: ["Commerce électronique, CRM et campagnes d’acquisition.", "Optimisation des flux et des processus de stock.", "Tableaux de bord commerciaux et opérationnels."], en: ["E-commerce, CRM and acquisition campaigns.", "Inventory flow and process optimization.", "Commercial and operational dashboards."] },
  },
  {
    slug: "immobilier",
    name: { fr: "Immobilier", en: "Real estate" },
    intro: { fr: "Soutenir la visibilité des projets et la qualification des demandes.", en: "Support project visibility and inquiry qualification." },
    challenges: { fr: ["Présenter clairement des projets et des propriétés.", "Qualifier un volume important de demandes.", "Coordonner le suivi entre équipes et partenaires."], en: ["Present projects and properties clearly.", "Qualify a high volume of inquiries.", "Coordinate follow-up between teams and partners."] },
    responses: { fr: ["Plateformes de présentation et contenus professionnels.", "Formulaires intelligents, CRM et automatisations.", "Campagnes ciblées et tableaux de suivi des prospects."], en: ["Presentation platforms and professional content.", "Smart forms, CRM and automation.", "Targeted campaigns and prospect tracking dashboards."] },
  },
  {
    slug: "entretien-maintenance",
    name: { fr: "Entretien et maintenance", en: "Maintenance and field services" },
    intro: { fr: "Développer les contrats tout en fluidifiant la planification et le service.", en: "Grow contracts while streamlining planning and service." },
    challenges: { fr: ["Générer des demandes dans les zones desservies.", "Planifier les équipes et les interventions.", "Suivre les renouvellements et les opportunités contractuelles."], en: ["Generate inquiries across service areas.", "Schedule teams and service calls.", "Track renewals and contract opportunities."] },
    responses: { fr: ["Référencement local et campagnes géociblées.", "Workflows de qualification, planification et suivi.", "Veille d’appels d’offres et pipeline de contrats."], en: ["Local SEO and geo-targeted campaigns.", "Qualification, scheduling and follow-up workflows.", "Tender monitoring and contract pipeline."] },
  },
  {
    slug: "construction",
    name: { fr: "Construction", en: "Construction" },
    intro: { fr: "Renforcer la crédibilité, les soumissions et la coordination des projets.", en: "Strengthen credibility, bids and project coordination." },
    challenges: { fr: ["Accéder aux bons appels d’offres.", "Préparer des soumissions claires et compétitives.", "Suivre projets, ressources et communications."], en: ["Access the right tenders.", "Prepare clear, competitive bids.", "Track projects, resources and communications."] },
    responses: { fr: ["Veille contractuelle et préparation de propositions.", "Identité institutionnelle et présentations de projets.", "Outils de pilotage, indicateurs et portail client."], en: ["Contract monitoring and proposal preparation.", "Institutional identity and project presentations.", "Management tools, indicators and client portal."] },
  },
  {
    slug: "industrie-fabrication",
    name: { fr: "Industrie et fabrication", en: "Manufacturing and industry" },
    intro: { fr: "Relier performance de production, information et développement des marchés.", en: "Connect production performance, information and market development." },
    challenges: { fr: ["Réduire les pertes et les frictions de production.", "Consolider les données opérationnelles.", "Développer de nouveaux marchés B2B."], en: ["Reduce production losses and friction.", "Consolidate operational data.", "Develop new B2B markets."] },
    responses: { fr: ["Audit des processus et optimisation des flux.", "Automatisation des rapports et tableaux de bord.", "Intelligence de marché et développement commercial ciblé."], en: ["Process audits and flow optimization.", "Report automation and dashboards.", "Market intelligence and targeted business development."] },
  },
  {
    slug: "transport-logistique",
    name: { fr: "Transport et logistique", en: "Transportation and logistics" },
    intro: { fr: "Améliorer la visibilité des flux et la réactivité commerciale.", en: "Improve flow visibility and commercial responsiveness." },
    challenges: { fr: ["Optimiser les ressources et les itinéraires.", "Rendre les délais et les coûts plus lisibles.", "Répondre rapidement aux appels d’offres."], en: ["Optimize resources and routes.", "Make lead times and costs clearer.", "Respond quickly to tenders."] },
    responses: { fr: ["Analyse des flux et indicateurs de service.", "Intégration des données et rapports automatisés.", "Veille, propositions et pipeline commercial."], en: ["Flow analysis and service indicators.", "Data integration and automated reporting.", "Monitoring, proposals and sales pipeline."] },
  },
  {
    slug: "hotellerie-restauration",
    name: { fr: "Hôtellerie et restauration", en: "Hospitality and food service" },
    intro: { fr: "Créer une expérience distinctive avant, pendant et après la visite.", en: "Create a distinctive experience before, during and after each visit." },
    challenges: { fr: ["Accroître la visibilité et les réservations directes.", "Maintenir une expérience de marque cohérente.", "Optimiser la planification et la qualité de service."], en: ["Increase visibility and direct bookings.", "Maintain a coherent brand experience.", "Optimize scheduling and service quality."] },
    responses: { fr: ["Identité, contenus et plateformes de réservation.", "Campagnes locales et gestion de la réputation.", "Processus opérationnels et indicateurs de service."], en: ["Identity, content and booking platforms.", "Local campaigns and reputation management.", "Operational processes and service indicators."] },
  },
  {
    slug: "commerce-electronique",
    name: { fr: "Commerce électronique", en: "E-commerce" },
    intro: { fr: "Optimiser l’ensemble du parcours, de l’acquisition à la fidélisation.", en: "Optimize the entire journey from acquisition to retention." },
    challenges: { fr: ["Améliorer la conversion et la découverte des produits.", "Maîtriser le coût d’acquisition.", "Coordonner commandes, stocks et service client."], en: ["Improve conversion and product discovery.", "Control acquisition costs.", "Coordinate orders, inventory and customer service."] },
    responses: { fr: ["Expérience d’achat, SEO et analyse des conversions.", "Campagnes, contenus et mesure du rendement.", "Intégrations CRM, automatisations et tableaux de bord."], en: ["Shopping experience, SEO and conversion analysis.", "Campaigns, content and performance measurement.", "CRM integrations, automation and dashboards."] },
  },
  {
    slug: "jeunes-entreprises-pme",
    name: { fr: "Jeunes entreprises et PME", en: "Startups and SMEs" },
    intro: { fr: "Accéder à des compétences transversales sans multiplier les structures internes.", en: "Access cross-functional expertise without multiplying internal structures." },
    challenges: { fr: ["Prioriser les investissements avec des ressources limitées.", "Structurer la croissance sans alourdir l’organisation.", "Coordonner plusieurs fournisseurs spécialisés."], en: ["Prioritize investments with limited resources.", "Structure growth without overloading the organization.", "Coordinate multiple specialized suppliers."] },
    responses: { fr: ["Diagnostic global et feuille de route par étapes.", "Solutions Launch, Digital, Growth ou 360 selon la maturité.", "Interlocuteur unique et pilotage intégré des initiatives."], en: ["Comprehensive diagnostic and phased roadmap.", "Launch, Digital, Growth or 360 solutions based on maturity.", "Single point of contact and integrated initiative management."] },
  },
];

export const methodSteps = [
  { number: "01", title: { fr: "Diagnostic et compréhension", en: "Diagnostic and understanding" }, text: { fr: "Nous cadrons les enjeux, les objectifs, les contraintes et la réalité de vos équipes.", en: "We frame the issues, objectives, constraints and realities facing your teams." } },
  { number: "02", title: { fr: "Analyse stratégique", en: "Strategic analysis" }, text: { fr: "Nous analysons les marchés, les données, les processus et les options pour hiérarchiser les décisions.", en: "We analyze markets, data, processes and options to prioritize decisions." } },
  { number: "03", title: { fr: "Conception des solutions", en: "Solution design" }, text: { fr: "Nous définissons le périmètre, les livrables, les responsabilités et les indicateurs de réussite.", en: "We define scope, deliverables, responsibilities and success indicators." } },
  { number: "04", title: { fr: "Déploiement opérationnel", en: "Operational deployment" }, text: { fr: "Nous coordonnons l’exécution, documentons les outils et accompagnons l’adoption.", en: "We coordinate execution, document tools and support adoption." } },
  { number: "05", title: { fr: "Mesure et optimisation continue", en: "Measurement and continuous optimization" }, text: { fr: "Nous suivons les résultats convenus, tirons les apprentissages et ajustons les priorités.", en: "We track agreed outcomes, capture learnings and adjust priorities." } },
];

export const principles = [
  { fr: "Comprendre les enjeux", en: "Understand the issues" },
  { fr: "Concevoir les solutions", en: "Design the solutions" },
  { fr: "Déployer les stratégies", en: "Deploy the strategies" },
  { fr: "Mesurer les résultats", en: "Measure the outcomes" },
];

export type Insight = {
  slug: string;
  title: Localized;
  category: Localized;
  excerpt: Localized;
  readingTime: Localized;
  body: { fr: { heading: string; text: string }[]; en: { heading: string; text: string }[] };
};

export const insights: Insight[] = [
  {
    slug: "diagnostic-avant-investissement-numerique",
    title: { fr: "Pourquoi le diagnostic doit précéder l’investissement numérique", en: "Why diagnosis should come before digital investment" },
    category: { fr: "Transformation", en: "Transformation" },
    excerpt: { fr: "Un nouvel outil ne corrige pas, à lui seul, un processus mal défini. La première décision consiste à comprendre où se crée réellement la valeur.", en: "A new tool cannot, by itself, fix a poorly defined process. The first decision is to understand where value is actually created." },
    readingTime: { fr: "4 min de lecture", en: "4 min read" },
    body: {
      fr: [
        { heading: "Partir du travail réel", text: "Avant de comparer les plateformes, il faut observer les tâches, les transferts d’information, les délais et les décisions. Cette lecture permet de distinguer un problème d’outil d’un problème de responsabilité, de processus ou de qualité des données." },
        { heading: "Hiérarchiser les cas d’usage", text: "Tous les irritants ne justifient pas une automatisation. Les cas prioritaires combinent une valeur tangible, un niveau de risque maîtrisable et une capacité d’adoption par les équipes. Cette hiérarchie évite de disperser les investissements." },
        { heading: "Définir la mesure avant le déploiement", text: "Temps de traitement, taux de reprise, qualité du suivi ou vitesse d’accès à l’information : les indicateurs doivent être choisis avec les utilisateurs. Ils serviront à évaluer la solution et à décider des itérations suivantes." },
      ],
      en: [
        { heading: "Start with real work", text: "Before comparing platforms, observe tasks, information handoffs, delays and decisions. This distinguishes a tool problem from an issue of responsibility, process or data quality." },
        { heading: "Prioritize use cases", text: "Not every pain point justifies automation. Priority cases combine tangible value, manageable risk and a realistic capacity for team adoption. This prevents scattered investment." },
        { heading: "Define measurement before deployment", text: "Processing time, rework rate, follow-up quality or speed of access to information: indicators should be chosen with users. They guide evaluation and subsequent iterations." },
      ],
    },
  },
  {
    slug: "prospection-b2b-consentement-quebec",
    title: { fr: "Prospection B2B au Québec : intégrer le consentement dès la conception", en: "B2B prospecting in Quebec: build consent in from the start" },
    category: { fr: "Développement commercial", en: "Business development" },
    excerpt: { fr: "La conformité n’est pas une mention ajoutée au bas d’un courriel. Elle influence le ciblage, la documentation, les messages et la gestion des préférences.", en: "Compliance is not a footnote added to an email. It shapes targeting, documentation, messaging and preference management." },
    readingTime: { fr: "5 min de lecture", en: "5 min read" },
    body: {
      fr: [
        { heading: "Documenter l’origine et la finalité", text: "Une base commerciale utile doit conserver la source des coordonnées, la raison du contact et les préférences exprimées. Cette discipline facilite la qualification autant que la conformité." },
        { heading: "Concevoir des messages pertinents", text: "La personnalisation ne consiste pas seulement à reprendre un nom. Elle repose sur un lien clair entre le rôle du destinataire, son contexte d’affaires et la raison de la prise de contact." },
        { heading: "Prévoir le retrait et le suivi", text: "Le processus doit rendre le retrait simple et garantir sa prise en compte dans les campagnes futures. Les règles applicables, notamment la Loi canadienne anti-pourriel, doivent être examinées selon le contexte de chaque campagne avec les conseils appropriés." },
      ],
      en: [
        { heading: "Document source and purpose", text: "A useful commercial database retains the source of contact details, the reason for contact and expressed preferences. This discipline supports both qualification and compliance." },
        { heading: "Design relevant messages", text: "Personalization is more than using a name. It relies on a clear connection between the recipient’s role, business context and the reason for outreach." },
        { heading: "Plan withdrawal and follow-up", text: "The process must make withdrawal simple and ensure it is respected in future campaigns. Applicable rules, including Canada’s Anti-Spam Legislation, should be reviewed for each campaign context with appropriate advice." },
      ],
    },
  },
  {
    slug: "indicateurs-pilotage-croissance",
    title: { fr: "Cinq indicateurs ne suffisent pas : construire un système de pilotage utile", en: "Five indicators are not enough: build a useful management system" },
    category: { fr: "Performance", en: "Performance" },
    excerpt: { fr: "Un tableau de bord n’a de valeur que s’il déclenche une décision, une responsabilité et une action dans un rythme de gestion clairement défini.", en: "A dashboard only has value when it triggers a decision, ownership and action within a clearly defined management cadence." },
    readingTime: { fr: "4 min de lecture", en: "4 min read" },
    body: {
      fr: [
        { heading: "Relier chaque indicateur à une décision", text: "Un indicateur doit répondre à une question précise : faut-il ajuster une campagne, réallouer une ressource, revoir une étape du processus ou approfondir une analyse ? Sans cette relation, il devient une information de plus." },
        { heading: "Attribuer une responsabilité", text: "La qualité de la donnée, l’interprétation et l’action doivent avoir des responsables identifiés. Cette distinction évite que le tableau de bord soit produit sans être réellement utilisé." },
        { heading: "Installer un rythme d’apprentissage", text: "La fréquence de revue dépend de la vitesse du phénomène observé. Une bonne réunion de pilotage documente les écarts, les hypothèses, les décisions et les vérifications à effectuer au prochain cycle." },
      ],
      en: [
        { heading: "Connect every indicator to a decision", text: "An indicator should answer a precise question: adjust a campaign, reallocate a resource, redesign a process step or investigate further? Without that connection, it becomes just more information." },
        { heading: "Assign ownership", text: "Data quality, interpretation and action need identified owners. This distinction prevents dashboards from being produced without genuinely being used." },
        { heading: "Establish a learning cadence", text: "Review frequency depends on the speed of what is observed. An effective review documents gaps, assumptions, decisions and the checks required in the next cycle." },
      ],
    },
  },
];

/** Which expertises each offer draws on. The single source for "related" links and the offer/expertise matrix. */
export const solutionExpertises: Record<string, string[]> = {
  launch: ["strategie-intelligence-economique", "identite-marque-communication", "developpement-web-transformation-numerique", "developpement-commercial-acquisition"],
  digital: ["developpement-web-transformation-numerique", "intelligence-artificielle-automatisation", "marketing-digital-publicite"],
  growth: ["developpement-commercial-acquisition", "marketing-digital-publicite"],
  performance: ["performance-operationnelle-logistique", "conseil-accompagnement-entreprises"],
  intelligence: ["intelligence-artificielle-automatisation", "performance-operationnelle-logistique"],
  "360": expertises.map((expertise) => expertise.slug),
};
