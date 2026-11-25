import { useState } from "react";
import { ArrowRight, RotateCcw, Sparkles } from "lucide-react";
import { entryOffers, expertises, packs, plans, sectors, tx, type Localized } from "../content";
import { useLanguage } from "../i18n";
import { track } from "../lib/track";
import { useEffect } from "react";
import { ArrowLink } from "./Layout";
import { Link } from "./LocaleLink";
import { Glyph } from "./Glyphs";

/**
 * Two questions (industry, then need) lead to a suggested offer, the expertise it draws on and the matching industry page,
 * with the choices carried into the quote and consultation forms. A pattern borrowed from how large firms guide visitors;
 * the recommendations below are AUREX's own routing rules, not results.
 */
type Need = { key: string; label: Localized; solution: string; expertises: string[] };

const needs: Need[] = [
  { key: "launch", label: { fr: "Lancer ou repositionner mon entreprise", en: "Launch or reposition my business" }, solution: "pack-lancement", expertises: ["creation-developpement-croissance", "conseil-strategique-analyse-affaires"] },
  { key: "brand", label: { fr: "Renforcer mon image et ma visibilité", en: "Strengthen my image and visibility" }, solution: "plan-developpement", expertises: ["marketing-strategique-numerique", "sites-web-solutions-numeriques"] },
  { key: "digital", label: { fr: "Moderniser mon site et mes outils", en: "Modernize my website and tools" }, solution: "entree-site", expertises: ["sites-web-solutions-numeriques", "customer-marketing-experience-client"] },
  { key: "growth", label: { fr: "Trouver de nouveaux clients", en: "Find new customers" }, solution: "pack-acquisition", expertises: ["publicite-numerique-ppc", "marketing-strategique-numerique"] },
  { key: "operations", label: { fr: "Optimiser mes opérations et ma logistique", en: "Optimize my operations and logistics" }, solution: "pack-operations", expertises: ["solutions-operationnelles", "logistique-chaine-approvisionnement"] },
  { key: "ai", label: { fr: "Automatiser avec l’intelligence artificielle", en: "Automate with artificial intelligence" }, solution: "pack-automatisation", expertises: ["intelligence-artificielle-automatisation", "solutions-operationnelles"] },
  { key: "decision", label: { fr: "Éclairer une décision stratégique", en: "Inform a strategic decision" }, solution: "pack-croissance", expertises: ["conseil-strategique-analyse-affaires", "analyse-marche-intelligence-economique"] },
  { key: "global", label: { fr: "Coordonner plusieurs enjeux à la fois", en: "Coordinate several challenges at once" }, solution: "pack-partenaire", expertises: ["conseil-strategique-analyse-affaires", "intelligence-artificielle-automatisation"] },
];

