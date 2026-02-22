import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ShoppingCart, Minus, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const MOCK_CART = [
  {
    id: 1,
    name: "JIMMY PW11 PRO MAX 5-in-1 Cordless Vacuum",
    price: 36990,
    qty: 1,
    image: "/images/products/jimmy-pw11-pro-max.jpg",
  },
  {
    id: 2,
    name: "JIMMY H8 FLEX Cordless Vacuum Cleaner",
    price: 17490,
    qty: 1,
    image: "/images/products/jimmy-h8-flex.jpg",
  },
];

const formatZAR = (n: number) => "R " + n.toLocaleString("en-ZA");

const CartDrawer = () => {
  const [open, setOpen] = useState(false);
  const [items] = useState(MOCK_CART);
  const total = items.reduce((s, i) => s + i.price * i.qty, 0);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          className="relative flex items-center text-primary-foreground/90 hover:text-primary-foreground shrink-0"
          aria-label={`Cart — ${items.length} items`}
        >
          <ShoppingCart className="h-6 w-6" strokeWidth={1.5} />
          {items.length > 0 && (
            <span className="absolute -right-1.5 -top-1.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-accent px-1 text-[10px] font-bold leading-none text-accent-foreground">
              {items.length}
            </span>
          )}
        </button>
      </SheetTrigger>
      <SheetContent side="right" className="flex w-[380px] flex-col bg-background p-0">
        <SheetHeader className="border-b px-5 py-4">
          <SheetTitle className="text-left text-lg font-bold">
            Your Cart ({items.length})
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
          {items.map((item) => (
            <div key={item.id} className="flex gap-3 border-b pb-4">
              <img
                src={item.image}
                alt={item.name}
                className="h-20 w-20 shrink-0 rounded-md object-cover bg-secondary"
              />
              <div className="flex flex-1 flex-col justify-between">
                <p className="text-sm font-medium leading-snug line-clamp-2">{item.name}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 rounded-md border">
                    <button className="px-2 py-1 text-muted-foreground hover:text-foreground">
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="text-xs font-semibold">{item.qty}</span>
                    <button className="px-2 py-1 text-muted-foreground hover:text-foreground">
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>
                  <span className="text-sm font-bold text-primary">{formatZAR(item.price)}</span>
                </div>
              </div>
              <button className="self-start text-muted-foreground hover:text-destructive">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>

        <div className="border-t px-5 py-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold">Subtotal</span>
            <span className="text-lg font-bold text-primary">{formatZAR(total)}</span>
          </div>
          <Button className="w-full rounded-sm bg-accent text-accent-foreground font-bold hover:bg-accent/90">
            Proceed to Checkout
          </Button>
          <Button
            variant="outline"
            className="w-full rounded-sm"
            onClick={() => setOpen(false)}
          >
            Continue Shopping
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;
