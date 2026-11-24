import { useEffect, useMemo, useState, type ReactNode } from "react";
import { Check } from "lucide-react";
import { Link } from "../components/LocaleLink";
import { agents, aiAcrossExpertise, entryOffers, plans, planTerms, type EntryOffer, aiCosts, aiTiers, automations, expertises, formats, governance, integrations, tiers, tx, txList, valueFramework, kpis, type Tier } from "../content";
import { defaultInputs, defaultScenarios, inputWarnings, simulate, type Scenario, type SimInputs } from "../simulator";
import { useLanguage } from "../i18n";
import { trpc } from "../providers/trpc";
import { ArrowLink, PageMeta } from "../components/Layout";
import { CtaBand, PageHero } from "../components/Sections";
import { Glyph } from "../components/Glyphs";
import { DashboardPreview } from "../components/DashboardPreview";
import { track } from "../lib/track";
import { fmtMoney, fmtNum } from "../lib/format";
import { AskAurex } from "../components/AssistantChat";

type Pricing = { slug: string; priceText: string | null; timeline: string | null };

function TierCard({ tier, pricing }: { tier: Tier; pricing?: Pricing }) {
  const { lang, t } = useLanguage();
  const fr = lang === "fr";
  return (
    <article className="tier-card" id={tier.slug}>
      <header>
        <Glyph name={tier.slug} size={44} />
        <p className="eyebrow">{tx(tier.verb, lang)}</p>
        <h3>{tier.name}</h3>
        <p className="tier-audience">{tx(tier.audience, lang)}</p>
      </header>
      <div className="tier-price" aria-label={fr ? "Tarif" : "Price"}>
        {pricing?.priceText ? <strong>{pricing.priceText}</strong> : <strong>{fr ? "Tarif sur devis" : "Quoted on request"}</strong>}
        <span>{pricing?.timeline ? `${fr ? "Délai indicatif : " : "Indicative timeline: "}${pricing.timeline}` : fr ? "Délai précisé après le diagnostic" : "Timeline set after the diagnostic"}</span>
      </div>
      <div className="tier-block"><h4>{fr ? "Services inclus" : "Included services"}</h4><ul>{txList(tier.includes, lang).map((x) => <li key={x}><Check size={15} strokeWidth={1.6} />{x}</li>)}</ul></div>
      <div className="tier-block"><h4>{fr ? "Livrables" : "Deliverables"}</h4><ul>{txList(tier.deliverables, lang).map((x) => <li key={x}>{x}</li>)}</ul></div>
      <div className="tier-block"><h4>{fr ? "Modalités d’accompagnement" : "How we support you"}</h4><ul>{txList(tier.support, lang).map((x) => <li key={x}>{x}</li>)}</ul></div>
      <div className="tier-block"><h4>{fr ? "Avantages économiques visés" : "Targeted economic benefits"}</h4><ul>{txList(tier.economics, lang).map((x) => <li key={x}>{x}</li>)}</ul></div>
      <div className="tier-block tier-conditions"><h4>{fr ? "Conditions" : "Terms"}</h4><ul>{txList(tier.conditions, lang).map((x) => <li key={x}>{x}</li>)}</ul></div>
      <div className="tier-links">{tier.expertises.map((slug) => <Link key={slug} to={`/expertises/${slug}`}>{tx(expertises.find((e) => e.slug === slug)!.title, lang)}</Link>)}</div>
      <Link className="button-primary" to={`/consultation?solution=${tier.slug}`} onClick={() => track("cta_consultation")}>{t("consult")}</Link>
    </article>
  );
}


function PlanCard({ plan }: { plan: (typeof plans)[number] }) {
  const { lang } = useLanguage();
  const fr = lang === "fr";
  return (
    <article className={`plan-card${plan.highlight ? " plan-card-featured" : ""}`} id={plan.slug}>
      {plan.highlight && <p className="plan-badge">{fr ? "Le plus choisi pour grandir" : "Best for growing"}</p>}
      <h3>{plan.name}</h3>
      <p className="plan-tagline">{tx(plan.tagline, lang)}</p>
      <p className="entry-price"><strong>{fmtMoney(plan.monthly, lang)}</strong><span>{fr ? " / mois" : " / month"}</span></p>
      <p className="entry-upgrade">{fr ? "Ou " : "Or "}<strong>{fmtMoney(plan.yearly, lang)}</strong>{fr ? " / mois avec un engagement de 12 mois (−5 %)" : " / month with a 12-month commitment (−5%)"} · {plan.hours} {fr ? "heures de travail incluses par mois" : "working hours included per month"}</p>
      <p className="plan-audience">{tx(plan.audience, lang)}</p>
      <ul>{txList(plan.includes, lang).map((x) => <li key={x}><Check size={15} aria-hidden="true" />{x}</li>)}</ul>
      <p className="entry-upgrade"><strong>{fr ? "Non inclus : " : "Not included: "}</strong>{txList(plan.excludes, lang).join(", ")}</p>
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
      {offer.upgrade && <p className="entry-upgrade">{fr ? "Version complète : " : "Full version: "}{tx(offer.upgrade.label, lang)} — <strong>{fmtMoney(offer.upgrade.price, lang)}</strong>{unit(offer.upgrade.unit)}</p>}
      <Link className="button-primary" to={`/soumission?solution=${offer.slug}`} onClick={() => track("cta_quote")}>{fr ? "Demander cette offre" : "Request this offer"}</Link>
    </article>
  );
}

