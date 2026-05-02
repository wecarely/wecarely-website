import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import type { Metadata } from 'next';
import {
  getAgenciesByCity,
  getSponsoredAgencies,
  getCityAgencyCount,
} from '@/lib/supabase/queries';
import { parseFilterParams } from '@/lib/utils/filter-params';
import { FilterBar } from '@/components/filters/FilterBar';
import { AgencyList } from '@/components/agency/AgencyList';
import { SponsoredCarousel } from '@/components/agency/SponsoredCarousel';
import { HeroSearch } from '@/components/HeroSearch';
import { getCityConfig, LIVE_CITIES } from '@/lib/cities';

export const dynamic = 'force-dynamic';

const SITE_URL = 'https://www.wecarely.com';

interface PageProps {
  params: Promise<{ city: string }>;
  searchParams: Promise<{
    lang?: string;
    ins?: string;
    svc?: string;
    q?: string;
    demo_sponsored?: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { city: citySlug } = await params;
  const city = getCityConfig(citySlug);
  if (!city || city.status !== 'live') {
    return { title: 'City not found — WeCarely' };
  }

  const title = `Home Care Agencies in ${city.name}, ${city.state} | WeCarely`;
  const description = city.intro;
  const url = `${SITE_URL}/${city.slug}`;

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
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/og.png'],
    },
  };
}

export function generateStaticParams() {
  return LIVE_CITIES.map((c) => ({ city: c.slug }));
}

export default async function CityPage({ params, searchParams }: PageProps) {
  const { city: citySlug } = await params;
  const city = getCityConfig(citySlug);
  if (!city || city.status !== 'live') notFound();

  const sp = await searchParams;
  const urlParams = new URLSearchParams();
  if (sp.lang) urlParams.set('lang', sp.lang);
  if (sp.ins) urlParams.set('ins', sp.ins);
  if (sp.svc) urlParams.set('svc', sp.svc);

  const filters = parseFilterParams(urlParams);
  const [agencies, sponsors, totalCount] = await Promise.all([
    getAgenciesByCity({ citySlug, filters, query: sp.q }),
    getSponsoredAgencies(citySlug),
    getCityAgencyCount(citySlug),
  ]);
  const totalActive =
    filters.lang.length + filters.ins.length + filters.svc.length;
  const hasQuery = Boolean(sp.q?.trim());
  const demoSponsored = sp.demo_sponsored === '1';

  return (
    <>
      {/* HERO */}
      <section className="border-b border-[var(--line)]">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-10 pt-20 pb-16 lg:pt-28 lg:pb-20">
          <span className="eyebrow">{city.name} home care directory</span>

          <h1
            className="font-display mt-5 text-[var(--ink)] max-w-[20ch]"
            style={{
              fontSize: 'clamp(40px, 5.6vw, 76px)',
              lineHeight: 1.06,
              letterSpacing: '-0.005em',
              fontWeight: 400,
            }}
          >
            {city.name} home care,{' '}
            <em className="italic" style={{ fontWeight: 400 }}>
              honestly
            </em>{' '}
            compared.
          </h1>

          <p className="mt-7 max-w-[58ch] text-[16px] leading-[1.6] text-[var(--ink-2)]">
            Every home care agency licensed in {city.name}, in one place. Filter
            by language, insurance, and the kind of care you need. Free to
            browse — no sign-up required.
          </p>

          {/* Stat anchor + search bar */}
          <div className="mt-12 flex flex-wrap items-end gap-x-12 gap-y-6">
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
                {totalCount}
              </div>
              <div className="eyebrow mt-1.5">Agencies indexed</div>
            </div>

            <HeroSearch citySlug={citySlug} />
          </div>
        </div>
      </section>

      {/* SPONSORED CAROUSEL */}
      <SponsoredCarousel sponsors={sponsors} cityName={city.name} />

      {/* MAIN: 2-col layout — sidebar + results */}
      <section className="mx-auto max-w-[1320px] px-6 lg:px-10 py-12">
        <div className="grid lg:grid-cols-[260px_1fr] gap-x-10 gap-y-10">
          <aside className="lg:sticky lg:top-7 lg:self-start lg:max-h-[calc(100vh-3.5rem)] lg:overflow-y-auto pr-2">
            <Suspense fallback={<div className="h-64 animate-pulse rounded-[8px] bg-[var(--bg-soft)]" />}>
              <FilterBar />
            </Suspense>
          </aside>

          <div>
            <div className="flex items-baseline justify-between mb-7 pb-5 border-b border-[var(--line)]">
              <p className="text-[var(--ink-2)] flex items-baseline gap-2.5">
                <span
                  className="font-display tabular-nums text-[var(--ink)]"
                  style={{ fontSize: 28, lineHeight: 1, fontWeight: 400 }}
                >
                  {agencies.length}
                </span>
                <span className="font-display text-[var(--ink-2)]" style={{ fontSize: 22 }}>
                  {city.name} {agencies.length === 1 ? 'agency' : 'agencies'}
                  {hasQuery && (
                    <span className="text-[var(--ink-3)]">
                      {' '}matching &ldquo;{sp.q}&rdquo;
                    </span>
                  )}
                </span>
              </p>
              <p className="eyebrow">
                {hasQuery || totalActive > 0 ? 'Filtered' : 'Sorted by trust score'}
              </p>
            </div>

            <AgencyList agencies={agencies} demoSponsored={demoSponsored} />
          </div>
        </div>
      </section>
    </>
  );
}
