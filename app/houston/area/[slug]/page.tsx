import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getAgenciesByZips } from '@/lib/supabase/queries';
import { AgencyList } from '@/components/agency/AgencyList';
import {
  HOUSTON_NEIGHBORHOODS,
  findNeighborhood,
} from '@/lib/houston/neighborhoods';

export const dynamic = 'force-dynamic';

const SITE_URL = 'https://www.wecarely.com';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const area = findNeighborhood(slug);
  if (!area) return { title: 'Area not found — WeCarely' };

  const title = `Home Care in ${area.name}, Houston | WeCarely`;
  const description = `${area.intro} See licensed home care agencies in ${area.name} ranked by CMS clinical stars and Google reviews — no lead-gen, no advisor calls.`;
  const url = `${SITE_URL}/houston/area/${area.slug}`;

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
    },
    twitter: { card: 'summary', title, description },
  };
}

export default async function NeighborhoodPage({ params }: PageProps) {
  const { slug } = await params;
  const area = findNeighborhood(slug);
  if (!area) notFound();

  const agencies = await getAgenciesByZips(area.zips);

  // Other neighborhoods to surface as internal links (exclude self)
  const otherAreas = HOUSTON_NEIGHBORHOODS.filter(
    (n) => n.slug !== area.slug
  ).slice(0, 8);

  // Schema.org BreadcrumbList — Home > Houston > [Area]
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'WeCarely',
        item: SITE_URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Houston',
        item: `${SITE_URL}/houston`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: area.name,
        item: `${SITE_URL}/houston/area/${area.slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Breadcrumb bar */}
      <div className="border-b border-[var(--line)]">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-10 py-4">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-[12.5px] text-[var(--ink-2)]"
          >
            <Link href="/houston" className="hover:text-[var(--ink)] underline-offset-3 hover:underline">
              All Houston agencies
            </Link>
            <span className="text-[var(--ink-3)]" aria-hidden>/</span>
            <span className="text-[var(--ink)]">{area.name}</span>
          </nav>
        </div>
      </div>

      {/* HERO */}
      <section className="border-b border-[var(--line)]">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-10 pt-16 pb-12 lg:pt-20 lg:pb-16">
          <span className="eyebrow">Home care directory · Houston</span>
          <h1
            className="font-display mt-5 text-[var(--ink)] max-w-[20ch]"
            style={{
              fontSize: 'clamp(36px, 5vw, 64px)',
              lineHeight: 1.06,
              letterSpacing: '-0.005em',
              fontWeight: 400,
            }}
          >
            Home care in{' '}
            <em className="italic" style={{ fontWeight: 400 }}>
              {area.name}
            </em>
            .
          </h1>

          <p
            className="mt-7 max-w-[68ch] text-[16px] leading-[1.6] text-[var(--ink-2)]"
          >
            {area.intro}
          </p>

          {/* Stat strip + ZIP badges */}
          <div className="mt-10 flex flex-wrap items-end gap-x-12 gap-y-6">
            <div className="border-t border-[var(--line)] pt-4 inline-block">
              <div
                className="font-display tabular-nums text-[var(--ink)]"
                style={{
                  fontSize: 38,
                  fontWeight: 400,
                  letterSpacing: '-0.005em',
                  lineHeight: 1,
                }}
              >
                {agencies.length}
              </div>
              <div className="eyebrow mt-1.5">
                {agencies.length === 1 ? 'Agency' : 'Agencies'} in {area.name}
              </div>
            </div>

            <div>
              <p className="eyebrow mb-2.5">ZIPs covered</p>
              <div className="flex flex-wrap gap-1.5">
                {area.zips.map((z) => (
                  <span
                    key={z}
                    className="font-mono text-[12.5px] tabular-nums px-2 py-0.5 rounded border border-[var(--line-strong)] text-[var(--ink-2)] bg-white"
                  >
                    {z}
                  </span>
                ))}
              </div>
            </div>

            {area.alsoKnownAs && area.alsoKnownAs.length > 0 && (
              <div>
                <p className="eyebrow mb-2.5">Also known as</p>
                <p className="text-[14px] text-[var(--ink-2)]">
                  {area.alsoKnownAs.join(' · ')}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* AGENCY LIST */}
      <section className="mx-auto max-w-[1320px] px-6 lg:px-10 py-12">
        {agencies.length === 0 ? (
          <div className="text-center py-24 border border-dashed border-[var(--line)] rounded-[12px]">
            <p
              className="font-display italic text-[var(--ink-2)]"
              style={{ fontSize: 18 }}
            >
              No agencies indexed in {area.name} yet. Try{' '}
              <Link href="/houston" className="underline underline-offset-3 text-[var(--ink)]">
                browsing all Houston
              </Link>
              .
            </p>
          </div>
        ) : (
          <>
            <div className="flex items-baseline justify-between mb-7 pb-5 border-b border-[var(--line)]">
              <p className="text-[var(--ink-2)] flex items-baseline gap-2.5">
                <span
                  className="font-display tabular-nums text-[var(--ink)]"
                  style={{ fontSize: 28, lineHeight: 1, fontWeight: 400 }}
                >
                  {agencies.length}
                </span>
                <span
                  className="font-display text-[var(--ink-2)]"
                  style={{ fontSize: 22 }}
                >
                  {agencies.length === 1 ? 'agency' : 'agencies'} in {area.name}
                </span>
              </p>
              <p className="eyebrow">Sorted by trust score</p>
            </div>

            <AgencyList agencies={agencies} />
          </>
        )}
      </section>

      {/* OTHER AREAS — internal links for SEO */}
      <section className="border-t border-[var(--line)] bg-[var(--bg-soft)]">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-10 py-12 lg:py-16">
          <p className="eyebrow mb-5">Other Houston areas</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-3">
            {otherAreas.map((n) => (
              <Link
                key={n.slug}
                href={`/houston/area/${n.slug}`}
                className="text-[14.5px] text-[var(--ink-2)] hover:text-[var(--ink)] underline-offset-3 hover:underline truncate"
              >
                {n.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

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
