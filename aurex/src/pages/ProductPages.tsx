import { useEffect, useMemo, useState, type ReactNode } from "react";
import { Check } from "lucide-react";
import { Link } from "../components/LocaleLink";
import { agents, aiAcrossExpertise, entryOffers, plans, planTerms, siteOffer, type EntryOffer, aiCosts, automations, governance, integrations, tx, txList, valueFramework, kpis } from "../content";
import { defaultInputs, defaultScenarios, inputWarnings, simulate, type Scenario, type SimInputs } from "../simulator";
import { useLanguage } from "../i18n";
import { ArrowLink, PageMeta } from "../components/Layout";
import { CtaBand, PageHero } from "../components/Sections";
import { Glyph } from "../components/Glyphs";
import { DashboardPreview } from "../components/DashboardPreview";
import { track } from "../lib/track";
import { PacksSection } from "../components/Offer";
import { fmtMoney, fmtNum } from "../lib/format";
import { AskAurex } from "../components/AssistantChat";




function PlanCard({ plan }: { plan: (typeof plans)[number] }) {
  const { lang } = useLanguage();
  const fr = lang === "fr";
  return (
    <article className={`plan-card${plan.highlight ? " plan-card-featured" : ""}`} id={plan.slug}>
      {plan.highlight && <p className="plan-badge">{fr ? "Le plus choisi" : "Most chosen"}</p>}
      <h3>{plan.name}</h3>
      <p className="plan-tagline">{tx(plan.tagline, lang)}</p>
      <p className="entry-from">{fr ? "À partir de" : "From"}</p>
      <p className="entry-price"><strong>{fmtMoney(plan.monthly, lang)}</strong><span>{fr ? " / mois" : " / month"}</span></p>
      <p className="entry-upgrade">{fr ? "Ou " : "Or "}<strong>{fmtMoney(plan.yearly, lang)}</strong>{fr ? " / mois avec un engagement de 12 mois (−5 %)" : " / month with a 12-month commitment (−5%)"}</p>
      <dl className="plan-facts">
        <div><dt>{fr ? "Pour qui" : "Who it is for"}</dt><dd>{tx(plan.forWho, lang)}</dd></div>
        <div><dt>{fr ? "Problème résolu" : "Problem solved"}</dt><dd>{tx(plan.problem, lang)}</dd></div>
      </dl>
      <p className="plan-sub">{fr ? "Inclus, avec la fréquence" : "Included, with frequency"}</p>
      <ul>{txList(plan.includes, lang).map((x) => <li key={x}><Check size={15} aria-hidden="true" />{x}</li>)}</ul>
      <p className="entry-upgrade"><strong>{fr ? "Suivi : " : "Follow-up: "}</strong>{tx(plan.followUp, lang)}</p>
      <p className="entry-upgrade"><strong>{fr ? "Non inclus : " : "Not included: "}</strong>{txList(plan.excludes, lang).join(" · ")}</p>
      <p className="entry-upgrade"><strong>{fr ? "Options : " : "Options: "}</strong>{txList(plan.options, lang).join(" · ")}</p>
      <p className="plan-why"><strong>{fr ? "Pourquoi ce forfait : " : "Why this plan: "}</strong>{tx(plan.why, lang)}</p>
      {plan.siteOffer && <p className="plan-site">{fr ? `Site Web de base de ${plan.siteOffer.pages} pages offert avec un engagement de 12 mois (conditions plus bas).` : `Basic ${plan.siteOffer.pages}-page website offered with a 12-month commitment (conditions below).`}</p>}
      <Link className="button-primary" to={`/soumission?solution=${plan.slug}`} onClick={() => track("cta_quote")}>{fr ? "Choisir ce forfait" : "Choose this plan"}</Link>
    </article>
  );
}

