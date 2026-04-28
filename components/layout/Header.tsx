import Link from 'next/link';

export function Header() {
  return (
    <header className="border-b border-[var(--line)] bg-[var(--bg)]">
      <div className="mx-auto max-w-[1320px] px-6 lg:px-10 h-16 flex items-center justify-between">
        <Link
          href="/"
          aria-label="WeCarely — Home"
          className="inline-flex items-center"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/brand/lockup/lockup-ink-only.svg"
            alt="WeCarely"
            height={28}
            width={135}
            style={{ height: 28, width: 'auto' }}
          />
        </Link>
        <span className="eyebrow">Houston · TX</span>
      </div>
    </header>
  );
}
