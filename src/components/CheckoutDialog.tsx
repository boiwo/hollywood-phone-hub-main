
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
import { CheckCircle2 } from "lucide-react"; // ✅ success icon
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
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
  });
  const [success, setSuccess] = useState(false); // ✅ track success state
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.phone || !formData.email) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    // Simulate order success
    toast({
      title: "Order Confirmed!",
      description: `Thank you ${formData.name}! We'll contact you at ${formData.phone} to confirm delivery.`,
    });

    // Reset and show success dialog
    setFormData({ name: "", phone: "", email: "" });
    onCheckoutComplete();
    setSuccess(true); // ✅ show success dialog
  };

  return (
    <>
      {/* Checkout Form Dialog */}
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Complete Your Purchase</DialogTitle>
            <DialogDescription>
              Enter your details to confirm your order of {items.length} item(s) - Total: ${total.toLocaleString()}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+1 (555) 000-0000"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>

            <div className="bg-secondary/30 p-4 rounded-lg space-y-2">
              <h4 className="font-semibold">Order Summary</h4>
              {items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span>{item.name} x{item.quantity}</span>
                  <span>${(item.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}
              <div className="flex justify-between font-bold pt-2 border-t">
                <span>Total:</span>
                <span className="text-accent">${total.toLocaleString()}</span>
              </div>
            </div>

            <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
              Confirm Purchase
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* ✅ Success Dialog */}
      <Dialog open={success} onOpenChange={setSuccess}>
        <DialogContent className="sm:max-w-sm text-center py-6">
          <CheckCircle2 className="mx-auto text-green-500 w-16 h-16 mb-3" />
          <DialogHeader>
            <DialogTitle>Purchase Successful!</DialogTitle>
            <DialogDescription>
              Thank you for shopping with us, {formData.name || "Customer"}.
              Your order has been received successfully.
            </DialogDescription>
          </DialogHeader>
          <Button
            className="mt-4 w-full"
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
