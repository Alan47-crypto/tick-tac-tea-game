class GameBoard {
  constructor() {
    this.board = Array(9).fill(null);
    this.currentPlayer = 'X';
    this.winner = null;
  }

  makeMove(position) {
    if (this.board[position] || this.winner) return false;
    
    this.board[position] = this.currentPlayer;
    this.checkWinner();
    this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
    return true;
  }

  checkWinner() {
    const winPatterns = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6]             // diagonals
    ];

    for (const pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (this.board[a] && this.board[a] === this.board[b] && this.board[a] === this.board[c]) {
        this.winner = this.board[a];
        return;
      }
    }

    if (!this.board.includes(null)) {
      this.winner = 'draw';
    }
  }

  getBoard() {
    return [...this.board];
  }
}

module.exports = GameBoard;
