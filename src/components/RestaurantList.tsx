
import RestaurantCard from "./RestaurantCard";

interface RestaurantListProps {
  selectedCategory: string;
  searchQuery: string;
}

const restaurants = [
  {
    id: "1",
    name: "Mario's Pizza Palace",
    category: "pizza",
    rating: 4.8,
    deliveryTime: "25-35 min",
    deliveryFee: 2.99,
    image: "/placeholder.svg",
    cuisine: "Italian",
    featured: true,
  },
  {
    id: "2",
    name: "Burger Bros",
    category: "burger",
    rating: 4.6,
    deliveryTime: "20-30 min",
    deliveryFee: 1.99,
    image: "/placeholder.svg",
    cuisine: "American",
    featured: false,
  },
  {
    id: "3",
    name: "Sakura Sushi",
    category: "sushi",
    rating: 4.9,
    deliveryTime: "30-40 min",
    deliveryFee: 3.99,
    image: "/placeholder.svg",
    cuisine: "Japanese",
    featured: true,
  },
  {
    id: "4",
    name: "Dragon Palace",
    category: "chinese",
    rating: 4.7,
    deliveryTime: "25-35 min",
    deliveryFee: 2.49,
    image: "/placeholder.svg",
    cuisine: "Chinese",
    featured: false,
  },
  {
    id: "5",
    name: "Spice Garden",
    category: "indian",
    rating: 4.5,
    deliveryTime: "35-45 min",
    deliveryFee: 2.99,
    image: "/placeholder.svg",
    cuisine: "Indian",
    featured: false,
  },
  {
    id: "6",
    name: "Sweet Dreams Bakery",
    category: "dessert",
    rating: 4.8,
    deliveryTime: "15-25 min",
    deliveryFee: 1.49,
    image: "/placeholder.svg",
    cuisine: "Bakery",
    featured: true,
  },
];

const RestaurantList = ({ selectedCategory, searchQuery }: RestaurantListProps) => {
  const filteredRestaurants = restaurants.filter(restaurant => {
    const matchesCategory = selectedCategory === "all" || restaurant.category === selectedCategory;
    const matchesSearch = restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         restaurant.cuisine.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">
          {selectedCategory === "all" ? "All Restaurants" : `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Restaurants`}
        </h2>
        <p className="text-gray-600">{filteredRestaurants.length} restaurants found</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRestaurants.map(restaurant => (
          <RestaurantCard key={restaurant.id} restaurant={restaurant} />
        ))}
      </div>
    </div>
  );
};

export default RestaurantList;
