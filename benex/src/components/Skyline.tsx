/**
 * Stylized Montréal skyline in BENEX's line language: Mont Royal's curve, a cruciform tower, a pyramid-roofed tower,
 * a geodesic sphere and an inclined tower. Abstract and decorative (aria-hidden), not a map or a claim of any location.
 */
export function Skyline({ className = "" }: { className?: string }) {
  return (
    <svg className={`skyline ${className}`} viewBox="0 0 1200 220" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true" focusable="false" preserveAspectRatio="xMidYMax meet">
      <path d="M0 200H1200" opacity=".6" />
      <path d="M0 200C140 130 300 96 470 110S760 170 860 200" opacity=".45" />
      {/* Mont Royal cross */}
      <path d="M330 88V70M322 78H338" opacity=".7" />
      {/* Cruciform tower */}
      <path d="M520 200V54h10V40h12V28h18v12h12v14h10v146" />
      <path d="M520 84h50M520 120h50M520 156h50" opacity=".35" />
      <path d="M545 28V10" stroke="var(--accent)" strokeWidth="2" />
      {/* Pyramid-roofed tower */}
      <path d="M610 200V92h44V200M610 92 632 52 654 92" />
      <path d="M610 130h44M610 166h44" opacity=".35" />
      {/* Mid-rise blocks */}
      <path d="M670 200V120h34v80M704 200V104h26v96M730 200V132h40v68" opacity=".7" />
      <path d="M440 200V140h36v60M476 200V124h30v60" opacity=".55" />
      {/* Geodesic sphere */}
      <circle cx="910" cy="152" r="48" opacity=".9" />
      <path d="M862 152h96M910 104v96M876 118c20 20 52 20 68 0M876 186c20-20 52-20 68 0" opacity=".4" />
      {/* Inclined tower */}
      <path d="M1040 200l54-148 14 5-54 143z" stroke="var(--accent)" strokeWidth="1.6" />
      <path d="M1094 52l8-24" stroke="var(--accent)" strokeWidth="1.6" />
      {/* Bridge */}
      <path d="M770 200C830 150 870 150 930 200" opacity=".25" />
    </svg>
  );
}
