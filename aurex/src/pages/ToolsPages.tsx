import { useEffect, useMemo, useState, type ReactNode } from "react";
import { Link } from "../components/LocaleLink";
import { agents, automationCatalog, availabilityLabel, governance, innovationIdeas, integrations, tx, type Availability } from "../content";
import { adProfitability, automationGains, defaultAdInputs, defaultAutomationInputs, defaultSavingsInputs, operationalSavings, type AdInputs, type AutomationInputs, type SavingsInputs } from "../calculators";
import { useLanguage } from "../i18n";
import { ArrowLink, PageMeta } from "../components/Layout";
import { CtaBand, PageHero } from "../components/Sections";
import { track } from "../lib/track";
import { NumberField } from "./ProductPages";
import { fmtMoney, fmtNum } from "../lib/format";
import { AskAurex } from "../components/AssistantChat";

type Tab = "ads" | "automation" | "savings";

function Result({ label, value, note }: { label: string; value: string; note?: string }) {
  return <div><dt>{label}</dt><dd>{value}{note && <small> {note}</small>}</dd></div>;
}

function Section({ eyebrow, title, children, dark = false }: { eyebrow: string; title: string; children: ReactNode; dark?: boolean }) {
  return (
    <section className={dark ? "services-dark section" : "shell section"}>
      <div className={dark ? "shell" : undefined}>
        <p className="eyebrow">{eyebrow}</p>
        <h2 className={dark ? "dark-h2" : "pricing-h2"}>{title}</h2>
        {children}
      </div>
    </section>
  );
}

