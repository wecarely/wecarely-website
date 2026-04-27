import Link from 'next/link';
import { TrustBadge } from './TrustBadge';
import { t } from '@/lib/i18n/t';
import type { AgencyCardProps } from '@/lib/types/agency';

interface Props extends AgencyCardProps {
  rank: number;
}

/**
 * Editorial entry card. Layout:
 *   01.  Agency Name [Sponsored]
 *        4.5 ★★★★★ CMS  ⁂  4.2 ★★★★★ Google · 87
 *        Italic deck-style summary in serif (max 2 lines).
 *        Spanish · Medicaid · Dementia Care
 *        ───────────────────────────────────
 *        (713) 555-0100              Read profile →
 *
 * Uses the "stretched link" pattern: card itself is <article>,
 * an absolutely-positioned <Link> covers the whole card for the main
 * navigation target. Inner anchors (phone) sit at z-10 and take precedence.
 *
 * Inner content aligns to the agency NAME column (pl-11 on rows below header).
 */
export function AgencyCard({ agency, isSponsored = false, rank }: Props) {
  const langs = [
    agency.has_spanish && 'Spanish',
    agency.has_vietnamese && 'Vietnamese',
    agency.has_chinese && 'Chinese',
  ].filter(Boolean) as string[];

  const insurance = [
    agency.accepts_medicare && 'Medicare',
    agency.accepts_medicaid && 'Medicaid',
  ].filter(Boolean) as string[];

  const services = [
    agency.has_skilled_nursing && 'Skilled Nursing',
    agency.has_dementia_care && 'Dementia Care',
    agency.has_hospice && 'Hospice',
  ].filter(Boolean) as string[];

  const tags = [...langs, ...insurance, ...services];

  return (
    <article className="group relative bg-[var(--paper-card)] border border-[var(--line)] rounded-[6px] p-7 md:p-8 transition-all duration-200 hover:border-[var(--ink-3)] hover:shadow-[0_12px_32px_-16px_rgba(26,31,27,0.18)]">
      {/* Stretched link covers entire card (focus-visible only on inner anchors below) */}
      <Link
        href={`/houston/${agency.slug}`}
        aria-label={agency.name}
        className="absolute inset-0 rounded-[6px] z-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--forest)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--paper)]"
      />

      {/* All actual content sits at z-10 to allow inner clickable anchors */}
      <div className="relative z-10 pointer-events-none">
        {/* Top row: rank + name + sponsored slot */}
        <div className="flex items-baseline gap-4 mb-5">
          <span
            className="font-display italic text-[15px] text-[var(--ink-3)] tabular-nums shrink-0 w-7"
            style={{ fontVariationSettings: '"opsz" 14, "SOFT" 30' }}
          >
            {String(rank).padStart(2, '0')}.
          </span>
          <h3
            className="font-display font-medium text-[22px] leading-[1.15] tracking-[-0.015em] text-[var(--ink)] group-hover:text-[var(--forest)] transition-colors flex-1"
            style={{ fontVariationSettings: '"opsz" 36, "SOFT" 30' }}
          >
            {agency.name}
          </h3>
          {isSponsored && (
            <span className="eyebrow text-[var(--ink-3)] border border-[var(--line)] rounded-[3px] px-2 py-0.5 shrink-0">
              {t('card.sponsored')}
            </span>
          )}
        </div>

        {/* Trust strip */}
        <div className="pl-11">
          <TrustBadge
            cmsStar={agency.medicare_star}
            googleRating={agency.google_rating}
            googleReviews={agency.google_reviews_count}
          />
        </div>

        {/* Italic deck summary */}
        {agency.ai_summary && (
          <p
            className="mt-5 pl-11 font-display italic text-[15.5px] leading-[1.55] text-[var(--ink-2)] line-clamp-2"
            style={{ fontVariationSettings: '"opsz" 18, "SOFT" 30' }}
          >
            {agency.ai_summary}
          </p>
        )}

        {/* Tags */}
        {tags.length > 0 && (
          <div className="mt-5 pl-11 flex flex-wrap items-center gap-x-2.5 gap-y-1">
            {tags.map((tag, i) => (
              <span
                key={tag}
                className="text-[12px] text-[var(--ink-2)] inline-flex items-center"
              >
                {i > 0 && (
                  <span className="text-[var(--ink-4)] mr-2.5" aria-hidden>
                    ·
                  </span>
                )}
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Footer row */}
        <div className="mt-6 pt-5 pl-11 border-t border-[var(--line-soft)] flex items-center justify-between text-[13px]">
          {agency.phone ? (
            <a
              href={`tel:${agency.phone}`}
              className="relative z-10 pointer-events-auto text-[var(--ink-2)] tabular-nums hover:text-[var(--forest)]"
            >
              {agency.phone}
            </a>
          ) : (
            <span />
          )}
          <span className="font-medium text-[var(--forest)] group-hover:underline underline-offset-4">
            Read profile →
          </span>
        </div>
      </div>
    </article>
  );
}
