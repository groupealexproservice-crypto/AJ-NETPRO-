import { Link } from "./LocaleLink";
import { ArrowRight } from "lucide-react";
import { customerJourney, packs, packsNote, serviceDomains, tx, txList, workWays, expertises } from "../content";
import { useLanguage } from "../i18n";

/** Six service domains, then three ways to work with AUREX. Shared by the home page and the solutions page. */
export function DomainsAndWays({ withWays = true }: { withWays?: boolean }) {
  const { lang } = useLanguage();
  const fr = lang === "fr";
  return (
    <section className="shell section domains" aria-labelledby="domains-title">
      <p className="eyebrow">{fr ? "Nos services" : "Our services"}</p>
      <h2 id="domains-title" className="pricing-h2">{fr ? "Six domaines pour mieux vous présenter, attirer des clients et améliorer vos opérations." : "Six areas to present yourself better, attract customers and improve your operations."}</h2>
      <div className="domain-grid">
        {serviceDomains.map((d) => (
          <article key={d.key} className="domain-card">
            <h3>{tx(d.title, lang)}</h3>
            <p>{tx(d.text, lang)}</p>
            <ul>{d.expertises.map((slug) => { const e = expertises.find((x) => x.slug === slug); return e ? <li key={slug}><Link to={`/expertises/${slug}`}>{tx(e.title, lang)}<ArrowRight size={14} aria-hidden="true" /></Link></li> : null; })}</ul>
          </article>
        ))}
      </div>
      {withWays && <>
        <h3 className="entry-sub">{fr ? "Trois façons de travailler avec AUREX" : "Three ways to work with AUREX"}</h3>
        <div className="format-grid ways">
          {workWays.map((w) => <div key={w.key}><h3>{tx(w.title, lang)}</h3><p>{tx(w.text, lang)}</p><Link to={w.to}>{fr ? "Voir les prix" : "See pricing"}</Link></div>)}
        </div>
        <p className="muted-note"><strong>{fr ? "Parcours : " : "Journey: "}</strong>{tx(customerJourney, lang)}</p>
      </>}
    </section>
  );
}

export function PacksSection() {
  const { lang } = useLanguage();
  const fr = lang === "fr";
  return (
    <section id="packs" className="shell section" aria-labelledby="packs-title">
      <p className="eyebrow">{fr ? "Packs intégrés · plusieurs services, un objectif" : "Integrated packs · several services, one goal"}</p>
      <h2 id="packs-title" className="pricing-h2">{fr ? "Six packs, selon votre objectif." : "Six packs, by objective."}</h2>
      <p className="muted-note">{tx(packsNote, lang)}</p>
      <div className="plan-grid">
        {packs.map((p) => (
          <article key={p.slug} className="plan-card pack-card" id={p.slug}>
            <h3>{p.name}</h3>
            <p className="plan-tagline">{tx(p.need, lang)}</p>
            <ul>{txList(p.services, lang).map((x) => <li key={x}>{x}</li>)}</ul>
            <p className="plan-why"><strong>{fr ? "Prix de départ : " : "Starting price: "}</strong>{tx(p.from, lang)}</p>
            <Link className="button-primary" to={p.to}>{fr ? "Demander ce pack" : "Request this pack"}</Link>
          </article>
        ))}
      </div>
    </section>
  );
}
