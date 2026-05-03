import Link from 'next/link';
import { createServerClient } from '@/lib/supabase/server';
import { getSponsoredAgencies } from '@/lib/supabase/queries';
import { HeroCarousel } from '@/components/home/HeroCarousel';
import { SponsoredCarousel } from '@/components/agency/SponsoredCarousel';
import { FeaturedRow } from '@/components/home/FeaturedRow';
import { QuickFilters } from '@/components/home/QuickFilters';

export const dynamic = 'force-dynamic';

const HOW_IT_WORKS = [
  {
    n: '01',
    title: 'CMS clinical ratings',
    body: 'Government-published star ratings for every Medicare-certified home care agency. Updated quarterly.',
  },
  {
    n: '02',
    title: 'Google trust signals',
    body: 'Real review counts and aggregate ratings from Google Business — sourced, not curated by us.',
  },
  {
    n: '03',
    title: 'Filter by what matters',
    body: 'Language, insurance, clinical service. Each filter lives in the URL — bookmark or share with family.',
  },
];

const TX_FEATURED = [
  { slug: 'houston',     name: 'Houston' },
  { slug: 'dallas',      name: 'Dallas' },
  { slug: 'san-antonio', name: 'San Antonio' },
  { slug: 'el-paso',     name: 'El Paso' },
  { slug: 'austin',      name: 'Austin' },
  { slug: 'fort-worth',  name: 'Fort Worth' },
];

const CA_COMING = ['Los Angeles', 'San Diego', 'San Francisco', 'Sacramento', 'San Jose', 'Oakland'];

async function getCityCount(city: string): Promise<number> {
  try {
    const sb = createServerClient();
    const { count } = await sb
      .from('agencies')
      .select('id', { count: 'exact', head: true })
      .ilike('city', city);
    return count ?? 0;
  } catch {
    return 0;
  }
}