function EntryCard({ offer }: { offer: EntryOffer }) {
  const { lang } = useLanguage();
  const fr = lang === "fr";
  const unit = (u: EntryOffer["unit"]) => (u === "month" ? (fr ? " / mois" : " / month") : fr ? " (forfait)" : " (one-time)");
  return (
    <article className="entry-card" id={offer.slug}>
      <p className="entry-from">{fr ? "À partir de" : "From"}</p>
      <p className="entry-price"><strong>{fmtMoney(offer.price, lang)}</strong><span>{unit(offer.unit)}</span></p>
      <h3>{tx(offer.title, lang)}</h3>
      <ul>{txList(offer.scope, lang).map((x) => <li key={x}><Check size={15} aria-hidden="true" />{x}</li>)}</ul>
      {offer.extras?.map((x) => <p key={x.label.fr} className="entry-upgrade"><strong>{fr ? "Aussi : " : "Also: "}</strong>{tx(x.label, lang)} — <strong>{fmtMoney(x.price, lang)}</strong>{unit(x.unit)}</p>)}
      {offer.upgrade && <p className="entry-upgrade">{fr ? "Version complète : " : "Full version: "}{tx(offer.upgrade.label, lang)} — <strong>{fmtMoney(offer.upgrade.price, lang)}</strong>{unit(offer.upgrade.unit)}</p>}
      <Link className="button-primary" to={`/soumission?solution=${offer.slug}`} onClick={() => track("cta_quote")}>{fr ? "Demander cette offre" : "Request this offer"}</Link>
    </article>
  );
}

