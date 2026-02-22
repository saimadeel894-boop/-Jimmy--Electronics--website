import { Search, MapPin, User, ChevronDown, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import CartDrawer from "./CartDrawer";
import SearchOverlay from "./SearchOverlay";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 4);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-header w-full bg-primary transition-shadow duration-200",
          scrolled && "shadow-strong"
        )}
      >
        <div className="container-jimmy flex h-[72px] items-center gap-4">

          {/* Logo */}
          <Link to="/" className="flex shrink-0 items-center mr-4">
            <img
              src="/images/logo-white.png"
              alt="Jimmy Africa - Official Exclusive Distributor"
              className="h-10 w-auto"
            />
          </Link>

          {/* Search Bar — desktop */}
          <div className="hidden flex-1 max-w-2xl md:block">
            <button
              onClick={() => setSearchOpen(true)}
              className="flex h-10 w-full items-center gap-3 rounded-sm bg-primary-foreground pl-4 pr-4 text-sm text-muted-foreground transition-shadow hover:ring-2 hover:ring-accent"
            >
              <Search className="h-4 w-4 shrink-0" />
              <span>Search vacuum, hair dryer, spare parts…</span>
            </button>
          </div>

          {/* Mobile search icon */}
          <div className="flex-1 md:hidden" />
          <button
            onClick={() => setSearchOpen(true)}
            className="flex items-center text-primary-foreground/90 hover:text-primary-foreground md:hidden"
            aria-label="Search"
          >
            <Search className="h-5 w-5" />
          </button>

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

          {/* Wishlist */}
          <button className="hidden text-primary-foreground/90 hover:text-primary-foreground lg:flex shrink-0" aria-label="Wishlist">
            <Heart className="h-5 w-5" strokeWidth={1.5} />
          </button>

          {/* Cart Drawer */}
          <CartDrawer />
        </div>
      </header>

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
};

export default Header;
