import { AgencyCard } from './AgencyCard';
import { t } from '@/lib/i18n/t';
import type { Agency } from '@/lib/types/agency';

export function AgencyList({ agencies }: { agencies: Agency[] }) {
  if (agencies.length === 0) {
    return (
      <p className="text-center text-slate-500 py-12">{t('listing.empty')}</p>
    );
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {agencies.map((a) => (
        <AgencyCard key={a.id} agency={a} />
      ))}
    </div>
  );
}
