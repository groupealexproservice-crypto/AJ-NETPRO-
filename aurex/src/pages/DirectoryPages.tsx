import { useParams } from "react-router";
import { Link } from "../components/LocaleLink";
import { ArrowRight, Check } from "lucide-react";
import { aiPole, expertises, kpis, outcomes, poles, sectorExpertises, sectors, tx, txList, whyAurex } from "../content";
import { useLanguage } from "../i18n";
import { ArrowLink, PageMeta } from "../components/Layout";
import { CtaBand, PageHero } from "../components/Sections";
import { Glyph } from "../components/Glyphs";
import { PageCommitment } from "../components/Vision";
import { NotFound } from "./CompanyPages";

const poleOf = (key: string) => poles.find((p) => p.key === key);

export function ExpertiseIndex() {
  const { lang, t } = useLanguage();
  const fr = lang === "fr";
  return <>
    <PageMeta title={t("expertise")} description={fr ? "Dix expertises du marketing à l’intelligence artificielle : prestations, bénéfices économiques et indicateurs de suivi." : "Ten areas of expertise from marketing to artificial intelligence: services, economic benefits and tracking indicators."} />
    <PageHero eyebrow="AUREX / EXPERTISES" title={fr ? "Dix expertises. Un seul partenaire." : "Ten areas of expertise. One partner."} text={fr ? "Marketing, stratégie, technologie, opérations et intelligence artificielle, réunis pour que chaque décision serve votre croissance et votre rentabilité." : "Marketing, strategy, technology, operations and artificial intelligence, together so every decision serves your growth and profitability."} />
    <section className="directory shell section">
      {expertises.map((expertise) => {
        const pole = expertise.pole === "ai" ? { name: aiPole.name } : poleOf(expertise.pole);
        return (
          <Link to={`/expertises/${expertise.slug}`} key={expertise.slug} className="directory-row">
            <span><Glyph name={expertise.slug} size={40} /></span>
            <div><p className="eyebrow">{expertise.letter} · {pole?.name}</p><h2>{tx(expertise.title, lang)}</h2></div>
            <p>{tx(expertise.short, lang)}</p>
            <ArrowRight size={26} strokeWidth={1.2} />
          </Link>
        );
      })}
    </section>
    <CtaBand />
  </>;
}

