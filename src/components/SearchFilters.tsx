import {
  SearchFilters as Filters,
  LANGUAGES,
  SORT_OPTIONS,
} from "@/types/news";
import { Button } from "@/components/ui/button";
import { Search, CalendarIcon, Globe, SortDesc, X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DatePickerWithYear } from "./DatePickerWithYear";

interface SearchFiltersProps {
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
  onSearch: () => void;
  isLoading: boolean;
}

export const SearchFilters = ({
  filters,
  onFiltersChange,
  onSearch,
  isLoading,
}: SearchFiltersProps) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      onSearch();
    }
  };

  const clearFilters = () => {
    onFiltersChange({
      keyword: "",
      fromDate: "",
      toDate: "",
      language: "en",
      sortBy: "publishedAt",
    });
  };

  const hasActiveFilters =
    filters.keyword || filters.fromDate || filters.toDate;

  return (
    <div className="space-y-6">
      {/* Main Search */}
      <div className="relative">
        <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search for news articles..."
          value={filters.keyword}
          onChange={(e) =>
            onFiltersChange({ ...filters, keyword: e.target.value })
          }
          onKeyDown={handleKeyDown}
          className="search-input pl-14"
        />
        {filters.keyword && (
          <button
            onClick={() => onFiltersChange({ ...filters, keyword: "" })}
            className="absolute right-5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Filter Row */}
      <div className="flex flex-col lg:flex-row flex-wrap items-stretch lg:items-center gap-3 sm:gap-4">
        {/* Date Range */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full lg:w-auto lg:flex-1">
          <div className="flex items-center gap-2">
            <CalendarIcon className="w-4 h-4 text-muted-foreground shrink-0" />
            <span className="text-sm text-muted-foreground sm:hidden">
              From:
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 flex-1">
            <DatePickerWithYear
              value={filters.fromDate}
              onChange={(date) =>
                onFiltersChange({ ...filters, fromDate: date })
              }
              placeholder="From date"
            />

            <span className="text-muted-foreground text-center hidden sm:block">
              to
            </span>
            <span className="text-sm text-muted-foreground sm:hidden flex items-center gap-2">
              <CalendarIcon className="w-4 h-4 shrink-0" />
              To:
            </span>

            <DatePickerWithYear
              value={filters.toDate}
              onChange={(date) => onFiltersChange({ ...filters, toDate: date })}
              placeholder="To date"
            />
          </div>
        </div>

        {/* Language & Sort Row */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full lg:w-auto">
          {/* Language */}
          <div className="flex items-center gap-2 flex-1 sm:flex-initial">
            <Globe className="w-4 h-4 text-muted-foreground shrink-0" />
            <Select
              value={filters.language}
              onValueChange={(value) =>
                onFiltersChange({ ...filters, language: value })
              }
            >
              <SelectTrigger className="flex-1 sm:w-[140px] bg-input border-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {LANGUAGES.map((lang) => (
                  <SelectItem key={lang.value} value={lang.value}>
                    {lang.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Sort */}
          <div className="flex items-center gap-2 flex-1 sm:flex-initial">
            <SortDesc className="w-4 h-4 text-muted-foreground shrink-0" />
            <Select
              value={filters.sortBy}
              onValueChange={(value) =>
                onFiltersChange({ ...filters, sortBy: value })
              }
            >
              <SelectTrigger className="flex-1 sm:w-[160px] bg-input border-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {SORT_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 w-full sm:w-auto sm:ml-auto justify-end">
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="shrink-0"
            >
              Clear all
            </Button>
          )}
          <Button
            variant="hero"
            size="lg"
            onClick={onSearch}
            disabled={isLoading || !filters.keyword.trim()}
            className="flex-1 sm:flex-initial"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                Searching...
              </span>
            ) : (
              <>
                <Search className="w-4 h-4" />
                Search
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};
