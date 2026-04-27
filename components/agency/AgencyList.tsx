import { AgencyCard } from './AgencyCard';
import { t } from '@/lib/i18n/t';
import type { Agency } from '@/lib/types/agency';

export function AgencyList({ agencies }: { agencies: Agency[] }) {
  if (agencies.length === 0) {
    return (
      <div className="text-center py-24 border border-dashed border-[var(--line)] rounded-[12px]">
        <p
          className="font-display italic text-[var(--ink-2)]"
          style={{ fontSize: 18 }}
        >
          {t('listing.empty')}
        </p>
      </div>
    );
  }
  return (
    <div className="space-y-4">
      {agencies.map((a, i) => (
        <AgencyCard key={a.id} agency={a} rank={i + 1} />
      ))}
    </div>
  );
}
