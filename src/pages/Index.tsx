import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { ArrowRight, Truck, RotateCcw, Headphones, ShieldCheck, Play } from "lucide-react";
import { Link } from "react-router-dom";

// ── Product card data (mock) ──────────────────────────────────
const bestSellers = [
  {
    id: 1,
    name: "Jimmy Water Tank with Mopping Kit (JV53 / JV83 / H9FLEX / H10 Pro)",
    price: 1500,
    salePrice: null,
    savePct: null,
    badges: ["New"],
    reviews: 0,
    slug: "jimmy-water-tank-mopping-kit",
    image: "/images/products/jimmy-mop-kit.webp",
  },
  {
    id: 2,
    name: "JIMMY H8 FLEX – 7-in-1 | 550W | 185AW | 65mins – HEPA Cordless Vacuum Cleaner",
    price: 17490,
    salePrice: null,
    savePct: null,
    badges: ["New"],
    reviews: 0,
    slug: "jimmy-h8-flex",
    image: "/images/products/jimmy-h8-flex.jpg",
  },
  {
    id: 3,
    name: "JIMMY AF3 Multi-Functional Air Fryer | Pan Fry 2-in-1 | 1100W | 4L",
    price: 9990,
    salePrice: null,
    savePct: null,
    badges: ["New"],
    reviews: 0,
    slug: "jimmy-af3-air-fryer",
    image: "/images/products/jimmy-af3-air-fryer.webp",
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
    image: "/images/products/jimmy-pw11-pro-max.jpg",
  },
];

const categories = [
  { label: "Bed Vacuum Cleaner", slug: "bed-vacuum", image: "/images/categories/bed-vacuum.png" },
  { label: "Stick Vacuum Cleaner", slug: "stick-vacuum", image: "/images/categories/stick-vacuum.png" },
  { label: "Wet & Dry Vacuum Cleaner", slug: "wet-dry-vacuum", image: "/images/categories/wet-dry-vacuum.png" },
  { label: "Countertop Water Purifier", slug: "water-purifier", image: "/images/categories/water-purifier.png" },
  { label: "Hair Care / Multi-Styler", slug: "hair-care", image: "/images/categories/hair-care.png" },
  { label: "Kitchen Appliances", slug: "kitchen", image: "/images/categories/kitchen-appliances.png" },
];

const awardImages = [
  "/images/awards/award-9.webp",
  "/images/awards/award-1.webp",
  "/images/awards/award-6.webp",
  "/images/awards/award-5.webp",
  "/images/awards/award-2.webp",
  "/images/awards/award-gda.webp",
  "/images/awards/award-4.webp",
  "/images/awards/award-7.webp",
  "/images/awards/award-good-design.webp",
  "/images/awards/award-8.webp",
];

const formatZAR = (n: number) =>
  "R " + n.toLocaleString("en-ZA");

