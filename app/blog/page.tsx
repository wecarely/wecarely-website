import Link from 'next/link';
import type { Metadata } from 'next';
import { listArticles } from '@/lib/blog/articles';

const SITE_URL = 'https://www.wecarely.com';

export const metadata: Metadata = {
  title: 'Articles — WeCarely',
  description:
    'Honest, source-cited guides for families navigating home care, Medicare home health, hospice, and senior care decisions. No lead-gen, no sponsored content.',
  alternates: { canonical: `${SITE_URL}/blog` },
  openGraph: {
    title: 'Articles — WeCarely',
    description: 'Honest, source-cited guides for families navigating home care decisions.',
    url: `${SITE_URL}/blog`,
    type: 'website',
    siteName: 'WeCarely',
    images: [{ url: '/og.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Articles — WeCarely',
    description: 'Honest, source-cited guides for families navigating home care decisions.',
    images: ['/og.png'],
  },
};

export default function BlogIndexPage() {
  const articles = listArticles();

  return (
    <>
      {/* HERO */}
      <section className="border-b border-[var(--line)]">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-10 pt-16 pb-12 lg:pt-20 lg:pb-16">
          <span className="eyebrow">Articles · Decision guides</span>
          <h1
            className="font-display mt-5 text-[var(--ink)] max-w-[20ch]"
            style={{
              fontSize: 'clamp(36px, 5vw, 64px)',
              lineHeight: 1.06,
              letterSpacing: '-0.005em',
              fontWeight: 400,
            }}
          >
            Honest guides for{' '}
            <em className="italic" style={{ fontWeight: 400 }}>
              the families
            </em>
            {' '}doing the deciding.
          </h1>
          <p className="mt-7 max-w-[60ch] text-[16px] leading-[1.6] text-[var(--ink-2)]">
            Source-cited, written without sponsorship influence, focused on the
            decisions families actually face — not generic senior-care
            content.
          </p>
        </div>
      </section>

      {/* LIST */}
      <section className="mx-auto max-w-[1320px] px-6 lg:px-10 py-12 lg:py-16">
        {articles.length === 0 ? (
          <p className="text-[var(--ink-2)]">No articles yet — check back soon.</p>
        ) : (
          <ul className="divide-y divide-[var(--line)]">
            {articles.map((a) => (
              <li key={a.slug}>
                <Link
                  href={`/blog/${a.slug}`}
                  className="group block py-7 lg:py-9 grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-x-10 gap-y-3"
                >
                  <div className="flex flex-col gap-1.5">
                    <span className="eyebrow">{a.topic}</span>
                    <time
                      dateTime={a.publishedAt}
                      className="text-[12.5px] text-[var(--ink-3)] tabular-nums"
                    >
                      {new Date(a.publishedAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </time>
                  </div>
                  <div>
                    <h2
                      className="font-display text-[var(--ink)] group-hover:underline underline-offset-4"
                      style={{
                        fontSize: 'clamp(22px, 2.5vw, 32px)',
                        lineHeight: 1.15,
                        letterSpacing: '-0.005em',
                        fontWeight: 400,
                      }}
                    >
                      {a.title}
                    </h2>
                    <p className="mt-3 text-[15px] leading-[1.55] text-[var(--ink-2)] max-w-[68ch]">
                      {a.description}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
