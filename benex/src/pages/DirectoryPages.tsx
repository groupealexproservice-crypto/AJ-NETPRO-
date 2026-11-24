import { useParams } from "react-router";
import { Link } from "../components/LocaleLink";
import { ArrowRight, Check } from "lucide-react";
import { expertises, sectors, tx, txList } from "../content";
import { useLanguage } from "../i18n";
import { ArrowLink, PageMeta } from "../components/Layout";
import { CtaBand, PageHero, SectionHeading } from "../components/Sections";
import { useSolutions } from "../hooks/useSolutions";
import { NotFound } from "./CompanyPages";

export function ExpertiseIndex() {
  const { lang, t } = useLanguage();
  return <>
    <PageMeta title={t("allExpertises")} description={lang === "fr" ? "Huit pôles de conseil pour structurer, transformer et développer votre entreprise." : "Eight consulting disciplines to structure, transform and grow your business."} />
    <PageHero eyebrow="BENEX / 01—08" title={lang === "fr" ? "L’expertise devient utile quand elle répond à un enjeu précis." : "Expertise becomes useful when it answers a specific challenge."} text={lang === "fr" ? "Chaque pôle peut faire l’objet d’une mission ciblée. Leur véritable force apparaît lorsqu’ils sont coordonnés autour d’une même trajectoire de croissance." : "Each discipline can support a targeted mandate. Their full strength emerges when coordinated around a shared growth trajectory."} />
    <section className="directory-list shell section">
      {expertises.map((expertise) => <Link to={`/expertises/${expertise.slug}`} key={expertise.slug} className="directory-row"><span>{expertise.number}</span><h2>{tx(expertise.title, lang)}</h2><p>{tx(expertise.short, lang)}</p><ArrowRight size={27} strokeWidth={1.1} /></Link>)}
    </section>
    <CtaBand />
  </>;
}

export function ExpertiseDetail() {
  const { slug } = useParams();
  const { lang, t } = useLanguage();
  const displaySolutions = useSolutions();
  const expertise = expertises.find((item) => item.slug === slug);
  if (!expertise) return <NotFound />;
  const related = displaySolutions.filter((item, index) => index === (Number(expertise.number) - 1) % displaySolutions.length || (expertise.number === "08" && item.slug === "360"));
  return <>
    <PageMeta title={tx(expertise.title, lang)} description={tx(expertise.short, lang)} />
    <PageHero eyebrow={`${t("expertise")} / ${expertise.number}`} title={tx(expertise.title, lang)} text={tx(expertise.intro, lang)}><ArrowLink to="/soumission">{t("quote")}</ArrowLink></PageHero>
    <section className="detail-split shell section">
      <div><p className="eyebrow">{t("challenges")}</p><h2>{lang === "fr" ? "Reconnaître les signaux avant qu’ils ne deviennent des blocages." : "Recognize the signals before they become roadblocks."}</h2></div>
      <ul className="challenge-list">{txList(expertise.problems, lang).map((item) => <li key={item}>{item}</li>)}</ul>
    </section>
    <section className="service-detail section">
      <div className="shell detail-split">
        <div><p className="eyebrow">{t("services")}</p><h2>{lang === "fr" ? "Un périmètre adapté à votre situation." : "A scope adapted to your situation."}</h2></div>
        <ol className="service-list">{txList(expertise.services, lang).map((item, index) => <li key={item}><span>{String(index + 1).padStart(2, "0")}</span>{item}</li>)}</ol>
      </div>
    </section>
    <section className="deliverables-section shell section">
      <SectionHeading eyebrow={t("deliverables")} title={lang === "fr" ? "Des outils concrets pour passer à l’action." : "Concrete tools for action."} />
      <div className="deliverable-grid">{txList(expertise.deliverables, lang).map((item) => <div key={item}><Check size={20} strokeWidth={1.4} /><p>{item}</p></div>)}</div>
    </section>
    <section className="related-section shell section">
      <p className="eyebrow">{t("allSolutions")}</p>
      <div className="related-links">{related.map((solution) => <Link key={solution.slug} to={`/solutions/${solution.slug}`}><span>{solution.name}</span><p>{tx(solution.summary, lang)}</p><ArrowRight size={20} /></Link>)}</div>
    </section>
    <CtaBand />
  </>;
}

export function SolutionsPage() {
  const { lang, t } = useLanguage();
  const displaySolutions = useSolutions();
  return <>
    <PageMeta title={t("allSolutions")} description={lang === "fr" ? "Des accompagnements configurables selon vos objectifs de création, transformation, acquisition et performance." : "Configurable support for creation, transformation, acquisition and performance objectives."} />
    <PageHero eyebrow="BENEX / SOLUTIONS" title={lang === "fr" ? "Votre besoin d’abord. La combinaison d’expertises ensuite." : "Your needs first. The right combination of expertise next."} text={lang === "fr" ? "Six solutions pour cadrer une mission sans enfermer votre projet dans une offre rigide. Le périmètre et la tarification sont définis sur devis, après compréhension de vos objectifs." : "Six solutions to frame a mandate without locking your project into a rigid package. Scope and pricing are defined by proposal after understanding your objectives."} />
    <section className="solutions-list shell section">
      {displaySolutions.map((solution, index) => <Link to={`/solutions/${solution.slug}`} key={solution.slug} className="solution-row"><span className="solution-index">0{index + 1}</span><div><p className="eyebrow">{tx(solution.category, lang)}</p><h2>{solution.name}</h2></div><p>{tx(solution.summary, lang)}</p><span className="quote-label">{lang === "fr" ? "Sur devis" : "By proposal"}</span><ArrowRight size={25} strokeWidth={1.1} /></Link>)}
    </section>
    <CtaBand />
  </>;
}

