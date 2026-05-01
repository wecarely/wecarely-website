import type { ReactNode } from 'react';

export interface ArticleAuthor {
  name: string;
  role: string;
}

export interface ArticleImage {
  /** Public path under /public, e.g. "/blog/.../hero.jpg" */
  src: string;
  /** Descriptive alt text — neutral, no implied endorsement. */
  alt: string;
  /** "Photo by Name on Pexels" or similar. Required for editorial transparency. */
  credit: string;
}

export interface Article {
  slug: string;
  title: string;
  /** Short SEO description (150-160 chars). Also used as article dek. */
  description: string;
  publishedAt: string;
  updatedAt: string;
  author: ArticleAuthor;
  /** One-line topic label shown in eyebrow + index card. */
  topic: string;
  /** Optional hero image rendered between byline and body. */
  heroImage?: ArticleImage;
  /** Article body — rendered inside <article className="prose-wecarely">. */
  body: () => ReactNode;
}

import { howToChooseHoustonHomeCare } from './articles/how-to-choose-houston-home-care';
import { medicareHomeHealthVsPrivateHomeCare } from './articles/medicare-home-health-vs-private-home-care';

export const ARTICLES: Article[] = [
  howToChooseHoustonHomeCare,
  medicareHomeHealthVsPrivateHomeCare,
];

export function findArticle(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}

export function listArticles(): Article[] {
  return [...ARTICLES].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}
