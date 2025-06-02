
import { useEffect, useRef } from "react";
import { GameState } from "./BoxingGame";

interface GameCanvasProps {
  gameState: GameState;
}

const GameCanvas = ({ gameState }: GameCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw boxing ring
    drawRing(ctx, canvas.width, canvas.height);

    // Draw fighters
    drawFighter(ctx, gameState.fighter1);
    drawFighter(ctx, gameState.fighter2);

    // Draw effects
    if (gameState.fighter1.isPunching) {
      drawPunchEffect(ctx, gameState.fighter1);
    }
    if (gameState.fighter2.isPunching) {
      drawPunchEffect(ctx, gameState.fighter2);
    }

    // Draw game over overlay
    if (gameState.gameStatus === "gameOver") {
      drawGameOverOverlay(ctx, canvas.width, canvas.height, gameState.winner);
    }
  }, [gameState]);

  const drawRing = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    // Ring floor
    ctx.fillStyle = "#8B4513";
    ctx.fillRect(0, height - 100, width, 100);

    // Ring canvas
    ctx.fillStyle = "#F5DEB3";
    ctx.fillRect(50, height - 150, width - 100, 50);

    // Ring ropes
    const ropeHeight = height - 200;
    for (let i = 0; i < 3; i++) {
      const y = ropeHeight - i * 40;
      ctx.strokeStyle = "#FF0000";
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(50, y);
      ctx.lineTo(width - 50, y);
      ctx.stroke();
    }

    // Corner posts
    ctx.fillStyle = "#666";
    ctx.fillRect(45, ropeHeight - 120, 10, 120);
    ctx.fillRect(width - 55, ropeHeight - 120, 10, 120);
  };

  const drawFighter = (ctx: CanvasRenderingContext2D, fighter: any) => {
    const { x, y, width, height, color, isBlocking, isPunching, direction } = fighter;

    // Fighter body
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);

    // Fighter head
    ctx.fillStyle = "#FFDBAC";
    ctx.beginPath();
    ctx.arc(x + width / 2, y - 20, 25, 0, Math.PI * 2);
    ctx.fill();

    // Boxing gloves
    const gloveSize = 15;
    const gloveOffset = isPunching ? 30 : 15;
    
    ctx.fillStyle = "#8B0000";
    
    if (direction === "right") {
      // Right glove (lead hand)
      ctx.beginPath();
      ctx.arc(x + width + gloveOffset, y + 30, gloveSize, 0, Math.PI * 2);
      ctx.fill();
      
      // Left glove
      ctx.beginPath();
      ctx.arc(x + width - 5, y + 50, gloveSize, 0, Math.PI * 2);
      ctx.fill();
    } else {
      // Left glove (lead hand)
      ctx.beginPath();
      ctx.arc(x - gloveOffset, y + 30, gloveSize, 0, Math.PI * 2);
      ctx.fill();
      
      // Right glove
      ctx.beginPath();
      ctx.arc(x + 5, y + 50, gloveSize, 0, Math.PI * 2);
      ctx.fill();
    }

    // Blocking stance
    if (isBlocking) {
      ctx.strokeStyle = "#FFD700";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(x + width / 2, y + height / 2, width / 2 + 10, 0, Math.PI * 2);
      ctx.stroke();
    }

    // Fighter shorts
    ctx.fillStyle = color === "#ef4444" ? "#8B0000" : "#000080";
    ctx.fillRect(x + 5, y + height - 40, width - 10, 35);
  };

  const drawPunchEffect = (ctx: CanvasRenderingContext2D, fighter: any) => {
    const { x, y, width, direction } = fighter;
    
    ctx.fillStyle = "#FFD700";
    ctx.font = "bold 24px Arial";
    ctx.textAlign = "center";
    
    const effectX = direction === "right" ? x + width + 50 : x - 50;
    const effectY = y + 40;
    
    ctx.fillText("POW!", effectX, effectY);
    
    // Punch impact lines
    ctx.strokeStyle = "#FFD700";
    ctx.lineWidth = 3;
    for (let i = 0; i < 5; i++) {
      const angle = (Math.PI / 4) * i - Math.PI / 2;
      const startX = effectX;
      const startY = effectY;
      const endX = startX + Math.cos(angle) * 30;
      const endY = startY + Math.sin(angle) * 30;
      
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.lineTo(endX, endY);
      ctx.stroke();
    }
  };

  const drawGameOverOverlay = (ctx: CanvasRenderingContext2D, width: number, height: number, winner: string | null) => {
    // Semi-transparent overlay
    ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
    ctx.fillRect(0, 0, width, height);

    // Winner text
    ctx.fillStyle = "#FFD700";
    ctx.font = "bold 48px Arial";
    ctx.textAlign = "center";
    
    const text = winner ? `${winner} WINS!` : "DRAW!";
    ctx.fillText(text, width / 2, height / 2);

    // Subtitle
    ctx.fillStyle = "#FFF";
    ctx.font = "24px Arial";
    ctx.fillText("Press Reset to play again", width / 2, height / 2 + 60);
  };

  return (
    <div className="bg-gradient-to-b from-blue-200 to-blue-400 p-4">
      <canvas
        ref={canvasRef}
        width={800}
        height={500}
        className="border-4 border-yellow-400 rounded-lg w-full max-w-full"
        style={{ imageRendering: "pixelated" }}
      />
    </div>
  );
};

export default GameCanvas;
