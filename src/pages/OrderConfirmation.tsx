import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { CheckCircle, Clock, AlertCircle, Package } from "lucide-react";
import { formatZAR } from "@/lib/format";

type OrderDetail = {
  id: string;
  status: string;
  payment_status: string;
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

const paymentStatusConfig: Record<string, { icon: React.ElementType; color: string; label: string }> = {
  paid: { icon: CheckCircle, color: "text-jimmy-green", label: "Payment Confirmed" },
  pending: { icon: Clock, color: "text-accent", label: "Payment Pending" },
  failed: { icon: AlertCircle, color: "text-destructive", label: "Payment Failed" },
};

const OrderConfirmation = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState<OrderDetail | null>(null);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!orderId) return;
    const fetchOrder = async () => {
      const [orderRes, itemsRes] = await Promise.all([
        supabase.from("orders").select("*").eq("id", orderId).maybeSingle(),
        supabase.from("order_items").select("*").eq("order_id", orderId),
      ]);
      setOrder(orderRes.data as OrderDetail | null);
      setOrderItems((itemsRes.data as OrderItem[]) || []);
      setLoading(false);
    };
    fetchOrder();
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
          <AlertCircle className="mx-auto h-12 w-12 text-muted-foreground/40 mb-4" />
          <h1 className="text-2xl font-bold mb-2">Order not found</h1>
          <p className="text-muted-foreground mb-6">We couldn't find this order. Please check the link or contact support.</p>
          <Button asChild variant="outline" className="rounded-sm">
            <Link to="/shop">Back to Shop</Link>
          </Button>
        </section>
      </MainLayout>
    );
  }

  const paymentInfo = paymentStatusConfig[order.payment_status] || paymentStatusConfig.pending;
  const StatusIcon = paymentInfo.icon;

  return (
    <MainLayout>
      <section className="container-jimmy py-12 max-w-2xl mx-auto text-center">
        <StatusIcon className={`mx-auto h-16 w-16 ${paymentInfo.color} mb-4`} />
        <h1 className="text-3xl font-bold text-foreground mb-2">
          {order.payment_status === "paid" ? "Order Confirmed!" : "Order Placed!"}
        </h1>
        <p className="text-muted-foreground mb-2">
          Thank you, {order.shipping_name}. Your order has been placed.
        </p>
        <p className={`text-sm font-semibold ${paymentInfo.color} mb-8`}>
          {paymentInfo.label}
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
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span>{formatZAR(Number(order.subtotal))}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Shipping</span>
              <span>{Number(order.shipping_cost) === 0 ? <span className="text-jimmy-green font-semibold">FREE</span> : formatZAR(Number(order.shipping_cost))}</span>
            </div>
            <div className="flex justify-between border-t pt-2 text-base font-bold">
              <span>Total</span>
              <span className="text-primary">{formatZAR(Number(order.total))}</span>
            </div>
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
