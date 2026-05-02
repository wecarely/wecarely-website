'use client';

import Link from 'next/link';
import { useState } from 'react';
import { CITIES as CITY_REGISTRY } from '@/lib/cities';

/**
 * Yelp-style "Explore searches in popular cities" — city pill tabs at top,
 * grouped search shortcuts below. Live/coming-soon status comes from the
 * shared CITIES registry (lib/cities.ts) so the Header dropdown stays in sync.
 * The popular-search groups are local: they only apply to live cities.
 */

interface SearchLink {
  label: string;
  href: string;
}

interface Group {
  title: string;
  subtitle: string;
  searches: SearchLink[];
  seeAllHref: string;
}

interface City {
  slug: string;
  name: string;
  status: 'live' | 'coming-soon';
  groups?: Group[];
}

function buildGroups(citySlug: string): Group[] {
  const base = `/${citySlug}`;
  return [
    {
      title: 'For Spanish-speaking families',
      subtitle: 'Cuidado en español',
      searches: [
        { label: 'Skilled nursing',  href: `${base}?lang=spanish&svc=skilled-nursing` },
        { label: 'Personal care',    href: `${base}?lang=spanish&svc=personal-care` },
        { label: 'Companion care',   href: `${base}?lang=spanish&svc=companion-care` },
        { label: 'Dementia care',    href: `${base}?lang=spanish&svc=dementia` },
        { label: 'Hospice',          href: `${base}?lang=spanish&svc=hospice` },
      ],
      seeAllHref: `${base}?lang=spanish`,
    },
    {
      title: 'For Vietnamese families',
      subtitle: 'Chăm sóc bằng tiếng Việt',
      searches: [
        { label: 'Skilled nursing',     href: `${base}?lang=vietnamese&svc=skilled-nursing` },
        { label: 'Home health aide',    href: `${base}?lang=vietnamese&svc=home-health-aide` },
        { label: 'Personal care',       href: `${base}?lang=vietnamese&svc=personal-care` },
        { label: 'Dementia care',       href: `${base}?lang=vietnamese&svc=dementia` },
      ],
      seeAllHref: `${base}?lang=vietnamese`,
    },
    {
      title: 'For Chinese families',
      subtitle: '中文照護',
      searches: [
        { label: 'Skilled nursing',  href: `${base}?lang=chinese&svc=skilled-nursing` },
        { label: 'Personal care',    href: `${base}?lang=chinese&svc=personal-care` },
        { label: 'Home health aide', href: `${base}?lang=chinese&svc=home-health-aide` },
        { label: 'Dementia care',    href: `${base}?lang=chinese&svc=dementia` },
      ],
      seeAllHref: `${base}?lang=chinese`,
    },
    {
      title: 'After hospital discharge',
      subtitle: 'Skilled care, fast',
      searches: [
        { label: 'Skilled nursing',          href: `${base}?svc=skilled-nursing` },
        { label: 'Physical therapy',         href: `${base}?svc=physical-therapy` },
        { label: 'Occupational therapy',     href: `${base}?svc=occupational-therapy` },
        { label: 'Speech therapy',           href: `${base}?svc=speech-therapy` },
        { label: 'Skilled + Medicare',       href: `${base}?svc=skilled-nursing&ins=medicare` },
      ],
      seeAllHref: `${base}?svc=skilled-nursing`,
    },
    {
      title: 'For families on Medicaid',
      subtitle: 'Coverage that fits',
      searches: [
        { label: 'Personal care',           href: `${base}?ins=medicaid&svc=personal-care` },
        { label: 'Home health aide',        href: `${base}?ins=medicaid&svc=home-health-aide` },
        { label: 'Companion care',          href: `${base}?ins=medicaid&svc=companion-care` },
        { label: 'Spanish + Medicaid',      href: `${base}?ins=medicaid&lang=spanish` },
      ],
      seeAllHref: `${base}?ins=medicaid`,
    },
    {
      title: 'For dementia and end-of-life care',
      subtitle: 'Specialized support',
      searches: [
        { label: 'Dementia care',         href: `${base}?svc=dementia` },
        { label: 'Hospice',               href: `${base}?svc=hospice` },
        { label: 'Dementia + Spanish',    href: `${base}?svc=dementia&lang=spanish` },
        { label: 'Hospice + Medicare',    href: `${base}?svc=hospice&ins=medicare` },
      ],
      seeAllHref: `${base}?svc=dementia`,
    },
  ];
}

