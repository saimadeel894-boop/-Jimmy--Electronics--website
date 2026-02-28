import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from "lucide-react";

const footerLinks = {
  shop: [
    { label: "Stick Vacuum Cleaners", to: "/category/stick-vacuum" },
    { label: "Wet & Dry Vacuums", to: "/category/wet-dry-vacuum" },
    { label: "Bed Vacuum Cleaners", to: "/category/bed-vacuum" },
    { label: "Kitchen Appliances", to: "/category/kitchen" },
    { label: "Hair Care", to: "/category/hair-care" },
    { label: "Water Purifiers", to: "/category/water-purifier" },
    { label: "Parts & Accessories", to: "/category/parts-accessories" },
  ],
  support: [
    { label: "FAQ", to: "/support#faq" },
    { label: "Contact Us", to: "/support#contact" },
    { label: "Warranty", to: "/support#warranty" },
    { label: "Shipping Info", to: "/support#shipping" },
    { label: "Returns", to: "/support#returns" },
  ],
  company: [
    { label: "About Us", to: "/about" },
    { label: "Blog", to: "/blog" },
    { label: "Careers", to: "/careers" },
    { label: "Privacy Policy", to: "/privacy" },
    { label: "Terms of Service", to: "/terms" },
  ],
};

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Youtube, href: "#", label: "YouTube" },
];

const paymentMethods = ["Visa", "Mastercard", "PayFast", "EFT", "SnapScan"];

const Footer = () => {
  return (
    <footer className="border-t bg-jimmy-dark text-primary-foreground/80">
      {/* Main Footer */}
      <div className="container-jimmy section-padding-md">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand Column */}
          <div className="space-y-4">
            <span className="text-xl font-bold text-primary-foreground">
              JIMMY<span className="text-accent">AFRICA</span>
            </span>
            <p className="text-sm leading-relaxed">
              Award-winning home appliances designed for modern African living. Premium quality, delivered to your door.
            </p>
            <div className="space-y-2 text-sm">
              <a href="mailto:support@jimmyafrica.com" className="flex items-center gap-2 transition-colors hover:text-primary-foreground">
                <Mail className="h-4 w-4 shrink-0" />
                support@jimmyafrica.com
              </a>
              <a href="tel:+27100001234" className="flex items-center gap-2 transition-colors hover:text-primary-foreground">
                <Phone className="h-4 w-4 shrink-0" />
                +27 10 000 1234
              </a>
              <span className="flex items-center gap-2">
                <MapPin className="h-4 w-4 shrink-0" />
                Johannesburg, South Africa
              </span>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-primary-foreground">Shop</h4>
            <ul className="space-y-2">
              {footerLinks.shop.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-sm transition-colors hover:text-primary-foreground">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-primary-foreground">Support</h4>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-sm transition-colors hover:text-primary-foreground">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-primary-foreground">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-sm transition-colors hover:text-primary-foreground">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="container-jimmy flex flex-col items-center justify-between gap-4 py-6 sm:flex-row">
          {/* Social */}
          <div className="flex items-center gap-3">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-primary-foreground/20 text-primary-foreground/60 transition-colors hover:border-accent hover:text-accent"
              >
                <social.icon className="h-4 w-4" />
              </a>
            ))}
          </div>

          {/* Payment Methods */}
          <div className="flex items-center gap-3">
            {paymentMethods.map((method) => (
              <span
                key={method}
                className="rounded border border-primary-foreground/20 px-2 py-1 text-[10px] font-medium uppercase tracking-wide text-primary-foreground/50"
              >
                {method}
              </span>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-xs text-primary-foreground/40">
            © {new Date().getFullYear()} Jimmy Africa. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
