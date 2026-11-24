import type { Localized, LocalizedList } from "../content";

const L = (fr: string, en: string): Localized => ({ fr, en });
const LL = (fr: string[], en: string[]): LocalizedList => ({ fr, en });

/**
 * Four permanent monthly plans, from 100 $ to 1 500 $ CAD per month, taxes extra ("starting prices").
 * Each plan has a defined scope. Working-hour estimates live only in docs/OFFRE-COMMERCIALE.md (internal).
 * No result (sales, clients, savings) is promised.
 */
export type Plan = {
  slug: string;
  name: string;
  tagline: Localized;
  monthly: number;
  /** Price per month with a 12-month commitment (5 % lower). */
  yearly: number;
  forWho: Localized;
  problem: Localized;
  includes: LocalizedList;
  followUp: Localized;
  excludes: LocalizedList;
  options: LocalizedList;
  why: Localized;
  /** Eligible for the "website offered with a 12-month commitment" offer, and the size of that site. */
  siteOffer?: { pages: number };
  highlight?: boolean;
};

export const planTerms = {
  terms: LL(
    ["Prix de départ en dollars canadiens, taxes en sus, par mois", "Engagement minimum de 6 mois, puis mensuel avec préavis de 30 jours ; engagement de 12 mois à −5 %", "Le périmètre est précisé à la signature ; tout travail additionnel est soumis à votre approbation", "Budget publicitaire, nom de domaine, hébergement, licences et frais de tiers en sus, au coût réel", "Aucun résultat de vente ou de clientèle n’est garanti : un rapport mensuel et des indicateurs convenus mesurent l’avancement"],
    ["Starting prices in Canadian dollars, taxes extra, per month", "6-month minimum, then monthly with 30 days’ notice; 12-month commitment at 5% off", "The scope is set at signing; any extra work is subject to your approval", "Ad budget, domain name, hosting, licences and third-party fees extra, at cost", "No sales or client result is guaranteed: a monthly report and agreed indicators track progress"],
  ),
};

