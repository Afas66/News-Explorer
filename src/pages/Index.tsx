import { useState } from "react";
import { SearchFilters } from "@/components/SearchFilters";
import { NewsGrid } from "@/components/NewsGrid";
import { ApiKeyNotice } from "@/components/ApiKeyNotice";
import { useNewsApi } from "@/hooks/useNewsApi";
import { SearchFilters as FiltersType } from "@/types/news";
import { Newspaper } from "lucide-react";

const Index = () => {
  const [filters, setFilters] = useState<FiltersType>({
    keyword: "",
    fromDate: "",
    toDate: "",
    language: "en",
    sortBy: "publishedAt",
  });
  const [hasSearched, setHasSearched] = useState(false);

  const { articles, isLoading, totalResults, searchNews, hasApiKey } =
    useNewsApi();

  const handleSearch = async () => {
    setHasSearched(true);
    await searchNews(filters);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Background Glow */}
      <div className="absolute inset-0 hero-glow pointer-events-none" />

      <div className="relative container px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-12 space-y-6 sm:space-y-8 md:space-y-12">
        {/* Header */}
        <header className="text-center space-y-3 sm:space-y-4 animate-fade-up">
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs sm:text-sm font-medium mb-2 sm:mb-4">
            <Newspaper className="w-3 h-3 sm:w-4 sm:h-4" />
            Powered by NewsAPI
          </div>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight">
            <span className="text-gradient">News</span>{" "}
            <span className="text-foreground">Explorer</span>
          </h1>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto px-2">
            Search through millions of articles from news sources around the
            world. Filter by date, language, and relevance.
          </p>
        </header>

        {/* API Key Notice */}
        {!hasApiKey && <ApiKeyNotice />}

        {/* Search Filters */}
        <section className="animate-fade-up stagger-2">
          <SearchFilters
            filters={filters}
            onFiltersChange={setFilters}
            onSearch={handleSearch}
            isLoading={isLoading}
          />
        </section>

        {/* Results Count */}
        {hasSearched && totalResults > 0 && (
          <div className="flex items-center justify-between border-b border-border pb-4 animate-fade-in">
            <p className="text-muted-foreground">
              Showing{" "}
              <span className="text-foreground font-medium">
                {articles.length}
              </span>{" "}
              of{" "}
              <span className="text-foreground font-medium">
                {totalResults.toLocaleString()}
              </span>{" "}
              results
              {filters.keyword && (
                <>
                  {" "}
                  for "<span className="text-primary">{filters.keyword}</span>"
                </>
              )}
            </p>
          </div>
        )}

        {/* News Grid */}
        <section>
          <NewsGrid
            articles={articles}
            isLoading={isLoading}
            hasSearched={hasSearched}
          />
        </section>

        {/* Footer */}
        <footer className="text-center pt-12 border-t border-border">
          <p className="text-sm text-muted-foreground">
            Data provided by{" "}
            <a
              href="https://newsapi.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              NewsAPI.org
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
