
import { Button } from "@/components/ui/button";

interface VideoCategoriesProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const categories = [
  { id: "all", name: "All" },
  { id: "action", name: "Action" },
  { id: "comedy", name: "Comedy" },
  { id: "drama", name: "Drama" },
  { id: "horror", name: "Horror" },
  { id: "sci-fi", name: "Sci-Fi" },
  { id: "documentary", name: "Documentary" },
  { id: "thriller", name: "Thriller" },
];

const VideoCategories = ({ selectedCategory, onCategoryChange }: VideoCategoriesProps) => {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">Browse by Genre</h2>
      <div className="flex gap-3 overflow-x-auto pb-2">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "outline"}
            onClick={() => onCategoryChange(category.id)}
            className={`whitespace-nowrap ${
              selectedCategory === category.id 
                ? "bg-red-600 hover:bg-red-700 text-white" 
                : "bg-gray-800 border-gray-600 text-white hover:bg-gray-700"
            }`}
          >
            {category.name}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default VideoCategories;
