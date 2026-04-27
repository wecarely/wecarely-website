import { FilterChip } from './FilterChip';
import { ClearFilters } from './ClearFilters';
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
    <nav aria-label="Filters" className="space-y-8">
      {(['language', 'insurance', 'clinical'] as const).map((axis) => (
        <div key={axis}>
          <p className="eyebrow mb-3">{t(AXIS_LABEL_KEY[axis])}</p>
          <div className="space-y-0.5">
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

      <ClearFilters />
    </nav>
  );
}
