import { StarRating } from './StarRating';

interface Props {
  cmsStar: number | null;
  googleRating: number | null;
  googleReviews: number | null;
}

function TrustCell({
  label,
  value,
  reviews,
}: {
  label: string;
  value: number;
  reviews?: number | null;
}) {
  return (
    <div className="flex items-baseline gap-2">
      <span
        className="font-display text-[18px] tabular-nums text-[var(--ink)]"
        style={{ fontVariationSettings: '"opsz" 24, "SOFT" 30' }}
      >
        {value.toFixed(1)}
      </span>
      <StarRating value={value} size={11} />
      <span className="eyebrow">
        {label}
        {reviews ? ` · ${reviews}` : ''}
      </span>
    </div>
  );
}

export function TrustBadge({ cmsStar, googleRating, googleReviews }: Props) {
  if (cmsStar == null && googleRating == null) return null;

  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
      {cmsStar != null && <TrustCell label="CMS" value={cmsStar} />}
      {cmsStar != null && googleRating != null && (
        <span className="text-[var(--ink-4)] text-sm select-none" aria-hidden>
          ⁂
        </span>
      )}
      {googleRating != null && (
        <TrustCell label="Google" value={googleRating} reviews={googleReviews} />
      )}
    </div>
  );
}
