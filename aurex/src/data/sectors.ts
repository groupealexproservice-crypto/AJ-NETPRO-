import type { Localized, LocalizedList, Sector } from "../content";

const L = (fr: string, en: string): Localized => ({ fr, en });
const LL = (fr: string[], en: string[]): LocalizedList => ({ fr, en });

/** Potential economic benefits per industry: directions to explore with the client, never promised results. */
const benefits: Record<string, LocalizedList> = {
  "pme-entrepreneurs": LL(["Prioriser les investissements qui rapportent le plus vite.", "Réduire le temps de direction consacré aux tâches répétitives.", "Structurer la croissance sans alourdir les coûts fixes."], ["Prioritize the investments that pay back fastest.", "Reduce management time spent on repetitive tasks.", "Structure growth without adding fixed costs."]),
  "commerce-detail": LL(["Améliorer la rotation des stocks et réduire les surplus.", "Augmenter la valeur moyenne et la fréquence d’achat.", "Mieux répartir le budget entre magasin, web et publicité."], ["Improve stock turnover and reduce surplus.", "Raise average order value and purchase frequency.", "Allocate budget better across store, web and advertising."]),
  "commerce-electronique": LL(["Améliorer le taux de conversion de la boutique.", "Maîtriser le coût d’acquisition et le rendement publicitaire.", "Augmenter les achats récurrents par la fidélisation."], ["Improve the store’s conversion rate.", "Control acquisition cost and ad return.", "Increase repeat purchases through retention."]),
  "construction-immobilier": LL(["Gagner du temps sur la préparation des soumissions.", "Accroître le nombre d’occasions qualifiées suivies.", "Mieux suivre les coûts et les échéanciers de projet."], ["Save time preparing bids.", "Increase the number of qualified opportunities followed up.", "Track project costs and schedules more closely."]),
  "industrie-fabrication": LL(["Réduire les pertes et les arrêts de production.", "Consolider les données pour décider plus vite.", "Ouvrir de nouveaux marchés B2B avec une prospection ciblée."], ["Reduce production losses and downtime.", "Consolidate data to decide faster.", "Open new B2B markets with targeted prospecting."]),
  "transport-logistique": LL(["Mieux utiliser les ressources et les itinéraires.", "Rendre les délais et les coûts plus lisibles.", "Répondre plus vite aux appels d’offres."], ["Make better use of resources and routes.", "Make lead times and costs clearer.", "Respond faster to tenders."]),
  "hotellerie-restauration": LL(["Accroître les réservations directes.", "Mieux planifier le personnel et les achats.", "Fidéliser une clientèle qui revient."], ["Increase direct bookings.", "Plan staff and purchasing more effectively.", "Retain customers who return."]),
  "services-professionnels": LL(["Régulariser le flux de nouveaux mandats.", "Réduire le temps administratif non facturable.", "Standardiser les propositions et le suivi client."], ["Smooth the flow of new engagements.", "Reduce non-billable administrative time.", "Standardize proposals and client follow-up."]),
  "entretien-maintenance": LL(["Remplir les tournées et les zones desservies.", "Réduire le temps de planification et de déplacement.", "Suivre les renouvellements de contrats."], ["Fill routes and service areas.", "Cut planning and travel time.", "Track contract renewals."]),
  "sport-bien-etre": LL(["Augmenter les abonnements et réduire les départs.", "Remplir les plages à faible fréquentation.", "Mieux communiquer avec les membres et les clients."], ["Increase memberships and reduce churn.", "Fill low-attendance time slots.", "Communicate better with members and customers."]),
  "sante": LL(["Libérer du temps administratif pour le soin et l’accueil.", "Simplifier la prise de rendez-vous et les rappels.", "Mieux faire connaître les services auprès de la population desservie."], ["Free administrative time for care and reception.", "Simplify appointment booking and reminders.", "Make services better known to the population served."]),
  "grandes-organisations": LL(["Coordonner plusieurs départements autour d’une même feuille de route.", "Réduire les coûts de processus répétitifs à grande échelle.", "Encadrer l’IA par une gouvernance claire."], ["Coordinate several departments around one roadmap.", "Reduce the cost of repetitive processes at scale.", "Frame AI with clear governance."]),
  "technologies-innovation": LL(["Accélérer l’entrée sur le marché.", "Structurer l’acquisition de premiers clients payants.", "Prioriser le produit selon des données plutôt que des impressions."], ["Speed up market entry.", "Structure the acquisition of first paying customers.", "Prioritize the product with data rather than impressions."]),
};

const find = (legacy: Sector[], slug: string) => legacy.find((s) => s.slug === slug)!;

