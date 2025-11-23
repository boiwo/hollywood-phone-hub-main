import { useState } from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ProductCard, Product } from "@/components/ProductCard";
import { CartSheet, CartItem } from "@/components/CartSheet";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";

import video1 from "@/assets/iphone-1.mp4";
import video2 from "@/assets/iphone-2.mp4";
import video3 from "@/assets/iphone-3.mp4";
import video4 from "@/assets/iphone-4.mp4";
import video5 from "@/assets/iphone-5.mp4";
import video6 from "@/assets/iphone-6.mp4";

const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "iPhone 15 Pro Max - 512GB, A17 Pro Chip, Titanium Design",
    price: 1199,
    originalPrice: 1599,
    video: video1,
    rating: 5,
    reviews: 1203,
    discount: 25,
    inStock: 15,
  },
  {
    id: 2,
    name: "iPhone 15 Pro - 256GB, ProMotion Display, Action Button",
    price: 999,
    originalPrice: 1299,
    video: video2,
    rating: 5,
    reviews: 892,
    discount: 23,
    inStock: 8,
  },
  {
    id: 3,
    name: "iPhone 15 - 128GB, Dynamic Island, 48MP Camera",
    price: 799,
    originalPrice: 999,
    video: video3,
    rating: 4.5,
    reviews: 654,
    discount: 20,
    inStock: 20,
  },
  {
    id: 4,
    name: "iPhone 14 Pro - 256GB, Always-On Display, Pro Camera System",
    price: 899,
    originalPrice: 1099,
    video: video4,
    rating: 5,
    reviews: 445,
    discount: 18,
    inStock: 12,
  },
  {
    id: 5,
    name: "iPhone 14 - 256GB, A15 Bionic, Dual Camera",
    price: 699,
    originalPrice: 899,
    video: video5,
    rating: 4.5,
    reviews: 523,
    discount: 22,
    inStock: 18,
  },
  {
    id: 6,
    name: "iPhone 13 - 128GB, Ceramic Shield, Night Mode",
    price: 599,
    originalPrice: 799,
    video: video6,
    rating: 4,
    reviews: 678,
    discount: 25,
    inStock: 25,
  },
];

const Index = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const { toast } = useToast();

  const handleAddToCart = (product: Product, quantity: number) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...product, quantity }];
    });

    toast({
      title: "Added to cart",
      description: `${product.name} (${quantity}x)`,
    });
  };

  const handleUpdateQuantity = (id: number, quantity: number) => {
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const handleRemoveItem = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
    toast({
      title: "Removed from cart",
      description: "Item has been removed",
    });
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen">
      <Header cartCount={cartCount} onCartClick={() => setCartOpen(true)} />
      <Hero />

      <section id="products" className="py-20">
        <div className="container">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">Featured Products</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover our selection of premium smartphones with the latest technology
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PRODUCTS.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        </div>
      </section>

      <Contact />
      <Footer />

      <CartSheet
        open={cartOpen}
        onOpenChange={setCartOpen}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
      />
    </div>
  );
};

export default Index;