const Index = () => {
  return (
    <MainLayout>

      {/* ── Hero — Two-column split matching reference ──────── */}
      <section className="bg-background">
        <div className="container-jimmy py-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-[58fr_42fr]">

            {/* Left — Large feature card */}
            <div className="relative flex min-h-[420px] flex-col justify-end overflow-hidden rounded-lg md:min-h-[500px]">
              <img
                src="/images/products/jimmy-pw11-pro-max.jpg"
                alt="JIMMY PW11 PRO MAX"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
              <div className="relative z-10 p-8 text-primary-foreground">
                <p className="mb-1 text-sm font-semibold uppercase tracking-widest text-primary-foreground/80">
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
                  className="w-fit rounded-sm bg-accent px-6 py-2.5 text-sm font-bold text-accent-foreground hover:bg-accent/90 transition-all hover:shadow-strong"
                >
                  <Link to="/shop">Learn More</Link>
                </Button>
              </div>
            </div>

            {/* Right — Secondary product card */}
            <div className="relative flex min-h-[420px] flex-col overflow-hidden rounded-lg bg-jimmy-light-blue md:min-h-[500px]">
              <div className="relative z-10 p-8 text-center">
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
                  className="rounded-sm bg-primary px-6 py-2.5 text-sm font-bold text-primary-foreground hover:bg-primary/90 transition-all hover:shadow-strong"
                >
                  <Link to="/shop">Shop Now</Link>
                </Button>
              </div>
              <img
                src="/images/products/jimmy-h8-flex.jpg"
                alt="JIMMY JV83 PRO"
                className="mt-auto h-56 w-full object-contain object-bottom"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Award Banner ───────────── */}
      <section className="bg-jimmy-light-blue py-4">
        <div className="container-jimmy flex flex-col items-center gap-3">
          <img
            src="/images/awards-strip.png"
            alt="Award-winning home technology"
            className="h-8 w-auto object-contain"
            loading="lazy"
          />
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            Award-winning home technology delivered across Africa
          </p>
        </div>
      </section>

      {/* ── Category Grid ────────────────── */}
      <section className="section-padding-md bg-jimmy-light-blue">
        <div className="container-jimmy">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                to={`/category/${cat.slug}`}
                className="group flex flex-col items-center gap-3 rounded-lg bg-background p-5 text-center transition-all hover:shadow-strong hover:-translate-y-1"
              >
                <div className="flex h-32 w-full items-center justify-center">
                  <img
                    src={cat.image}
                    alt={cat.label}
                    className="h-full w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <p className="text-xs font-semibold leading-snug text-foreground group-hover:text-primary transition-colors">
                  {cat.label}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Design Awards Strip with logos ─────────────────── */}
      <section className="border-t border-b py-8">
        <div className="container-jimmy">
          <div className="mb-6 text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Global</p>
            <h2 className="text-2xl font-bold text-foreground md:text-3xl">Design Awards</h2>
            <p className="mt-1 text-sm text-muted-foreground">Recognized by major international professional design institutions</p>
          </div>
          <div className="overflow-hidden">
            <div className="flex animate-marquee items-center gap-10">
              {[...awardImages, ...awardImages].map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt="Design award"
                  className="h-16 w-auto shrink-0 object-contain opacity-80 grayscale hover:grayscale-0 hover:opacity-100 transition-all"
                  loading="lazy"
                />
              ))}
            </div>
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
                className="group overflow-hidden rounded-lg bg-background shadow-soft transition-all hover:shadow-strong hover:-translate-y-1"
              >
                {/* Product image */}
                <div className="relative aspect-square overflow-hidden bg-secondary">
                  <div className="absolute left-2 top-2 z-10 flex flex-col gap-1">
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
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
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

      {/* ── See JIMMY in Action — Video Section ───────────── */}
      <section className="section-padding-md bg-background">
        <div className="container-jimmy">
          <div className="mb-8 text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Watch</p>
            <h2 className="text-foreground">See JIMMY in Action</h2>
            <p className="mt-1 text-sm text-muted-foreground">Experience the power and innovation of JIMMY products</p>
          </div>
          <div className="relative mx-auto max-w-4xl overflow-hidden rounded-lg">
            <div className="aspect-video bg-jimmy-dark">
              <img
                src="/images/products/jimmy-pw11-pro-max.jpg"
                alt="JIMMY product demo video thumbnail"
                className="h-full w-full object-cover opacity-70"
                loading="lazy"
              />
            </div>
            <button
              className="absolute inset-0 flex items-center justify-center transition-colors group"
              aria-label="Play video"
            >
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-accent shadow-strong transition-transform group-hover:scale-110">
                <Play className="h-8 w-8 text-accent-foreground ml-1" fill="currentColor" />
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* ── Happy Customers Review placeholder ────────────── */}
      <section className="section-padding-md bg-secondary">
        <div className="container-jimmy text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">Testimonials</p>
          <h2 className="mb-2 text-foreground">Happy Customers Review</h2>
          <p className="text-small">Testimonials coming soon</p>
        </div>
      </section>

      {/* ── Trust Badges ─────────────────────────────────────── */}
      <section className="border-t py-10">
        <div className="container-jimmy">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {[
              { icon: Truck, title: "Free delivery for R2,500+ orders", desc: "We deliver in 7–20 business days!" },
              { icon: RotateCcw, title: "Satisfied or refunded", desc: "Free returns within 14 days" },
              { icon: Headphones, title: "We are available Mon–Sat", desc: "Contact us by chat, mail, phone" },
              { icon: ShieldCheck, title: "100% Secure payments", desc: "Visa, Mastercard, PayFast, SnapScan" },
            ].map((b) => (
              <div key={b.title} className="flex flex-col items-center text-center">
                <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                  <b.icon className="h-7 w-7 text-primary" />
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

    </MainLayout>
  );
};

export default Index;
