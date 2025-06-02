
import { useState } from "react";
import { Bell, User, Search, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="bg-black/90 backdrop-blur-sm border-b border-gray-800 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-8">
            <h1 className="text-2xl font-bold text-red-600">StreamFlix</h1>
            
            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              <a href="#" className="text-white hover:text-gray-300 transition-colors">Home</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Movies</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">TV Shows</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">My List</a>
            </nav>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="text-white hover:bg-gray-800">
              <Search className="h-5 w-5" />
            </Button>
            
            <Button variant="ghost" size="icon" className="text-white hover:bg-gray-800">
              <Bell className="h-5 w-5" />
            </Button>
            
            <Button variant="ghost" size="icon" className="text-white hover:bg-gray-800">
              <User className="h-5 w-5" />
            </Button>

            <Button variant="ghost" size="icon" className="md:hidden text-white hover:bg-gray-800">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
