import type { Localized, LocalizedList } from "../content";

const L = (fr: string, en: string): Localized => ({ fr, en });
const LL = (fr: string[], en: string[]): LocalizedList => ({ fr, en });

/** Six service domains: how the ten expertises are presented to visitors. */
export const serviceDomains: Array<{ key: string; title: Localized; text: Localized; expertises: string[] }> = [
  { key: "web", title: L("Sites Web et présence numérique", "Websites and digital presence"), text: L("Création, refonte, pages de vente, formulaires, entretien et amélioration du site.", "Creation, redesign, sales pages, forms, upkeep and improvement of the site."), expertises: ["sites-web-solutions-numeriques"] },
  { key: "brand", title: L("Image de marque et création numérique", "Brand image and digital creation"), text: L("Identité visuelle, images, contenu, publicité visuelle et matériel de communication.", "Visual identity, images, content, visual advertising and communication material."), expertises: ["marketing-strategique-numerique"] },
  { key: "marketing", title: L("Marketing et acquisition de clients", "Marketing and customer acquisition"), text: L("Campagnes publicitaires, marketing par courriel, visibilité locale, prospection et suivi des résultats.", "Ad campaigns, e-mail marketing, local visibility, prospecting and results tracking."), expertises: ["publicite-numerique-ppc", "customer-marketing-experience-client"] },
  { key: "market", title: L("Études de marché et développement commercial", "Market studies and business development"), text: L("Analyse de marché et de la concurrence, développement de services, plans de croissance et recherche d’occasions d’affaires.", "Market and competition analysis, service development, growth plans and search for business opportunities."), expertises: ["analyse-marche-intelligence-economique", "conseil-strategique-analyse-affaires", "creation-developpement-croissance"] },
  { key: "ops", title: L("Opérations et logistique", "Operations and logistics"), text: L("Diagnostic des processus, amélioration de l’efficacité, optimisation des flux et plan d’action.", "Process diagnostic, efficiency improvement, flow optimization and action plan."), expertises: ["solutions-operationnelles", "logistique-chaine-approvisionnement"] },
  { key: "ai", title: L("Automatisation et agents IA", "Automation and AI agents"), text: L("Automatisation des tâches, agents de clavardage ou de soutien et agents téléphoniques lorsque les outils du client le permettent.", "Task automation, chat or support agents and phone agents when the client’s tools allow."), expertises: ["intelligence-artificielle-automatisation"] },
];

export const workWays: Array<{ key: string; title: Localized; text: Localized; to: string }> = [
  { key: "once", title: L("Services ponctuels", "One-off services"), text: L("Vous savez ce que vous voulez acheter : un site, une campagne, une étude, un diagnostic, une automatisation. Prix, livrables, échéancier et limites sont définis avant le début.", "You know what you want to buy: a site, a campaign, a study, a diagnostic, an automation. Price, deliverables, timeline and limits are set before the start."), to: "/tarifs#unite" },
  { key: "monthly", title: L("Accompagnements mensuels", "Monthly support"), text: L("Vous retenez AUREX pour faire avancer régulièrement une priorité. Chaque forfait indique le travail compris et sa fréquence.", "You retain AUREX to move a priority forward regularly. Each plan states the work included and its frequency."), to: "/tarifs#forfaits" },
  { key: "packs", title: L("Packs intégrés", "Integrated packs"), text: L("Plusieurs services réunis autour d’un objectif. Les packs coordonnent les travaux ; ils ne donnent pas accès à une quantité illimitée de services.", "Several services combined around one goal. Packs coordinate the work; they do not give access to unlimited services."), to: "/tarifs#packs" },
];