export function PricingPage() {
  const { lang } = useLanguage();
  const fr = lang === "fr";
  return <>
    <PageMeta title={fr ? "Tarifs et offres" : "Pricing and offers"} description={fr ? "Quatre forfaits mensuels de 100 $ à 1 500 $, des services à l’unité, un site Web de base offert avec 12 mois et six packs intégrés : prix de départ publics." : "Four offers, from Launch to Transform, and four AI offers: included services, deliverables and terms."} />
    <PageHero eyebrow="AUREX / TARIFS" title={fr ? "Une expertise de haut niveau, des tarifs clairs." : "High-level expertise, clear pricing."} text={fr ? "Des solutions accessibles aux entrepreneurs et aux PME, sans les coûts d’un grand cabinet. Prix de départ publics en dollars canadiens (CAD), taxes en sus : le prix ferme figure toujours dans votre soumission." : "Solutions within reach of entrepreneurs and SMEs, without the costs of a large firm. Public starting prices in Canadian dollars (CAD), taxes extra: the firm price always appears in your quote."}>
      <ArrowLink to="/consultation">{fr ? "Obtenir une consultation" : "Request a consultation"}</ArrowLink>
    </PageHero>

    <section className="shell section pricing-paths" aria-labelledby="paths-title">
      <p className="eyebrow">{fr ? "Trois façons d’acheter" : "Three ways to buy"}</p>
      <h2 id="paths-title" className="pricing-h2">{fr ? "Un service ponctuel, un accompagnement mensuel, ou un pack intégré." : "A one-off service, monthly support, or an integrated pack."}</h2>
      <div className="format-grid">
        <div><h3>{fr ? "1. Services ponctuels" : "1. One-off services"}</h3><p>{fr ? "Vous demandez un service, nous le livrons, et c’est tout. Prix fixe, sans engagement." : "You ask for a service, we deliver it, and that’s it. Fixed price, no commitment."}</p><a href="#unite">{fr ? "Voir les services à l’unité" : "See one-off services"}</a></div>
        <div><h3>{fr ? "2. Accompagnements mensuels" : "2. Monthly support"}</h3><p>{fr ? "Un forfait mensuel de 100 $ à 1 500 $, ou un service continu à la carte : réseaux sociaux, SEO, publicité, maintenance, suivi." : "A monthly plan from $100 to $1,500, or an ongoing à-la-carte service: social media, SEO, advertising, maintenance, upkeep."}</p><a href="#forfaits">{fr ? "Voir les forfaits" : "See the plans"}</a> · <a href="#mensuel">{fr ? "services à la carte" : "à-la-carte services"}</a></div>
        <div><h3>{fr ? "3. Packs intégrés" : "3. Integrated packs"}</h3><p>{fr ? "Plusieurs services réunis autour d’un objectif : lancement, acquisition, croissance, opérations, automatisation." : "Several services combined around one goal: launch, acquisition, growth, operations, automation."}</p><a href="#packs">{fr ? "Voir les packs" : "See the packs"}</a></div>
      </div>
    </section>

    <section id="forfaits" className="shell section" aria-labelledby="plans-title">
      <p className="eyebrow">{fr ? "Forfaits permanents · plusieurs services réunis" : "Permanent plans · several services bundled"}</p>
      <h2 id="plans-title" className="pricing-h2">{fr ? "Quatre forfaits mensuels, de 100 $ à 1 500 $." : "Four monthly plans, from $100 to $1,500."}</h2>
      <p className="muted-note">{fr ? "Un partenaire régulier plutôt qu’une équipe à embaucher : continuité, planification, suivi des priorités et coût prévisible. Chaque forfait a une portée définie, et le niveau supérieur ajoute des services sans tout regrouper. Prix de départ en dollars canadiens, taxes en sus." : "A regular partner instead of a team to hire: continuity, planning, priority tracking and a predictable cost. Each plan has a defined scope, and the next level adds services without bundling everything. Starting prices in Canadian dollars, taxes extra."}</p>
      <div className="plan-grid">{plans.map((p) => <PlanCard key={p.slug} plan={p} />)}</div>
      <ul className="plan-terms">{txList(planTerms.terms, lang).map((x) => <li key={x}>{x}</li>)}</ul>
    </section>

    <section id="site-offert" className="shell section" aria-labelledby="site-title">
      <p className="eyebrow">{fr ? "Offre exceptionnelle" : "Special offer"}</p>
      <h2 id="site-title" className="pricing-h2">{tx(siteOffer.title, lang)}</h2>
      <p className="muted-note">{tx(siteOffer.intro, lang)}</p>
      <div className="format-grid">
        <div><h3>{fr ? "Inclus" : "Included"}</h3><ul className="plan-terms">{txList(siteOffer.included, lang).map((x) => <li key={x}>{x}</li>)}</ul></div>
        <div><h3>{fr ? "Ce que vous fournissez" : "What you provide"}</h3><ul className="plan-terms">{txList(siteOffer.fromYou, lang).map((x) => <li key={x}>{x}</li>)}</ul></div>
        <div><h3>{fr ? "Non inclus" : "Not included"}</h3><ul className="plan-terms">{txList(siteOffer.notIncluded, lang).map((x) => <li key={x}>{x}</li>)}</ul></div>
      </div>
      <p className="muted-note"><strong>{fr ? "Annulation : " : "Cancellation: "}</strong>{tx(siteOffer.cancellation, lang)}</p>
      <p className="muted-note"><strong>{fr ? "Site de base ou site personnalisé : " : "Basic or custom site: "}</strong>{tx(siteOffer.difference, lang)}</p>
    </section>

    <PacksSection />

    <section id="unite" className="shell section" aria-labelledby="entry-title">
      <p className="eyebrow">{fr ? "Services à l’unité · achat unique · prix publics" : "One-off services · single purchase · public pricing"}</p>
      <h2 id="entry-title" className="pricing-h2">{fr ? "Commencez simplement, à prix clair." : "Start simply, at a clear price."}</h2>
      <p className="muted-note">{fr ? "Prix en dollars canadiens, taxes en sus. Chaque offre a une portée précise, indiquée ci-dessous ; une version plus complète est proposée au besoin. Le tarif confirmé figure toujours dans votre soumission." : "Prices in Canadian dollars, taxes extra. Each offer has a defined scope, listed below; a fuller version is available when needed. The confirmed rate always appears in your quote."}</p>
      <div className="entry-grid">{entryOffers.filter((o) => o.unit === "once").map((o) => <EntryCard key={o.slug} offer={o} />)}</div>
      <p className="muted-note">{fr ? "Autres services à l’unité, sur devis : identité de marque, boutique en ligne, formation à l’IA, audit opérationnel, diagnostic logistique, prospection ciblée." : "Other one-off services, quoted on request: brand identity, online store, AI training, operational audit, logistics diagnostic, targeted prospecting."}</p>
    </section>

    <section id="mensuel" className="shell section" aria-labelledby="monthly-title">
      <p className="eyebrow">{fr ? "Services mensuels · permanents · prix publics" : "Monthly services · ongoing · public pricing"}</p>
      <h2 id="monthly-title" className="pricing-h2">{fr ? "On s’occupe de votre image et de votre site, chaque mois." : "We look after your image and website, every month."}</h2>
      <p className="muted-note">{fr ? "Chaque service se commande seul, par mois, avec un préavis de 30 jours. Budget publicitaire et frais de tiers en sus." : "Each service can be ordered on its own, monthly, with 30 days’ notice. Ad budget and third-party fees extra."}</p>
      <div className="entry-grid">{entryOffers.filter((o) => o.unit === "month").map((o) => <EntryCard key={o.slug} offer={o} />)}</div>
    </section>

    <section className="shell section">
      <p className="eyebrow">{fr ? "Intelligence artificielle et automatisation" : "Artificial intelligence and automation"}</p>
      <h2 className="pricing-h2">{fr ? "Agents IA et automatisations : de quoi se compose le prix." : "AI agents and automations: what the price is made of."}</h2>
      <p className="muted-note">{fr ? "Prix de départ : automatisation simple dès 990 $, assistant FAQ dès 1 190 $, agent téléphonique dès 990 $ d’installation puis dès 299 $ par mois. Détails sur la page Automatisation." : "Starting prices: simple automation from $990, FAQ assistant from $1,190, phone agent from $990 setup then from $299 per month. Details on the Automation page."} <Link to="/automatisation">{fr ? "Voir la page Automatisation" : "See the Automation page"}</Link></p>
      <div className="ai-costs">
        <h3>{fr ? "Ce que comprennent les coûts d’une solution IA" : "What an AI solution’s costs include"}</h3>
        <div className="format-grid four">{aiCosts.map((c) => <div key={c.title.en}><h4>{tx(c.title, lang)}</h4><p>{tx(c.text, lang)}</p></div>)}</div>
      </div>
    </section>

    <section className="shell section pricing-clarity">
      <p className="eyebrow">{fr ? "Distinguer les montants" : "Telling amounts apart"}</p>
      <div className="format-grid">
        <div><h3>{fr ? "Honoraires AUREX" : "AUREX fees"}</h3><p>{fr ? "Le travail de conception, de gestion et d’accompagnement de nos équipes." : "The design, management and support work of our teams."}</p></div>
        <div><h3>{fr ? "Budget publicitaire" : "Advertising budget"}</h3><p>{fr ? "Ce que vous investissez directement auprès des plateformes. Il vous appartient et reste sous votre contrôle." : "What you invest directly with the platforms. It belongs to you and stays under your control."}</p></div>
        <div><h3>{fr ? "Outils et licences" : "Tools and licences"}</h3><p>{fr ? "Les abonnements logiciels et la consommation de services tiers, indiqués séparément au coût réel." : "Software subscriptions and third-party service usage, shown separately at actual cost."}</p></div>
      </div>
      <p className="muted-note">{fr ? "Les montants publiés sur cette page sont ceux validés par la direction d’AUREX Solutions. Toute offre sans montant publié est établie sur devis." : "Amounts published on this page are those validated by AUREX Solutions’ management. Any offer without a published amount is quoted on request."}</p>
    </section>
    <CtaBand />
  </>;
}

