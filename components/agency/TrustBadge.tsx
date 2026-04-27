import { t } from '@/lib/i18n/t';

interface Props {
  cmsStar: number | null;
  googleRating: number | null;
  googleReviews: number | null;
}

export function TrustBadge({ cmsStar, googleRating, googleReviews }: Props) {
  if (cmsStar == null && googleRating == null) return null;

  return (
    <div className="flex flex-wrap gap-3 text-sm">
      {cmsStar != null && (
        <div className="flex items-center gap-1">
          <span className="text-slate-500">{t('card.cmsRating')}</span>
          <span className="font-semibold text-slate-900">{cmsStar.toFixed(1)} ★</span>
        </div>
      )}
      {googleRating != null && (
        <div className="flex items-center gap-1">
          <span className="text-slate-500">{t('card.googleRating')}</span>
          <span className="font-semibold text-slate-900">{googleRating.toFixed(1)} ★</span>
          {googleReviews != null && (
            <span className="text-slate-400 text-xs">
              ({t('card.reviews', { n: googleReviews })})
            </span>
          )}
        </div>
      )}
    </div>
  );
}
