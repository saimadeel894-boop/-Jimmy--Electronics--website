import { Search, MapPin, User, ShoppingCart, X, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

const MOCK_CART_COUNT = 3;

const Header = () => {
  const [searchValue, setSearchValue] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 4);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-header w-full bg-primary transition-shadow duration-200",
        scrolled && "shadow-strong"
      )}
    >
      <div className="container-jimmy flex h-[72px] items-center gap-4">

        {/* Logo */}
        <Link to="/" className="flex shrink-0 items-center gap-2 mr-4">
          <div className="flex flex-col leading-none">
            <span className="text-xl font-extrabold tracking-tight text-primary-foreground">
              JIMMY
            </span>
            <span className="text-[9px] font-semibold uppercase tracking-widest text-primary-foreground/70 leading-tight">
              Official Africa Exclusive Distributor
            </span>
          </div>
        </Link>

        {/* Search Bar — center, takes most space */}
        <div className="flex-1 max-w-2xl">
          <div className="relative w-full">
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search vacuum, hair dryer, spare parts…"
              className="h-10 w-full rounded-sm border-0 bg-primary-foreground pl-4 pr-10 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
            />
            {searchValue ? (
              <button
                onClick={() => setSearchValue("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            ) : (
              <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            )}
          </div>
        </div>

        {/* Delivering To */}
        <button className="hidden items-center gap-2 text-primary-foreground/90 hover:text-primary-foreground lg:flex shrink-0">
          <MapPin className="h-5 w-5 shrink-0" />
          <div className="text-left leading-tight">
            <p className="text-[10px] text-primary-foreground/70">Delivering to:</p>
            <p className="text-sm font-bold">South Africa</p>
          </div>
          <ChevronDown className="h-3.5 w-3.5 text-primary-foreground/60" />
        </button>

        {/* My Account */}
        <button className="hidden items-center gap-2 text-primary-foreground/90 hover:text-primary-foreground md:flex shrink-0">
          <User className="h-6 w-6 shrink-0" strokeWidth={1.5} />
          <span className="text-sm font-semibold">My Account</span>
        </button>

        {/* Cart */}
        <button
          className="relative flex items-center text-primary-foreground/90 hover:text-primary-foreground shrink-0"
          aria-label={`Cart — ${MOCK_CART_COUNT} items`}
        >
          <ShoppingCart className="h-6 w-6" strokeWidth={1.5} />
          {MOCK_CART_COUNT > 0 && (
            <span className="absolute -right-1.5 -top-1.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-accent px-1 text-[10px] font-bold leading-none text-accent-foreground">
              {MOCK_CART_COUNT > 99 ? "99+" : MOCK_CART_COUNT}
            </span>
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;
