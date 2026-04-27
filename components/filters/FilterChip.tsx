'use client';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';

interface Props {
  paramKey: 'lang' | 'ins' | 'svc';
  value: string;
  label: string;
}

/**
 * Editorial filter:
 *  - Inactive: plain text with hover-underline (Resy-style ToC entry)
 *  - Active:   forest-filled pill (commits to selection visibly)
 */
export function FilterChip({ paramKey, value, label }: Props) {
  const router = useRouter();
  const params = useSearchParams();
  const pathname = usePathname();

  const current = params.get(paramKey)?.split(',').filter(Boolean) ?? [];
  const active = current.includes(value);

  const toggle = () => {
    const next = active ? current.filter((v) => v !== value) : [...current, value];
    const newParams = new URLSearchParams(params.toString());
    if (next.length === 0) newParams.delete(paramKey);
    else newParams.set(paramKey, next.join(','));
    const qs = newParams.toString();
    router.push(qs ? `${pathname}?${qs}` : pathname);
  };

  if (active) {
    return (
      <button
        onClick={toggle}
        type="button"
        aria-pressed
        className="px-3.5 py-1 rounded-full bg-[var(--forest)] text-[var(--paper)] text-[13px] font-medium tracking-[0.005em] inline-flex items-center gap-1.5 transition-colors hover:bg-[var(--forest-deep)]"
      >
        {label}
        <span className="text-[var(--paper)]/70 text-[10px] leading-none" aria-hidden>
          ✕
        </span>
      </button>
    );
  }

  return (
    <button
      onClick={toggle}
      type="button"
      aria-pressed={false}
      className="text-[14px] text-[var(--ink-2)] hover:text-[var(--ink)] underline-offset-[6px] decoration-[var(--ink-4)] hover:decoration-[var(--ink)] decoration-1 hover:underline transition-colors whitespace-nowrap"
    >
      {label}
    </button>
  );
}
