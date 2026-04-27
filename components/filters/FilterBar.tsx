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
    <div className="space-y-3">
      {(['language', 'insurance', 'clinical'] as const).map((axis) => (
        <div key={axis} className="flex flex-wrap items-center gap-2">
          <span className="text-xs uppercase tracking-wide text-slate-500 w-20 shrink-0">
            {t(AXIS_LABEL_KEY[axis])}
          </span>
          <div className="flex flex-wrap gap-2">
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
