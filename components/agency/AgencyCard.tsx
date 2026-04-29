import Link from 'next/link';
import { TrustBadge } from './TrustBadge';
import { LetterTile } from './LetterTile';
import { t } from '@/lib/i18n/t';
import type { AgencyCardProps } from '@/lib/types/agency';

interface Props extends AgencyCardProps {
  rank: number;
}

/**
 * Result card — 3-column editorial layout.
 *   [#01] [LetterTile 180px] [Info: name / trust / tags / description / phone]
 *
 * Stretched-link pattern: an absolute <Link> covers the card; inner anchors
 * (phone tel:, Read on Google) sit at z-index 2 to remain independently clickable.
 *
 * Day 7 design constraints retained:
 *   - `isSponsored` slot reserved (always false in Day 7 — no paying agencies yet)
 *   - Phone is a tel: link (NOT a "Call now" button)
 *   - NO "Request a quote" lead-gen CTA
 *   - "Description" eyebrow makes clear the summary is NOT a user review
 *   - Reviews live on Google — we link out, we don't aggregate text
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
  const visibleTags = allTags.slice(0, 6);
  const moreCount = allTags.length - visibleTags.length;

  // Build a Google search URL that lands on the agency's Google place card.
  // We don't have place_id stored, so we approximate via name + city.
  const googleQuery = encodeURIComponent(`${agency.name} ${agency.city ?? 'Houston'} TX`);
  const googleUrl = `https://www.google.com/search?q=${googleQuery}`;

  return (
    <article className="result-card group">
      {/* Stretched link — entire card target */}
      <Link
        href={`/houston/${agency.slug}`}
        aria-label={agency.name}
        className="absolute inset-0 rounded-[12px] z-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ink)] focus-visible:ring-offset-2"
      />

      {/* Col 1 — Index */}
      <div className="result-index font-mono hidden md:block text-[13px] text-[var(--ink-3)] tabular-nums pt-2">
        {String(rank).padStart(2, '0')}
      </div>

      {/* Col 2 — Letter tile */}
      <div className="result-thumb relative z-[1] pointer-events-none">
        <LetterTile name={agency.name} size={180} fontSize={72} />
      </div>

      {/* Col 3 — Info */}
      <div className="result-info relative z-[2] pointer-events-none min-w-0">
        <div className="flex items-start justify-between gap-3 mb-3">
          <h3
            className="font-display text-[var(--ink)] leading-[1.15] tracking-[-0.01em]"
            style={{ fontSize: 24, fontWeight: 500 }}
          >
            <span className="font-mono text-[13px] text-[var(--ink-3)] mr-2 align-[3px]">
              {rank}.
            </span>
            {agency.name}
          </h3>
          {isSponsored && (
            <span
              className="shrink-0 mt-1 inline-flex items-center gap-1 px-2 py-0.5 rounded-[3px] border text-[10.5px] font-mono font-semibold tracking-[0.14em] uppercase"
              style={{
                color: 'var(--ink-2)',
                borderColor: 'var(--line-strong)',
                background: 'var(--bg-soft)',
              }}
              title="Paid placement — clearly labeled, does not affect default ranking"
            >
              {t('card.sponsored')}
            </span>
          )}
        </div>

        {/* Address line — disambiguates same-name listings (e.g. chain agencies
            with multiple Houston locations) and gives families a quick sense
            of distance before clicking. */}
        {agency.address && (
          <p className="text-[12.5px] text-[var(--ink-3)] -mt-1 mb-3 truncate">
            {agency.address}
          </p>
        )}

        <TrustBadge
          cmsStar={agency.medicare_star}
          googleRating={agency.google_rating}
          googleReviews={agency.google_reviews_count}
        />

        {visibleTags.length > 0 && (
          <div className="mt-4 flex flex-wrap items-center gap-1.5">
            {visibleTags.map((tag) => (
              <span
                key={tag}
                className="text-[11.5px] px-2.5 py-0.5 border border-[var(--line)] rounded-full text-[var(--ink-2)] bg-white"
              >
                {tag}
              </span>
            ))}
            {moreCount > 0 && (
              <span className="text-[11.5px] text-[var(--ink-3)] ml-1">
                +{moreCount} more
              </span>
            )}
          </div>
        )}

        {agency.ai_summary && (
          <div className="mt-5">
            <p className="eyebrow mb-1.5">Description</p>
            <p className="text-[14.5px] leading-[1.6] text-[var(--ink-2)] line-clamp-2">
              {agency.ai_summary}
            </p>
          </div>
        )}

        {/* Bottom meta row: phone, ZIP, Google reviews link */}
        <div className="mt-5 pt-4 border-t border-[var(--line-soft)] flex flex-wrap items-baseline gap-x-4 gap-y-1.5 text-[12.5px]">
          {agency.phone && (
            <a
              href={`tel:${agency.phone}`}
              className="relative z-10 pointer-events-auto font-mono text-[var(--ink-2)] hover:text-[var(--ink)]"
            >
              {agency.phone}
            </a>
          )}
          {agency.zip && (
            <span className="font-mono text-[var(--ink-3)]">{agency.zip}</span>
          )}
          {agency.google_reviews_count != null && agency.google_reviews_count > 0 && (
            <a
              href={googleUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-10 pointer-events-auto ml-auto text-[var(--ink-2)] hover:text-[var(--ink)] underline-offset-3 hover:underline inline-flex items-center gap-1"
            >
              Read on Google
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M7 17 17 7" />
                <path d="M8 7h9v9" />
              </svg>
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
