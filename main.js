const playerFactor = (name, marker) => {
  const getName = () => name
  const changeName = newName => {
    if (newName) {
      name = newName
      return name
    } else {
      return false
    }
  }
  const getMarker = () => marker
  const changeMarker = newMarker => {
    if ( typeof newMarker === "string" && newMarker.length === 1) {
      marker = newMarker;
      return marker
    } else {
      return false
    }
  }
  return { getName, changeName, getMarker, changeMarker }
}

const playerOne = playerFactor('Player One', 'X');
const playerTwo = playerFactor('Player Two', 'O');

const ui = (() => {
  const gameboard = document.querySelector("#gameboard");
  const newGameButton = document.querySelector("#newGameButton");
  const playerOneName = document.querySelector("#playerOneName");
  const playerOneNameInput = document.querySelector("#playerOneNameInput")
  const playerOneMarker = document.querySelector("#playerOneMarker")
  const playerOneMarkerInput = document.querySelector("#playerOneMarkerInput")
  const playerTwoName = document.querySelector("#playerTwoName");
  const playerTwoNameInput = document.querySelector("#playerTwoNameInput")
  const playerTwoMarker = document.querySelector("#playerTwoMarker")
  const playerTwoMarkerInput = document.querySelector("#playerTwoMarkerInput")
  const message = document.querySelector("#message");

  /*
   *   NAME DISPLAYS & INPUTS
   */
  
  // Display elements are paired with input elements, one showing at a time.
  function getPairElement(element) {
    const pairElementId = 
      element.id.match(/Input$/)
      ? element.id.slice(0, -5)
      : element.id + "Input";
    return document.querySelector(`#${pairElementId}`);
  }
  
  function toggleInputDisplay(element) {
    const pairElement = getPairElement(element);
    element.classList.toggle("hidden");
    pairElement.classList.toggle("hidden");
  }

  const displays = [playerOneName, playerOneMarker, playerTwoName, playerTwoMarker];
  
  displays.forEach(display => {
    display.addEventListener("click", () => {
      toggleInputDisplay(display)
      const matchingInput = getPairElement(display)
      matchingInput.focus()
    })
  })
  
  const inputs = [playerOneNameInput, playerOneMarkerInput, playerTwoNameInput, playerTwoMarkerInput]
  
  inputs.forEach(input => {
    input.addEventListener("blur", () => {
      const player = 
        input.classList.contains("playerOne")
        ? playerOne
        : playerTwo;
      if (input.classList.contains("nameInput")) {
        const newName = input.value || player.getName()
        const isValid = player.changeName(newName);
        if (isValid) {
          getPairElement(input).innerText = newName;
        } else {
          message.innerText = "Invalid Name"
        }  
      } else if (input.classList.contains("markerInput")) {
        const newMarker = input.value;
        const isValid = player.changeMarker(newMarker);
        if (isValid) {
          getPairElement(input).innerText = newMarker;
        } else {
          message.innerText = "Marker must be exactly one character long"
        }

      }
      
      toggleInputDisplay(input);
    })
    input.addEventListener("keydown", e => {
      // Trigger blur event -- avoids event doubling
      if (e.key === "Enter") input.blur()
    })
  })



  /*
   *   NEW GAME
   */

  // ui.clearBoard
  // gameboard.clearBoard
  // prompt for who plays 'X'
  //   set gameplay.turn
  //   ui.displayPlayerMarkers

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
