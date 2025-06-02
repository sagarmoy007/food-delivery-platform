
import { Play, Plus, Info } from "lucide-react";
import { Button } from "@/components/ui/button";

const VideoHero = () => {
  return (
    <div className="relative h-[80vh] overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.7)), url('https://images.unsplash.com/photo-1489599735188-3f8e3281958c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')"
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
        <div className="max-w-2xl">
          <h1 className="text-5xl md:text-7xl font-bold mb-4">
            Stranger Things
          </h1>
          <p className="text-xl mb-6 text-gray-200">
            When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces, and one strange little girl.
          </p>
          
          <div className="flex space-x-4">
            <Button size="lg" className="bg-white text-black hover:bg-gray-200 px-8">
              <Play className="h-5 w-5 mr-2 fill-current" />
              Play
            </Button>
            <Button size="lg" variant="secondary" className="bg-gray-600/70 text-white hover:bg-gray-600 px-8">
              <Info className="h-5 w-5 mr-2" />
              More Info
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoHero;
