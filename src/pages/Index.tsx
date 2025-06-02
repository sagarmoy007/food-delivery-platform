
import { useState } from "react";
import Header from "../components/Header";
import VideoHero from "../components/VideoHero";
import VideoCategories from "../components/VideoCategories";
import VideoGrid from "../components/VideoGrid";
import SearchBar from "../components/SearchBar";
import { VideoProvider } from "../contexts/VideoContext";

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <VideoProvider>
      <div className="min-h-screen bg-black text-white">
        <Header />
        
        {/* Hero Section */}
        <VideoHero />

        <main className="container mx-auto px-4 py-6">
          {/* Search Bar */}
          <div className="mb-8">
            <SearchBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />
          </div>

          {/* Video Categories */}
          <VideoCategories 
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />

          {/* Video Grid */}
          <VideoGrid 
            selectedCategory={selectedCategory}
            searchQuery={searchQuery}
          />
        </main>
      </div>
    </VideoProvider>
  );
};

export default Index;
