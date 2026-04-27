import { t } from '@/lib/i18n/t';

export function Header() {
  return (
    <header className="sticky top-0 z-10 bg-white border-b border-slate-200">
      <div className="mx-auto max-w-6xl px-4 py-4 flex items-baseline gap-3">
        <span className="text-xl font-bold text-slate-900">{t('header.title')}</span>
        <span className="text-sm text-slate-500 hidden sm:inline">
          {t('header.tagline')}
        </span>
      </div>
    </header>
  );
}
