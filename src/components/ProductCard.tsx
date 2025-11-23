import { Star, ShoppingCart, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  video: string;
  rating: number;
  reviews: number;
  discount?: number;
  inStock: number;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, quantity: number) => void;
}

export const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  const [quantity, setQuantity] = useState(1);

  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleIncrease = () => {
    if (quantity < product.inStock) setQuantity(quantity + 1);
  };

  const handleAddToCart = () => {
    onAddToCart(product, quantity);
    setQuantity(1);
  };

  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-[var(--shadow-hover)]">
      <div className="relative overflow-hidden bg-secondary/30">
        {product.discount && (
          <Badge className="absolute top-3 right-3 z-10 bg-accent hover:bg-accent text-accent-foreground">
            -{product.discount}%
          </Badge>
        )}
        <video
          src={product.video}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      <CardContent className="p-5 space-y-3">
        <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-accent transition-colors">
          {product.name}
        </h3>

        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${
                i < Math.floor(product.rating)
                  ? "fill-accent text-accent"
                  : "text-muted-foreground"
              }`}
            />
          ))}
          <span className="text-sm text-muted-foreground ml-2">
            ({product.reviews})
          </span>
        </div>

        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-foreground">
            ${product.price.toLocaleString()}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              ${product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>

        <p className="text-sm text-muted-foreground">
          {product.inStock} items left
        </p>
      </CardContent>

      <CardFooter className="p-5 pt-0 flex gap-3">
        <div className="flex items-center border rounded-lg">
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 hover:bg-secondary"
            onClick={handleDecrease}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <span className="w-12 text-center font-semibold">{quantity}</span>
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 hover:bg-secondary"
            onClick={handleIncrease}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        <Button 
          className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground"
          onClick={handleAddToCart}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};
