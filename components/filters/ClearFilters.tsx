'use client';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';

/**
 * Header for the filter sidebar:
 *   - Always shows "Filters" label + count
 *   - When ≥1 filter active, shows "Clear all" link inline
 *   - Resets filters without scrolling to top
 */
export function ClearFilters() {
  const router = useRouter();
  const params = useSearchParams();
  const pathname = usePathname();

  const activeCount =
    (params.get('lang')?.split(',').filter(Boolean).length ?? 0) +
    (params.get('ins')?.split(',').filter(Boolean).length ?? 0) +
    (params.get('svc')?.split(',').filter(Boolean).length ?? 0);

  return (
    <div className="flex items-baseline justify-between mb-5 pb-3 border-b border-[var(--line)]">
      <p className="font-display text-[17px] text-[var(--ink)]" style={{ fontWeight: 500 }}>
        Filters
        {activeCount > 0 && (
          <span className="ml-2 font-mono text-[12px] text-[var(--ink-3)] align-middle">
            {activeCount}
          </span>
        )}
      </p>
      {activeCount > 0 && (
        <button
          type="button"
          onClick={() => router.push(pathname, { scroll: false })}
          className="text-[12.5px] text-[var(--ink-3)] hover:text-[var(--ink)] underline-offset-3 hover:underline transition-colors"
        >
          Clear all
        </button>
      )}
    </div>
  );
}
