import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type Product = {
  id: string;
  name: string;
  slug: string;
  category_id: string | null;
  price: number;
  salePrice: number | null;
  savePct: number | null;
  currency: string;
  images: string[];
  description: string | null;
  features: string[];
  specs: Record<string, string>;
  badges: string[];
  inStock: boolean;
  rating: number;
  reviewCount: number;
};

function mapProduct(row: any): Product {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    category_id: row.category_id,
    price: row.price,
    salePrice: row.sale_price,
    savePct: row.save_pct,
    currency: row.currency,
    images: row.images ?? [],
    description: row.description,
    features: row.features ?? [],
    specs: (row.specs as Record<string, string>) ?? {},
    badges: row.badges ?? [],
    inStock: row.in_stock,
    rating: row.rating,
    reviewCount: row.review_count,
  };
}

export function useProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data ?? []).map(mapProduct);
    },
  });
}

export function useProductBySlug(slug: string | undefined) {
  return useQuery({
    queryKey: ["product", slug],
    queryFn: async () => {
      if (!slug) return null;
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("slug", slug)
        .maybeSingle();
      if (error) throw error;
      return data ? mapProduct(data) : null;
    },
    enabled: !!slug,
  });
}

export function useProductsByCategory(categorySlug: string | undefined) {
  return useQuery({
    queryKey: ["products", "category", categorySlug],
    queryFn: async () => {
      if (!categorySlug) return [];
      // First get the category id from slug
      const { data: cat } = await supabase
        .from("categories")
        .select("id")
        .eq("slug", categorySlug)
        .maybeSingle();
      if (!cat) return [];
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("category_id", cat.id)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data ?? []).map(mapProduct);
    },
    enabled: !!categorySlug,
  });
}

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("categories")
        .select("*")
        .order("name");
      if (error) throw error;
      return data ?? [];
    },
  });
}

export function useReviewsByProduct(productId: string | undefined) {
  return useQuery({
    queryKey: ["reviews", productId],
    queryFn: async () => {
      if (!productId) return [];
      const { data, error } = await supabase
        .from("reviews")
        .select("*")
        .eq("product_id", productId)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
    enabled: !!productId,
  });
}
