import { t } from '@/lib/i18n/t';

export function Header() {
  return (
    <header className="border-b border-[var(--line)] bg-[var(--paper)]">
      <div className="mx-auto max-w-[1180px] px-6 sm:px-10 py-4 flex items-center justify-between">
        <a
          href="/"
          className="font-display text-[26px] tracking-[-0.02em] leading-none text-[var(--ink)]"
          style={{ fontVariationSettings: '"opsz" 48, "SOFT" 30' }}
        >
          We<span className="italic text-[var(--forest)]">C</span>arely
        </a>
        <div className="flex items-center gap-6">
          <span className="hidden md:inline text-[13px] text-[var(--ink-2)] tracking-[0.005em]">
            {t('header.tagline')}
          </span>
          <span className="eyebrow text-[var(--ink-3)] hidden sm:inline">
            Vol. 1 · 2026
          </span>
        </div>
      </div>
    </header>
  );
}
