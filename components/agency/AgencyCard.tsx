import Link from 'next/link';
import { TrustBadge } from './TrustBadge';
import { t } from '@/lib/i18n/t';
import type { AgencyCardProps } from '@/lib/types/agency';

/**
 * Day 7 design constraints:
 * - `isSponsored` prop reserved (always false in Day 7, ad slot ready for Phase 2)
 * - "View Details" links to /houston/[slug] (detail page is Day 8)
 * - Phone is plain `tel:` link, NOT a "Call Now" button (avoids lead-gen UX)
 * - NO "Get matched" / "Request consultation" — those go on detail page in Day 8+
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
    agency.has_dementia_care && 'Dementia Care',
    agency.has_hospice && 'Hospice',
  ].filter(Boolean) as string[];

  return (
    <article className="rounded-lg border border-slate-200 bg-white p-5 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-2 mb-2">
        <h3 className="text-lg font-semibold text-slate-900 leading-tight">
          {agency.name}
        </h3>
        {isSponsored && (
          <span className="text-xs uppercase tracking-wide text-slate-500 border border-slate-300 rounded px-1.5 py-0.5 shrink-0">
            {t('card.sponsored')}
          </span>
        )}
      </div>

      <TrustBadge
        cmsStar={agency.medicare_star}
        googleRating={agency.google_rating}
        googleReviews={agency.google_reviews_count}
      />

      {agency.ai_summary && (
        <p className="mt-3 text-sm text-slate-600 line-clamp-2">{agency.ai_summary}</p>
      )}

      {(langs.length > 0 || insurance.length > 0 || services.length > 0) && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {langs.map((l) => (
            <span
              key={l}
              className="text-xs bg-amber-50 text-amber-800 border border-amber-200 rounded-full px-2 py-0.5"
            >
              {l}
            </span>
          ))}
          {insurance.map((i) => (
            <span
              key={i}
              className="text-xs bg-blue-50 text-blue-800 border border-blue-200 rounded-full px-2 py-0.5"
            >
              {i}
            </span>
          ))}
          {services.map((s) => (
            <span
              key={s}
              className="text-xs bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-full px-2 py-0.5"
            >
              {s}
            </span>
          ))}
        </div>
      )}

      <div className="mt-4 flex items-center justify-between text-sm border-t border-slate-100 pt-3">
        {agency.phone ? (
          <a href={`tel:${agency.phone}`} className="text-slate-600 hover:text-slate-900">
            {agency.phone}
          </a>
        ) : (
          <span />
        )}
        <Link
          href={`/houston/${agency.slug}`}
          className="text-blue-600 hover:underline font-medium"
        >
          {t('card.viewDetails')} →
        </Link>
      </div>
    </article>
  );
}
