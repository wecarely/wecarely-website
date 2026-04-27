import { t } from '@/lib/i18n/t';

export function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-slate-600 space-y-2">
        <p className="font-medium text-slate-800">{t('footer.trust')}</p>
        <p>{t('footer.dataSource')}</p>
        <p className="text-xs text-slate-500 pt-2">© 2026 WeCarely</p>
      </div>
    </footer>
  );
}
