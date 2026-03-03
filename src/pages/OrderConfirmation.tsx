import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { CheckCircle, Package } from "lucide-react";
import { formatZAR } from "@/lib/format";

type OrderDetail = {
  id: string;
  status: string;
  shipping_name: string;
  shipping_city: string;
  subtotal: number;
  shipping_cost: number;
  total: number;
  created_at: string;
};

type OrderItem = {
  id: string;
  product_name: string;
  product_image: string | null;
  price: number;
  quantity: number;
};

const OrderConfirmation = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState<OrderDetail | null>(null);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!orderId) return;
    const fetch = async () => {
      const [orderRes, itemsRes] = await Promise.all([
        supabase.from("orders").select("*").eq("id", orderId).maybeSingle(),
        supabase.from("order_items").select("*").eq("order_id", orderId),
      ]);
      setOrder(orderRes.data as OrderDetail | null);
      setOrderItems((itemsRes.data as OrderItem[]) || []);
      setLoading(false);
    };
    fetch();
  }, [orderId]);

  if (loading) {
    return (
      <MainLayout>
        <section className="container-jimmy py-12 space-y-4">
          <Skeleton className="h-10 w-64 mx-auto" />
          <Skeleton className="h-64 w-full max-w-lg mx-auto" />
        </section>
      </MainLayout>
    );
  }

  if (!order) {
    return (
      <MainLayout>
        <section className="container-jimmy py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Order not found</h1>
          <Button asChild variant="outline" className="rounded-sm">
            <Link to="/shop">Back to Shop</Link>
          </Button>
        </section>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <section className="container-jimmy py-12 max-w-2xl mx-auto text-center">
        <CheckCircle className="mx-auto h-16 w-16 text-jimmy-green mb-4" />
        <h1 className="text-3xl font-bold text-foreground mb-2">Order Confirmed!</h1>
        <p className="text-muted-foreground mb-8">
          Thank you, {order.shipping_name}. Your order has been placed.
        </p>

        <div className="rounded-md border bg-card p-6 shadow-soft text-left mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Package className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold">Order #{order.id.slice(0, 8)}</h2>
          </div>

          <div className="space-y-3 mb-4">
            {orderItems.map((item) => (
              <div key={item.id} className="flex gap-3 items-center">
                <img
                  src={item.product_image || "/placeholder.svg"}
                  alt={item.product_name}
                  className="h-12 w-12 rounded object-cover bg-secondary shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{item.product_name}</p>
                  <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                </div>
                <span className="text-sm font-bold">{formatZAR(Number(item.price) * item.quantity)}</span>
              </div>
            ))}
          </div>

          <div className="border-t pt-3 space-y-1 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>{formatZAR(Number(order.subtotal))}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Shipping</span><span>{formatZAR(Number(order.shipping_cost))}</span></div>
            <div className="flex justify-between border-t pt-2 text-base font-bold"><span>Total</span><span className="text-primary">{formatZAR(Number(order.total))}</span></div>
          </div>
        </div>

        <div className="flex gap-3 justify-center">
          <Button asChild className="rounded-sm bg-primary font-bold text-primary-foreground">
            <Link to="/profile">View Orders</Link>
          </Button>
          <Button asChild variant="outline" className="rounded-sm">
            <Link to="/shop">Continue Shopping</Link>
          </Button>
        </div>
      </section>
    </MainLayout>
  );
};

export default OrderConfirmation;
