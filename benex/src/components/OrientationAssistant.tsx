import { useState } from "react";
import { ArrowRight, RotateCcw, Sparkles } from "lucide-react";
import { tx } from "../content";
import { useLanguage } from "../i18n";
import { useSolutions } from "../hooks/useSolutions";
import { ArrowLink } from "./Layout";

const options = [
  { key: "launchQuestion", slug: "launch" },
  { key: "digitalQuestion", slug: "digital" },
  { key: "growthQuestion", slug: "growth" },
  { key: "performanceQuestion", slug: "performance" },
  { key: "intelligenceQuestion", slug: "intelligence" },
  { key: "globalQuestion", slug: "360" },
];

export function OrientationAssistant() {
  const { lang, t } = useLanguage();
  const [selected, setSelected] = useState<string | null>(null);
  const displaySolutions = useSolutions();
  const solution = displaySolutions.find((item) => item.slug === selected);

  return (
    <section className="assistant-section shell" aria-labelledby="assistant-title">
      <div className="assistant-heading">
        <Sparkles size={28} strokeWidth={1.25} aria-hidden="true" />
        <div>
          <p className="eyebrow">BENEX Navigator</p>
          <h2 id="assistant-title">{t("assistant")}</h2>
          <p>{t("assistantIntro")}</p>
        </div>
      </div>
      <div className="assistant-conversation" aria-live="polite">
        {!solution ? (
          <div className="assistant-options">
            {options.map((option) => (
              <button key={option.slug} type="button" onClick={() => setSelected(option.slug)}>
                {t(option.key)}<ArrowRight size={17} />
              </button>
            ))}
          </div>
        ) : (
          <div className="assistant-answer">
            <p className="eyebrow">{t("recommended")}</p>
            <h3>{solution.name}</h3>
            <p>{tx(solution.summary, lang)}</p>
            <div className="assistant-answer-actions">
              <ArrowLink to={`/solutions/${solution.slug}`}>{t("learnMore")}</ArrowLink>
              <ArrowLink to={`/soumission?solution=${solution.slug}`}>{t("quote")}</ArrowLink>
              <ArrowLink to={`/consultation?solution=${solution.slug}`}>{t("consult")}</ArrowLink>
              <button type="button" className="text-button" onClick={() => setSelected(null)}><RotateCcw size={16} />{t("restart")}</button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
