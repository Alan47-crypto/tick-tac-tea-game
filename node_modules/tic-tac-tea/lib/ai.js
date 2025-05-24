const GameBoard = require('./gameboard');

class TicTacToeAI {
  static getMove(board, difficulty = 'medium') {
    const emptyIndices = board.reduce((acc, cell, index) => {
      if (cell === null) acc.push(index);
      return acc;
    }, []);

    if (emptyIndices.length === 0) return null;

    switch (difficulty) {
      case 'easy':
        return this.easyMove(emptyIndices);
      case 'medium':
        return this.mediumMove(board, emptyIndices);
      case 'hard':
        return this.hardMove(board, emptyIndices);
      default:
        return this.mediumMove(board, emptyIndices);
    }
  }

  static easyMove(emptyIndices) {
    return emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
  }

  static mediumMove(board, emptyIndices) {
    const winningMove = this.findWinningMove(board, 'O');
    if (winningMove !== null) return winningMove;

    const blockingMove = this.findWinningMove(board, 'X');
    if (blockingMove !== null) return blockingMove;

    return this.easyMove(emptyIndices);
  }

  static hardMove(board, emptyIndices) {
    const winningMove = this.findWinningMove(board, 'O');
    if (winningMove !== null) return winningMove;

    const blockingMove = this.findWinningMove(board, 'X');
    if (blockingMove !== null) return blockingMove;

    if (board[4] === null) return 4;
    
    const corners = [0, 2, 6, 8].filter(index => board[index] === null);
    if (corners.length > 0) {
      return corners[Math.floor(Math.random() * corners.length)];
    }
    
    return this.easyMove(emptyIndices);
  }

  static findWinningMove(board, player) {
    const tempBoard = [...board];
    for (let i = 0; i < 9; i++) {
      if (tempBoard[i] === null) {
        tempBoard[i] = player;
        const game = new GameBoard();
        game.board = tempBoard;
        game.checkWinner();
        if (game.winner === player) {
          return i;
        }
        tempBoard[i] = null;
      }
    }
    return null;
  }
}

module.exports = TicTacToeAI;
