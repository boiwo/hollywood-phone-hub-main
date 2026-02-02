import { useState, useMemo } from "react";
import { Loader2, ShoppingBag } from "lucide-react";

// --- Minimal UI Components Mocks (Assuming Tailwind CSS is configured) ---

// Replace with your actual Button component if using a UI library
const Button = ({ children, className = "", ...props }: any) => (
  <button 
    className={`px-4 py-2 font-semibold transition-colors duration-200 ${className}`} 
    {...props}
  >
    {children}
  </button>
);

// --- Interfaces (Kept from the original code) ---

export interface Product {
  id: number;
  name: string;
  price: number;
  inStock: number;
}

export interface CartItem extends Product {
  quantity: number;
}

// --- Constants (Based on Video Data) ---

const SHIPPING_OPTIONS = {
  nairobi: { label: "Delivery within Nairobi County", cost: 400 },
  outside: { label: "Outside Nairobi — pay cash when you order (applies to customers outside of Nairobi County)", cost: 600 },
  pickup: { label: "Shop Pickup", cost: 0 },
};

// --- Checkout Page Component (Matching the Video) ---

interface CheckoutPageMockProps {
  items: CartItem[];
  onCheckoutSuccess: () => void;
}

export const CheckoutPageMock = ({
  items,
  onCheckoutSuccess,
}: CheckoutPageMockProps) => {
  const [shippingMethod, setShippingMethod] = useState<keyof typeof SHIPPING_OPTIONS>("nairobi");
  const [paymentMethod, setPaymentMethod] = useState("pay-on-order");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Calculate costs
  const subtotal = useMemo(() => 
    items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items]
  );
  
  const shippingCost = SHIPPING_OPTIONS[shippingMethod].cost;
  const total = subtotal + shippingCost;

  const handlePlaceOrder = async () => {
    if (!agreedToTerms) {
      alert("Please agree to the website terms and conditions.");
      return;
    }

    if (items.length === 0) {
      alert("Your cart is empty. Please add items before placing an order.");
      return;
    }

    setIsProcessing(true);
    // Simulate order placement delay
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    // On success
    setIsProcessing(false);
    onCheckoutSuccess(); 
    setAgreedToTerms(false);
    alert("Order placed successfully!");
  };

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center text-gray-500 p-8">
        <ShoppingBag className="h-14 w-14 mb-4 opacity-40" />
        <p className="text-xl font-bold">Your cart is empty</p>
        <p className="text-base mt-2">Add items to start the checkout process.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 bg-white shadow-2xl rounded-2xl my-8">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-8 border-b pb-4">
        Checkout
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* === Left Column: Forms and Payment === */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Billing & Shipping Section */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Billing & Shipping</h2>
            <div className="bg-gray-50 p-6 rounded-xl border space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input className="p-3 border rounded-lg" placeholder="First Name *" required />
                <input className="p-3 border rounded-lg" placeholder="Last name *" required />
                <input className="p-3 border rounded-lg col-span-2" placeholder="Country (Kenya)" disabled />
                <input className="p-3 border rounded-lg" placeholder="Town / City *" required />
                <input className="p-3 border rounded-lg" placeholder="Phone *" type="tel" required />
                <input className="p-3 border rounded-lg col-span-2" placeholder="Email address *" type="email" required />
              </div>
              <Button 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg"
                onClick={() => alert("Verification Email Sent!")} // Mock action
              >
                VERIFY YOUR EMAIL
              </Button>
              <input className="p-3 border rounded-lg w-full" placeholder="Enter Verification Code *" />
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="news-offers" className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                <label htmlFor="news-offers" className="text-sm text-gray-700">Email me with news and offers (optional)</label>
              </div>
            </div>
          </section>

          {/* Additional Information (Order Notes) */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Additional information</h2>
            <div className="bg-gray-50 p-6 rounded-xl border">
              <label htmlFor="order-notes" className="font-semibold text-sm mb-2 block">Order notes (optional)</label>
              <textarea 
                id="order-notes" 
                rows={3} 
                placeholder="Notes about your order, e.g. special notes for delivery." 
                className="w-full p-3 border rounded-lg"
              />
            </div>
          </section>

          {/* Payment Options Section */}
          <section className="lg:sticky lg:top-8 lg:self-start bg-white z-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Payment</h2>
            <div className="space-y-3">
              {/* Pay on Order */}
              <label className="flex items-start gap-3 p-4 border rounded-xl cursor-pointer transition-colors hover:bg-gray-50">
                <input
                  type="radio"
                  name="payment"
                  value="pay-on-order"
                  checked={paymentMethod === "pay-on-order"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="mt-1 h-5 w-5 text-blue-600 focus:ring-blue-500"
                />
                <div className="flex-1">
                  <div className="font-semibold text-base">Pay on order</div>
                  <div className="text-xs text-gray-500 mt-1">Pay cash when you order — this applies to customers outside of Nairobi County.</div>
                </div>
              </label>

              {/* Cash on Delivery */}
              <label className="flex items-center gap-3 p-4 border rounded-xl cursor-pointer transition-colors hover:bg-gray-50">
                <input
                  type="radio"
                  name="payment"
                  value="cash-on-delivery"
                  checked={paymentMethod === "cash-on-delivery"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="h-5 w-5 text-blue-600 focus:ring-blue-500"
                />
                <div>
                  <div className="font-semibold text-base">Cash on delivery</div>
                  <div className="text-xs text-gray-500 mt-1">Pay cash when your order is delivered — applies outside Nairobi County.</div>
                </div>
              </label>

              {/* CryptoPay Solutions */}
              <label className="flex items-center gap-3 p-4 border rounded-xl cursor-pointer transition-colors hover:bg-gray-50">
                <input
                  type="radio"
                  name="payment"
                  value="crypto"
                  checked={paymentMethod === "crypto"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="h-5 w-5 text-blue-600 focus:ring-blue-500"
                />
                <div>
                  <div className="font-semibold text-base">Cytopay Solution</div>
                  <div className="text-xs text-gray-500 mt-1">Pay using Cytopay Solution.</div>
                </div>
              </label>
            </div>
          </section>

          
          <section className="space-y-4">
            <p className="text-xs text-gray-500">
              Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our privacy policy.
            </p>
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                className="mt-1 h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">
                I have read and agree to the website{" "}
                <a href="#" className="text-blue-600 hover:underline font-medium">
                  terms and conditions
                </a>{" "}
                *
              </span>
            </label>
          </section>
        </div>

        
        <div className="lg:col-span-1">
          <div className="sticky top-8 p-6 bg-white border-2 border-blue-100 rounded-2xl shadow-lg space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 border-b pb-3">Your order</h2>

            
            <table className="w-full text-sm text-gray-700">
              <thead>
                <tr className="border-b">
                  <th className="py-2 text-left font-semibold">Product</th>
                  <th className="py-2 text-right font-semibold">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id}>
                    <td className="py-2">{item.name} × {item.quantity}</td>
                    <td className="py-2 text-right">KSh {(item.price * item.quantity).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            
            <div className="space-y-2 border-t pt-4">
              <div className="flex justify-between font-medium">
                <span>Subtotal</span>
                <span>KSh {subtotal.toLocaleString()}</span>
              </div>

              
              <div className="pt-2 space-y-2">
                <span className="font-medium block mb-1">Shipping</span>
                {(Object.keys(SHIPPING_OPTIONS) as Array<keyof typeof SHIPPING_OPTIONS>).map((key) => (
                  <label key={key} className="flex items-center justify-between text-sm cursor-pointer">
                    <div className="flex items-center gap-2">
                        <input
                            type="radio"
                            name="shipping"
                            value={key}
                            checked={shippingMethod === key}
                            onChange={() => setShippingMethod(key)}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                        />
                        <span>{SHIPPING_OPTIONS[key].label}</span>
                    </div>
                    <span className="font-medium">
                        {SHIPPING_OPTIONS[key].cost > 0 ? `KSh ${SHIPPING_OPTIONS[key].cost.toLocaleString()}` : 'Shop Pickup'}
                    </span>
                  </label>
                ))}
              </div>

              {/* Total */}
              <div className="flex justify-between items-center text-xl font-extrabold border-t pt-4 mt-4 text-blue-800">
                <span>Total</span>
                <span>KSh {total.toLocaleString()}</span>
              </div>
            </div>

            {/* Place Order Button */}
            <Button
              className="w-full py-3 text-lg rounded-xl bg-blue-600 text-white hover:bg-blue-700 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              onClick={handlePlaceOrder}
              disabled={!agreedToTerms || isProcessing || items.length === 0}
            >
              {isProcessing ? (
                <>
                  <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                "PLACE ORDER"
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Demo App Component (Default Export for Easy Run) ---

export default function App() {
    const initialItem: CartItem = {
      id: 1,
      name: "Samsung Galaxy Note 20 Ultra",
      price: 48000,
      inStock: 10,
      quantity: 1,
    };

    const [cartItems, setCartItems] = useState<CartItem[]>([initialItem]);
  
    const handleCheckoutSuccess = () => {
      setCartItems([]);
    };
  
    // Function to reset the cart for the demo
    const handleAddItem = () => {
        setCartItems([initialItem]);
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        {/* Render the Checkout component */}
        <CheckoutPageMock
          items={cartItems}
          onCheckoutSuccess={handleCheckoutSuccess}
        />
  
        {/* Demo Button to reset the cart if empty */}
        {cartItems.length === 0 && (
            <div className="text-center mt-12">
                <p className="text-lg text-gray-700 mb-4">Demo Finished. Click to restart the checkout flow.</p>
                <Button 
                    onClick={handleAddItem}
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl shadow-lg"
                >
                    <ShoppingBag className="mr-2 h-5 w-5" />
                    Add Item to Cart
                </Button>
            </div>
        )}
      </div>
    );
}

// Named CartSheet component expected by other pages (e.g. pages/Index.tsx)
// Minimal implementation: drawer that shows items, allows quantity update and removal.
export const CartSheet = ({
  open,
  onOpenChange,
  items,
  onUpdateQuantity,
  onRemoveItem,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  items: CartItem[];
  onUpdateQuantity: (id: number, qty: number) => void;
  onRemoveItem: (id: number) => void;
}) => {
  if (!open) return null;
  const subtotal = items.reduce((s, it) => s + it.price * it.quantity, 0);

  // Billing form state
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [orderNotes, setOrderNotes] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"pay-on-order" | "cash-on-delivery" | "cytopay">("pay-on-order");
  const [generatedCode, setGeneratedCode] = useState<string | null>(null);
  const [codeSent, setCodeSent] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);

  const handleVerifyEmail = () => {
    // Local-only verification (no backend)
    if (!email) return alert("Please enter an email first to verify.");
    // generate 6-digit code
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedCode(code);
    setCodeSent(true);
    setEmailVerified(false);

    // Store code locally with short expiry (10 minutes)
    try {
      const payload = { code, expires: Date.now() + 10 * 60 * 1000 };
      localStorage.setItem(`verification:${email}`, JSON.stringify(payload));
    } catch (err) {
      console.warn("Failed to store verification code in localStorage:", err);
    }

    // Open mail client as a demo and also log code to console for convenience
    const mailto = `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent("Your verification code")}&body=${encodeURIComponent("Your verification code is: " + code)}`;
    try {
      window.open(mailto, "_blank");
    } catch (err) {
      console.warn("Could not open mail client:", err);
    }

    console.info("[demo] verification code for", email, "->", code);
    alert(`Verification code generated and stored locally. Mail client opened (demo).`);
  };

  const handleConfirmCode = () => {
    if (!codeSent && !generatedCode) return alert("Please request a verification code first.");

    // Prefer in-memory generatedCode, otherwise read from localStorage
    let expected = generatedCode;
    if (!expected && email) {
      try {
        const raw = localStorage.getItem(`verification:${email}`);
        if (raw) {
          const parsed = JSON.parse(raw);
          if (parsed && parsed.expires && Date.now() <= parsed.expires) {
            expected = parsed.code;
          } else {
            // expired
            localStorage.removeItem(`verification:${email}`);
          }
        }
      } catch (err) {
        console.warn("Failed to read verification code from localStorage:", err);
      }
    }

    if (!expected) return alert("No valid verification code found. Please request a new code.");

    if (verificationCode.trim() === expected) {
      setEmailVerified(true);
      alert("Email verified successfully.");
      // clear stored code for security in demo
      try {
        if (email) localStorage.removeItem(`verification:${email}`);
      } catch (err) {
        /* ignore */
      }
      setGeneratedCode(null);
      setCodeSent(false);
      setVerificationCode("");
    } else {
      alert("Incorrect verification code. Please try again.");
    }
  };

  const handlePlaceOrder = () => {
    if (items.length === 0) return alert("Your cart is empty");
    if (!firstName || !lastName || !city || !phone || !email) {
      return alert("Please complete the billing fields marked with *");
    }
  if (!emailVerified) return alert("Please verify your email before placing the order.");

    // Mock order submission
    const orderSummary = {
      name: `${firstName} ${lastName}`,
      country: "Kenya",
      city,
      phone,
      email,
      items,
      paymentMethod,
      notes: orderNotes,
    };

    console.log("Order placed:", orderSummary);
    alert("Order placed successfully (demo). Check console for details.");
    onOpenChange(false);
  };

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/40" onClick={() => onOpenChange(false)} />

      <aside className="absolute right-0 top-0 h-full w-full max-w-2xl bg-white shadow-xl p-6 overflow-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold">@shopping — Billing & Your order</h3>
          <button aria-label="Close cart" onClick={() => onOpenChange(false)} className="text-gray-600 hover:text-gray-900">✕</button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left: Billing Form */}
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg border">
              <h4 className="font-semibold mb-2">Billing</h4>
              <div className="grid grid-cols-2 gap-3">
                <input
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="p-3 border rounded-lg"
                  placeholder="First name *"
                />
                <input
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="p-3 border rounded-lg"
                  placeholder="Last name *"
                />
                <input className="p-3 border rounded-lg col-span-2" placeholder="Country (Kenya)" disabled />
                <input
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="p-3 border rounded-lg"
                  placeholder="Town / City *"
                />
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="p-3 border rounded-lg"
                  placeholder="Phone *"
                  type="tel"
                />
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="p-3 border rounded-lg col-span-2"
                  placeholder="Email address *"
                  type="email"
                />
              </div>

              <div className="mt-3 space-y-2">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg" onClick={handleVerifyEmail}>
                  VERIFY YOUR EMAIL
                </Button>
                <div className="flex gap-2">
                  <input
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    className="mt-0 p-3 border rounded-lg flex-1"
                    placeholder="Enter Verification Code *"
                  />
                  <Button className="bg-gray-200 text-gray-800 px-3 rounded-lg" onClick={handleConfirmCode}>
                    Confirm
                  </Button>
                </div>
                {emailVerified && <div className="text-sm text-green-600 font-medium">Email verified ✓</div>}
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg border">
              <h4 className="font-semibold mb-2">Additional information</h4>
              <textarea
                value={orderNotes}
                onChange={(e) => setOrderNotes(e.target.value)}
                rows={4}
                className="w-full p-3 border rounded-lg"
                placeholder="Notes about your order, e.g. special delivery instructions"
              />
            </div>

            <div className="bg-gray-50 p-4 rounded-lg border">
              <h4 className="font-semibold mb-2">Payment</h4>
              <div className="space-y-2">
                <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer">
                  <input type="radio" name="payment" value="pay-on-order" checked={paymentMethod === "pay-on-order"} onChange={() => setPaymentMethod("pay-on-order")} className="h-4 w-4 text-blue-600" />
                  <div>
                    <div className="font-medium">Pay on order</div>
                    <div className="text-xs text-gray-500">Pay ahead to secure your order.</div>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer">
                  <input type="radio" name="payment" value="cash-on-delivery" checked={paymentMethod === "cash-on-delivery"} onChange={() => setPaymentMethod("cash-on-delivery")} className="h-4 w-4 text-blue-600" />
                  <div className="font-medium">Cash on delivery</div>
                </label>

                <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer">
                  <input type="radio" name="payment" value="cytopay" checked={paymentMethod === "cytopay"} onChange={() => setPaymentMethod("cytopay")} className="h-4 w-4 text-blue-600" />
                  <div className="font-medium">Cytopay Solution</div>
                </label>
              </div>
            </div>

            <div>
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg" onClick={handlePlaceOrder}>
                PLACE ORDER
              </Button>
            </div>
          </div>

          {/* Right: Order Summary */}
          <div>
            <div className="bg-gray-50 p-4 rounded-lg border sticky top-6">
              <h4 className="font-semibold mb-2">Your order</h4>
              {items.length === 0 ? (
                <div className="text-sm text-gray-500">Your cart is empty</div>
              ) : (
                <div className="space-y-3">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">{item.name}</div>
                        <div className="text-xs text-gray-500">KSh {item.price.toLocaleString()}</div>
                        <div className="text-xs text-gray-500">Qty: {item.quantity}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">KSh {(item.price * item.quantity).toLocaleString()}</div>
                        <div className="flex items-center gap-2 mt-2">
                          <button className="px-2 py-1 border rounded" onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}>-</button>
                          <span className="w-6 text-center">{item.quantity}</span>
                          <button className="px-2 py-1 border rounded" onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}>+</button>
                        </div>
                        <button className="text-sm text-red-600 mt-2" onClick={() => onRemoveItem(item.id)}>Remove</button>
                      </div>
                    </div>
                  ))}

                  <div className="border-t pt-3">
                    <div className="flex justify-between font-semibold">
                      <span>Subtotal</span>
                      <span>KSh {subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between mt-2">
                      <span>Shipping</span>
                      <span className="text-sm text-gray-600">Calculated at checkout</span>
                    </div>
                    <div className="flex justify-between mt-4 text-lg font-bold">
                      <span>Total</span>
                      <span>KSh {subtotal.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
};