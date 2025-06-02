
import { useState } from "react";
import Header from "../components/Header";
import RestaurantList from "../components/RestaurantList";
import FoodCategories from "../components/FoodCategories";
import SearchBar from "../components/SearchBar";
import Cart from "../components/Cart";
import { CartProvider } from "../contexts/CartContext";

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <CartProvider>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 py-6">
          {/* Hero Section */}
          <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-8 mb-8 text-white">
            <h1 className="text-4xl font-bold mb-4">
              Delicious food, delivered fast
            </h1>
            <p className="text-xl mb-6 opacity-90">
              Order from your favorite restaurants and get it delivered in minutes
            </p>
            <SearchBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />
          </div>

          {/* Food Categories */}
          <FoodCategories 
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />

          {/* Restaurant List */}
          <RestaurantList 
            selectedCategory={selectedCategory}
            searchQuery={searchQuery}
          />
        </main>

        {/* Cart */}
        <Cart />
      </div>
    </CartProvider>
  );
};

export default Index;
