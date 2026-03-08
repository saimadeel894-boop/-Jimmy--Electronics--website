import MainLayout from "@/components/layout/MainLayout";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Truck, ShieldCheck, RotateCcw, ChevronRight } from "lucide-react";
import { formatZAR } from "@/lib/format";
import { useProductBySlug, useReviewsByProduct } from "@/hooks/use-products";
import { useCart } from "@/contexts/CartContext";
import { ProductDetailSkeleton } from "@/components/ProductCardSkeleton";
import ProductImageGallery from "@/components/ProductImageGallery";
import { useMemo } from "react";

// Extra local images to supplement the single DB image per product
const supplementaryImages: Record<string, string[]> = {
  "jimmy-bx7-pro": ["/images/products/jimmy-bx7-pro-cat.png"],
  "jimmy-jv83-pro": ["/images/products/jimmy-jv83-pro.jpg"],
  "jimmy-r9-water-purifier": ["/images/products/jimmy-water-purifier-cat.png"],
  "jimmy-f8-hair-dryer": ["/images/products/jimmy-f8-hair-styler.png"],
};

const ProductDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: product, isLoading } = useProductBySlug(slug);
  const { data: productReviews = [] } = useReviewsByProduct(product?.id);
  const { addItem } = useCart();

  if (isLoading) {
    return (
      <MainLayout>
        <div className="container-jimmy section-padding-md">
          <ProductDetailSkeleton />
        </div>
      </MainLayout>
    );
  }

  if (!product) {
    return (
      <MainLayout>
        <div className="container-jimmy section-padding-lg text-center">
          <h1 className="text-2xl font-bold">Product Not Found</h1>
          <p className="mt-2 text-muted-foreground">The product you're looking for doesn't exist.</p>
          <Button asChild className="mt-6 rounded-none">
            <Link to="/shop">Back to Shop</Link>
          </Button>
        </div>
      </MainLayout>
    );
  }


  const handleAddToCart = () => {
    addItem(product.id);
  };

  return (
    <MainLayout>
      {/* Breadcrumb */}
      <div className="bg-secondary py-3">
        <div className="container-jimmy flex items-center gap-2 text-xs text-muted-foreground">
          <Link to="/" className="hover:text-primary">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <Link to="/shop" className="hover:text-primary">Shop</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-foreground font-medium line-clamp-1">{product.name}</span>
        </div>
      </div>

      <section className="section-padding-md">
        <div className="container-jimmy">
          <div className="grid gap-8 md:grid-cols-2">
            {/* Product Image */}
            <div className="aspect-square overflow-hidden rounded-md bg-secondary">
              <ProductImage
                src={product.images[0]}
                alt={product.name}
                className="h-full w-full object-contain p-4"
                loading="eager"
              />
            </div>

            {/* Product Info */}
            <div className="flex flex-col">
              <div className="flex flex-wrap gap-2 mb-3">
                {product.badges.map((badge) => (
                  <span
                    key={badge}
                    className={`rounded-sm px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ${
                      badge === "On Sale"
                        ? "bg-destructive text-destructive-foreground"
                        : badge === "New"
                        ? "bg-primary text-primary-foreground"
                        : "bg-accent text-accent-foreground"
                    }`}
                  >
                    {badge}
                  </span>
                ))}
              </div>

              <h1 className="text-xl font-bold text-foreground md:text-2xl leading-tight">{product.name}</h1>

              <div className="mt-4 flex items-baseline gap-3">
                <span className="text-2xl font-bold text-primary">{formatZAR(product.price)}</span>
                {product.salePrice && (
                  <span className="text-base text-muted-foreground line-through">{formatZAR(product.salePrice)}</span>
                )}
                {product.savePct && (
                  <span className="rounded-sm bg-accent px-2 py-0.5 text-xs font-bold text-accent-foreground">Save {product.savePct}%</span>
                )}
              </div>

              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{product.description}</p>

              {/* Features */}
              {product.features && product.features.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-sm font-bold text-foreground mb-2">Key Features</h3>
                  <ul className="space-y-1.5">
                    {product.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Specs */}
              <div className="mt-6 border-t pt-4">
                <h3 className="text-sm font-bold text-foreground mb-2">Specifications</h3>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(product.specs).map(([key, val]) => (
                    <div key={key} className="text-sm">
                      <span className="font-medium text-foreground capitalize">{key}: </span>
                      <span className="text-muted-foreground">{val}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Add to Cart */}
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button
                  onClick={handleAddToCart}
                  className="flex-1 gap-2 rounded-none bg-primary py-3 text-sm font-bold text-primary-foreground hover:bg-primary/90"
                  size="lg"
                >
                  <ShoppingCart className="h-4 w-4" />
                  Add to Cart
                </Button>
              </div>

              {/* Trust Icons */}
              <div className="mt-6 grid grid-cols-3 gap-3 border-t pt-4">
                <div className="flex flex-col items-center text-center">
                  <Truck className="h-5 w-5 text-primary mb-1" />
                  <p className="text-[10px] font-semibold text-foreground">Free DHL Express</p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <RotateCcw className="h-5 w-5 text-primary mb-1" />
                  <p className="text-[10px] font-semibold text-foreground">14-Day Returns</p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <ShieldCheck className="h-5 w-5 text-primary mb-1" />
                  <p className="text-[10px] font-semibold text-foreground">2-Year Warranty</p>
                </div>
              </div>
            </div>
          </div>

          {/* Reviews Section */}
          {productReviews.length > 0 && (
            <div className="mt-16 border-t pt-10">
              <h2 className="mb-6 text-xl font-bold text-foreground">Customer Reviews</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {productReviews.map((review: any) => (
                  <div key={review.id} className="rounded-md border p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex text-accent">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className={i < review.rating ? "text-accent" : "text-muted"}>★</span>
                        ))}
                      </div>
                      {review.verified && (
                        <span className="rounded-sm bg-jimmy-green/10 px-1.5 py-0.5 text-[10px] font-semibold text-jimmy-green">Verified</span>
                      )}
                    </div>
                    <h4 className="text-sm font-bold text-foreground">{review.title}</h4>
                    <p className="mt-1 text-sm text-muted-foreground">{review.content}</p>
                    <p className="mt-2 text-xs text-muted-foreground">{review.author} · {new Date(review.created_at).toLocaleDateString()}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </MainLayout>
  );
};

export default ProductDetail;
