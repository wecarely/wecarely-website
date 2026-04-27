export type FilterAxis = 'language' | 'insurance' | 'clinical';

export interface FilterOption {
  key: string;       // URL searchParam value
  label: string;     // Display label (English for Day 7)
  column: string;    // Supabase column name
  axis: FilterAxis;
}

/**
 * 14 boolean filters across 3 axes — matches DB schema.
 * Order within each axis = display order in sidebar.
 */
export const FILTERS: FilterOption[] = [
  // Language (3)
  { key: 'spanish',    label: 'Spanish',    column: 'has_spanish',    axis: 'language' },
  { key: 'vietnamese', label: 'Vietnamese', column: 'has_vietnamese', axis: 'language' },
  { key: 'chinese',    label: 'Chinese',    column: 'has_chinese',    axis: 'language' },

  // Insurance (2)
  { key: 'medicare', label: 'Medicare', column: 'accepts_medicare', axis: 'insurance' },
  { key: 'medicaid', label: 'Medicaid', column: 'accepts_medicaid', axis: 'insurance' },

  // Clinical / Service (9)
  { key: 'skilled-nursing',     label: 'Skilled Nursing',     column: 'has_skilled_nursing',     axis: 'clinical' },
  { key: 'home-health-aide',    label: 'Home Health Aide',    column: 'has_home_health_aide',    axis: 'clinical' },
  { key: 'personal-care',       label: 'Personal Care',       column: 'has_personal_care',       axis: 'clinical' },
  { key: 'companion-care',      label: 'Companion Care',      column: 'has_companion_care',      axis: 'clinical' },
  { key: 'physical-therapy',    label: 'Physical Therapy',    column: 'has_physical_therapy',    axis: 'clinical' },
  { key: 'occupational-therapy',label: 'Occupational Therapy',column: 'has_occupational_therapy',axis: 'clinical' },
  { key: 'speech-therapy',      label: 'Speech Therapy',      column: 'has_speech_therapy',      axis: 'clinical' },
  { key: 'dementia',            label: 'Dementia Care',       column: 'has_dementia_care',       axis: 'clinical' },
  { key: 'hospice',             label: 'Hospice',             column: 'has_hospice',             axis: 'clinical' },
];
