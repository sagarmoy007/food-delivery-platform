
import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import GameCanvas from "./GameCanvas";
import GameControls from "./GameControls";
import GameStats from "./GameStats";

export interface Fighter {
  id: string;
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
  health: number;
  maxHealth: number;
  energy: number;
  maxEnergy: number;
  isBlocking: boolean;
  isPunching: boolean;
  punchCooldown: number;
  direction: "left" | "right";
  color: string;
  score: number;
}

export interface GameState {
  fighter1: Fighter;
  fighter2: Fighter;
  gameStatus: "menu" | "playing" | "paused" | "gameOver";
  round: number;
  timer: number;
  winner: string | null;
}

const BoxingGame = () => {
  const [gameState, setGameState] = useState<GameState>({
    fighter1: {
      id: "player1",
      name: "Red Fighter",
      x: 150,
      y: 300,
      width: 60,
      height: 120,
      health: 100,
      maxHealth: 100,
      energy: 100,
      maxEnergy: 100,
      isBlocking: false,
      isPunching: false,
      punchCooldown: 0,
      direction: "right",
      color: "#ef4444",
      score: 0,
    },
    fighter2: {
      id: "player2",
      name: "Blue Fighter",
      x: 590,
      y: 300,
      width: 60,
      height: 120,
      health: 100,
      maxHealth: 100,
      energy: 100,
      maxEnergy: 100,
      isBlocking: false,
      isPunching: false,
      punchCooldown: 0,
      direction: "left",
      color: "#3b82f6",
      score: 0,
    },
    gameStatus: "menu",
    round: 1,
    timer: 180, // 3 minutes per round
    winner: null,
  });

  const [pressedKeys, setPressedKeys] = useState<Set<string>>(new Set());

  const checkCollision = useCallback((fighter1: Fighter, fighter2: Fighter): boolean => {
    const punchRange = 80;
    const distance = Math.abs(fighter1.x - fighter2.x);
    return distance < punchRange;
  }, []);

  const handlePunch = useCallback((attackerId: string) => {
    setGameState(prev => {
      const attacker = attackerId === "player1" ? prev.fighter1 : prev.fighter2;
      const defender = attackerId === "player1" ? prev.fighter2 : prev.fighter1;

      if (attacker.punchCooldown > 0 || attacker.energy < 20 || attacker.isPunching) {
        return prev;
      }

      const newAttacker = {
        ...attacker,
        isPunching: true,
        punchCooldown: 30,
        energy: Math.max(0, attacker.energy - 20),
      };

      let newDefender = { ...defender };

      if (checkCollision(attacker, defender)) {
        const damage = defender.isBlocking ? 5 : 15;
        newDefender.health = Math.max(0, defender.health - damage);
        
        if (attackerId === "player1") {
          newAttacker.score += damage;
        } else {
          newAttacker.score += damage;
        }

        // Knockback effect
        const knockbackDistance = defender.isBlocking ? 5 : 15;
        const knockbackDirection = attacker.direction === "right" ? 1 : -1;
        newDefender.x = Math.max(50, Math.min(750, defender.x + knockbackDistance * knockbackDirection));

        toast(`${attacker.name} lands a ${defender.isBlocking ? 'blocked' : 'solid'} hit!`);
      }

      const newState = {
        ...prev,
        fighter1: attackerId === "player1" ? newAttacker : newDefender,
        fighter2: attackerId === "player2" ? newAttacker : newDefender,
      };

      // Check for knockout
      if (newDefender.health <= 0) {
        newState.gameStatus = "gameOver";
        newState.winner = attacker.name;
        toast(`🥊 ${attacker.name} wins by knockout!`);
      }

      return newState;
    });
  }, [checkCollision]);

  const handleMovement = useCallback(() => {
    if (gameState.gameStatus !== "playing") return;

    setGameState(prev => {
      let newFighter1 = { ...prev.fighter1 };
      let newFighter2 = { ...prev.fighter2 };

      // Player 1 controls (WASD + Space)
      if (pressedKeys.has("a") || pressedKeys.has("A")) {
        newFighter1.x = Math.max(50, newFighter1.x - 3);
        newFighter1.direction = "left";
      }
      if (pressedKeys.has("d") || pressedKeys.has("D")) {
        newFighter1.x = Math.min(750, newFighter1.x + 3);
        newFighter1.direction = "right";
      }
      if (pressedKeys.has("s") || pressedKeys.has("S")) {
        newFighter1.isBlocking = true;
      } else {
        newFighter1.isBlocking = false;
      }

      // Player 2 controls (Arrow keys + Enter)
      if (pressedKeys.has("ArrowLeft")) {
        newFighter2.x = Math.max(50, newFighter2.x - 3);
        newFighter2.direction = "left";
      }
      if (pressedKeys.has("ArrowRight")) {
        newFighter2.x = Math.min(750, newFighter2.x + 3);
        newFighter2.direction = "right";
      }
      if (pressedKeys.has("ArrowDown")) {
        newFighter2.isBlocking = true;
      } else {
        newFighter2.isBlocking = false;
      }

      // Update cooldowns and energy
      if (newFighter1.punchCooldown > 0) {
        newFighter1.punchCooldown--;
        if (newFighter1.punchCooldown === 0) {
          newFighter1.isPunching = false;
        }
      }
      if (newFighter2.punchCooldown > 0) {
        newFighter2.punchCooldown--;
        if (newFighter2.punchCooldown === 0) {
          newFighter2.isPunching = false;
        }
      }

      // Regenerate energy
      newFighter1.energy = Math.min(newFighter1.maxEnergy, newFighter1.energy + 0.5);
      newFighter2.energy = Math.min(newFighter2.maxEnergy, newFighter2.energy + 0.5);

      return {
        ...prev,
        fighter1: newFighter1,
        fighter2: newFighter2,
      };
    });
  }, [gameState.gameStatus, pressedKeys]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (gameState.gameStatus !== "playing") return;

    setPressedKeys(prev => new Set(prev).add(e.key));

    // Punch controls
    if (e.key === " " || e.key === "Spacebar") {
      e.preventDefault();
      handlePunch("player1");
    }
    if (e.key === "Enter") {
      e.preventDefault();
      handlePunch("player2");
    }
  }, [gameState.gameStatus, handlePunch]);

  const handleKeyUp = useCallback((e: KeyboardEvent) => {
    setPressedKeys(prev => {
      const newSet = new Set(prev);
      newSet.delete(e.key);
      return newSet;
    });
  }, []);

  const startGame = () => {
    setGameState(prev => ({
      ...prev,
      gameStatus: "playing",
      timer: 180,
      round: 1,
      winner: null,
      fighter1: { ...prev.fighter1, health: 100, energy: 100, score: 0 },
      fighter2: { ...prev.fighter2, health: 100, energy: 100, score: 0 },
    }));
    toast("🥊 Fight! Round 1 begins!");
  };

  const resetGame = () => {
    setGameState(prev => ({
      ...prev,
      gameStatus: "menu",
      fighter1: { ...prev.fighter1, x: 150, health: 100, energy: 100, score: 0 },
      fighter2: { ...prev.fighter2, x: 590, health: 100, energy: 100, score: 0 },
    }));
  };

  // Game loop
  useEffect(() => {
    const gameLoop = setInterval(() => {
      if (gameState.gameStatus === "playing") {
        handleMovement();
        
        // Timer countdown
        setGameState(prev => {
          if (prev.timer <= 0) {
            const winner = prev.fighter1.score > prev.fighter2.score 
              ? prev.fighter1.name 
              : prev.fighter2.score > prev.fighter1.score 
                ? prev.fighter2.name 
                : "Draw";
            
            toast(`⏰ Time's up! ${winner === "Draw" ? "It's a draw!" : `${winner} wins!`}`);
            
            return {
              ...prev,
              gameStatus: "gameOver",
              winner: winner === "Draw" ? null : winner,
            };
          }
          return { ...prev, timer: prev.timer - 1 };
        });
      }
    }, 1000 / 60); // 60 FPS

    return () => clearInterval(gameLoop);
  }, [gameState.gameStatus, handleMovement]);

  // Event listeners
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp]);

  return (
    <div className="max-w-4xl mx-auto bg-gray-900 rounded-xl overflow-hidden shadow-2xl">
      <GameStats gameState={gameState} />
      <GameCanvas gameState={gameState} />
      <GameControls 
        gameState={gameState} 
        onStart={startGame} 
        onReset={resetGame} 
      />
    </div>
  );
};

export default BoxingGame;
