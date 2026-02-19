import { Search, MapPin, User, ShoppingCart, X, Heart, Phone } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

// Mock cart count — replace with real state/context later
const MOCK_CART_COUNT = 3;

const Header = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);

  // Sticky shadow on scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 4);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Auto-focus search on mobile open
  useEffect(() => {
    if (searchOpen) searchRef.current?.focus();
  }, [searchOpen]);

  return (
    <header
      className={cn(
        "sticky top-0 z-header w-full border-b bg-background transition-shadow duration-200",
        scrolled && "shadow-soft"
      )}
    >
      {/* Mobile search overlay */}
      {searchOpen && (
        <div className="absolute inset-0 z-10 flex items-center gap-3 bg-background px-4 md:hidden">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              ref={searchRef}
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search products..."
              className="h-10 w-full rounded-full border-border bg-secondary pl-10 pr-10 text-sm focus-visible:ring-primary"
            />
            {searchValue && (
              <button
                onClick={() => setSearchValue("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => { setSearchOpen(false); setSearchValue(""); }}
            className="text-muted-foreground"
          >
            Cancel
          </Button>
        </div>
      )}

      <div className="container-jimmy flex h-20 items-center gap-4">
        {/* Logo */}
        <Link to="/" className="flex shrink-0 items-center">
          <span className="text-2xl font-bold tracking-tight text-primary">
            JIMMY<span className="text-accent">AFRICA</span>
          </span>
        </Link>

        {/* Desktop Search */}
        <div className="hidden flex-1 max-w-xl md:flex">
          <div className="relative w-full group">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary" />
            <Input
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search products, brands, categories..."
              className="h-10 w-full rounded-full border-border bg-secondary pl-10 pr-10 text-sm transition-all focus-visible:bg-background focus-visible:ring-primary"
            />
            {searchValue && (
              <button
                onClick={() => setSearchValue("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        {/* Right Actions */}
        <div className="ml-auto flex items-center gap-0.5 sm:gap-1">
          {/* Phone — desktop only */}
          <a
            href="tel:+27100001234"
            className="hidden items-center gap-1.5 rounded-md px-2 py-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground lg:flex"
          >
            <Phone className="h-3.5 w-3.5" />
            <span className="font-medium">+27 10 000 1234</span>
          </a>

          {/* Store Locator */}
          <Button
            variant="ghost"
            size="icon"
            className="hidden text-foreground/70 hover:text-foreground sm:flex"
            aria-label="Store Locator"
          >
            <MapPin className="h-5 w-5" />
          </Button>

          {/* Mobile Search Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="text-foreground/70 hover:text-foreground md:hidden"
            aria-label="Search"
            onClick={() => setSearchOpen(true)}
          >
            <Search className="h-5 w-5" />
          </Button>

          {/* Wishlist */}
          <Button
            variant="ghost"
            size="icon"
            className="hidden text-foreground/70 hover:text-foreground sm:flex"
            aria-label="Wishlist"
          >
            <Heart className="h-5 w-5" />
          </Button>

          {/* Account */}
          <Button
            variant="ghost"
            size="icon"
            className="text-foreground/70 hover:text-foreground"
            aria-label="My Account"
          >
            <User className="h-5 w-5" />
          </Button>

          {/* Cart */}
          <Button
            variant="ghost"
            size="icon"
            className="relative text-foreground/70 hover:text-foreground"
            aria-label={`Cart — ${MOCK_CART_COUNT} items`}
          >
            <ShoppingCart className="h-5 w-5" />
            {MOCK_CART_COUNT > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-accent px-1 text-[10px] font-bold leading-none text-accent-foreground">
                {MOCK_CART_COUNT > 99 ? "99+" : MOCK_CART_COUNT}
              </span>
            )}
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
