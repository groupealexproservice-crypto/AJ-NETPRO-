export type Lang = "fr" | "en";
export type Localized = { fr: string; en: string };
export type LocalizedList = { fr: string[]; en: string[] };

export const tx = (value: Localized, lang: Lang) => value[lang];
export const txList = (value: LocalizedList, lang: Lang) => value[lang];


export type Sector = {
  slug: string;
  name: Localized;
  intro: Localized;
  challenges: LocalizedList;
  responses: LocalizedList;
  benefits?: LocalizedList;
};


const legacySectors: Sector[] = [
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

export * from "./data/kpis";
export * from "./data/poles";
export * from "./data/expertises";
import { buildSectors } from "./data/sectors";
export * from "./data/offers";
export * from "./data/ai";
export * from "./data/why";
export * from "./data/innovations";
export * from "./data/entryOffers";
/** The thirteen industries served. */
export const sectors: Sector[] = buildSectors(legacySectors);

