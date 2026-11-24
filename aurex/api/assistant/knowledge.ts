import { agents, aiCosts, automationCatalog, availabilityLabel, businessSolutions, innovationIdeas, aiPole, aiTiers, automations, expertises, formats, governance, integrations, kpis, methodSteps, outcomes, poles, sectorExpertises, sectors, tiers, tx, txList, whyAurex, type Lang } from "../../src/content";
import { localizePath } from "../../src/routes";

/**
 * The firm's own knowledge, as retrievable passages. Everything the assistant may say about AUREX comes from here
 * (and from prices the management has published), never from the model's imagination.
 */
export type Parts = { intro?: string; problems?: string[]; solution?: string; deliverables?: string[]; benefits?: string[]; kpis?: string[]; ai?: string; challenges?: string[]; responses?: string[]; audience?: string; includes?: string[]; related?: string[] };
export type Doc = { id: string; kind: "expertise" | "sector" | "offer" | "ai" | "method" | "kpi" | "why" | "general"; title: string; path: string; text: string; keywords: string; parts?: Parts };

const bullets = (items: string[]) => items.map((i) => `- ${i}`).join("\n");

/** Everyday words people use for their industry. */
const sectorAliases: Record<string, string> = {
  "pme-entrepreneurs": "entrepreneur startup travailleur autonome petite entreprise small business founder",
  "commerce-detail": "boutique magasin vente au détail retail store shop",
  "commerce-electronique": "ecommerce e-commerce boutique en ligne shopify online store",
  "construction-immobilier": "entrepreneur général chantier bâtiment courtier immeuble propriété real estate contractor builder",
  "industrie-fabrication": "usine manufacture production atelier factory manufacturer",
  "transport-logistique": "camion camionnage livraison transporteur trucking delivery freight",
  "hotellerie-restauration": "restaurant hôtel café bar auberge traiteur hotel hospitality",
  "services-professionnels": "avocat comptable consultant cabinet architecte lawyer accountant consultant firm",
  "entretien-maintenance": "nettoyage ménage conciergerie réparation cleaning janitorial repair",
  "sport-bien-etre": "gym salle entraînement yoga spa clinique santé fitness wellness studio",
  "technologies-innovation": "startup logiciel saas application technologie software tech innovation",
};

