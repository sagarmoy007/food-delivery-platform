
import BoxingGame from './BoxingGame';
import GameControls from './GameControls';
import GameStats from './GameStats';

const GameCanvas = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Main Game */}
      <BoxingGame />
      
      {/* Game Information */}
      <div className="container mx-auto px-4 py-8 space-y-8">
        <GameControls />
        <GameStats />
      </div>
    </div>
  );
};

export default GameCanvas;
