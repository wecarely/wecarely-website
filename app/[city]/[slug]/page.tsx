import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getAgencyBySlug } from '@/lib/supabase/queries';
import { LetterTile } from '@/components/agency/LetterTile';
import { StarRating } from '@/components/agency/StarRating';
import { getCityConfig, neighborhoodForZip } from '@/lib/cities';

export const dynamic = 'force-dynamic';

const SITE_URL = 'https://www.wecarely.com';

interface PageProps {
  params: Promise<{ city: string; slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { city: citySlug, slug } = await params;
  const city = getCityConfig(citySlug);
  if (!city || city.status !== 'live') {
    return { title: 'Agency not found — WeCarely' };
  }
  const agency = await getAgencyBySlug(citySlug, slug);
  if (!agency) {
    return { title: 'Agency not found — WeCarely' };
  }

  const title = `${agency.name} — Home Care in ${city.name}, ${city.state} | WeCarely`;
  const description = agency.ai_summary
    ? agency.ai_summary.slice(0, 160)
    : `${agency.name} is a home care agency in ${city.name}, ${city.state}. View CMS clinical ratings, Google reviews, services, and contact info on WeCarely.`;
  const url = `${SITE_URL}/${city.slug}/${agency.slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: 'website',
      siteName: 'WeCarely',
      images: [{ url: '/og.png', width: 1200, height: 630 }],
    },
    twitter: { card: 'summary_large_image', title, description, images: ['/og.png'] },
  };
}

export default async function AgencyDetailPage({ params }: PageProps) {
  const { city: citySlug, slug } = await params;
  const city = getCityConfig(citySlug);
  if (!city || city.status !== 'live') notFound();
  const agency = await getAgencyBySlug(citySlug, slug);
  if (!agency) notFound();

  const area = neighborhoodForZip(citySlug, agency.zip);

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

  const ccn = agency.slug.match(/-(\d+)$/)?.[1] ?? null;
  const cmsCompareUrl = ccn
    ? `https://www.medicare.gov/care-compare/details/home-health/${ccn}`
    : null;

  const fullAddress = [
    agency.address,
    `${city.name}, ${city.state}${agency.zip ? ` ${agency.zip}` : ''}`,
  ]
    .filter(Boolean)
    .join(', ');
  const hasMappableAddress = Boolean(agency.address);
  const mapsQuery = encodeURIComponent(fullAddress);
  const mapsEmbedSrc = `https://www.google.com/maps?q=${mapsQuery}&output=embed`;
  const mapsDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${mapsQuery}`;

  const schemaJson = {
    '@context': 'https://schema.org',
    '@type': 'MedicalBusiness',
    '@id': `${SITE_URL}/${city.slug}/${agency.slug}#org`,
    name: agency.name,
    url: agency.website || `${SITE_URL}/${city.slug}/${agency.slug}`,
    ...(agency.phone ? { telephone: agency.phone } : {}),
    address: {
      '@type': 'PostalAddress',
      ...(agency.address ? { streetAddress: agency.address } : {}),
      addressLocality: city.name,
      addressRegion: city.state,
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
            href={`/${city.slug}`}
            className="inline-flex items-center gap-1.5 text-[12.5px] text-[var(--ink-2)] hover:text-[var(--ink)] underline-offset-3 hover:underline"
          >
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="m15 18-6-6 6-6" />
            </svg>
            All {city.name} agencies
          </Link>
        </div>
      </div>

      {/* TWO-COLUMN BODY */}
      <div className="mx-auto max-w-[1320px] px-6 lg:px-10 py-10 lg:py-14">
        <div className="grid lg:grid-cols-[1fr_340px] gap-x-12 gap-y-10 items-start">
          <div className="min-w-0">
            <div className="flex items-start gap-5 mb-7">
              {agency.is_sponsored && agency.sponsor_logo_url ? (
                <div
                  className="rounded-[10px] overflow-hidden bg-white border flex items-center justify-center shrink-0"
                  style={{ width: 72, height: 72, borderColor: 'var(--line)' }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={agency.sponsor_logo_url}
                    alt={`${agency.name} logo`}
                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                  />
                </div>
              ) : (
                <LetterTile name={agency.name} size={72} fontSize={28} />
              )}
              <div className="flex-1 min-w-0">
                <p className="eyebrow mb-2">{city.name} · {city.state} home care</p>
                <div className="flex items-start flex-wrap gap-x-3 gap-y-2">
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
                  {agency.is_sponsored && (
                    <span
                      className="mt-2 inline-flex items-center px-2 py-0.5 rounded-[3px] border text-[10.5px] font-mono font-semibold tracking-[0.14em] uppercase shrink-0"
                      style={{
                        color: 'var(--ink-2)',
                        borderColor: 'var(--line-strong)',
                        background: 'var(--bg-soft)',
                      }}
                      title="Paid placement — clearly labeled, does not affect default ranking"
                    >
                      Sponsored
                    </span>
                  )}
                </div>
                <p className="mt-2 text-[14.5px] text-[var(--ink-2)]">
                  {agency.address ? `${agency.address} · ` : ''}{city.name}, {city.state}
                  {agency.zip ? ` ${agency.zip}` : ''}
                </p>

                {agency.is_sponsored && agency.sponsor_tagline && (
                  <p
                    className="mt-3 text-[var(--ink)] max-w-[60ch]"
                    style={{ fontSize: 16, lineHeight: 1.55, fontStyle: 'italic' }}
                  >
                    {agency.sponsor_tagline}
                  </p>
                )}

                {ccn && (
                  <a
                    href={cmsCompareUrl ?? '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[6px] border text-[12px] hover:border-[var(--ink)] transition-colors"
                    style={{ borderColor: 'var(--line-strong)', color: 'var(--ink-2)' }}
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

            {hasMappableAddress && (
              <div className="pt-10 border-t border-[var(--line)]">
                <p className="eyebrow mb-4">Location</p>
                <p
                  className="text-[14px] text-[var(--ink-2)] mb-4 tabular-nums"
                  style={{ fontVariantNumeric: 'tabular-nums' }}
                >
                  {fullAddress}
                </p>
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
                    title={`Map showing ${fullAddress}`}
                    style={{ border: 0 }}
                  />
                </div>
                <p className="mt-3 text-[12.5px] text-[var(--ink-3)]">
                  Map provided by Google. Pin shows the street address on file —
                  confirm with the agency before visiting (some operate from
                  shared business suites).
                </p>
              </div>
            )}

            <p className="mt-12 text-[12px] text-[var(--ink-3)] max-w-[60ch] leading-relaxed">
              Information is sourced from CMS Home Health Compare and Google
              Business — published exactly as it appears in the source data.
              Some details may be out of date; always confirm with the agency
              before deciding.
            </p>
          </div>

          <aside className="lg:sticky lg:top-6">
            <div className="rounded-[12px] border border-[var(--line-strong)] bg-white p-5 lg:p-6 space-y-4">
              {agency.phone && (
                <a href={`tel:${phoneTel}`} className="block group">
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

              {(() => {
                const hoursSource =
                  agency.is_sponsored && agency.sponsor_hours
                    ? { text: agency.sponsor_hours, source: 'agency' as const }
                    : agency.google_opening_hours
                    ? { text: agency.google_opening_hours, source: 'google' as const }
                    : null;
                if (!hoursSource) return null;
                const lines = parseHours(hoursSource.text);
                return (
                  <div className="pt-4 border-t border-[var(--line)]">
                    <p className="eyebrow mb-2">Hours</p>
                    <ul className="space-y-1">
                      {lines.map((line, i) => (
                        <li
                          key={i}
                          className="flex items-baseline gap-2 text-[13px]"
                          style={{ lineHeight: 1.45 }}
                        >
                          <span
                            className="font-mono text-[var(--ink-3)] w-9 shrink-0 tabular-nums"
                            style={{ fontSize: 11 }}
                          >
                            {line.day}
                          </span>
                          <span
                            className={
                              line.closed
                                ? 'text-[var(--ink-3)] italic'
                                : 'text-[var(--ink)]'
                            }
                          >
                            {line.hours}
                          </span>
                        </li>
                      ))}
                    </ul>
                    {hoursSource.source === 'google' && (
                      <p
                        className="mt-2 text-[var(--ink-3)] font-mono"
                        style={{ fontSize: 10.5, letterSpacing: '0.04em' }}
                      >
                        Source: Google Business · confirm with agency
                      </p>
                    )}
                  </div>
                );
              })()}
            </div>

            <div className="mt-4 px-1 text-[11.5px] text-[var(--ink-3)] leading-relaxed">
              Data: CMS Home Health Compare · Google Business
              <br />
              Last refreshed quarterly
            </div>
          </aside>
        </div>
      </div>

      {area && (
        <section className="border-t border-[var(--line)]">
          <div className="mx-auto max-w-[1320px] px-6 lg:px-10 py-8">
            <Link
              href={`/${city.slug}/area/${area.slug}`}
              className="inline-flex items-baseline gap-2 text-[var(--ink-2)] hover:text-[var(--ink)] underline-offset-3 hover:underline"
            >
              <span className="eyebrow">More in</span>
              <span
                className="font-display text-[var(--ink)]"
                style={{ fontSize: 18, fontWeight: 500 }}
              >
                {area.name}
              </span>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </Link>
          </div>
        </section>
      )}

      {!agency.is_sponsored && (
        <section className="border-t border-[var(--line)] bg-[var(--bg-soft)]">
          <div className="mx-auto max-w-[1320px] px-6 lg:px-10 py-10">
            <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3 max-w-[80ch]">
              <div>
                <p className="eyebrow mb-1.5">For agencies</p>
                <p
                  className="font-display text-[var(--ink)]"
                  style={{ fontSize: 18, fontWeight: 500, lineHeight: 1.3 }}
                >
                  Are you the owner of {agency.name}?
                </p>
                <p className="mt-1 text-[13.5px] text-[var(--ink-2)] max-w-[60ch]">
                  Claim this listing to correct details, add languages /
                  insurance / services we couldn&apos;t verify, or update
                  your contact info. Free.
                </p>
              </div>
              <a
                href={`mailto:hello@wecarely.com?subject=${encodeURIComponent(`Claim listing — ${agency.name}`)}&body=${encodeURIComponent(
                  `I'd like to claim this listing on WeCarely:\n\nAgency: ${agency.name}\nListing URL: ${SITE_URL}/${city.slug}/${agency.slug}\nCMS provider number: ${ccn ?? '(unknown)'}\n\nMy role at the agency: \nMy work email at the agency's domain: \n\nUpdates I'd like to make: \n\n`
                )}`}
                className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-[10px] border border-[var(--ink)] text-[var(--ink)] font-medium hover:bg-[var(--ink)] hover:text-white transition-colors"
                style={{ fontSize: 14 }}
              >
                Claim this listing
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        </section>
      )}

      <section className="border-t border-[var(--line)]">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-10 py-14 text-center">
          <Link
            href={`/${city.slug}`}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-[10px] border border-[var(--ink)] text-[var(--ink)] font-medium hover:bg-[var(--ink)] hover:text-white transition-colors"
            style={{ fontSize: 15 }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="m15 18-6-6 6-6" />
            </svg>
            Browse all {city.name} agencies
          </Link>
        </div>
      </section>
    </>
  );
}

function parseHours(raw: string): { day: string; hours: string; closed: boolean }[] {
  if (raw.includes('|') && raw.includes(':')) {
    const dayMap: Record<string, string> = {
      Monday: 'Mon',
      Tuesday: 'Tue',
      Wednesday: 'Wed',
      Thursday: 'Thu',
      Friday: 'Fri',
      Saturday: 'Sat',
      Sunday: 'Sun',
    };
    return raw
      .split('|')
      .map((seg) => seg.trim())
      .filter(Boolean)
      .map((seg) => {
        const m = seg.match(/^(\w+):\s*(.+)$/);
        if (!m) return { day: '', hours: seg, closed: false };
        const fullDay = m[1];
        const hours = m[2].trim();
        return {
          day: dayMap[fullDay] ?? fullDay.slice(0, 3),
          hours,
          closed: /closed/i.test(hours),
        };
      });
  }
  return [{ day: '', hours: raw, closed: false }];
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
