import { NavLink } from "@/components/NavLink";
import { Menu, MessageCircle, ChevronDown, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Best Sellers", to: "/best-sellers" },
  { label: "Shop All", to: "/shop" },
  { label: "Parts & Accessories", to: "/category/parts-accessories" },
  { label: "Support", to: "/support" },
  { label: "Deals", to: "/deals", badge: "Hot" },
  { label: "Blog", to: "/blog" },
];

const WHATSAPP_NUMBER = "27100001234";
const WHATSAPP_MSG = encodeURIComponent("Hi, I need help with a Jimmy Africa product.");

const Navigation = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="z-nav w-full bg-primary text-primary-foreground">
      <div className="container-jimmy flex h-12 items-center justify-between gap-4">
        {/* Desktop Nav Links */}
        <ul className="hidden items-center gap-0.5 md:flex">
          {navLinks.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                className="group relative flex items-center gap-1 rounded-md px-3 py-1.5 text-sm font-medium text-primary-foreground/80 transition-colors hover:bg-primary-foreground/10 hover:text-primary-foreground"
                activeClassName="bg-primary-foreground/15 text-primary-foreground"
              >
                {link.label}
                {link.badge && (
                  <span className="ml-1 rounded-full bg-accent px-1.5 py-0.5 text-[10px] font-bold leading-none text-accent-foreground">
                    {link.badge}
                  </span>
                )}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Desktop Right side badges */}
        <div className="hidden items-center gap-3 md:flex">
          <span className="flex items-center gap-1.5 rounded-full bg-primary-foreground/10 px-3 py-1 text-xs font-semibold text-primary-foreground/90 ring-1 ring-primary-foreground/20">
            ✈ DHL Express Shipping
          </span>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              size="sm"
              className="h-8 gap-1.5 rounded-full bg-jimmy-green px-4 text-sm font-semibold text-primary-foreground hover:bg-jimmy-green/90"
            >
              <MessageCircle className="h-3.5 w-3.5" />
              WhatsApp Us
            </Button>
          </a>
        </div>

        {/* Mobile: hamburger + free delivery text */}
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

            <SheetContent
              side="left"
              className="w-[300px] bg-primary p-0 text-primary-foreground"
            >
              {/* Drawer Header */}
              <SheetHeader className="border-b border-primary-foreground/10 px-5 py-4">
                <SheetTitle className="text-left text-lg font-bold text-primary-foreground">
                  JIMMY<span className="text-accent">AFRICA</span>
                </SheetTitle>
              </SheetHeader>

              {/* Nav Links */}
              <ul className="flex flex-col py-2">
                {navLinks.map((link) => (
                  <li key={link.to}>
                    <NavLink
                      to={link.to}
                      className="flex items-center justify-between px-5 py-3.5 text-sm font-medium text-primary-foreground/80 transition-colors hover:bg-primary-foreground/10 hover:text-primary-foreground"
                      activeClassName="bg-primary-foreground/15 text-primary-foreground"
                      onClick={() => setMobileOpen(false)}
                    >
                      <span>{link.label}</span>
                      {link.badge && (
                        <span className="rounded-full bg-accent px-2 py-0.5 text-[10px] font-bold text-accent-foreground">
                          {link.badge}
                        </span>
                      )}
                    </NavLink>
                  </li>
                ))}
              </ul>

              {/* Drawer Footer CTAs */}
              <div className="border-t border-primary-foreground/10 px-5 py-4 space-y-3">
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Button className="w-full gap-2 rounded-full bg-jimmy-green text-sm font-semibold hover:bg-jimmy-green/90">
                    <MessageCircle className="h-4 w-4" />
                    WhatsApp Us
                  </Button>
                </a>
                <p className="text-center text-xs text-primary-foreground/50">
                  Free delivery on orders over R1,500
                </p>
              </div>
            </SheetContent>
          </Sheet>

          <span className="flex items-center gap-1 text-xs font-medium text-primary-foreground/80">
            🚚 Free Delivery R1,500+
          </span>

          {/* Mobile WhatsApp quick link */}
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 text-primary-foreground hover:bg-primary-foreground/10"
              aria-label="WhatsApp Us"
            >
              <MessageCircle className="h-4 w-4" />
            </Button>
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
