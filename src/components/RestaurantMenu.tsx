
import { X, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCart } from "../contexts/CartContext";

interface Restaurant {
  id: string;
  name: string;
  category: string;
  rating: number;
  deliveryTime: string;
  deliveryFee: number;
  image: string;
  cuisine: string;
  featured: boolean;
}

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

interface RestaurantMenuProps {
  restaurant: Restaurant;
  isOpen: boolean;
  onClose: () => void;
}

const menuItems: MenuItem[] = [
  {
    id: "1",
    name: "Margherita Pizza",
    description: "Fresh tomatoes, mozzarella, basil, olive oil",
    price: 14.99,
    image: "/placeholder.svg",
    category: "Pizza",
  },
  {
    id: "2",
    name: "Pepperoni Pizza",
    description: "Pepperoni, mozzarella, tomato sauce",
    price: 16.99,
    image: "/placeholder.svg",
    category: "Pizza",
  },
  {
    id: "3",
    name: "Caesar Salad",
    description: "Romaine lettuce, croutons, parmesan, caesar dressing",
    price: 10.99,
    image: "/placeholder.svg",
    category: "Salads",
  },
  {
    id: "4",
    name: "Chicken Alfredo",
    description: "Grilled chicken, fettuccine, creamy alfredo sauce",
    price: 18.99,
    image: "/placeholder.svg",
    category: "Pasta",
  },
];

const RestaurantMenu = ({ restaurant, isOpen, onClose }: RestaurantMenuProps) => {
  const { addToCart } = useCart();

  if (!isOpen) return null;

  const handleAddToCart = (item: MenuItem) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      restaurant: restaurant.name,
      image: item.image,
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h2 className="text-2xl font-bold">{restaurant.name}</h2>
            <p className="text-gray-600">{restaurant.cuisine} • {restaurant.deliveryTime}</p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-6 w-6" />
          </Button>
        </div>

        {/* Menu Items */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          <div className="grid gap-6">
            {menuItems.map((item) => (
              <Card key={item.id} className="flex items-center p-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-lg mr-4"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p className="text-gray-600 text-sm mb-2">{item.description}</p>
                  <p className="text-lg font-bold text-orange-600">${item.price}</p>
                </div>
                <Button
                  onClick={() => handleAddToCart(item)}
                  className="ml-4"
                  size="sm"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantMenu;