const CITIES: City[] = CITY_REGISTRY.map((c) =>
  c.status === 'live'
    ? { ...c, groups: buildGroups(c.slug) }
    : { ...c }
);

export function ExploreSearches() {
  const [activeSlug, setActiveSlug] = useState<string>(
    CITIES.find((c) => c.status === 'live')?.slug ?? 'houston'
  );
  const active = CITIES.find((c) => c.slug === activeSlug) ?? CITIES[0];

  return (
    <section className="border-b border-[var(--line)]">
      <div className="mx-auto max-w-[1320px] px-6 lg:px-10 py-16 lg:py-20">
        <div className="mb-8 max-w-2xl">
          <p className="eyebrow mb-3">Explore</p>
          <h2
            className="font-display text-[var(--ink)]"
            style={{
              fontSize: 'clamp(28px, 3.6vw, 40px)',
              lineHeight: 1.1,
              letterSpacing: '-0.005em',
              fontWeight: 400,
            }}
          >
            Explore searches in popular cities.
          </h2>
          <p className="mt-3 text-[15px] text-[var(--ink-2)]">
            Discover what families are searching for in each city.
          </p>
        </div>

        {/* CITY PILLS */}
        <div className="mb-12 flex flex-wrap gap-2">
          {CITIES.map((c) => {
            const isActive = c.slug === activeSlug;
            const isLive = c.status === 'live';
            return (
              <button
                key={c.slug}
                type="button"
                onClick={() => isLive && setActiveSlug(c.slug)}
                disabled={!isLive}
                aria-pressed={isActive}
                className={[
                  'inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border text-[13.5px] transition-colors',
                  isActive
                    ? 'border-[var(--ink)] bg-[var(--ink)] text-white'
                    : isLive
                    ? 'border-[var(--line)] text-[var(--ink)] hover:border-[var(--ink)] hover:bg-[var(--bg-soft)]'
                    : 'border-[var(--line)] text-[var(--ink-3)] cursor-not-allowed',
                ].join(' ')}
              >
                {c.name}
                {!isLive && (
                  <span className="text-[10.5px] uppercase tracking-wider text-[var(--ink-3)]">
                    soon
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* ACTIVE CITY CONTENT */}
        {active.status === 'live' && active.groups ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
            {active.groups.map((g) => (
              <div key={g.title}>
                <Link href={g.seeAllHref} className="group inline-block mb-1">
                  <h3
                    className="font-display text-[var(--ink)] group-hover:text-[var(--accent-on)] transition-colors leading-tight"
                    style={{ fontSize: 19, fontWeight: 500 }}
                  >
                    {g.title}
                  </h3>
                </Link>
                <p className="text-[12.5px] text-[var(--ink-3)] mb-4 italic font-display">
                  {g.subtitle}
                </p>

                <ul className="space-y-1.5">
                  {g.searches.map((s) => (
                    <li key={s.href}>
                      <Link
                        href={s.href}
                        className="text-[14px] text-[var(--ink-2)] hover:text-[var(--ink)] underline-offset-3 hover:underline inline-flex items-baseline gap-1.5"
                      >
                        {s.label}
                      </Link>
                    </li>
                  ))}
                  <li className="pt-1">
                    <Link
                      href={g.seeAllHref}
                      className="text-[12.5px] font-medium text-[var(--ink)] underline-offset-3 hover:underline inline-flex items-center gap-1"
                    >
                      See all
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                        <path d="M5 12h14" />
                        <path d="m12 5 7 7-7 7" />
                      </svg>
                    </Link>
                  </li>
                </ul>
              </div>
            ))}
          </div>
        ) : (
          <div className="border-t border-[var(--line)] pt-10">
            <p
              className="font-display text-[var(--ink)] mb-2"
              style={{ fontSize: 22, fontWeight: 500 }}
            >
              {active.name} is coming soon.
            </p>
            <p className="text-[14.5px] text-[var(--ink-2)] max-w-md">
              We&apos;re building the {active.name} directory next. Want yours
              prioritized?{' '}
              <a
                href={`mailto:hello@wecarely.com?subject=City%20request%3A%20${encodeURIComponent(active.name)}`}
                className="text-[var(--ink)] underline underline-offset-3"
              >
                Tell us
              </a>
              .
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
