/*
 *   PLAYER FACTORY GO BRRRR
 */

const playerFactory = (name, marker, id) => {
  if (!id) throw "Player id cannot be falsy";

  const getName = () => name;
  const changeName = (newName, callback) => {
    if (newName.length > 40) {
      callback("Name must be fewer than 40 characters long");
    } else if (newName) {
      name = newName;
      callback(null, name);
    } else {
      callback("Name cannot be empty");
    }
  };
  const getMarker = () => marker;
  const changeMarker = (newMarker) => {
    if (typeof newMarker === "string" && newMarker.length === 1) {
      marker = newMarker;
      return { newMarker };
    } else {
      return {
        err: "Marker must be exactly one character long",
        newMarker: null,
      };
    }
  };
  const getId = () => id;
  return { getName, changeName, getMarker, changeMarker, getId };
};

const playerOne = playerFactory("Player One", "X", 1);
const playerTwo = playerFactory("Player Two", "O", 2);

/*
 *   GAMEBOARD MODULE
 */

const gameboard = (() => {
  const board = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];

  function spaceAlreadyPlayed(row, column) {
    return board[row][column];
  }

  function newPlay(playerId, row, column) {
    board[row][column] = playerId;
  }

  function clearBoard() {
    board = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ];
  }

  function checkForWinner(rowNumber, columnNumber) {
    const column = board.map((row) => row[columnNumber]);
    const row = board[rowNumber];
    const ltrDiagonal = [board[0][0], board[1][1], board[2][2]];
    const rtlDiagonal = [board[0][2], board[1][1], board[2][0]];
    // checkLine will return false if not three in a row and 0 if none of the spaces have been played -- both falsy
    const checkLine = (line) =>
      line.reduce((acc, item) => (acc === item ? item : false));
    const isAWinner =
      checkLine(column) ||
      checkLine(row) ||
      checkLine(ltrDiagonal) ||
      checkLine(rtlDiagonal);
    return isAWinner;
  }

  function checkForTie() {
    const anyZeroes = board
      .reduce((acc, row) => [...acc, ...row], [])
      .reduce((acc, value) => !value || acc, false);
    return !anyZeroes;
  }

  return {
    spaceAlreadyPlayed,
    newPlay,
    clearBoard,
    checkForWinner,
    checkForTie,
  };
})();

/*
 *   GAMEPLAY MODULE
 */

const gameplay = (() => {
  let turn = playerOne;

  function whoseTurn() {
    return turn;
  }

  function nextTurn() {
    turn = turn === playerOne ? playerTwo : playerOne;
  }

  function newGame() {
    gameboard.clearBoard();
    ui.clearBoard();
    // Still need to finish this -- should this be here?
  }

  return {
    whoseTurn,
    nextTurn,
    newGame,
  };
})();

/*
 *   UI MODULE -- ALL EVENT LISTENERS ARE HERE
 */

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

  window.addEventListener("mousedown", () => {
    message.innerText = " ";
  });

  /*
   *   NAME & MARKER DISPLAYS & INPUTS
   */

  // Display elements are paired with input elements, with one showing at a time.

  function getPairElement(element) {
    const pairElementId = element.id.match(/Input$/)
      ? element.id.slice(0, -5)
      : element.id + "Input";
    return document.querySelector(`#${pairElementId}`);
  }

  function toggleInputDisplay(element) {
    const pairElement = getPairElement(element);
    element.classList.toggle("hidden");
    pairElement.classList.toggle("hidden");
  }

  const displays = [
    playerOneName,
    playerOneMarker,
    playerTwoName,
    playerTwoMarker,
  ];

  displays.forEach((display) => {
    display.addEventListener("click", () => {
      toggleInputDisplay(display);
      const matchingInput = getPairElement(display);
      matchingInput.focus();
    });
  });

  const inputs = [
    playerOneNameInput,
    playerOneMarkerInput,
    playerTwoNameInput,
    playerTwoMarkerInput,
  ];

  inputs.forEach((input) => {
    input.addEventListener("blur", () => {
      const player = input.classList.contains("playerOne")
        ? playerOne
        : playerTwo;
      if (input.classList.contains("nameInput")) {
        const newName = input.value;
        player.changeName(newName, (err, name) => {
          if (err) {
            message.innerText = err;
          } else {
            getPairElement(input).innerText = newName;
          }
        });
        // Hey check it out, I implemented a callback interface!
      } else if (input.classList.contains("markerInput")) {
        const newMarker = input.value;
        const changeResult = player.changeMarker(newMarker);
        if (changeResult.err) {
          message.innerText = changeResult.err;
        } else {
          getPairElement(input).innerText = changeResult.newMarker;
        }
        // This is probably more sensible though
      }

      toggleInputDisplay(input);
    });
    input.addEventListener("keydown", (e) => {
      // Trigger blur event -- avoids event doubling
      if (e.key === "Enter") input.blur();
    });
  });

  /*
   *   NEW GAME
   */

  newGameButton.addEventListener("click", () => {
    [...boardDisplay.children].forEach((child) => (child.innerText = ""));
    gameboard.clearBoard;
    boardDisplay.addEventListener("click", boardDisplayListener);
  });

  /*
   *   GAMEBOARD INTERFACE
   */

  function boardDisplayListener(e) {
    const {
      spaceAlreadyPlayed,
      newPlay,
      checkForWinner,
      checkForTie,
    } = gameboard;
    const player = gameplay.whoseTurn();
    const playerId = player.getId();
    const marker = player.getMarker();
    const row = e.target.dataset.row;
    const column = e.target.dataset.column;

    if (!spaceAlreadyPlayed(row, column)) {
      newPlay(playerId, row, column);
      e.target.innerText = marker;

      if (checkForWinner(row, column)) {
        boardDisplay.removeEventListener("click", boardDisplayListener);
        message.innerText = `Congratulations! ${player.getName()} wins!`;
      } else if (checkForTie()) {
        message.innerText = "It's a tie! Play again?";
      } else {
        gameplay.nextTurn();
        // ui.nextTurn();
      }
    }
  }

  boardDisplay.addEventListener("click", boardDisplayListener);
})();
