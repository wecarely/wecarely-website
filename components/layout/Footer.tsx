import { t } from '@/lib/i18n/t';

export function Footer() {
  return (
    <footer
      className="mt-24 relative overflow-hidden"
      style={{
        background:
          'linear-gradient(180deg, var(--paper-cream) 0%, var(--paper-honey) 100%)',
        color: 'var(--ink-cream)',
      }}
    >
      {/* Subtle grain overlay */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.06] pointer-events-none mix-blend-multiply"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
        }}
      />

      <div className="relative mx-auto max-w-[1320px] px-6 lg:px-10 pt-16 pb-10">
        {/* Eyebrow row */}
        <div className="flex items-baseline justify-between text-[var(--ink-cream)]/70">
          <span className="eyebrow" style={{ color: 'inherit' }}>
            Our pledge
          </span>
          <span className="eyebrow" style={{ color: 'inherit' }}>
            § 01 — Houston, TX
          </span>
        </div>

        {/* Manifesto / pledge */}
        <h2
          className="font-display mt-7 max-w-[18ch] text-[var(--ink-cream)]"
          style={{
            fontSize: 'clamp(34px, 4.6vw, 56px)',
            lineHeight: 1.06,
            letterSpacing: '-0.012em',
            fontWeight: 400,
          }}
        >
          <em className="italic" style={{ fontWeight: 400 }}>We don&apos;t</em> make up
          <br />
          the ratings.
        </h2>

        <p
          className="mt-7 max-w-[58ch] text-[15.5px] leading-[1.65]"
          style={{ color: 'rgba(28,22,8,0.78)' }}
        >
          {t('footer.pledgeBody')}
        </p>

        {/* Colophon */}
        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10 text-[13px]">
          <div>
            <p className="eyebrow mb-2" style={{ color: 'rgba(28,22,8,0.55)' }}>
              Data
            </p>
            <p style={{ color: 'rgba(28,22,8,0.78)' }} className="leading-relaxed">
              {t('footer.dataSource')}
            </p>
          </div>
          <div>
            <p className="eyebrow mb-2" style={{ color: 'rgba(28,22,8,0.55)' }}>
              Coverage
            </p>
            <p style={{ color: 'rgba(28,22,8,0.78)' }} className="leading-relaxed">
              {t('footer.coverage')}
            </p>
          </div>
          <div>
            <p className="eyebrow mb-2" style={{ color: 'rgba(28,22,8,0.55)' }}>
              Languages
            </p>
            <p style={{ color: 'rgba(28,22,8,0.78)' }} className="leading-relaxed">
              {t('footer.languages')}
            </p>
          </div>
          <div>
            <p className="eyebrow mb-2" style={{ color: 'rgba(28,22,8,0.55)' }}>
              For agencies
            </p>
            <p style={{ color: 'rgba(28,22,8,0.78)' }} className="leading-relaxed">
              {t('footer.forAgencies')}
            </p>
          </div>
        </div>

        {/* Fine print */}
        <div
          className="mt-14 pt-6 border-t font-mono flex flex-wrap justify-between items-baseline gap-y-3 text-[11px]"
          style={{
            borderColor: 'rgba(28,22,8,0.18)',
            color: 'rgba(28,22,8,0.55)',
            letterSpacing: '0.05em',
          }}
        >
          <span>WeCarely · Indexed in Houston · © 2026</span>
          <span>Not a medical service · Data: CMS &amp; Google</span>
        </div>
      </div>
    </footer>
  );
}
