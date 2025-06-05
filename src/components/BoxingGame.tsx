import { useEffect, useRef } from 'react';
import Phaser from 'phaser';

// Game configuration
const gameConfig: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 1200,
  height: 700,
  parent: 'boxing-game',
  backgroundColor: '#1a1a2e',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { x: 0, y: 800 },
      debug: false
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

// Game state
let gameState: any = {};
let cursors: Phaser.Types.Input.Keyboard.CursorKeys;
let wasdKeys: any;

function preload(this: Phaser.Scene) {
  // Create colored rectangles as placeholder sprites
  this.add.graphics()
    .fillStyle(0x3498db)
    .fillRect(0, 0, 80, 120)
    .generateTexture('player1', 80, 120);
    
  this.add.graphics()
    .fillStyle(0xe74c3c)
    .fillRect(0, 0, 80, 120)
    .generateTexture('player2', 80, 120);

  // Create smaller rectangles for punches
  this.add.graphics()
    .fillStyle(0xf39c12)
    .fillRect(0, 0, 30, 15)
    .generateTexture('punch', 30, 15);

  // Create particle texture for blood effects
  this.add.graphics()
    .fillStyle(0x8b0000)
    .fillCircle(5, 5, 5)
    .generateTexture('blood', 10, 10);

  // Background
  this.add.graphics()
    .fillGradientStyle(0x16537e, 0x16537e, 0x2c3e50, 0x2c3e50)
    .fillRect(0, 0, 1200, 700)
    .generateTexture('background', 1200, 700);
}

function create(this: Phaser.Scene) {
  // Add background
  this.add.image(600, 350, 'background');
  
  // Create ground
  const ground = this.physics.add.staticGroup();
  const groundRect = this.add.graphics()
    .fillStyle(0x2c3e50)
    .fillRect(0, 0, 1200, 50);
  groundRect.generateTexture('ground', 1200, 50);
  ground.create(600, 675, 'ground');

  // Initialize players
  gameState.player1 = this.physics.add.sprite(300, 550, 'player1');
  gameState.player2 = this.physics.add.sprite(900, 550, 'player2');
  
  // Player physics
  [gameState.player1, gameState.player2].forEach(player => {
    player.setBounce(0.1);
    player.setCollideWorldBounds(true);
    this.physics.add.collider(player, ground);
  });

  // Player stats
  gameState.player1.health = 100;
  gameState.player1.isBlocking = false;
  gameState.player1.isDodging = false;
  gameState.player1.facingRight = true;
  gameState.player1.comboSequence = [];
  gameState.player1.lastComboTime = 0;

  gameState.player2.health = 100;
  gameState.player2.isBlocking = false;
  gameState.player2.isDodging = false;
  gameState.player2.facingRight = false;
  gameState.player2.comboSequence = [];
  gameState.player2.lastComboTime = 0;

  // Punch groups
  gameState.player1Punches = this.physics.add.group();
  gameState.player2Punches = this.physics.add.group();

  // Blood particle systems
  gameState.bloodEmitter1 = this.add.particles(0, 0, 'blood', {
    speed: { min: 50, max: 150 },
    scale: { start: 0.5, end: 0 },
    lifespan: 1000,
    emitting: false
  });

  gameState.bloodEmitter2 = this.add.particles(0, 0, 'blood', {
    speed: { min: 50, max: 150 },
    scale: { start: 0.5, end: 0 },
    lifespan: 1000,
    emitting: false
  });

  // Health bars
  createHealthBars.call(this);

  // Input setup
  cursors = this.input.keyboard!.createCursorKeys();
  wasdKeys = this.input.keyboard!.addKeys('W,S,A,D,F,G,K,L');

  // Combat collisions
  this.physics.add.overlap(gameState.player1Punches, gameState.player2, (punch: any, player: any) => {
    handlePunchHit.call(this, punch, player, gameState.player1, gameState.bloodEmitter2);
  });

  this.physics.add.overlap(gameState.player2Punches, gameState.player1, (punch: any, player: any) => {
    handlePunchHit.call(this, punch, player, gameState.player2, gameState.bloodEmitter1);
  });

  // Victory text (hidden initially)
  gameState.victoryText = this.add.text(600, 350, '', {
    fontSize: '64px',
    color: '#ffffff',
    fontStyle: 'bold'
  }).setOrigin(0.5).setAlpha(0);

  console.log('Boxing game initialized!');
}

