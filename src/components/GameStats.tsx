
import { Trophy, Heart, Zap } from "lucide-react";

const GameStats = () => {
  return (
    <div className="bg-gray-800 rounded-lg p-6 text-white max-w-4xl mx-auto">
      <div className="flex items-center gap-2 mb-4">
        <Trophy className="w-6 h-6 text-yellow-400" />
        <h2 className="text-2xl font-bold">Game Features</h2>
      </div>
      
      <div className="grid md:grid-cols-3 gap-6">
        <div className="text-center">
          <Heart className="w-12 h-12 text-red-400 mx-auto mb-2" />
          <h3 className="text-lg font-semibold mb-2">Health System</h3>
          <p className="text-gray-300 text-sm">
            Dynamic health bars with bleeding effects when health drops below 30%
          </p>
        </div>
        
        <div className="text-center">
          <Zap className="w-12 h-12 text-blue-400 mx-auto mb-2" />
          <h3 className="text-lg font-semibold mb-2">Combat Mechanics</h3>
          <p className="text-gray-300 text-sm">
            Blocking reduces damage, dodging makes you temporarily invincible
          </p>
        </div>
        
        <div className="text-center">
          <Trophy className="w-12 h-12 text-yellow-400 mx-auto mb-2" />
          <h3 className="text-lg font-semibold mb-2">Special Moves</h3>
          <p className="text-gray-300 text-sm">
            Combo system with uppercuts, counter hooks, and flying punches
          </p>
        </div>
      </div>
      
      <div className="mt-6 p-4 bg-gray-700 rounded-lg">
        <h4 className="font-semibold mb-2">Game Rules</h4>
        <ul className="text-sm space-y-1 text-gray-300">
          <li>• Each player starts with 100 health points</li>
          <li>• Light punches deal 10 damage, heavy punches deal 15 damage</li>
          <li>• Blocking reduces incoming damage by 70%</li>
          <li>• Special moves deal bonus damage (18-25 points)</li>
          <li>• First player to reach 0 health gets knocked out</li>
          <li>• Game resets automatically after knockout scene</li>
        </ul>
      </div>
    </div>
  );
};

export default GameStats;
