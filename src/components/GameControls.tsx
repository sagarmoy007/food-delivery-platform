
import { Button } from "@/components/ui/button";
import { GameState } from "./BoxingGame";

interface GameControlsProps {
  gameState: GameState;
  onStart: () => void;
  onReset: () => void;
}

const GameControls = ({ gameState, onStart, onReset }: GameControlsProps) => {
  return (
    <div className="bg-gray-800 p-6 text-white">
      <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
        {/* Game Controls */}
        <div className="flex space-x-4">
          {gameState.gameStatus === "menu" && (
            <Button 
              onClick={onStart}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg font-bold"
            >
              🥊 START FIGHT
            </Button>
          )}
          
          {(gameState.gameStatus === "gameOver" || gameState.gameStatus === "playing") && (
            <Button 
              onClick={onReset}
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 text-lg font-bold"
            >
              🔄 RESET GAME
            </Button>
          )}
        </div>

        {/* Controls Instructions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-sm">
          <div className="text-center lg:text-left">
            <h4 className="font-bold text-red-400 mb-2">Player 1 (Red Fighter)</h4>
            <div className="space-y-1">
              <div><kbd className="bg-gray-700 px-2 py-1 rounded">A</kbd> / <kbd className="bg-gray-700 px-2 py-1 rounded">D</kbd> - Move Left/Right</div>
              <div><kbd className="bg-gray-700 px-2 py-1 rounded">S</kbd> - Block</div>
              <div><kbd className="bg-gray-700 px-2 py-1 rounded">Space</kbd> - Punch</div>
            </div>
          </div>
          
          <div className="text-center lg:text-right">
            <h4 className="font-bold text-blue-400 mb-2">Player 2 (Blue Fighter)</h4>
            <div className="space-y-1">
              <div><kbd className="bg-gray-700 px-2 py-1 rounded">←</kbd> / <kbd className="bg-gray-700 px-2 py-1 rounded">→</kbd> - Move Left/Right</div>
              <div><kbd className="bg-gray-700 px-2 py-1 rounded">↓</kbd> - Block</div>
              <div><kbd className="bg-gray-700 px-2 py-1 rounded">Enter</kbd> - Punch</div>
            </div>
          </div>
        </div>
      </div>

      {/* Game Tips */}
      <div className="mt-6 p-4 bg-gray-900 rounded-lg">
        <h4 className="font-bold text-yellow-400 mb-2">🥊 Fighting Tips:</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>• Punching costs energy - manage it wisely!</div>
          <div>• Blocking reduces damage but doesn't stop it completely</div>
          <div>• Score points by landing hits on your opponent</div>
        </div>
      </div>
    </div>
  );
};

export default GameControls;
