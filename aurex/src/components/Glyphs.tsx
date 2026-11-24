import type { ReactNode } from "react";

/**
 * Pictograms drawn for AUREX: one geometric language (square grid, 1.25 stroke, a single cobalt accent),
 * echoing the three-bar mark. Decorative: the adjacent text always carries the meaning.
 */
const A = "var(--accent)";

const paths: Record<string, ReactNode> = {
  // Expertises
  "identite-marque-communication": <><rect x="10" y="10" width="36" height="36" /><rect x="18" y="18" width="20" height="20" /><path d="M10 46 46 10" /><circle cx="46" cy="46" r="6" stroke={A} /></>,
  "developpement-web-transformation-numerique": <><rect x="6" y="10" width="52" height="40" /><path d="M6 20h52" /><circle cx="12" cy="15" r="1.4" /><circle cx="18" cy="15" r="1.4" /><rect x="14" y="28" width="16" height="14" stroke={A} /><path d="M38 30h14M38 36h14M38 42h8" /></>,
  "marketing-digital-publicite": <><circle cx="32" cy="32" r="6" stroke={A} /><circle cx="32" cy="32" r="14" /><circle cx="32" cy="32" r="22" /><path d="M32 10V4M32 60v-6M10 32H4M60 32h-6" /></>,
  "developpement-commercial-acquisition": <><path d="M8 12h48L40 30v18l-16 8V30z" /><path d="M16 12l12 14M48 12 36 26" stroke={A} /></>,
  "strategie-intelligence-economique": <><circle cx="14" cy="48" r="4" /><circle cx="32" cy="30" r="4" /><circle cx="50" cy="14" r="5" stroke={A} /><path d="M17 45l12-12M35 27l11-10" /><path d="M6 58h52M6 58V6" /></>,
  "performance-operationnelle-logistique": <><rect x="6" y="22" width="16" height="20" /><rect x="42" y="22" width="16" height="20" /><path d="M22 28h20M22 36h20" /><path d="M38 24l4 4-4 4M26 32l-4 4 4 4" stroke={A} /><path d="M32 8v8M32 48v8" /></>,
  "intelligence-artificielle-automatisation": <><circle cx="12" cy="14" r="3" /><circle cx="12" cy="32" r="3" /><circle cx="12" cy="50" r="3" /><circle cx="32" cy="23" r="3" /><circle cx="32" cy="41" r="3" /><circle cx="52" cy="32" r="5" stroke={A} /><path d="M15 14l14 9M15 32l14-9M15 32l14 9M15 50l14-9M35 23l13 7M35 41l13-7" /></>,
  "conseil-accompagnement-entreprises": <><circle cx="24" cy="32" r="16" /><circle cx="40" cy="32" r="16" stroke={A} /><path d="M32 18v28" /></>,
  "analyse-marche": <><circle cx="26" cy="26" r="16" /><path d="M38 38l18 18" stroke={A} strokeWidth="2.5" /><path d="M16 32v-6M24 32V20M32 32v-9" /></>,
  "logistique-boite": <><path d="M6 20 32 8l26 12v24L32 56 6 44z" /><path d="M6 20l26 12 26-12M32 32v24" stroke={A} /></>,
  // Offers
  launch: <><path d="M32 6 48 40H16z" /><path d="M32 6v52" stroke={A} /><path d="M10 58h44" /></>,
  digital: <><rect x="8" y="8" width="20" height="20" /><rect x="36" y="8" width="20" height="20" stroke={A} /><rect x="8" y="36" width="20" height="20" /><rect x="36" y="36" width="20" height="20" /></>,
  growth: <><rect x="8" y="38" width="12" height="18" /><rect x="26" y="26" width="12" height="30" /><rect x="44" y="10" width="12" height="46" stroke={A} /></>,
  performance: <><path d="M8 46a24 24 0 0 1 48 0" /><path d="M32 46 44 24" stroke={A} /><circle cx="32" cy="46" r="3" /><path d="M8 54h48" /></>,
  intelligence: <><circle cx="32" cy="32" r="22" /><circle cx="32" cy="32" r="5" stroke={A} /><path d="M32 10v17M32 37v17M10 32h17M37 32h17" /></>,
  "360": <><circle cx="32" cy="32" r="22" /><path d="M32 10a22 22 0 0 1 19 11" stroke={A} strokeWidth="2.5" /><path d="M51 21l-1-8-8 2" stroke={A} /><circle cx="32" cy="32" r="8" /></>,
};

/** Names used across the site mapped onto the drawn set. */
const alias: Record<string, string> = {
  "marketing-strategique-numerique": "marketing-digital-publicite",
  "customer-marketing-experience-client": "conseil-accompagnement-entreprises",
  "publicite-numerique-ppc": "developpement-commercial-acquisition",
  "sites-web-solutions-numeriques": "developpement-web-transformation-numerique",
  "conseil-strategique-analyse-affaires": "strategie-intelligence-economique",
  "analyse-marche-intelligence-economique": "analyse-marche",
  "solutions-operationnelles": "performance-operationnelle-logistique",
  "logistique-chaine-approvisionnement": "logistique-boite",
  "creation-developpement-croissance": "growth",
  strategy: "strategie-intelligence-economique", marketing: "marketing-digital-publicite", digital: "digital",
  operations: "performance-operationnelle-logistique", logistics: "logistique-boite", growth: "growth", ai: "intelligence-artificielle-automatisation",
  essentiel: "launch", performance: "growth", business: "performance", enterprise: "360",
  "ai-start": "intelligence", "ai-business": "digital", "ai-performance": "performance", "ai-enterprise": "360",
};

export function Glyph({ name, size = 48 }: { name: string; size?: number }) {
  const shape = paths[alias[name] ?? name] ?? paths[name];
  if (!shape) return null;
  return (
    <svg className="glyph" width={size} height={size} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="square" strokeLinejoin="miter" aria-hidden="true" focusable="false">
      {shape}
    </svg>
  );
}
