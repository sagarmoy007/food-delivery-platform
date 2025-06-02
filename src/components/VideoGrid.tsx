
import VideoCard from "./VideoCard";

interface VideoGridProps {
  selectedCategory: string;
  searchQuery: string;
}

const mockVideos = [
  {
    id: "1",
    title: "The Dark Knight",
    description: "Batman begins his war on crime with his first major enemy being the clownishly homicidal Joker.",
    thumbnail: "https://images.unsplash.com/photo-1518929458119-e5bf444c30f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    duration: "2h 32m",
    category: "action",
    rating: 9.0,
    year: 2008,
    genre: ["Action", "Crime", "Drama"]
  },
  {
    id: "2",
    title: "Inception",
    description: "A thief who steals corporate secrets through dream-sharing technology is given the inverse task.",
    thumbnail: "https://images.unsplash.com/photo-1489599735188-3f8e3281958c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    duration: "2h 28m",
    category: "sci-fi",
    rating: 8.8,
    year: 2010,
    genre: ["Sci-Fi", "Thriller"]
  },
  {
    id: "3",
    title: "The Office",
    description: "A mockumentary on a group of typical office workers, where the workday consists of ego clashes.",
    thumbnail: "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    duration: "22m",
    category: "comedy",
    rating: 8.9,
    year: 2005,
    genre: ["Comedy"]
  },
  {
    id: "4",
    title: "Breaking Bad",
    description: "A high school chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing drugs.",
    thumbnail: "https://images.unsplash.com/photo-1574267432553-4b4628081c31?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    duration: "47m",
    category: "drama",
    rating: 9.5,
    year: 2008,
    genre: ["Crime", "Drama", "Thriller"]
  },
  {
    id: "5",
    title: "Planet Earth",
    description: "A documentary series on the wildlife found on Earth. Each episode covers a different habitat.",
    thumbnail: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    duration: "50m",
    category: "documentary",
    rating: 9.4,
    year: 2006,
    genre: ["Documentary", "Nature"]
  },
  {
    id: "6",
    title: "Get Out",
    description: "A young African-American visits his white girlfriend's parents for the weekend.",
    thumbnail: "https://images.unsplash.com/photo-1518930259200-78fd5efc9dbc?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    duration: "1h 44m",
    category: "horror",
    rating: 7.7,
    year: 2017,
    genre: ["Horror", "Mystery", "Thriller"]
  }
];

const VideoGrid = ({ selectedCategory, searchQuery }: VideoGridProps) => {
  const filteredVideos = mockVideos.filter(video => {
    const matchesCategory = selectedCategory === "all" || video.category === selectedCategory;
    const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         video.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">
        {selectedCategory === "all" ? "Trending Now" : `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Movies & Shows`}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {filteredVideos.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
    </div>
  );
};

export default VideoGrid;
