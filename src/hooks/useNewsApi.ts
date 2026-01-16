import { useState, useCallback } from 'react';
import { NewsArticle, SearchFilters } from '@/types/news';
import { toast } from 'sonner';

const API_KEY = 'f4f2928a7e174e09a05706a63099a253'; // added my API key

interface UseNewsApiReturn {
  articles: NewsArticle[];
  isLoading: boolean;
  error: string | null;
  totalResults: number;
  searchNews: (filters: SearchFilters) => Promise<void>;
  hasApiKey: boolean;
}

export const useNewsApi = (): UseNewsApiReturn => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalResults, setTotalResults] = useState(0);

  const hasApiKey = Boolean(API_KEY);

  const searchNews = useCallback(async (filters: SearchFilters) => {
    if (!filters.keyword.trim()) {
      toast.error('Please enter a search keyword');
      return;
    }

    if (!API_KEY) {
      toast.error('Please add your NewsAPI key to use this feature');
      setError('API key not configured');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams({
        q: filters.keyword.trim(),
        language: filters.language, // default to 'en' if not provided//
        sortBy: filters.sortBy,
        pageSize: "20",
        apiKey: API_KEY,
      });

      if (filters.fromDate) {
        params.append('from', filters.fromDate);
      }
      if (filters.toDate) {
        params.append('to', filters.toDate);
      }

      const response = await fetch(
        `https://newsapi.org/v2/everything?${params.toString()}`
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch news');
      }

      const data = await response.json();

      if (data.status === 'error') {
        throw new Error(data.message);
      }

      setArticles(data.articles || []);
      setTotalResults(data.totalResults || 0);

      if (data.articles?.length > 0) {
        toast.success(`Found ${data.totalResults.toLocaleString()} articles`);
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An error occurred';
      setError(message);
      toast.error(message);
      setArticles([]);
      setTotalResults(0);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    articles,
    isLoading,
    error,
    totalResults,
    searchNews,
    hasApiKey,
  };
};
