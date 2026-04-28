import Link from 'next/link';
import { createServerClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

const COMING_SOON = ['Dallas', 'Austin', 'San Antonio', 'Fort Worth'];

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

async function getHoustonCount(): Promise<number> {
  try {
    const sb = createServerClient();
    const { count } = await sb
      .from('agencies')
      .select('id', { count: 'exact', head: true })
      .ilike('city', 'houston');
    return count ?? 0;
  } catch {
    return 259;
  }
}

export default async function HomePage() {
  const houstonCount = await getHoustonCount();

  return (
    <>
      {/* HERO */}
      <section className="border-b border-[var(--line)]">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-10 pt-20 pb-16 lg:pt-28 lg:pb-20">
          <span className="eyebrow">An honest home care directory</span>

          <h1
            className="font-display mt-5 text-[var(--ink)] max-w-[18ch]"
            style={{
              fontSize: 'clamp(40px, 6vw, 80px)',
              lineHeight: 1.04,
              letterSpacing: '-0.005em',
              fontWeight: 400,
            }}
          >
            Home care,{' '}
            <em className="italic" style={{ fontWeight: 400 }}>
              honestly
            </em>{' '}
            compared.
          </h1>

          <p className="mt-7 max-w-[58ch] text-[16.5px] leading-[1.6] text-[var(--ink-2)]">
            Every licensed home care agency in your city, sourced from{' '}
            <span className="text-[var(--ink)]">CMS Home Health Compare</span>{' '}
            and{' '}
            <span className="text-[var(--ink)]">Google reviews</span>. Filter by
            language, insurance, and the kind of care you need. Free to browse —
            no sign-up required.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
            <Link
              href="/houston"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-[10px] bg-[var(--accent)] text-[var(--ink)] font-medium hover:bg-[var(--accent-hover)] transition-colors"
              style={{ fontSize: 15 }}
            >
              Browse Houston agencies
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </Link>
            <span className="font-mono text-[12.5px] text-[var(--ink-3)]">
              {houstonCount} agencies indexed · updated this month
            </span>
          </div>
        </div>
      </section>

      {/* COVERAGE */}
      <section className="border-b border-[var(--line)] bg-[var(--bg-soft)]">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-10 py-14">
          <p className="eyebrow mb-5">Coverage</p>
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-10">
            <div>
              <p
                className="font-display text-[var(--ink)] mb-2"
                style={{ fontSize: 26, fontWeight: 500 }}
              >
                Now serving
              </p>
              <Link
                href="/houston"
                className="block group max-w-md p-5 -mx-5 rounded-[10px] hover:bg-white transition-colors"
              >
                <p
                  className="font-display group-hover:text-[var(--accent)] transition-colors"
                  style={{ fontSize: 22, fontWeight: 500 }}
                >
                  Houston, TX{' '}
                  <span className="text-[var(--ink-3)] font-mono text-[14px] tabular-nums">
                    {houstonCount}
                  </span>
                </p>
                <p className="mt-1 text-[14px] text-[var(--ink-2)]">
                  All licensed home care agencies in Harris County.
                </p>
                <p className="mt-3 text-[12.5px] text-[var(--ink-2)] underline-offset-3 group-hover:underline inline-flex items-center gap-1">
                  Browse the directory
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </p>
              </Link>
            </div>

            <div>
              <p
                className="font-display text-[var(--ink)] mb-2"
                style={{ fontSize: 26, fontWeight: 500 }}
              >
                Coming soon
              </p>
              <p className="text-[14px] text-[var(--ink-2)] mb-4">
                Texas first, then nationwide. Want yours next?{' '}
                <a
                  href="mailto:hello@wecarely.com?subject=City%20request"
                  className="text-[var(--ink)] underline underline-offset-3"
                >
                  Tell us where
                </a>
                .
              </p>
              <ul className="space-y-2">
                {COMING_SOON.map((city) => (
                  <li
                    key={city}
                    className="font-display text-[var(--ink-2)] flex items-baseline gap-3"
                    style={{ fontSize: 18, fontWeight: 400 }}
                  >
                    <span
                      className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-[var(--ink-3)]"
                    >
                      Q3 2026
                    </span>
                    {city}
                  </li>
                ))}
              </ul>
            </div>
          </div>
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
      <section className="border-b border-[var(--line)] bg-[var(--bg-soft)]">
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

      {/* FINAL CTA */}
      <section>
        <div className="mx-auto max-w-[1320px] px-6 lg:px-10 py-20 text-center">
          <p className="eyebrow mb-5">Start here</p>
          <h2
            className="font-display text-[var(--ink)] mb-7 max-w-[20ch] mx-auto"
            style={{
              fontSize: 'clamp(28px, 3.6vw, 40px)',
              lineHeight: 1.1,
              letterSpacing: '-0.005em',
              fontWeight: 400,
            }}
          >
            Find a home care agency in Houston that fits your family.
          </h2>
          <Link
            href="/houston"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-[10px] bg-[var(--ink)] text-white font-medium hover:bg-black/90 transition-colors"
            style={{ fontSize: 15 }}
          >
            Browse {houstonCount} Houston agencies
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>
    </>
  );
}
