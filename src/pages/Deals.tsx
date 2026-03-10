import MainLayout from "@/components/layout/MainLayout";
import { Link } from "react-router-dom";
import { formatZAR } from "@/lib/format";
import { useProducts } from "@/hooks/use-products";
import { ProductGridSkeleton } from "@/components/ProductCardSkeleton";

const Deals = () => {
  const { data: products = [], isLoading } = useProducts();
  const dealsProducts = products.filter((p) => p.salePrice || p.savePct);

  return (
    <MainLayout>
      <section className="bg-secondary py-8">
        <div className="container-jimmy text-center">
          <h1 className="text-2xl font-bold text-foreground md:text-3xl">Deals & Offers</h1>
          <p className="mt-2 text-sm text-muted-foreground">Don't miss our latest promotions</p>
        </div>
      </section>

      <section className="section-padding-md">
        <div className="container-jimmy">
          {isLoading ? (
            <ProductGridSkeleton count={4} />
          ) : dealsProducts.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {dealsProducts.map((product) => (
                <Link
                  key={product.id}
                  to={`/shop/${product.slug}`}
                  className="group overflow-hidden rounded-md bg-background shadow-soft transition-all hover:shadow-strong hover:-translate-y-1"
                >
                  <div className="relative aspect-square overflow-hidden bg-secondary">
                    <div className="absolute left-2 top-2 z-10 flex flex-col gap-1">
                      {product.badges.includes("On Sale") && (
                        <span className="rounded-sm bg-destructive px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-destructive-foreground">On Sale</span>
                      )}
                      {product.savePct && (
                        <span className="rounded-sm bg-accent px-2 py-0.5 text-[10px] font-bold text-accent-foreground">Save {product.savePct}%</span>
                      )}
                    </div>
                    <img src={product.images[0]} alt={product.name} className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105" loading="lazy" />
                  </div>
                  <div className="p-4">
                    <h3 className="mb-2 text-xs font-semibold leading-snug text-foreground line-clamp-2">{product.name}</h3>
                    <div className="flex items-baseline gap-2 flex-wrap">
                      <span className="text-base font-bold text-primary">{formatZAR(product.price)}</span>
                      {product.salePrice && (
                        <span className="text-xs text-muted-foreground line-through">{formatZAR(product.salePrice)}</span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="py-20 text-center">
              <p className="text-lg font-semibold text-foreground">No deals at the moment</p>
              <p className="mt-1 text-sm text-muted-foreground">Check back soon for exciting offers!</p>
            </div>
          )}
        </div>
      </section>
    </MainLayout>
  );
};

export default Deals;
