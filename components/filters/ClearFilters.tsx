'use client';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';

/**
 * Shows a "Clear all" link only when at least one filter is active.
 * Resets all searchParams (lang/ins/svc) to empty and navigates.
 */
export function ClearFilters() {
  const router = useRouter();
  const params = useSearchParams();
  const pathname = usePathname();

  const activeCount =
    (params.get('lang')?.split(',').filter(Boolean).length ?? 0) +
    (params.get('ins')?.split(',').filter(Boolean).length ?? 0) +
    (params.get('svc')?.split(',').filter(Boolean).length ?? 0);

  if (activeCount === 0) return null;

  return (
    <div className="pt-2 border-t border-[var(--line)]">
      <button
        type="button"
        onClick={() => router.push(pathname)}
        className="text-[13px] text-[var(--ink-3)] hover:text-[var(--ink)] underline-offset-3 hover:underline transition-colors"
      >
        Clear all ({activeCount})
      </button>
    </div>
  );
}
