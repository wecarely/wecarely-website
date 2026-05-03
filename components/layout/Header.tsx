'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { CITIES } from '@/lib/cities';

const FEATURED_SLUGS = ['houston', 'dallas', 'san-antonio', 'el-paso', 'austin', 'fort-worth'];
const FEATURED_CITIES = CITIES
  .filter((c) => FEATURED_SLUGS.includes(c.slug) && c.status === 'live')
  .sort((a, b) => FEATURED_SLUGS.indexOf(a.slug) - FEATURED_SLUGS.indexOf(b.slug));

export function Header() {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const [citiesOpen, setCitiesOpen] = useState(false);
  const [expandedState, setExpandedState] = useState<string | null>('texas');
  const citiesRef = useRef<HTMLDivElement>(null);

  // Click outside or Esc closes the dropdown
  useEffect(() => {
    if (!citiesOpen) return;
    function onClick(e: MouseEvent) {
      if (citiesRef.current && !citiesRef.current.contains(e.target as Node)) {
        setCitiesOpen(false);
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setCitiesOpen(false);
    }
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [citiesOpen]);

  // Close dropdown on route change
  useEffect(() => {
    setCitiesOpen(false);
  }, [pathname]);

  const navTextClass = isHome
    ? 'text-white/90 hover:text-white'
    : 'text-[var(--ink-2)] hover:text-[var(--ink)]';

  return (
    <header
      className={
        isHome
          ? 'absolute top-0 left-0 right-0 z-50 bg-transparent'
          : 'border-b border-[var(--line)] bg-[var(--bg)] relative z-40'
      }
    >
      <div className="mx-auto max-w-[1320px] px-6 lg:px-10 h-16 flex items-center gap-x-3 sm:gap-x-8">
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

        {/* Primary nav */}
        <nav
          aria-label="Primary"
          className="flex items-center gap-x-1 sm:gap-x-2 text-[14px] font-medium"
        >
          {/* Cities dropdown */}
          <div ref={citiesRef} className="relative">
            <button
              type="button"
              aria-haspopup="menu"
              aria-expanded={citiesOpen}
              onClick={() => setCitiesOpen((v) => !v)}
              className={`inline-flex items-center gap-1 px-3 py-2 rounded-md transition-colors ${navTextClass}`}
              style={
                isHome
                  ? { textShadow: '0 2px 12px rgba(0,0,0,0.35)' }
                  : undefined
              }
            >
              Cities
              <svg
                width="11"
                height="11"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`transition-transform ${citiesOpen ? 'rotate-180' : ''}`}
                aria-hidden
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>

            {citiesOpen && (
              <div
                role="menu"
                className="absolute left-0 top-[calc(100%+6px)] min-w-[220px] rounded-[10px] border border-[var(--line)] bg-white shadow-[0_12px_32px_-12px_rgba(10,10,10,0.18)] py-2"
              >
                {/* Texas accordion row */}
                <button
                  type="button"
                  onClick={() => setExpandedState((s) => (s === 'texas' ? null : 'texas'))}
                  className="w-full flex items-center justify-between px-4 py-2 text-[13px] font-medium text-[var(--ink-2)] hover:text-[var(--ink)] hover:bg-[var(--bg-soft)] transition-colors"
                >
                  <span className="eyebrow text-[11px] tracking-widest uppercase">Texas</span>
                  <svg
                    width="11" height="11" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2.4"
                    strokeLinecap="round" strokeLinejoin="round"
                    className={`transition-transform ${expandedState === 'texas' ? 'rotate-180' : ''}`}
                    aria-hidden
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </button>

                {expandedState === 'texas' && (
                  <>
                    {FEATURED_CITIES.map((c) => (
                      <Link
                        key={c.slug}
                        href={`/${c.slug}`}
                        role="menuitem"
                        className="flex items-center justify-between px-4 pl-6 py-2 text-[14px] text-[var(--ink)] hover:bg-[var(--bg-soft)]"
                      >
                        <span>{c.name}</span>
                        <span className="eyebrow text-[var(--ink-3)]">TX</span>
                      </Link>
                    ))}
                    <div className="mx-3 my-1 border-t border-[var(--line)]" />
                    <Link
                      href="/#coverage"
                      role="menuitem"
                      className="flex items-center px-4 pl-6 py-2 text-[13px] text-[var(--ink-3)] hover:text-[var(--ink)] hover:bg-[var(--bg-soft)]"
                    >
                      All Texas cities →
                    </Link>
                  </>
                )}

                <div className="mt-1 pt-2 px-4 border-t border-[var(--line)]">
                  <p className="text-[12px] text-[var(--ink-3)] leading-snug">
                    More cities being added — request yours at{' '}
                    <a
                      href="mailto:hello@wecarely.com?subject=City%20request"
                      className="text-[var(--ink-2)] underline underline-offset-2 hover:text-[var(--ink)]"
                    >
                      hello@wecarely.com
                    </a>
                    .
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Articles */}
          <Link
            href="/blog"
            className={`inline-flex items-center px-3 py-2 rounded-md transition-colors ${navTextClass}`}
            style={
              isHome
                ? { textShadow: '0 2px 12px rgba(0,0,0,0.35)' }
                : undefined
            }
          >
            Articles
          </Link>
        </nav>

        {/* For agencies CTA — pushed to right; hidden on mobile (still
            reachable via Hero CTA, Footer, and agency detail pages). */}
        <div className="ml-auto hidden sm:block">
          <Link
            href="/for-agencies"
            className={
              isHome
                ? 'inline-flex items-center px-4 py-2 rounded-md text-[13.5px] font-medium border border-white/40 text-white hover:bg-white/10 transition-colors'
                : 'inline-flex items-center px-4 py-2 rounded-md text-[13.5px] font-medium border border-[var(--line-strong)] text-[var(--ink)] hover:border-[var(--ink)] transition-colors'
            }
            style={
              isHome
                ? { textShadow: '0 2px 12px rgba(0,0,0,0.35)' }
                : undefined
            }
          >
            For agencies
          </Link>
        </div>
      </div>
    </header>
  );
}
