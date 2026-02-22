import { Search, X, ArrowRight } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

const popularSearches = [
  "PW11 Pro Max",
  "Cordless Vacuum",
  "Hair Dryer",
  "Air Fryer",
  "Spare Parts",
  "Water Purifier",
];

interface SearchOverlayProps {
  open: boolean;
  onClose: () => void;
}

const SearchOverlay = ({ open, onClose }: SearchOverlayProps) => {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery("");
    }
  }, [open]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-modal">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative mx-auto mt-0 w-full max-w-3xl bg-background shadow-strong animate-in slide-in-from-top-2 duration-200">
        <div className="flex items-center gap-3 border-b px-5 py-4">
          <Search className="h-5 w-5 shrink-0 text-muted-foreground" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products, categories, articles…"
            className="flex-1 bg-transparent text-base text-foreground placeholder:text-muted-foreground outline-none"
          />
          {query && (
            <button onClick={() => setQuery("")} className="text-muted-foreground hover:text-foreground">
              <X className="h-4 w-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="ml-2 rounded-sm px-3 py-1 text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            ESC
          </button>
        </div>

        <div className="px-5 py-6">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Popular Searches
          </p>
          <div className="flex flex-wrap gap-2">
            {popularSearches.map((term) => (
              <button
                key={term}
                onClick={() => setQuery(term)}
                className={cn(
                  "rounded-full border px-3.5 py-1.5 text-sm transition-colors",
                  "hover:border-primary hover:text-primary",
                  query === term && "border-primary bg-primary/5 text-primary font-medium"
                )}
              >
                {term}
              </button>
            ))}
          </div>
          {query && (
            <button className="mt-6 flex items-center gap-2 text-sm font-semibold text-primary hover:underline">
              Search for "{query}" <ArrowRight className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchOverlay;
