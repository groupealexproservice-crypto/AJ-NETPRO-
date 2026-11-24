import { ShieldCheck } from "lucide-react";
import { trustKinds, trustLabels, tx } from "../content";
import { useLanguage } from "../i18n";
import { trpc } from "../providers/trpc";
import { ArrowLink } from "./Layout";

/**
 * Credibility area. It shows only what has been verified and published in the administration.
 * Without any verified item, it states the firm's transparency commitment instead of an empty showcase.
 */
export function TrustSection() {
  const { lang, t } = useLanguage();
  const fr = lang === "fr";
  const { data: items = [] } = trpc.content.trust.useQuery();
  const { data: studies = [] } = trpc.content.publishedCaseStudies.useQuery();
  const groups = trustKinds.map((kind) => ({ kind, entries: items.filter((item) => item.kind === kind) })).filter((group) => group.entries.length);

  return (
    <section className="trust-section section" aria-labelledby="trust-title">
      <div className="shell">
        <div className="trust-head">
          <ShieldCheck size={32} strokeWidth={1.2} aria-hidden="true" />
          <div>
            <p className="eyebrow">{fr ? "Crédibilité et confiance" : "Credibility and trust"}</p>
            <h2 id="trust-title">{fr ? "Seulement ce qui est vrai, vérifié et autorisé." : "Only what is true, verified and authorized."}</h2>
            <p>{fr ? "Nous ne publions aucun client, témoignage, partenaire, certification ni résultat sans preuve et sans l’accord des personnes concernées. Vos renseignements sont traités de façon confidentielle." : "We publish no client, testimonial, partner, certification or result without proof and the consent of the people concerned. Your information is handled confidentially."}</p>
          </div>
        </div>
        {(groups.length > 0 || studies.length > 0) && (
          <div className="trust-groups">
            {studies.length > 0 && <div><h3>{fr ? "Études de cas" : "Case studies"}</h3><ul>{studies.slice(0, 3).map((s) => <li key={s.id}>{fr ? s.titleFr : s.titleEn}</li>)}</ul><ArrowLink to="/etudes-de-cas">{t("viewAll")}</ArrowLink></div>}
            {groups.map(({ kind, entries }) => (
              <div key={kind}>
                <h3>{tx(trustLabels[kind], lang)}</h3>
                <ul>{entries.map((entry) => (
                  <li key={entry.id}>
                    <strong>{fr ? entry.titleFr : entry.titleEn}</strong>
                    {(entry.name || entry.role) && <span>{[entry.name, entry.role].filter(Boolean).join(", ")}</span>}
                    {(fr ? entry.bodyFr : entry.bodyEn) && <p>{fr ? entry.bodyFr : entry.bodyEn}</p>}
                  </li>
                ))}</ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