export function CalculatorsPage() {
  const { lang, t } = useLanguage();
  const fr = lang === "fr";
  const [tab, setTab] = useState<Tab>("ads");
  const [ad, setAd] = useState<AdInputs>(defaultAdInputs);
  const [auto, setAuto] = useState<AutomationInputs>(defaultAutomationInputs);
  const [sav, setSav] = useState<SavingsInputs>(defaultSavingsInputs);
  const a = useMemo(() => adProfitability(ad), [ad]);
  const g = useMemo(() => automationGains(auto), [auto]);
  const s = useMemo(() => operationalSavings(sav), [sav]);
  useEffect(() => { const timer = window.setTimeout(() => track("simulator_run"), 1500); return () => window.clearTimeout(timer); }, [ad, auto, sav, tab]);
  const money = (n: number) => fmtMoney(n, lang);
  const pct = (n: number | null) => (n === null ? "—" : `${fmtNum(n * 100, lang, 0)} %`);
  const months = (n: number | null) => (n === null ? "—" : `${fmtNum(n, lang, 1)} ${fr ? "mois" : "months"}`);
  const tabs: Array<[Tab, string]> = [["ads", fr ? "Rentabilité publicitaire" : "Advertising profitability"], ["automation", fr ? "Gains d’automatisation" : "Automation gains"], ["savings", fr ? "Économies opérationnelles" : "Operational savings"]];

  return <>
    <PageMeta title={fr ? "Calculateurs d’affaires" : "Business calculators"} description={fr ? "Trois calculateurs gratuits : rentabilité publicitaire, gains d’automatisation et économies opérationnelles, avec vos propres chiffres." : "Three free calculators: advertising profitability, automation gains and operational savings, using your own figures."} />
    <PageHero eyebrow="AUREX / CALCULATEURS" title={fr ? "Chiffrez avant de décider." : "Quantify before you decide."} text={fr ? "Trois calculateurs pour estimer la rentabilité d’une campagne, les heures libérées par l’automatisation et les économies d’un processus mieux organisé. Vos chiffres, vos hypothèses." : "Three calculators to estimate the profitability of a campaign, the hours freed by automation and the savings from a better-organized process. Your figures, your assumptions."}>
      <ArrowLink to="/simulateur">{t("simulator")}</ArrowLink>
    </PageHero>
    <section className="shell section sim" aria-labelledby="calc-title">
      <p className="sim-disclaimer" role="note"><strong>{fr ? "Estimation, non résultat." : "Estimate, not a result."}</strong> {fr ? "Les valeurs de départ sont illustratives. Remplacez-les par vos données : les résultats ne sont ni garantis ni promis." : "Starting values are illustrative. Replace them with your own data: results are neither guaranteed nor promised."}</p>
      <h2 id="calc-title" className="sr-only">{fr ? "Calculateurs" : "Calculators"}</h2>
      <div className="sim-tabs" role="tablist" aria-label={fr ? "Choisir un calculateur" : "Choose a calculator"}>
        {tabs.map(([key, label]) => <button key={key} type="button" role="tab" id={`tab-${key}`} aria-selected={tab === key} aria-controls={`panel-${key}`} onClick={() => setTab(key)}>{label}</button>)}
      </div>

      {tab === "ads" && <div className="sim-grid" role="tabpanel" id="panel-ads" aria-labelledby="tab-ads">
        <form className="sim-form" onSubmit={(e) => e.preventDefault()} aria-label={fr ? "Vos données publicitaires" : "Your advertising data"}>
          <h3>{fr ? "Vos données" : "Your data"}</h3>
          <div className="sim-fields">
            <NumberField id="ad-spend" label={fr ? "Budget publicitaire mensuel" : "Monthly ad budget"} suffix="$ CAD" step={100} value={ad.spend} onChange={(n) => setAd({ ...ad, spend: n })} />
            <NumberField id="ad-cpc" label={fr ? "Coût par clic moyen" : "Average cost per click"} suffix="$ CAD" step={0.1} value={ad.cpc} onChange={(n) => setAd({ ...ad, cpc: n })} />
            <NumberField id="ad-conv" label={fr ? "Taux de conversion du site" : "Site conversion rate"} suffix="%" step={0.5} value={ad.conversionRate} onChange={(n) => setAd({ ...ad, conversionRate: n })} />
            <NumberField id="ad-order" label={fr ? "Valeur moyenne d’une commande" : "Average order value"} suffix="$ CAD" step={10} value={ad.averageOrder} onChange={(n) => setAd({ ...ad, averageOrder: n })} />
            <NumberField id="ad-margin" label={fr ? "Marge brute" : "Gross margin"} suffix="%" step={1} value={ad.marginRate} onChange={(n) => setAd({ ...ad, marginRate: n })} help={fr ? "Part du prix de vente qui reste après le coût du produit ou du service." : "Share of the sale price left after the cost of the product or service."} />
            <NumberField id="ad-fee" label={fr ? "Frais de gestion (% du budget)" : "Management fee (% of budget)"} suffix="%" step={1} value={ad.feeRate} onChange={(n) => setAd({ ...ad, feeRate: n })} />
            <NumberField id="ad-fixed" label={fr ? "Frais fixes mensuels de gestion" : "Fixed monthly management fee"} suffix="$ CAD" step={50} value={ad.fixedFee} onChange={(n) => setAd({ ...ad, fixedFee: n })} />
          </div>
          <button type="button" className="text-button" onClick={() => setAd(defaultAdInputs)}>{fr ? "Rétablir les valeurs de départ" : "Restore starting values"}</button>
        </form>
        <div className="sim-results" aria-live="polite">
          <h3>{fr ? "Résultats estimés" : "Estimated results"}</h3><p className="sim-badge">{fr ? "SIMULATION" : "SIMULATION"}</p>
          <dl className="sim-kpis">
            <Result label={fr ? "Clics estimés" : "Estimated clicks"} value={fmtNum(a.clicks, lang)} />
            <Result label={fr ? "Commandes estimées" : "Estimated orders"} value={fmtNum(a.orders, lang, 1)} />
            <Result label={fr ? "Revenus attribuables" : "Attributable revenue"} value={money(a.revenue)} note={fr ? "/ mois" : "/ month"} />
            <Result label={fr ? "Marge brute générée" : "Gross profit generated"} value={money(a.grossProfit)} />
            <Result label={fr ? "Coût total (publicité + gestion)" : "Total cost (ads + management)"} value={money(a.totalCost)} />
            <Result label={fr ? "Profit net estimé" : "Estimated net profit"} value={money(a.netProfit)} note={fr ? "/ mois" : "/ month"} />
            <Result label={fr ? "ROAS (revenus ÷ budget)" : "ROAS (revenue ÷ budget)"} value={a.roas === null ? "—" : `${fmtNum(a.roas, lang, 2)} ×`} />
            <Result label={fr ? "Coût d’acquisition par commande" : "Acquisition cost per order"} value={a.cpa === null ? "—" : money(a.cpa)} />
            <Result label={fr ? "ROAS minimal pour atteindre l’équilibre" : "Break-even ROAS"} value={a.breakEvenRoas === null ? "—" : `${fmtNum(a.breakEvenRoas, lang, 2)} ×`} />
          </dl>
          <p className="sim-note">{fr ? "Formule : clics = budget ÷ coût par clic ; commandes = clics × taux de conversion ; profit net = marge brute − budget − frais de gestion. Ne tient pas compte des ventes répétées ni de la saisonnalité." : "Formula: clicks = budget ÷ cost per click; orders = clicks × conversion rate; net profit = gross profit − budget − management fees. Ignores repeat sales and seasonality."}</p>
        </div>
      </div>}

      {tab === "automation" && <div className="sim-grid" role="tabpanel" id="panel-automation" aria-labelledby="tab-automation">
        <form className="sim-form" onSubmit={(e) => e.preventDefault()} aria-label={fr ? "Vos données d’automatisation" : "Your automation data"}>
          <h3>{fr ? "Vos données" : "Your data"}</h3>
          <div className="sim-fields">
            <NumberField id="au-people" label={fr ? "Personnes concernées" : "People involved"} step={1} value={auto.people} onChange={(n) => setAuto({ ...auto, people: n })} />
            <NumberField id="au-hours" label={fr ? "Heures par semaine en tâches répétitives, par personne" : "Weekly hours on repetitive tasks, per person"} suffix="h" step={0.5} value={auto.hoursPerWeek} onChange={(n) => setAuto({ ...auto, hoursPerWeek: n })} />
            <NumberField id="au-cost" label={fr ? "Coût horaire du temps de travail" : "Hourly cost of working time"} suffix="$ CAD/h" step={1} value={auto.hourlyCost} onChange={(n) => setAuto({ ...auto, hourlyCost: n })} />
            <NumberField id="au-share" label={fr ? "Part automatisable" : "Share that can be automated"} suffix="%" step={5} value={auto.automatedShare} onChange={(n) => setAuto({ ...auto, automatedShare: n })} />
            <NumberField id="au-tool" label={fr ? "Coût mensuel des outils et licences" : "Monthly cost of tools and licences"} suffix="$ CAD" step={10} value={auto.monthlyToolCost} onChange={(n) => setAuto({ ...auto, monthlyToolCost: n })} />
            <NumberField id="au-setup" label={fr ? "Coût de mise en place" : "Setup cost"} suffix="$ CAD" step={500} value={auto.setupCost} onChange={(n) => setAuto({ ...auto, setupCost: n })} />
            <NumberField id="au-horizon" label={fr ? "Horizon de calcul" : "Calculation horizon"} suffix={fr ? "mois" : "months"} step={1} value={auto.horizonMonths} onChange={(n) => setAuto({ ...auto, horizonMonths: n })} />
          </div>
          <button type="button" className="text-button" onClick={() => setAuto(defaultAutomationInputs)}>{fr ? "Rétablir les valeurs de départ" : "Restore starting values"}</button>
        </form>
        <div className="sim-results" aria-live="polite">
          <h3>{fr ? "Résultats estimés" : "Estimated results"}</h3><p className="sim-badge">SIMULATION</p>
          <dl className="sim-kpis">
            <Result label={fr ? "Heures répétitives par mois" : "Repetitive hours per month"} value={`${fmtNum(g.monthlyHours, lang, 0)} h`} />
            <Result label={fr ? "Heures potentiellement libérées" : "Hours potentially freed"} value={`${fmtNum(g.hoursSaved, lang, 0)} h`} note={fr ? "/ mois" : "/ month"} />
            <Result label={fr ? "Valeur du temps libéré" : "Value of freed time"} value={money(g.grossSavings)} note={fr ? "/ mois" : "/ month"} />
            <Result label={fr ? "Gain net après outils" : "Net gain after tools"} value={money(g.netMonthly)} note={fr ? "/ mois" : "/ month"} />
            <Result label={fr ? `Gain net sur ${g.horizon} mois, après mise en place` : `Net gain over ${g.horizon} months, after setup`} value={money(g.netTotal)} />
            <Result label={fr ? "Délai de récupération" : "Payback period"} value={months(g.paybackMonths)} />
            <Result label={fr ? "Retour sur investissement" : "Return on investment"} value={pct(g.roi)} />
          </dl>
          <p className="sim-note">{fr ? "Le temps libéré est une économie de capacité : il devient un gain financier seulement s’il est réaffecté à des tâches productives ou s’il réduit des coûts réels." : "Freed time is a capacity saving: it becomes a financial gain only if redeployed to productive work or if it cuts real costs."}</p>
        </div>
      </div>}

      {tab === "savings" && <div className="sim-grid" role="tabpanel" id="panel-savings" aria-labelledby="tab-savings">
        <form className="sim-form" onSubmit={(e) => e.preventDefault()} aria-label={fr ? "Vos données opérationnelles" : "Your operational data"}>
          <h3>{fr ? "Vos données" : "Your data"}</h3>
          <div className="sim-fields">
            <NumberField id="sv-volume" label={fr ? "Volume mensuel du processus (commandes, dossiers…)" : "Monthly process volume (orders, files…)"} step={10} value={sav.monthlyVolume} onChange={(n) => setSav({ ...sav, monthlyVolume: n })} />
            <NumberField id="sv-unit" label={fr ? "Coût actuel par unité" : "Current cost per unit"} suffix="$ CAD" step={1} value={sav.costPerUnit} onChange={(n) => setSav({ ...sav, costPerUnit: n })} />
            <NumberField id="sv-red" label={fr ? "Réduction visée du coût par unité" : "Targeted reduction in unit cost"} suffix="%" step={1} value={sav.costReduction} onChange={(n) => setSav({ ...sav, costReduction: n })} />
            <NumberField id="sv-err" label={fr ? "Taux actuel d’erreurs ou de reprises" : "Current error or rework rate"} suffix="%" step={0.5} value={sav.errorRate} onChange={(n) => setSav({ ...sav, errorRate: n })} />
            <NumberField id="sv-errcost" label={fr ? "Coût moyen d’une erreur" : "Average cost of an error"} suffix="$ CAD" step={5} value={sav.errorCost} onChange={(n) => setSav({ ...sav, errorCost: n })} />
            <NumberField id="sv-errred" label={fr ? "Réduction visée des erreurs" : "Targeted reduction in errors"} suffix="%" step={5} value={sav.errorReduction} onChange={(n) => setSav({ ...sav, errorReduction: n })} />
            <NumberField id="sv-invest" label={fr ? "Investissement envisagé" : "Planned investment"} suffix="$ CAD" step={500} value={sav.investment} onChange={(n) => setSav({ ...sav, investment: n })} />
            <NumberField id="sv-horizon" label={fr ? "Horizon de calcul" : "Calculation horizon"} suffix={fr ? "mois" : "months"} step={1} value={sav.horizonMonths} onChange={(n) => setSav({ ...sav, horizonMonths: n })} />
          </div>
          <button type="button" className="text-button" onClick={() => setSav(defaultSavingsInputs)}>{fr ? "Rétablir les valeurs de départ" : "Restore starting values"}</button>
        </form>
        <div className="sim-results" aria-live="polite">
          <h3>{fr ? "Résultats estimés" : "Estimated results"}</h3><p className="sim-badge">SIMULATION</p>
          <dl className="sim-kpis">
            <Result label={fr ? "Économies sur le coût du processus" : "Process cost savings"} value={money(s.processSavings)} note={fr ? "/ mois" : "/ month"} />
            <Result label={fr ? "Erreurs évitées par mois" : "Errors avoided per month"} value={fmtNum(s.errorsAvoided, lang, 1)} />
            <Result label={fr ? "Économies liées aux erreurs" : "Error-related savings"} value={money(s.errorSavings)} note={fr ? "/ mois" : "/ month"} />
            <Result label={fr ? "Économies mensuelles totales" : "Total monthly savings"} value={money(s.monthlySavings)} />
            <Result label={fr ? "Économies annuelles" : "Annual savings"} value={money(s.annualSavings)} />
            <Result label={fr ? `Gain net sur ${s.horizon} mois` : `Net gain over ${s.horizon} months`} value={money(s.netTotal)} />
            <Result label={fr ? "Délai de récupération" : "Payback period"} value={months(s.paybackMonths)} />
            <Result label={fr ? "Retour sur investissement" : "Return on investment"} value={pct(s.roi)} />
          </dl>
          <p className="sim-note">{fr ? "Les économies s’ajoutent à des coûts qui doivent réellement diminuer pour se concrétiser. Les revenus, les économies et l’investissement sont présentés séparément." : "Savings only materialize if costs genuinely fall. Revenue, savings and investment are shown separately."}</p>
        </div>
      </div>}
    </section>
    <section className="shell section solutions-next">
      <p className="eyebrow">{fr ? "Et ensuite" : "Next"}</p>
      <h2>{fr ? "Valider ces estimations avec vos données réelles." : "Validate these estimates with your real data."}</h2>
      <div className="engagement-actions"><ArrowLink to="/diagnostic">{t("diagnostic")}</ArrowLink><ArrowLink to="/consultation">{t("consult")}</ArrowLink></div>
    </section>
    <CtaBand />
  </>;
}

