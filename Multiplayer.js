/* Multiplayer Version */
/**
 * @param {Array} board - the board of the game.
 * @param {Number} grid - the size of grid.
 */
class Multiplayer {
  constructor(board, grid) {
    this.board = board;
    this.player = "X";
    this.grid = grid;
  }

  multi() {
    cells = document.querySelectorAll(".cell");
    for (var i = 0; i < cells.length; i++) {
      cells[i].innerText = "";
      cells[i].style.removeProperty("background-color");
    }
    var _self = this;
    var p = this.player;
    cells = document.querySelectorAll(".cell");
    document.querySelector(".endgame").style.display = "block";
    document.querySelector(".endgame .text").innerText = `Player O's turn!`;
    cells.forEach((cell, index) => {
      cells[index].addEventListener(
        "click",
        function game() {
          var obj = new State(_self.board, -1, p, "", _self.grid);
          if (_self.board[index] != "" || obj.isTerminal()) {
            return false;
          } else {
            document.querySelector(
              ".endgame .text"
            ).innerText = `Player ${_self.player}'s turn!`;
            p = _self.player == "X" ? "O" : "X";
            _self.board[index] = p;
            document.getElementById(index).innerText = p;
            if (p === "X")
              document.getElementById(index).style.color = "#1f74ad";
            else
              document.getElementById(index).style.color = "rgb(224, 82, 82)";
            /* Checking if terminal state */
            if (obj.isTerminal()) {
              document
                .querySelector("#help")
                .removeEventListener("click", _self.helper, false);
              document.querySelector(".helpbtn").style.display = "none";
              let { winner, direction, row } = obj.isTerminal();
              obj.declareWinner(winner, direction, row);
              for (var i = 0; i < cells.length; i++) {
                cells[i].removeEventListener("click", _self.game, false);
              }
              return false;
            }

            _self.player = p;
          }
        },
        false
      );
    });
    /*Help function to allow using hints for next move. */
    document.querySelector("#help").addEventListener(
      "click",
      function helper() {
        var symbol = _self.player == "X" ? "O" : "X";
        /* Creating an object of the NegaMax class.*/
        var objct = new NegaMax(_self.board, 3, symbol, _self.grid);
        /* Calling the begin() function of NegaMax class */
        var b = objct.begin();
        if (b !== "" && b >= 0 && b <= _self.grid * _self.grid - 1) {
          document.getElementById(b).style.backgroundColor = "grey";
          setTimeout(() => {
            document.getElementById(b).style.removeProperty("background-color");
          }, 1000);
        }
      },
      false
    );
  }
}