export function SolutionDetail() {
  const { slug } = useParams();
  const { lang, t } = useLanguage();
  const displaySolutions = useSolutions();
  const solution = displaySolutions.find((item) => item.slug === slug);
  if (!solution) return <NotFound />;
  const summary = tx(solution.summary, lang);
  const relatedSlugs: Record<string, string[]> = {
    launch: ["strategie-intelligence-economique", "identite-marque-communication", "developpement-web-transformation-numerique"],
    digital: ["developpement-web-transformation-numerique", "intelligence-artificielle-automatisation"],
    growth: ["developpement-commercial-acquisition", "marketing-digital-publicite"],
    performance: ["performance-operationnelle-logistique", "conseil-accompagnement-entreprises"],
    intelligence: ["intelligence-artificielle-automatisation", "performance-operationnelle-logistique"],
    "360": ["strategie-intelligence-economique", "conseil-accompagnement-entreprises", "developpement-commercial-acquisition"],
  };
  const related = expertises.filter((item) => relatedSlugs[solution.slug]?.includes(item.slug));
  return <>
    <PageMeta title={solution.name} description={summary} />
    <PageHero eyebrow={`${tx(solution.category, lang)} / ${lang === "fr" ? "Sur devis" : "By proposal"}`} title={solution.name} text={summary}><ArrowLink to="/soumission">{t("quote")}</ArrowLink></PageHero>
    <section className="solution-objective shell section"><p className="eyebrow">{t("objective")}</p><h2>{tx(solution.objective, lang)}</h2></section>
    <section className="solution-pillars shell section">
      {[{ title: t("scope"), items: txList(solution.scope, lang) }, { title: t("deliverables"), items: txList(solution.deliverables, lang) }, { title: t("outcomes"), items: txList(solution.outcomes, lang) }].map((group, index) => <div key={group.title}><span>0{index + 1}</span><h3>{group.title}</h3><ul>{group.items.map((item) => <li key={item}>{item}</li>)}</ul></div>)}
    </section>
    <section className="related-section shell section"><p className="eyebrow">{t("related")}</p><div className="related-links">{related.map((expertise) => <Link key={expertise.slug} to={`/expertises/${expertise.slug}`}><span>{tx(expertise.title, lang)}</span><p>{tx(expertise.short, lang)}</p><ArrowRight size={20} /></Link>)}</div></section>
    <CtaBand />
  </>;
}

export function SectorsPage() {
  const { lang, t } = useLanguage();
  return <>
    <PageMeta title={t("allSectors")} description={lang === "fr" ? "Des solutions de conseil adaptées aux réalités de dix secteurs d’activité." : "Consulting solutions adapted to the realities of ten industries."} />
    <PageHero eyebrow="BENEX / INDUSTRIES" title={lang === "fr" ? "La méthode reste rigoureuse. Le contexte change tout." : "The method remains rigorous. Context changes everything."} text={lang === "fr" ? "Nous adaptons le diagnostic, les priorités et les solutions aux contraintes commerciales, humaines et opérationnelles de votre secteur." : "We adapt diagnosis, priorities and solutions to the commercial, human and operational constraints of your industry."} />
    <section className="sector-directory shell section">{sectors.map((sector, index) => <Link to={`/secteurs/${sector.slug}`} key={sector.slug}><span>0{index + 1}</span><h2>{tx(sector.name, lang)}</h2><p>{tx(sector.intro, lang)}</p><ArrowRight size={23} strokeWidth={1.1} /></Link>)}</section>
    <CtaBand />
  </>;
}

export function SectorDetail() {
  const { slug } = useParams();
  const { lang, t } = useLanguage();
  const displaySolutions = useSolutions();
  const sector = sectors.find((item) => item.slug === slug);
  if (!sector) return <NotFound />;
  return <>
    <PageMeta title={tx(sector.name, lang)} description={tx(sector.intro, lang)} />
    <PageHero eyebrow={`${t("sectors")} / BENEX`} title={tx(sector.name, lang)} text={tx(sector.intro, lang)}><ArrowLink to="/diagnostic">{t("diagnostic")}</ArrowLink></PageHero>
    <section className="sector-response shell section">
      <div><p className="eyebrow">{t("challenges")}</p><ol>{txList(sector.challenges, lang).map((item, index) => <li key={item}><span>0{index + 1}</span>{item}</li>)}</ol></div>
      <div><p className="eyebrow">{t("response")}</p><ol>{txList(sector.responses, lang).map((item, index) => <li key={item}><span>0{index + 1}</span>{item}</li>)}</ol></div>
    </section>
    <section className="related-section shell section"><p className="eyebrow">{t("allSolutions")}</p><div className="related-links">{displaySolutions.slice(0, 3).map((solution) => <Link key={solution.slug} to={`/solutions/${solution.slug}`}><span>{solution.name}</span><p>{tx(solution.summary, lang)}</p><ArrowRight size={20} /></Link>)}</div></section>
    <CtaBand />
  </>;
}