function StatusChip({ status }: { status: Availability }) {
  const { lang } = useLanguage();
  return <span className={`status-chip status-${status}`}>{tx(availabilityLabel[status], lang)}</span>;
}

export function AutomationPage() {
  const { lang, t } = useLanguage();
  const fr = lang === "fr";
  return <>
    <PageMeta title={fr ? "Automatisation des processus" : "Process automation"} description={fr ? "Automatisation commerciale, administrative, marketing, documentaire et opérationnelle, avec agents IA supervisés et intégration de vos logiciels." : "Sales, administrative, marketing, document and operational automation, with supervised AI agents and integration of your software."} />
    <PageHero eyebrow="AUREX AUTOMATION" title={fr ? "Moins de tâches répétitives. Plus de temps pour ce qui compte." : "Fewer repetitive tasks. More time for what matters."} text={fr ? "Nous cartographions vos processus, automatisons ce qui s’y prête et gardons une personne dans la boucle partout où le jugement compte." : "We map your processes, automate what suits it and keep a person in the loop wherever judgment matters."}>
      <AskAurex placeholder={fr ? "Quelles tâches pourrait-on automatiser chez nous ?" : "Which tasks could we automate?"} label={fr ? "Poser une question au conseiller IA" : "Ask the AI advisor"} />
      <ArrowLink to="/calculateurs">{fr ? "Calculer les gains" : "Calculate the gains"}</ArrowLink>
    </PageHero>
    <Section eyebrow={fr ? "Catalogue" : "Catalogue"} title={fr ? "Douze familles d’automatisation." : "Twelve families of automation."}>
      <div className="auto-grid">{automationCatalog.map((item) => <article key={item.key}><StatusChip status={item.status} /><h3>{tx(item.title, lang)}</h3><p>{tx(item.text, lang)}</p></article>)}</div>
      <p className="muted-note">{fr ? "Le statut indique la maturité de chaque offre : disponible, en développement ou ambition. Chaque projet est cadré lors d’un diagnostic." : "The status shows the maturity of each offer: available, in development or ambition. Each project is scoped during a diagnostic."}</p>
    </Section>
    <Section dark eyebrow={fr ? "Agents IA" : "AI agents"} title={fr ? "Des agents supervisés, jamais en roue libre." : "Supervised agents, never running unchecked."}>
      <div className="agent-grid">{agents.slice(0, 6).map((a) => <div key={a.key}><h3>{tx(a.title, lang)}</h3><p>{tx(a.text, lang)}</p></div>)}</div>
      <ArrowLink to="/intelligence-artificielle">{fr ? "Voir les dix agents" : "See all ten agents"}</ArrowLink>
    </Section>
    <Section eyebrow={fr ? "Intégrations" : "Integrations"} title={fr ? "Branchée à vos outils." : "Connected to your tools."}>
      <ul className="chip-list">{integrations.map((i) => <li key={i}>{i}</li>)}</ul>
      <p className="muted-note">{fr ? "Ces technologies sont des possibilités d’intégration : aucune ne suppose un partenariat officiel." : "These technologies are integration possibilities: none implies an official partnership."}</p>
    </Section>
    <Section eyebrow={fr ? "Gouvernance" : "Governance"} title={fr ? "Une automatisation encadrée." : "Governed automation."}>
      <div className="agent-grid">{governance.map((x) => <div key={x.title.fr}><h3>{tx(x.title, lang)}</h3><p>{tx(x.text, lang)}</p></div>)}</div>
      <div className="engagement-actions"><ArrowLink to="/diagnostic">{t("diagnostic")}</ArrowLink><Link to="/innovations">{fr ? "Voir nos innovations" : "See our innovations"}</Link></div>
    </Section>
    <CtaBand />
  </>;
}

