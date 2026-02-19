import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star, ShieldCheck, Truck, RotateCcw, Headphones } from "lucide-react";

const trustBadges = [
  { icon: Truck, title: "Free Delivery", desc: "On orders over R1,500" },
  { icon: RotateCcw, title: "30-Day Returns", desc: "No questions asked" },
  { icon: ShieldCheck, title: "2-Year Warranty", desc: "On all products" },
  { icon: Headphones, title: "Expert Support", desc: "Mon–Sat, 8am–6pm" },
];

const Index = () => {
  return (
    <MainLayout>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="section-padding-lg bg-jimmy-light-blue">
        <div className="container-jimmy">
          <div className="mx-auto max-w-3xl text-center">
            {/* Eyebrow */}
            <span className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-accent/20 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-accent-foreground">
              <Star className="h-3 w-3 fill-accent text-accent" />
              Award-Winning Appliances
            </span>

            {/* Headline */}
            <h1 className="mb-5 text-primary">
              Premium Home Appliances
              <span className="block text-accent"> for Modern Africa</span>
            </h1>

            {/* Sub-headline */}
            <p className="mx-auto mb-8 max-w-xl text-body text-muted-foreground">
              Discover JIMMY's range of cordless vacuums, kitchen appliances, and hair care tools — engineered for performance, designed for your home.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Button size="lg" className="gap-2 rounded-full px-8 text-button">
                Shop Best Sellers
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full border-primary px-8 text-button text-primary hover:bg-primary hover:text-primary-foreground"
              >
                View All Products
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Trust Badges ─────────────────────────────────────── */}
      <section className="border-b border-t bg-background py-8">
        <div className="container-jimmy">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {trustBadges.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{title}</p>
                  <p className="text-xs text-muted-foreground">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Shop by Category (placeholder) ───────────────────── */}
      <section className="section-padding-md">
        <div className="container-jimmy">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <h2 className="text-foreground">Shop by Category</h2>
              <p className="mt-1 text-small">Find the right appliance for every room</p>
            </div>
            <Button variant="ghost" className="hidden gap-1 text-primary sm:flex">
              View All <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {["Vacuums", "Kitchen", "Hair Care", "Water Purifiers", "Air Care", "Accessories"].map((cat) => (
              <div
                key={cat}
                className="flex flex-col items-center justify-center rounded-xl bg-secondary p-6 text-center transition-shadow hover:shadow-soft cursor-pointer"
              >
                <div className="mb-3 h-12 w-12 rounded-full bg-primary/10" />
                <p className="text-sm font-semibold text-foreground">{cat}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Best Sellers (placeholder) ────────────────────────── */}
      <section className="section-padding-md bg-secondary">
        <div className="container-jimmy">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <h2 className="text-foreground">Best Sellers</h2>
              <p className="mt-1 text-small">Our most loved products this month</p>
            </div>
            <Button variant="ghost" className="hidden gap-1 text-primary sm:flex">
              View All <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="overflow-hidden rounded-xl bg-background shadow-soft transition-shadow hover:shadow-strong"
              >
                {/* Product image placeholder */}
                <div className="relative aspect-square bg-muted">
                  <span className="absolute left-3 top-3 rounded-full bg-accent px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-accent-foreground">
                    New
                  </span>
                </div>
                {/* Product info */}
                <div className="p-4">
                  <p className="mb-1 text-xs text-muted-foreground">JIMMY</p>
                  <h3 className="mb-2 text-sm font-semibold leading-snug text-foreground">
                    Cordless Vacuum Cleaner H8 Pro
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="text-base font-bold text-primary">R2,999</span>
                    <span className="text-sm text-muted-foreground line-through">R3,499</span>
                    <span className="ml-auto rounded bg-destructive/10 px-1.5 py-0.5 text-[10px] font-semibold text-destructive">
                      Save 14%
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Customer Reviews (placeholder) ───────────────────── */}
      <section className="section-padding-md">
        <div className="container-jimmy text-center">
          <h2 className="mb-2 text-foreground">What Our Customers Say</h2>
          <p className="text-small">Reviews & testimonials coming soon</p>
        </div>
      </section>
    </MainLayout>
  );
};

export default Index;
