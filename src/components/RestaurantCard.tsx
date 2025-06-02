
import { useState } from "react";
import { Star, Clock, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import RestaurantMenu from "./RestaurantMenu";

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

interface RestaurantCardProps {
  restaurant: Restaurant;
}

const RestaurantCard = ({ restaurant }: RestaurantCardProps) => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <>
      <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setShowMenu(true)}>
        <CardHeader className="p-0">
          <div className="relative">
            <img
              src={restaurant.image}
              alt={restaurant.name}
              className="w-full h-48 object-cover rounded-t-lg"
            />
            {restaurant.featured && (
              <span className="absolute top-3 left-3 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                Featured
              </span>
            )}
          </div>
        </CardHeader>
        
        <CardContent className="p-4">
          <h3 className="text-xl font-semibold mb-2">{restaurant.name}</h3>
          <p className="text-gray-600 mb-3">{restaurant.cuisine}</p>
          
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">{restaurant.rating}</span>
            </div>
            
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span>{restaurant.deliveryTime}</span>
            </div>
            
            <div className="flex items-center space-x-1">
              <Truck className="h-4 w-4" />
              <span>${restaurant.deliveryFee}</span>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="p-4 pt-0">
          <Button className="w-full" onClick={(e) => {
            e.stopPropagation();
            setShowMenu(true);
          }}>
            View Menu
          </Button>
        </CardFooter>
      </Card>

      <RestaurantMenu 
        restaurant={restaurant}
        isOpen={showMenu}
        onClose={() => setShowMenu(false)}
      />
    </>
  );
};

export default RestaurantCard;
