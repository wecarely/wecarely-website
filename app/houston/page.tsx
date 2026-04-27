import { getHoustonAgencies } from '@/lib/supabase/queries';
import { parseFilterParams } from '@/lib/utils/filter-params';
import { FilterBar } from '@/components/filters/FilterBar';
import { AgencyList } from '@/components/agency/AgencyList';

export const dynamic = 'force-dynamic';

interface PageProps {
  searchParams: Promise<{ lang?: string; ins?: string; svc?: string }>;
}

interface Stat {
  n: string;
  l: string;
  accent?: boolean;
}

const STATS: Stat[] = [
  { n: '259', l: 'Agencies' },
  { n: '14', l: 'Trust filters' },
  { n: '2', l: 'Data sources' },
  { n: '0', l: 'Leads sold', accent: true },
];

export default async function HoustonPage({ searchParams }: PageProps) {
  const sp = await searchParams;
  const urlParams = new URLSearchParams();
  if (sp.lang) urlParams.set('lang', sp.lang);
  if (sp.ins) urlParams.set('ins', sp.ins);
  if (sp.svc) urlParams.set('svc', sp.svc);

  const filters = parseFilterParams(urlParams);
  const agencies = await getHoustonAgencies(filters);
  const totalActive =
    filters.lang.length + filters.ins.length + filters.svc.length;

  return (
    <>
      {/* HERO */}
      <section className="border-b border-[var(--line)]">
        <div className="mx-auto max-w-[1180px] px-6 sm:px-10 pt-14 pb-12 md:pt-24 md:pb-16">
          <div className="flex items-center gap-3 mb-7 text-[var(--ink-3)]">
            <span className="eyebrow">Vol. 01</span>
            <span className="h-px w-8 bg-[var(--ink-4)]" />
            <span className="eyebrow">Houston, TX · 2026</span>
          </div>

          <h1
            className="font-display font-medium text-[var(--ink)] leading-[1.02] tracking-[-0.025em] max-w-4xl"
            style={{
              fontSize: 'clamp(44px, 7vw, 76px)',
              fontVariationSettings: '"opsz" 144, "SOFT" 30',
            }}
          >
            Houston home care,
            <br />
            <span
              className="italic text-[var(--forest)]"
              style={{ fontVariationSettings: '"opsz" 144, "SOFT" 50' }}
            >
              honestly
            </span>{' '}
            compared.
          </h1>

          <p className="mt-7 max-w-[620px] text-[17px] leading-[1.6] text-[var(--ink-2)]">
            Every licensed agency in Houston, ranked by CMS clinical ratings and
            verified Google reviews.{' '}
            <em className="not-italic font-medium text-[var(--ink)]">Never</em> by
            who paid us.
          </p>

          <dl className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-7 max-w-3xl">
            {STATS.map((s) => (
              <div key={s.l} className="border-l border-[var(--line)] pl-4">
                <dt
                  className={`font-display tabular-nums leading-none tracking-tight ${
                    s.accent ? 'text-[var(--brick)]' : 'text-[var(--ink)]'
                  }`}
                  style={{
                    fontSize: 'clamp(28px, 4vw, 40px)',
                    fontVariationSettings: '"opsz" 96, "SOFT" 30',
                  }}
                >
                  {s.n}
                </dt>
                <dd className="eyebrow mt-2.5">{s.l}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* FILTER BAR — sticky */}
      <section className="sticky top-0 z-10 bg-[var(--paper)]/95 backdrop-blur-md border-b border-[var(--line)]">
        <div className="mx-auto max-w-[1180px] px-6 sm:px-10 py-5">
          <FilterBar />
        </div>
      </section>

      {/* RESULTS */}
      <section className="mx-auto max-w-[1180px] px-6 sm:px-10 py-10">
        <div className="flex items-baseline justify-between mb-8">
          <p className="text-[var(--ink-2)] flex items-baseline gap-2.5">
            <span
              className="font-display tabular-nums text-[var(--ink)]"
              style={{
                fontSize: '32px',
                lineHeight: 1,
                fontVariationSettings: '"opsz" 48, "SOFT" 30',
              }}
            >
              {agencies.length}
            </span>
            <span className="text-[14px]">
              {agencies.length === 1 ? 'agency' : 'agencies'}
              {totalActive > 0 && ' match your filters'}
            </span>
          </p>
          <p className="eyebrow text-[var(--ink-3)] hidden sm:block">
            Sorted by trust score
          </p>
        </div>

        <AgencyList agencies={agencies} />
      </section>
    </>
  );
}
