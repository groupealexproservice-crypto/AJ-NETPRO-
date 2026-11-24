import { Fragment, type CSSProperties } from "react";
import { Link } from "../components/LocaleLink";
import { ArrowRight } from "lucide-react";
import { aiPole, automations, expertises, insights, kpis, methodSteps, outcomes, poles, sectors, tiers, tx } from "../content";
import { useLanguage } from "../i18n";
import { ArrowLink, PageMeta, Rollover } from "../components/Layout";
import { CtaBand, SectionHeading } from "../components/Sections";
import { OrientationAssistant } from "../components/OrientationAssistant";
import { Sculpture3D } from "../components/Sculpture3D";
import { Glyph } from "../components/Glyphs";
import { VisionBand, WhyAurex } from "../components/Vision";
import { DashboardPreview } from "../components/DashboardPreview";
import { TrustSection } from "../components/TrustSection";
import { track } from "../lib/track";
import { NeuralField } from "../components/NeuralField";
import { AskAurex } from "../components/AssistantChat";

function AnimatedLine({ text, delay }: { text: string; delay: number }) {
  let position = 0;
  return (
    <span className="hero-line" aria-hidden="true">
      {text.split(" ").map((word, wordIndex) => (
        <Fragment key={`${word}-${wordIndex}`}>
          {wordIndex > 0 && " "}
          <span className="hero-word">
          {Array.from(word).map((character, index) => (
            <span key={`${character}-${index}`} className="hero-character" style={{ "--char-delay": `${delay + position++ * 0.03}s` } as CSSProperties}>{character}</span>
          ))}
          </span>
        </Fragment>
      ))}
    </span>
  );
}

