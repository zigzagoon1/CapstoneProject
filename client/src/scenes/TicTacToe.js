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
    this.pickText = this.add.text(200, 200, 'Which do you pick?', {fill: '#000000', fontSize: 26})
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

    let cellSize = 110;
    let rows = 3;
    let cols = 3;

    this.grid = [
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ];
    this.gridDrawn = false;
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

    this.grid.drawLineDown = (line) => {
      if (line) {
          this.graphics.strokeLineShape(
            new Geom.Line(line.startX, line.startY, line.startX, line.endY)
          );

      }
    };

    this.grid.drawLineAcross = (line) => {
        if (line) 
        this.graphics.strokeLineShape(
          new Geom.Line(line.startX, line.startY, line.endX, line.endY)
        );
    };
    
    this.createZones = () => {
     for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        const zoneX = this.offsetX + cellSize * i + cellSize / 2;
        const zoneY = this.offsetY + cellSize * j + cellSize / 2;
        let zone = this.add.zone(zoneX, zoneY, cellSize, cellSize);
        this.physics.add.collider(zone, () => {console.log('zone collider')})
        zone.setInteractive();
        zone.on('pointerup', () => {
          playerMove.call(this, i, j);
        })
      }
    }
    this.zones = true;
  }
     this.addX = (x, y) => {
      const image = this.add.image((cellSize + this.offsetX), (cellSize + this.offsetY), this.playerPick)
      image.scale *= 0.2;
      image.setPosition(this.offsetX + this.grid.cellSize * x + this.grid.cellSize / 2, this.offsetY + this.grid.cellSize * y + this.grid.cellSize / 2)
    }

    this.addO = (x, y) => {
      const image = this.add.image(100, 100, 'o');
      image.scale *= 1.3
      image.setPosition(this.offsetX + this.grid.cellSize * x + this.grid.cellSize / 2, this.offsetY + this.grid.cellSize * y + this.grid.cellSize / 2)
      console.log("x " + image.x + " y " + image.y)
    }

    function playerMove(xIndex, yIndex) {
      if (!this.grid[xIndex][yIndex]) {
        this.grid[xIndex][yIndex] = this.playerPick
        if (this.playerPick === 'x') {
          this.addX(xIndex, yIndex)
        }
        else {
          console.log(this.playerPick); 
          this.addO(xIndex, yIndex)
        }
      }
    }
  }

  update() {
    // Game loop - logic that runs every frame
    if (this.hasPicked && !this.gridDrawn) {
      this.grid.drawLineDown(this.grid.lineY1);
      this.grid.drawLineDown(this.grid.lineY2);
      this.grid.drawLineAcross(this.grid.lineX1);
      this.grid.drawLineAcross(this.grid.lineX2);
      this.gridDrawn = true;
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
      if (!this.zones)
      this.createZones();
    }
  }
}

export default TicTacToe;