export function PricingPage() {
  const { lang } = useLanguage();
  const fr = lang === "fr";
  const { data = [] } = trpc.content.pricing.useQuery();
  const priceOf = (slug: string) => data.find((p) => p.slug === slug);
  return <>
    <PageMeta title={fr ? "Tarifs et offres" : "Pricing and offers"} description={fr ? "Quatre offres, de Lancer à Transformer, et quatre offres d’intelligence artificielle : services inclus, livrables et conditions." : "Four offers, from Launch to Transform, and four AI offers: included services, deliverables and terms."} />
    <PageHero eyebrow="AUREX / TARIFS" title={fr ? "Une expertise de haut niveau, des tarifs clairs." : "High-level expertise, clear pricing."} text={fr ? "Des solutions accessibles aux entrepreneurs et aux PME, sans imposer systématiquement les coûts d’un grand cabinet international. Les montants sont en dollars canadiens (CAD) et précisés au devis." : "Solutions within reach of entrepreneurs and SMEs, without systematically imposing the costs of a large international firm. Amounts are in Canadian dollars (CAD) and specified in the proposal."}>
      <ArrowLink to="/consultation">{fr ? "Obtenir une consultation" : "Request a consultation"}</ArrowLink>
    </PageHero>

    <section className="shell section pricing-intro" aria-labelledby="formats-title">
      <p className="eyebrow">{fr ? "Trois façons de travailler ensemble" : "Three ways to work together"}</p>
      <h2 id="formats-title" className="sr-only">{fr ? "Formats d’intervention" : "Engagement formats"}</h2>
      <div className="format-grid">{formats.map((f) => <div key={f.key}><h3>{tx(f.title, lang)}</h3><p>{tx(f.text, lang)}</p></div>)}</div>
    </section>

    <section className="shell section" aria-labelledby="plans-title">
      <p className="eyebrow">{fr ? "Forfaits permanents · accompagnement continu" : "Permanent plans · ongoing partnership"}</p>
      <h2 id="plans-title" className="pricing-h2">{fr ? "Un partenaire qui s’occupe de votre image, tous les mois." : "A partner who looks after your image, every month."}</h2>
      <p className="muted-note">{fr ? "Pour les entreprises qui préfèrent déléguer durablement : site, réseaux, visibilité, publicité, automatisation et suivi, avec un rapport mensuel et un bilan chaque trimestre. Prix en dollars canadiens, taxes en sus." : "For companies that prefer to delegate long-term: website, social media, visibility, advertising, automation and tracking, with a monthly report and a quarterly review. Prices in Canadian dollars, taxes extra."}</p>
      <div className="plan-grid">{plans.map((p) => <PlanCard key={p.slug} plan={p} />)}</div>
      <ul className="plan-terms">{txList(planTerms.terms, lang).map((x) => <li key={x}>{x}</li>)}</ul>
      <p className="muted-note">{fr ? "Vous préférez acheter un service à la fois ? Les offres d’entrée ci-dessous se commandent sans engagement." : "Prefer to buy one service at a time? The entry offers below are available with no commitment."}</p>
    </section>

    <section className="shell section" aria-labelledby="entry-title">
      <p className="eyebrow">{fr ? "Services à l’unité · offres d’entrée · prix publics" : "One-off services · entry offers · public pricing"}</p>
      <h2 id="entry-title" className="pricing-h2">{fr ? "Commencez simplement, à prix clair." : "Start simply, at a clear price."}</h2>
      <p className="muted-note">{fr ? "Prix en dollars canadiens, taxes en sus. Chaque offre d’entrée a une portée précise, indiquée ci-dessous ; la version complète est proposée pour aller plus loin. Les prix peuvent être ajustés : le tarif confirmé figure toujours dans votre soumission." : "Prices in Canadian dollars, taxes extra. Each entry offer has a defined scope, listed below; the full version is available to go further. Prices may be adjusted: the confirmed rate always appears in your quote."}</p>
      <div className="entry-grid">{entryOffers.filter((o) => o.group === "entry").map((o) => <EntryCard key={o.slug} offer={o} />)}</div>
      <h3 className="entry-sub">{fr ? "Projets" : "Projects"}</h3>
      <div className="entry-grid">{entryOffers.filter((o) => o.group === "project").map((o) => <EntryCard key={o.slug} offer={o} />)}</div>
    </section>

    <section className="shell section">
      <p className="eyebrow">{fr ? "Offres d’accompagnement" : "Engagement offers"}</p>
      <h2 className="pricing-h2">{fr ? "Lancer. Développer. Optimiser. Transformer." : "Launch. Grow. Optimize. Transform."}</h2>
      <div className="tier-grid">{tiers.map((tier) => <TierCard key={tier.slug} tier={tier} pricing={priceOf(tier.slug)} />)}</div>
    </section>

    <section className="shell section">
      <p className="eyebrow">{fr ? "Intelligence artificielle et automatisation" : "Artificial intelligence and automation"}</p>
      <h2 className="pricing-h2">{fr ? "Des offres IA évolutives." : "Scalable AI offers."}</h2>
      <div className="tier-grid">{aiTiers.map((tier) => <TierCard key={tier.slug} tier={tier} pricing={priceOf(tier.slug)} />)}</div>
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

    <Block eyebrow={fr ? "Offres IA" : "AI offers"} title={fr ? "AI Start, Business, Performance, Enterprise." : "AI Start, Business, Performance, Enterprise."}>
      <div className="tier-mini">{aiTiers.map((tier) => <Link key={tier.slug} to={`/tarifs#${tier.slug}`}><Glyph name={tier.slug} size={32} /><strong>{tier.name}</strong><span>{tx(tier.audience, lang)}</span></Link>)}</div>
    </Block>
    <CtaBand />
  </>;
}