function createHealthBars(this: Phaser.Scene) {
  // Player 1 health bar
  gameState.healthBar1 = this.add.graphics();
  gameState.healthBar1Background = this.add.graphics();
  
  // Player 2 health bar
  gameState.healthBar2 = this.add.graphics();
  gameState.healthBar2Background = this.add.graphics();

  updateHealthBars.call(this);

  // Player labels
  this.add.text(50, 30, 'Player 1', { fontSize: '24px', color: '#3498db' });
  this.add.text(950, 30, 'Player 2', { fontSize: '24px', color: '#e74c3c' });
}

function updateHealthBars(this: Phaser.Scene) {
  // Clear previous bars
  gameState.healthBar1.clear();
  gameState.healthBar1Background.clear();
  gameState.healthBar2.clear();
  gameState.healthBar2Background.clear();

  // Player 1 health bar
  gameState.healthBar1Background.fillStyle(0x666666).fillRect(50, 60, 300, 20);
  const health1Color = gameState.player1.health > 30 ? 0x2ecc71 : 0xe74c3c;
  gameState.healthBar1.fillStyle(health1Color).fillRect(50, 60, (gameState.player1.health / 100) * 300, 20);

  // Player 2 health bar
  gameState.healthBar2Background.fillStyle(0x666666).fillRect(850, 60, 300, 20);
  const health2Color = gameState.player2.health > 30 ? 0x2ecc71 : 0xe74c3c;
  gameState.healthBar2.fillStyle(health2Color).fillRect(850, 60, (gameState.player2.health / 100) * 300, 20);
}

function handlePunchHit(this: Phaser.Scene, punch: any, targetPlayer: any, attackingPlayer: any, bloodEmitter: any) {
  punch.destroy();
  
  if (targetPlayer.isDodging || targetPlayer.alpha < 1) return;
  
  let damage = punch.damage || 10;
  if (targetPlayer.isBlocking) {
    damage *= 0.3; // Reduced damage when blocking
  }
  
  targetPlayer.health -= damage;
  targetPlayer.health = Math.max(0, targetPlayer.health);
  
  // Blood effects when health is low
  if (targetPlayer.health < 30 && targetPlayer.health > 0) {
    bloodEmitter.setPosition(targetPlayer.x, targetPlayer.y - 30);
    bloodEmitter.explode(10);
  }
  
  // Knockback effect
  const knockbackForce = targetPlayer.isBlocking ? 50 : 150;
  const direction = attackingPlayer.x < targetPlayer.x ? 1 : -1;
  targetPlayer.setVelocityX(direction * knockbackForce);
  
  // Flash effect
  targetPlayer.setTint(0xff0000);
  this.time.delayedCall(100, () => {
    targetPlayer.clearTint();
  });
  
  updateHealthBars.call(this);
  
  // Check for knockout
  if (targetPlayer.health <= 0) {
    handleKnockout.call(this, targetPlayer);
  }
  
  console.log(`Player hit! Health: ${targetPlayer.health}`);
}

function handleKnockout(this: Phaser.Scene, knockedOutPlayer: any) {
  const winner = knockedOutPlayer === gameState.player1 ? 'Player 2' : 'Player 1';
  
  // Knockout animation
  knockedOutPlayer.setTint(0x666666);
  knockedOutPlayer.setVelocityX(0);
  
  // Slow motion effect
  this.physics.world.timeScale = 0.3;
  
  // Victory text with fade in
  gameState.victoryText.setText(`${winner} Wins!`);
  this.tweens.add({
    targets: gameState.victoryText,
    alpha: 1,
    duration: 2000,
    ease: 'Power2'
  });
  
  // Reset game after 3 seconds
  this.time.delayedCall(3000, () => {
    resetGame.call(this);
  });
  
  console.log(`${winner} wins by knockout!`);
}

