import Link from 'next/link';
import { TrustBadge } from './TrustBadge';
import { LetterTile } from './LetterTile';
import { t } from '@/lib/i18n/t';
import type { AgencyCardProps } from '@/lib/types/agency';

interface Props extends AgencyCardProps {
  rank: number;
}

/**
 * Result card — 4-column editorial layout per design handoff.
 *   [#01] [Letter Tile 160x160] [Info: name/stars/tags/summary/meta] [CTA col 180px]
 *
 * Stretched-link pattern: an absolute <Link> covers the card; inner anchors
 * (phone tel:) sit at z-index 2 to remain independently clickable.
 *
 * Day 7 design constraints retained:
 *   - `isSponsored` slot reserved (always false in Day 7)
 *   - "View profile →" goes to /houston/[slug] (detail page Day 8)
 *   - Phone is a tel: link (NOT a "Call now" button)
 *   - NO "Request a quote" lead-gen CTA on sponsored cards
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
    agency.has_home_health_aide && 'Home Health Aide',
    agency.has_personal_care && 'Personal Care',
    agency.has_companion_care && 'Companion Care',
    agency.has_physical_therapy && 'Physical Therapy',
    agency.has_occupational_therapy && 'Occupational Therapy',
    agency.has_speech_therapy && 'Speech Therapy',
    agency.has_dementia_care && 'Dementia Care',
    agency.has_hospice && 'Hospice',
  ].filter(Boolean) as string[];

  const allTags = [...langs, ...insurance, ...services];
  const visibleTags = allTags.slice(0, 5);
  const moreCount = allTags.length - visibleTags.length;

  return (
    <article className="result-card group">
      {/* Stretched link — entire card target */}
      <Link
        href={`/houston/${agency.slug}`}
        aria-label={agency.name}
        className="absolute inset-0 rounded-[12px] z-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ink)] focus-visible:ring-offset-2"
      />

      {/* Col 1 — Index */}
      <div className="result-index font-mono hidden md:block">
        {String(rank).padStart(2, '0')}
      </div>

      {/* Col 2 — Letter tile */}
      <div className="result-thumb relative z-[1] pointer-events-none">
        <LetterTile name={agency.name} size={160} fontSize={64} />
      </div>

      {/* Col 3 — Info */}
      <div className="result-info relative z-[2] pointer-events-none min-w-0">
        <div className="flex items-start justify-between gap-3 mb-2.5">
          <h3
            className="font-display text-[var(--ink)] leading-[1.15] tracking-[-0.01em]"
            style={{ fontSize: 22, fontWeight: 500 }}
          >
            <span className="font-mono text-[13px] text-[var(--ink-3)] mr-1.5 align-[2px]">
              {rank}.
            </span>
            {agency.name}
          </h3>
          {isSponsored && (
            <span className="eyebrow shrink-0 mt-1">{t('card.sponsored')}</span>
          )}
        </div>

        <TrustBadge
          cmsStar={agency.medicare_star}
          googleRating={agency.google_rating}
          googleReviews={agency.google_reviews_count}
        />

        {visibleTags.length > 0 && (
          <div className="mt-3 flex flex-wrap items-center gap-1.5">
            {visibleTags.map((tag) => (
              <span
                key={tag}
                className="text-[11.5px] px-2 py-0.5 border border-[var(--line)] rounded-full text-[var(--ink-2)] bg-white"
              >
                {tag}
              </span>
            ))}
            {moreCount > 0 && (
              <span className="text-[11.5px] text-[var(--ink-3)]">
                +{moreCount} more
              </span>
            )}
          </div>
        )}

        {agency.ai_summary && (
          <p className="mt-3.5 text-[14px] leading-[1.6] text-[var(--ink-2)] line-clamp-2">
            <span className="font-display italic text-[var(--ink-3)] mr-1" aria-hidden>
              &ldquo;
            </span>
            {agency.ai_summary}
          </p>
        )}

        {agency.phone && (
          <p className="mt-3 font-mono text-[12.5px] text-[var(--ink-3)]">
            <a
              href={`tel:${agency.phone}`}
              className="relative z-10 pointer-events-auto hover:text-[var(--ink)]"
            >
              {agency.phone}
            </a>
            {agency.zip && <span className="ml-2">· {agency.zip}</span>}
          </p>
        )}
      </div>

      {/* Col 4 — CTA */}
      <div className="result-cta relative z-[2] pointer-events-none">
        <Link
          href={`/houston/${agency.slug}`}
          className="pointer-events-auto inline-flex items-center justify-center h-11 rounded-[10px] bg-[var(--ink)] text-white text-[13px] font-medium hover:bg-black/90 transition-colors px-4"
        >
          View profile →
        </Link>
        {agency.phone && (
          <a
            href={`tel:${agency.phone}`}
            className="pointer-events-auto inline-flex items-center justify-center h-9 text-[12px] font-mono text-[var(--ink-2)] underline-offset-4 decoration-dotted hover:text-[var(--ink)] hover:underline"
          >
            Call now
          </a>
        )}
      </div>
    </article>
  );
}
