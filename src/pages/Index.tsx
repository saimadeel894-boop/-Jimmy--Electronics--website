import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star } from "lucide-react";
import { Link } from "react-router-dom";

// ── Product card data (mock) ──────────────────────────────────
const bestSellers = [
  {
    id: 1,
    name: "Jimmy Water Tank with Mopping Kit (JV53 / JV83 / H9FLEX / H10 Pro)",
    price: 1500,
    salePrice: null,
    badges: ["New"],
    reviews: 0,
    slug: "jimmy-water-tank-mopping-kit",
  },
  {
    id: 2,
    name: "JIMMY H8 FLEX – 7-in-1 | 550W | 185AW | 65mins – HEPA Cordless Vacuum Cleaner",
    price: 17490,
    salePrice: null,
    badges: ["New"],
    reviews: 0,
    slug: "jimmy-h8-flex",
  },
  {
    id: 3,
    name: "JIMMY AF3 Multi-Functional Air Fryer | Pan Fry 2-in-1 | 1100W | 4L",
    price: 9990,
    salePrice: null,
    badges: ["New"],
    reviews: 0,
    slug: "jimmy-af3-air-fryer",
  },
  {
    id: 4,
    name: "JIMMY PW11 PRO MAX 5-in-1 Cordless Vacuum & Floor Washer",
    price: 36990,
    salePrice: 39990,
    savePct: 8,
    badges: ["New", "On Sale"],
    reviews: 0,
    slug: "jimmy-pw11-pro-max",
  },
];

const categories = [
  { label: "Bed Vacuum Cleaner", slug: "bed-vacuum" },
  { label: "Stick Vacuum Cleaner", slug: "stick-vacuum" },
  { label: "Wet & Dry Vacuum Cleaner", slug: "wet-dry-vacuum" },
  { label: "Countertop Water Purifier", slug: "water-purifier" },
  { label: "Hair Care / Multi-Styler", slug: "hair-care" },
  { label: "Kitchen Appliances", slug: "kitchen" },
];

const formatZAR = (n: number) =>
  "R " + n.toLocaleString("en-ZA");