export type Pack = { slug: string; name: string; need: Localized; services: LocalizedList; from: Localized; to: string };
export const packs: Pack[] = [
  { slug: "pack-lancement", name: "Pack Lancement", need: L("Démarrer ou repositionner une entreprise.", "Start or reposition a business."),
    services: LL(["Diagnostic stratégique express", "Identité visuelle essentielle", "Site vitrine de base", "Préparation du lancement"], ["Express strategic diagnostic", "Essential visual identity", "Basic showcase website", "Launch preparation"]),
    from: L("Dès 1 726 $ (total des services publiés, précisé dans votre soumission)", "From $1,726 (total of the published services, confirmed in your quote)"), to: "/soumission?solution=pack-lancement" },
  { slug: "pack-acquisition", name: "Pack Acquisition", need: L("Générer et mieux suivre les demandes de clients.", "Generate and better track customer enquiries."),
    services: LL(["Page de conversion", "Campagne publicitaire (budget payé à la plateforme)", "Suivi des demandes"], ["Conversion page", "Ad campaign (budget paid to the platform)", "Enquiry tracking"]),
    from: L("Mise en place dès 919 $, puis gestion dès 449 $ par mois", "Setup from $919, then management from $449 per month"), to: "/soumission?solution=pack-acquisition" },
  { slug: "pack-croissance", name: "Pack Croissance", need: L("Développer une entreprise déjà en activité.", "Grow a business already in operation."),
    services: LL(["Analyse de la situation", "Stratégie et plan d’action", "Marketing", "Amélioration du suivi commercial"], ["Situation analysis", "Strategy and action plan", "Marketing", "Better sales follow-up"]),
    from: L("Dès 567 $ (diagnostic), puis soumission selon le plan retenu", "From $567 (diagnostic), then a quote based on the chosen plan"), to: "/soumission?solution=pack-croissance" },
  { slug: "pack-operations", name: "Pack Opérations", need: L("Comprendre et améliorer un processus.", "Understand and improve a process."),
    services: LL(["Diagnostic des processus", "Recommandations", "Soutien à la mise en œuvre"], ["Process diagnostic", "Recommendations", "Implementation support"]),
    from: L("Dès 567 $ (diagnostic), puis soumission", "From $567 (diagnostic), then a quote"), to: "/soumission?solution=pack-operations" },
  { slug: "pack-automatisation", name: "Pack Automatisation IA", need: L("Automatiser une tâche ou un parcours client.", "Automate a task or customer journey."),
    services: LL(["Analyse du processus", "Projet pilote", "Intégration", "Maintenance facultative"], ["Process analysis", "Pilot project", "Integration", "Optional maintenance"]),
    from: L("Dès 990 $, puis suivi facultatif dès 290 $ par mois", "From $990, then optional upkeep from $290 per month"), to: "/soumission?solution=pack-automatisation" },
  { slug: "pack-partenaire", name: "Partenaire AUREX", need: L("Bénéficier d’un suivi continu.", "Benefit from continuous support."),
    services: LL(["Plan de 90 jours centré sur une priorité principale", "Accompagnement mensuel défini selon vos priorités", "Rapport de progression et rencontre mensuelle"], ["90-day plan focused on one main priority", "Monthly support defined by your priorities", "Progress report and monthly meeting"]),
    from: L("Dès 1 500 $ par mois (forfait PARTENAIRE)", "From $1,500 per month (PARTENAIRE plan)"), to: "/tarifs#plan-partenaire" },
];

export const customerJourney = L("Comprendre le besoin → choisir une intervention → réaliser le mandat → mesurer l’avancement → proposer la suite utile.", "Understand the need → choose an intervention → deliver the mandate → measure progress → suggest the useful next step.");
export const packsNote = L("Un pack coordonne plusieurs services ; il ne donne pas accès à une quantité illimitée de travail. Les frais de publicité, les logiciels, les licences et les coûts d’utilisation des agents IA sont séparés. Le prix de départ est le total des services publiés ; le prix ferme figure dans votre soumission.", "A pack coordinates several services; it does not give access to unlimited work. Advertising fees, software, licences and AI agent usage costs are separate. The starting price is the total of the published services; the firm price appears in your quote.");
export const positioning = L("AUREX Solutions aide les entreprises à mieux se présenter, à attirer des clients et à améliorer leurs opérations grâce au Web, au marketing, au conseil et à l’intelligence artificielle.", "AUREX Solutions helps businesses present themselves better, attract customers and improve their operations through the web, marketing, consulting and artificial intelligence.");
