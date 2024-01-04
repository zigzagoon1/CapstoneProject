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
    
    this.firstTurn = true;
    this.gameOver = false;


        //variables and logic for player to pick 'x' or 'o'
    this.hasPicked = false;
    this.playerPick = null;
    this.aiPick = null;
    this.pickText = this.add.text(200, 200, 'Which do you pick?', {fill: '#000000', fontSize: 26})
    this.pickX = this.add.image(320, 280, 'x')
    this.pickO = this.add.image(400, 280, 'o')
    this.pickX.scale *= 0.2
    this.pickX.setInteractive();
    this.pickO.setInteractive();
    this.turn = null;
    this.pickX.on('pointerup', () => {
      this.playerPick = 'x';
      this.aiPick = 'o';
      this.pickX.destroy();
      this.pickO.destroy();
      this.pickText.destroy();
      this.hasPicked = true;
      this.turn = 'player'
      this.grid.isLocked = false;

    })
    this.pickO.on('pointerup', () => {
      this.playerPick = 'o';
      this.aiPick = 'x';
      this.pickX.destroy()
      this.pickO.destroy();
      this.pickText.destroy();
      this.hasPicked = true;
      this.turn = 'ai'
      this.grid.aiLocked = false;
    })

    //variables and logic for creating the grid
    let cellSize = 110;
    let rows = 3;
    let cols = 3;

    this.grid = [
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ];

    this.grid.isLocked = true;
    this.grid.aiLocked = true;
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
          this.playerMove.call(this, i, j);
        })
      }
    }
    this.zones = true;
  }

  //variables and logic for placing 'x' and 'o'
    this.addX = (x, y) => {
        const image = this.add.image((cellSize + this.offsetX), (cellSize + this.offsetY), 'x')
        image.setScale(0.2)
        image.setPosition(this.offsetX + this.grid.cellSize * x + this.grid.cellSize / 2, this.offsetY + this.grid.cellSize * y + this.grid.cellSize / 2)
    }

    this.addO = (x, y) => {
      console.log('add o called')
        const image = this.add.image(100, 100, 'o');
        image.setScale(1.3);
        image.setPosition(this.offsetX + this.grid.cellSize * x + this.grid.cellSize / 2, this.offsetY + this.grid.cellSize * y + this.grid.cellSize / 2)
    }

    const changeTurn = () => {
      if (this.firstTurn) {
        this.firstTurn = false;
      }
      if (this.turn === 'ai') {
        this.turn = 'player';
        this.grid.isLocked = false;
        this.grid.aiLocked = true;
      }
      else {
        this.turn = 'ai';
        this.grid.isLocked = true;
        this.grid.aiLocked = false;
      }
    }

    //place 'x' or 'o' for player on zone click
    this.playerMove = (xIndex, yIndex) => {
      if (!this.isLocked && !this.gameOver) {
        if (!this.grid[xIndex][yIndex] && !this.grid.isLocked) {
          this.grid[xIndex][yIndex] = this.playerPick
          if (this.playerPick === 'x') {
            this.addX(xIndex, yIndex)
          }
          else {
            console.log(this.playerPick); 
            this.addO(xIndex, yIndex)
          }
        }
        else {
          console.log('zone already used')
        }
        if (this.checkWin() === this.playerPick) {
          this.endGame(false, "Player");
        }
        else if (this.checkWin() === this.aiPick) {
          this.endGame(false, "AI");
        }
        else if (this.checkTie()) {
          this.endGame(true);
        }
        else {
          changeTurn();
        }
      }
    }

    //variables and logic for ai's move
    this.AIMove = async () => {
      let win = new Promise(function(resolve) {
        resolve("Success");
      }).then(() => {
        if (this.checkWin() === this.aiPick) {
          this.endGame(false, "AI");
          return;
        }
        else if (this.checkWin() === this.playerPick) {
          this.endGame(false, "Player");
          return;
        }
        else if (this.checkTie()) {
          this.endGame(true);
          return;
        }
      })

      const [xIndex, yIndex] = GetMoveLocationAILogic.call(this);
      if (!this.grid[xIndex][yIndex] && !this.grid.aiLocked) {
        this.grid[xIndex][yIndex] = this.aiPick;
        if (this.playerPick === 'x') {
          this.addO(xIndex, yIndex);
          console.log('ai adds o')
        }
        else {
          this.addX(xIndex, yIndex);
          console.log('ai adds x')
        }
      }
      win = new Promise(function(resolve, reject) {
        resolve("Success");
      }).then(() => {
        if (this.checkWin() === this.playerPick) {
          this.endGame(false, "Player"); 
        }
        else if (this.checkWin === this.aiPick) {
          this.endGame(false, "AI");
        }
        else if (this.checkTie()) {
          this.endGame(true);
        }
        else {
          changeTurn();
        }
      })
    }

     const GetMoveLocationAILogic = () => {
      let move = this.findWinningMove(this.aiPick);
      if (move) return move;

      move = this.findWinningMove(this.playerPick);
      if (move) return move;
      
      let x = 0; 
      let y = 0;
      //take center if empty
      if (this.isCellEmpty(1, 1)) {
        const random = Math.round(Math.random());
        if (random === 0) {
          return [1, 1];
        }
      }
      x = Math.round(Math.random() * rows - 1);
      y = Math.round(Math.random() * cols - 1);
      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          if (!this.grid[i][j]) {
            return [i, j];
          }
        }
      }
      return [x, y];
    }

    this.findWinningMove = (move) => {
      for (let i = 0; i < cols; i++) {
        const row = [this.grid[i][0], this.grid[i][1], this.grid[i][2]];
        const col = [this.grid[0][i], this.grid[1][i], this.grid[2][i]];
        const diag1 = [this.grid[0][0], this.grid[1][1], this.grid[2][2]];
        const diag2 = [this.grid[0][2], this.grid[1][1], this.grid[2][0]];

        const winRow = this.checkLineForBestMove(row, move);
        if (winRow !== -1) return [i, winRow];
        
        const winCol = this.checkLineForBestMove(col, move);
        if (winCol !== -1) return [winCol, i];

        const winDiag1 = this.checkLineForBestMove(diag1, move);
        if (winDiag1 !== -1) return [winDiag1, winDiag1];

        const winDiag2 = this.checkLineForBestMove(diag2, move);
        if (winDiag2 !== -1) return [winDiag2, 2 - winDiag2];
      }
      return null;
    }

    this.isCellEmpty = (x, y) => {
      return this.grid[x][y] === null;
    }

    this.checkWin = () => {
      for (let i = 0; i < cols; i++) {
        //Check rows and columns
        if (this.areAllEqual(this.grid[i][0], this.grid[i][1], this.grid[i][2])) {
          return this.grid[i][0]
        }
        if (this.areAllEqual(this.grid[0][i], this.grid[1][i], this.grid[2][i])) {
          return this.grid[0][i];
        }
        //Check diagonals
        if (this.areAllEqual(this.grid[0][0], this.grid[1][1], this.grid[2][2])) {
          return this.grid[0][0];
        }
        if (this.areAllEqual(this.grid[0][2], this.grid[1][1], this.grid[2][0])) {
          return this.grid[0][2];
        }
      }
      return null;
    }

    this.checkTie = () => {
      let count = 0;
      for (let row of this.grid) {
        for (let cell of row) {
          if (cell === null) {
            count++
          }
        }
      }
      if (count < 2 && this.checkWin() === null) {
        return true;
      }
    }
    
    this.checkLineForBestMove = (line, move) => {
      let count = 0; 
      let emptyIndex = -1;

      for (let i = 0; i < cols; i++) {
        if (line[i] === move) {
          count++;
        }
        else if (line[i] === null) {
          emptyIndex = i;
        }
      }
      return count === 2 && emptyIndex !== -1 ? emptyIndex : -1;
    }

    this.areAllEqual = (...args) => {
      return args.every(val => val !== null && val === args[0]);
    }

    this.endGame = (tie, winner = null) => {
      this.gameOver = true;
      this.grid.aiLocked = true;
      this.grid.isLocked = true;

      if (tie) {
        console.log("Game Over! No winner!")
        this.graphics.clear();
        let allSprites = this.children.list.filter(x => x instanceof Phaser.GameObjects.Image)
        allSprites.forEach(x => x.destroy());
        this.add.text(175, 200, "Game Over: It's a tie!", {fill: "#000000", fontSize: 32})
      }
      if (winner === "player") {
        console.log("Game Over! You win!!")
      } 
      else if (winner === "AI") {
        console.log("Game Over! You lose!")
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
        this.grid.lineX2.drawing = false;
        this.gridDrawn = true;
      }

      if (!this.zones)
      this.createZones();
    }
    if (this.hasPicked && this.turn === 'ai' && this.gridDrawn && !this.grid.aiLocked && !this.gameOver) {
      this.AIMove();
    }
  }
}

export default TicTacToe;
