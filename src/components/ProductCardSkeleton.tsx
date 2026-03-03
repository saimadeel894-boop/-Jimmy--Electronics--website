import { Skeleton } from "@/components/ui/skeleton";

function ProductCardSkeleton() {
  return (
  <div className="overflow-hidden rounded-md bg-background shadow-soft">
    <Skeleton className="aspect-square w-full" />
    <div className="p-4 space-y-2">
      <Skeleton className="h-3 w-3/4" />
      <Skeleton className="h-3 w-1/2" />
      <Skeleton className="h-5 w-1/3" />
      <Skeleton className="h-3 w-1/4" />
    </div>
  </div>
  );
}

export function ProductGridSkeleton({ count = 4 }: { count?: number }) {
  return (
  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
    {Array.from({ length: count }).map((_, i) => (
      <ProductCardSkeleton key={i} />
    ))}
  </div>
  );
}

export function ProductDetailSkeleton() {
  return (
  <div className="grid gap-8 md:grid-cols-2">
    <Skeleton className="aspect-square w-full rounded-md" />
    <div className="flex flex-col space-y-4">
      <Skeleton className="h-5 w-1/4" />
      <Skeleton className="h-7 w-3/4" />
      <Skeleton className="h-8 w-1/3" />
      <Skeleton className="h-20 w-full" />
      <div className="space-y-2 pt-4">
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-5/6" />
        <Skeleton className="h-3 w-2/3" />
      </div>
      <Skeleton className="mt-4 h-12 w-full" />
    </div>
  </div>
  );
}

export default ProductCardSkeleton;
