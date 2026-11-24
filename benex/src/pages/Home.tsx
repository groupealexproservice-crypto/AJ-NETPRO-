import { useState, type CSSProperties } from "react";
import { Link } from "../components/LocaleLink";
import { ArrowRight, Plus } from "lucide-react";
import { expertises, insights, methodSteps, principles, sectors, tx } from "../content";
import { useLanguage } from "../i18n";
import { GrowthMorph } from "../components/GrowthMorph";
import { ArrowLink, PageMeta, Rollover } from "../components/Layout";
import { CtaBand, SectionHeading } from "../components/Sections";
import { OrientationAssistant } from "../components/OrientationAssistant";
import { Sculpture3D } from "../components/Sculpture3D";
import { Glyph } from "../components/Glyphs";
import { useSolutions } from "../hooks/useSolutions";

function AnimatedLine({ text, delay }: { text: string; delay: number }) {
  return (
    <span className="hero-line" aria-hidden="true">
      {Array.from(text).map((character, index) => (
        <span key={`${character}-${index}`} className="hero-character" style={{ "--char-delay": `${delay + index * 0.035}s` } as CSSProperties}>
          {character === " " ? "\u00a0" : character}
        </span>
      ))}
    </span>
  );
}

export default function Home() {
  const { lang, t } = useLanguage();
  const [activeSolution, setActiveSolution] = useState(0);
  const displaySolutions = useSolutions();
  const solution = displaySolutions[activeSolution];

  return (
    <>
      <PageMeta
        title={lang === "fr" ? "Stratégie, innovation et croissance" : "Strategy, innovation and growth"}
        description={lang === "fr" ? "BENEX Solutions accompagne les entreprises dans leur transformation stratégique, numérique, commerciale et opérationnelle au Québec et au Canada." : "BENEX Solutions supports strategic, digital, commercial and operational transformation for businesses in Quebec and Canada."}
      />
      <section className="home-hero">
        <div className="hero-photo" role="img" aria-label={lang === "fr" ? "Façade architecturale contemporaine" : "Contemporary architectural facade"} />
        <div className="hero-shade" />
        <div className="shell hero-content">
          <p className="hero-kicker">Strategy. Innovation. Growth.</p>
          <h1 aria-label={lang === "fr" ? "Construire. Transformer. Accélérer." : "Build. Transform. Accelerate."}>
            {lang === "fr" ? <><AnimatedLine text="Construire." delay={0.1} /><AnimatedLine text="Transformer." delay={0.45} /><AnimatedLine text="Accélérer." delay={0.85} /></> : <><AnimatedLine text="Build." delay={0.1} /><AnimatedLine text="Transform." delay={0.4} /><AnimatedLine text="Accelerate." delay={0.75} /></>}
          </h1>
          <div className="hero-intro">
            <p>{lang === "fr" ? "BENEX Solutions accompagne les entreprises dans leur transformation stratégique, numérique, commerciale et opérationnelle pour construire une croissance durable et mesurable." : "BENEX Solutions supports businesses through strategic, digital, commercial and operational transformation to build sustainable, measurable growth."}</p>
            <div className="hero-actions">
              <Link to="/expertises" className="button-light"><Rollover>{t("discover")}</Rollover><ArrowRight size={18} /></Link>
              <Link to="/consultation" className="button-ghost"><Rollover>{t("consult")}</Rollover><ArrowRight size={18} /></Link>
            </div>
          </div>
        </div>
        <div className="hero-morph"><GrowthMorph /></div>
        <div className="hero-coordinate" aria-hidden="true">QUÉBEC / CANADA<br />45.5019° N · 73.5674° W</div>
      </section>

      <div className="discipline-strip">
        <div className="shell">
          {(lang === "fr" ? ["Stratégie", "Numérique", "Commercial", "Opérations"] : ["Strategy", "Digital", "Commercial", "Operations"]).map((item, index) => <span key={item}><i>0{index + 1}</i>{item}</span>)}
        </div>
      </div>

      <section className="home-intro section shell">
        <p className="eyebrow">{lang === "fr" ? "Un partenaire. Une vision intégrée." : "One partner. An integrated view."}</p>
        <div className="home-intro-grid">
          <h2>{lang === "fr" ? "La croissance ne se fragmente pas. Votre partenaire non plus." : "Growth is not fragmented. Your partner shouldn’t be either."}</h2>
          <div>
            <p>{lang === "fr" ? "BENEX Solutions est un cabinet de conseil multidisciplinaire qui coordonne la stratégie, le marketing, la technologie et les opérations. Nous intervenons de la conception d’une entreprise jusqu’à son expansion, avec un interlocuteur unique et des priorités communes." : "BENEX Solutions is a multidisciplinary consulting firm coordinating strategy, marketing, technology and operations. We support businesses from inception through expansion, with a single point of contact and shared priorities."}</p>
            <ArrowLink to="/a-propos">{t("about")}</ArrowLink>
          </div>
        </div>
        <div className="principles-row">
          {principles.map((principle, index) => <div key={principle.fr}><span>0{index + 1}</span><p>{tx(principle, lang)}</p></div>)}
        </div>
      </section>

      <section className="signature-section section" aria-labelledby="signature-title">
        <div className="shell signature-grid">
          <div className="signature-copy">
            <p className="eyebrow">Strategy. Innovation. Growth.</p>
            <h2 id="signature-title">{lang === "fr" ? "Trois repères qui montent ensemble." : "Three markers that rise together."}</h2>
            <p>{lang === "fr" ? "La sculpture BENEX résume notre façon de travailler : la stratégie fixe la direction, l’innovation rend l’action possible, la croissance se mesure et s’ajuste. Chaque barre s’appuie sur la précédente." : "The BENEX sculpture sums up how we work: strategy sets the direction, innovation makes action possible, growth is measured and adjusted. Each bar builds on the one before."}</p>
            <dl className="signature-legend">
              <div><dt>Strategy</dt><dd>{lang === "fr" ? "Choisir où concentrer les efforts, et pourquoi." : "Choose where to focus effort, and why."}</dd></div>
              <div><dt>Innovation</dt><dd>{lang === "fr" ? "Concevoir les outils et les processus qui rendent la stratégie praticable." : "Design the tools and processes that make the strategy workable."}</dd></div>
              <div><dt>Growth</dt><dd>{lang === "fr" ? "Mesurer les résultats convenus et optimiser en continu." : "Measure the agreed outcomes and keep optimizing."}</dd></div>
            </dl>
            <ArrowLink to="/methode">{t("method")}</ArrowLink>
          </div>
          <Sculpture3D
            alt={lang === "fr" ? "Sculpture BENEX : trois barres verticales croissantes, graphite et bleu cobalt, sur un socle circulaire" : "BENEX sculpture: three rising vertical bars in graphite and cobalt blue on a circular base"}
            hint={lang === "fr" ? "Faites glisser pour faire pivoter la sculpture." : "Drag to rotate the sculpture."}
          />
        </div>
      </section>

      <section className="expertise-section section shell">
        <SectionHeading
          eyebrow={t("allExpertises")}
          title={lang === "fr" ? "Huit disciplines. Une seule trajectoire." : "Eight disciplines. One trajectory."}
          text={lang === "fr" ? "Mobilisez une expertise précise ou combinez plusieurs pôles autour d’un objectif commun." : "Engage a specific expertise or combine several disciplines around a shared objective."}
          action={<ArrowLink to="/expertises">{t("viewAll")}</ArrowLink>}
        />
        <div className="expertise-grid">
          {expertises.map((expertise, index) => (
            <Link to={`/expertises/${expertise.slug}`} key={expertise.slug} className={`expertise-item expertise-item-${index % 4}`}>
              <span className="expertise-number"><Glyph name={expertise.slug} size={46} /><i>{expertise.number}</i></span>
              <div><h3>{tx(expertise.title, lang)}</h3><p>{tx(expertise.short, lang)}</p></div>
              <ArrowRight size={24} strokeWidth={1.2} />
            </Link>
          ))}
        </div>
      </section>

      <section className="solution-showcase section">
        <div className="shell">
          <SectionHeading eyebrow={t("allSolutions")} title={lang === "fr" ? "Des solutions conçues autour de vos besoins réels." : "Solutions designed around your real needs."} />
          <div className="solution-switcher">
            <div className="solution-visual" key={solution.slug}>
              <div className="solution-visual-image" />
              <div className="solution-visual-content">
                <p>{tx(solution.category, lang)}</p>
                <h3>{solution.name}</h3>
                <span>{tx(solution.summary, lang)}</span>
              </div>
              <Link to={`/solutions/${solution.slug}`} aria-label={`${t("learnMore")} — ${solution.name}`}><ArrowRight size={28} strokeWidth={1.2} /></Link>
            </div>
            <div className="solution-accordion">
              {displaySolutions.map((item, index) => (
                <button key={item.slug} type="button" className={activeSolution === index ? "active" : ""} onClick={() => setActiveSolution(index)} aria-expanded={activeSolution === index}>
                  <span><Glyph name={item.slug} size={26} /></span>
                  <strong>{item.name}</strong>
                  <Plus size={19} strokeWidth={1.4} />
                  {activeSolution === index && <p>{tx(item.objective, lang)}</p>}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="engagement-section section" aria-labelledby="engagement-title">
        <div className="shell">
          <SectionHeading
            eyebrow={lang === "fr" ? "Modes d’intervention" : "Ways of working"}
            title={lang === "fr" ? "Un cadre clair, quel que soit le rythme de votre projet." : "A clear framework, whatever the pace of your project."}
            text={lang === "fr" ? "Chaque mandat et chaque accompagnement sont établis sur devis, après un diagnostic partagé." : "Every mandate and every retainer is quoted after a shared diagnostic."}
          />
          <h2 id="engagement-title" className="sr-only">{lang === "fr" ? "Modes d’intervention" : "Ways of working"}</h2>
          <div className="engagement-grid">
            {[
              { glyph: "launch", title: { fr: "Mandat ponctuel", en: "One-off mandate" }, lead: { fr: "Un objectif, un périmètre, des livrables définis.", en: "One objective, a defined scope, agreed deliverables." }, points: { fr: ["Lancement, refonte, étude ou déploiement", "Calendrier et responsabilités documentés", "Livraison suivie d’une revue des résultats convenus"], en: ["Launch, redesign, study or rollout", "Documented timeline and responsibilities", "Delivery followed by a review of agreed outcomes"] } },
              { glyph: "performance", title: { fr: "Accompagnement mensuel", en: "Monthly support" }, lead: { fr: "Une équipe pluridisciplinaire à vos côtés, mois après mois.", en: "A multidisciplinary team beside you, month after month." }, points: { fr: ["Pilotage des priorités et des projets en cours", "Optimisation continue et rapports réguliers", "Expertises mobilisées selon l’évolution des besoins"], en: ["Steering of priorities and ongoing projects", "Continuous optimization and regular reporting", "Expertise engaged as needs evolve"] } },
              { glyph: "360", title: { fr: "BENEX 360", en: "BENEX 360" }, lead: { fr: "Une direction externalisée, de la stratégie aux opérations.", en: "Outsourced leadership, from strategy to operations." }, points: { fr: ["Direction stratégique, commerciale, numérique et opérationnelle", "Comité de pilotage et indicateurs communs", "Interlocuteur unique pour l’ensemble des chantiers"], en: ["Strategic, commercial, digital and operational leadership", "Steering committee and shared indicators", "A single point of contact across all workstreams"] } },
            ].map((mode) => (
              <article key={mode.title.en} className="engagement-card">
                <Glyph name={mode.glyph} size={52} />
                <h3>{tx(mode.title, lang)}</h3>
                <p>{tx(mode.lead, lang)}</p>
                <ul>{mode.points[lang].map((point) => <li key={point}>{point}</li>)}</ul>
                <span className="quote-label">{lang === "fr" ? "Sur devis" : "By proposal"}</span>
              </article>
            ))}
          </div>
          <div className="engagement-actions">
            <ArrowLink to="/soumission">{t("quote")}</ArrowLink>
            <ArrowLink to="/consultation">{t("consult")}</ArrowLink>
          </div>
        </div>
      </section>

      <section className="method-preview section shell">
        <SectionHeading
          eyebrow={t("method")}
          title={lang === "fr" ? "Du diagnostic à l’optimisation, sans angle mort." : "From diagnosis to optimization, without blind spots."}
          action={<ArrowLink to="/methode">{t("learnMore")}</ArrowLink>}
        />
        <div className="method-grid">
          {methodSteps.map((step) => <div key={step.number}><span>{step.number}</span><h3>{tx(step.title, lang)}</h3><p>{tx(step.text, lang)}</p></div>)}
        </div>
      </section>

      <section className="sector-preview section">
        <div className="shell sector-preview-grid">
          <div>
            <p className="eyebrow">{t("allSectors")}</p>
            <h2>{lang === "fr" ? "Une approche adaptée à votre réalité sectorielle." : "An approach adapted to your industry reality."}</h2>
            <ArrowLink to="/secteurs" light>{t("viewAll")}</ArrowLink>
          </div>
          <div className="sector-links">
            {sectors.slice(0, 6).map((sector) => <Link key={sector.slug} to={`/secteurs/${sector.slug}`}>{tx(sector.name, lang)}<ArrowRight size={18} /></Link>)}
          </div>
        </div>
      </section>

      <OrientationAssistant />

      <section className="insights-preview section shell">
        <SectionHeading eyebrow={t("allInsights")} title={lang === "fr" ? "Comprendre avant d’agir." : "Understand before acting."} action={<ArrowLink to="/perspectives">{t("viewAll")}</ArrowLink>} />
        <div className="insight-list">
          {insights.map((insight, index) => (
            <Link to={`/perspectives/${insight.slug}`} key={insight.slug} className="insight-row">
              <span>0{index + 1}</span>
              <div><p>{tx(insight.category, lang)} · {tx(insight.readingTime, lang)}</p><h3>{tx(insight.title, lang)}</h3></div>
              <ArrowRight size={23} strokeWidth={1.2} />
            </Link>
          ))}
        </div>
      </section>
      <CtaBand />
    </>
  );
}
