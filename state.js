/* This class represents the board and contains related functions */
/**
 * @param {Array} state - Current state of board.
 * @param {Number} depth - Maximum depth.
 * @param {String} starting - Starting player.
 * @param {String} algo - Algorithm to be used.
 * @param {Number} grid - Grid size
 */
class State {
  constructor(state, depth, starting, algo, grid) {
    this.state = state; //
    this.max_depth = parseInt(depth);
    this.player_turn = starting;
    this.algo = algo;
    this.grid = grid;
  }
  start() {
    if (this.player_turn === "X") {
      /* If the first player is AI,use the corners of board */
      var psbl = [];
      psbl.push(0);
      psbl.push(this.grid - 1);
      psbl.push(this.state.length - 1);
      psbl.push(this.state.length - this.grid);
      var idx = Math.floor(Math.random() * psbl.length);
      this.state[psbl[idx]] = "X";
      document.getElementById(psbl[idx]).innerText = "X";
      document.getElementById(psbl[idx]).style.color = "rgb(224, 82, 82)";
      this.player_turn = "O";
    }
    var _self = this;
    var k = 1;
    var x = document.querySelectorAll(".cell");

    // Sensor
    x.forEach((cell, index) => {
      x[index].addEventListener(
        "click",
        function play() {
          if (_self.state[index] != "" || _self.isTerminal()) return false;
          if (_self.player_turn === "O") {
            /* Human's Turn */ _self.player_turn = "X";
            if (index < _self.state.length && _self.state[index] === "") {
              _self.state[index] = "O";

              document.getElementById(index).innerText = "O";
              document.getElementById(index).style.color = "#1f74ad";
              document.querySelector(".endgame .text1").style.display = "none";
            }
            if (_self.isTerminal()) {
              /* Checking if terminal*/
              let { winner, direction, row } = _self.isTerminal();
              _self.declareWinner(winner, direction, row);
              for (var i = 0; i < x.length; i++) {
                x[i].removeEventListener("click", _self.play, false);
              }
              _self.player_turn = 2;
            }
          }
          if (_self.player_turn === "X") {
            /* AI's Turn */
            var state1 = _self.state.slice();
            var best1;
            if (_self.algo === "minimax") {
              /* Minimax algorithm */
              /* Creating an object of the Minimax class.*/
              var objc = new Minimax(
                state1,
                _self.max_depth,
                _self.player_turn,
                _self.grid
              );
              best1 = objc.bestMove();
            } else if (_self.algo === "negamax") {
              /* NegaMax algorithm */
              if (
                _self.grid == 3 ||
                _self.max_depth == 1 ||
                _self.max_depth == 2
              )
                k = _self.max_depth;
              /* Creating an object of the NegaMax class.*/
              var objc = new NegaMax(state1, k, _self.player_turn, _self.grid);
              best1 = objc.begin();
              /*Iterative Deepening */
              if (_self.grid !== 3) k++;
            } else if (_self.algo === "alphabeta") {
              /* Minimax with Alpha Beta Pruning */
              /* Creating an object of the Minimaxab class.*/
              var objc = new Minimaxab(
                state1,
                _self.max_depth,
                _self.player_turn,
                _self.grid
              );
              best1 = objc.bestMoveab();
            }
            if (best1 < _self.state.length && _self.state[best1] === "") {
              _self.state[best1] = "X";
              document.getElementById(best1).innerText = "X";
              document.getElementById(best1).style.color = "rgb(224, 82, 82)";
            }
            _self.player_turn = "O";
            if (_self.isTerminal()) {
              /* Checking if terminal*/
              let { winner, direction, row } = _self.isTerminal();
              _self.declareWinner(winner, direction, row);
              for (var i = 0; i < x.length; i++) {
                x[i].removeEventListener("click", this.play, false);
              }
              _self.player_turn = 2;
            }
          }
        },
        false
      );
    });
  }
  getAvailMoves() {
    /* Get empty squares */
    const moves = [];
    for (var i = 0; i < this.state.length; i++) {
      if (this.state[i] === "") moves.push(i);
    }
    return moves;
  }
  isEmpty() {
    /* Check if board is empty */
    for (var i = 0; i < this.state.length; i++) {
      if (this.state[i] != "") return false;
    }
    return true;
  }

