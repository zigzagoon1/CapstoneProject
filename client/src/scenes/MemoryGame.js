import Phaser from 'phaser';

class MemoryGame extends Phaser.Scene {
  constructor() {
    super('DemoScene');
  }

  preload() {
    // Load any assets here
  }

  create() {
    // Basic scene setup, like creating sprites
    this.add.text(175, 200, 'Coming soon!', { fill: '#000000', fontSize: 48 });
  }

  update() {
    // Game loop - logic that runs every frame
  }
}

export default MemoryGame;