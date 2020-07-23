class Minimax {
  constructor(board, max_depth, player, grid) {
    this.player = player;
    this.max_depth = max_depth;
    this.board = board;
    this.grid = grid;
    this.opponent = this.player == "X" ? "O" : "X";
  }
  evaluate() {
    var j;
    for (var i = 0; i < this.grid; i = i + 1) {
      for (j = 1; j < this.grid; j++) {
        if (this.board[i] != this.board[i + this.grid * j]) j = 1000;
      }
      if (j < 1000 && this.board[i] != "") {
        if (this.board[i] === this.player) return 10;
        else if (this.board[i] === this.opponent) return -10;
      }
    }
    for (var i = 0; i <= this.board.length - this.grid + 1; i = i + this.grid) {
      for (j = 1; j < this.grid; j++) {
        if (this.board[i] != this.board[i + j]) j = 1000;
      }
      if (j < 1000 && this.board[i] != "") {
        if (this.board[i] === this.player) return 10;
        else if (this.board[i] === this.opponent) return -10;
      }
    }
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
  minimax(depth, isMax) {
    var score = this.evaluate();
    if (score === 10) return score - depth;
    if (score === -10) return depth + score;
    var m = [];
    for (var j = 0; j < this.board.length; j++) {
      if (this.board[j] == "") {
        m.push(j);
      }
    }
    if (m.length === 0 || depth === this.max_depth) return 0;
    if (isMax) {
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
        bestM = this.minimax(0, false);
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
  constructor(board, max_depth, player, grid) {
    this.player = player;
    this.max_depth = max_depth;
    this.board = board;
    this.opponent = this.player == "X" ? "O" : "X";
    this.grid = grid;
  }
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
  constructor(board, max_depth, player, grid) {
    this.player = player;
    this.max_depth = max_depth;
    this.board = board;
    this.opponent = this.player == "X" ? "O" : "X";
    this.Move = "";
    this.grid = grid;
  }
  begin() {
    let ind = this.negamax(0, "X", -1000, 1000, 1);
    return this.Move;
  }
  changeTurn(player) {
    return player === "X" ? "O" : "X";
  }
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
