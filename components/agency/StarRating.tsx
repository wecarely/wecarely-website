/**
 * Visual 5-star rating with partial fill for fractional values.
 * Uses gold token. Size param sets the font size in px.
 */
export function StarRating({ value, size = 12 }: { value: number; size?: number }) {
  const pct = (Math.max(0, Math.min(5, value)) / 5) * 100;
  return (
    <span
      role="img"
      aria-label={`${value.toFixed(1)} out of 5 stars`}
      className="relative inline-block leading-none align-middle"
      style={{ fontSize: size, lineHeight: 1 }}
    >
      <span className="text-[var(--ink-4)] tracking-[1px]">★★★★★</span>
      <span
        className="absolute inset-0 overflow-hidden text-[var(--gold)] tracking-[1px]"
        style={{ width: `${pct}%` }}
        aria-hidden
      >
        ★★★★★
      </span>
    </span>
  );
}
