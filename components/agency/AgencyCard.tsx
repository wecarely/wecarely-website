import Link from 'next/link';
import { TrustBadge } from './TrustBadge';
import { t } from '@/lib/i18n/t';
import type { AgencyCardProps } from '@/lib/types/agency';

/**
 * Minimal premium card.
 *   Agency Name                                    [Sponsored]
 *   4.5 ★★★★★ CMS    4.2 ★★★★★ Google · 87
 *   Plain summary (max 2 lines, sans-serif).
 *   Spanish · Medicare · Medicaid · Skilled Nursing · ...
 *   ─────────────────────────────────────────────
 *   (713) 555-0100                          View →
 *
 * White card on white-ish bg, hairline border, generous padding.
 */
export function AgencyCard({ agency, isSponsored = false }: AgencyCardProps) {
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
    agency.has_home_health_aide && 'Home Health Aide',
    agency.has_personal_care && 'Personal Care',
    agency.has_companion_care && 'Companion Care',
    agency.has_physical_therapy && 'Physical Therapy',
    agency.has_occupational_therapy && 'Occupational Therapy',
    agency.has_speech_therapy && 'Speech Therapy',
    agency.has_dementia_care && 'Dementia Care',
    agency.has_hospice && 'Hospice',
  ].filter(Boolean) as string[];

  const tags = [...langs, ...insurance, ...services];

  return (
    <article className="group relative bg-[var(--bg)] border border-[var(--line)] rounded-[10px] p-7 md:p-8 transition-all duration-200 hover:border-[var(--ink-3)] hover:shadow-[0_8px_24px_-12px_rgba(10,10,10,0.08)]">
      <Link
        href={`/houston/${agency.slug}`}
        aria-label={agency.name}
        className="absolute inset-0 rounded-[10px] z-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2"
      />

      <div className="relative z-10 pointer-events-none">
        {/* Name row */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <h3
            className="font-display font-medium text-[20px] leading-[1.2] tracking-[-0.015em] text-[var(--ink)] group-hover:text-[var(--accent)] transition-colors flex-1"
            style={{ fontVariationSettings: '"opsz" 32, "SOFT" 0' }}
          >
            {agency.name}
          </h3>
          {isSponsored && (
            <span className="eyebrow text-[var(--ink-3)] shrink-0">
              {t('card.sponsored')}
            </span>
          )}
        </div>

        {/* Trust */}
        <TrustBadge
          cmsStar={agency.medicare_star}
          googleRating={agency.google_rating}
          googleReviews={agency.google_reviews_count}
        />

        {/* Summary */}
        {agency.ai_summary && (
          <p className="mt-5 text-[14.5px] leading-[1.6] text-[var(--ink-2)] line-clamp-2">
            {agency.ai_summary}
          </p>
        )}

        {/* Tags */}
        {tags.length > 0 && (
          <div className="mt-5 flex flex-wrap items-center gap-x-2.5 gap-y-1">
            {tags.map((tag, i) => (
              <span
                key={tag}
                className="text-[12.5px] text-[var(--ink-2)] inline-flex items-center"
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

        {/* Footer */}
        <div className="mt-7 pt-5 border-t border-[var(--line-soft)] flex items-center justify-between text-[13px]">
          {agency.phone ? (
            <a
              href={`tel:${agency.phone}`}
              className="relative z-10 pointer-events-auto text-[var(--ink-2)] tabular-nums hover:text-[var(--accent)]"
            >
              {agency.phone}
            </a>
          ) : (
            <span />
          )}
          <span className="font-medium text-[var(--accent)] group-hover:underline underline-offset-4">
            View →
          </span>
        </div>
      </div>
    </article>
  );
}
