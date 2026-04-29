import type { ReactNode } from 'react';

export interface ArticleAuthor {
  name: string;
  role: string;
}

export interface Article {
  slug: string;
  title: string;
  /** Short SEO description (150-160 chars). Also used as article dek. */
  description: string;
  publishedAt: string;
  updatedAt: string;
  author: ArticleAuthor;
  /** Reading-time minutes, rounded. */
  readingMinutes: number;
  /** One-line topic label shown in eyebrow + index card. */
  topic: string;
  /** Article body — rendered inside <article className="prose-wecarely">. */
  body: () => ReactNode;
}

import { howToChooseHoustonHomeCare } from './articles/how-to-choose-houston-home-care';

export const ARTICLES: Article[] = [howToChooseHoustonHomeCare];

export function findArticle(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}

export function listArticles(): Article[] {
  return [...ARTICLES].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}
