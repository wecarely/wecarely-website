'use client';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';

interface Props {
  paramKey: 'lang' | 'ins' | 'svc';
  value: string;
  label: string;
}

/**
 * Sidebar filter row — Yelp-style checkbox + label.
 * - 14px square box: empty default → black-fill with white check when active
 * - Whole row clickable
 * - Uses { scroll: false } so toggling does NOT jump back to hero
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
    router.push(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  return (
    <button
      onClick={toggle}
      type="button"
      role="checkbox"
      aria-checked={active}
      className={
        'group/chip flex items-center gap-2.5 w-full text-left py-1.5 text-[14px] leading-[1.4] transition-colors ' +
        (active
          ? 'text-[var(--ink)] font-medium'
          : 'text-[var(--ink-2)] hover:text-[var(--ink)]')
      }
    >
      <span
        aria-hidden
        className={
          'inline-flex items-center justify-center w-[15px] h-[15px] rounded-[3px] border shrink-0 transition-colors ' +
          (active
            ? 'bg-[var(--ink)] border-[var(--ink)]'
            : 'bg-white border-[var(--ink-3)] group-hover/chip:border-[var(--ink-2)]')
        }
      >
        {active && (
          <svg
            width="9"
            height="9"
            viewBox="0 0 12 12"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-white"
          >
            <path d="M2.5 6.5l2.5 2.5L9.5 3.5" />
          </svg>
        )}
      </span>
      <span>{label}</span>
    </button>
  );
}