function resetGame(this: Phaser.Scene) {
  // Reset physics
  this.physics.world.timeScale = 1;
  
  // Reset players
  gameState.player1.setPosition(300, 550);
  gameState.player2.setPosition(900, 550);
  gameState.player1.health = 100;
  gameState.player2.health = 100;
  gameState.player1.clearTint();
  gameState.player2.clearTint();
  gameState.player1.setAlpha(1);
  gameState.player2.setAlpha(1);
  
  // Clear punches
  gameState.player1Punches.clear(true, true);
  gameState.player2Punches.clear(true, true);
  
  // Hide victory text
  gameState.victoryText.setAlpha(0);
  
  updateHealthBars.call(this);
  console.log('Game reset!');
}

function checkCombo(player: any, input: string) {
  const currentTime = Date.now();
  
  // Reset combo if too much time has passed
  if (currentTime - player.lastComboTime > 1000) {
    player.comboSequence = [];
  }
  
  player.comboSequence.push(input);
  player.lastComboTime = currentTime;
  
  // Keep only last 3 inputs
  if (player.comboSequence.length > 3) {
    player.comboSequence.shift();
  }
  
  // Check for special moves
  const sequence = player.comboSequence.join('');
  
  if (sequence.includes('down,right,punch')) {
    return 'uppercut';
  } else if (sequence.includes('block,punch')) {
    return 'counter';
  } else if (sequence.includes('jump,punch')) {
    return 'flying';
  }
  
  return null;
}

function createPunch(scene: Phaser.Scene, player: any, punchGroup: any, damage: number = 10, special: string = '') {
  const direction = player.facingRight ? 1 : -1;
  const offsetX = direction * 50;
  
  const punch = punchGroup.create(player.x + offsetX, player.y - 20, 'punch');
  punch.setVelocityX(direction * 400);
  punch.damage = damage;
  punch.special = special;
  
  // Special move effects
  if (special === 'uppercut') {
    punch.setVelocityY(-300);
    punch.damage = 25;
    punch.setTint(0xffd700);
  } else if (special === 'counter') {
    punch.damage = 20;
    punch.setTint(0xff6b6b);
  } else if (special === 'flying') {
    punch.setVelocityY(-100);
    punch.damage = 18;
    punch.setTint(0x74b9ff);
  }
  
  // Remove punch after 1 second
  scene.time.delayedCall(1000, () => {
    if (punch.active) punch.destroy();
  });
}

