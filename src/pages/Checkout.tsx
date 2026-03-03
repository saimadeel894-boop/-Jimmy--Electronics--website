import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { ShoppingCart, Truck, CreditCard } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { formatZAR } from "@/lib/format";
import { Link } from "react-router-dom";

const SHIPPING_COST = 150;

const Checkout = () => {
  const { user, profile, loading: authLoading } = useAuth();
  const { items, subtotal, clearCart, loading: cartLoading } = useCart();
  const navigate = useNavigate();

  const [shippingName, setShippingName] = useState(profile?.name || "");
  const [shippingPhone, setShippingPhone] = useState(profile?.phone || "");
  const [shippingAddress, setShippingAddress] = useState(profile?.address || "");
  const [shippingCity, setShippingCity] = useState("");
  const [shippingProvince, setShippingProvince] = useState("");
  const [shippingPostalCode, setShippingPostalCode] = useState("");
  const [notes, setNotes] = useState("");
  const [placing, setPlacing] = useState(false);

  // Pre-fill from profile when it loads
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (profile) {
      setShippingName(profile.name || "");
      setShippingPhone(profile.phone || "");
      setShippingAddress(profile.address || "");
    }
  }, [profile]);

  if (authLoading || cartLoading) {
    return (
      <MainLayout>
        <section className="container-jimmy py-12 space-y-6">
          <Skeleton className="h-10 w-48" />
          <Skeleton className="h-96 w-full" />
        </section>
      </MainLayout>
    );
  }

  if (!user) {
    return (
      <MainLayout>
        <section className="container-jimmy py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Please sign in to checkout</h1>
          <Button asChild className="rounded-sm bg-primary font-bold text-primary-foreground">
            <Link to="/auth">Sign In</Link>
          </Button>
        </section>
      </MainLayout>
    );
  }

  if (items.length === 0) {
    return (
      <MainLayout>
        <section className="container-jimmy py-12 text-center">
          <ShoppingCart className="mx-auto h-16 w-16 text-muted-foreground/40 mb-4" />
          <h1 className="text-2xl font-bold mb-2">Your cart is empty</h1>
          <p className="text-muted-foreground mb-6">Add some products before checking out.</p>
          <Button asChild variant="outline" className="rounded-sm">
            <Link to="/shop">Browse Products</Link>
          </Button>
        </section>
      </MainLayout>
    );
  }

  const total = subtotal + SHIPPING_COST;

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!shippingName.trim() || !shippingAddress.trim() || !shippingCity.trim()) {
      toast({ title: "Missing fields", description: "Please fill in all required shipping fields.", variant: "destructive" });
      return;
    }

    setPlacing(true);
    try {
      // Create order
      const { data: order, error: orderError } = await supabase
        .from("orders")
        .insert({
          user_id: user.id,
          shipping_name: shippingName.trim(),
          shipping_phone: shippingPhone.trim() || null,
          shipping_address: shippingAddress.trim(),
          shipping_city: shippingCity.trim(),
          shipping_province: shippingProvince.trim() || null,
          shipping_postal_code: shippingPostalCode.trim() || null,
          subtotal,
          shipping_cost: SHIPPING_COST,
          total,
          notes: notes.trim() || null,
        })
        .select("id")
        .single();

      if (orderError || !order) throw orderError || new Error("Failed to create order");

      // Create order items
      const orderItems = items.map((item) => ({
        order_id: order.id,
        product_id: item.product_id,
        product_name: item.product?.name || "Product",
        product_image: item.product?.images?.[0] || null,
        price: item.product?.sale_price || item.product?.price || 0,
        quantity: item.quantity,
      }));

      const { error: itemsError } = await supabase.from("order_items").insert(orderItems);
      if (itemsError) throw itemsError;

      // Clear cart
      await clearCart();

      toast({ title: "Order placed!", description: "Thank you for your purchase." });
      navigate(`/order-confirmation/${order.id}`);
    } catch (err: any) {
      toast({ title: "Order failed", description: err?.message || "Something went wrong.", variant: "destructive" });
    } finally {
      setPlacing(false);
    }
  };

  return (
    <MainLayout>
      <section className="container-jimmy py-12">
        <h1 className="text-3xl font-bold text-foreground mb-8">Checkout</h1>

        <form onSubmit={handlePlaceOrder} className="grid gap-8 lg:grid-cols-3">
          {/* Shipping Form */}
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-md border bg-card p-6 shadow-soft">
              <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <Truck className="h-5 w-5" /> Shipping Information
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5 sm:col-span-2">
                  <Label htmlFor="sName">Full Name *</Label>
                  <Input id="sName" required value={shippingName} onChange={(e) => setShippingName(e.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="sPhone">Phone</Label>
                  <Input id="sPhone" value={shippingPhone} onChange={(e) => setShippingPhone(e.target.value)} placeholder="+27…" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="sPostal">Postal Code</Label>
                  <Input id="sPostal" value={shippingPostalCode} onChange={(e) => setShippingPostalCode(e.target.value)} />
                </div>
                <div className="space-y-1.5 sm:col-span-2">
                  <Label htmlFor="sAddress">Street Address *</Label>
                  <Input id="sAddress" required value={shippingAddress} onChange={(e) => setShippingAddress(e.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="sCity">City *</Label>
                  <Input id="sCity" required value={shippingCity} onChange={(e) => setShippingCity(e.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="sProvince">Province</Label>
                  <Input id="sProvince" value={shippingProvince} onChange={(e) => setShippingProvince(e.target.value)} />
                </div>
                <div className="space-y-1.5 sm:col-span-2">
                  <Label htmlFor="sNotes">Order Notes</Label>
                  <Textarea id="sNotes" placeholder="Special instructions…" value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} />
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div>
            <div className="rounded-md border bg-card p-6 shadow-soft sticky top-24">
              <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <CreditCard className="h-5 w-5" /> Order Summary
              </h2>

              <div className="space-y-3 mb-4">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <img
                      src={item.product?.images?.[0] || "/placeholder.svg"}
                      alt={item.product?.name || "Product"}
                      className="h-14 w-14 rounded object-cover bg-secondary shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{item.product?.name}</p>
                      <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                    </div>
                    <span className="text-sm font-bold shrink-0">
                      {formatZAR((item.product?.price ?? 0) * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t pt-3 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatZAR(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>{formatZAR(SHIPPING_COST)}</span>
                </div>
                <div className="flex justify-between border-t pt-2 text-base font-bold">
                  <span>Total</span>
                  <span className="text-primary">{formatZAR(total)}</span>
                </div>
              </div>

              <Button
                type="submit"
                disabled={placing}
                className="w-full mt-6 rounded-sm bg-accent text-accent-foreground font-bold hover:bg-accent/90"
              >
                {placing ? "Placing Order…" : "Place Order"}
              </Button>
            </div>
          </div>
        </form>
      </section>
    </MainLayout>
  );
};

export default Checkout;
