import Link from 'next/link';
import { getAgenciesByCity } from '@/lib/supabase/queries';
import { LetterTile } from '@/components/agency/LetterTile';
import { StarRating } from '@/components/agency/StarRating';

/**
 * Yelp-style "Best of" featured row — top 4 agencies by trust score.
 * Server component, fetches at request time.
 *
 * Currently rendered on the home page anchored to Houston (our flagship
 * city). When other cities mature we can either rotate cities here or
 * make this a per-city component.
 */
export async function FeaturedRow() {
  const FEATURED_CITY = 'houston';
  const agencies = await getAgenciesByCity({
    citySlug: FEATURED_CITY,
    filters: { lang: [], ins: [], svc: [] },
  });
  const top = agencies.slice(0, 4);
  if (top.length === 0) return null;

  return (
    <section className="border-b border-[var(--line)] bg-[var(--bg-soft)]">
      <div className="mx-auto max-w-[1320px] px-6 lg:px-10 py-12 lg:py-16">
        <div className="flex items-baseline justify-between mb-6">
          <div className="flex items-baseline gap-3">
            <p className="eyebrow">Top rated in Houston</p>
            <span className="text-[var(--ink-4)]" aria-hidden>·</span>
            <span className="font-mono text-[12.5px] text-[var(--ink-3)]">
              by trust score
            </span>
          </div>
          <Link
            href="/houston"
            className="text-[12.5px] text-[var(--ink-2)] hover:text-[var(--ink)] underline-offset-3 hover:underline inline-flex items-center gap-1"
          >
            See all
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {top.map((a, i) => (
            <Link
              key={a.id}
              href={`/${(a.city ?? FEATURED_CITY).toLowerCase()}/${a.slug}`}
              className="group block bg-white border border-[var(--line)] rounded-[10px] p-5 hover:border-[var(--ink-3)] hover:shadow-[0_8px_24px_-12px_rgba(10,10,10,0.08)] transition-all"
            >
              <div className="flex items-start gap-3 mb-3">
                <LetterTile name={a.name} size={48} fontSize={20} />
                <span className="font-mono text-[11px] text-[var(--ink-3)] tabular-nums mt-1">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>

              <h4
                className="font-display text-[var(--ink)] leading-tight mb-2 group-hover:text-[var(--accent-on)] transition-colors"
                style={{ fontSize: 16, fontWeight: 500 }}
              >
                {a.name}
              </h4>

              {(a.medicare_star != null || a.google_rating != null) && (
                <div className="space-y-1">
                  {a.medicare_star != null && (
                    <div className="flex items-baseline gap-1.5">
                      <span className="font-display text-[14px] tabular-nums font-medium">
                        {a.medicare_star.toFixed(1)}
                      </span>
                      <StarRating value={a.medicare_star} size={11} />
                      <span className="eyebrow">CMS</span>
                    </div>
                  )}
                  {a.google_rating != null && (
                    <div className="flex items-baseline gap-1.5">
                      <span className="font-display text-[14px] tabular-nums font-medium">
                        {a.google_rating.toFixed(1)}
                      </span>
                      <StarRating value={a.google_rating} size={11} />
                      <span className="eyebrow">Google</span>
                      {a.google_reviews_count != null && a.google_reviews_count > 0 && (
                        <span className="font-mono text-[10.5px] text-[var(--ink-3)]">
                          · {a.google_reviews_count}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              )}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