export function buildDocs(lang: Lang): Doc[] {
  const fr = lang === "fr";
  const docs: Doc[] = [];
  const url = (canonical: string) => localizePath(canonical, lang);

  for (const e of expertises) {
    const pole = e.pole === "ai" ? aiPole.name : poles.find((p) => p.key === e.pole)?.name ?? "";
    docs.push({
      id: `expertise:${e.slug}`, kind: "expertise", title: tx(e.title, lang), path: url(`/expertises/${e.slug}`),
      parts: { intro: tx(e.intro, lang), problems: txList(e.problems, lang), solution: tx(e.solution, lang), deliverables: txList(e.deliverables, lang), benefits: txList(e.benefits, lang), kpis: e.kpis.map((k) => tx(kpis[k].label, lang)), ai: tx(e.ai, lang) },
      keywords: `${e.slug.replace(/-/g, " ")} ${pole} ${e.kpis.join(" ")} ${txList(e.services, lang).join(" ")}`,
      text: [
        `${tx(e.title, lang)} (${pole}). ${tx(e.intro, lang)}`,
        `${fr ? "Problèmes courants" : "Common problems"}:\n${bullets(txList(e.problems, lang))}`,
        `${fr ? "Notre solution" : "Our solution"}: ${tx(e.solution, lang)}`,
        `${fr ? "Comment nous intervenons" : "How we work"}:\n${bullets(txList(e.approach, lang))}`,
        `${fr ? "Prestations" : "Services"}: ${txList(e.services, lang).join(", ")}.`,
        `${fr ? "Livrables" : "Deliverables"}:\n${bullets(txList(e.deliverables, lang))}`,
        `${fr ? "Bénéfices visés (non garantis)" : "Targeted benefits (not guaranteed)"}: ${txList(e.benefits, lang).join("; ")}.`,
        `${fr ? "Indicateurs de suivi" : "Tracking indicators"}: ${e.kpis.map((k) => tx(kpis[k].label, lang)).join(", ")}.`,
        `${fr ? "Avec l’IA" : "With AI"}: ${tx(e.ai, lang)}`,
        `${fr ? "Tarification" : "Pricing"}: ${tx(e.pricing, lang)}${e.note ? ` ${tx(e.note, lang)}` : ""}`,
      ].join("\n"),
    });
  }

  for (const s of sectors) {
    const related = (sectorExpertises[s.slug] ?? []).map((slug) => tx(expertises.find((e) => e.slug === slug)!.title, lang));
    docs.push({
      id: `sector:${s.slug}`, kind: "sector", title: tx(s.name, lang), path: url(`/secteurs/${s.slug}`),
      parts: { intro: tx(s.intro, lang), challenges: txList(s.challenges, lang), responses: txList(s.responses, lang), benefits: s.benefits ? txList(s.benefits, lang) : undefined, related }, keywords: `${s.slug.replace(/-/g, " ")} ${sectorAliases[s.slug] ?? ""}`,
      text: [
        `${tx(s.name, lang)}. ${tx(s.intro, lang)}`,
        `${fr ? "Enjeux" : "Challenges"}:\n${bullets(txList(s.challenges, lang))}`,
        `${fr ? "Pistes AUREX (à valider avec vous)" : "AUREX approaches (to be validated with you)"}:\n${bullets(txList(s.responses, lang))}`,
        s.benefits ? `${fr ? "Bénéfices potentiels (non garantis)" : "Potential benefits (not guaranteed)"}:\n${bullets(txList(s.benefits, lang))}` : "",
        `${fr ? "Expertises mobilisées d’abord" : "Expertise brought first"}: ${related.join(", ")}.`,
      ].filter(Boolean).join("\n"),
    });
  }

  for (const t of [...tiers, ...aiTiers]) {
    docs.push({
      id: `offer:${t.slug}`, kind: "offer", title: `${t.name} — ${tx(t.verb, lang)}`, path: `${url("/tarifs")}#${t.slug}`,
      parts: { audience: tx(t.audience, lang), includes: txList(t.includes, lang), deliverables: txList(t.deliverables, lang) }, keywords: `${t.slug} offre forfait tarif prix coût combien price cost offer package`,
      text: [
        `${t.name} (${tx(t.verb, lang)}). ${tx(t.audience, lang)}`,
        `${fr ? "Services inclus" : "Included services"}:\n${bullets(txList(t.includes, lang))}`,
        `${fr ? "Livrables" : "Deliverables"}: ${txList(t.deliverables, lang).join("; ")}.`,
        `${fr ? "Accompagnement" : "Support"}: ${txList(t.support, lang).join("; ")}.`,
        `${fr ? "Avantages économiques visés" : "Targeted economic benefits"}: ${txList(t.economics, lang).join("; ")}.`,
        `${fr ? "Conditions" : "Terms"}: ${txList(t.conditions, lang).join(" ")}`,
      ].join("\n"),
    });
  }
  docs.push({
    id: "offer:formats", kind: "offer", title: fr ? "Formats d’intervention et tarification" : "Engagement formats and pricing", path: url("/tarifs"), keywords: "tarif prix coût combien devis abonnement forfait cad price cost quote subscription",
    text: [
      fr ? "Trois façons de travailler ensemble :" : "Three ways to work together:",
      bullets(formats.map((f) => `${tx(f.title, lang)} — ${tx(f.text, lang)}`)),
      fr ? "Les montants sont en dollars canadiens (CAD), taxes en sus, établis sur devis après un diagnostic partagé. Les honoraires AUREX, les budgets publicitaires (investis directement auprès des plateformes) et les outils ou licences sont indiqués séparément." : "Amounts are in Canadian dollars (CAD), taxes extra, set by proposal after a shared diagnostic. AUREX fees, advertising budgets (invested directly with the platforms) and tools or licences are shown separately.",
    ].join("\n"),
  });

  docs.push({
    id: "ai:overview", kind: "ai", title: aiPole.name, path: url("/intelligence-artificielle"), keywords: "ia ai intelligence artificielle automatisation agent assistant chatbot artificial automation",
    text: [
      `${aiPole.name}: ${tx(aiPole.tagline, lang)}.`,
      `${fr ? "Agents personnalisés" : "Custom agents"}:\n${bullets(agents.map((a) => `${tx(a.title, lang)} — ${tx(a.text, lang)}`))}`,
      `${fr ? "Familles d’automatisation" : "Automation families"}:\n${bullets(automations.map((a) => `${tx(a.title, lang)} (${txList(a.items, lang).slice(0, 4).join(", ")}…) — ${tx(a.benefits, lang)}`))}`,
      `${fr ? "Gouvernance et sécurité" : "Governance and security"}:\n${bullets(governance.map((g) => `${tx(g.title, lang)} — ${tx(g.text, lang)}`))}`,
      `${fr ? "Intégrations possibles (possibilités techniques, pas des partenariats officiels)" : "Possible integrations (technical possibilities, not official partnerships)"}: ${integrations.join(", ")}.`,
      `${fr ? "Composantes de coût d’une solution IA" : "Cost components of an AI solution"}:\n${bullets(aiCosts.map((c) => `${tx(c.title, lang)} — ${tx(c.text, lang)}`))}`,
    ].join("\n"),
  });

  docs.push({
    id: "method", kind: "method", title: fr ? "Méthodologie en six étapes" : "Six-step methodology", path: url("/methode"), keywords: "méthode méthodologie étapes processus démarche diagnostic method steps process",
    text: bullets(methodSteps.map((m) => `${m.number} ${tx(m.title, lang)} — ${tx(m.text, lang)}`)),
  });
  docs.push({
    id: "why", kind: "why", title: fr ? "Pourquoi choisir AUREX Solutions" : "Why choose AUREX Solutions", path: url("/a-propos"), keywords: "pourquoi choisir différence avantage why choose difference advantage",
    text: bullets(whyAurex.map((w) => `${tx(w.title, lang)} — ${tx(w.text, lang)}`)),
  });
  docs.push({
    id: "outcomes", kind: "general", title: fr ? "Solutions aux entreprises" : "Business solutions", path: url("/solutions"), keywords: "objectif solution gagner clients chiffre affaires réduire coûts rentabilité croissance goal win customers revenue costs profitability growth",
    text: bullets(outcomes.map((o) => `${tx(o.title, lang)} — ${tx(o.text, lang)} (${o.expertises.map((slug) => tx(expertises.find((e) => e.slug === slug)!.title, lang)).join(", ")})`)),
  });
  docs.push({
    id: "business-solutions", kind: "general", title: fr ? "Sept solutions d’affaires intégrées" : "Seven integrated business solutions", path: url("/solutions"), keywords: "solution intégrée launch growth digital transformation ai automation operational excellence supply chain performance enterprise transformation lancement croissance transformation numérique excellence opérationnelle chaîne d’approvisionnement",
    text: bullets(businessSolutions.map((b) => `${b.name} — ${tx(b.objective, lang)} ${fr ? "Client idéal" : "Ideal client"} : ${tx(b.client, lang)}. ${fr ? "Inclut" : "Includes"} : ${txList(b.includes, lang).join(", ")}. ${fr ? "Tarification sur devis." : "Quoted on request."}`)),
  });
  docs.push({
    id: "automation-catalog", kind: "ai", title: fr ? "Catalogue d’automatisation et statuts" : "Automation catalogue and statuses", path: url("/automatisation"), keywords: "automatisation catalogue soumissions facturation rapports documentaire ressources humaines prospection multiagent statut disponible développement automation catalogue quotes billing reports documents hr prospecting multi-agent status available",
    text: bullets(automationCatalog.map((a) => `${tx(a.title, lang)} [${tx(availabilityLabel[a.status], lang)}] — ${tx(a.text, lang)}`)) + `\n${fr ? "Services complémentaires" : "Complementary services"}:\n` + bullets(innovationIdeas.map((a) => `${tx(a.title, lang)} [${tx(availabilityLabel[a.status], lang)}] — ${tx(a.text, lang)}`)),
  });
  docs.push({
    id: "calculators", kind: "kpi", title: fr ? "Calculateurs d’affaires" : "Business calculators", path: url("/calculateurs"), keywords: "calculateur rentabilité publicitaire roas gains automatisation économies opérationnelles retour investissement calculator advertising profitability automation gains operational savings roi",
    text: fr ? "Trois calculateurs gratuits calculent des estimations à partir de vos chiffres : rentabilité publicitaire (clics, commandes, ROAS, profit net), gains d’automatisation (heures libérées, délai de récupération) et économies opérationnelles (coût par unité, erreurs évitées). Ce sont des simulations, jamais des résultats garantis." : "Three free calculators compute estimates from your own figures: advertising profitability (clicks, orders, ROAS, net profit), automation gains (hours freed, payback) and operational savings (unit cost, errors avoided). They are simulations, never guaranteed results.",
  });
  docs.push({
    id: "kpis", kind: "kpi", title: fr ? "Indicateurs de performance" : "Performance indicators", path: url("/simulateur"), keywords: "indicateur kpi roi roas cac conversion marge productivité fidélisation mesure simulateur indicator measure simulator",
    text: bullets(Object.values(kpis).map((k) => `${tx(k.label, lang)} — ${tx(k.definition, lang)} (${tx(k.formula, lang)})`)) + (fr ? "\nLe simulateur de rentabilité estime un potentiel avec les chiffres du visiteur et des hypothèses modifiables ; c’est une simulation, jamais un résultat garanti." : "\nThe profitability simulator estimates a potential with the visitor's own figures and editable assumptions; it is a simulation, never a guaranteed result."),
  });
  docs.push({
    id: "about", kind: "general", title: fr ? "À propos d’AUREX Solutions" : "About AUREX Solutions", path: url("/a-propos"), keywords: "aurex solutions entreprise cabinet qui êtes-vous à propos company about who",
    text: fr
      ? "AUREX Solutions est un cabinet multidisciplinaire de conseil, de marketing, de développement commercial, d’intelligence artificielle, d’automatisation et de performance opérationnelle. Il accompagne les entrepreneurs, les PME et les organisations dans la construction, le développement, l’optimisation et la transformation de leurs activités, au Québec et au Canada. Neuf départements (Strategy, Marketing, Media & Advertising, Digital, Intelligence, Automation, Operations, Supply Chain, Growth), avec l’IA intégrée à chacun. Signature : Stratégie | Technologie | Intelligence artificielle | Performance | Croissance. Aucun client, partenaire, témoignage ou résultat n’est publié sans vérification et autorisation."
      : "AUREX Solutions is a multidisciplinary firm in consulting, marketing, business development, artificial intelligence, automation and operational performance. It supports entrepreneurs, SMEs and organizations in building, growing, optimizing and transforming their businesses, in Quebec and Canada. Nine departments (Strategy, Marketing, Media & Advertising, Digital, Intelligence, Automation, Operations, Supply Chain, Growth), with AI built into each. Signature: Strategy | Technology | Artificial intelligence | Performance | Growth. No client, partner, testimonial or result is published without verification and permission.",
  });
  return docs;
}

