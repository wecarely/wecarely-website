import { createServerClient } from '@/lib/supabase/server';
import { getSponsoredAgencies } from '@/lib/supabase/queries';
import { CITIES } from '@/lib/cities';
import { HeroCarousel } from '@/components/home/HeroCarousel';
import { SponsoredCarousel } from '@/components/agency/SponsoredCarousel';
import { FeaturedRow } from '@/components/home/FeaturedRow';
import { QuickFilters } from '@/components/home/QuickFilters';
import { CityGrid, type GridState } from '@/components/home/CityGrid';

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

const CA_CITIES = [
  { slug: 'los-angeles',    name: 'Los Angeles' },
  { slug: 'san-diego',      name: 'San Diego' },
  { slug: 'san-francisco',  name: 'San Francisco' },
  { slug: 'sacramento',     name: 'Sacramento' },
  { slug: 'san-jose',       name: 'San Jose' },
  { slug: 'oakland',        name: 'Oakland' },
];

/** One query → city name → agency count map */
async function fetchCityCounts(): Promise<Record<string, number>> {
  try {
    const sb = createServerClient();
    const counts: Record<string, number> = {};
    let offset = 0;
    const pageSize = 1000;
    while (true) {
      const { data } = await sb
        .from('agencies')
        .select('city')
        .range(offset, offset + pageSize - 1);
      if (!data || data.length === 0) break;
      for (const row of data) {
        const key = (row.city ?? '').toLowerCase().trim();
        counts[key] = (counts[key] ?? 0) + 1;
      }
      if (data.length < pageSize) break;
      offset += pageSize;
    }
    return counts;
  } catch {
    return {};
  }
}

export default async function HomePage() {
  const [cityCounts, sponsors] = await Promise.all([
    fetchCityCounts(),
    getSponsoredAgencies('houston'),
  ]);

  const texasCities = CITIES
    .filter((c) => c.state === 'TX')
    .map((c) => ({
      slug:  c.slug,
      name:  c.name,
      abbr:  'TX',
      count: cityCounts[c.name.toLowerCase().trim()] ?? 0,
      live:  c.status === 'live',
    }));

  const states: GridState[] = [
    {
      name:   'Texas',
      abbr:   'TX',
      live:   true,
      cities: texasCities,
    },
    {
      name: 'California',
      abbr: 'CA',
      live: false,
      cities: CA_CITIES.map((c) => ({ ...c, abbr: 'CA', count: 0, live: false })),
    },
  ];

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
            className="font-display text-[var(--ink)] mb-10"
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
          <CityGrid states={states} />
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
