
import { Gamepad2, Info } from "lucide-react";

const GameControls = () => {
  return (
    <div className="bg-gray-800 rounded-lg p-6 text-white max-w-4xl mx-auto">
      <div className="flex items-center gap-2 mb-4">
        <Gamepad2 className="w-6 h-6 text-blue-400" />
        <h2 className="text-2xl font-bold">Game Controls</h2>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <h3 className="text-xl font-semibold text-blue-400">Player 1 (Blue)</h3>
          <div className="space-y-2 text-sm">
            <p><kbd className="bg-gray-700 px-2 py-1 rounded">W</kbd> Jump</p>
            <p><kbd className="bg-gray-700 px-2 py-1 rounded">A</kbd> Move Left</p>
            <p><kbd className="bg-gray-700 px-2 py-1 rounded">S</kbd> Block</p>
            <p><kbd className="bg-gray-700 px-2 py-1 rounded">D</kbd> Move Right</p>
            <p><kbd className="bg-gray-700 px-2 py-1 rounded">F</kbd> Light Punch</p>
            <p><kbd className="bg-gray-700 px-2 py-1 rounded">G</kbd> Heavy Punch</p>
          </div>
        </div>
        
        <div className="space-y-3">
          <h3 className="text-xl font-semibold text-red-400">Player 2 (Red)</h3>
          <div className="space-y-2 text-sm">
            <p><kbd className="bg-gray-700 px-2 py-1 rounded">↑</kbd> Jump</p>
            <p><kbd className="bg-gray-700 px-2 py-1 rounded">←</kbd> Move Left</p>
            <p><kbd className="bg-gray-700 px-2 py-1 rounded">↓</kbd> Block</p>
            <p><kbd className="bg-gray-700 px-2 py-1 rounded">→</kbd> Move Right</p>
            <p><kbd className="bg-gray-700 px-2 py-1 rounded">K</kbd> Light Punch</p>
            <p><kbd className="bg-gray-700 px-2 py-1 rounded">L</kbd> Heavy Punch</p>
          </div>
        </div>
      </div>
      
      <div className="mt-6 p-4 bg-gray-700 rounded-lg">
        <div className="flex items-center gap-2 mb-2">
          <Info className="w-5 h-5 text-yellow-400" />
          <h4 className="font-semibold text-yellow-400">Special Moves</h4>
        </div>
        <div className="grid md:grid-cols-3 gap-4 text-sm">
          <div>
            <p className="font-medium text-yellow-300">Uppercut</p>
            <p>Down + Right + Punch</p>
          </div>
          <div>
            <p className="font-medium text-yellow-300">Counter Hook</p>
            <p>Block + Punch</p>
          </div>
          <div>
            <p className="font-medium text-yellow-300">Flying Punch</p>
            <p>Jump + Punch</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameControls;
