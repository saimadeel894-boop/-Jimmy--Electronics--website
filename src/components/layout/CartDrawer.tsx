import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ShoppingCart, Minus, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";

const formatZAR = (n: number) => "R " + n.toLocaleString("en-ZA");

const CartDrawer = () => {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();
  const { items, itemCount, subtotal, updateQuantity, removeItem, loading } = useCart();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          className="relative flex items-center text-primary-foreground/90 hover:text-primary-foreground shrink-0"
          aria-label={`Cart — ${itemCount} items`}
        >
          <ShoppingCart className="h-6 w-6" strokeWidth={1.5} />
          {itemCount > 0 && (
            <span className="absolute -right-1.5 -top-1.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-accent px-1 text-[10px] font-bold leading-none text-accent-foreground">
              {itemCount}
            </span>
          )}
        </button>
      </SheetTrigger>
      <SheetContent side="right" className="flex w-[380px] flex-col bg-background p-0">
        <SheetHeader className="border-b px-5 py-4">
          <SheetTitle className="text-left text-lg font-bold">
            Your Cart ({itemCount})
          </SheetTitle>
        </SheetHeader>

        {!user ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-5">
            <p className="text-sm text-muted-foreground text-center">
              Sign in to view your cart and start shopping.
            </p>
            <Button asChild className="rounded-sm bg-primary font-bold text-primary-foreground hover:bg-primary/90">
              <Link to="/auth" onClick={() => setOpen(false)}>Sign In</Link>
            </Button>
          </div>
        ) : items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-5">
            <ShoppingCart className="h-12 w-12 text-muted-foreground/40" />
            <p className="text-sm text-muted-foreground">Your cart is empty</p>
            <Button
              variant="outline"
              className="rounded-sm"
              onClick={() => setOpen(false)}
            >
              Continue Shopping
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-3 border-b pb-4">
                  <img
                    src={item.product?.images?.[0] || "/placeholder.svg"}
                    alt={item.product?.name || "Product"}
                    className="h-20 w-20 shrink-0 rounded-md object-cover bg-secondary"
                  />
                  <div className="flex flex-1 flex-col justify-between">
                    <p className="text-sm font-medium leading-snug line-clamp-2">
                      {item.product?.name || "Product"}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 rounded-md border">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-2 py-1 text-muted-foreground hover:text-foreground"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="text-xs font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-2 py-1 text-muted-foreground hover:text-foreground"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      <span className="text-sm font-bold text-primary">
                        {formatZAR((item.product?.price ?? 0) * item.quantity)}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="self-start text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>

            <div className="border-t px-5 py-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold">Subtotal</span>
                <span className="text-lg font-bold text-primary">{formatZAR(subtotal)}</span>
              </div>
              <Button
                asChild
                className="w-full rounded-sm bg-accent text-accent-foreground font-bold hover:bg-accent/90"
              >
                <Link to="/checkout" onClick={() => setOpen(false)}>Proceed to Checkout</Link>
              </Button>
              <Button
                variant="outline"
                className="w-full rounded-sm"
                onClick={() => setOpen(false)}
              >
                Continue Shopping
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;
