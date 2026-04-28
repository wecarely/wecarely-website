import { AgencyCard } from './AgencyCard';
import { t } from '@/lib/i18n/t';
import type { Agency } from '@/lib/types/agency';

interface Props {
  agencies: Agency[];
  /**
   * Demo mode: visually flag the first card as Sponsored so the team
   * can preview the Phase 2 ad-slot treatment. Triggered by the URL
   * query param ?demo_sponsored=1. Never on production traffic by default.
   */
  demoSponsored?: boolean;
}

export function AgencyList({ agencies, demoSponsored = false }: Props) {
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
        <AgencyCard
          key={a.id}
          agency={a}
          rank={i + 1}
          isSponsored={demoSponsored && i === 0}
        />
      ))}
    </div>
  );
}
