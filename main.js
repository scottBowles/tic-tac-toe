const ui = (() => {
  const gameboard = document.querySelector("#gameboard");
  const newGameButton = document.querySelector("#newGameButton");
  const playerOne = document.querySelector("#playerOne");
  const playerTwo = document.querySelector("#playerTwo");
  const message = document.querySelector("#message");
  return {};
})();

const gameboard = (() => {

  const currentState = [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined];

  function newPlay(mark, place) {
    currentState[place] = mark;
  };

  function clearBoard() {
    currentState = [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined];
  };
  
  function checkForWinner() {

  };
  
  function checkForTie() {

  };
  
  return {
    newPlay,
    clearBoard,
    checkForWinner,
    checkForTie,
  };

})();

const gameplay = (() => {

  const turn = 'x';

  function nextTurn() { turn === 'x' ? turn = 'o' : turn = 'x' };

  function checkEndConditions() { return checkForWinner() || checkForTie() }

  function newGame() {
    gameboard.clearBoard();
    ui.clearBoard();
    // Still need to finish this
  }

  return {
    nextTurn,
    checkEndConditions,
    newGame,
  };

})();
