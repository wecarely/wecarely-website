import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getAgencyBySlug } from '@/lib/supabase/queries';
import { LetterTile } from '@/components/agency/LetterTile';
import { StarRating } from '@/components/agency/StarRating';

export const dynamic = 'force-dynamic';

const SITE_URL = 'https://www.wecarely.com';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const agency = await getAgencyBySlug(slug);
  if (!agency) {
    return { title: 'Agency not found — WeCarely' };
  }

  const title = `${agency.name} — Home Care in Houston, TX | WeCarely`;
  const description = agency.ai_summary
    ? agency.ai_summary.slice(0, 160)
    : `${agency.name} is a home care agency in Houston, TX. View CMS clinical ratings, Google reviews, services, and contact info on WeCarely.`;
  const url = `${SITE_URL}/houston/${agency.slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, type: 'website', siteName: 'WeCarely' },
    twitter: { card: 'summary', title, description },
  };
}

export default async function AgencyDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const agency = await getAgencyBySlug(slug);
  if (!agency) notFound();

  const languages = [
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

  const hasGoogleReviews =
    agency.google_rating != null &&
    agency.google_reviews_count != null &&
    agency.google_reviews_count > 0;

  // CMS provider number is encoded as the trailing digits in the slug
  // (e.g. "total-home-care-inc-459406" → "459406"). Use it to deep-link
  // into CMS Care Compare for the verified-license badge.
  const ccn = agency.slug.match(/-(\d+)$/)?.[1] ?? null;
  const cmsCompareUrl = ccn
    ? `https://www.medicare.gov/care-compare/details/home-health/${ccn}`
    : null;

  const fullAddress = [
    agency.address,
    `Houston, TX${agency.zip ? ` ${agency.zip}` : ''}`,
  ]
    .filter(Boolean)
    .join(', ');
  const mapsQuery = encodeURIComponent(`${agency.name}, ${fullAddress}`);
  const mapsEmbedSrc = `https://maps.google.com/maps?q=${mapsQuery}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
  const mapsDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${mapsQuery}`;

  const schemaJson = {
    '@context': 'https://schema.org',
    '@type': 'MedicalBusiness',
    '@id': `${SITE_URL}/houston/${agency.slug}#org`,
    name: agency.name,
    url: agency.website || `${SITE_URL}/houston/${agency.slug}`,
    ...(agency.phone ? { telephone: agency.phone } : {}),
    address: {
      '@type': 'PostalAddress',
      ...(agency.address ? { streetAddress: agency.address } : {}),
      addressLocality: 'Houston',
      addressRegion: 'TX',
      ...(agency.zip ? { postalCode: agency.zip } : {}),
      addressCountry: 'US',
    },
    ...(services.length > 0 ? { medicalSpecialty: services } : {}),
    ...(languages.length > 0
      ? { knowsLanguage: ['English', ...languages] }
      : {}),
    ...(hasGoogleReviews
      ? {
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: agency.google_rating,
            reviewCount: agency.google_reviews_count,
            bestRating: 5,
            worstRating: 1,
          },
        }
      : {}),
  };

  const phoneTel = agency.phone?.replace(/[^0-9+]/g, '') ?? '';

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJson) }}
      />

      {/* BACK LINK BAR */}
      <div className="border-b border-[var(--line)]">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-10 py-4">
          <Link
            href="/houston"
            className="inline-flex items-center gap-1.5 text-[12.5px] text-[var(--ink-2)] hover:text-[var(--ink)] underline-offset-3 hover:underline"
          >
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="m15 18-6-6 6-6" />
            </svg>
            All Houston agencies
          </Link>
        </div>
      </div>

      {/* TWO-COLUMN BODY */}
      <div className="mx-auto max-w-[1320px] px-6 lg:px-10 py-10 lg:py-14">
        <div className="grid lg:grid-cols-[1fr_340px] gap-x-12 gap-y-10 items-start">
          {/* MAIN COLUMN */}
          <div className="min-w-0">
            {/* Header: tile + name + verified badge */}
            <div className="flex items-start gap-5 mb-7">
              <LetterTile name={agency.name} size={72} fontSize={28} />
              <div className="flex-1 min-w-0">
                <p className="eyebrow mb-2">Houston · TX home care</p>
                <h1
                  className="font-display text-[var(--ink)] leading-tight"
                  style={{
                    fontSize: 'clamp(28px, 4vw, 44px)',
                    letterSpacing: '-0.005em',
                    fontWeight: 500,
                  }}
                >
                  {agency.name}
                </h1>
                <p className="mt-2 text-[14.5px] text-[var(--ink-2)]">
                  {agency.address ? `${agency.address} · ` : ''}Houston, TX
                  {agency.zip ? ` ${agency.zip}` : ''}
                </p>

                {/* CMS Verified License badge */}
                {ccn && (
                  <a
                    href={cmsCompareUrl ?? '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[6px] border text-[12px] hover:border-[var(--ink)] transition-colors"
                    style={{
                      borderColor: 'var(--line-strong)',
                      color: 'var(--ink-2)',
                    }}
                    title="View on Medicare Care Compare"
                  >
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <path d="M9 12l2 2 4-4" />
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                    CMS Verified · CCN {ccn}
                  </a>
                )}
              </div>
            </div>

            {/* Trust ratings */}
            {(agency.medicare_star != null || hasGoogleReviews) && (
              <div className="flex flex-wrap gap-x-10 gap-y-4 mb-10 pb-10 border-b border-[var(--line)]">
                {agency.medicare_star != null && (
                  <div>
                    <p className="eyebrow mb-1.5">CMS clinical rating</p>
                    <div className="flex items-baseline gap-2">
                      <span
                        className="font-display tabular-nums"
                        style={{ fontSize: 28, fontWeight: 500 }}
                      >
                        {agency.medicare_star.toFixed(1)}
                      </span>
                      <StarRating value={agency.medicare_star} size={14} />
                      <span className="text-[12px] text-[var(--ink-3)]">/ 5</span>
                    </div>
                  </div>
                )}
                {hasGoogleReviews && (
                  <div>
                    <p className="eyebrow mb-1.5">Google reviews</p>
                    <div className="flex items-baseline gap-2">
                      <span
                        className="font-display tabular-nums"
                        style={{ fontSize: 28, fontWeight: 500 }}
                      >
                        {agency.google_rating!.toFixed(1)}
                      </span>
                      <StarRating value={agency.google_rating!} size={14} />
                      <span className="text-[12px] text-[var(--ink-3)]">
                        · {agency.google_reviews_count} reviews
                      </span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* AI Summary */}
            {agency.ai_summary && (
              <div className="mb-10">
                <p className="eyebrow mb-4">Overview</p>
                <p
                  className="text-[var(--ink)] max-w-[68ch]"
                  style={{ fontSize: 17, lineHeight: 1.6 }}
                >
                  {agency.ai_summary}
                </p>
              </div>
            )}

            {/* Quick facts */}
            <div className="mb-10 pt-10 border-t border-[var(--line)]">
              <div className="grid sm:grid-cols-3 gap-x-8 gap-y-8">
                <FactBlock
                  label="Languages"
                  items={languages.length > 0 ? ['English', ...languages] : ['English']}
                />
                <FactBlock
                  label="Insurance accepted"
                  items={insurance}
                  emptyText="Contact agency for current coverage"
                />
                <FactBlock
                  label="Services"
                  items={services}
                  emptyText="Contact agency for service list"
                />
              </div>
            </div>

            {/* Map */}
            <div className="pt-10 border-t border-[var(--line)]">
              <p className="eyebrow mb-4">Location</p>
              <div
                className="rounded-[10px] overflow-hidden border border-[var(--line)]"
                style={{ aspectRatio: '16 / 9' }}
              >
                <iframe
                  src={mapsEmbedSrc}
                  width="100%"
                  height="100%"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`Map showing location of ${agency.name}`}
                  style={{ border: 0 }}
                />
              </div>
              <p className="mt-3 text-[12.5px] text-[var(--ink-3)]">
                Map provided by Google. Confirm address with the agency before visiting.
              </p>
            </div>

            {/* Sources disclaimer */}
            <p className="mt-12 text-[12px] text-[var(--ink-3)] max-w-[60ch] leading-relaxed">
              Information is sourced from CMS Home Health Compare and Google
              Business — published exactly as it appears in the source data.
              Some details may be out of date; always confirm with the agency
              before deciding.
            </p>
          </div>

          {/* STICKY SIDEBAR */}
          <aside className="lg:sticky lg:top-6">
            <div className="rounded-[12px] border border-[var(--line-strong)] bg-white p-5 lg:p-6 space-y-4">
              {/* Phone — primary CTA */}
              {agency.phone && (
                <a
                  href={`tel:${phoneTel}`}
                  className="block group"
                >
                  <p className="eyebrow mb-1.5">Phone</p>
                  <p
                    className="font-display text-[var(--ink)] tabular-nums group-hover:text-[var(--accent-on)] transition-colors"
                    style={{ fontSize: 24, fontWeight: 500 }}
                  >
                    {agency.phone}
                  </p>
                  <p className="mt-1 text-[12px] text-[var(--ink-3)] inline-flex items-center gap-1">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                    Tap to call
                  </p>
                </a>
              )}

              {/* Website */}
              {agency.website && (
                <a
                  href={agency.website}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="block group pt-4 border-t border-[var(--line)]"
                >
                  <p className="eyebrow mb-1.5">Website</p>
                  <p
                    className="text-[var(--ink)] group-hover:text-[var(--accent-on)] transition-colors break-all inline-flex items-center gap-1.5"
                    style={{ fontSize: 14.5, fontWeight: 500 }}
                  >
                    {agency.website
                      .replace(/^https?:\/\/(www\.)?/, '')
                      .replace(/\/$/, '')}
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <path d="M15 3h6v6" />
                      <path d="M10 14 21 3" />
                      <path d="M21 14v7H3V3h7" />
                    </svg>
                  </p>
                </a>
              )}

              {/* Directions */}
              {(agency.address || agency.zip) && (
                <a
                  href={mapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block pt-4 border-t border-[var(--line)] group"
                >
                  <p className="eyebrow mb-1.5">Directions</p>
                  <p
                    className="text-[var(--ink)] group-hover:text-[var(--accent-on)] transition-colors inline-flex items-center gap-1.5"
                    style={{ fontSize: 14.5, fontWeight: 500 }}
                  >
                    Open in Google Maps
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </p>
                </a>
              )}
            </div>

            {/* Source attribution mini-card */}
            <div className="mt-4 px-1 text-[11.5px] text-[var(--ink-3)] leading-relaxed">
              Data: CMS Home Health Compare · Google Business
              <br />
              Last refreshed quarterly
            </div>
          </aside>
        </div>
      </div>

      {/* FOOTER CTA */}
      <section className="border-t border-[var(--line)]">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-10 py-14 text-center">
          <Link
            href="/houston"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-[10px] border border-[var(--ink)] text-[var(--ink)] font-medium hover:bg-[var(--ink)] hover:text-white transition-colors"
            style={{ fontSize: 15 }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="m15 18-6-6 6-6" />
            </svg>
            Browse all Houston agencies
          </Link>
        </div>
      </section>
    </>
  );
}

function FactBlock({
  label,
  items,
  emptyText,
}: {
  label: string;
  items: string[];
  emptyText?: string;
}) {
  return (
    <div>
      <p className="eyebrow mb-4">{label}</p>
      {items.length > 0 ? (
        <ul className="flex flex-wrap gap-1.5">
          {items.map((item) => (
            <li
              key={item}
              className="inline-flex items-center px-3 py-1 rounded-full border border-[var(--line-strong)] bg-white text-[13px] text-[var(--ink)]"
            >
              {item}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-[13.5px] text-[var(--ink-3)] italic">
          {emptyText || 'Not listed'}
        </p>
      )}
    </div>
  );
}
