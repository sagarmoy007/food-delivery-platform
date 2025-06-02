
import { Button } from "@/components/ui/button";

interface FoodCategoriesProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const categories = [
  { id: "all", name: "All", emoji: "🍽️" },
  { id: "pizza", name: "Pizza", emoji: "🍕" },
  { id: "burger", name: "Burgers", emoji: "🍔" },
  { id: "sushi", name: "Sushi", emoji: "🍣" },
  { id: "chinese", name: "Chinese", emoji: "🥡" },
  { id: "indian", name: "Indian", emoji: "🍛" },
  { id: "dessert", name: "Desserts", emoji: "🍰" },
];

const FoodCategories = ({ selectedCategory, onCategoryChange }: FoodCategoriesProps) => {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">Categories</h2>
      <div className="flex gap-3 overflow-x-auto pb-2">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "outline"}
            onClick={() => onCategoryChange(category.id)}
            className="flex items-center space-x-2 whitespace-nowrap"
          >
            <span className="text-lg">{category.emoji}</span>
            <span>{category.name}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default FoodCategories;