function update(this: Phaser.Scene) {
  if (!gameState.player1 || !gameState.player2) return;
  
  // Player 1 controls (WASD + F/G)
  gameState.player1.isBlocking = false;
  gameState.player1.isDodging = false;
  
  if (wasdKeys.A.isDown) {
    gameState.player1.setVelocityX(-200);
    gameState.player1.facingRight = false;
    checkCombo(gameState.player1, 'left');
  } else if (wasdKeys.D.isDown) {
    gameState.player1.setVelocityX(200);
    gameState.player1.facingRight = true;
    checkCombo(gameState.player1, 'right');
  } else {
    gameState.player1.setVelocityX(0);
  }
  
  if (wasdKeys.W.isDown && gameState.player1.body.touching.down) {
    gameState.player1.setVelocityY(-500);
    checkCombo(gameState.player1, 'jump');
  }
  
  if (wasdKeys.S.isDown) {
    gameState.player1.isBlocking = true;
    gameState.player1.setTint(0x0066cc);
    checkCombo(gameState.player1, 'block');
  } else {
    gameState.player1.clearTint();
  }
  
  // Dodging (double tap)
  if (Phaser.Input.Keyboard.JustDown(wasdKeys.A) || Phaser.Input.Keyboard.JustDown(wasdKeys.D)) {
    gameState.player1.isDodging = true;
    gameState.player1.setAlpha(0.5);
    this.time.delayedCall(200, () => {
      gameState.player1.isDodging = false;
      gameState.player1.setAlpha(1);
    });
  }
  
  // Punching
  if (Phaser.Input.Keyboard.JustDown(wasdKeys.F)) {
    const special = checkCombo(gameState.player1, 'punch');
    createPunch(this, gameState.player1, gameState.player1Punches, 10, special || '');
  }
  
  if (Phaser.Input.Keyboard.JustDown(wasdKeys.G)) {
    const special = checkCombo(gameState.player1, 'punch');
    createPunch(this, gameState.player1, gameState.player1Punches, 15, special || '');
  }
  
  // Player 2 controls (Arrow keys + K/L)
  gameState.player2.isBlocking = false;
  gameState.player2.isDodging = false;
  
  if (cursors.left!.isDown) {
    gameState.player2.setVelocityX(-200);
    gameState.player2.facingRight = false;
    checkCombo(gameState.player2, 'left');
  } else if (cursors.right!.isDown) {
    gameState.player2.setVelocityX(200);
    gameState.player2.facingRight = true;
    checkCombo(gameState.player2, 'right');
  } else {
    gameState.player2.setVelocityX(0);
  }
  
  if (cursors.up!.isDown && gameState.player2.body.touching.down) {
    gameState.player2.setVelocityY(-500);
    checkCombo(gameState.player2, 'jump');
  }
  
  if (cursors.down!.isDown) {
    gameState.player2.isBlocking = true;
    gameState.player2.setTint(0xcc6600);
    checkCombo(gameState.player2, 'block');
  } else {
    gameState.player2.clearTint();
  }
  
  // Dodging
  if (Phaser.Input.Keyboard.JustDown(cursors.left!) || Phaser.Input.Keyboard.JustDown(cursors.right!)) {
    gameState.player2.isDodging = true;
    gameState.player2.setAlpha(0.5);
    this.time.delayedCall(200, () => {
      gameState.player2.isDodging = false;
      gameState.player2.setAlpha(1);
    });
  }
  
  // Punching
  if (Phaser.Input.Keyboard.JustDown(wasdKeys.K)) {
    const special = checkCombo(gameState.player2, 'punch');
    createPunch(this, gameState.player2, gameState.player2Punches, 10, special || '');
  }
  
  if (Phaser.Input.Keyboard.JustDown(wasdKeys.L)) {
    const special = checkCombo(gameState.player2, 'punch');
    createPunch(this, gameState.player2, gameState.player2Punches, 15, special || '');
  }
}

const BoxingGame = () => {
  const gameRef = useRef<Phaser.Game | null>(null);

  useEffect(() => {
    if (!gameRef.current) {
      gameRef.current = new Phaser.Game(gameConfig);
    }

    return () => {
      if (gameRef.current) {
        gameRef.current.destroy(true);
        gameRef.current = null;
      }
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-4">
      <div className="mb-4">
        <h1 className="text-4xl font-bold text-white mb-2">2D Boxing Championship</h1>
        <div className="text-white text-center space-y-1">
          <p><strong>Player 1:</strong> WASD to move, F (light punch), G (heavy punch)</p>
          <p><strong>Player 2:</strong> Arrow keys to move, K (light punch), L (heavy punch)</p>
          <p><strong>Special Moves:</strong> Down+Right+Punch = Uppercut | Block+Punch = Counter | Jump+Punch = Flying Punch</p>
        </div>
      </div>
      <div id="boxing-game" className="border-4 border-gray-700 rounded-lg shadow-2xl" />
    </div>
  );
};

export default BoxingGame;
