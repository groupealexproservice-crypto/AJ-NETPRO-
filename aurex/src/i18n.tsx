import { createContext, useCallback, useContext, useEffect, useMemo, type ReactNode } from "react";
import { useLocation, useNavigate } from "react-router";
import { localizePath, parseLocalized } from "./routes";
import type { Lang } from "./content";

const copy: Record<Lang, Record<string, string>> = {
  fr: {
    home: "Accueil",
    about: "À propos",
    expertise: "Nos expertises",
    solutions: "Solutions aux entreprises",
    sectors: "Secteurs d’activité",
    method: "Notre méthode",
    work: "Études de cas",
    insights: "Ressources et analyses",
    contact: "Contact",
    consult: "Obtenir une consultation",
    consultHeader: "Consultation stratégique",
    pricing: "Tarifs et offres",
    cases: "Études de cas",
    simulator: "Simulateur de rentabilité",
    calculators: "Calculateurs d’affaires",
    automation: "Automatisation",
    innovations: "Innovations",
    ai: "AUREX AI & Automation",
    diagnostic: "Demander un diagnostic",
    quote: "Demander une soumission",
    client: "Espace client",
    admin: "Administration",
    login: "Connexion",
    logout: "Déconnexion",
    menu: "Menu",
    close: "Fermer",
    discover: "Découvrir nos expertises",
    explore: "Explorer",
    learnMore: "En savoir plus",
    viewAll: "Voir tout",
    read: "Lire l’analyse",
    back: "Retour",
    next: "Continuer",
    submit: "Envoyer la demande",
    sending: "Envoi en cours…",
    required: "Ce champ est requis.",
    invalidEmail: "Saisissez une adresse courriel valide.",
    successTitle: "Votre demande a bien été enregistrée.",
    successText: "Notre équipe pourra maintenant la traiter dans le suivi commercial sécurisé.",
    errorTitle: "L’envoi n’a pas abouti.",
    errorText: "Vérifiez votre connexion et réessayez. Vos réponses sont conservées dans cette page.",
    reference: "Référence",
    privacy: "Confidentialité",
    faq: "Questions fréquentes",
    terms: "Conditions de service",
    legalNotice: "Mentions légales",
    accessibility: "Accessibilité",
    sitemap: "Plan du site",
    consent: "Je consens à ce qu’AUREX Solutions utilise ces renseignements pour répondre à ma demande, conformément à la politique de confidentialité.",
    newsletterConsent: "Je consens à recevoir l’infolettre d’AUREX Solutions et je comprends que je peux me désabonner en tout temps.",
    challenges: "Vos enjeux",
    services: "Services offerts",
    deliverables: "Livrables typiques",
    objective: "Objectif",
    scope: "Périmètre",
    outcomes: "Résultats recherchés",
    response: "Notre réponse",
    related: "Expertises mobilisées",
    allExpertises: "Les dix expertises",
    allSolutions: "Les solutions AUREX",
    allSectors: "Secteurs d’activité",
    allInsights: "Ressources et analyses",
    noCaseTitle: "La crédibilité ne s’invente pas.",
    noCaseText: "Nos études de cas, réalisations et témoignages seront publiés ici après validation des informations et autorisation des clients concernés. Aucun résultat fictif n’est présenté sur ce site.",
    contactTeam: "Parler de votre projet",
    legalNote: "Renseignements traités selon notre politique de confidentialité et les exigences applicables au Québec.",
    externalConfig: "Intégrations externes",
    externalConfigText: "La synchronisation du calendrier, l’envoi de courriels transactionnels et la connexion à un CRM tiers nécessitent les identifiants de l’organisation. La version actuelle enregistre les demandes dans son propre suivi sécurisé et ne simule aucune intégration externe.",
    brochure: "Télécharger la brochure",
    unsubscribe: "Se désabonner",
    assistant: "Assistant d’orientation",
    assistantIntro: "Quel est votre objectif prioritaire ? Ce guide vous oriente vers la solution la plus pertinente.",
    launchQuestion: "Lancer une entreprise",
    digitalQuestion: "Moderniser mes outils",
    growthQuestion: "Trouver des clients",
    performanceQuestion: "Optimiser mes opérations",
    intelligenceQuestion: "Automatiser avec l’IA",
    globalQuestion: "Coordonner plusieurs enjeux",
    recommended: "Solution recommandée",
    restart: "Recommencer",
    formName: "Nom complet",
    formEmail: "Courriel professionnel",
    formCompany: "Entreprise",
    formPhone: "Téléphone (facultatif)",
    formSector: "Secteur d’activité",
    formBudget: "Budget indicatif",
    formMessage: "Votre contexte et vos objectifs",
    formServices: "Expertises recherchées",
    formDate: "Date souhaitée",
    formTime: "Plage horaire souhaitée",
    select: "Sélectionner",
    morning: "Matin",
    afternoon: "Après-midi",
    evening: "Fin de journée",
    newsletter: "Infolettre AUREX",
    newsletterText: "Recevez nos analyses sur la stratégie, la transformation et la performance.",
    subscribe: "S’inscrire",
    subscribed: "Votre inscription a été enregistrée.",
    notFound: "Cette page n’existe pas.",
    returnHome: "Retour à l’accueil",
    loading: "Chargement…",
    empty: "Aucun élément pour le moment.",
  },
  en: {
    home: "Home",
    about: "About",
    expertise: "Our expertise",
    solutions: "Business solutions",
    sectors: "Industries",
    method: "Our method",
    work: "Case studies",
    insights: "Resources and insights",
    contact: "Contact",
    consult: "Request a consultation",
    consultHeader: "Strategic consultation",
    pricing: "Pricing and offers",
    cases: "Case studies",
    simulator: "Profitability simulator",
    calculators: "Business calculators",
    automation: "Automation",
    innovations: "Innovations",
    ai: "AUREX AI & Automation",
    diagnostic: "Request a diagnostic",
    quote: "Request a proposal",
    client: "Client portal",
    admin: "Administration",
    login: "Sign in",
    logout: "Sign out",
    menu: "Menu",
    close: "Close",
    discover: "Explore our expertise",
    explore: "Explore",
    learnMore: "Learn more",
    viewAll: "View all",
    read: "Read the analysis",
    back: "Back",
    next: "Continue",
    submit: "Submit request",
    sending: "Submitting…",
    required: "This field is required.",
    invalidEmail: "Enter a valid email address.",
    successTitle: "Your request has been recorded.",
    successText: "Our team can now process it through the secure commercial follow-up system.",
    errorTitle: "Your request could not be submitted.",
    errorText: "Check your connection and try again. Your answers remain on this page.",
    reference: "Reference",
    privacy: "Privacy",
    faq: "FAQ",
    terms: "Terms of service",
    legalNotice: "Legal notice",
    accessibility: "Accessibility",
    sitemap: "Site map",
    consent: "I consent to AUREX Solutions using this information to respond to my request, in accordance with the privacy policy.",
    newsletterConsent: "I consent to receive the AUREX Solutions newsletter and understand that I may unsubscribe at any time.",
    challenges: "Your challenges",
    services: "Services offered",
    deliverables: "Typical deliverables",
    objective: "Objective",
    scope: "Scope",
    outcomes: "Target outcomes",
    response: "Our response",
    related: "Related expertise",
    allExpertises: "Ten areas of expertise",
    allSolutions: "AUREX solutions",
    allSectors: "Industries",
    allInsights: "Resources and insights",
    noCaseTitle: "Credibility cannot be invented.",
    noCaseText: "Our case studies, projects and testimonials will be published here once information has been verified and the relevant clients have given their permission. No fictional results are presented on this website.",
    contactTeam: "Discuss your project",
    legalNote: "Information handled according to our privacy policy and applicable Quebec requirements.",
    externalConfig: "External integrations",
    externalConfigText: "Calendar synchronization, transactional email and third-party CRM connections require organization credentials. The current version records requests in its own secure follow-up system and does not simulate any external integration.",
    brochure: "Download the brochure",
    unsubscribe: "Unsubscribe",
    assistant: "Orientation assistant",
    assistantIntro: "What is your primary objective? This guide will point you to the most relevant solution.",
    launchQuestion: "Launch a business",
    digitalQuestion: "Modernize my tools",
    growthQuestion: "Find customers",
    performanceQuestion: "Optimize my operations",
    intelligenceQuestion: "Automate with AI",
    globalQuestion: "Coordinate several challenges",
    recommended: "Recommended solution",
    restart: "Start over",
    formName: "Full name",
    formEmail: "Business email",
    formCompany: "Company",
    formPhone: "Phone (optional)",
    formSector: "Industry",
    formBudget: "Indicative budget",
    formMessage: "Your context and objectives",
    formServices: "Expertise required",
    formDate: "Preferred date",
    formTime: "Preferred time slot",
    select: "Select",
    morning: "Morning",
    afternoon: "Afternoon",
    evening: "End of day",
    newsletter: "AUREX newsletter",
    newsletterText: "Receive our analysis on strategy, transformation and performance.",
    subscribe: "Subscribe",
    subscribed: "Your subscription has been recorded.",
    notFound: "This page does not exist.",
    returnHome: "Back to home",
    loading: "Loading…",
    empty: "No items yet.",
  },
};

type LanguageContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);
const STORAGE_KEY = "aurex-language";

export function preferredLanguage(): Lang {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === "fr" || saved === "en") return saved;
  } catch { /* storage unavailable */ }
  return "fr"; // French is the primary language: no browser-language guessing, no language picker.
}

/** The language comes from the URL (/fr/..., /en/...), so every page has a shareable equivalent in the other language. */
export function LanguageProvider({ children }: { children: ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();
  const parsed = parseLocalized(location.pathname);
  const lang: Lang = parsed?.lang ?? preferredLanguage();

  const canonical = parsed?.canonical ?? "/";
  const hasPrefix = Boolean(parsed);
  const { search, hash } = location;
  const setLang = useCallback((next: Lang) => {
    try { window.localStorage.setItem(STORAGE_KEY, next); } catch { /* storage unavailable */ }
    if (next !== lang || !hasPrefix) navigate(`${localizePath(canonical, next)}${search}${hash}`);
  }, [lang, hasPrefix, canonical, search, hash, navigate]);

  useEffect(() => {
    document.documentElement.lang = lang === "fr" ? "fr-CA" : "en-CA";
    try { window.localStorage.setItem(STORAGE_KEY, lang); } catch { /* storage unavailable */ }
  }, [lang]);

  const value = useMemo(() => ({ lang, setLang, t: (key: string) => copy[lang][key] ?? key }), [lang, setLang]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used inside LanguageProvider");
  return context;
}
