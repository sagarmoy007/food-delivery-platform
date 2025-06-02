
import { useState } from "react";
import { Bell, User, MapPin, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "../contexts/CartContext";

const Header = () => {
  const { getTotalItems } = useCart();
  const totalItems = getTotalItems();

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-orange-500">FoodieExpress</h1>
          </div>

          {/* Location */}
          <div className="hidden md:flex items-center space-x-2 text-gray-600">
            <MapPin className="h-5 w-5" />
            <div>
              <p className="text-sm font-medium">Deliver to</p>
              <p className="text-sm">123 Main St, City</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
            </Button>
            
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingBag className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Button>
            
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