export function ExpertiseDetail() {
  const { slug } = useParams();
  const { lang, t } = useLanguage();
  const fr = lang === "fr";
  const expertise = expertises.find((item) => item.slug === slug);
  if (!expertise) return <NotFound />;
  const pole = expertise.pole === "ai" ? aiPole.name : poleOf(expertise.pole)?.name;
  const relatedSectors = sectors.filter((s) => sectorExpertises[s.slug]?.includes(expertise.slug));
  return <>
    <PageMeta title={tx(expertise.title, lang)} description={tx(expertise.short, lang)} />
    <PageHero glyph={<Glyph name={expertise.slug} size={56} />} eyebrow={`${pole} / ${expertise.letter}`} title={tx(expertise.title, lang)} text={tx(expertise.intro, lang)}>
      <ArrowLink to="/consultation">{t("consult")}</ArrowLink>
    </PageHero>

    <section className="detail-split shell section">
      <div><p className="eyebrow">{fr ? "1. Le problème" : "1. The problem"}</p><h2>{fr ? "Ce que rencontrent les entreprises." : "What businesses run into."}</h2></div>
      <ul className="plain-list">{txList(expertise.problems, lang).map((item) => <li key={item}>{item}</li>)}</ul>
    </section>

    <section className="detail-split shell section">
      <div><p className="eyebrow">{fr ? "2. La solution" : "2. The solution"}</p><h2>{fr ? "Notre réponse." : "Our response."}</h2></div>
      <p className="detail-lead">{tx(expertise.solution, lang)}</p>
    </section>

    <section className="detail-split shell section">
      <div><p className="eyebrow">{fr ? "3. Comment nous intervenons" : "3. How we work"}</p><h2>{fr ? "Une démarche en étapes." : "A staged approach."}</h2></div>
      <ol className="steps-list">{txList(expertise.approach, lang).map((item) => <li key={item}>{item}</li>)}</ol>
    </section>

    <section className="services-dark section">
      <div className="shell detail-split">
        <div><p className="eyebrow">{fr ? "Prestations" : "Services"}</p><h2>{fr ? "Un périmètre adapté à votre situation." : "A scope adapted to your situation."}</h2></div>
        <ul className="service-list">{txList(expertise.services, lang).map((item, index) => <li key={item}><span>{String(index + 1).padStart(2, "0")}</span>{item}</li>)}</ul>
      </div>
    </section>

    <section className="deliverables shell section">
      <p className="eyebrow">{fr ? "4. Les livrables" : "4. Deliverables"}</p>
      <h2>{fr ? "Des outils concrets pour passer à l’action." : "Concrete tools to take action."}</h2>
      <div className="deliverable-grid">{txList(expertise.deliverables, lang).map((item) => <div key={item}><Check size={18} strokeWidth={1.5} /><p>{item}</p></div>)}</div>
    </section>

    <section className="benefits-band section">
      <div className="shell detail-split">
        <div><p className="eyebrow">{fr ? "5. Les bénéfices potentiels" : "5. Potential benefits"}</p><h2>{fr ? "Ce que nos services peuvent apporter." : "What our services can bring."}</h2><p className="muted-note">{fr ? "Ce sont des bénéfices visés. Ils dépendent de votre situation et ne sont pas garantis." : "These are targeted benefits. They depend on your situation and are not guaranteed."}</p></div>
        <ul className="plain-list">{txList(expertise.benefits, lang).map((item) => <li key={item}>{item}</li>)}</ul>
      </div>
    </section>

    <section className="kpi-section shell section">
      <p className="eyebrow">{fr ? "6. Comment mesurer les résultats" : "6. How results are measured"}</p>
      <h2>{fr ? "Des indicateurs convenus dès le départ." : "Indicators agreed from the start."}</h2>
      <dl className="kpi-grid">{expertise.kpis.map((key) => <div key={key}><dt>{tx(kpis[key].label, lang)}</dt><dd>{tx(kpis[key].definition, lang)}<code>{tx(kpis[key].formula, lang)}</code></dd></div>)}</dl>
      <ArrowLink to="/simulateur">{fr ? "Estimer le potentiel avec le simulateur" : "Estimate the potential with the simulator"}</ArrowLink>
    </section>

    <section className="detail-split shell section ai-inline">
      <div><p className="eyebrow">{fr ? "Avec l’intelligence artificielle" : "With artificial intelligence"}</p><h2>{fr ? "Humain d’abord, technologie ensuite." : "People first, technology second."}</h2></div>
      <div><p className="detail-lead">{tx(expertise.ai, lang)}</p><ArrowLink to="/intelligence-artificielle">AUREX AI &amp; Automation</ArrowLink></div>
    </section>

    <section className="pricing-note shell section">
      <div><p className="eyebrow">{fr ? "7. Combien coûte notre intervention" : "7. What our work costs"}</p><h2>{fr ? "Transparent, avant de commencer." : "Transparent, before we begin."}</h2></div>
      <div>
        <p className="detail-lead">{tx(expertise.pricing, lang)}</p>
        {expertise.note && <div className="ad-note" role="note"><strong>{fr ? "Budget publicitaire et honoraires" : "Ad budget and fees"}</strong><p>{tx(expertise.note, lang)}</p></div>}
        <ArrowLink to="/tarifs">{fr ? "Voir les offres et les conditions" : "See offers and terms"}</ArrowLink>
      </div>
    </section>

    <section className="why-mini shell section">
      <p className="eyebrow">{fr ? "8. Pourquoi choisir AUREX Solutions" : "8. Why choose AUREX Solutions"}</p>
      <ul>{whyAurex.slice(0, 4).map((item) => <li key={item.title.en}><strong>{tx(item.title, lang)}</strong><span>{tx(item.text, lang)}</span></li>)}</ul>
      <ArrowLink to="/a-propos">{fr ? "Voir les dix raisons" : "See all ten reasons"}</ArrowLink>
    </section>

    {relatedSectors.length > 0 && <section className="related-section shell section">
      <p className="eyebrow">{fr ? "Secteurs concernés" : "Relevant industries"}</p>
      <div className="related-links">{relatedSectors.map((sector) => <Link key={sector.slug} to={`/secteurs/${sector.slug}`}><span>{tx(sector.name, lang)}</span><p>{tx(sector.intro, lang)}</p><ArrowRight size={20} /></Link>)}</div>
    </section>}
    <PageCommitment kind="expertise" />
    <CtaBand />
  </>;
}

export function SolutionsPage() {
  const { lang, t } = useLanguage();
  const fr = lang === "fr";
  return <>
    <PageMeta title={t("solutions")} description={fr ? "Gagner des clients, augmenter le chiffre d’affaires, réduire les coûts, optimiser les opérations et améliorer la rentabilité." : "Win customers, increase revenue, reduce costs, optimize operations and improve profitability."} />
    <PageHero eyebrow="AUREX / SOLUTIONS" title={fr ? "Votre objectif d’abord. Les expertises ensuite." : "Your objective first. The expertise next."} text={fr ? "Nous partons de ce que vous voulez accomplir, puis nous mobilisons les expertises qui y mènent. Une seule équipe, plusieurs leviers." : "We start from what you want to achieve, then bring in the expertise that gets you there. One team, several levers."}>
      <ArrowLink to="/diagnostic">{t("diagnostic")}</ArrowLink>
    </PageHero>
    <section className="outcome-list shell section">
      {outcomes.map((outcome) => (
        <article key={outcome.key} className="outcome-row">
          <div><h2>{tx(outcome.title, lang)}</h2><p>{tx(outcome.text, lang)}</p></div>
          <ul>{outcome.expertises.map((slug) => { const e = expertises.find((x) => x.slug === slug)!; return <li key={slug}><Link to={`/expertises/${slug}`}><Glyph name={slug} size={28} /><span>{tx(e.title, lang)}</span><ArrowRight size={18} /></Link></li>; })}</ul>
        </article>
      ))}
    </section>
    <section className="shell section solutions-next">
      <p className="eyebrow">{fr ? "Et ensuite" : "Next"}</p>
      <h2>{fr ? "Choisir un cadre de travail." : "Choose a way of working."}</h2>
      <div className="engagement-actions">
        <ArrowLink to="/tarifs">{t("pricing")}</ArrowLink>
        <ArrowLink to="/simulateur">{t("simulator")}</ArrowLink>
        <ArrowLink to="/intelligence-artificielle">AUREX AI &amp; Automation</ArrowLink>
      </div>
    </section>
    <CtaBand />
  </>;
}

