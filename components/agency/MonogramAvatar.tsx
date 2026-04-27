/**
 * Generate a stable accent color from a string + render initials.
 * Used as a thumbnail proxy on agency cards (we don't have real photos in Day 7).
 */
const PALETTE = [
  { bg: '#1f4332', fg: '#e8efe9' }, // forest
  { bg: '#5b3a1f', fg: '#f4e9d6' }, // earth
  { bg: '#2c4a5c', fg: '#dee9ef' }, // teal-deep
  { bg: '#6b3a52', fg: '#f0dfe7' }, // plum
  { bg: '#3d4a2c', fg: '#e6ecd8' }, // olive
  { bg: '#4a2c2c', fg: '#f0dada' }, // burgundy-soft
];

function pick(name: string) {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) >>> 0;
  return PALETTE[h % PALETTE.length];
}

function initials(name: string) {
  const parts = name
    .replace(/[^A-Za-z\s]/g, '')
    .trim()
    .split(/\s+/)
    .filter((p) => !['Of', 'And', 'The', 'Inc', 'Llc', 'Ltd'].includes(p));
  const first = parts[0]?.[0] ?? '';
  const second = parts[1]?.[0] ?? '';
  return (first + second).toUpperCase() || name.slice(0, 2).toUpperCase();
}

export function MonogramAvatar({ name, size = 64 }: { name: string; size?: number }) {
  const { bg, fg } = pick(name);
  const text = initials(name);
  return (
    <div
      className="rounded-lg flex items-center justify-center font-display tracking-tight shrink-0"
      style={{
        width: size,
        height: size,
        background: bg,
        color: fg,
        fontSize: size * 0.36,
        fontWeight: 600,
      }}
      aria-hidden
    >
      {text}
    </div>
  );
}
