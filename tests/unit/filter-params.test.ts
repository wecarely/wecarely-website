import { describe, it, expect } from 'vitest';
import { parseFilterParams, filterParamsToColumns } from '@/lib/utils/filter-params';

describe('parseFilterParams', () => {
  it('parses single filter', () => {
    const params = new URLSearchParams('lang=spanish');
    expect(parseFilterParams(params)).toEqual({
      lang: ['spanish'],
      ins: [],
      svc: [],
    });
  });

  it('parses multiple filters across axes', () => {
    const params = new URLSearchParams('lang=spanish&ins=medicaid&svc=dementia');
    expect(parseFilterParams(params)).toEqual({
      lang: ['spanish'],
      ins: ['medicaid'],
      svc: ['dementia'],
    });
  });

  it('parses comma-separated values', () => {
    const params = new URLSearchParams('lang=spanish,vietnamese');
    expect(parseFilterParams(params)).toEqual({
      lang: ['spanish', 'vietnamese'],
      ins: [],
      svc: [],
    });
  });

  it('ignores unknown keys', () => {
    const params = new URLSearchParams('xyz=foo&lang=spanish');
    expect(parseFilterParams(params)).toEqual({
      lang: ['spanish'],
      ins: [],
      svc: [],
    });
  });

  it('returns empty arrays when no filters', () => {
    expect(parseFilterParams(new URLSearchParams())).toEqual({
      lang: [],
      ins: [],
      svc: [],
    });
  });
});

describe('filterParamsToColumns', () => {
  it('maps to Supabase column names', () => {
    const filters = { lang: ['spanish'], ins: ['medicaid'], svc: ['dementia'] };
    expect(filterParamsToColumns(filters)).toEqual([
      'has_spanish',
      'accepts_medicaid',
      'has_dementia_care',
    ]);
  });

  it('returns empty array if no filters', () => {
    expect(filterParamsToColumns({ lang: [], ins: [], svc: [] })).toEqual([]);
  });

  it('skips unknown filter keys', () => {
    const filters = { lang: ['spanish', 'klingon'], ins: [], svc: [] };
    expect(filterParamsToColumns(filters)).toEqual(['has_spanish']);
  });
});
