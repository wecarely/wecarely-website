import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { findArticle, listArticles } from '@/lib/blog/articles';

const SITE_URL = 'https://www.wecarely.com';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = findArticle(slug);
  if (!article) return { title: 'Article not found — WeCarely' };

  const url = `${SITE_URL}/blog/${article.slug}`;
  const title = `${article.title} | WeCarely`;
  const ogImage = article.heroImage?.src ?? '/og.png';

  return {
    title,
    description: article.description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description: article.description,
      url,
      type: 'article',
      siteName: 'WeCarely',
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      authors: [article.author.name],
      images: [{ url: ogImage, width: 1200, height: 630, alt: article.heroImage?.alt ?? article.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: article.description,
      images: [ogImage],
    },
  };
}

export function generateStaticParams() {
  return listArticles().map((a) => ({ slug: a.slug }));
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = findArticle(slug);
  if (!article) notFound();

  const url = `${SITE_URL}/blog/${article.slug}`;

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    author: {
      '@type': 'Organization',
      name: article.author.name,
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: 'WeCarely',
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/icon.png`,
      },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'WeCarely', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Articles', item: `${SITE_URL}/blog` },
      { '@type': 'ListItem', position: 3, name: article.title, item: url },
    ],
  };

  const otherArticles = listArticles().filter((a) => a.slug !== article.slug).slice(0, 4);

  const publishedDisplay = new Date(article.publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Breadcrumb */}
      <div className="border-b border-[var(--line)]">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-10 py-4">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-[12.5px] text-[var(--ink-2)]"
          >
            <Link href="/blog" className="hover:text-[var(--ink)] underline-offset-3 hover:underline">
              Articles
            </Link>
            <span className="text-[var(--ink-3)]" aria-hidden>/</span>
            <span className="text-[var(--ink)] truncate max-w-[60ch]">{article.title}</span>
          </nav>
        </div>
      </div>

      {/* HERO */}
      <section className="border-b border-[var(--line)]">
        <div className="mx-auto max-w-[820px] px-6 lg:px-10 pt-16 pb-10 lg:pt-20 lg:pb-14">
          <span className="eyebrow">{article.topic}</span>
          <h1
            className="font-display mt-5 text-[var(--ink)]"
            style={{
              fontSize: 'clamp(34px, 4.5vw, 56px)',
              lineHeight: 1.08,
              letterSpacing: '-0.005em',
              fontWeight: 400,
            }}
          >
            {article.title}
          </h1>
          <p className="mt-6 text-[17px] leading-[1.55] text-[var(--ink-2)]">
            {article.description}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px] text-[var(--ink-2)]">
            <span>
              By <span className="text-[var(--ink)]">{article.author.name}</span>
            </span>
            <span className="text-[var(--ink-4)]" aria-hidden>·</span>
            <time dateTime={article.publishedAt}>{publishedDisplay}</time>
          </div>
        </div>
      </section>

      {/* HERO IMAGE */}
      {article.heroImage && (
        <figure className="mx-auto max-w-[1100px] px-6 lg:px-10 pt-10 lg:pt-14">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={article.heroImage.src}
            alt={article.heroImage.alt}
            className="w-full h-auto rounded-[12px]"
            style={{ aspectRatio: '16 / 9', objectFit: 'cover' }}
          />
          <figcaption className="mt-3 text-[12px] text-[var(--ink-3)] text-right font-mono tracking-wide">
            {article.heroImage.credit}
          </figcaption>
        </figure>
      )}

      {/* BODY */}
      <article className="mx-auto max-w-[760px] px-6 lg:px-10 py-10 lg:py-14 prose-wecarely">
        {article.body()}
      </article>

      {/* SUPPORT */}
      <div className="mx-auto max-w-[760px] px-6 lg:px-10 pb-10 lg:pb-14">
        <div
          className="rounded-[12px] px-7 py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-5"
          style={{ background: 'var(--bg-soft)', border: '1px solid var(--line)' }}
        >
          <div>
            <p className="font-display text-[var(--ink)] mb-1" style={{ fontSize: 16, fontWeight: 500 }}>
              Found this useful?
            </p>
            <p className="text-[13.5px] text-[var(--ink-2)] leading-relaxed">
              WeCarely is free, independent, and has no ads. Your support keeps it that way.
            </p>
          </div>
          <a
            href="https://ko-fi.com/brucenote"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-medium transition-colors hover:opacity-90"
            style={{ background: '#FF5E5B', color: 'white', fontSize: 14 }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z"/>
            </svg>
            Support on Ko-fi
          </a>
        </div>
      </div>

      {/* MORE ARTICLES */}
      {otherArticles.length > 0 && (
        <section className="border-t border-[var(--line)] bg-[var(--bg-soft)]">
          <div className="mx-auto max-w-[1320px] px-6 lg:px-10 py-12 lg:py-16">
            <p className="eyebrow mb-5">More articles</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">
              {otherArticles.map((a) => (
                <Link
                  key={a.slug}
                  href={`/blog/${a.slug}`}
                  className="group block py-3 border-b border-[var(--line)]"
                >
                  <span className="eyebrow block mb-1.5">{a.topic}</span>
                  <p className="font-display text-[20px] leading-tight text-[var(--ink)] group-hover:underline underline-offset-4">
                    {a.title}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="border-t border-[var(--line)]">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-10 py-14 text-center">
          <p className="font-display italic text-[var(--ink-2)] mb-5" style={{ fontSize: 18 }}>
            Ready to compare agencies?
          </p>
          <Link
            href="/houston"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-[10px] border border-[var(--ink)] text-[var(--ink)] font-medium hover:bg-[var(--ink)] hover:text-white transition-colors"
            style={{ fontSize: 15 }}
          >
            Browse Houston home care directory
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="m9 18 6-6-6-6" />
            </svg>
          </Link>
        </div>
      </section>
    </>
  );
}
