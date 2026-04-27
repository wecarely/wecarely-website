/**
 * Visual 5-star rating using the .stars CSS technique:
 * a single inline element with two ★★★★★ strings stacked,
 * the foreground (gold) clipped by width via --pct CSS var.
 */
export function StarRating({
  value,
  size = 13,
}: {
  value: number;
  size?: number;
}) {
  const pct = (Math.max(0, Math.min(5, value)) / 5) * 100;
  return (
    <span
      className="stars"
      role="img"
      aria-label={`${value.toFixed(1)} out of 5 stars`}
      style={
        {
          fontSize: size,
          ['--pct' as string]: `${pct}%`,
        } as React.CSSProperties
      }
    >
      <i></i>
    </span>
  );
}
