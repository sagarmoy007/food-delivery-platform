
import React, { createContext, useContext, useState } from "react";

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

interface VideoContextType {
  watchlist: Video[];
  addToWatchlist: (video: Video) => void;
  removeFromWatchlist: (videoId: string) => void;
  isInWatchlist: (videoId: string) => boolean;
}

const VideoContext = createContext<VideoContextType | undefined>(undefined);

export const VideoProvider = ({ children }: { children: React.ReactNode }) => {
  const [watchlist, setWatchlist] = useState<Video[]>([]);

  const addToWatchlist = (video: Video) => {
    setWatchlist(prev => [...prev, video]);
  };

  const removeFromWatchlist = (videoId: string) => {
    setWatchlist(prev => prev.filter(video => video.id !== videoId));
  };

  const isInWatchlist = (videoId: string) => {
    return watchlist.some(video => video.id === videoId);
  };

  return (
    <VideoContext.Provider value={{
      watchlist,
      addToWatchlist,
      removeFromWatchlist,
      isInWatchlist
    }}>
      {children}
    </VideoContext.Provider>
  );
};

export const useVideo = () => {
  const context = useContext(VideoContext);
  if (!context) {
    throw new Error("useVideo must be used within VideoProvider");
  }
  return context;
};
