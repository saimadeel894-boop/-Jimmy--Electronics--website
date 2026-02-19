import { NavLink } from "@/components/NavLink";
import { Menu, MessageCircle, Plus, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

// Matches reference: Home, Best Sellers (+), Parts & Accessories, Support (+), Deals (+), Blog
const navLinks = [
  { label: "Home", to: "/", hasDropdown: false },
  { label: "Best Sellers", to: "/best-sellers", hasDropdown: true },
  { label: "Parts & Accessories", to: "/category/parts-accessories", hasDropdown: false },
  { label: "Support", to: "/support", hasDropdown: true },
  { label: "Deals", to: "/deals", hasDropdown: true },
  { label: "Blog", to: "/blog", hasDropdown: false },
];

const WHATSAPP_NUMBER = "27100001234";
const WHATSAPP_MSG = encodeURIComponent("Hi, I need help with a Jimmy Africa product.");

const Navigation = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="z-nav w-full bg-primary">
      <div className="container-jimmy flex h-12 items-center justify-between">

        {/* Desktop Nav Links */}
        <ul className="hidden items-center gap-0 md:flex">
          {navLinks.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-primary-foreground/80 transition-colors hover:text-primary-foreground"
                activeClassName="text-accent font-semibold"
              >
                {link.label}
                {link.hasDropdown && (
                  <Plus className="h-3.5 w-3.5 text-primary-foreground/60" />
                )}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Desktop Right — DHL pill + WhatsApp */}
        <div className="hidden items-center gap-2 md:flex">
          {/* DHL Yellow Badge — matches reference */}
          <div className="flex items-center gap-2 rounded-sm bg-accent px-3 py-1.5">
            <ShieldCheck className="h-4 w-4 text-accent-foreground" />
            <div className="leading-tight">
              <p className="text-[10px] font-semibold text-accent-foreground/80 uppercase tracking-wide">
                Free DHL Express:
              </p>
              <p className="text-xs font-bold text-accent-foreground">
                Arrives by 21st Feb 2026
              </p>
            </div>
          </div>

          {/* WhatsApp Green Button */}
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="flex items-center gap-2 rounded-sm bg-jimmy-green px-3 py-2 text-sm font-semibold text-primary-foreground hover:bg-jimmy-green/90 transition-colors">
              <MessageCircle className="h-4 w-4" />
              Live Chat via WhatsApp
            </button>
          </a>
        </div>

        {/* Mobile: hamburger + delivery text + whatsapp */}
        <div className="flex w-full items-center justify-between md:hidden">
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 text-primary-foreground hover:bg-primary-foreground/10"
                aria-label="Open navigation menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>

            <SheetContent side="left" className="w-[300px] bg-primary p-0 text-primary-foreground">
              <SheetHeader className="border-b border-primary-foreground/10 px-5 py-4">
                <SheetTitle className="text-left text-lg font-bold text-primary-foreground">
                  JIMMY <span className="text-xs font-normal text-primary-foreground/60">Official Africa</span>
                </SheetTitle>
              </SheetHeader>

              <ul className="flex flex-col py-2">
                {navLinks.map((link) => (
                  <li key={link.to}>
                    <NavLink
                      to={link.to}
                      className="flex items-center justify-between px-5 py-3.5 text-sm font-medium text-primary-foreground/80 transition-colors hover:bg-primary-foreground/10 hover:text-primary-foreground"
                      activeClassName="text-accent font-semibold bg-primary-foreground/10"
                      onClick={() => setMobileOpen(false)}
                    >
                      <span>{link.label}</span>
                      {link.hasDropdown && <Plus className="h-4 w-4 text-primary-foreground/50" />}
                    </NavLink>
                  </li>
                ))}
              </ul>

              <div className="border-t border-primary-foreground/10 px-5 py-4 space-y-3">
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Button className="w-full gap-2 rounded-sm bg-jimmy-green text-sm font-semibold hover:bg-jimmy-green/90">
                    <MessageCircle className="h-4 w-4" />
                    Live Chat via WhatsApp
                  </Button>
                </a>
                <p className="text-center text-xs text-primary-foreground/50">
                  Free DHL Express delivery on orders over R2,500
                </p>
              </div>
            </SheetContent>
          </Sheet>

          <span className="text-xs font-medium text-primary-foreground/80">
            FREE Shipping on orders R2,500+
          </span>

          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="ghost" size="icon" className="h-9 w-9 text-primary-foreground hover:bg-primary-foreground/10">
              <MessageCircle className="h-4 w-4" />
            </Button>
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
