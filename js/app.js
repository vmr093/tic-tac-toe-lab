/*-------------------------------- Constants --------------------------------*/
const squareEls = document.querySelectorAll(".sqr")
const messageEl = document.querySelector("#message")
const resetBtnEl = document.getElementById('reset');

/*---------------------------- Variables (state) ----------------------------*/
let board 
let turn 
let winner 
let tie 

/*-------------------------------- Functions --------------------------------*/
const init = () => {
    board = ['', '', '', '', '', '', '', '', ''];
    turn = 'X'; 
    winner = false;
    tie = false;
    render();
  };
  
  const render = () => {
    updateBoard();
    updateMessage();
  };
  
  const updateBoard = () => {
    board.forEach((cell, index) => {
      squareEls[index].textContent = cell;
    });
  };
  
  const updateMessage = () => {
    if (!winner && !tie) {
      messageEl.textContent = `It's ${turn}'s turn`;
    } else if (winner) {
      messageEl.textContent = `${winner} has won!`;
    } else if (tie) {
      messageEl.textContent = "It's a tie!";
    }
  };
  
  function handleClick(event) {
    const clickedSquare = event.target;
    const squareIndex = parseInt(clickedSquare.id);
  
    if (board[squareIndex] !== '') return;
  
    placePiece(squareIndex);
    checkForWinner();
    checkForTie();
    switchPlayerTurn();
    render();
  }
  
  function placePiece(index) {
    board[index] = turn;
  }
  
  function checkForWinner() {
    const winningCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
  
   for (let i = 0; i < winningCombos.length; i++)
    {
      const [a, b, c] = winningCombos[i];
      if (board[a] === board[b] && board[b] === board[c] && board[a]
        !== '') {
             winner = board[a]; 
             return;
      } 
    }
  }
  
  function checkForTie() {
    if (!winner && board.every(cell => cell !== '')) {
      tie = true;
    }
  }
  
  function switchPlayerTurn() {
    if (!winner) {
      turn = turn === 'X' ? 'O' : 'X';
    }
  }
  
  squareEls.forEach(square => {
    square.addEventListener('click', handleClick);
  });
  
  resetBtnEl.addEventListener('click', init);
  
  init();