const Index = () => {
  return (
    <MainLayout>

      {/* ── Hero — Two-column split matching reference ──────── */}
      <section className="py-6">
        <div className="container-jimmy">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-[58fr_42fr]">

            {/* Left — Large feature card (olive/product image) */}
            <div className="relative flex min-h-[420px] flex-col justify-end overflow-hidden rounded-lg bg-[#7a6a20] p-8 md:min-h-[500px]">
              {/* Placeholder for hero product image — replace with <img> when ready */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="relative z-10 text-primary-foreground">
                <p className="mb-1 text-sm font-semibold uppercase tracking-widest text-primary-foreground/70">
                  JIMMY PW11 PRO MAX
                </p>
                <h1 className="mb-2 text-4xl font-extrabold md:text-5xl">
                  From {formatZAR(12890)}
                </h1>
                <p className="mb-6 text-sm text-primary-foreground/80">
                  5-in-1 Vacuum &amp; Washer<br />
                  A new definition of smart, full-home cleaning
                </p>
                <Button
                  asChild
                  className="w-fit rounded-sm bg-primary px-6 py-2.5 text-sm font-bold text-primary-foreground hover:bg-primary/90"
                >
                  <Link to="/shop">Learn More</Link>
                </Button>
              </div>
            </div>

            {/* Right — Secondary product card */}
            <div className="relative flex min-h-[420px] flex-col justify-start overflow-hidden rounded-lg bg-jimmy-light-blue p-8 md:min-h-[500px]">
              {/* Placeholder for product image */}
              <div className="mb-auto text-center text-foreground">
                <p className="mb-1 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                  JIMMY JV83 PRO
                </p>
                <h2 className="mb-2 text-3xl font-extrabold text-foreground">
                  From {formatZAR(4990)}
                </h2>
                <p className="mb-6 text-sm text-muted-foreground">
                  Designed for modern homes, pets,<br />and everyday mess
                </p>
                <Button
                  asChild
                  className="rounded-sm bg-primary px-6 py-2.5 text-sm font-bold text-primary-foreground hover:bg-primary/90"
                >
                  <Link to="/shop">Shop Now</Link>
                </Button>
              </div>
              {/* Product image placeholder block */}
              <div className="mt-6 h-48 w-full rounded bg-secondary" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Award Banner ────────────────────────────────────── */}
      <section className="bg-jimmy-light-blue py-5">
        <div className="container-jimmy text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            Award-winning home technology delivered across Africa
          </p>
        </div>
      </section>

      {/* ── Category Grid ────────────────────────────────────── */}
      <section className="section-padding-md">
        <div className="container-jimmy">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                to={`/category/${cat.slug}`}
                className="group flex flex-col items-center gap-3 rounded-lg bg-secondary p-5 text-center transition-shadow hover:shadow-soft"
              >
                {/* Image placeholder */}
                <div className="h-24 w-full rounded bg-muted" />
                <p className="text-xs font-semibold leading-snug text-foreground group-hover:text-primary">
                  {cat.label}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Design Awards Strip ───────────────────────────────── */}
      <section className="border-t border-b py-6">
        <div className="container-jimmy flex items-center justify-center gap-3">
          <div className="flex items-center gap-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-5 w-5 fill-accent text-accent" />
            ))}
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Global</p>
            <p className="text-sm font-bold text-foreground">Design Awards</p>
            <p className="text-xs text-muted-foreground">Recognized by major international professional design institutions</p>
          </div>
        </div>
      </section>

      {/* ── Best Sellers ─────────────────────────────────────── */}
      <section className="section-padding-md bg-secondary">
        <div className="container-jimmy">
          <div className="mb-8 flex items-end justify-between">
            <h2 className="text-foreground">Best Selling Products in South Africa</h2>
            <Link
              to="/shop"
              className="hidden items-center gap-1 text-sm font-semibold text-primary hover:underline sm:flex"
            >
              See All Products <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {bestSellers.map((product) => (
              <Link
                key={product.id}
                to={`/shop/${product.slug}`}
                className="group overflow-hidden rounded-lg bg-background shadow-soft transition-shadow hover:shadow-strong"
              >
                {/* Product image */}
                <div className="relative aspect-square overflow-hidden bg-secondary">
                  {/* Badges */}
                  <div className="absolute left-2 top-2 flex flex-col gap-1">
                    {product.badges.includes("New") && (
                      <span className="rounded-sm bg-primary px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-primary-foreground">
                        New
                      </span>
                    )}
                    {product.badges.includes("On Sale") && (
                      <span className="rounded-sm bg-destructive px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-destructive-foreground">
                        On Sale
                      </span>
                    )}
                    {product.savePct && (
                      <span className="rounded-sm bg-accent px-2 py-0.5 text-[10px] font-bold text-accent-foreground">
                        Save {product.savePct}%
                      </span>
                    )}
                  </div>
                  {/* Placeholder — replace with <img> */}
                  <div className="h-full w-full bg-secondary transition-transform duration-300 group-hover:scale-105" />
                </div>

                {/* Product info */}
                <div className="p-4">
                  <h3 className="mb-2 text-xs font-semibold leading-snug text-foreground line-clamp-2">
                    {product.name}
                  </h3>
                  <div className="flex items-baseline gap-2 flex-wrap">
                    <span className="text-base font-bold text-primary">
                      {formatZAR(product.price)}
                    </span>
                    {product.salePrice && (
                      <span className="text-xs text-muted-foreground line-through">
                        {formatZAR(product.salePrice)}
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {product.reviews} reviews
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Trust Badges ─────────────────────────────────────── */}
      <section className="border-t py-10">
        <div className="container-jimmy">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {[
              { title: "Free delivery for R2,500+ orders", desc: "We deliver in 7–20 business days!" },
              { title: "Satisfied or refunded", desc: "Free returns within 30 days" },
              { title: "We are available Mon–Sat", desc: "Contact us by chat, mail, phone" },
              { title: "100% Secure payments", desc: "Visa, Mastercard, PayFast, SnapScan" },
            ].map((b) => (
              <div key={b.title} className="text-center">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <div className="h-6 w-6 rounded-full bg-primary/30" />
                </div>
                <p className="text-sm font-bold text-foreground">{b.title}</p>
                <p className="text-xs text-muted-foreground">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Promo Ticker ─────────────────────────────────────── */}
      <section className="overflow-hidden border-t bg-primary py-3">
        <div className="flex animate-marquee gap-12 whitespace-nowrap">
          {[...Array(8)].map((_, i) => (
            <span key={i} className="flex items-center gap-3 text-sm font-bold text-primary-foreground">
              <span className="text-accent">✷</span> Up to 50% Off!
              <span className="text-accent">✦</span> Big Discounts Inside!
            </span>
          ))}
        </div>
      </section>

      {/* ── Customer Reviews placeholder ─────────────────────── */}
      <section className="section-padding-md">
        <div className="container-jimmy text-center">
          <h2 className="mb-2 text-foreground">Happy Customers Review</h2>
          <p className="text-small">Testimonials coming soon</p>
        </div>
      </section>

    </MainLayout>
  );
};

export default Index;
