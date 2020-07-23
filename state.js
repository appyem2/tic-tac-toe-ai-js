class State {
  constructor(state, depth, starting, algo, grid) {
    this.state = state;
    this.max_depth = parseInt(depth);
    this.player_turn = starting;
    this.algo = algo;
    this.grid = grid;
  }
  start() {
    if (this.player_turn === "X") {
      this.state[0] = "X";
      document.getElementById("0").innerText = "X";
      this.player_turn = "O";
    }
    var _self = this;
    var k = 1;
    var x = document.querySelectorAll(".cell");
    x.forEach((cell, index) => {
      x[index].addEventListener(
        "click",
        function play() {
          if (_self.state[index] != "" || _self.isTerminal()) return false;
          if (_self.player_turn === "O") {
            _self.player_turn = "X";
            if (index < _self.state.length && _self.state[index] === "") {
              _self.state[index] = "O";

              document.getElementById(index).innerText = "O";
            }
            if (_self.isTerminal()) {
              let { winner, direction, row } = _self.isTerminal();
              _self.declareWinner(winner, direction, row);

              for (var i = 0; i < x.length; i++) {
                x[i].removeEventListener("click", _self.play, false);
              }
              _self.player_turn = 2;
            }
          }
          if (_self.player_turn === "X") {
            var state1 = _self.state.slice();
            var best1;
            if (_self.max_depth === 1) {
              var arr = _self.getAvailMoves();
              var r = Math.floor(Math.random() * arr.length);
              best1 = arr[r];
            } else {
              if (_self.algo === "minimax") {
                var objc = new Minimax(
                  state1,
                  _self.max_depth,
                  _self.player_turn,
                  _self.grid
                );
                best1 = objc.bestMove();
              } else if (_self.algo === "negamax") {
                if (_self.grid === 3) k = _self.max_depth;
                var objc = new NegaMax(
                  state1,
                  k,
                  _self.player_turn,
                  _self.grid
                );
                best1 = objc.begin();
                if (_self.grid !== 3) k++;
              } else if (_self.algo === "alphabeta") {
                var objc = new Minimaxab(
                  state1,
                  _self.max_depth,
                  _self.player_turn,
                  _self.grid
                );
                best1 = objc.bestMoveab();
              }
            }
            if (best1 < _self.state.length && _self.state[best1] === "") {
              _self.state[best1] = "X";
              document.getElementById(best1).innerText = "X";
            }
            _self.player_turn = "O";
            if (_self.isTerminal()) {
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
    const moves = [];
    for (var i = 0; i < this.state.length; i++) {
      if (this.state[i] === "") moves.push(i);
    }
    return moves;
  }
  isEmpty() {
    for (var i = 0; i < this.state.length; i++) {
      if (this.state[i] != "") return false;
    }
    return true;
  }

  isFull() {
    for (var i = 0; i < this.state.length; i++) {
      if (this.state[i] == "") return false;
    }
    return true;
  }
  declareWinner(winner, direction, row) {
    var x = document.querySelectorAll(".cell");
    if (winner == "draw") {
      for (var i = 0; i < x.length; i++) {
        x[i].style.backgroundColor = "grey";
      }
      document.querySelector(".endgame").style.display = "block";
      document.querySelector(".endgame .text").innerText = "Draw";
    } else {
      var j, i;
      if (direction == "H") {
        j = row - 1;
        j = j * this.grid;
        i = 1;
        if (row == 1) j = 0;
      }
      if (direction == "V") {
        j = row - 1;
        i = this.grid;
      }
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
        document.getElementById(j).style.backgroundColor = "grey";
        j += i;
      }
      var s = document.getElementById("player");
      document.querySelector(".endgame").style.display = "block";
      if (s == "sp")
        document.querySelector(".endgame .text").innerText =
          winner == "O" ? "You win!" : "You lose.";
      else
        document.querySelector(".endgame .text").innerText =
          winner == "O" ? "Player O wins!" : "Player X wins!";
    }
    for (var i = 0; i < this.grid * this.grid; i++) this.state = "";
    document.querySelector(".player").style.display = "block";
    var s = document.getElementById("player");
    s.selectedIndex = 0;
    document.querySelector(".add").style.display = "block";
    document.querySelector(".singleplayer").style.display = "none";
  }
  isTerminal() {
    var j;
    for (var i = 0; i < this.grid; i = i + 1) {
      for (j = 1; j < this.grid; j++) {
        if (this.state[i] != this.state[i + this.grid * j]) j = 1000;
      }
      if (j < 1000 && this.state[i] != "")
        return { winner: this.state[i], direction: "V", row: i + 1 };
    }

    for (var i = 0; i <= this.state.length - this.grid + 1; i = i + this.grid) {
      for (j = 1; j < this.grid; j++) {
        if (this.state[i] != this.state[i + j]) j = 1000;
      }
      if (j < 1000 && this.state[i] != "")
        return { winner: this.state[i], direction: "H", row: i + 1 };
    }
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