/* ───────────────────────────── Simulator ───────────────────────────── */

export function NumberField({ id, label, value, onChange, suffix, step = 1, help }: { id: string; label: string; value: number; onChange: (n: number) => void; suffix?: string; step?: number; help?: string }) {
  return (
    <label className="field sim-field" htmlFor={id}>
      <span>{label}</span>
      <div className="sim-input"><input id={id} type="number" inputMode="decimal" min={0} step={step} value={Number.isFinite(value) ? value : 0} onChange={(e) => onChange(e.target.value === "" ? 0 : Number(e.target.value))} />{suffix && <i>{suffix}</i>}</div>
      {help && <small>{help}</small>}
    </label>
  );
}

export function SimulatorPage() {
  const { lang } = useLanguage();
  const fr = lang === "fr";
  const [inputs, setInputs] = useState<SimInputs>(defaultInputs);
  const [scenarios, setScenarios] = useState<Scenario[]>(defaultScenarios);
  const [active, setActive] = useState<Scenario["key"]>("moderate");
  const set = <K extends keyof SimInputs>(key: K, value: number) => setInputs((c) => ({ ...c, [key]: value }));
  const results = useMemo(() => scenarios.map((s) => simulate(inputs, s)), [inputs, scenarios]);
  const current = results.find((r) => r.key === active)!;
  const scenario = scenarios.find((s) => s.key === active)!;
  const warnings = inputWarnings(inputs);
  const label: Record<Scenario["key"], string> = { prudent: fr ? "Prudent" : "Cautious", moderate: fr ? "Modéré" : "Moderate", ambitious: fr ? "Ambitieux" : "Ambitious" };
  const setScenario = (key: keyof Omit<Scenario, "key">, value: number) => setScenarios((all) => all.map((s) => (s.key === active ? { ...s, [key]: value } : s)));

  useEffect(() => { const timer = window.setTimeout(() => track("simulator_run"), 1500); return () => window.clearTimeout(timer); }, [inputs, scenarios]);

  const maxGain = Math.max(...results.map((r) => r.totalGain), 1);
  const maxCum = Math.max(...current.cumulative.map(Math.abs), 1);
  const width = 560, height = 190;
  const points = current.cumulative.map((v, i) => `${(i / Math.max(current.cumulative.length - 1, 1)) * width},${height / 2 - (v / maxCum) * (height / 2 - 12)}`).join(" ");

  return <>
    <PageMeta title={fr ? "Simulateur de rentabilité" : "Profitability simulator"} description={fr ? "Estimez le potentiel de gains avec vos propres chiffres et des hypothèses modifiables." : "Estimate potential gains with your own figures and editable assumptions."} />
    <PageHero eyebrow="AUREX / SIMULATEUR" title={fr ? "Estimez le potentiel, avec vos chiffres." : "Estimate the potential, with your figures."} text={fr ? "Entrez vos données et ajustez les hypothèses. Le simulateur calcule un potentiel de gains selon trois scénarios. C’est une estimation pédagogique, pas une prévision ni une garantie." : "Enter your data and adjust the assumptions. The simulator calculates potential gains under three scenarios. It is an educational estimate, not a forecast or a guarantee."} />

    <section className="shell section sim" aria-labelledby="sim-title">
      <p className="sim-disclaimer" role="note"><strong>{fr ? "Simulation, non résultat." : "Simulation, not a result."}</strong> {fr ? "Les valeurs de départ sont illustratives : remplacez-les par les vôtres. Les pourcentages de chaque scénario sont des hypothèses que vous pouvez modifier. Aucun gain n’est garanti." : "Starting values are illustrative: replace them with your own. The percentages in each scenario are assumptions you can edit. No gain is guaranteed."}</p>
      <h2 id="sim-title" className="sr-only">{fr ? "Simulateur" : "Simulator"}</h2>
      <div className="sim-grid">
        <form className="sim-form" onSubmit={(e) => e.preventDefault()} aria-label={fr ? "Vos données" : "Your data"}>
          <h3>{fr ? "1. Vos données" : "1. Your data"}</h3>
          <div className="sim-fields">
            <NumberField id="s-revenue" label={fr ? "Chiffre d’affaires mensuel" : "Monthly revenue"} suffix="$ CAD" step={500} value={inputs.monthlyRevenue} onChange={(n) => set("monthlyRevenue", n)} />
            <NumberField id="s-marketing" label={fr ? "Budget marketing mensuel" : "Monthly marketing budget"} suffix="$ CAD" step={100} value={inputs.marketingBudget} onChange={(n) => set("marketingBudget", n)} />
            <NumberField id="s-leads" label={fr ? "Prospects par mois" : "Prospects per month"} step={5} value={inputs.monthlyLeads} onChange={(n) => set("monthlyLeads", n)} />
            <NumberField id="s-conv" label={fr ? "Taux de conversion actuel" : "Current conversion rate"} suffix="%" step={0.5} value={inputs.conversionRate} onChange={(n) => set("conversionRate", n)} />
            <NumberField id="s-sale" label={fr ? "Valeur moyenne d’une vente" : "Average sale value"} suffix="$ CAD" step={50} value={inputs.averageSale} onChange={(n) => set("averageSale", n)} />
            <NumberField id="s-opex" label={fr ? "Dépenses opérationnelles mensuelles" : "Monthly operating expenses"} suffix="$ CAD" step={500} value={inputs.operatingExpenses} onChange={(n) => set("operatingExpenses", n)} />
            <NumberField id="s-hours" label={fr ? "Heures par mois en tâches répétitives" : "Hours per month on repetitive tasks"} suffix="h" step={5} value={inputs.repetitiveHours} onChange={(n) => set("repetitiveHours", n)} />
            <NumberField id="s-hourly" label={fr ? "Coût horaire du temps de travail" : "Hourly cost of working time"} suffix="$ CAD/h" step={5} value={inputs.hourlyCost} onChange={(n) => set("hourlyCost", n)} help={fr ? "Hypothèse : pour valoriser le temps économisé." : "Assumption: to value the time saved."} />
            <NumberField id="s-invest" label={fr ? "Investissement envisagé" : "Planned investment"} suffix="$ CAD" step={500} value={inputs.investment} onChange={(n) => set("investment", n)} help={fr ? "Saisissez le montant de votre devis ; la valeur de départ est fictive." : "Enter the amount from your proposal; the starting value is fictional."} />
            <NumberField id="s-horizon" label={fr ? "Horizon de calcul" : "Calculation horizon"} suffix={fr ? "mois" : "months"} value={inputs.horizonMonths} onChange={(n) => set("horizonMonths", n)} />
          </div>
          {warnings.includes("leads-sales") && <p className="sim-warning" role="status">{fr ? "Vos prospects, votre taux de conversion et votre valeur de vente donnent un chiffre d’affaires très différent du montant saisi. Vérifiez vos données." : "Your prospects, conversion rate and sale value imply revenue very different from the amount entered. Check your data."}</p>}
          {warnings.includes("expenses-high") && <p className="sim-warning" role="status">{fr ? "Vos dépenses dépassent votre chiffre d’affaires : vérifiez les montants." : "Your expenses exceed your revenue: check the amounts."}</p>}

          <h3>{fr ? "2. Hypothèses du scénario" : "2. Scenario assumptions"}</h3>
          <div className="sim-tabs" role="tablist" aria-label={fr ? "Scénarios" : "Scenarios"}>
            {scenarios.map((s) => <button key={s.key} type="button" role="tab" aria-selected={active === s.key} onClick={() => setActive(s.key)}>{label[s.key]}</button>)}
          </div>
          <div className="sim-fields">
            <NumberField id="a-conv" label={fr ? "Amélioration du taux de conversion" : "Conversion rate improvement"} suffix="%" value={scenario.conversionUplift} onChange={(n) => setScenario("conversionUplift", n)} help={fr ? "Hausse relative (5 % sur 8 % donne 8,4 %)." : "Relative increase (5% on 8% gives 8.4%)."} />
            <NumberField id="a-leads" label={fr ? "Hausse du nombre de prospects" : "Increase in prospects"} suffix="%" value={scenario.leadsUplift} onChange={(n) => setScenario("leadsUplift", n)} />
            <NumberField id="a-opex" label={fr ? "Réduction des dépenses opérationnelles" : "Operating expense reduction"} suffix="%" value={scenario.opexReduction} onChange={(n) => setScenario("opexReduction", n)} />
            <NumberField id="a-auto" label={fr ? "Part des heures répétitives automatisées" : "Share of repetitive hours automated"} suffix="%" value={scenario.automationShare} onChange={(n) => setScenario("automationShare", n)} />
          </div>
          <button type="button" className="text-button" onClick={() => { setInputs(defaultInputs); setScenarios(defaultScenarios); }}>{fr ? "Rétablir les valeurs de départ" : "Restore starting values"}</button>
        </form>

        <div className="sim-results" aria-live="polite">
          <h3>{fr ? "3. Résultats estimés" : "3. Estimated results"} · <span>{label[active]}</span></h3>
          <p className="sim-badge">{fr ? "SIMULATION" : "SIMULATION"}</p>
          <dl className="sim-kpis">
            <div><dt>{fr ? "Revenu supplémentaire potentiel" : "Potential extra revenue"}</dt><dd>{fmtMoney(current.extraRevenue, lang)}<small>{fr ? " / mois" : " / month"}</small></dd></div>
            <div><dt>{fr ? "Économies opérationnelles estimées" : "Estimated operating savings"}</dt><dd>{fmtMoney(current.opexSavings, lang)}<small>{fr ? " / mois" : " / month"}</small></dd></div>
            <div><dt>{fr ? "Temps potentiellement économisé" : "Potential time saved"}</dt><dd>{fmtNum(current.hoursSaved, lang, 1)} h<small>{fr ? " / mois" : " / month"}</small></dd></div>
            <div><dt>{fr ? "Gain mensuel total estimé" : "Estimated total monthly gain"}</dt><dd>{fmtMoney(current.monthlyGain, lang)}</dd></div>
            <div><dt>{fr ? `Retour sur investissement (${inputs.horizonMonths} mois)` : `Return on investment (${inputs.horizonMonths} months)`}</dt><dd>{current.roi === null ? "—" : `${fmtNum(current.roi * 100, lang)} %`}</dd></div>
            <div><dt>{fr ? "Délai estimatif de récupération" : "Estimated payback period"}</dt><dd>{current.paybackMonths === null ? "—" : `${fmtNum(current.paybackMonths, lang, 1)} ${fr ? "mois" : "months"}`}</dd></div>
          </dl>

          <h4>{fr ? "Gain cumulé net de l’investissement" : "Cumulative gain net of investment"}</h4>
          <svg className="sim-chart" viewBox={`0 0 ${width} ${height}`} role="img" aria-label={fr ? "Courbe du gain cumulé net par mois, selon le scénario choisi" : "Curve of cumulative net gain by month, for the chosen scenario"}>
            <line x1="0" x2={width} y1={height / 2} y2={height / 2} stroke="currentColor" opacity=".35" strokeDasharray="4 4" />
            <polyline points={points} fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeLinejoin="round" />
            <text x="4" y="14" fontSize="11" fill="currentColor">{fmtMoney(maxCum, lang)}</text>
            <text x="4" y={height - 4} fontSize="11" fill="currentColor">{fmtMoney(-maxCum, lang)}</text>
            <text x={width - 4} y={height / 2 - 6} fontSize="11" textAnchor="end" fill="currentColor">{fr ? "seuil de rentabilité" : "break-even"}</text>
          </svg>

          <h4>{fr ? "Comparaison des scénarios" : "Scenario comparison"}</h4>
          <ul className="sim-compare">
            {results.map((r) => (
              <li key={r.key}><span>{label[r.key]}</span><i style={{ width: `${(r.totalGain / maxGain) * 100}%` }} /><b>{fmtMoney(r.totalGain, lang)}</b></li>
            ))}
          </ul>
          <p className="sim-formulas">{fr ? "Comment c’est calculé : revenu supplémentaire = (ventes après hypothèses − ventes actuelles) × valeur moyenne ; économies = dépenses × réduction ; temps = heures × part automatisée, valorisé au coût horaire ; ROI = (gain total − investissement) ÷ investissement." : "How it is calculated: extra revenue = (sales after assumptions − current sales) × average value; savings = expenses × reduction; time = hours × automated share, valued at the hourly cost; ROI = (total gain − investment) ÷ investment."}</p>
          <ArrowLink to="/consultation" >{fr ? "Discuter de ces hypothèses avec AUREX" : "Discuss these assumptions with AUREX"}</ArrowLink>
        </div>
      </div>
      <details className="kpi-defs"><summary>{fr ? "Définitions des indicateurs" : "Indicator definitions"}</summary>
        <dl className="kpi-grid">{Object.values(kpis).map((k) => <div key={k.label.en}><dt>{tx(k.label, lang)}</dt><dd>{tx(k.definition, lang)}<code>{tx(k.formula, lang)}</code></dd></div>)}</dl>
      </details>
    </section>
    <section className="shell section"><DashboardPreview /></section>
    <CtaBand />
  </>;
}

