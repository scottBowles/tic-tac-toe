const playerFactory = (name, marker, id) => {
  if (!id) throw 'Player id cannot be falsy'

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
  const getId = () => id
  return { getName, changeName, getMarker, changeMarker, getId }
}

const playerOne = playerFactory('Player One', 'X', 1);
const playerTwo = playerFactory('Player Two', 'O', 2);


const ui = (() => {

  const boardDisplay = document.querySelector("#board");
  const newGameButton = document.querySelector("#newGameButton");
  const playerOneName = document.querySelector("#playerOneName");
  const playerOneNameInput = document.querySelector("#playerOneNameInput");
  const playerOneMarker = document.querySelector("#playerOneMarker");
  const playerOneMarkerInput = document.querySelector("#playerOneMarkerInput");
  const playerTwoName = document.querySelector("#playerTwoName");
  const playerTwoNameInput = document.querySelector("#playerTwoNameInput");
  const playerTwoMarker = document.querySelector("#playerTwoMarker");
  const playerTwoMarkerInput = document.querySelector("#playerTwoMarkerInput");
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
  
  function boardDisplayListener(e) {
    const { spaceAlreadyPlayed, newPlay, checkForWinner, checkForTie } = gameboard;
    const player = gameplay.whoseTurn();
    const playerId = player.getId();
    const marker = player.getMarker();
    const row = e.target.dataset.row;
    const column = e.target.dataset.column;

    if (!spaceAlreadyPlayed(row, column)) {

      newPlay(playerId, row, column);
      e.target.innerText = marker;

      if (checkForWinner(row, column)) {
        boardDisplay.removeEventListener('click', boardDisplayListener)
        message.innerText = `Congratulations! ${player.getName()} wins!`
      } else if (checkForTie()) {
        message.innerText = "It's a tie! Play again?"
      } else {
        gameplay.nextTurn();
        // ui.nextTurn();
      }

    }
  }
  
  boardDisplay.addEventListener('click', boardDisplayListener)

})();




const gameboard = (() => {

  const board = [
    [0, 0, 0], 
    [0, 0, 0], 
    [0, 0, 0],
  ];

  function spaceAlreadyPlayed(row, column) {
    return board[row][column];
  };

  function newPlay(playerId, row, column) {
    board[row][column] = playerId;
  };

  function clearBoard() {
    board = [
      [0, 0, 0], 
      [0, 0, 0], 
      [0, 0, 0],
    ];
  };

  function checkForWinner(rowNumber, columnNumber) {
    const column = board.map(row => row[columnNumber]);
    const row = board[rowNumber];
    const ltrDiagonal = [board[0][0], board[1][1], board[2][2]];
    const rtlDiagonal = [board[0][2], board[1][1], board[2][0]];
    // checkLine will return false if not three in a row and 0 if none of the spaces have been played -- both falsy
    const checkLine = (line) => line.reduce((acc, item) => acc === item ? item : false)
    const isAWinner = checkLine(column) || checkLine(row) || checkLine(ltrDiagonal) || checkLine(rtlDiagonal);
    return isAWinner
  };
  
  function checkForTie() {
    const anyZeroes = 
      board.reduce((acc, row) => [...acc, ...row], [])
           .reduce((acc, value) => !value || acc, false);
    return !anyZeroes;
  };
  
  return {
    spaceAlreadyPlayed,
    newPlay,
    clearBoard,
    checkForWinner,
    checkForTie,
  };

})();

const gameplay = (() => {

  let turn = playerOne;

  function whoseTurn() { return turn };

  function nextTurn() { turn = turn === playerOne ? playerTwo : playerOne };

  function newGame() {
    gameboard.clearBoard();
    ui.clearBoard();
    // Still need to finish this
  }

  return {
    whoseTurn,
    nextTurn,
    newGame,
  };

})();
