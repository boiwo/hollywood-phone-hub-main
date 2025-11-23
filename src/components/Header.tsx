import { ShoppingCart, Phone, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface HeaderProps {
  cartCount: number;
  onCartClick: () => void;
}

export const Header = ({ cartCount, onCartClick }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Phone className="h-6 w-6 text-accent" />
          <h1 className="text-xl font-bold">Hollywood Phone Spot</h1>
        </div>
        
        <nav className="hidden md:flex items-center gap-6">
          <a href="#home" className="text-sm font-medium transition-colors hover:text-accent">
            Home
          </a>
          <a href="#products" className="text-sm font-medium transition-colors hover:text-accent">
            Products
          </a>
          <a href="#contact" className="text-sm font-medium transition-colors hover:text-accent">
            Contact
          </a>
        </nav>

        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            className="relative"
            onClick={onCartClick}
          >
            <ShoppingCart className="h-5 w-5" />
            {cartCount > 0 && (
              <Badge 
                variant="destructive" 
                className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-accent hover:bg-accent"
              >
                {cartCount}
              </Badge>
            )}
          </Button>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};
