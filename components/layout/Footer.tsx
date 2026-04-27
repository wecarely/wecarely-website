import { t } from '@/lib/i18n/t';

export function Footer() {
  return (
    <footer className="mt-32 border-t border-[var(--line)] bg-[var(--bg)]">
      <div className="mx-auto max-w-[1200px] px-6 sm:px-10 py-16">
        {/* Pledge — information-provider framing */}
        <div className="max-w-2xl">
          <p
            className="font-display font-medium leading-[1.25] tracking-[-0.02em] text-[var(--ink)]"
            style={{ fontSize: 'clamp(20px, 2.4vw, 28px)' }}
          >
            {t('footer.pledgeHeadline')}
          </p>
          <p className="mt-5 text-[14.5px] leading-[1.65] text-[var(--ink-2)]">
            {t('footer.pledgeBody')}
          </p>
          <p className="mt-3 text-[14.5px] leading-[1.65] text-[var(--ink-2)]">
            {t('footer.rankingNote')}
          </p>
        </div>

        {/* Colophon */}
        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10 text-[13px]">
          <div>
            <p className="eyebrow mb-3">Data</p>
            <p className="text-[var(--ink-2)] leading-relaxed">
              {t('footer.dataSource')}
            </p>
          </div>
          <div>
            <p className="eyebrow mb-3">Coverage</p>
            <p className="text-[var(--ink-2)] leading-relaxed">
              {t('footer.coverage')}
            </p>
          </div>
          <div>
            <p className="eyebrow mb-3">Languages</p>
            <p className="text-[var(--ink-2)] leading-relaxed">
              {t('footer.languages')}
            </p>
          </div>
          <div>
            <p className="eyebrow mb-3">For agencies</p>
            <p className="text-[var(--ink-2)] leading-relaxed">
              {t('footer.forAgencies')}
            </p>
          </div>
        </div>

        <div className="mt-16 pt-6 border-t border-[var(--line-soft)] flex justify-between items-baseline text-[12px] text-[var(--ink-3)]">
          <span>{t('footer.copyright')}</span>
          <span>{t('footer.location')}</span>
        </div>
      </div>
    </footer>
  );
}
