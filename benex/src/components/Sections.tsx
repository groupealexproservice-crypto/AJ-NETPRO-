import type { ReactNode } from "react";
import { ArrowDown } from "lucide-react";
import { useLanguage } from "../i18n";
import { ArrowLink } from "./Layout";

export function SectionHeading({ eyebrow, title, text, action }: { eyebrow: string; title: string; text?: string; action?: ReactNode }) {
  return (
    <div className="section-heading">
      <p className="eyebrow">{eyebrow}</p>
      <div className="section-heading-row">
        <h2>{title}</h2>
        {text && <p>{text}</p>}
        {action}
      </div>
    </div>
  );
}

export function PageHero({ eyebrow, title, text, children }: { eyebrow: string; title: string; text: string; children?: ReactNode }) {
  return (
    <section className="page-hero">
      <div className="shell page-hero-grid">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <div className="page-hero-intro">
          <p>{text}</p>
          {children}
        </div>
        <ArrowDown className="page-hero-arrow" size={28} strokeWidth={1} aria-hidden="true" />
      </div>
    </section>
  );
}

export function CtaBand() {
  const { lang, t } = useLanguage();
  return (
    <section className="cta-band">
      <div className="shell cta-band-inner">
        <p className="eyebrow">BENEX / 360</p>
        <h2>{lang === "fr" ? "Votre prochaine étape mérite une vue d’ensemble." : "Your next step deserves a comprehensive view."}</h2>
        <p>{lang === "fr" ? "Commencez par un diagnostic structuré. Nous vous aiderons à hiérarchiser les enjeux avant de définir les solutions." : "Start with a structured diagnostic. We will help you prioritize the issues before defining solutions."}</p>
        <ArrowLink to="/diagnostic" light>{t("diagnostic")}</ArrowLink>
      </div>
    </section>
  );
}
