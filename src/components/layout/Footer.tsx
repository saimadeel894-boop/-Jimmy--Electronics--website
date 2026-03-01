import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from "lucide-react";

const footerLinks = {
  company: [
    { label: "Our Story", to: "/about" },
    { label: "Careers", to: "/careers" },
    { label: "Press", to: "/about" },
    { label: "Influencers", to: "/about" },
    { label: "Find a Store", to: "/support#contact" },
  ],
  resources: [
    { label: "Wholesale", to: "/support#contact" },
    { label: "Become a Retailer", to: "/support#contact" },
    { label: "Corporate Orders", to: "/support#contact" },
    { label: "Store Locator", to: "/support#contact" },
    { label: "Affiliates", to: "/support#contact" },
  ],
  legal: [
    { label: "Privacy Policy", to: "/privacy" },
    { label: "Terms & Conditions", to: "/terms" },
    { label: "Accessibility", to: "/terms" },
    { label: "Cookie Policy", to: "/privacy" },
  ],
};

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Twitter, href: "#", label: "X" },
  { icon: Youtube, href: "#", label: "YouTube" },
];

const Footer = () => {
  return (
    <footer className="border-t bg-background text-foreground">
      {/* Newsletter */}
      <div className="border-b py-12">
        <div className="container-jimmy text-center">
          <h2 className="text-2xl font-bold text-foreground md:text-3xl">Let's Keep In Touch</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Be the first to know about new collections and exclusive offers.
          </p>
          <div className="mx-auto mt-6 flex max-w-lg overflow-hidden rounded-md border">
            <input
              type="email"
              placeholder="Enter Your Email Address"
              className="flex-1 bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none"
            />
            <button className="shrink-0 bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container-jimmy py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          {/* Business Info */}
          <div className="space-y-3 lg:col-span-1">
            <p className="text-sm text-muted-foreground">
              Monday – Friday: 9:00-20:00<br />
              Saturday: 11:00 – 15:00
            </p>
            <div className="space-y-2 text-sm">
              <span className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4 shrink-0" />
                Johannesburg, South Africa
              </span>
              <a href="tel:+27100001234" className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground">
                <Phone className="h-4 w-4 shrink-0" />
                +27 10 000 1234
              </a>
              <a href="mailto:support@jimmyafrica.com" className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground">
                <Mail className="h-4 w-4 shrink-0" />
                support@jimmyafrica.com
              </a>
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="mb-4 text-base font-semibold text-foreground">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="mb-4 text-base font-semibold text-foreground">Resources</h4>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Area */}
          <div>
            <h4 className="mb-4 text-base font-semibold text-foreground">Legal Area</h4>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Follow Us */}
          <div>
            <h4 className="mb-4 text-base font-semibold text-foreground">Follow Us</h4>
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t">
        <div className="container-jimmy flex items-center justify-center py-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Jimmy Africa. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