export default function Home() {
  const { lang, t } = useLanguage();
  const fr = lang === "fr";
  const lines = fr ? ["Des stratégies intelligentes.", "Des résultats mesurables.", "Une croissance durable."] : ["Smart strategies.", "Measurable results.", "Sustainable growth."];
  const kpiKeys = ["roi", "roas", "cac", "conversion", "revenue", "margin", "opcost", "productivity", "timeSaved", "retention"] as const;

  return (
    <>
      <PageMeta
        title={fr ? "Stratégie, technologie, performance et croissance" : "Strategy, technology, performance and growth"}
        description={fr ? "Des stratégies intelligentes, des résultats mesurables, une croissance durable : AUREX Solutions accompagne les entreprises en marketing, stratégie, technologie, intelligence artificielle et opérations." : "Smart strategies, measurable results, sustainable growth: AUREX Solutions supports businesses in marketing, strategy, technology, artificial intelligence and operations."}
      />

      {/* 1. Hero */}
      <section className="home-hero">
        <div className="hero-photo" role="img" aria-label={fr ? "Façade architecturale contemporaine" : "Contemporary architectural facade"} />
        <div className="hero-shade" />
        <NeuralField className="hero-neural" />
        <div className="shell hero-content">
          <p className="hero-kicker">{(fr ? ["Stratégie", "Technologie", "Intelligence artificielle", "Performance", "Croissance"] : ["Strategy", "Technology", "Artificial intelligence", "Performance", "Growth"]).map((word, index) => <span key={word}>{index > 0 && <i aria-hidden="true">|</i>}{word}</span>)}</p>
          <h1 className="hero-title-long" aria-label={lines.join(" ")}>
            <AnimatedLine text={lines[0]} delay={0.1} /><AnimatedLine text={lines[1]} delay={0.55} /><AnimatedLine text={lines[2]} delay={1.0} />
          </h1>
          <div className="hero-intro">
            <p>{fr ? "AUREX Solutions accompagne les entreprises dans leur développement commercial, leur transformation numérique et l’optimisation de leurs opérations grâce à des solutions stratégiques, technologiques et marketing adaptées à leurs ambitions." : "AUREX Solutions supports businesses in their commercial development, digital transformation and operational optimization through strategic, technological and marketing solutions tailored to their ambitions."}</p>
            <div className="hero-actions">
              <Link to="/expertises" className="button-light"><Rollover>{t("discover")}</Rollover><ArrowRight size={18} /></Link>
              <Link to="/consultation" className="button-ghost" onClick={() => track("cta_consultation")}><Rollover>{t("consult")}</Rollover><ArrowRight size={18} /></Link>
              <Link to="/soumission" className="button-ghost" onClick={() => track("cta_quote")}><Rollover>{t("quote")}</Rollover><ArrowRight size={18} /></Link>
            </div>
          </div>
        </div>
        <img className="hero-mark" src="/brand/aurex-mark.png" alt="" width={830} height={422} decoding="async" />
        <div className="hero-coordinate" aria-hidden="true">MONTRÉAL / QUÉBEC / CANADA<br />45.5019° N · 73.5674° W</div>
      </section>

      {/* 2. What the visitor can achieve */}
      <section className="outcomes-section section shell" aria-labelledby="outcomes-title">
        <SectionHeading eyebrow={fr ? "Ce que nous vous aidons à accomplir" : "What we help you achieve"} title={fr ? "Gagner des clients. Réduire les coûts. Améliorer la rentabilité." : "Win customers. Reduce costs. Improve profitability."} text={fr ? "Nous ne vendons pas des prestations : nous construisons des solutions qui font avancer votre entreprise." : "We do not sell services: we build solutions that move your business forward."} />
        <h2 id="outcomes-title" className="sr-only">{fr ? "Objectifs" : "Objectives"}</h2>
        <div className="outcome-cards">
          {outcomes.map((o) => (
            <Link key={o.key} to="/solutions" className="outcome-card"><h3>{tx(o.title, lang)}</h3><p>{tx(o.text, lang)}</p><ArrowRight size={20} strokeWidth={1.3} /></Link>
          ))}
        </div>
      </section>

      {/* 3. Architecture */}
      <section className="architecture-section section" aria-labelledby="arch-title">
        <div className="shell">
          <p className="eyebrow">{fr ? "Notre organisation" : "How we are organized"}</p>
          <h2 id="arch-title">{fr ? "Neuf départements. Une intelligence intégrée." : "Nine departments. Intelligence built in."}</h2>
          <div className="arch">
            <div className="arch-root"><strong>AUREX SOLUTIONS</strong><span>{fr ? "Conseil · Technologie · Performance" : "Consulting · Technology · Performance"}</span></div>
            <div className="arch-link" aria-hidden="true" />
            <div className="arch-poles">
              {poles.map((pole) => {
                return <Link key={pole.key} to={`/expertises/${pole.expertise}`} className="arch-pole"><Glyph name={pole.key} size={34} /><strong>{pole.name}</strong><span>{tx(pole.tagline, lang)}</span></Link>;
              })}
            </div>
            <div className="arch-link arch-link-bottom" aria-hidden="true" />
            <Link to="/intelligence-artificielle" className="arch-ai"><Glyph name="ai" size={44} /><strong>{aiPole.name}</strong><span>{tx(aiPole.tagline, lang)}</span></Link>
          </div>
        </div>
      </section>

      {/* 4. Signature sculpture */}
      <section className="signature-section section" aria-labelledby="signature-title">
        <div className="shell signature-grid">
          <div className="signature-copy">
            <p className="eyebrow">{fr ? "Notre signature" : "Our signature"}</p>
            <h2 id="signature-title">{fr ? "Trois repères qui montent ensemble." : "Three markers that rise together."}</h2>
            <p>{fr ? "La sculpture AUREX résume notre façon de travailler : la stratégie fixe la direction, la technologie rend l’action possible, la performance se mesure et s’ajuste. Chaque barre s’appuie sur la précédente." : "The AUREX sculpture sums up how we work: strategy sets the direction, technology makes action possible, performance is measured and adjusted. Each bar builds on the one before."}</p>
            <dl className="signature-legend">
              <div><dt>{fr ? "Stratégie" : "Strategy"}</dt><dd>{fr ? "Choisir où concentrer les efforts, et pourquoi." : "Choose where to focus effort, and why."}</dd></div>
              <div><dt>{fr ? "Technologie" : "Technology"}</dt><dd>{fr ? "Concevoir les outils et les automatisations qui rendent la stratégie praticable." : "Design the tools and automations that make the strategy workable."}</dd></div>
              <div><dt>{fr ? "Performance" : "Performance"}</dt><dd>{fr ? "Mesurer les résultats convenus et optimiser en continu, pour une croissance durable." : "Measure the agreed outcomes and keep optimizing, for sustainable growth."}</dd></div>
            </dl>
            <ArrowLink to="/methode">{t("method")}</ArrowLink>
          </div>
          <Sculpture3D
            alt={fr ? "Sculpture AUREX : trois barres verticales croissantes, graphite et bleu cobalt, sur un socle circulaire" : "AUREX sculpture: three rising vertical bars in graphite and cobalt blue on a circular base"}
            hint={fr ? "Faites glisser pour faire pivoter la sculpture." : "Drag to rotate the sculpture."}
          />
        </div>
      </section>

      {/* 5. Expertise */}
      <section className="expertise-section section shell">
        <SectionHeading
          eyebrow={t("allExpertises")}
          title={fr ? "Dix expertises. Une seule trajectoire." : "Ten areas of expertise. One trajectory."}
          text={fr ? "Mobilisez une expertise précise ou combinez plusieurs pôles autour d’un objectif commun." : "Engage a specific expertise or combine several disciplines around a shared objective."}
          action={<ArrowLink to="/expertises">{t("viewAll")}</ArrowLink>}
        />
        <div className="expertise-grid expertise-grid-10">
          {expertises.map((expertise, index) => (
            <Link to={`/expertises/${expertise.slug}`} key={expertise.slug} className={`expertise-item expertise-item-${index % 4}`}>
              <span className="expertise-number"><Glyph name={expertise.slug} size={46} /><i>{expertise.letter}</i></span>
              <div><h3>{tx(expertise.title, lang)}</h3><p>{tx(expertise.short, lang)}</p></div>
              <ArrowRight size={24} strokeWidth={1.2} />
            </Link>
          ))}
        </div>
      </section>

      {/* 6. Economic value */}
      <section className="value-section section" aria-labelledby="value-title">
        <div className="shell value-grid">
          <div>
            <p className="eyebrow">{fr ? "Valeur économique" : "Economic value"}</p>
            <h2 id="value-title">{fr ? "Chaque recommandation est reliée à un indicateur." : "Every recommendation is tied to an indicator."}</h2>
            <p className="value-lead">{fr ? "Nous convenons dès le départ de ce qui sera mesuré. Voici les dix indicateurs que nous suivons avec vous. Nous présentons toujours les simulations comme des simulations, jamais comme des résultats obtenus." : "We agree from the start on what will be measured. These are the ten indicators we track with you. We always present simulations as simulations, never as results obtained."}</p>
            <ul className="kpi-chips">{kpiKeys.map((k) => <li key={k}>{tx(kpis[k].label, lang)}</li>)}</ul>
            <div className="engagement-actions"><ArrowLink to="/simulateur">{t("simulator")}</ArrowLink><ArrowLink to="/diagnostic">{t("diagnostic")}</ArrowLink></div>
          </div>
          <DashboardPreview />
        </div>
      </section>

      {/* 7. AI & automation */}
      <section className="ai-band section" aria-labelledby="ai-title">
        <NeuralField className="band-neural" density={0.8} />
        <div className="shell ai-band-grid">
          <div>
            <p className="eyebrow">{aiPole.name}</p>
            <h2 id="ai-title">{fr ? "L’intelligence artificielle au service de chaque département." : "Artificial intelligence serving every department."}</h2>
            <p>{fr ? "Agents personnalisés, automatisation commerciale, marketing, administrative et logistique, avec des permissions définies et une supervision humaine. L’expertise humaine, augmentée, jamais remplacée sans contrôle." : "Custom agents and sales, marketing, administrative and logistics automation, with defined permissions and human oversight. Human expertise, augmented, never replaced without control."}</p>
            <AskAurex placeholder={fr ? "Posez votre question à notre conseiller IA…" : "Ask our AI advisor a question…"} label={fr ? "Poser une question au conseiller IA" : "Ask the AI advisor a question"} />
            <ArrowLink to="/intelligence-artificielle" light>{fr ? "Découvrir AUREX AI & Automation" : "Discover AUREX AI & Automation"}</ArrowLink>
          </div>
          <ul className="ai-band-list">{automations.map((a) => <li key={a.key}>{tx(a.title, lang)}</li>)}</ul>
        </div>
      </section>

      {/* 8. Methodology */}
      <section className="method-preview section shell">
        <SectionHeading
          eyebrow={t("method")}
          title={fr ? "Du diagnostic à l’optimisation, sans angle mort." : "From diagnosis to optimization, without blind spots."}
          action={<ArrowLink to="/methode">{t("learnMore")}</ArrowLink>}
        />
        <div className="method-grid method-grid-6">
          {methodSteps.map((step) => <div key={step.number}><span>{step.number}</span><h3>{tx(step.title, lang)}</h3><p>{tx(step.text, lang)}</p></div>)}
        </div>
      </section>

      {/* 9. Industries */}
      <section className="sector-preview section">
        <div className="shell sector-preview-grid">
          <div>
            <p className="eyebrow">{t("allSectors")}</p>
            <h2>{fr ? "Une approche adaptée à votre réalité sectorielle." : "An approach adapted to your industry reality."}</h2>
            <ArrowLink to="/secteurs" light>{t("viewAll")}</ArrowLink>
          </div>
          <div className="sector-links sector-links-2">
            {sectors.map((sector) => <Link key={sector.slug} to={`/secteurs/${sector.slug}`}>{tx(sector.name, lang)}<ArrowRight size={18} /></Link>)}
          </div>
        </div>
      </section>

      {/* 10. Offers */}
      <section className="offers-preview section shell" aria-labelledby="offers-title">
        <SectionHeading eyebrow={t("pricing")} title={fr ? "Quatre façons de progresser. Un tarif clair." : "Four ways to move forward. A clear price."} text={fr ? "Du lancement à la transformation, avec des prestations individuelles, des abonnements mensuels ou des interventions sur mesure, en dollars canadiens." : "From launch to transformation, with individual services, monthly subscriptions or tailored engagements, in Canadian dollars."} action={<ArrowLink to="/tarifs">{t("viewAll")}</ArrowLink>} />
        <h2 id="offers-title" className="sr-only">{t("pricing")}</h2>
        <div className="tier-teasers">
          {tiers.map((tier) => (
            <Link key={tier.slug} to={`/tarifs#${tier.slug}`} className="tier-teaser">
              <Glyph name={tier.slug} size={40} />
              <p className="eyebrow">{tx(tier.verb, lang)}</p>
              <h3>{tier.name}</h3>
              <p>{tx(tier.audience, lang)}</p>
              <ArrowRight size={20} strokeWidth={1.3} />
            </Link>
          ))}
        </div>
      </section>

      {/* 11–13. Why AUREX, vision, trust */}
      <WhyAurex />
      <VisionBand />
      <TrustSection />

      <OrientationAssistant />

      <section className="insights-preview section shell">
        <SectionHeading eyebrow={t("allInsights")} title={fr ? "Comprendre avant d’agir." : "Understand before acting."} action={<ArrowLink to="/ressources">{t("viewAll")}</ArrowLink>} />
        <div className="insight-list">
          {insights.map((insight, index) => (
            <Link to={`/ressources/${insight.slug}`} key={insight.slug} className="insight-row">
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
