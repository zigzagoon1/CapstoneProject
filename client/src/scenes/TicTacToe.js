import Phaser from 'phaser';

class TicTacToe extends Phaser.Scene {
  constructor() {
    super('DemoScene');
  }

  preload() {
    // Load any assets here
  }

  create() {
    // Basic scene setup, like creating sprites
    this.add.text(100, 100, 'Hello Phaser!', { fill: '#0f0' });
  }

  update() {
    // Game loop - logic that runs every frame
  }
}

export default TicTacToe;