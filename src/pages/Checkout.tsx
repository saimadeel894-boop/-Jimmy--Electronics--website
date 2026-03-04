import { useState, useEffect } from "react";
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
import { ShoppingCart, Truck, CreditCard, AlertCircle, Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { formatZAR } from "@/lib/format";
import { Link } from "react-router-dom";
import { isStripeConfigured } from "@/lib/stripe-config";

const SHIPPING_COST = 150;
const FREE_SHIPPING_THRESHOLD = 2500;

const Checkout = () => {
  const { user, profile, loading: authLoading } = useAuth();
  const { items, subtotal, clearCart, loading: cartLoading } = useCart();
  const navigate = useNavigate();

  const [shippingName, setShippingName] = useState("");
  const [shippingPhone, setShippingPhone] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const [shippingCity, setShippingCity] = useState("");
  const [shippingProvince, setShippingProvince] = useState("");
  const [shippingPostalCode, setShippingPostalCode] = useState("");
  const [notes, setNotes] = useState("");
  const [placing, setPlacing] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Pre-fill from profile when it loads
  useEffect(() => {
    if (profile) {
      setShippingName(profile.name || "");
      setShippingPhone(profile.phone || "");
      setShippingAddress(profile.address || "");
    }
  }, [profile]);

  const shippingCost = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const total = subtotal + shippingCost;

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};
    if (!shippingName.trim()) errors.name = "Full name is required";
    if (!shippingAddress.trim()) errors.address = "Street address is required";
    if (!shippingCity.trim()) errors.city = "City is required";
    if (shippingPhone.trim() && !/^\+?\d[\d\s-]{7,}$/.test(shippingPhone.trim())) {
      errors.phone = "Enter a valid phone number";
    }
    if (shippingPostalCode.trim() && !/^\d{4,6}$/.test(shippingPostalCode.trim())) {
      errors.postal = "Enter a valid postal code";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  if (authLoading || cartLoading) {
    return (
      <MainLayout>
        <section className="container-jimmy py-12 space-y-6">
          <Skeleton className="h-10 w-48" />
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <Skeleton className="h-96 w-full" />
            </div>
            <Skeleton className="h-64 w-full" />
          </div>
        </section>
      </MainLayout>
    );
  }

  if (!user) {
    return (
      <MainLayout>
        <section className="container-jimmy py-12 text-center">
          <AlertCircle className="mx-auto h-12 w-12 text-muted-foreground/40 mb-4" />
          <h1 className="text-2xl font-bold mb-2">Please sign in to checkout</h1>
          <p className="text-muted-foreground mb-6">You need an account to place an order.</p>
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

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      toast({ title: "Please fix form errors", description: "Some required fields are missing or invalid.", variant: "destructive" });
      return;
    }

    setPlacing(true);
    try {
      // Create order with pending payment status
      // Build order payload — only include payment_status if Stripe is configured
      const orderPayload: Record<string, unknown> = {
          user_id: user.id,
          shipping_name: shippingName.trim(),
          shipping_phone: shippingPhone.trim() || null,
          shipping_address: shippingAddress.trim(),
          shipping_city: shippingCity.trim(),
          shipping_province: shippingProvince.trim() || null,
          shipping_postal_code: shippingPostalCode.trim() || null,
          subtotal,
          shipping_cost: shippingCost,
          total,
          notes: notes.trim() || null,
          payment_status: "pending",
        })
        .select("id")
        .single();

      if (orderError || !order) throw orderError || new Error("Failed to create order");

      // Create order items with correct sale pricing
      const orderItems = items.map((item) => ({
        order_id: order.id,
        product_id: item.product_id,
        product_name: item.product?.name || "Product",
        product_image: item.product?.images?.[0] || null,
        price: item.product?.sale_price ?? item.product?.price ?? 0,
        quantity: item.quantity,
      }));

      const { error: itemsError } = await supabase.from("order_items").insert(orderItems);
      if (itemsError) throw itemsError;

      // If Stripe is configured, initiate payment
      if (isStripeConfigured()) {
        try {
          const { data: paymentData, error: paymentError } = await supabase.functions.invoke(
            "create-payment-intent",
            { body: { order_id: order.id } }
          );

          if (paymentError) throw paymentError;

          // In full implementation, load Stripe.js and confirm payment here
          // For now, redirect to confirmation with payment pending
          await clearCart();
          toast({ title: "Order placed!", description: "Payment processing..." });
          navigate(`/order-confirmation/${order.id}`);
        } catch (payErr: any) {
          // Payment init failed but order is created — user can retry payment
          toast({
            title: "Payment setup failed",
            description: "Your order is saved. Payment can be retried.",
            variant: "destructive",
          });
          navigate(`/order-confirmation/${order.id}`);
        }
      } else {
        // No Stripe configured — place order directly (COD / manual payment)
        await clearCart();
        toast({ title: "Order placed!", description: "Thank you for your purchase." });
        navigate(`/order-confirmation/${order.id}`);
      }
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
                  <Input
                    id="sName"
                    required
                    value={shippingName}
                    onChange={(e) => { setShippingName(e.target.value); setFormErrors(prev => ({ ...prev, name: "" })); }}
                    className={formErrors.name ? "border-destructive" : ""}
                  />
                  {formErrors.name && <p className="text-xs text-destructive">{formErrors.name}</p>}
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="sPhone">Phone</Label>
                  <Input
                    id="sPhone"
                    value={shippingPhone}
                    onChange={(e) => { setShippingPhone(e.target.value); setFormErrors(prev => ({ ...prev, phone: "" })); }}
                    placeholder="+27…"
                    className={formErrors.phone ? "border-destructive" : ""}
                  />
                  {formErrors.phone && <p className="text-xs text-destructive">{formErrors.phone}</p>}
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="sPostal">Postal Code</Label>
                  <Input
                    id="sPostal"
                    value={shippingPostalCode}
                    onChange={(e) => { setShippingPostalCode(e.target.value); setFormErrors(prev => ({ ...prev, postal: "" })); }}
                    className={formErrors.postal ? "border-destructive" : ""}
                  />
                  {formErrors.postal && <p className="text-xs text-destructive">{formErrors.postal}</p>}
                </div>
                <div className="space-y-1.5 sm:col-span-2">
                  <Label htmlFor="sAddress">Street Address *</Label>
                  <Input
                    id="sAddress"
                    required
                    value={shippingAddress}
                    onChange={(e) => { setShippingAddress(e.target.value); setFormErrors(prev => ({ ...prev, address: "" })); }}
                    className={formErrors.address ? "border-destructive" : ""}
                  />
                  {formErrors.address && <p className="text-xs text-destructive">{formErrors.address}</p>}
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="sCity">City *</Label>
                  <Input
                    id="sCity"
                    required
                    value={shippingCity}
                    onChange={(e) => { setShippingCity(e.target.value); setFormErrors(prev => ({ ...prev, city: "" })); }}
                    className={formErrors.city ? "border-destructive" : ""}
                  />
                  {formErrors.city && <p className="text-xs text-destructive">{formErrors.city}</p>}
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="sProvince">Province</Label>
                  <Input id="sProvince" value={shippingProvince} onChange={(e) => setShippingProvince(e.target.value)} />
                </div>
                <div className="space-y-1.5 sm:col-span-2">
                  <Label htmlFor="sNotes">Order Notes</Label>
                  <Textarea
                    id="sNotes"
                    placeholder="Special instructions…"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={3}
                    maxLength={500}
                  />
                  <p className="text-xs text-muted-foreground text-right">{notes.length}/500</p>
                </div>
              </div>
            </div>

            {/* Payment Method Info */}
            <div className="rounded-md border bg-card p-6 shadow-soft">
              <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <CreditCard className="h-5 w-5" /> Payment
              </h2>
              {isStripeConfigured() ? (
                <p className="text-sm text-muted-foreground">
                  Secure payment powered by Stripe. Your card details are encrypted end-to-end.
                </p>
              ) : (
                <div className="rounded-md bg-secondary p-4">
                  <p className="text-sm text-foreground font-medium mb-1">Cash on Delivery / EFT</p>
                  <p className="text-xs text-muted-foreground">
                    Online card payments coming soon. For now, orders are confirmed and payment arranged separately.
                  </p>
                </div>
              )}
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
                      {formatZAR((item.product?.sale_price ?? item.product?.price ?? 0) * item.quantity)}
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
                  {shippingCost === 0 ? (
                    <span className="text-jimmy-green font-semibold">FREE</span>
                  ) : (
                    <span>{formatZAR(shippingCost)}</span>
                  )}
                </div>
                {shippingCost > 0 && subtotal < FREE_SHIPPING_THRESHOLD && (
                  <p className="text-xs text-muted-foreground">
                    Add {formatZAR(FREE_SHIPPING_THRESHOLD - subtotal)} more for free shipping
                  </p>
                )}
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
                {placing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Placing Order…
                  </>
                ) : (
                  "Place Order"
                )}
              </Button>
            </div>
          </div>
        </form>
      </section>
    </MainLayout>
  );
};

export default Checkout;
