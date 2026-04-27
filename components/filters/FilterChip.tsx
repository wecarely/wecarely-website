'use client';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';

interface Props {
  paramKey: 'lang' | 'ins' | 'svc';
  value: string;
  label: string;
}

/**
 * Toggle a single filter value in the URL searchParams.
 * Server Component above will re-render with new filtered data.
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
        'px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ' +
        (active
          ? 'bg-blue-600 text-white border-blue-600'
          : 'bg-white text-slate-700 border-slate-300 hover:border-slate-400')
      }
    >
      {label}
    </button>
  );
}