  isFull() {
    /* Check if board is full */
    for (var i = 0; i < this.state.length; i++) {
      if (this.state[i] == "") return false;
    }
    return true;
  }
  // Actuator
  /**
   *
   * @param {String} winner - The winner.
   * @param {String} direction - horizontal/vertical/diagonal.
   * @param {Number} row - The row/col/diagonal.
   */
  declareWinner(winner, direction, row) {
    /* To highlight winning squares */
    var x = document.querySelectorAll(".cell");
    if (winner == "draw") {
      for (var i = 0; i < x.length; i++) {
        x[i].style.backgroundColor = "white";
      }
      document.querySelector(".endgame").style.display = "block";
      document.querySelector(".endgame .text").style.display = "block";
      document.querySelector(".endgame .text").innerText = "Draw!";
    } else {
      var j, i;
      /* Horizontal wins*/
      if (direction == "H") {
        j = row - 1;
        j = j * this.grid;
        i = 1;
        if (row == 1) j = 0;
      }
      /* Vertical Wins*/
      if (direction == "V") {
        j = row - 1;
        i = this.grid;
      }
      /* Diagonal Wins*/
      if (direction == "D") {
        if (row == 1) {
          j = 0;
          i = this.grid + 1;
        } else {
          j = this.grid - 1;
          i = this.grid - 1;
        }
      }
      for (var k = 1; k <= this.grid; k++) {
        document.getElementById(j).style.backgroundColor = "white";
        j += i;
      }
      var s = document.getElementById("player");
      s = s.options[s.selectedIndex].value;
      document.querySelector(".endgame").style.display = "block";
      document.querySelector(".endgame .text").style.display = "block";
      if (s == "sp")
        document.querySelector(".endgame .text").innerText =
          winner == "O" ? "You win!" : "You lost! Better luck next time!";
      else
        document.querySelector(".endgame .text").innerText =
          winner == "O" ? "Player O wins!" : "Player X wins!";
    }
    // Preparing for next game
    for (var i = 0; i < this.grid * this.grid; i++) this.state = "";
    document.querySelector(".player").style.display = "block";
    var s = document.getElementById("player");
    s.selectedIndex = 0;
    document.querySelector(".add").style.display = "block";
    document.querySelector(".singleplayer").style.display = "none";
    document.querySelector(".reset").style.display = "block";
  }
  isTerminal() {
    /* Check if board in terminal state that is winner found,tie or full*/
    var j;
    /* Vertical Wins */
    for (var i = 0; i < this.grid; i = i + 1) {
      for (j = 1; j < this.grid; j++) {
        if (this.state[i] != this.state[i + this.grid * j]) j = 1000;
      }
      /* Randomly choosing j as 1000 to break out and check */
      if (j < 1000 && this.state[i] != "")
        return { winner: this.state[i], direction: "V", row: i + 1 };
    }
    /* Horizontal Wins */
    var k = 0;
    for (var i = 0; i <= this.state.length - this.grid + 1; i = i + this.grid) {
      k++;
      for (j = 1; j < this.grid; j++) {
        if (this.state[i] != this.state[i + j]) j = 1000;
      }
      if (j < 1000 && this.state[i] != "")
        return { winner: this.state[i], direction: "H", row: k };
    }
    /* Diagonal Wins*/
    var i = 0;
    for (j = 0; j < this.state.length; j = j + (this.grid + 1)) {
      if (this.state[i] != this.state[j]) j = 1000;
    }
    if (j < 1000 && this.state[0] != "")
      return { winner: this.state[i], direction: "D", row: 1 };
    var i = this.grid - 1;
    for (j = this.grid - 1; j < this.state.length - 1; j = j + this.grid - 1) {
      if (this.state[i] != this.state[j]) {
        j = 1000;
      }
    }
    if (j < 1000 && this.state[i] != "")
      return { winner: this.state[i], direction: "D", row: 2 };
    if (this.isFull()) {
      return { winner: "draw" };
    }
    return false;
  }
}
