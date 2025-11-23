import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Product } from "./ProductCard";
import { CheckoutDialog } from "./CheckoutDialog";

export interface CartItem extends Product {
  quantity: number;
}

interface CartSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  items: CartItem[];
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemoveItem: (id: number) => void;
}

export const CartSheet = ({
  open,
  onOpenChange,
  items,
  onUpdateQuantity,
  onRemoveItem,
}: CartSheetProps) => {
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>Shopping Cart</SheetTitle>
          <SheetDescription>
            {items.length === 0
              ? "Your cart is empty"
              : `${items.length} item(s) in your cart`}
          </SheetDescription>
        </SheetHeader>

        <div className="mt-8 flex flex-col gap-4 flex-1 overflow-y-auto max-h-[calc(100vh-250px)]">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex gap-4 border rounded-lg p-4 hover:border-accent transition-colors"
            >
              <video
                src={item.video}
                autoPlay
                loop
                muted
                playsInline
                className="w-20 h-20 object-cover rounded-md bg-secondary"
              />
              <div className="flex-1 space-y-2">
                <h4 className="font-semibold text-sm line-clamp-2">{item.name}</h4>
                <p className="text-lg font-bold text-accent">
                  ${item.price.toLocaleString()}
                </p>
                <div className="flex items-center gap-2">
                  <div className="flex items-center border rounded-md">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() =>
                        onUpdateQuantity(
                          item.id,
                          Math.max(1, item.quantity - 1)
                        )
                      }
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="w-10 text-center text-sm font-semibold">
                      {item.quantity}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() =>
                        onUpdateQuantity(
                          item.id,
                          Math.min(item.inStock, item.quantity + 1)
                        )
                      }
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                    onClick={() => onRemoveItem(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {items.length > 0 && (
          <div className="mt-6 space-y-4 border-t pt-4">
            <div className="flex justify-between text-lg font-semibold">
              <span>Total:</span>
              <span className="text-accent">${total.toLocaleString()}</span>
            </div>
            <Button 
              className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" 
              size="lg"
              onClick={() => setCheckoutOpen(true)}
            >
              Checkout
            </Button>
          </div>
        )}
      </SheetContent>

      <CheckoutDialog
        open={checkoutOpen}
        onOpenChange={setCheckoutOpen}
        items={items}
        total={total}
        onCheckoutComplete={() => {
          // Clear cart after successful checkout
          items.forEach(item => onRemoveItem(item.id));
        }}
      />
    </Sheet>
  );
};
