import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { ArrowRight, Truck, RotateCcw, Headphones, ShieldCheck } from "lucide-react";
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
  { label: "Bed\nVacuum Cleaner", slug: "bed-vacuum", image: "/images/categories/bed-vacuum.png" },
  { label: "Stick\nVacuum Cleaner", slug: "stick-vacuum", image: "/images/categories/stick-vacuum.png" },
  { label: "Wet & Dry\nVacuum Cleaner", slug: "wet-dry-vacuum", image: "/images/categories/wet-dry-vacuum.png" },
  { label: "Countertop\nWater Purifier", slug: "water-purifier", image: "/images/categories/water-purifier.png" },
  { label: "Hair Care /\nMulti-Styler", slug: "hair-care", image: "/images/categories/hair-care.png" },
  { label: "Kitchen\nAppliances", slug: "kitchen", image: "/images/categories/kitchen-appliances.png" },
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
      <section className="bg-jimmy-light-blue">
        <div className="container-jimmy py-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-[58fr_42fr]">

            {/* Left — Olive/Gold feature card with video */}
            <div
              className="relative flex min-h-[380px] flex-col justify-end overflow-hidden md:min-h-[500px]"
              style={{ backgroundColor: "hsl(45, 50%, 38%)" }}
            >
              <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 h-full w-full object-cover"
                poster="/images/products/jimmy-pw11-pro-max.jpg"
              >
                <source src="https://jimmyafrica.com/wp-content/uploads/2026/01/vid-pw11.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-black/20" />

              <div className="relative z-10 p-6 pb-10 text-primary-foreground md:p-10 md:pb-14">
                <p className="mb-1 text-sm font-medium tracking-wide text-primary-foreground/90">
                  JIMMY PW11 PRO MAX
                </p>
                <h1 className="mb-1 text-3xl font-extrabold md:text-[42px] md:leading-tight">
                  From {formatZAR(12890)}
                </h1>
                <p className="mb-1 text-sm font-medium text-primary-foreground/90">
                  5-in-1 Vacuum &amp; Washer
                </p>
                <p className="mb-6 text-sm text-primary-foreground/80">
                  A new definition of smart, full-home cleaning
                </p>
                <Button
                  asChild
                  className="rounded-none bg-primary px-8 py-2.5 text-sm font-bold text-primary-foreground hover:bg-primary/90 transition-all"
                >
                  <Link to="/shop">Learn More</Link>
                </Button>
              </div>
            </div>

            {/* Right — Light blue card with product image behind text */}
            <div className="relative flex min-h-[380px] flex-col overflow-hidden bg-jimmy-light-blue md:min-h-[500px]">
              {/* Product image — positioned to fill and sit behind */}
              <img
                src="/images/products/jimmy-h8-flex.jpg"
                alt="JIMMY JV83 PRO"
                className="absolute inset-0 h-full w-full object-cover object-top opacity-90"
              />
              {/* Light blue gradient overlay bottom half */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-jimmy-light-blue" style={{ background: 'linear-gradient(to bottom, transparent 30%, hsl(214, 75%, 95%) 65%)' }} />
              {/* Text overlay centered at top */}
              <div className="relative z-10 flex flex-1 flex-col items-center justify-start pt-5 text-center md:pt-8">
                <p className="text-lg font-extrabold tracking-wider text-primary mb-1">JIMMY</p>
                <p className="mb-0.5 text-sm font-medium tracking-wide text-foreground/80">
                  JIMMY JV83 PRO
                </p>
                <h2 className="mb-1 text-3xl font-extrabold text-foreground md:text-[38px] md:leading-tight">
                  From {formatZAR(4990)}
                </h2>
                <p className="mb-5 text-sm text-muted-foreground">
                  Designed for modern homes, pets,<br />and everyday mess
                </p>
                <Button
                  asChild
                  className="rounded-none bg-primary px-8 py-2.5 text-sm font-bold text-primary-foreground hover:bg-primary/90 transition-all"
                >
                  <Link to="/shop">Shop Now</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Award Banner — JIMMY logo + tagline ───────────── */}
      <section className="bg-jimmy-light-blue py-5">
        <div className="container-jimmy flex flex-col items-center gap-3">
          <img
            src="/images/awards-strip.png"
            alt="Award logos"
            className="h-8 w-auto max-w-full object-contain"
            loading="lazy"
          />
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary text-center">
            Award-winning home technology delivered across Africa
          </p>
        </div>
      </section>

      {/* ── Category Grid ────────────────── */}
      <section className="bg-jimmy-light-blue pb-10 pt-4">
        <div className="container-jimmy">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                to={`/category/${cat.slug}`}
                className="group flex flex-col items-center gap-2 rounded-md bg-background p-4 text-center transition-all hover:shadow-strong hover:-translate-y-1"
              >
                <div className="flex h-28 w-full items-center justify-center">
                  <img
                    src={cat.image}
                    alt={cat.label}
                    className="h-full w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <p className="whitespace-pre-line text-xs font-bold leading-tight text-foreground group-hover:text-primary transition-colors">
                  {cat.label}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Design Awards ─────────────────── */}
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

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {bestSellers.map((product) => (
              <Link
                key={product.id}
                to={`/shop/${product.slug}`}
                className="group overflow-hidden rounded-md bg-background shadow-soft transition-all hover:shadow-strong hover:-translate-y-1"
              >
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
        <div className="container-jimmy text-center">
          <h2 className="mb-8 text-foreground">See JIMMY in Action</h2>
          <div className="relative mx-auto max-w-4xl overflow-hidden rounded-md">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full aspect-video object-cover"
              poster="/images/products/jimmy-pw11-pro-max.jpg"
            >
              <source src="https://jimmyafrica.com/wp-content/uploads/2026/01/vid-pw11.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </section>

      {/* ── Happy Customers Review placeholder ────────────── */}
      <section className="section-padding-md bg-secondary">
        <div className="container-jimmy text-center">
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
