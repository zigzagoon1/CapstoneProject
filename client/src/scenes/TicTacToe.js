import Phaser, { Geom } from 'phaser';
import PhaserGameConfig from '../PhaserGameConfig';

class TicTacToe extends Phaser.Scene {
  constructor() {
    super('TicTacToe');
  }

  preload() {
    // Load any assets here
  }

  create() {
    // Basic scene setup, like creating sprites
    // this.add.text(100, 100, 'Hello Phaser!', { fill: '#0f0' });
    this.graphics = this.add.graphics({ lineStyle: { width: 4, color: 0x000000 } });

    this.board = [
      [null, null, null],
      [null, null, null],
      [null, null, null]
    ]

    
    

    let cellSize = 150; // Each cell is 100x100 pixels
    let offsetY = (this.game.config.height - (cellSize * 3)) / 2;
    let offsetX = (this.game.config.width - (cellSize * 3)) / 2;
    console.log(offsetX)

    this.lineY1 = { startX: cellSize + offsetX, startY: offsetY, endX: cellSize + offsetX, endY:cellSize * 3 + offsetY, currentY: offsetY, drawing: true };
    this.lineY2 = { startX: cellSize * 2 + offsetX, startY: offsetY, endX: cellSize * 2 + offsetX, endY: cellSize * 3 + offsetY, currentY: offsetY, drawing: true };

    this.lineX1 = { startX: offsetX, startY: cellSize + offsetY, endX: (cellSize * 3) + offsetX, endY: cellSize + offsetY, currentX: offsetX, drawing: true };
    this.lineX2 = { startX: offsetX, startY: cellSize * 2 + offsetY, endX: (cellSize * 3) + offsetX, endY: cellSize * 2 + offsetY, currentX: offsetX, drawing: true };


    console.log(this.lineX1)

    this.board = {
      height: cellSize * 3,
      width: cellSize * 3, 
      cells: {x: 3, y: 3}
    }


    // this.lineY1 = {startX: 250, startY: 70, endX: 250, endY: 470, currentY: 50, drawing: true};
    // this.lineY2 = {startX: 450, startY: 70, endX: 450, endY: 470, currentY: 50, drawing: false};
    // this.lineX1 = {startX: 100, startY: 175, endX: 600, endY: 175, currentX: 100, drawing: false}
    // this.lineX2 = {startX: 100, startY: 350, endX: 600, endY: 350, currentX: 100, drawing: false}

    this.drawLineDown = (line) => {

      //Draw TicTacToe Board one at a time in cascading style
      if (line.drawing) {
        line.currentY += 7;
      }
      if (line.currentY >= line.endY) {
        line.currentY = line.endY;
        line.drawing = false;
      }
      this.graphics.strokeLineShape(new Phaser.Geom.Line(line.startX, line.startY, line.startX, line.currentY))

    }

    this.drawLineAcross = (line) => {
        if (line.drawing) {
          line.currentX += 10;
        }
        if (line.currentX >= line.endX) {
          line.currentX = line.endX;
          line.drawing = false;
        }      
      this.graphics.strokeLineShape(new Phaser.Geom.Line(line.startX, line.startY, line.currentX, line.endY));
    }




 

    this.drawX = (centerLocation) => {

    }

    this.drawY = (centerLocation) => {

    }
  }

  update() {
    // Game loop - logic that runs every frame

    if (this.lineY1.drawing) {
      this.drawLineDown(this.lineY1);
      if (this.lineY1.currentY >= this.board.height / 2) {
        this.lineY2.drawing = true;
      }
    }

    if (this.lineY2.drawing) {
      this.drawLineDown(this.lineY2);
      if (this.lineY2.currentY >= this.board.height / 2) {
        this.lineX1.drawing = true;
      }
    }

    if (this.lineX1.drawing) {
      this.drawLineAcross(this.lineX1);
      if (this.lineX1.currentX >= this.board.width / 2) {
        this.lineX2.drawing = true;
      }
    }

    if (this.lineX2.drawing) {
      this.drawLineAcross(this.lineX2);
    }


  }
}

export default TicTacToe;