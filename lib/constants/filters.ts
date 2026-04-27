export type FilterAxis = 'language' | 'insurance' | 'clinical';

export interface FilterOption {
  key: string;       // URL searchParam value
  label: string;     // Display label (English for Day 7)
  column: string;    // Supabase column name
  axis: FilterAxis;
}

export const FILTERS: FilterOption[] = [
  // Language
  { key: 'spanish',     label: 'Spanish',     column: 'has_spanish',     axis: 'language' },
  { key: 'vietnamese',  label: 'Vietnamese',  column: 'has_vietnamese',  axis: 'language' },
  { key: 'chinese',     label: 'Chinese',     column: 'has_chinese',     axis: 'language' },

  // Insurance
  { key: 'medicare',    label: 'Medicare',    column: 'accepts_medicare', axis: 'insurance' },
  { key: 'medicaid',    label: 'Medicaid',    column: 'accepts_medicaid', axis: 'insurance' },

  // Clinical
  { key: 'skilled-nursing', label: 'Skilled Nursing', column: 'has_skilled_nursing', axis: 'clinical' },
  { key: 'dementia',        label: 'Dementia Care',   column: 'has_dementia_care',   axis: 'clinical' },
  { key: 'hospice',         label: 'Hospice',         column: 'has_hospice',         axis: 'clinical' },
];
