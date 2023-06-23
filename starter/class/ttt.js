const Screen = require("./screen");
const Cursor = require("./cursor");

class TTT {

  constructor() {

    this.playerTurn = "O";

    this.grid = [[' ',' ',' '],
                 [' ',' ',' '],
                 [' ',' ',' ']]

    this.cursor = new Cursor(3, 3);

    // Initialize a 3x3 tic-tac-toe grid
    Screen.initialize(3, 3);
    Screen.setGridlines(true);
    this.cursor.setBackgroundColor();

    // Replace this with real commands
    Screen.addCommand('w', 'move cursor up', this.cursor.up);
    Screen.addCommand('s', 'move cursor down', this.cursor.down);
    Screen.addCommand('a', 'move cursor left', this.cursor.left);
    Screen.addCommand('d', 'move cursor right', this.cursor.right);
    Screen.addCommand('x', 'places an X', this.placeXMove);
    Screen.addCommand('o', 'places an O', this.placeOMove);

    Screen.render();
  }

  placeXMove = () => {
    if (this.playerTurn === 'X') {
      let r = this.cursor.row;
      let c = this.cursor.col;
      if (this.grid[r][c] === ' ') {
        this.grid[r][c] = 'X';
        Screen.setGrid(r, c, 'X');
        const winCheck = TTT.checkWin(this.grid);
        if (winCheck) {
          TTT.endGame(winCheck);
        } else {
          Screen.render();
          this.playerTurn = 'O'
        }
      } else {
        this.playerTurn = 'X';
        console.log("Cannot place a move here")
      }
    }
  }

  placeOMove = () => {
    if (this.playerTurn === 'O') {
      let r = this.cursor.row;
      let c = this.cursor.col;
      if (this.grid[r][c] === ' ') {
        this.grid[r][c] = 'O';
        Screen.setGrid(r, c, 'O');
        const winCheck = TTT.checkWin(this.grid);
        if (winCheck) {
          TTT.endGame(winCheck);
        } else {
          Screen.render();
          this.playerTurn = 'X';
        }
      } else {
        this.playerTurn = 'O';
        console.log("Cannot place a move here")
      }
    }
  }



  static checkWin(grid) {


    for (let i = 0; i < 3; i++) {
      if (grid[i][0] === grid[i][1] && grid[i][1] === grid[i][2])  {
        if (grid[i][0] !== ' ') {
          return grid[i][0];
        }
      }
    }

    for (let i = 0; i < 3; i++) {
      if (grid[0][i] === grid[1][i] && grid[1][i] === grid[2][i]) {
        if (grid[0][i] !== ' ') {
          return grid[0][i];
        }
      }
    }

    if (grid[0][0] === grid[1][1] && grid[1][1] === grid[2][2] ||
        grid[0][2] === grid[1][1] && grid[1][1] === grid[2][0]) {
          if (grid[1][1] !== ' ') {
            return grid[1][1]
      }
    }

    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        if (grid[row][col] === ' ') {
          return false;
        }
      }
    }

    return "T";

    // Return 'X' if player X wins
    // Return 'O' if player O wins
    // Return 'T' if the game is a tie
    // Return false if the game has not ended

  }

  static endGame(winner) {
    if (winner === 'O' || winner === 'X') {
      Screen.setMessage(`Player ${winner} wins!`);
    } else if (winner === 'T') {
      Screen.setMessage(`Tie game!`);
    } else {
      Screen.setMessage(`Game Over`);
    }
    Screen.render();
    Screen.quit();
  }

}

module.exports = TTT;
