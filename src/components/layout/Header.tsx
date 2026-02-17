import { Search, MapPin, User, ShoppingCart } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="sticky top-0 z-header w-full border-b bg-background">
      <div className="container-jimmy flex h-20 items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/" className="flex shrink-0 items-center">
          <span className="text-2xl font-bold tracking-tight text-primary">
            JIMMY<span className="text-accent">AFRICA</span>
          </span>
        </Link>

        {/* Search */}
        <div className="hidden flex-1 max-w-xl md:flex">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              className="h-10 w-full rounded-full border-border bg-secondary pl-10 pr-4 text-sm focus-visible:ring-primary"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1 sm:gap-2">
          <Button variant="ghost" size="icon" className="hidden text-foreground sm:flex">
            <MapPin className="h-5 w-5" />
            <span className="sr-only">Store Locator</span>
          </Button>

          <Button variant="ghost" size="icon" className="text-foreground">
            <Search className="h-5 w-5 md:hidden" />
            <span className="sr-only">Search</span>
          </Button>

          <Button variant="ghost" size="icon" className="text-foreground">
            <User className="h-5 w-5" />
            <span className="sr-only">Account</span>
          </Button>

          <Button variant="ghost" size="icon" className="relative text-foreground">
            <ShoppingCart className="h-5 w-5" />
            <span className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-accent-foreground">
              0
            </span>
            <span className="sr-only">Cart</span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
