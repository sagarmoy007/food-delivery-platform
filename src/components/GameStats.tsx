
import { GameState } from "./BoxingGame";

interface GameStatsProps {
  gameState: GameState;
}

const GameStats = ({ gameState }: GameStatsProps) => {
  const { fighter1, fighter2, round, timer } = gameState;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const getHealthPercentage = (health: number, maxHealth: number) => {
    return (health / maxHealth) * 100;
  };

  const getEnergyPercentage = (energy: number, maxEnergy: number) => {
    return (energy / maxEnergy) * 100;
  };

  return (
    <div className="bg-gray-800 p-4 text-white">
      <div className="flex justify-between items-center mb-4">
        <div className="text-center">
          <h3 className="text-xl font-bold text-red-400">{fighter1.name}</h3>
          <div className="text-2xl font-bold">Score: {fighter1.score}</div>
        </div>
        
        <div className="text-center">
          <div className="text-3xl font-bold text-yellow-400">Round {round}</div>
          <div className="text-xl">{formatTime(timer)}</div>
        </div>
        
        <div className="text-center">
          <h3 className="text-xl font-bold text-blue-400">{fighter2.name}</h3>
          <div className="text-2xl font-bold">Score: {fighter2.score}</div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8">
        {/* Fighter 1 Stats */}
        <div className="space-y-2">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Health</span>
              <span>{fighter1.health}/{fighter1.maxHealth}</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-4">
              <div
                className="bg-red-500 h-4 rounded-full transition-all duration-300"
                style={{ width: `${getHealthPercentage(fighter1.health, fighter1.maxHealth)}%` }}
              />
            </div>
          </div>
          
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Energy</span>
              <span>{Math.floor(fighter1.energy)}/{fighter1.maxEnergy}</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-3">
              <div
                className="bg-yellow-500 h-3 rounded-full transition-all duration-300"
                style={{ width: `${getEnergyPercentage(fighter1.energy, fighter1.maxEnergy)}%` }}
              />
            </div>
          </div>
        </div>

        {/* Fighter 2 Stats */}
        <div className="space-y-2">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Health</span>
              <span>{fighter2.health}/{fighter2.maxHealth}</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-4">
              <div
                className="bg-red-500 h-4 rounded-full transition-all duration-300"
                style={{ width: `${getHealthPercentage(fighter2.health, fighter2.maxHealth)}%` }}
              />
            </div>
          </div>
          
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Energy</span>
              <span>{Math.floor(fighter2.energy)}/{fighter2.maxEnergy}</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-3">
              <div
                className="bg-yellow-500 h-3 rounded-full transition-all duration-300"
                style={{ width: `${getEnergyPercentage(fighter2.energy, fighter2.maxEnergy)}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Status indicators */}
      <div className="flex justify-between mt-4 text-sm">
        <div className="flex space-x-4">
          {fighter1.isBlocking && (
            <span className="text-yellow-400 font-bold">🛡️ BLOCKING</span>
          )}
          {fighter1.isPunching && (
            <span className="text-red-400 font-bold">👊 PUNCHING</span>
          )}
        </div>
        
        <div className="flex space-x-4">
          {fighter2.isPunching && (
            <span className="text-red-400 font-bold">👊 PUNCHING</span>
          )}
          {fighter2.isBlocking && (
            <span className="text-yellow-400 font-bold">🛡️ BLOCKING</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default GameStats;
