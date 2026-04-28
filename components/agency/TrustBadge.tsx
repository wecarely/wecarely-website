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
      <span className="font-display text-[18px] tabular-nums text-[var(--ink)] font-medium">
        {value.toFixed(1)}
      </span>
      <StarRating value={value} size={13} />
      {reviews != null && reviews > 0 ? (
        <span className="text-[12.5px] text-[var(--ink-2)]">
          from{' '}
          <span className="font-mono tabular-nums text-[var(--ink)] font-medium">
            {reviews}
          </span>{' '}
          {label} {reviews === 1 ? 'review' : 'reviews'}
        </span>
      ) : (
        <span className="eyebrow ml-1">{label}</span>
      )}
    </div>
  );
}

export function TrustBadge({ cmsStar, googleRating, googleReviews }: Props) {
  if (cmsStar == null && googleRating == null) return null;

  return (
    <div className="space-y-1.5">
      {cmsStar != null && <TrustCell label="CMS" value={cmsStar} />}
      {googleRating != null && (
        <TrustCell label="Google" value={googleRating} reviews={googleReviews} />
      )}
    </div>
  );
}