export const plans: Plan[] = [
  {
    slug: "plan-essentiel", name: "ESSENTIEL",
    tagline: L("Garder votre présence en ligne en ordre.", "Keep your online presence in order."),
    monthly: 100, yearly: 95,
    forWho: L("Travailleurs autonomes et très petites entreprises qui ont déjà un site et veulent qu’il reste à jour et sécurisé.", "Self-employed people and very small businesses that already have a website and want it kept up to date and secure."),
    problem: L("Un site laissé sans entretien devient lent, vulnérable et dépassé ; une fiche Google négligée fait perdre des appels.", "A neglected website becomes slow, vulnerable and outdated; a neglected Google profile loses calls."),
    includes: LL(["Surveillance, sauvegardes et mises à jour du site : en continu, rapport chaque mois", "Fiche Google à jour et une réponse aux avis : chaque mois", "Une petite modification de contenu (environ 15 minutes) : chaque mois", "Rapport mensuel automatique d’une page"], ["Website monitoring, backups and updates: ongoing, report each month", "Up-to-date Google profile and one review reply: each month", "One small content change (about 15 minutes): each month", "One-page automatic monthly report"]),
    followUp: L("Rapport mensuel par courriel ; réponse à vos demandes sous 2 jours ouvrables.", "Monthly report by e-mail; replies to your requests within 2 business days."),
    excludes: LL(["Publications sur les réseaux sociaux", "Nouvelles pages ou refonte", "Hébergement et nom de domaine (au coût réel)", "Publicité"], ["Social media posts", "New pages or redesign", "Hosting and domain name (at cost)", "Advertising"]),
    options: LL(["Hébergement géré : au coût réel", "Modification supplémentaire : sur devis", "Passer à CROISSANCE pour publier sur les réseaux"], ["Managed hosting: at cost", "Extra change: quoted", "Upgrade to CROISSANCE to post on social media"]),
    why: L("Un entretien régulier coûte moins cher qu’une réparation d’urgence, et le prix reste prévisible.", "Regular upkeep costs less than an emergency repair, and the price stays predictable."),
  },
  {
    slug: "plan-croissance", name: "CROISSANCE",
    tagline: L("Rester visible, sans y penser.", "Stay visible without thinking about it."),
    monthly: 300, yearly: 285, highlight: true,
    forWho: L("Petites entreprises locales (commerces, métiers, services) qui veulent une présence régulière sur un réseau social.", "Small local businesses (shops, trades, services) that want a regular presence on one social network."),
    problem: L("Le manque de temps pour publier : le profil reste silencieux et les clients oublient l’entreprise.", "Lack of time to post: the profile goes quiet and customers forget the business."),
    includes: LL(["Tout ESSENTIEL", "4 publications par mois sur 1 profil (textes et visuels sur gabarits, assistés par IA)", "1 révision par publication, avec votre approbation avant la mise en ligne", "Rapport mensuel commenté d’une page, avec une recommandation"], ["Everything in ESSENTIEL", "4 posts per month on 1 profile (texts and visuals on templates, AI-assisted)", "1 revision per post, with your approval before publishing", "Commented one-page monthly report with one recommendation"]),
    followUp: L("Calendrier de publications envoyé en début de mois ; échanges par courriel ; réponse sous 2 jours ouvrables.", "Posting calendar sent at the start of the month; exchanges by e-mail; replies within 2 business days."),
    excludes: LL(["Photographie et vidéo", "Publicité payante", "Plus d’un profil", "Création de pages du site"], ["Photography and video", "Paid advertising", "More than one profile", "Creation of site pages"]),
    options: LL(["4 publications de plus : 150 $ par mois", "Deuxième profil : sur devis", "Passer à DÉVELOPPEMENT pour le SEO local"], ["4 more posts: $150 per month", "Second profile: quoted", "Upgrade to DÉVELOPPEMENT for local SEO"]),
    why: L("Une présence régulière et planifiée, au prix d’un abonnement, plutôt que des publications faites au hasard.", "A regular, planned presence for the price of a subscription, instead of posts made at random."),
    siteOffer: { pages: 3 },
  },
  {
    slug: "plan-developpement", name: "DÉVELOPPEMENT",
    tagline: L("Être trouvé quand on vous cherche.", "Be found when people look for you."),
    monthly: 500, yearly: 475,
    forWho: L("Entreprises locales qui veulent apparaître dans les recherches Google et sur les cartes.", "Local businesses that want to appear in Google searches and on maps."),
    problem: L("Les clients cherchent un service près d’eux, mais l’entreprise est difficile à trouver.", "Customers search for a nearby service, but the business is hard to find."),
    includes: LL(["Tout CROISSANCE", "SEO local : 1 page ou article optimisé par mois", "Optimisation de la fiche Google et suivi de vos positions : chaque mois", "Recommandations d’amélioration du site dans le rapport mensuel"], ["Everything in CROISSANCE", "Local SEO: 1 optimized page or article per month", "Google profile optimization and tracking of your rankings: each month", "Site improvement recommendations in the monthly report"]),
    followUp: L("Rapport mensuel avec positions et recommandations ; réponse sous 2 jours ouvrables.", "Monthly report with rankings and recommendations; replies within 2 business days."),
    excludes: LL(["Publicité payante", "Plus d’un profil social", "Refonte du site", "Création de liens externes payants"], ["Paid advertising", "More than one social profile", "Site redesign", "Paid external link building"]),
    options: LL(["Infolettre mensuelle : 249 $ par mois", "Page ou article de plus : 150 $", "Passer à PARTENAIRE pour la publicité et le suivi stratégique"], ["Monthly newsletter: $249 per month", "Extra page or article: $150", "Upgrade to PARTENAIRE for advertising and strategic follow-up"]),
    why: L("Le référencement local travaille en continu : plus il est régulier, plus ses effets s’accumulent, sans promesse de rang précis.", "Local SEO works continuously: the more regular it is, the more its effects build, with no promise of a specific rank."),
    siteOffer: { pages: 3 },
  },
  {
    slug: "plan-partenaire", name: "PARTENAIRE",
    tagline: L("Un partenaire de croissance, chaque mois.", "A growth partner, every month."),
    monthly: 1500, yearly: 1425,
    forWho: L("PME qui veulent confier leur visibilité et leur acquisition de clients, avec un interlocuteur régulier.", "SMEs that want to entrust their visibility and customer acquisition to a regular contact."),
    problem: L("Les efforts de marketing sont dispersés et rien n’est mesuré : on ne sait pas ce qui fonctionne.", "Marketing efforts are scattered and nothing is measured: nobody knows what works."),
    includes: LL(["Tout DÉVELOPPEMENT", "Plan de 90 jours au départ, centré sur une priorité principale : une fois, puis révisé chaque trimestre", "12 publications par mois sur 2 plateformes", "Gestion Google Ads : 1 à 2 campagnes (budget publicitaire en sus), optimisation et rapport mensuels", "Rencontre stratégique de 45 minutes : chaque mois", "Tableau de bord des demandes et des indicateurs convenus"], ["Everything in DÉVELOPPEMENT", "90-day plan at the start, focused on one main priority: once, then reviewed each quarter", "12 posts per month across 2 platforms", "Google Ads management: 1–2 campaigns (ad budget extra), monthly optimization and report", "45-minute strategy meeting: each month", "Dashboard of enquiries and agreed indicators"]),
    followUp: L("Rencontre mensuelle, bilan trimestriel, réponse sous 1 jour ouvrable.", "Monthly meeting, quarterly review, replies within 1 business day."),
    excludes: LL(["Budget publicitaire", "Développement de site sur mesure", "Agents IA et automatisations (offerts en option)", "Plus de 2 campagnes publicitaires"], ["Ad budget", "Custom site development", "AI agents and automations (offered as options)", "More than 2 ad campaigns"]),
    options: LL(["Suivi d’automatisation : 290 $ par mois", "Assistant IA — suivi : 349 $ par mois", "Veille concurrentielle : 199 $ par mois", "Agent téléphonique IA : voir Automatisation"], ["Automation upkeep: $290 per month", "AI assistant upkeep: $349 per month", "Competitive monitoring: $199 per month", "AI phone agent: see Automation"]),
    why: L("Une seule équipe pour la visibilité, la publicité et le suivi : moins de coordination pour vous, des décisions fondées sur des chiffres.", "One team for visibility, advertising and follow-up: less coordination for you, decisions based on figures."),
    siteOffer: { pages: 5 },
  },
];

