import { useLanguage } from "../i18n";
import { commitments, pageCommitment, vision } from "../vision";
import { tx, whyAurex } from "../content";
import { ArrowLink } from "./Layout";

/** Full-bleed architectural band carrying the vision statement. */
export function VisionBand() {
  const { lang } = useLanguage();
  return (
    <section className="vision-band" aria-labelledby="vision-quote">
      <div className="vision-band-photo" role="img" aria-label={lang === "fr" ? "Façade architecturale en noir et blanc" : "Black and white architectural facade"} />
      <div className="vision-band-shade" />
      <div className="shell vision-band-content">
        <p className="eyebrow">{lang === "fr" ? "Notre vision" : "Our vision"}</p>
        <blockquote id="vision-quote">{tx(vision.quote, lang)}</blockquote>
        <p className="vision-statement">{tx(vision.statement, lang)}</p>
      </div>
    </section>
  );
}

/** The five commitments, as a numbered sequence (the order is the order of a mandate). */
export function Commitments({ compact = false }: { compact?: boolean }) {
  const { lang } = useLanguage();
  return (
    <section className={`commitments section ${compact ? "commitments-compact" : ""}`} aria-labelledby="commitments-title">
      <div className="shell commitments-grid">
        <div className="commitments-intro">
          <p className="eyebrow">{lang === "fr" ? "Nos engagements" : "Our commitments"}</p>
          <h2 id="commitments-title">{lang === "fr" ? "Une relation de confiance se construit par des gestes précis." : "A relationship of trust is built through specific actions."}</h2>
          <p>{tx(vision.intro, lang)}</p>
        </div>
        <ol className="commitments-list">
          {commitments.map((item) => (
            <li key={item.title.en}>
              <h3>{tx(item.title, lang)}</h3>
              <p>{tx(item.text, lang)}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/** Closing note on detail pages: a human, responsible commitment next to the next step. */
export function PageCommitment({ kind }: { kind: "expertise" | "solution" | "sector" }) {
  const { lang, t } = useLanguage();
  const copy = pageCommitment[kind];
  return (
    <section className="page-commitment shell section" aria-label={tx(copy.title, lang)}>
      <div>
        <p className="eyebrow">{tx(copy.title, lang)}</p>
        <p className="page-commitment-text">{tx(copy.text, lang)}</p>
      </div>
      <div className="page-commitment-actions">
        <ArrowLink to="/consultation">{t("consult")}</ArrowLink>
        <ArrowLink to="/diagnostic">{t("diagnostic")}</ArrowLink>
      </div>
    </section>
  );
}

/** The ten reasons to choose AUREX, as a plain index: statements of method, not claims of results. */
export function WhyAurex() {
  const { lang } = useLanguage();
  const fr = lang === "fr";
  return (
    <section className="why-section section" aria-labelledby="why-title">
      <div className="shell why-grid">
        <div className="why-intro">
          <p className="eyebrow">{fr ? "Pourquoi choisir AUREX Solutions" : "Why choose AUREX Solutions"}</p>
          <h2 id="why-title">{fr ? "Le marketing, la stratégie, la technologie et les opérations au sein d’un même partenaire." : "Marketing, strategy, technology and operations within a single partner."}</h2>
        </div>
        <ul className="why-list">{whyAurex.map((item) => <li key={item.title.en}><h3>{tx(item.title, lang)}</h3><p>{tx(item.text, lang)}</p></li>)}</ul>
      </div>
    </section>
  );
}
