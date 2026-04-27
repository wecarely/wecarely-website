import { StarRating } from './StarRating';

interface Props {
  cmsStar: number | null;
  googleRating: number | null;
  googleReviews: number | null;
}

/**
 * Inline trust strip used inside AgencyCard.
 *   ★★★★★ 5.0 CMS  ·  ★★★★★ 4.7 GOOGLE · 25
 * All values are tabular; the eyebrow source label uses mono caps.
 */
export function TrustBadge({ cmsStar, googleRating, googleReviews }: Props) {
  if (cmsStar == null && googleRating == null) return null;

  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[13px]">
      {cmsStar != null && (
        <span className="inline-flex items-center gap-1.5">
          <StarRating value={cmsStar} size={12} />
          <span className="font-display tabular-nums text-[var(--ink)]" style={{ fontSize: 14 }}>
            {cmsStar.toFixed(1)}
          </span>
          <span className="eyebrow">CMS</span>
        </span>
      )}
      {googleRating != null && (
        <>
          {cmsStar != null && (
            <span className="text-[var(--ink-4)] select-none" aria-hidden>·</span>
          )}
          <span className="inline-flex items-center gap-1.5">
            <StarRating value={googleRating} size={12} />
            <span className="font-display tabular-nums text-[var(--ink)]" style={{ fontSize: 14 }}>
              {googleRating.toFixed(1)}
            </span>
            <span className="eyebrow">Google</span>
            {googleReviews != null && googleReviews > 0 && (
              <span className="font-mono text-[12px] text-[var(--ink-3)]">
                · {googleReviews}
              </span>
            )}
          </span>
        </>
      )}
    </div>
  );
}