export function SectorsPage() {
  const { lang, t } = useLanguage();
  const fr = lang === "fr";
  return <>
    <PageMeta title={t("allSectors")} description={fr ? "Onze secteurs, leurs enjeux, les solutions AUREX adaptées et les bénéfices économiques potentiels." : "Eleven industries, their challenges, tailored AUREX solutions and potential economic benefits."} />
    <PageHero eyebrow="AUREX / SECTEURS" title={fr ? "Des enjeux propres à chaque secteur." : "Challenges specific to each industry."} text={fr ? "Chaque secteur a ses contraintes et ses leviers. Voici les problématiques courantes et les approches que nous pouvons mobiliser. Ce sont des pistes, non des missions réalisées." : "Every industry has its own constraints and levers. These are the common challenges and the approaches we can bring. They are starting points, not completed missions."} />
    <section className="sector-directory shell section">{sectors.map((sector, index) => <Link to={`/secteurs/${sector.slug}`} key={sector.slug} className="sector-row"><span>{String(index + 1).padStart(2, "0")}</span><h2>{tx(sector.name, lang)}</h2><p>{tx(sector.intro, lang)}</p><ArrowRight size={24} strokeWidth={1.2} /></Link>)}</section>
    <CtaBand />
  </>;
}

export function SectorDetail() {
  const { slug } = useParams();
  const { lang, t } = useLanguage();
  const fr = lang === "fr";
  const sector = sectors.find((item) => item.slug === slug);
  if (!sector) return <NotFound />;
  return <>
    <PageMeta title={tx(sector.name, lang)} description={tx(sector.intro, lang)} />
    <PageHero eyebrow={`${t("sectors")} / AUREX`} title={tx(sector.name, lang)} text={tx(sector.intro, lang)}><ArrowLink to={`/diagnostic?sector=${sector.slug}`}>{t("diagnostic")}</ArrowLink></PageHero>
    <section className="detail-split shell section">
      <div><p className="eyebrow">{fr ? "Les enjeux" : "The challenges"}</p><h2>{fr ? "Ce que ces entreprises rencontrent souvent." : "What these businesses often face."}</h2></div>
      <ul className="plain-list">{txList(sector.challenges, lang).map((item) => <li key={item}>{item}</li>)}</ul>
    </section>
    <section className="services-dark section">
      <div className="shell detail-split">
        <div><p className="eyebrow">{fr ? "Les solutions AUREX" : "AUREX solutions"}</p><h2>{fr ? "Des pistes adaptées, à valider avec vous." : "Tailored approaches, to be validated with you."}</h2></div>
        <ul className="service-list">{txList(sector.responses, lang).map((item, index) => <li key={item}><span>{String(index + 1).padStart(2, "0")}</span>{item}</li>)}</ul>
      </div>
    </section>
    {sector.benefits && <section className="benefits-band section">
      <div className="shell detail-split">
        <div><p className="eyebrow">{fr ? "Bénéfices économiques potentiels" : "Potential economic benefits"}</p><h2>{fr ? "Ce que l’on peut viser." : "What can be aimed for."}</h2><p className="muted-note">{fr ? "Des directions à explorer ensemble, jamais des résultats promis." : "Directions to explore together, never promised results."}</p></div>
        <ul className="plain-list">{txList(sector.benefits, lang).map((item) => <li key={item}>{item}</li>)}</ul>
      </div>
    </section>}
    <section className="related-section shell section"><p className="eyebrow">{t("related")}</p><div className="related-links">{(sectorExpertises[sector.slug] ?? []).map((slug) => expertises.find((e) => e.slug === slug)!).map((expertise) => <Link key={expertise.slug} to={`/expertises/${expertise.slug}`}><span>{tx(expertise.title, lang)}</span><p>{tx(expertise.short, lang)}</p><ArrowRight size={20} /></Link>)}</div></section>
    <PageCommitment kind="sector" />
    <CtaBand />
  </>;
}
