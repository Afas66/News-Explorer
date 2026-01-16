import { NewsArticle } from "@/types/news";
import { NewsCard } from "./NewsCard";
import { Newspaper } from "lucide-react";

interface NewsGridProps {
  articles: NewsArticle[];
  isLoading: boolean;
  hasSearched: boolean;
}

export const NewsGrid = ({
  articles,
  isLoading,
  hasSearched,
}: NewsGridProps) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="news-card">
            <div className="h-48 bg-muted animate-pulse" />
            <div className="p-6 space-y-4">
              <div className="flex gap-2">
                <div className="w-20 h-5 bg-muted rounded-full animate-pulse" />
                <div className="w-24 h-5 bg-muted rounded animate-pulse" />
              </div>
              <div className="space-y-2">
                <div className="h-6 bg-muted rounded animate-pulse" />
                <div className="h-6 bg-muted rounded animate-pulse w-3/4" />
              </div>
              <div className="space-y-2">
                <div className="h-4 bg-muted rounded animate-pulse" />
                <div className="h-4 bg-muted rounded animate-pulse" />
                <div className="h-4 bg-muted rounded animate-pulse w-1/2" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!hasSearched) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mb-6">
          <Newspaper className="w-12 h-12 text-primary" />
        </div>
        <h2 className="font-display text-2xl font-semibold mb-2">
          Discover the Latest News
        </h2>
        <p className="text-muted-foreground max-w-md">
          Enter a keyword above to search through millions of articles from news
          sources around the world.
        </p>
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mb-6">
          <Newspaper className="w-12 h-12 text-muted-foreground" />
        </div>
        <h2 className="font-display text-2xl font-semibold mb-2">
          No Articles Found
        </h2>
        <p className="text-muted-foreground max-w-md">
          Try adjusting your search terms or filters to find what you're looking
          for.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {articles.map((article, index) => (
        <NewsCard
          key={`${article.url}-${index}`}
          article={article}
          index={index}
        />
      ))}
    </div>
  );
};
