const readline = require('readline');
const fs = require('fs');
const GameBoard = require('./lib/gameboard');
const TicTacToeAI = require('./lib/ai');

// Color codes for Tea Protocol theme
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[38;5;34m',
  darkGreen: '\x1b[38;5;22m',
  black: '\x1b[30m',
  bgGreen: '\x1b[48;5;22m',
  bgBlack: '\x1b[48;5;232m'
};

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function displayLogo() {
  try {
    const logo = fs.readFileSync('./assets/logo.txt', 'utf8');
    console.log(`${colors.green}${logo}${colors.reset}`);
  } catch (err) {
    console.log(`${colors.green}
  TIC TAC TEA
${colors.reset}`);
  }
}

function printBoard(board) {
  const cell = (val) => {
    if (val === 'X') return `${colors.black}${colors.bgGreen} ${val} ${colors.reset}`;
    if (val === 'O') return `${colors.green}${colors.bgBlack} ${val} ${colors.reset}`;
    return `${colors.darkGreen} ${' '} ${colors.reset}`;
  };

  const line = `${colors.darkGreen}-----------${colors.reset}`;

  console.log(`
 ${cell(board[0])}${colors.darkGreen}|${colors.reset}${cell(board[1])}${colors.darkGreen}|${colors.reset}${cell(board[2])}
${line}
 ${cell(board[3])}${colors.darkGreen}|${colors.reset}${cell(board[4])}${colors.darkGreen}|${colors.reset}${cell(board[5])}
${line}
 ${cell(board[6])}${colors.darkGreen}|${colors.reset}${cell(board[7])}${colors.darkGreen}|${colors.reset}${cell(board[8])}
`);
}

function startGame() {
  console.clear();
  displayLogo();
  console.log(`${colors.green}Welcome to Tic Tac Tea - The decentralized game!${colors.reset}`);
  console.log(`${colors.darkGreen}Choose difficulty: easy, medium, hard${colors.reset}`);
  
  rl.question(`${colors.green}Difficulty: ${colors.reset}`, (difficulty) => {
    if (!['easy', 'medium', 'hard'].includes(difficulty.toLowerCase())) {
      console.log(`${colors.darkGreen}Invalid difficulty. Defaulting to medium.${colors.reset}`);
      difficulty = 'medium';
    }

    const game = new GameBoard();
    playTurn(game, difficulty);
  });
}

function playTurn(game, difficulty) {
  console.clear();
  displayLogo();
  printBoard(game.getBoard());
  
  if (game.currentPlayer === 'O') {
    console.log(`${colors.darkGreen}AI is thinking...${colors.reset}`);
    setTimeout(() => {
      const aiMove = TicTacToeAI.getMove(game.getBoard(), difficulty);
      game.makeMove(aiMove);
      checkGameEnd(game, difficulty);
    }, 1000);
  } else {
    rl.question(`${colors.green}Enter your move (1-9): ${colors.reset}`, (input) => {
      const position = parseInt(input) - 1;
      if (isNaN(position) || position < 0 || position > 8 || game.getBoard()[position]) {
        console.log(`${colors.darkGreen}Invalid move. Try again.${colors.reset}`);
        setTimeout(() => playTurn(game, difficulty), 1000);
      } else {
        game.makeMove(position);
        checkGameEnd(game, difficulty);
      }
    });
  }
}

function checkGameEnd(game, difficulty) {
  if (game.winner) {
    console.clear();
    displayLogo();
    printBoard(game.getBoard());
    if (game.winner === 'draw') {
      console.log(`${colors.darkGreen}Game ended in a draw!${colors.reset}`);
    } else {
      console.log(`${colors.green}${game.winner === 'X' ? 'You' : 'AI'} won!${colors.reset}`);
    }
    
    rl.question(`${colors.darkGreen}Play again? (y/n): ${colors.reset}`, (answer) => {
      if (answer.toLowerCase() === 'y') {
        startGame();
      } else {
        console.log(`${colors.green}Thanks for playing Tic Tac Tea!${colors.reset}`);
        rl.close();
      }
    });
  } else {
    playTurn(game, difficulty);
  }
}

startGame();
