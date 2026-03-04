import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./AuthContext";
import { toast } from "@/hooks/use-toast";

export type CartItem = {
  id: string;
  product_id: string;
  quantity: number;
  product?: {
    name: string;
    slug: string;
    price: number;
    sale_price: number | null;
    images: string[];
  };
};

type CartContextType = {
  items: CartItem[];
  loading: boolean;
  itemCount: number;
  subtotal: number;
  addItem: (productId: string, quantity?: number) => Promise<void>;
  updateQuantity: (itemId: string, quantity: number) => Promise<void>;
  removeItem: (itemId: string) => Promise<void>;
  clearCart: () => Promise<void>;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchCart = useCallback(async () => {
    if (!user) {
      setItems([]);
      return;
    }
    setLoading(true);
    const { data, error } = await supabase
      .from("cart_items")
      .select("id, product_id, quantity, products(name, slug, price, sale_price, images)")
      .eq("user_id", user.id)
      .order("created_at", { ascending: true });

    if (!error && data) {
      setItems(
        data.map((row: any) => ({
          id: row.id,
          product_id: row.product_id,
          quantity: row.quantity,
          product: row.products ?? undefined,
        }))
      );
    }
    setLoading(false);
  }, [user]);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  // Realtime subscription for cart changes
  useEffect(() => {
    if (!user) return;
    const channel = supabase
      .channel("cart_changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "cart_items", filter: `user_id=eq.${user.id}` },
        () => fetchCart()
      )
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [user, fetchCart]);

  const addItem = async (productId: string, quantity = 1) => {
    if (!user) {
      toast({ title: "Please log in", description: "Sign in to add items to your cart.", variant: "destructive" });
      return;
    }
    // Check if item already in cart
    const existing = items.find((i) => i.product_id === productId);
    if (existing) {
      await updateQuantity(existing.id, existing.quantity + quantity);
      return;
    }
    const { error } = await supabase
      .from("cart_items")
      .insert({ user_id: user.id, product_id: productId, quantity });
    if (error) {
      toast({ title: "Error", description: "Could not add to cart.", variant: "destructive" });
    } else {
      toast({ title: "Added to cart", description: "Item added successfully." });
      await fetchCart();
    }
  };

  const updateQuantity = async (itemId: string, quantity: number) => {
    if (quantity < 1) return removeItem(itemId);
    await supabase.from("cart_items").update({ quantity }).eq("id", itemId);
    await fetchCart();
  };

  const removeItem = async (itemId: string) => {
    await supabase.from("cart_items").delete().eq("id", itemId);
    await fetchCart();
  };

  const clearCart = async () => {
    if (!user) return;
    await supabase.from("cart_items").delete().eq("user_id", user.id);
    setItems([]);
  };

  const itemCount = items.reduce((s, i) => s + i.quantity, 0);
  const subtotal = items.reduce((s, i) => {
    const price = i.product?.sale_price ?? i.product?.price ?? 0;
    return s + price * i.quantity;
  }, 0);

  return (
    <CartContext.Provider
      value={{ items, loading, itemCount, subtotal, addItem, updateQuantity, removeItem, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
}
