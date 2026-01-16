export interface NewsArticle {
  source: {
    id: string | null;
    name: string;
  };
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
}

export interface NewsApiResponse {
  status: string;
  totalResults: number;
  articles: NewsArticle[];
}

export interface SearchFilters {
  keyword: string;
  fromDate: string;
  toDate: string;
  language: string;
  sortBy: string;
}

export const LANGUAGES = [
  { value: 'en', label: 'English' },
  { value: 'es', label: 'Spanish' },
  { value: 'fr', label: 'French' },
  { value: 'de', label: 'German' },
  { value: 'it', label: 'Italian' },
  { value: 'pt', label: 'Portuguese' },
  { value: 'ru', label: 'Russian' },
  { value: 'ar', label: 'Arabic' },
  { value: 'zh', label: 'Chinese' },
] as const;

export const SORT_OPTIONS = [
  { value: 'publishedAt', label: 'Newest First' },
  { value: 'relevancy', label: 'Most Relevant' },
  { value: 'popularity', label: 'Most Popular' },
] as const;
