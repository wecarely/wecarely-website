import { FilterChip } from './FilterChip';
import { FILTERS } from '@/lib/constants/filters';
import { t } from '@/lib/i18n/t';

const AXIS_PARAM = {
  language: 'lang',
  insurance: 'ins',
  clinical: 'svc',
} as const;

const AXIS_LABEL_KEY = {
  language: 'filter.language',
  insurance: 'filter.insurance',
  clinical: 'filter.clinical',
} as const;

export function FilterBar() {
  const grouped = {
    language: FILTERS.filter((f) => f.axis === 'language'),
    insurance: FILTERS.filter((f) => f.axis === 'insurance'),
    clinical: FILTERS.filter((f) => f.axis === 'clinical'),
  };

  return (
    <div className="space-y-3.5">
      {(['language', 'insurance', 'clinical'] as const).map((axis) => (
        <div
          key={axis}
          className="grid grid-cols-[88px_1fr] md:grid-cols-[100px_1fr] gap-x-4 md:gap-x-6 items-baseline"
        >
          <span className="eyebrow pt-1">{t(AXIS_LABEL_KEY[axis])}</span>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 md:gap-x-5">
            {grouped[axis].map((f) => (
              <FilterChip
                key={f.key}
                paramKey={AXIS_PARAM[axis]}
                value={f.key}
                label={f.label}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
