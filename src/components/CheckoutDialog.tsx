
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle2 } from "lucide-react";
import { CartItem } from "./CartSheet";

interface CheckoutDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  items: CartItem[];
  total: number;
  onCheckoutComplete: () => void;
}

export const CheckoutDialog = ({
  open,
  onOpenChange,
  items,
  total,
  onCheckoutComplete,
}: CheckoutDialogProps) => {
  const [formData, setFormData] = useState({ name: "", phone: "", email: "" });
  const [success, setSuccess] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.phone || !formData.email) {
      toast({
        title: "Missing Information",
        description: "Please fill out all fields to continue.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Order Confirmed!",
      description: `Thank you, ${formData.name}. We'll contact you at ${formData.phone}.`,
    });

    onCheckoutComplete();
    setSuccess(true);
    setFormData({ name: "", phone: "", email: "" });
  };

  return (
    <>
      {/* Checkout Form */}
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md rounded-2xl shadow-xl p-6 bg-white">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold tracking-tight">
              Checkout Details
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Complete your purchase of {items.length} item(s). Total: ${total.toLocaleString()}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-5 mt-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="rounded-xl"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="0712 345 678"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="rounded-xl"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="example@mail.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="rounded-xl"
              />
            </div>

            <div className="bg-muted/40 p-4 rounded-xl shadow-inner space-y-2">
              <h4 className="font-semibold text-base">Order Summary</h4>

              {items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm opacity-90">
                  <span>
                    {item.name} × {item.quantity}
                  </span>
                  <span>${(item.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}

              <div className="flex justify-between font-bold text-lg pt-2 border-t">
                <span>Total:</span>
                <span className="text-accent">${total.toLocaleString()}</span>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full py-6 rounded-xl text-lg bg-accent hover:bg-accent/90 text-accent-foreground shadow-md"
            >
              Confirm Order
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Success Dialog */}
      <Dialog open={success} onOpenChange={setSuccess}>
        <DialogContent className="sm:max-w-sm text-center p-8 rounded-2xl bg-white shadow-2xl">
          <CheckCircle2 className="mx-auto w-20 h-20 text-green-500 mb-4" />
          
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">Order Successful!</DialogTitle>
            <DialogDescription className="text-muted-foreground text-sm">
              Thank you for shopping with us! Your order has been received.
            </DialogDescription>
          </DialogHeader>

          <Button
            className="mt-6 w-full rounded-xl py-3 text-base"
            onClick={() => {
              setSuccess(false);
              onOpenChange(false);
            }}
          >
            Close
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
};
