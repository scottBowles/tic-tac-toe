const ui = (() => {
  const gameboard = document.querySelector("#gameboard");
  const newGameButton = document.querySelector("#newGameButton");
  const playerOne = document.querySelector("#playerOne");
  const playerOneInput = document.querySelector("#playerOneInput")
  const playerTwo = document.querySelector("#playerTwo");
  const playerTwoInput = document.querySelector("#playerTwoInput")
  const message = document.querySelector("#message");

  /*
   *   NAME DISPLAYS & INPUTS
   */
  
  function toggleInputDisplay(element) {
    if (element.classList.contains("playerOneDisplay")) {
      playerOne.classList.toggle("hidden")
      playerOneInput.classList.toggle("hidden")
    } 
    else if (element.classList.contains("playerTwoDisplay")) {
      playerTwo.classList.toggle("hidden")
      playerTwoInput.classList.toggle("hidden")
    }
  }

  playerOne.onclick = function () {
    toggleInputDisplay(playerOne)
    playerOneInput.focus()
  }

  playerOneInput.onblur = function() {
    const newName = this.value || 'Player One';
    playerOne.innerText = newName
    toggleInputDisplay(playerOneInput)
    // player one .changeName(newName)
  }

  playerOneInput.addEventListener('keydown', e => {
    // Blur to trigger onblur event -- avoids event doubling
    if (e.key === "Enter") playerOneInput.blur()
  })

  playerTwo.onclick = function () {
    toggleInputDisplay(playerTwo)
    playerTwoInput.focus()
  }

  playerTwoInput.onblur = function() {
    const newName = this.value || 'Player Two';
    playerTwo.innerText = newName
    toggleInputDisplay(playerTwoInput)
    // player two .changeName(newName)
  }

  playerTwoInput.addEventListener('keydown', e => {
    // Blur to trigger onblur event -- avoids event doubling
    if (e.key === "Enter") playerTwoInput.blur()
  })

  /*
   *   NEW GAME
   */

  // newGameButton.onclick(gameplay.newGame)
  // newGameButton.addEventListener('keydown', e => {
  //   if (e.key === "Enter") gameplay.newGame()
  // })

  /*
   *   GAMEBOARD SPACE CLICK
   */

  // gameboard.onclick = (e) => {
  //   do something with e.target , e.target.innerText
  // }

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
