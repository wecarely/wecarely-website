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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJson) }}
      />

      {/* HEADER */}
      <section className="border-b border-[var(--line)]">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-10 pt-10 pb-12 lg:pt-14 lg:pb-16">
          <Link
            href="/houston"
            className="inline-flex items-center gap-1.5 text-[12.5px] text-[var(--ink-2)] hover:text-[var(--ink)] underline-offset-3 hover:underline mb-8"
          >
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="m15 18-6-6 6-6" />
            </svg>
            All Houston agencies
          </Link>

          <div className="flex items-start gap-5 mb-6">
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
            </div>
          </div>

          {/* TRUST RATINGS */}
          {(agency.medicare_star != null || hasGoogleReviews) && (
            <div className="flex flex-wrap gap-x-10 gap-y-4 mt-2">
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
        </div>
      </section>

      {/* AI SUMMARY */}
      {agency.ai_summary && (
        <section className="border-b border-[var(--line)] bg-[var(--bg-soft)]">
          <div className="mx-auto max-w-[1320px] px-6 lg:px-10 py-10 lg:py-14">
            <p className="eyebrow mb-4">Overview</p>
            <p
              className="text-[var(--ink)] max-w-[68ch]"
              style={{ fontSize: 17, lineHeight: 1.6 }}
            >
              {agency.ai_summary}
            </p>
          </div>
        </section>
      )}

      {/* QUICK FACTS */}
      <section className="border-b border-[var(--line)]">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-10 py-12 lg:py-16">
          <div className="grid md:grid-cols-3 gap-x-10 gap-y-10">
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
      </section>

      {/* CONTACT */}
      <section className="border-b border-[var(--line)] bg-[var(--bg-soft)]">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-10 py-12 lg:py-16">
          <p className="eyebrow mb-6">Contact</p>
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-6">
            {agency.phone && (
              <div>
                <p
                  className="font-display text-[var(--ink-3)] mb-1"
                  style={{ fontSize: 13, fontWeight: 500 }}
                >
                  Phone
                </p>
                <a
                  href={`tel:${agency.phone.replace(/[^0-9+]/g, '')}`}
                  className="font-display text-[var(--ink)] hover:text-[var(--accent-on)] underline-offset-3 hover:underline tabular-nums"
                  style={{ fontSize: 22, fontWeight: 500 }}
                >
                  {agency.phone}
                </a>
              </div>
            )}
            {agency.website && (
              <div>
                <p
                  className="font-display text-[var(--ink-3)] mb-1"
                  style={{ fontSize: 13, fontWeight: 500 }}
                >
                  Website
                </p>
                <a
                  href={agency.website}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="font-display text-[var(--ink)] hover:text-[var(--accent-on)] underline-offset-3 hover:underline break-all inline-flex items-center gap-1.5"
                  style={{ fontSize: 18, fontWeight: 500 }}
                >
                  {agency.website.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')}
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M15 3h6v6" />
                    <path d="M10 14 21 3" />
                    <path d="M21 14v7H3V3h7" />
                  </svg>
                </a>
              </div>
            )}
          </div>
          <p className="mt-8 text-[12.5px] text-[var(--ink-3)] max-w-[60ch]">
            Information is sourced from CMS Home Health Compare and Google
            Business. Some details go out of date — always confirm with the
            agency before deciding.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section>
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
