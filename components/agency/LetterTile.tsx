/**
 * LetterTile — agency thumbnail proxy when no real photo exists.
 * Background hue is deterministic from the agency name (hash → oklch),
 * giving each agency a subtle but consistent visual identity.
 */
function hashToHue(name: string): number {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) | 0;
  return Math.abs(h) % 360;
}

export function LetterTile({
  name,
  size = 80,
  fontSize,
}: {
  name: string;
  size?: number;
  fontSize?: number;
}) {
  const initial = (name || '?').trim()[0]?.toUpperCase() || '?';
  const hue = hashToHue(name || '');
  const bg = `oklch(96% 0.025 ${hue})`;
  const ink = `oklch(38% 0.06 ${hue})`;

  return (
    <div
      className="letter-tile"
      style={{ width: size, height: size, background: bg }}
      aria-hidden
    >
      <span style={{ color: ink, fontSize: fontSize ?? Math.round(size * 0.45) }}>
        {initial}
      </span>
    </div>
  );
}
