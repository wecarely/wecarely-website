'use client';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';

interface Props {
  paramKey: 'lang' | 'ins' | 'svc';
  value: string;
  label: string;
}

/**
 * Sidebar list-item style: plain text, active = forest + semibold.
 * No chip shape, no border — quiet sidebar list.
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

  return (
    <button
      onClick={toggle}
      type="button"
      aria-pressed={active}
      className={
        'group/chip block w-full text-left py-[5px] text-[14px] leading-[1.4] transition-colors flex items-center gap-2.5 ' +
        (active
          ? 'text-[var(--accent)] font-semibold'
          : 'text-[var(--ink-2)] hover:text-[var(--ink)]')
      }
    >
      <span
        className={
          'inline-block w-1.5 h-1.5 rounded-full shrink-0 transition-all ' +
          (active
            ? 'bg-[var(--accent)] scale-100'
            : 'bg-[var(--ink-4)] scale-0 group-hover/chip:scale-100')
        }
        aria-hidden
      />
      <span>{label}</span>
    </button>
  );
}