export function OrientationAssistant() {
  const { lang, t } = useLanguage();
  const fr = lang === "fr";
  const [sector, setSector] = useState<string | null>(null);
  const [needKey, setNeedKey] = useState<string | null>(null);
  const need = needs.find((n) => n.key === needKey);
  const solution = (() => {
    const slug = need?.solution;
    const pack = packs.find((x) => x.slug === slug);
    if (pack) return { slug: pack.slug, name: pack.name, verb: pack.need, audience: pack.from };
    const plan = plans.find((x) => x.slug === slug);
    if (plan) return { slug: plan.slug, name: `AUREX ${plan.name}`, verb: plan.tagline, audience: plan.forWho };
    const offer = entryOffers.find((x) => x.slug === slug);
    if (offer) return { slug: offer.slug, name: tx(offer.title, lang), verb: { fr: "Service ponctuel", en: "One-off service" } as Localized, audience: { fr: `À partir de ${offer.price} $`, en: `From $${offer.price}` } as Localized };
    return undefined;
  })();
  useEffect(() => { if (need) track("assistant_completed"); }, [need]);
  const sectorItem = sectors.find((s) => s.slug === sector);
  const step = !sector ? 1 : !need ? 2 : 3;
  const query = `?solution=${need?.solution ?? ""}&sector=${sector ?? ""}`;

  return (
    <section className="assistant-section shell" aria-labelledby="assistant-title">
      <div className="assistant-heading">
        <Sparkles size={28} strokeWidth={1.25} aria-hidden="true" />
        <div>
          <p className="eyebrow">{fr ? "Deux questions" : "Two questions"}</p>
          <h2 id="assistant-title">{fr ? "Dites-nous votre secteur et votre besoin." : "Tell us your industry and your need."}</h2>
          <p>{fr ? "Indiquez votre secteur et votre besoin : nous vous orientons vers l’offre, les expertises et le formulaire les plus pertinents." : "Tell us your industry and your need: we point you to the most relevant offer, expertise and form."}</p>
          <ol className="assistant-steps" aria-label={fr ? "Progression" : "Progress"}>
            {[fr ? "Votre secteur" : "Your industry", fr ? "Votre besoin" : "Your need", fr ? "Notre recommandation" : "Our recommendation"].map((label, index) => (
              <li key={label} className={index + 1 === step ? "current" : index + 1 < step ? "done" : ""} aria-current={index + 1 === step ? "step" : undefined}>{label}</li>
            ))}
          </ol>
        </div>
      </div>

      <div className="assistant-conversation" aria-live="polite">
        {step === 1 && (
          <div>
            <p className="assistant-question">{fr ? "1. Quel est votre secteur d’activité ?" : "1. What is your industry?"}</p>
            <div className="assistant-options">
              {sectors.map((item) => (
                <button key={item.slug} type="button" onClick={() => setSector(item.slug)}>{tx(item.name, lang)}<ArrowRight size={17} /></button>
              ))}
            </div>
          </div>
        )}
        {step === 2 && (
          <div>
            <p className="assistant-question">{fr ? "2. Quel est votre besoin principal ?" : "2. What is your main need?"} <span className="assistant-chosen">{sectorItem ? tx(sectorItem.name, lang) : ""}</span></p>
            <div className="assistant-options">
              {needs.map((item) => (
                <button key={item.key} type="button" onClick={() => setNeedKey(item.key)}>{tx(item.label, lang)}<ArrowRight size={17} /></button>
              ))}
            </div>
            <button type="button" className="text-button" onClick={() => setSector(null)}><RotateCcw size={16} />{fr ? "Changer de secteur" : "Change industry"}</button>
          </div>
        )}
        {step === 3 && need && solution && sectorItem && (
          <div className="assistant-answer">
            <p className="eyebrow">{t("recommended")}</p>
            <div className="assistant-answer-title"><Glyph name="growth" size={48} /><div><p className="assistant-verb">{tx(solution.verb, lang)}</p><h3>{solution.name}</h3></div></div>
            <p>{tx(solution.audience, lang)}</p>
            <p className="assistant-context">{fr ? "Pour : " : "For: "}{tx(sectorItem.name, lang)} · {tx(need.label, lang)}</p>
            <ul className="assistant-links">
              {need.expertises.map((slug) => {
                const e = expertises.find((item) => item.slug === slug)!;
                return <li key={slug}><Link to={`/expertises/${slug}`}>{tx(e.title, lang)}<ArrowRight size={16} /></Link></li>;
              })}
              <li><Link to={`/secteurs/${sectorItem.slug}`}>{fr ? "Enjeux du secteur : " : "Industry challenges: "}{tx(sectorItem.name, lang)}<ArrowRight size={16} /></Link></li>
            </ul>
            <div className="assistant-answer-actions">
              <ArrowLink to={`/soumission${query}`} light>{t("quote")}</ArrowLink>
              <ArrowLink to={`/consultation${query}`} light>{t("consult")}</ArrowLink>
              <ArrowLink to={`/tarifs#${solution.slug}`} light>{t("pricing")}</ArrowLink>
              <button type="button" className="text-button" onClick={() => { setSector(null); setNeedKey(null); }}><RotateCcw size={16} />{t("restart")}</button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
