import { getHoustonAgencies } from '@/lib/supabase/queries';
import { parseFilterParams } from '@/lib/utils/filter-params';
import { FilterBar } from '@/components/filters/FilterBar';
import { AgencyList } from '@/components/agency/AgencyList';

export const dynamic = 'force-dynamic';

interface PageProps {
  searchParams: Promise<{ lang?: string; ins?: string; svc?: string }>;
}

const STATS = [
  { n: '259', l: 'Agencies' },
  { n: '14', l: 'Trust filters' },
  { n: '2', l: 'Data sources' },
  { n: '0', l: 'Leads sold' },
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
        <div className="mx-auto max-w-[1200px] px-6 sm:px-10 pt-20 pb-16 md:pt-32 md:pb-24">
          <h1
            className="font-display font-medium text-[var(--ink)] leading-[1.02] tracking-[-0.03em] max-w-4xl"
            style={{
              fontSize: 'clamp(40px, 6.5vw, 72px)',
              fontVariationSettings: '"opsz" 144, "SOFT" 0',
            }}
          >
            Houston home care,
            <br />
            honestly compared.
          </h1>

          <p className="mt-7 max-w-[600px] text-[17px] leading-[1.6] text-[var(--ink-2)]">
            Every licensed agency in Houston, ranked by CMS clinical ratings and
            verified Google reviews. Never by who paid us.
          </p>

          <dl className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-8 max-w-3xl">
            {STATS.map((s) => (
              <div key={s.l}>
                <dt
                  className="font-display tabular-nums leading-none tracking-[-0.02em] text-[var(--ink)] font-medium"
                  style={{
                    fontSize: 'clamp(28px, 3.6vw, 36px)',
                    fontVariationSettings: '"opsz" 96, "SOFT" 0',
                  }}
                >
                  {s.n}
                </dt>
                <dd className="eyebrow mt-3">{s.l}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* MAIN: 2-col layout, sidebar filter + results */}
      <section className="mx-auto max-w-[1200px] px-6 sm:px-10 py-12">
        <div className="grid lg:grid-cols-[220px_1fr] gap-x-12 gap-y-10">
          {/* Sidebar */}
          <aside className="lg:sticky lg:top-8 lg:self-start lg:max-h-[calc(100vh-4rem)] lg:overflow-y-auto pr-2">
            <FilterBar />
          </aside>

          {/* Results column */}
          <div>
            <div className="flex items-baseline justify-between mb-7 pb-5 border-b border-[var(--line)]">
              <p className="text-[var(--ink-2)] flex items-baseline gap-2.5">
                <span
                  className="font-display tabular-nums text-[var(--ink)] font-medium"
                  style={{
                    fontSize: '26px',
                    lineHeight: 1,
                    fontVariationSettings: '"opsz" 48, "SOFT" 0',
                  }}
                >
                  {agencies.length}
                </span>
                <span className="text-[14px]">
                  {agencies.length === 1 ? 'agency' : 'agencies'}
                  {totalActive > 0 && ' match your filters'}
                </span>
              </p>
              <p className="eyebrow hidden sm:block">Sorted by trust score</p>
            </div>

            <AgencyList agencies={agencies} />
          </div>
        </div>
      </section>
    </>
  );
}
