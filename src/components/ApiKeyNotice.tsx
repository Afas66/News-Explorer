import { AlertCircle, Key, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

export const ApiKeyNotice = () => {
  return (
    <div className="mx-auto max-w-2xl rounded-xl border border-primary/30 bg-primary/5 p-6 animate-fade-up">
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
          <Key className="w-5 h-5 text-primary" />
        </div>
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-primary" />
            <h3 className="font-semibold text-foreground">API Key Required</h3>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            To use this news search, you'll need a free API key from NewsAPI. 
            Get your key and add it to the application to start searching millions of articles.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Button asChild variant="hero" size="sm">
              <a 
                href="https://newsapi.org/register" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                Get Free API Key
                <ExternalLink className="w-3 h-3" />
              </a>
            </Button>
            <Button asChild variant="outline" size="sm">
              <a 
                href="https://newsapi.org/docs/get-started" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                View Documentation
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