export const planBySlug = (slug: string) => plans.find((p) => p.slug === slug);

/** Free website offered with a 12-month commitment: conditions shown on the pricing page. */
export const siteOffer = {
  title: L("Site Web de base offert avec un engagement de 12 mois", "Basic website offered with a 12-month commitment"),
  intro: L("Pour tout engagement de 12 mois à CROISSANCE, DÉVELOPPEMENT ou PARTENAIRE, la création d’un site Web de base est offerte. Ce n’est pas un site gratuit pour toute demande : voici exactement ce qui est inclus.", "For any 12-month commitment to CROISSANCE, DÉVELOPPEMENT or PARTENAIRE, the creation of a basic website is offered. It is not a free website for any request: here is exactly what is included."),
  included: LL(
    ["Site de base de 3 pages (Accueil, Services, Contact) avec CROISSANCE et DÉVELOPPEMENT ; jusqu’à 5 pages avec PARTENAIRE", "Gabarit adapté aux mobiles, formulaire de contact, bases du référencement", "2 rondes de révisions", "Mise en ligne dans un délai cible de 4 à 6 semaines après réception de vos contenus"],
    ["Basic site of 3 pages (Home, Services, Contact) with CROISSANCE and DÉVELOPPEMENT; up to 5 pages with PARTENAIRE", "Mobile-ready template, contact form, SEO basics", "2 rounds of revisions", "Launch targeted 4 to 6 weeks after receiving your content"]),
  fromYou: LL(["Textes, logo, couleurs et photos (nous pouvons les créer en option, sur devis)", "Réponses et approbations dans des délais raisonnables"], ["Texts, logo, colours and photos (we can create them as an option, quoted)", "Answers and approvals within reasonable time"]),
  notIncluded: LL(["Nom de domaine et hébergement (au coût réel ; l’entretien du site est inclus dans votre forfait)", "Applications ou extensions payantes", "Boutique en ligne, réservation, espace membre et fonctions avancées", "Rédaction, photographie et traduction : sur devis"], ["Domain name and hosting (at cost; site maintenance is included in your plan)", "Paid apps or extensions", "Online store, booking, member area and advanced features", "Copywriting, photography and translation: quoted"]),
  cancellation: L("Si vous résiliez avant la fin des 12 mois, la valeur du site (469 $ pour 3 pages, 1 490 $ pour 5 pages) est due au prorata des mois restants. Le site vous appartient une fois ce montant réglé.", "If you cancel before the end of the 12 months, the value of the site ($469 for 3 pages, $1,490 for 5 pages) is due pro rata for the remaining months. The site is yours once that amount is paid."),
  difference: L("Un site de base utilise un gabarit. Un site personnalisé (structure, fonctions ou design sur mesure) fait l’objet d’une soumission séparée.", "A basic site uses a template. A custom site (tailored structure, features or design) is quoted separately."),
};
