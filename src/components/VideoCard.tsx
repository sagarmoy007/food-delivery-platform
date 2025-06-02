
import { useState } from "react";
import { Play, Plus, Check, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useVideo } from "../contexts/VideoContext";

interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: string;
  category: string;
  rating: number;
  year: number;
  genre: string[];
}

interface VideoCardProps {
  video: Video;
}

const VideoCard = ({ video }: VideoCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useVideo();
  const inWatchlist = isInWatchlist(video.id);

  const handleWatchlistToggle = () => {
    if (inWatchlist) {
      removeFromWatchlist(video.id);
    } else {
      addToWatchlist(video);
    }
  };

  return (
    <Card 
      className="bg-gray-800 border-gray-700 overflow-hidden transition-all duration-300 hover:scale-105 hover:z-10 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full h-48 object-cover"
        />
        
        {/* Overlay on hover */}
        {isHovered && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <Button size="icon" className="bg-white/20 hover:bg-white/30 text-white">
              <Play className="h-6 w-6" />
            </Button>
          </div>
        )}

        {/* Duration badge */}
        <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
          {video.duration}
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-white font-semibold text-sm line-clamp-1">{video.title}</h3>
          <Button
            size="icon"
            variant="ghost"
            onClick={handleWatchlistToggle}
            className="h-8 w-8 text-white hover:bg-gray-700"
          >
            {inWatchlist ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
          </Button>
        </div>

        <div className="flex items-center space-x-2 mb-2">
          <div className="flex items-center">
            <Star className="h-3 w-3 text-yellow-400 fill-current" />
            <span className="text-xs text-gray-300 ml-1">{video.rating}</span>
          </div>
          <span className="text-xs text-gray-400">{video.year}</span>
        </div>

        <div className="flex flex-wrap gap-1 mb-2">
          {video.genre.slice(0, 2).map((g) => (
            <span key={g} className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded">
              {g}
            </span>
          ))}
        </div>

        <p className="text-gray-400 text-xs line-clamp-2">{video.description}</p>
      </div>
    </Card>
  );
};

export default VideoCard;
