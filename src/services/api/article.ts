import { getStaticData, getStaticItem } from '../dataService';

export interface Article {
  id: number;
  title: string;
  content: string;
  author: string;
  categories: string[];
  featuredImage?: string;
  publishedAt: string;
}

export const fetchArticles = (params?: Record<string, any>) => getStaticData<Article>('articles', params);
export const fetchArticle = (id: number) => getStaticItem<Article>('articles', id);
export const createArticle = async (articleData: Omit<Article, 'id' | 'publishedAt'>) => {
  throw new Error('Article creation should use Next.js API routes instead of this service');
};