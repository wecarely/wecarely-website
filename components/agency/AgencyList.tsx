import { AgencyCard } from './AgencyCard';
import { t } from '@/lib/i18n/t';
import type { Agency } from '@/lib/types/agency';

export function AgencyList({ agencies }: { agencies: Agency[] }) {
  if (agencies.length === 0) {
    return (
      <div className="text-center py-24 border border-dashed border-[var(--line)] rounded-[10px]">
        <p className="text-[var(--ink-2)]">{t('listing.empty')}</p>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
      {agencies.map((a) => (
        <AgencyCard key={a.id} agency={a} />
      ))}
    </div>
  );
}
