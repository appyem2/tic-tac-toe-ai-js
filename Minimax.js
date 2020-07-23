// Agent Program
/* The following classes are the Agent Programs*/
/* The Minimax Algorithm */
class Minimax {
  /**
   *
   * @param {Array} board - Board array
   * @param {Number} max_depth - Maximum depth
   * @param {String} player - AI/Human
   * @param {Number} grid - Grid dimension
   */
  constructor(board, max_depth, player, grid) {
    this.player = player;
    this.max_depth = max_depth;
    this.board = board;
    this.grid = grid;
    this.opponent = this.player == "X" ? "O" : "X";
  }
  evaluate() {
    var j;
    /* Vertical Wins */
    for (var i = 0; i < this.grid; i = i + 1) {
      for (j = 1; j < this.grid; j++) {
        if (this.board[i] != this.board[i + this.grid * j]) j = 1000;
      }
      if (j < 1000 && this.board[i] != "") {
        if (this.board[i] === this.player) return 10;
        else if (this.board[i] === this.opponent) return -10;
      }
    }
    /* Horizontal Wins */
    for (var i = 0; i <= this.board.length - this.grid + 1; i = i + this.grid) {
      for (j = 1; j < this.grid; j++) {
        if (this.board[i] != this.board[i + j]) j = 1000;
      }
      if (j < 1000 && this.board[i] != "") {
        if (this.board[i] === this.player) return 10;
        else if (this.board[i] === this.opponent) return -10;
      }
    }
    /* Diagonal Wins */
    var i = 0;
    for (j = 0; j < this.board.length; j = j + (this.grid + 1)) {
      if (this.board[i] != this.board[j]) j = 1000;
    }
    if (j < 1000 && this.board[0] != "") {
      if (this.board[i] === this.player) return 10;
      else if (this.board[i] === this.opponent) return -10;
    }
    var i = this.grid - 1;
    for (j = this.grid - 1; j < this.board.length - 1; j = j + this.grid - 1) {
      if (this.board[i] != this.board[j]) {
        j = 1000;
      }
    }
    if (j < 1000 && this.board[this.grid - 1] != "") {
      if (this.board[i] === this.player) return 10;
      else if (this.board[i] === this.opponent) return -10;
    }
    return 0;
  }
  /**
   *
   * @param {Number} depth - The depth of the game.
   * @param {Boolean} isMax - Whether player is maximising or minimising.
   */
  minimax(depth, isMax) {
    var score = this.evaluate();
    if (score === 10) return score - depth;
    if (score === -10) return depth + score;
    var m = [];
    /* Available Moves */
    for (var j = 0; j < this.board.length; j++) {
      if (this.board[j] == "") {
        m.push(j);
      }
    }
    /* Checking for terminal State*/
    if (m.length === 0 || depth === this.max_depth) return 0;
    if (isMax) {
      /* Maximising Player */
      var best = -1000;
      for (var i = 0; i < this.board.length; i++) {
        if (this.board[i] == "") {
          this.board[i] = this.player;
          best = Math.max(best, this.minimax(depth + 1, !isMax));
          this.board[i] = "";
        }
      }
      return best;
    } else {
      /* Minimising Player */
      var best = 1000;
      for (var i = 0; i < this.board.length; i++) {
        if (this.board[i] == "") {
          this.board[i] = this.opponent;
          best = Math.min(best, this.minimax(depth + 1, !isMax));
          this.board[i] = "";
        }
      }
      return best;
    }
  }
  bestMove() {
    var bestVal = -1000;
    var bestM;
    var idx = -1;
    for (var i = 0; i < this.board.length; i++) {
      if (this.board[i] == "") {
        this.board[i] = this.player;
        bestM = this.minimax(0, false); /* Calling Minimax*/
        this.board[i] = "";
        if (bestM > bestVal) {
          idx = i;
          bestVal = bestM;
        }
      }
    }
    return idx;
  }
}

