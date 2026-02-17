import { NavLink } from "@/components/NavLink";
import { Menu, X, MessageCircle } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Best Sellers", to: "/best-sellers" },
  { label: "Shop All", to: "/shop" },
  { label: "Parts & Accessories", to: "/category/parts-accessories" },
  { label: "Support", to: "/support" },
  { label: "Deals", to: "/deals" },
  { label: "Blog", to: "/blog" },
];

const Navigation = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="z-nav w-full bg-primary text-primary-foreground">
      <div className="container-jimmy flex h-12 items-center justify-between">
        {/* Desktop Nav */}
        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                className="rounded-md px-3 py-1.5 text-sm font-medium text-primary-foreground/80 transition-colors hover:bg-primary-foreground/10 hover:text-primary-foreground"
                activeClassName="bg-primary-foreground/15 text-primary-foreground"
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Right side badges */}
        <div className="hidden items-center gap-3 md:flex">
          <span className="flex items-center gap-1.5 rounded-full bg-accent px-3 py-1 text-xs font-bold text-accent-foreground">
            DHL Express Shipping
          </span>
          <Button
            size="sm"
            className="h-8 gap-1.5 rounded-full bg-jimmy-green text-sm font-medium text-primary-foreground hover:bg-jimmy-green/90"
          >
            <MessageCircle className="h-3.5 w-3.5" />
            WhatsApp
          </Button>
        </div>

        {/* Mobile menu */}
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground/10">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72 bg-primary p-0 text-primary-foreground">
            <SheetHeader className="border-b border-primary-foreground/10 p-4">
              <SheetTitle className="text-left text-lg font-bold text-primary-foreground">
                JIMMY<span className="text-accent">AFRICA</span>
              </SheetTitle>
            </SheetHeader>
            <ul className="flex flex-col p-4">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    className="block rounded-md px-3 py-3 text-sm font-medium text-primary-foreground/80 transition-colors hover:bg-primary-foreground/10 hover:text-primary-foreground"
                    activeClassName="bg-primary-foreground/15 text-primary-foreground"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
            <div className="border-t border-primary-foreground/10 p-4">
              <Button className="w-full gap-2 rounded-full bg-jimmy-green text-sm font-medium hover:bg-jimmy-green/90">
                <MessageCircle className="h-4 w-4" />
                WhatsApp Us
              </Button>
            </div>
          </SheetContent>
        </Sheet>

        {/* Mobile right */}
        <span className="flex items-center gap-1.5 text-xs font-medium text-primary-foreground/80 md:hidden">
          Free Delivery R1,500+
        </span>
      </div>
    </nav>
  );
};

export default Navigation;