const STOP = new Set(["le", "la", "les", "un", "une", "des", "de", "du", "et", "ou", "en", "à", "a", "au", "aux", "pour", "par", "sur", "dans", "avec", "que", "qui", "quoi", "est", "sont", "ce", "ces", "se", "sa", "son", "ses", "mon", "ma", "mes", "je", "tu", "il", "nous", "vous", "ils", "me", "te", "vos", "votre", "notre", "nos", "the", "a", "an", "of", "and", "or", "to", "in", "on", "for", "with", "is", "are", "what", "how", "do", "does", "can", "your", "our", "my", "i", "we", "you", "it", "be", "comment", "probleme", "problemes", "problem", "problems", "besoin", "besoins", "need", "needs", "quels", "quelles", "quel", "quelle", "peut", "peuvent", "faire", "fait", "aide", "aider"]);

export const normalize = (value: string) => value.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

export function tokens(value: string): string[] {
  // "j’ai" (I have) must not be read as the English "AI".
  return normalize(value.replace(/\b[jJ][’']ai\b/g, " ")).split(/[^a-z0-9]+/).filter((t) => t.length > 1 && !STOP.has(t));
}

/** Query words mapped to the vocabulary used in the passages. */
const synonyms: Record<string, string[]> = {
  ventes: ["vente", "clients", "prospects", "leads", "conversion", "acquisition", "chiffre", "sales", "customers"],
  vendre: ["vente", "clients", "conversion", "acquisition"],
  clients: ["clients", "acquisition", "prospects", "fidelisation", "customers"],
  publicite: ["ppc", "google", "meta", "roas", "campagnes", "ads", "advertising"],
  pub: ["ppc", "publicite", "campagnes"],
  site: ["web", "sites", "boutique", "digital", "website"],
  web: ["sites", "site", "boutique", "digital"],
  logistique: ["stocks", "entrepots", "approvisionnement", "inventaire", "logistics", "supply"],
  stock: ["stocks", "inventaire", "logistique", "approvisionnement"],
  couts: ["couts", "reduction", "operationnels", "economies", "costs", "savings"],
  cout: ["couts", "tarif", "prix", "devis", "cost", "price"],
  prix: ["tarif", "devis", "cad", "tarification", "price", "pricing"],
  tarif: ["prix", "devis", "cad", "tarification", "pricing"],
  tarifs: ["prix", "devis", "cad", "tarification", "pricing"],
  combien: ["tarif", "prix", "devis", "cad", "cost", "price"],
  price: ["tarif", "prix", "devis", "pricing", "cad"],
  pricing: ["tarif", "prix", "devis", "cad"],
  cost: ["tarif", "prix", "devis", "cad", "couts"],
  cher: ["tarif", "prix", "devis", "abonnement"],
  ia: ["intelligence", "artificielle", "automatisation", "agents", "ai", "artificial"],
  ai: ["intelligence", "artificielle", "automatisation", "agents", "ia"],
  agent: ["agents", "intelligence", "automatisation", "ia"],
  chatbot: ["service", "client", "assistants", "intelligence", "automatisation"],
  automatiser: ["automatisation", "intelligence", "ia", "processus"],
  automatisation: ["intelligence", "agents", "ia", "processus", "automation"],
  roi: ["rentabilite", "retour", "investissement", "indicateurs", "simulateur"],
  rentabilite: ["roi", "marge", "indicateurs", "simulateur", "profitability"],
  indicateurs: ["kpi", "roi", "roas", "cac", "mesure", "simulateur"],
  mesure: ["indicateurs", "kpi", "suivi"],
  strategie: ["conseil", "analyse", "affaires", "marche", "planification", "strategy"],
  marche: ["etudes", "concurrentielle", "intelligence", "economique", "market"],
  lancer: ["creation", "lancement", "entrepreneurs", "croissance", "launch"],
  demarrer: ["creation", "lancement", "entrepreneurs"],
  entreprise: ["creation", "croissance", "modele", "affaires"],
  operations: ["operationnelles", "processus", "productivite", "organisation"],
  productivite: ["operations", "processus", "organisation", "temps"],
  fidelisation: ["retention", "customer", "marketing", "experience", "crm"],
  crm: ["relation", "client", "customer", "fidelisation", "automatisation"],
  methode: ["methodologie", "etapes", "diagnostic"],
  etapes: ["methodologie", "diagnostic", "analyse", "strategie", "deploiement"],
  pourquoi: ["choisir", "avantages", "difference", "multidisciplinaire"],
  securite: ["gouvernance", "confidentialite", "donnees", "permissions", "supervision"],
  donnees: ["confidentialite", "gouvernance", "securite", "analyse"],
};

export type Hit = { doc: Doc; score: number };

export function retrieve(query: string, docs: Doc[], limit = 4): Hit[] {
  const base = tokens(query);
  if (!base.length) return [];
  const expanded = new Map<string, number>();
  for (const t of base) {
    expanded.set(t, Math.max(expanded.get(t) ?? 0, 1));
    for (const s of synonyms[t] ?? []) expanded.set(s, Math.max(expanded.get(s) ?? 0, 0.55));
  }
  const hits: Hit[] = [];
  for (const doc of docs) {
    const title = normalize(doc.title);
    const keywords = normalize(doc.keywords);
    const body = normalize(doc.text);
    let score = 0;
    for (const [term, weight] of expanded) {
      // Light stemming: "restaurant" must find "restauration".
      const stem = term.length >= 9 ? term.slice(0, term.length - 3) : term;
      if (title.includes(stem)) score += 6 * weight;
      if (keywords.includes(stem)) score += 3 * weight;
      const occurrences = body.split(stem).length - 1;
      if (occurrences) score += Math.min(occurrences, 3) * weight * 0.7;
    }
    // Phrase bonus: the whole query naming a sector, department or offer.
    if (title && normalize(query).includes(title.split(" — ")[0])) score += 10;
    if (score > 0) hits.push({ doc, score });
  }
  return hits.sort((a, b) => b.score - a.score).slice(0, limit);
}