/* ───────────────────────── AI & Automation ───────────────────────── */

function Block({ eyebrow, title, children }: { eyebrow: string; title: string; children: ReactNode }) {
  return <section className="shell section ai-block"><p className="eyebrow">{eyebrow}</p><h2>{title}</h2>{children}</section>;
}

export function AIPage() {
  const { lang, t } = useLanguage();
  const fr = lang === "fr";
  return <>
    <PageMeta title="AUREX AI & Automation" description={fr ? "Agents intelligents et automatisation, avec gouvernance et supervision humaine." : "Intelligent agents and automation, with governance and human oversight."} />
    <PageHero glyph={<Glyph name="ai" size={56} />} eyebrow="AUREX AI & AUTOMATION" title={fr ? "Expertise humaine. Intelligence artificielle. Performance d’affaires." : "Human expertise. Artificial intelligence. Business performance."} text={fr ? "Nous concevons des agents et des automatisations adaptés à vos outils et à vos processus, avec des permissions définies et une supervision appropriée. L’IA n’est pas une page à part : elle traverse toutes nos expertises." : "We design agents and automations adapted to your tools and processes, with defined permissions and appropriate oversight. AI is not a separate page: it runs through all our expertise."}>
      <AskAurex placeholder={fr ? "Demandez-nous comment l’IA peut servir votre entreprise…" : "Ask how AI can serve your business…"} label={fr ? "Poser une question au conseiller IA" : "Ask the AI advisor a question"} />
      <ArrowLink to="/consultation">{t("consult")}</ArrowLink>
    </PageHero>

    <Block eyebrow={fr ? "Agents IA personnalisés" : "Custom AI agents"} title={fr ? "Dix agents, adaptés à votre entreprise." : "Ten agents, adapted to your business."}>
      <div className="agent-grid">{agents.map((a) => <div key={a.key}><h3>{tx(a.title, lang)}</h3><p>{tx(a.text, lang)}</p></div>)}</div>
      <p className="muted-note">{fr ? "Chaque agent est adapté à vos outils et à vos processus, avec des permissions définies et une supervision appropriée." : "Every agent is adapted to your tools and processes, with defined permissions and appropriate oversight."}</p>
    </Block>

    <section className="services-dark section">
      <div className="shell">
        <p className="eyebrow">{fr ? "Automatisation intelligente" : "Intelligent automation"}</p>
        <h2 className="dark-h2">{fr ? "Six familles d’automatisation." : "Six families of automation."}</h2>
        <div className="auto-grid">{automations.map((a) => (
          <article key={a.key}>
            <h3>{tx(a.title, lang)}</h3>
            <ul>{txList(a.items, lang).map((x) => <li key={x}>{x}</li>)}</ul>
            <p><strong>{fr ? "Bénéfices visés : " : "Targeted benefits: "}</strong>{tx(a.benefits, lang)}</p>
          </article>
        ))}</div>
      </div>
    </section>

    <Block eyebrow={fr ? "Intégrations" : "Integrations"} title={fr ? "Des solutions connectées à vos environnements." : "Solutions connected to your environments."}>
      <ul className="chip-list">{integrations.map((i) => <li key={i}>{i}</li>)}<li>API {fr ? "et logiciels métiers" : "and business software"}</li></ul>
      <p className="muted-note">{fr ? "Ces technologies sont présentées comme des possibilités d’intégration. Elles ne constituent pas des partenariats officiels, et les noms cités appartiennent à leurs propriétaires respectifs." : "These technologies are presented as integration possibilities. They are not official partnerships, and the names cited belong to their respective owners."}</p>
    </Block>

    <Block eyebrow={fr ? "L’IA dans tous les départements" : "AI in every department"} title={fr ? "Un seul fil conducteur, dix applications." : "One thread, ten applications."}>
      <ul className="across-list">{aiAcrossExpertise.map((x) => <li key={x.slug}><Link to={`/expertises/${x.slug}`}>{tx(x.title, lang)}</Link></li>)}</ul>
    </Block>

    <Block eyebrow={fr ? "Démontrer la valeur" : "Demonstrating value"} title={fr ? "Pour chaque solution, cinq questions." : "For every solution, five questions."}>
      <ol className="value-steps">{valueFramework.map((v) => <li key={v.title.en}><h3>{tx(v.title, lang)}</h3><p>{tx(v.text, lang)}</p></li>)}</ol>
      <ArrowLink to="/simulateur">{fr ? "Évaluer la rentabilité potentielle avec le simulateur" : "Assess potential profitability with the simulator"}</ArrowLink>
    </Block>

    <Block eyebrow={fr ? "Sécurité et gouvernance" : "Security and governance"} title={fr ? "Fiables, documentées, testées, supervisées." : "Reliable, documented, tested, supervised."}>
      <div className="format-grid">{governance.map((g) => <div key={g.title.en}><h3>{tx(g.title, lang)}</h3><p>{tx(g.text, lang)}</p></div>)}</div>
    </Block>

    <Block eyebrow={fr ? "Offres et prix" : "Offers and pricing"} title={fr ? "Agents IA et automatisations : budgets de 100 à 1 500 $ par mois." : "AI agents and automations: budgets from $100 to $1,500 per month."}>
      <p className="muted-note">{fr ? "Prix de départ, portée définie, aucun résultat garanti. Le détail des budgets, des agents possibles et des précautions est sur la page Automatisation." : "Starting prices, defined scope, no guaranteed result. Budget details, possible agents and precautions are on the Automation page."}</p>
      <div className="engagement-actions"><ArrowLink to="/automatisation">{fr ? "Voir la page Automatisation" : "See the Automation page"}</ArrowLink><ArrowLink to="/tarifs#unite">{fr ? "Voir les prix de départ" : "See starting prices"}</ArrowLink></div>
    </Block>
    <CtaBand />
  </>;
}
