import { expertises, insights, sectors, type Lang } from "./content";

/**
 * Canonical paths are the French ones without a language prefix ("/expertises/slug").
 * Public URLs are /fr/... and /en/... with a translated first segment, so every page has an exact equivalent.
 */
const SEGMENTS: Array<[fr: string, en: string]> = [
  ["a-propos", "about"],
  ["expertises", "expertise"],
  ["solutions", "solutions"],
  ["secteurs", "industries"],
  ["tarifs", "pricing"],
  ["etudes-de-cas", "case-studies"],
  ["ressources", "resources"],
  ["methode", "method"],
  ["simulateur", "simulator"],
  ["calculateurs", "calculators"],
  ["automatisation", "automation"],
  ["innovations", "innovations"],
  ["intelligence-artificielle", "artificial-intelligence"],
  ["contact", "contact"],
  ["diagnostic", "diagnostic"],
  ["soumission", "quote"],
  ["consultation", "consultation"],
  ["confidentialite", "privacy"],
  ["espace-client", "client-portal"],
  ["connexion", "sign-in"],
  ["desabonnement", "unsubscribe"],
];

const idx = (lang: Lang) => (lang === "fr" ? 0 : 1);

export function localizePath(canonical: string, lang: Lang): string {
  const [pathname, suffix = ""] = canonical.split(/(?=[?#])/, 2);
  const parts = pathname.split("/").filter(Boolean);
  if (!parts.length) return `/${lang}${suffix}`;
  const segment = SEGMENTS.find((pair) => pair[0] === parts[0]);
  if (!segment) return canonical;
  return `/${lang}/${[segment[idx(lang)], ...parts.slice(1)].join("/")}${suffix}`;
}

export function parseLocalized(pathname: string): { lang: Lang; canonical: string } | null {
  const parts = pathname.split("/").filter(Boolean);
  const lang = parts[0];
  if (lang !== "fr" && lang !== "en") return null;
  if (parts.length === 1) return { lang, canonical: "/" };
  const segment = SEGMENTS.find((pair) => pair[idx(lang)] === parts[1]);
  if (!segment) return null;
  return { lang, canonical: `/${[segment[0], ...parts.slice(2)].join("/")}` };
}

export const portalSegments = { client: "espace-client", login: "connexion" } as const;
export const routeSegments = SEGMENTS;

type Meta = { title: string; description: string; noindex?: boolean };
type L = { fr: string; en: string };
const pick = (value: L, lang: Lang) => value[lang];

const staticMeta: Record<string, { title: L; description: L; noindex?: boolean }> = {
  "/": {
    title: { fr: "Stratégie, technologie, performance et croissance", en: "Strategy, technology, performance and growth" },
    description: { fr: "Des stratégies intelligentes, des résultats mesurables, une croissance durable : AUREX Solutions accompagne les entreprises en marketing, stratégie, technologie, intelligence artificielle et opérations.", en: "Smart strategies, measurable results, sustainable growth: AUREX Solutions supports businesses in marketing, strategy, technology, artificial intelligence and operations." },
  },
  "/a-propos": { title: { fr: "À propos d’AUREX Solutions", en: "About AUREX Solutions" }, description: { fr: "Notre vision, nos engagements et notre approche multidisciplinaire : marketing, stratégie, technologie et opérations réunis.", en: "Our vision, our commitments and our multidisciplinary approach: marketing, strategy, technology and operations together." } },
  "/expertises": { title: { fr: "Nos expertises", en: "Our expertise" }, description: { fr: "Dix expertises du marketing à l’intelligence artificielle : prestations, bénéfices économiques et indicateurs de suivi.", en: "Ten areas of expertise from marketing to artificial intelligence: services, economic benefits and tracking indicators." } },
  "/solutions": { title: { fr: "Solutions aux entreprises", en: "Business solutions" }, description: { fr: "Gagner des clients, augmenter le chiffre d’affaires, réduire les coûts, optimiser les opérations et améliorer la rentabilité.", en: "Win customers, increase revenue, reduce costs, optimize operations and improve profitability." } },
  "/secteurs": { title: { fr: "Secteurs d’activité", en: "Industries" }, description: { fr: "Treize secteurs, leurs enjeux, les solutions AUREX adaptées et les bénéfices économiques potentiels.", en: "Thirteen industries, their challenges, tailored AUREX solutions and potential economic benefits." } },
  "/tarifs": { title: { fr: "Tarifs et offres", en: "Pricing and offers" }, description: { fr: "Quatre offres, de Lancer à Transformer, et quatre offres d’intelligence artificielle : services inclus, livrables et conditions.", en: "Four offers, from Launch to Transform, and four AI offers: included services, deliverables and terms." } },
  "/etudes-de-cas": { title: { fr: "Études de cas", en: "Case studies" }, description: { fr: "Les études de cas sont publiées après validation des faits et autorisation des clients concernés.", en: "Case studies are published once the facts are verified and the clients concerned have given permission." } },
  "/ressources": { title: { fr: "Ressources et analyses", en: "Resources and insights" }, description: { fr: "Analyses utiles sur la stratégie, le marketing, la technologie, l’intelligence artificielle et la performance.", en: "Practical insights on strategy, marketing, technology, artificial intelligence and performance." } },
  "/methode": { title: { fr: "Notre méthodologie", en: "Our methodology" }, description: { fr: "Six étapes : diagnostic, analyse, stratégie, déploiement, mesure et optimisation.", en: "Six steps: diagnostic, analysis, strategy, deployment, measurement and optimization." } },
  "/simulateur": { title: { fr: "Simulateur de rentabilité", en: "Profitability simulator" }, description: { fr: "Estimez, avec vos propres chiffres et des hypothèses modifiables, le potentiel de gains d’un accompagnement. Simulation, non garantie.", en: "Estimate, with your own figures and editable assumptions, the potential gains of an engagement. A simulation, not a guarantee." } },
  "/calculateurs": { title: { fr: "Calculateurs d’affaires", en: "Business calculators" }, description: { fr: "Rentabilité publicitaire, gains d’automatisation et économies opérationnelles : trois calculateurs avec vos propres chiffres. Estimations, non résultats.", en: "Advertising profitability, automation gains and operational savings: three calculators using your own figures. Estimates, not results." } },
  "/automatisation": { title: { fr: "Automatisation des processus", en: "Process automation" }, description: { fr: "Automatisation commerciale, administrative, marketing, documentaire et opérationnelle, avec agents IA supervisés.", en: "Sales, administrative, marketing, document and operational automation, with supervised AI agents." } },
  "/innovations": { title: { fr: "Innovations", en: "Innovations" }, description: { fr: "Ce qui est disponible, ce qui est en développement et ce qui reste une ambition chez AUREX Solutions.", en: "What is available, in development or still an ambition at AUREX Solutions." } },
  "/intelligence-artificielle": { title: { fr: "AUREX AI & Automation", en: "AUREX AI & Automation" }, description: { fr: "Agents intelligents, automatisation commerciale, marketing, administrative et logistique, avec gouvernance et supervision humaine.", en: "Intelligent agents and sales, marketing, administrative and logistics automation, with governance and human oversight." } },
  "/contact": { title: { fr: "Contact", en: "Contact" }, description: { fr: "Présentez votre projet à l’équipe AUREX Solutions.", en: "Present your project to the AUREX Solutions team." } },
  "/diagnostic": { title: { fr: "Diagnostic d’entreprise", en: "Business diagnostic" }, description: { fr: "Décrivez votre organisation, vos priorités et vos difficultés en trois étapes pour recevoir une première lecture structurée.", en: "Describe your organization, priorities and challenges in three steps to receive a first structured assessment." } },
  "/soumission": { title: { fr: "Demander une soumission", en: "Request a proposal" }, description: { fr: "Choisissez une offre et un mode d’accompagnement : prestation, abonnement mensuel ou sur mesure, sur devis.", en: "Choose an offer and an engagement type: service, monthly subscription or tailored, quoted on request." } },
  "/consultation": { title: { fr: "Obtenir une consultation", en: "Request a consultation" }, description: { fr: "Indiquez vos préférences de date et de plage horaire. La demande est confirmée par l’équipe AUREX.", en: "Share your preferred date and time slot. The request is confirmed by the AUREX team." } },
  "/confidentialite": { title: { fr: "Confidentialité", en: "Privacy" }, description: { fr: "Comment AUREX Solutions recueille, utilise et protège les renseignements personnels.", en: "How AUREX Solutions collects, uses and protects personal information." } },
  "/espace-client": { title: { fr: "Espace client", en: "Client portal" }, description: { fr: "Espace réservé aux clients d’AUREX Solutions.", en: "Space reserved for AUREX Solutions clients." }, noindex: true },
  "/connexion": { title: { fr: "Connexion", en: "Sign in" }, description: { fr: "Connexion à l’espace client.", en: "Sign in to the client portal." }, noindex: true },
  "/desabonnement": { title: { fr: "Désabonnement", en: "Unsubscribe" }, description: { fr: "Se désabonner de l’infolettre.", en: "Unsubscribe from the newsletter." }, noindex: true },
};

/** Titles and descriptions for any canonical path, used for server-rendered <head> tags and the sitemap. */
export function metaFor(canonical: string, lang: Lang): Meta | null {
  const direct = staticMeta[canonical];
  if (direct) return { title: pick(direct.title, lang), description: pick(direct.description, lang), noindex: direct.noindex };
  const [, section, slug] = canonical.split("/");
  if (section === "expertises") {
    const item = expertises.find((e) => e.slug === slug);
    return item ? { title: pick(item.title, lang), description: pick(item.intro, lang) } : null;
  }
  if (section === "secteurs") {
    const item = sectors.find((e) => e.slug === slug);
    return item ? { title: pick(item.name, lang), description: pick(item.intro, lang) } : null;
  }
  if (section === "ressources") {
    const item = insights.find((e) => e.slug === slug);
    return item ? { title: pick(item.title, lang), description: pick(item.excerpt, lang) } : null;
  }
  return null;
}

export const indexablePaths = (): string[] => [
  ...Object.entries(staticMeta).filter(([, v]) => !v.noindex).map(([path]) => path),
  ...expertises.map((e) => `/expertises/${e.slug}`),
  ...sectors.map((s) => `/secteurs/${s.slug}`),
  ...insights.map((i) => `/ressources/${i.slug}`),
];
