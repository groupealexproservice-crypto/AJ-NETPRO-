import type { Localized } from "./content";

/**
 * Vision and commitments. These are statements of how AUREX intends to work, written so they promise behaviour,
 * never results. AUREX must confirm each one it can stand behind before publication (see docs/CONFORMITE.md).
 */
export const vision = {
  statement: {
    fr: "Accompagner les entrepreneurs, les PME et les organisations de la création vers une croissance solide, mesurée et responsable.",
    en: "Support entrepreneurs, SMEs and creative organizations toward solid, measured and responsible growth.",
  },
  quote: {
    fr: "Derrière chaque entreprise, il y a des personnes, des équipes et une ambition. Nous les traitons avec sérieux, rigueur et respect.",
    en: "Behind every business there are people, teams and an ambition. We treat them with seriousness, rigor and respect.",
  },
  intro: {
    fr: "Un projet de transformation engage bien plus qu’un budget : il engage des équipes, une réputation et des années de travail. C’est pourquoi nous travaillons comme un partenaire de confiance, avec des engagements simples que vous pouvez nous demander de tenir.",
    en: "A transformation project involves far more than a budget: it involves teams, a reputation and years of work. That is why we work as a trusted partner, with simple commitments you can hold us to.",
  },
};

export type Commitment = { title: Localized; text: Localized };

export const commitments: Commitment[] = [
  {
    title: { fr: "Vous écouter avant de proposer", en: "Listen before proposing" },
    text: {
      fr: "Aucune recommandation avant d’avoir compris votre situation, vos contraintes et ce que ce projet représente pour vous.",
      en: "No recommendation before we understand your situation, your constraints and what this project means to you.",
    },
  },
  {
    title: { fr: "Traiter votre projet avec le sérieux qu’il mérite", en: "Treat your project with the seriousness it deserves" },
    text: {
      fr: "Votre entreprise est le fruit d’un engagement personnel. Nous abordons chaque mandat avec rigueur, discrétion et un sens aigu des responsabilités.",
      en: "Your business is the result of a personal commitment. We approach every mandate with rigor, discretion and a strong sense of responsibility.",
    },
  },
  {
    title: { fr: "Parler vrai", en: "Speak plainly" },
    text: {
      fr: "Périmètre, livrables et limites sont écrits avant le début des travaux. Nous ne promettons que ce que nous pouvons raisonnablement livrer, et nous convenons d’indicateurs plutôt que de chiffres garantis.",
      en: "Scope, deliverables and limits are written down before work begins. We promise only what we can reasonably deliver, and we agree on indicators rather than guaranteed figures.",
    },
  },
  {
    title: { fr: "Protéger vos renseignements", en: "Protect your information" },
    text: {
      fr: "Vos données et vos documents sont traités avec confidentialité, accessibles seulement aux personnes autorisées, et jamais utilisés sans votre consentement.",
      en: "Your data and documents are handled confidentially, accessible only to authorized people, and never used without your consent.",
    },
  },
  {
    title: { fr: "Mesurer et rendre compte", en: "Measure and report" },
    text: {
      fr: "Des points de suivi réguliers, des rapports clairs et des ajustements assumés : vous savez où en est votre projet et pourquoi.",
      en: "Regular check-ins, clear reports and openly made adjustments: you always know where your project stands and why.",
    },
  },
];

export const pageCommitment: Record<"expertise" | "solution" | "sector", { title: Localized; text: Localized }> = {
  expertise: {
    title: { fr: "Notre engagement envers vous", en: "Our commitment to you" },
    text: {
      fr: "Ce sujet touche vos clients, vos équipes et votre réputation. Nous le traitons avec le sérieux qu’il mérite : un diagnostic d’abord, un périmètre clair, des livrables convenus et un suivi transparent.",
      en: "This subject affects your customers, your teams and your reputation. We treat it with the seriousness it deserves: diagnosis first, a clear scope, agreed deliverables and transparent follow-up.",
    },
  },
  solution: {
    title: { fr: "Notre engagement envers vous", en: "Our commitment to you" },
    text: {
      fr: "Choisir un accompagnement est une décision importante. Nous prenons le temps de comprendre votre situation avant de proposer un périmètre et un devis, et nous vous disons clairement ce qui est inclus, ce qui ne l’est pas et ce qu’il est raisonnable de viser.",
      en: "Choosing support is an important decision. We take the time to understand your situation before proposing a scope and a quote, and we tell you plainly what is included, what is not, and what is reasonable to aim for.",
    },
  },
  sector: {
    title: { fr: "Notre engagement envers vous", en: "Our commitment to you" },
    text: {
      fr: "Chaque secteur a ses contraintes, ses saisons et ses habitudes. Les pistes présentées ici sont des points de départ : nous les validons avec vous avant toute recommandation.",
      en: "Every industry has its own constraints, seasons and habits. The approaches shown here are starting points: we validate them with you before making any recommendation.",
    },
  },
};
