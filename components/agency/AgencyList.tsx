import { AgencyCard } from './AgencyCard';
import { t } from '@/lib/i18n/t';
import type { Agency } from '@/lib/types/agency';

export function AgencyList({ agencies }: { agencies: Agency[] }) {
  if (agencies.length === 0) {
    return (
      <div className="text-center py-24 border border-dashed border-[var(--line)] rounded-[6px] bg-[var(--paper-card)]/40">
        <p
          className="font-display text-xl text-[var(--ink-2)]"
          style={{ fontVariationSettings: '"opsz" 24, "SOFT" 30' }}
        >
          {t('listing.empty')}
        </p>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
      {agencies.map((a, i) => (
        <AgencyCard key={a.id} agency={a} rank={i + 1} />
      ))}
    </div>
  );
}