export function InnovationsPage() {
  const { lang, t } = useLanguage();
  const fr = lang === "fr";
  const groups: Availability[] = ["available", "developing", "ambition"];
  return <>
    <PageMeta title={fr ? "Innovations" : "Innovations"} description={fr ? "Les services et outils que nous développons : ce qui est disponible, ce qui est en développement et ce qui reste une ambition." : "The services and tools we are building: what is available, what is in development and what remains an ambition."} />
    <PageHero eyebrow="AUREX / INNOVATIONS" title={fr ? "Ce qui est offert. Ce qui vient. Ce que nous visons." : "What is offered. What is coming. What we aim for."} text={fr ? "Nous distinguons clairement les services disponibles de ceux en développement et de nos ambitions : aucune promesse n’est faite sur ce qui n’existe pas encore." : "We clearly separate available services from those in development and from our ambitions: no promise is made about what does not exist yet."}>
      <ArrowLink to="/automatisation">{fr ? "Automatisation" : "Automation"}</ArrowLink>
    </PageHero>
    {groups.map((status) => {
      const items = innovationIdeas.filter((i) => i.status === status);
      return <Section key={status} eyebrow={tx(availabilityLabel[status], lang)} title={status === "available" ? (fr ? "Disponible avec notre équipe." : "Available with our team.") : status === "developing" ? (fr ? "En cours de construction." : "Under construction.") : (fr ? "Notre direction." : "Our direction.")}>
        <div className="auto-grid">{items.map((item) => <article key={item.key}><StatusChip status={item.status} /><h3>{tx(item.title, lang)}</h3><p>{tx(item.text, lang)}</p></article>)}</div>
      </Section>;
    })}
    <section className="shell section solutions-next"><div className="engagement-actions"><ArrowLink to="/consultation">{t("consult")}</ArrowLink><ArrowLink to="/calculateurs">{fr ? "Calculateurs" : "Calculators"}</ArrowLink></div></section>
    <CtaBand />
  </>;
}
