import Phaser, { Geom } from "phaser";
class TicTacToe extends Phaser.Scene {
  constructor() {
    super("TicTacToe");
  }

  preload() {
    // Load any assets here
    this.load.image('x', '/Images/Black_x.png')
    this.load.image('o', '/Images/Black_o.png')
    //this.load.image('o', '')
  }

  create() {
    // Basic scene setup, like creating sprites
    // this.add.text(100, 100, 'Hello Phaser!', { fill: '#0f0' });
    this.graphics = this.add.graphics({lineStyle : {width: 4, color: 0x000000}})

    this.hasPicked = false;
    this.playerPick = null;
    this.pickText = this.add.text(280, 200, 'Which do you pick?', {fill: '#000000', fontSize: 26})
    this.pickX = this.add.image(320, 280, 'x')
    this.pickO = this.add.image(400, 280, 'o')
    this.pickX.scale *= 0.2
    this.pickX.setInteractive();
    this.pickO.setInteractive();
    this.pickX.on('pointerup', () => {
      this.playerPick = 'x'
      this.pickX.destroy();
      this.pickO.destroy();
      this.pickText.destroy();
      this.hasPicked = true;

    })
    this.pickO.on('pointerup', () => {
      this.playerPick = 'o';
      this.pickX.destroy()
      this.pickO.destroy();
      this.pickText.destroy();
      this.hasPicked = true;
    })
    this.player = null;

    let cellSize = 110;
    let rows = 3;
    let cols = 3;

    this.grid = [
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ];
    this.offsetY = (this.game.config.height - cellSize * rows) / 2;
    this.offsetX = (this.game.config.width - cellSize * cols) / 2;

    this.grid.height = cellSize * 3;
    this.grid.width = cellSize * 3;

    this.grid.cellSize = cellSize;
    this.grid.rows = rows;
    this.grid.cols = cols;
    

    this.grid.lineY1 = {
      startX: cellSize + this.offsetX,
      startY: this.offsetY,
      endX: cellSize + this.offsetX,
      endY: cellSize * 3 + this.offsetY,
      currentY: this.offsetY,
      drawing: true,
      drawOrder: 1,
    };
    this.grid.lineY2 = {
      startX: cellSize * 2 + this.offsetX,
      startY: this.offsetY,
      endX: cellSize * 2 + this.offsetX,
      endY: cellSize * 3 + this.offsetY,
      currentY: this.offsetY,
      drawing: false,
      drawOrder: 2,
    };
    this.grid.lineX1 = {
      startX: this.offsetX,
      startY: cellSize + this.offsetY,
      endX: cellSize * 3 + this.offsetX,
      endY: cellSize + this.offsetY,
      currentX: this.offsetX,
      drawing: false,
      drawOrder: 3,
    };
    this.grid.lineX2 = {
      startX: this.offsetX,
      startY: cellSize * 2 + this.offsetY,
      endX: cellSize * 3 + this.offsetX,
      endY: cellSize * 2 + this.offsetY,
      currentX: this.offsetX,
      drawing: false,
      drawOrder: 4,
    };

    this.grid.animComplete = false;

    this.grid.drawLineDown = (line) => {
      if (line) {
        if (line.drawing) {
          line.currentY += 10;
        }
        if (line.currentY >= line.endY) {
          line.currentY = line.endY;
          line.drawing = false;
        }

        this.graphics.strokeLineShape(
          new Geom.Line(line.startX, line.startY, line.startX, line.currentY)
        );
      }
    };

    this.grid.drawLineAcross = (line) => {
      if (line) {
        if (line.drawing) {
          line.currentX += 10;
        }
        if (line.currentX >= line.endX) {
          line.currentX = line.endX;
          line.drawing = false;
          if (line.drawOrder === 4) {
            this.grid.animComplete = true;
          }
        }

        this.graphics.strokeLineShape(
          new Geom.Line(line.startX, line.startY, line.currentX, line.endY)
        );
      }
    };

    this.grid.topLeft = new Geom.Rectangle(this.offsetX, this.offsetY, cellSize, cellSize)
    this.grid.topLeft.on('pointerup', () => {
      console.log('top left')
    })
    // this.grid.topLeft.setInteractive();
    // this.grid.topLeft.on('pointerup', () => {
    //   console.log('top left')
    // })

    // this.playerMove(location) {
      
    // }
  
    // this.x = this.add.image(200, 200, 'x')
    // this.x.scale *= 0.2;
    // this.halfX = this.grid.cellSize / 2;
    // this.halfY = this.grid.cellSize / 2;
    // console.log(this.grid.cellSize + this.offsetX -this.halfX);
    // this.x.setPosition((this.grid.cellSize * 2) - this.halfX + this.offsetX, this.grid.cellSize + this.halfY + this.offsetY)


    // this.o = this.add.image(200, 200, 'o');
    // this.o.scale *= 1.3;
    // this.o.setPosition(this.grid.cellSize - this.halfX + this.offsetX, this.grid.cellSize + this.halfY + this.offsetY)
    // this.grid.leftX = this.grid.cellSize + this.grid.halfX;
    // this.grid.topX = this.grid.cellSize + this.grid.halfX;
    // this.grid.leftO = this.grid.cellSize + this.grid.radius;
    // this.grid.topO = this.grid.cellSize - this.grid.radius;
  }

  update() {
    // Game loop - logic that runs every frame
    if (!this.grid.animComplete && this.hasPicked) {
      if (this.grid.lineY1.drawing) {
        this.grid.drawLineDown(this.grid.lineY1);

        if (this.grid.lineY1.currentY >= this.grid.height / 2) {
          this.grid.lineY2.drawing = true;
        }
      }

      if (this.grid.lineY2.drawing) {
        this.grid.drawLineDown(this.grid.lineY2);
        if (this.grid.lineY2.currentY >= this.grid.height / 2) {
          this.grid.lineX1.drawing = true;
        }
      }

      if (this.grid.lineX1.drawing) {
        this.grid.drawLineAcross(this.grid.lineX1);
        if (this.grid.lineX1.currentX >= this.grid.width / 2) {
          this.grid.lineX2.drawing = true;
        }
      }

      if (this.grid.lineX2.drawing) {
        this.grid.drawLineAcross(this.grid.lineX2);
      }
    }
  }
}

export default TicTacToe;
