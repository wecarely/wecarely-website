import { getHoustonAgencies } from '@/lib/supabase/queries';
import { parseFilterParams } from '@/lib/utils/filter-params';
import { FilterBar } from '@/components/filters/FilterBar';
import { AgencyList } from '@/components/agency/AgencyList';
import { t } from '@/lib/i18n/t';

export const dynamic = 'force-dynamic';

interface PageProps {
  searchParams: Promise<{ lang?: string; ins?: string; svc?: string }>;
}

export default async function HoustonPage({ searchParams }: PageProps) {
  const sp = await searchParams;
  const urlParams = new URLSearchParams();
  if (sp.lang) urlParams.set('lang', sp.lang);
  if (sp.ins) urlParams.set('ins', sp.ins);
  if (sp.svc) urlParams.set('svc', sp.svc);

  const filters = parseFilterParams(urlParams);
  const agencies = await getHoustonAgencies(filters);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">
          {t('listing.heading')}
        </h1>
        <p className="text-slate-600">{t('listing.subheading')}</p>
      </div>

      <div className="mb-8 p-4 bg-slate-50 rounded-lg border border-slate-200">
        <FilterBar />
      </div>

      <div className="mb-4 text-sm text-slate-500">
        {t('listing.count', { count: agencies.length })}
      </div>

      <AgencyList agencies={agencies} />
    </div>
  );
}
