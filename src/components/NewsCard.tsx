import { NewsArticle } from "@/types/news";
import { Calendar, ExternalLink, User } from "lucide-react";
import { format } from "date-fns";

interface NewsCardProps {
  article: NewsArticle;
  index: number;
}

export const NewsCard = ({ article, index }: NewsCardProps) => {
  const formattedDate = article.publishedAt
    ? format(new Date(article.publishedAt), "MMM d, yyyy")
    : "Unknown date";

  return (
    <article
      className={`news-card group opacity-0 animate-fade-up stagger-${
        (index % 5) + 1
      }`}
    >
      {article.urlToImage && (
        <div className="relative h-48 overflow-hidden">
          <img
            src={article.urlToImage}
            alt={article.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
        </div>
      )}

      <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs text-muted-foreground">
          <span className="px-2 py-1 rounded-full bg-primary/10 text-primary font-medium truncate max-w-[150px]">
            {article.source.name}
          </span>
          <span className="flex items-center gap-1 shrink-0">
            <Calendar className="w-3 h-3" />
            {formattedDate}
          </span>
        </div>

        <h3 className="font-display text-lg sm:text-xl font-semibold leading-tight line-clamp-2 group-hover:text-primary transition-colors">
          {article.title}
        </h3>

        {article.description && (
          <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
            {article.description}
          </p>
        )}

        <div className="flex items-center justify-between pt-2">
          {article.author && (
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <User className="w-3 h-3" />
              <span className="truncate max-w-[150px]">{article.author}</span>
            </span>
          )}

          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-sm text-primary font-medium hover:underline ml-auto"
          >
            Read more
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </article>
  );
};
