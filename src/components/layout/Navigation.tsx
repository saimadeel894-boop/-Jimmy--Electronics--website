import { NavLink } from "@/components/NavLink";
import { Menu, MessageCircle, ChevronDown, Plus, ShieldCheck } from "lucide-react";
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

interface NavItem {
  label: string;
  to: string;
  hasDropdown: boolean;
  children?: { label: string; to: string; desc?: string }[];
}

const navLinks: NavItem[] = [
  { label: "Home", to: "/", hasDropdown: false },
  {
    label: "Best Sellers",
    to: "/shop",
    hasDropdown: true,
    children: [
      { label: "Stick Vacuum Cleaners", to: "/category/stick-vacuum", desc: "Powerful cordless vacuums" },
      { label: "Wet & Dry Vacuums", to: "/category/wet-dry-vacuum", desc: "Multi-surface cleaning" },
      { label: "Bed Vacuum Cleaners", to: "/category/bed-vacuum", desc: "Anti-mite cleaning" },
      { label: "Kitchen Appliances", to: "/category/kitchen", desc: "Air fryers & blenders" },
      { label: "Hair Care", to: "/category/hair-care", desc: "Multi-stylers & dryers" },
      { label: "Water Purifiers", to: "/category/water-purifier", desc: "Clean water solutions" },
    ],
  },
  { label: "Parts & Accessories", to: "/category/parts-accessories", hasDropdown: false },
  {
    label: "Support",
    to: "/support",
    hasDropdown: true,
    children: [
      { label: "FAQ", to: "/support#faq" },
      { label: "Warranty", to: "/support#warranty" },
      { label: "Contact Us", to: "/support#contact" },
      { label: "Shipping Info", to: "/support#shipping" },
    ],
  },
  {
    label: "Deals",
    to: "/deals",
    hasDropdown: true,
    children: [
      { label: "Current Sales", to: "/deals", desc: "Products on sale now" },
      { label: "Bundles", to: "/deals", desc: "Save with bundles" },
    ],
  },
  { label: "Blog", to: "/blog", hasDropdown: false },
];

const WHATSAPP_NUMBER = "27100001234";
const WHATSAPP_MSG = encodeURIComponent("Hi, I need help with a Jimmy Africa product.");

const DropdownMenu = ({ items }: { items: NonNullable<NavItem["children"]> }) => (
  <div className="absolute left-0 top-full z-overlay min-w-[220px] rounded-md border bg-popover py-2 shadow-strong opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-150">
    {items.map((item) => (
      <Link
        key={item.to}
        to={item.to}
        className="block px-4 py-2.5 text-sm text-popover-foreground hover:bg-accent/10 hover:text-primary transition-colors"
      >
        <span className="font-medium">{item.label}</span>
        {item.desc && (
          <span className="block text-xs text-muted-foreground mt-0.5">{item.desc}</span>
        )}
      </Link>
    ))}
  </div>
);

const Navigation = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expandedMobile, setExpandedMobile] = useState<string | null>(null);

  return (
    <nav className="z-nav w-full bg-primary">
      <div className="container-jimmy flex h-12 items-center justify-between">

        {/* Desktop Nav Links */}
        <ul className="hidden items-center gap-0 md:flex">
          {navLinks.map((link) => (
            <li key={link.to} className="group relative">
              <NavLink
                to={link.to}
                className="flex items-center gap-1 px-3 py-3 text-sm font-medium text-primary-foreground/80 transition-colors hover:text-primary-foreground"
                activeClassName="text-accent font-semibold"
              >
                {link.label}
                {link.hasDropdown && (
                  <Plus className="h-3.5 w-3.5 text-primary-foreground/60 transition-transform group-hover:rotate-45" />
                )}
              </NavLink>
              {link.hasDropdown && link.children && (
                <DropdownMenu items={link.children} />
              )}
            </li>
          ))}
        </ul>

        {/* Desktop Right — DHL pill + WhatsApp */}
        <div className="hidden items-center gap-2 md:flex">
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
                    {link.hasDropdown ? (
                      <>
                        <button
                          onClick={() =>
                            setExpandedMobile(expandedMobile === link.label ? null : link.label)
                          }
                          className="flex w-full items-center justify-between px-5 py-3.5 text-sm font-medium text-primary-foreground/80 transition-colors hover:bg-primary-foreground/10 hover:text-primary-foreground"
                        >
                          <span>{link.label}</span>
                          <ChevronDown
                            className={cn(
                              "h-4 w-4 text-primary-foreground/50 transition-transform",
                              expandedMobile === link.label && "rotate-180"
                            )}
                          />
                        </button>
                        {expandedMobile === link.label && link.children && (
                          <ul className="bg-primary-foreground/5 py-1">
                            {link.children.map((child) => (
                              <li key={child.to}>
                                <NavLink
                                  to={child.to}
                                  className="block px-8 py-2.5 text-sm text-primary-foreground/70 hover:text-primary-foreground"
                                  onClick={() => setMobileOpen(false)}
                                >
                                  {child.label}
                                </NavLink>
                              </li>
                            ))}
                          </ul>
                        )}
                      </>
                    ) : (
                      <NavLink
                        to={link.to}
                        className="flex items-center justify-between px-5 py-3.5 text-sm font-medium text-primary-foreground/80 transition-colors hover:bg-primary-foreground/10 hover:text-primary-foreground"
                        activeClassName="text-accent font-semibold bg-primary-foreground/10"
                        onClick={() => setMobileOpen(false)}
                      >
                        <span>{link.label}</span>
                      </NavLink>
                    )}
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