export default async function HomePage() {
  const [txCounts, sponsors] = await Promise.all([
    Promise.all(TX_FEATURED.map((c) => getCityCount(c.name))),
    getSponsoredAgencies('houston'),
  ]);
  const txCities = TX_FEATURED.map((c, i) => ({ ...c, count: txCounts[i] }));

  return (
    <>
      {/* HERO */}
      <HeroCarousel />

      {/* SPONSORED */}
      <SponsoredCarousel sponsors={sponsors} />

      {/* FEATURED — top 4 by trust score */}
      <FeaturedRow />

      {/* QUICK FILTERS */}
      <QuickFilters />

      {/* CITY GRID — grouped by state */}
      <section id="coverage" className="border-b border-[var(--line)]">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-10 py-16 lg:py-20">
          <p className="eyebrow mb-3">Start here</p>
          <h2
            className="font-display text-[var(--ink)] mb-12"
            style={{
              fontSize: 'clamp(28px, 3.6vw, 40px)',
              lineHeight: 1.1,
              letterSpacing: '-0.005em',
              fontWeight: 400,
            }}
          >
            Find a home care agency
            <br className="hidden sm:block" /> that fits your family.
          </h2>

          {/* Texas */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-5">
              <p className="font-mono text-[11px] uppercase tracking-widest text-[var(--ink-3)]">
                Texas
              </p>
              <div className="flex-1 border-t border-[var(--line)]" />
              <span className="font-mono text-[11px] text-[var(--ink-3)] tabular-nums">
                38 cities
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {txCities.map((c) => (
                <Link
                  key={c.slug}
                  href={`/${c.slug}`}
                  className="group flex flex-col items-start text-left border border-[var(--line)] rounded-[12px] p-5 hover:border-[var(--ink-3)] hover:shadow-[0_8px_24px_-12px_rgba(10,10,10,0.10)] transition-all bg-white"
                >
                  <p className="font-mono text-[10px] text-[var(--ink-3)] mb-1.5 tracking-[0.08em] uppercase">
                    TX
                  </p>
                  <p
                    className="font-display text-[var(--ink)] mb-1 group-hover:text-[var(--accent-on)] transition-colors"
                    style={{ fontSize: 20, fontWeight: 500 }}
                  >
                    {c.name}
                  </p>
                  {c.count > 0 && (
                    <p className="font-mono text-[12px] text-[var(--ink-3)] tabular-nums mb-3">
                      {c.count} agencies
                    </p>
                  )}
                  <span className="mt-auto inline-flex items-center gap-1.5 text-[12px] font-medium text-[var(--ink)]">
                    Browse
                    <svg
                      width="11" height="11" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="2.4"
                      strokeLinecap="round" strokeLinejoin="round" aria-hidden
                    >
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* California — coming soon */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <p className="font-mono text-[11px] uppercase tracking-widest text-[var(--ink-3)]">
                California
              </p>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full border border-[var(--line)] text-[10px] uppercase tracking-wider text-[var(--ink-3)]">
                Coming 2026
              </span>
              <div className="flex-1 border-t border-[var(--line)]" />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 opacity-40 pointer-events-none">
              {CA_COMING.map((city) => (
                <div
                  key={city}
                  className="flex flex-col items-start text-left border border-[var(--line)] rounded-[12px] p-5 bg-[var(--bg-soft)]"
                >
                  <p className="font-mono text-[10px] text-[var(--ink-3)] mb-1.5 tracking-[0.08em] uppercase">
                    CA
                  </p>
                  <p
                    className="font-display text-[var(--ink-2)]"
                    style={{ fontSize: 20, fontWeight: 500 }}
                  >
                    {city}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <p className="mt-8 text-[13px] text-[var(--ink-3)]">
            More states coming —{' '}
            <a
              href="mailto:hello@wecarely.com?subject=City%20request"
              className="text-[var(--ink)] underline underline-offset-3"
            >
              tell us where you need care
            </a>
            .
          </p>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="border-b border-[var(--line)]">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-10 py-16 lg:py-20">
          <p className="eyebrow mb-5">How it works</p>
          <h2
            className="font-display text-[var(--ink)] mb-10 max-w-[24ch]"
            style={{
              fontSize: 'clamp(28px, 3.6vw, 40px)',
              lineHeight: 1.1,
              letterSpacing: '-0.005em',
              fontWeight: 400,
            }}
          >
            Three sources of truth.{' '}
            <em className="italic" style={{ fontWeight: 400 }}>
              No middlemen.
            </em>
          </h2>
          <div className="grid md:grid-cols-3 gap-x-10 gap-y-8">
            {HOW_IT_WORKS.map((item) => (
              <div key={item.n} className="border-t border-[var(--ink)] pt-5">
                <p className="font-mono text-[12px] tabular-nums text-[var(--ink-3)] mb-3">
                  {item.n}
                </p>
                <h3
                  className="font-display text-[var(--ink)] mb-2.5"
                  style={{ fontSize: 20, fontWeight: 500 }}
                >
                  {item.title}
                </h3>
                <p className="text-[14.5px] leading-[1.6] text-[var(--ink-2)]">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PLEDGE */}
      <section className="border-b border-[var(--line)]">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-10 py-16 lg:py-20">
          <p className="eyebrow mb-7">Our pledge</p>
          <div className="grid md:grid-cols-[1.2fr_1fr] gap-x-16 gap-y-8 items-baseline">
            <h2
              className="font-display text-[var(--ink)] max-w-[20ch]"
              style={{
                fontSize: 'clamp(32px, 4.4vw, 56px)',
                lineHeight: 1.05,
                letterSpacing: '-0.012em',
                fontWeight: 400,
              }}
            >
              <em className="italic" style={{ fontWeight: 400 }}>
                We don&apos;t
              </em>{' '}
              make up the ratings.
            </h2>
            <div className="space-y-5 text-[15px] leading-[1.65] text-[var(--ink-2)]">
              <p>
                We show what CMS and Google already publish, sorted by filters
                that match how families actually search.
              </p>
              <p>
                The directory is free to browse — no account required. The order
                is based on those public scores,{' '}
                <span className="text-[var(--ink)]">nothing else</span>.
              </p>
              <p>
                Some details go out of date, so always confirm with the agency
                before deciding.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
