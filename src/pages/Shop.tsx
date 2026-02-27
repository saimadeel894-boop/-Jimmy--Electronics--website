import MainLayout from "@/components/layout/MainLayout";
import { Link } from "react-router-dom";
import { useState, useMemo } from "react";
import { formatZAR } from "@/lib/format";
import products from "@/data/products.json";

type SortOption = "default" | "price-asc" | "price-desc" | "name";

const categoryLabels: Record<string, string> = {
  "stick-vacuum": "Stick Vacuum",
  "wet-dry-vacuum": "Wet & Dry Vacuum",
  "bed-vacuum": "Bed Vacuum",
  "kitchen": "Kitchen Appliances",
  "hair-care": "Hair Care",
  "water-purifier": "Water Purifier",
  "parts-accessories": "Parts & Accessories",
};

const Shop = () => {
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState<SortOption>("default");

  const allCategories = useMemo(() => {
    const cats = [...new Set(products.map((p) => p.category))];
    return cats.sort();
  }, []);

  const filtered = useMemo(() => {
    let list = category === "all" ? [...products] : products.filter((p) => p.category === category);
    switch (sort) {
      case "price-asc":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list.sort((a, b) => b.price - a.price);
        break;
      case "name":
        list.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }
    return list;
  }, [category, sort]);

  return (
    <MainLayout>
      <section className="bg-secondary py-6">
        <div className="container-jimmy">
          <h1 className="text-2xl font-bold text-foreground md:text-3xl">Shop All Products</h1>
          <p className="mt-1 text-sm text-muted-foreground">Browse our full range of JIMMY products</p>
        </div>
      </section>

      <section className="section-padding-md">
        <div className="container-jimmy">
          {/* Filters */}
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setCategory("all")}
                className={`rounded-none border px-4 py-2 text-xs font-semibold uppercase tracking-wide transition-colors ${category === "all" ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background text-foreground hover:border-primary"}`}
              >
                All
              </button>
              {allCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`rounded-none border px-4 py-2 text-xs font-semibold uppercase tracking-wide transition-colors ${category === cat ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background text-foreground hover:border-primary"}`}
                >
                  {categoryLabels[cat] || cat}
                </button>
              ))}
            </div>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortOption)}
              className="rounded-none border border-border bg-background px-4 py-2 text-sm text-foreground"
            >
              <option value="default">Sort by: Default</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name">Name: A to Z</option>
            </select>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {filtered.map((product) => (
              <Link
                key={product.id}
                to={`/shop/${product.slug}`}
                className="group overflow-hidden rounded-md bg-background shadow-soft transition-all hover:shadow-strong hover:-translate-y-1"
              >
                <div className="relative aspect-square overflow-hidden bg-secondary">
                  <div className="absolute left-2 top-2 z-10 flex flex-col gap-1">
                    {product.badges.includes("New") && (
                      <span className="rounded-sm bg-primary px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-primary-foreground">New</span>
                    )}
                    {product.badges.includes("On Sale") && (
                      <span className="rounded-sm bg-destructive px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-destructive-foreground">On Sale</span>
                    )}
                    {product.savePct && (
                      <span className="rounded-sm bg-accent px-2 py-0.5 text-[10px] font-bold text-accent-foreground">Save {product.savePct}%</span>
                    )}
                  </div>
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="p-4">
                  <h3 className="mb-2 text-xs font-semibold leading-snug text-foreground line-clamp-2">{product.name}</h3>
                  <div className="flex items-baseline gap-2 flex-wrap">
                    <span className="text-base font-bold text-primary">{formatZAR(product.price)}</span>
                    {product.salePrice && (
                      <span className="text-xs text-muted-foreground line-through">{formatZAR(product.salePrice)}</span>
                    )}
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">{product.reviewCount} reviews</p>
                </div>
              </Link>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="py-20 text-center">
              <p className="text-lg font-semibold text-foreground">No products found</p>
              <p className="mt-1 text-sm text-muted-foreground">Try a different category or check back later.</p>
            </div>
          )}
        </div>
      </section>
    </MainLayout>
  );
};

export default Shop;
