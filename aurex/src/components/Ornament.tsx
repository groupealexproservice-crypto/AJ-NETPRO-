/**
 * Decorative architectural drawing for page headers: fine construction lines, rising towers, one cobalt volume.
 * Purely ornamental (aria-hidden); three compositions so neighbouring pages do not look identical.
 */
const compositions = {
  a: { bars: [[40, 150], [130, 110], [220, 70], [310, 30]], accent: 3 },
  b: { bars: [[40, 90], [130, 140], [220, 50], [310, 110]], accent: 2 },
  c: { bars: [[40, 60], [130, 100], [220, 140], [310, 40]], accent: 1 },
} as const;

export function Ornament({ variant = "a" }: { variant?: keyof typeof compositions }) {
  const { bars, accent } = compositions[variant];
  return (
    <svg className="ornament" viewBox="0 0 420 300" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true" focusable="false">
      <path d="M0 270H420" />
      {[60, 120, 180, 240].map((y) => <path key={y} d={`M0 ${y}H420`} opacity=".25" />)}
      {[90, 180, 270, 360].map((x) => <path key={x} d={`M${x} 0V270`} opacity=".25" />)}
      <path d="M0 270 420 30M0 210 300 30" opacity=".4" />
      {bars.map(([x, h], index) => {
        const height = h + 60;
        const isAccent = index === accent;
        return (
          <g key={x}>
            <rect x={x} y={270 - height} width="56" height={height} fill={isAccent ? "var(--accent)" : "none"} stroke={isAccent ? "var(--accent)" : "currentColor"} />
            <path d={`M${x} ${270 - height}l14-14h56l-14 14M${x + 56} ${270 - height}l14-14v${height}l-14 14`} opacity={isAccent ? 0.9 : 0.55} stroke={isAccent ? "var(--accent)" : "currentColor"} />
          </g>
        );
      })}
      <circle cx="372" cy="46" r="22" opacity=".5" />
      <circle cx="372" cy="46" r="3" fill="var(--accent)" stroke="none" />
    </svg>
  );
}
