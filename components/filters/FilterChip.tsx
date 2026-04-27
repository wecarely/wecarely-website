'use client';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';

interface Props {
  paramKey: 'lang' | 'ins' | 'svc';
  value: string;
  label: string;
}

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
        'px-3.5 py-1.5 rounded-full text-[13px] font-medium border transition-all duration-150 inline-flex items-center gap-1.5 ' +
        (active
          ? 'bg-[var(--ink)] text-[var(--bg)] border-[var(--ink)] hover:bg-[var(--ink-2)]'
          : 'bg-[var(--bg)] text-[var(--ink-2)] border-[var(--line)] hover:border-[var(--ink-3)] hover:text-[var(--ink)]')
      }
    >
      {label}
      {active && (
        <span className="text-[var(--bg)]/70 text-[10px] leading-none" aria-hidden>
          ✕
        </span>
      )}
    </button>
  );
}