//Alpha Beta Pruning.
class Minimaxab {
  /**
   *
   * @param {Array} board - Board array
   * @param {Number} max_depth - Maximum depth
   * @param {String} player - AI/Human
   * @param {Number} grid - Grid dimension
   */
  constructor(board, max_depth, player, grid) {
    this.player = player;
    this.max_depth = max_depth;
    this.board = board;
    this.opponent = this.player == "X" ? "O" : "X";
    this.grid = grid;
  }
  /**
   *
   * @param {Number} depth - depth
   * @param {Boolean} isMax - Whether player is maximising or minimising.
   * @param {Number} alpha - best value of maximiser at the current level or above.
   * @param {Number} beta - best value of minimiser at the current level or above.
   */
  minimaxab(depth, isMax, alpha, beta) {
    var objmini = new Minimax(this.board, depth, this.player, this.grid);
    var score = objmini.evaluate();
    if (score == 10) return score - depth;
    if (score == -10) return depth + score;
    var m = [];
    for (var j = 0; j < this.board.length; j++) {
      if (this.board[j] == "") {
        m.push(j);
      }
    }
    if (m.length === 0 || depth == this.max_depth) return 0;
    if (isMax) {
      var best = -1000;
      for (var i = 0; i < m.length; i++) {
        if (this.board[m[i]] === "") {
          this.board[m[i]] = this.player;
          var val = Math.max(
            best,
            this.minimaxab(depth + 1, !isMax, alpha, beta)
          );
          best = Math.max(best, val);
          alpha = Math.max(alpha, best);
          this.board[m[i]] = "";
          // Alpha Beta Pruning
          if (beta <= alpha) break;
        }
      }
      return best;
    } else {
      var best = 1000;
      for (var i = 0; i < m.length; i++) {
        if (this.board[m[i]] == "") {
          this.board[m[i]] = this.opponent;
          var val = Math.min(
            best,
            this.minimaxab(depth + 1, !isMax, alpha, beta)
          );
          best = Math.min(best, val);
          beta = Math.min(beta, best);
          this.board[m[i]] = "";
          // Alpha Beta Pruning
          if (beta <= alpha) break;
        }
      }
      return best;
    }
  }
  bestMoveab() {
    var bestVal = -1000;
    var bestM;
    var idx = -1;
    for (var i = 0; i < this.board.length; i++) {
      if (this.board[i] === "") {
        this.board[i] = this.player;
        bestM = this.minimaxab(0, false, -1000, 1000);
        this.board[i] = "";
        if (bestM > bestVal) {
          idx = i;
          bestVal = bestM;
        }
      }
    }
    return idx;
  }
}

//Negamax with Alpha-Beta Pruning.
class NegaMax {
  /**
   *
   * @param {Array} board - Board array
   * @param {Number} max_depth  - Maximum depth
   * @param {String} player - AI/Human
   * @param {Number} grid - Grid dimension
   */
  constructor(board, max_depth, player, grid) {
    this.player = player;
    this.max_depth = max_depth;
    this.board = board;
    this.opponent = this.player == "X" ? "O" : "X";
    this.Move = "";
    this.grid = grid;
  }
  begin() {
    let value = this.negamax(0, "X", -1000, 1000, 1);
    return this.Move;
  }
  changeTurn(player) {
    return player === "X" ? "O" : "X";
  }
  /**
   *
   * @param {Number} depth - current depth
   * @param {String} player - AI/Human
   * @param {Number} alpha - best value of maximiser at the current level or above.
   * @param {Number} beta - best value of minimiser at the current level or above.
   * @param {Number} s - to change the sign when evaluating score.
   */
  negamax(depth, player, alpha, beta, s) {
    var objmin = new State(this.board, this.max_depth, player, "", this.grid);
    if (depth >= this.max_depth || objmin.isTerminal()) {
      var { winner } = objmin.isTerminal();
      if (winner === "X") return s * (10 - depth);
      else if (winner === "O") return s * (depth - 10);
      else return 0;
    }
    var score = -1000;
    var values = [];
    var m = [];
    var moves = [];
    for (var j = 0; j < this.board.length; j++) {
      if (this.board[j] == "") {
        moves.push(j);
      }
    }
    for (var i = 0; i < moves.length; i++) {
      this.board[moves[i]] = player;
      var val = -this.negamax(
        depth + 1,
        this.changeTurn(player),
        -beta,
        -alpha,
        -s
      );
      this.board[moves[i]] = "";
      values.push(val);
      m.push(moves[i]);
    }
    values.filter((a, i) => {
      if (a > score) {
        score = a;
        var index = i;
        this.Move = m[index];
      }
      if (a > alpha) {
        alpha = a;
      }
      if (alpha >= beta) {
        return alpha;
      }
    });
    return score;
  }
}
