import { useLanguage } from "../i18n";

/**
 * Illustration of an AUREX performance dashboard. Every figure is invented for the picture and the caption says so:
 * it must never be read as a result obtained by a client.
 */
const revenue = [38, 41, 40, 46, 49, 53, 52, 58, 61, 66, 68, 74];
const cac = [100, 96, 97, 90, 86, 84, 80, 79, 75, 72];
const funnel = [100, 46, 21, 9];

export function DashboardPreview() {
  const { lang } = useLanguage();
  const fr = lang === "fr";
  const w = 360, h = 150;
  const max = Math.max(...revenue), min = Math.min(...revenue) - 8;
  const pts = revenue.map((v, i) => `${(i / (revenue.length - 1)) * w},${h - ((v - min) / (max - min)) * (h - 14) - 6}`);
  return (
    <figure className="dash" aria-labelledby="dash-caption">
      <div className="dash-top" aria-hidden="true"><span /><span /><span /><b>AUREX / {fr ? "Tableau de bord" : "Dashboard"}</b></div>
      <div className="dash-kpis" aria-hidden="true">
        {[["ROAS", "—"], ["CAC", "—"], [fr ? "Conversion" : "Conversion", "—"], [fr ? "Marge" : "Margin", "—"]].map(([label, value]) => <div key={label}><span>{label}</span><strong>{value}</strong><i /></div>)}
      </div>
      <div className="dash-grid" aria-hidden="true">
        <div className="dash-panel dash-wide">
          <p>{fr ? "Chiffre d’affaires mensuel (exemple)" : "Monthly revenue (example)"}</p>
          <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" role="img" aria-hidden="true">
            {[0.25, 0.5, 0.75].map((f) => <line key={f} x1="0" x2={w} y1={h * f} y2={h * f} stroke="currentColor" opacity=".12" />)}
            <polyline points={`0,${h} ${pts.join(" ")} ${w},${h}`} fill="var(--accent)" opacity=".12" />
            <polyline points={pts.join(" ")} fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeLinejoin="round" />
            <circle cx={pts[pts.length - 1].split(",")[0]} cy={pts[pts.length - 1].split(",")[1]} r="4.5" fill="var(--accent)" />
          </svg>
        </div>
        <div className="dash-panel">
          <p>{fr ? "Coût d’acquisition (exemple)" : "Acquisition cost (example)"}</p>
          <svg viewBox="0 0 160 110" preserveAspectRatio="none" aria-hidden="true">
            {cac.map((v, i) => <rect key={i} x={i * 16 + 2} y={110 - v} width="11" height={v} fill="currentColor" opacity={i === cac.length - 1 ? 0.9 : 0.25} />)}
          </svg>
        </div>
        <div className="dash-panel">
          <p>{fr ? "Entonnoir de conversion (exemple)" : "Conversion funnel (example)"}</p>
          <div className="dash-funnel">{funnel.map((v, i) => <span key={i} style={{ width: `${Math.max(v, 12)}%`, opacity: 1 - i * 0.18 }} />)}</div>
        </div>
      </div>
      <figcaption id="dash-caption">{fr ? "Illustration : données fictives, à titre d’exemple de tableau de bord. Ce ne sont pas des résultats de clients." : "Illustration: fictional data, shown as an example of a dashboard. These are not client results."}</figcaption>
    </figure>
  );
}
