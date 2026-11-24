import { expertises, insights, sectors, solutions, type Lang } from "./content";

/**
 * Canonical paths are the French ones without a language prefix ("/expertises/slug").
 * Public URLs are /fr/... and /en/... with a translated first segment, so every page has an exact equivalent.
 */
const SEGMENTS: Array<[fr: string, en: string]> = [
  ["a-propos", "about"],
  ["expertises", "expertise"],
  ["solutions", "solutions"],
  ["secteurs", "industries"],
  ["methode", "method"],
  ["realisations", "work"],
  ["perspectives", "insights"],
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
    title: { fr: "Stratégie, innovation et croissance", en: "Strategy, innovation and growth" },
    description: { fr: "BENEX Solutions accompagne les entreprises dans leur transformation stratégique, numérique, commerciale et opérationnelle au Québec et au Canada.", en: "BENEX Solutions supports strategic, digital, commercial and operational transformation for businesses in Quebec and Canada." },
  },
  "/a-propos": {
    title: { fr: "À propos du cabinet", en: "About the firm" },
    description: { fr: "Un cabinet de conseil multidisciplinaire qui coordonne stratégie, technologie, développement commercial, marketing et opérations.", en: "A multidisciplinary consulting firm coordinating strategy, technology, business development, marketing and operations." },
  },
  "/expertises": {
    title: { fr: "Nos expertises", en: "Our expertise" },
    description: { fr: "Huit expertises complémentaires, de l’identité de marque à l’intelligence artificielle, mobilisables seules ou en combinaison.", en: "Eight complementary areas of expertise, from brand identity to artificial intelligence, engaged individually or together." },
  },
  "/solutions": {
    title: { fr: "Nos solutions", en: "Our solutions" },
    description: { fr: "Six offres, de BENEX Launch à BENEX 360, avec mandats ponctuels ou accompagnement mensuel sur devis.", en: "Six offers, from BENEX Launch to BENEX 360, as one-off mandates or monthly support, quoted on request." },
  },
  "/secteurs": {
    title: { fr: "Secteurs d’activité", en: "Industries" },
    description: { fr: "Dix secteurs, leurs problématiques courantes et les approches que BENEX peut mobiliser.", en: "Ten industries, their common challenges and the approaches BENEX can bring." },
  },
  "/methode": {
    title: { fr: "Notre méthode", en: "Our method" },
    description: { fr: "Cinq étapes : diagnostic, analyse stratégique, conception, déploiement, mesure et optimisation.", en: "Five stages: diagnostic, strategic analysis, design, deployment, measurement and optimization." },
  },
  "/realisations": {
    title: { fr: "Réalisations", en: "Our work" },
    description: { fr: "Les études de cas sont publiées après validation des faits et autorisation des clients concernés.", en: "Case studies are published once the facts are verified and the clients concerned have given permission." },
  },
  "/perspectives": {
    title: { fr: "Perspectives et analyses", en: "Insights and analysis" },
    description: { fr: "Des analyses utiles sur la stratégie, la transformation numérique, la croissance et la performance.", en: "Practical analysis on strategy, digital transformation, growth and performance." },
  },
  "/contact": {
    title: { fr: "Contact", en: "Contact" },
    description: { fr: "Présentez votre projet à l’équipe BENEX Solutions. Nous répondons à chaque demande.", en: "Present your project to the BENEX Solutions team. We respond to every request." },
  },
  "/diagnostic": {
    title: { fr: "Diagnostic en trois étapes", en: "Three-step diagnostic" },
    description: { fr: "Décrivez votre organisation, vos priorités et vos difficultés pour recevoir une première lecture structurée.", en: "Describe your organization, priorities and challenges to receive a first structured assessment." },
  },
  "/soumission": {
    title: { fr: "Demander une soumission", en: "Request a proposal" },
    description: { fr: "Choisissez une solution et un mode d’accompagnement : mandat ponctuel ou accompagnement mensuel, sur devis.", en: "Choose a solution and an engagement type: one-off mandate or monthly support, quoted on request." },
  },
  "/consultation": {
    title: { fr: "Planifier une consultation", en: "Schedule a consultation" },
    description: { fr: "Indiquez vos préférences de date et de plage horaire. La demande est confirmée par l’équipe BENEX.", en: "Share your preferred date and time slot. The request is confirmed by the BENEX team." },
  },
  "/confidentialite": {
    title: { fr: "Confidentialité", en: "Privacy" },
    description: { fr: "Comment BENEX Solutions recueille, utilise et protège les renseignements personnels.", en: "How BENEX Solutions collects, uses and protects personal information." },
  },
  "/espace-client": { title: { fr: "Espace client", en: "Client portal" }, description: { fr: "Espace réservé aux clients de BENEX Solutions.", en: "Space reserved for BENEX Solutions clients." }, noindex: true },
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
  if (section === "solutions") {
    const item = solutions.find((e) => e.slug === slug);
    return item ? { title: item.name, description: pick(item.summary, lang) } : null;
  }
  if (section === "secteurs") {
    const item = sectors.find((e) => e.slug === slug);
    return item ? { title: pick(item.name, lang), description: pick(item.intro, lang) } : null;
  }
  if (section === "perspectives") {
    const item = insights.find((e) => e.slug === slug);
    return item ? { title: pick(item.title, lang), description: pick(item.excerpt, lang) } : null;
  }
  return null;
}

export const indexablePaths = (): string[] => [
  ...Object.entries(staticMeta).filter(([, v]) => !v.noindex).map(([path]) => path),
  ...expertises.map((e) => `/expertises/${e.slug}`),
  ...solutions.map((s) => `/solutions/${s.slug}`),
  ...sectors.map((s) => `/secteurs/${s.slug}`),
  ...insights.map((i) => `/perspectives/${i.slug}`),
];
