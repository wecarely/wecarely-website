export function Footer() {
  return (
    <footer className="mt-32 border-t border-[var(--line)] bg-[var(--bg)]">
      <div className="mx-auto max-w-[1200px] px-6 sm:px-10 py-16">
        <p
          className="font-display font-medium leading-[1.2] tracking-[-0.02em] text-[var(--ink)] max-w-2xl"
          style={{ fontSize: 'clamp(20px, 2.4vw, 28px)' }}
        >
          We don&apos;t sell leads. We don&apos;t share your contact information.
          Our rankings cannot be bought.
        </p>

        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10 text-[13px]">
          <div>
            <p className="eyebrow mb-3">Data</p>
            <p className="text-[var(--ink-2)] leading-relaxed">
              CMS Home Health Compare · Google · Verified updates
            </p>
          </div>
          <div>
            <p className="eyebrow mb-3">Coverage</p>
            <p className="text-[var(--ink-2)] leading-relaxed">Houston, Texas</p>
          </div>
          <div>
            <p className="eyebrow mb-3">Languages</p>
            <p className="text-[var(--ink-2)] leading-relaxed">
              English · Español · Tiếng Việt · 中文
            </p>
          </div>
          <div>
            <p className="eyebrow mb-3">For agencies</p>
            <p className="text-[var(--ink-2)] leading-relaxed">
              Claim your listing
            </p>
          </div>
        </div>

        <div className="mt-16 pt-6 border-t border-[var(--line-soft)] flex justify-between items-baseline text-[12px] text-[var(--ink-3)]">
          <span>© 2026 WeCarely</span>
          <span>Made in Houston</span>
        </div>
      </div>
    </footer>
  );
}
