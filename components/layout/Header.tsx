'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Header() {
  const pathname = usePathname();
  const isHome = pathname === '/';

  return (
    <header
      className={
        isHome
          ? 'absolute top-0 left-0 right-0 z-50 bg-transparent'
          : 'border-b border-[var(--line)] bg-[var(--bg)]'
      }
    >
      <div className="mx-auto max-w-[1320px] px-6 lg:px-10 h-16 flex items-center">
        <Link
          href="/"
          aria-label="WeCarely — Home"
          className="inline-flex items-center"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={
              isHome
                ? '/brand/lockup/lockup-white-photo.svg'
                : '/brand/lockup/lockup-ink-only.svg'
            }
            alt="WeCarely"
            height={28}
            width={135}
            style={{
              height: 28,
              width: 'auto',
              filter: isHome
                ? 'drop-shadow(0 2px 12px rgba(0,0,0,0.4))'
                : undefined,
            }}
          />
        </Link>
      </div>
    </header>
  );
}