/** Builds the 13 industries from the retained industry texts, merged and extended. */
export function buildSectors(legacy: Sector[]): Sector[] {
  const pme = find(legacy, "jeunes-entreprises-pme");
  const retail = find(legacy, "commerce-distribution");
  const construction = find(legacy, "construction");
  const realEstate = find(legacy, "immobilier");
  const merge = (a: LocalizedList, b: LocalizedList, n = 2): LocalizedList => ({ fr: [...a.fr.slice(0, n), ...b.fr.slice(0, n)], en: [...a.en.slice(0, n), ...b.en.slice(0, n)] });

  const built: Sector[] = [
    { ...pme, slug: "pme-entrepreneurs", name: L("PME et entrepreneurs", "SMEs and entrepreneurs") },
    { ...retail, slug: "commerce-detail", name: L("Commerce de détail", "Retail"), intro: L("Relier magasin, web et stocks pour vendre plus et gaspiller moins.", "Connect store, web and inventory to sell more and waste less.") },
    { ...find(legacy, "commerce-electronique") },
    {
      slug: "construction-immobilier", name: L("Construction et immobilier", "Construction and real estate"),
      intro: L("Renforcer la crédibilité, les soumissions et le suivi des projets et des demandes.", "Strengthen credibility, bids, and the follow-up of projects and enquiries."),
      challenges: merge(construction.challenges, realEstate.challenges), responses: merge(construction.responses, realEstate.responses),
    },
    find(legacy, "industrie-fabrication"), find(legacy, "transport-logistique"), find(legacy, "hotellerie-restauration"),
    find(legacy, "services-professionnels"), find(legacy, "entretien-maintenance"),
    {
      slug: "sport-bien-etre", name: L("Sport et bien-être", "Sport and wellness"),
      intro: L("Faire croître la communauté de membres tout en simplifiant la gestion quotidienne.", "Grow the member community while simplifying day-to-day management."),
      challenges: LL(["Attirer de nouveaux membres et limiter les départs.", "Remplir les plages horaires moins fréquentées.", "Gérer inscriptions, paiements et communications à la main."], ["Attract new members and limit churn.", "Fill less popular time slots.", "Handle registrations, payments and communications by hand."]),
      responses: LL(["Campagnes locales, contenus et parcours d’inscription en ligne.", "Segmentation des membres et communications automatisées de rétention.", "Réservation, rappels et rapports automatisés."], ["Local campaigns, content and online sign-up journeys.", "Member segmentation and automated retention communications.", "Booking, reminders and automated reports."]),
    },
    {
      slug: "sante", name: L("Santé", "Health"),
      intro: L("Alléger l’administratif et améliorer l’accès aux services, dans le respect des renseignements sensibles.", "Lighten administration and improve access to services, while respecting sensitive information."),
      challenges: LL(["Charge administrative élevée autour de la prise de rendez-vous.", "Renseignements personnels de santé à protéger rigoureusement.", "Faire connaître les services et réduire les absences aux rendez-vous."], ["Heavy administrative load around appointment booking.", "Personal health information that must be rigorously protected.", "Making services known and reducing missed appointments."]),
      responses: LL(["Réservation en ligne, rappels automatisés et acheminement des demandes.", "Cadre de gouvernance, minimisation des données et consentements clairs.", "Site accessible, contenus d’information et visibilité locale."], ["Online booking, automated reminders and request routing.", "Governance framework, data minimization and clear consents.", "Accessible site, information content and local visibility."]),
    },
    {
      slug: "grandes-organisations", name: L("Grandes organisations", "Large organizations"),
      intro: L("Coordonner la transformation de plusieurs départements avec une gouvernance claire.", "Coordinate the transformation of several departments with clear governance."),
      challenges: LL(["Plusieurs chantiers menés en parallèle sans vision commune.", "Outils fragmentés et données dispersées entre départements.", "Adoption de l’IA à encadrer (risques, conformité, éthique)."], ["Several workstreams run in parallel with no common vision.", "Fragmented tools and data scattered across departments.", "AI adoption to be governed (risk, compliance, ethics)."]),
      responses: LL(["Diagnostic global, feuille de route et pilotage intégré.", "Intégration des outils, tableaux de bord et automatisation des processus.", "Gouvernance de l’IA, formation des équipes et suivi par indicateurs."], ["Global diagnostic, roadmap and integrated steering.", "Tool integration, dashboards and process automation.", "AI governance, team training and indicator-based tracking."]),
    },
    {
      slug: "technologies-innovation", name: L("Startups et entreprises technologiques", "Startups and technology companies"),
      intro: L("Passer d’un produit prometteur à une entreprise qui vend, de façon répétable.", "Move from a promising product to a business that sells, repeatably."),
      challenges: LL(["Trouver un marché prêt à payer et le message qui le convainc.", "Structurer la vente avant d’avoir une grande équipe.", "Arbitrer entre développement du produit et acquisition de clients."], ["Find a market willing to pay and the message that convinces it.", "Structure selling before having a large team.", "Balance product development against customer acquisition."]),
      responses: LL(["Études de marché, positionnement et validation des offres.", "Pipeline B2B, prospection et indicateurs de conversion.", "Feuille de route par étapes et tableaux de bord décisionnels."], ["Market studies, positioning and offer validation.", "B2B pipeline, prospecting and conversion indicators.", "Staged roadmap and decision dashboards."]),
    },
  ];
  return built.map((sector) => ({ ...sector, benefits: benefits[sector.slug] }));
}
