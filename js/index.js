const gameBoard = (function () {
  let _gameBoard = ["", "", "", "", "", "", "", "", ""];
  const clearGameBoard = () => {
    _gameBoard = ["", "", "", "", "", "", "", "", ""];
    return _gameBoard;
  }
  const getGameBoard = () => {
    return _gameBoard;
  }
  return { 
    getGameBoard,
    clearGameBoard
   };
})();

const player = function (marker) {
  return { marker };
};

const displayController = (function (array, doc) {
  const updateDisplay = () => {
    (array.getGameBoard()).forEach((mark, index) => {
      const spot = doc.createElement("div");
      spot.setAttribute("data-index", index);
      spot.textContent = mark;
      doc.querySelector("body > div:nth-child(2) > div").appendChild(spot);
    });
  };

  const clearDisplay = () => {
    doc.querySelector("body > div:nth-child(2) > div").innerHTML = "";
  };

  return {
    updateDisplay,
    clearDisplay,
  };
})(gameBoard, document);

const game = (function (array, display, doc) {
  const playerX = player("x");
  const playerO = player("o");
  let currentPlayer = null;
  const restartButton = doc.querySelector("[type=button]");
  const playerPrompt = doc.querySelector("div > p");
  let emptyStringCount = 9
  display.updateDisplay();
  placeMarker();

  function switchPlayer() {
  
    if (currentPlayer === null) {
      currentPlayer = playerX;
      playerPrompt.textContent = "Player O's turn";
    } else if (currentPlayer === playerX) {
      currentPlayer = playerO;
      playerPrompt.textContent = "Player X's turn";
    } else if (currentPlayer === playerO) {
      currentPlayer = playerX;
      playerPrompt.textContent = "Player O's turn";
    }
    return currentPlayer
  }

  function checkWin() {
    let winner = checkPattern("x") || checkPattern("o");
    
    
    if (winner) {
      if (playerX.marker === winner.charAt(0)) {
        playerPrompt.textContent = "Player X has won!";
        endMarking();
      } else if (playerO.marker === winner.charAt(0)) {
        playerPrompt.textContent = "Player O has won!";
        endMarking();
      } 
    }

    if (!winner) {
      checkBoard()
    }
  }

  function checkBoard() {
    for (let i = 0; i < gameBoard.getGameBoard().length; i++) {
      const element = gameBoard.getGameBoard()[i];
      if (element === "") {
        emptyStringCount--
        return
      }

      if (emptyStringCount === 0) {
        playerPrompt.textContent = "It's a tie"
        endMarking()
      }
      
    }
  }

  function endMarking() {
    const spots = doc.querySelectorAll("[data-index]");
    spots.forEach((spot) => {
        spot.removeEventListener("click", attachPlacer);
    });
  }



  function checkPattern(symbol) {
    switch (true) {
      case array.getGameBoard()[2] === `${symbol}` && array.getGameBoard()[5] === `${symbol}` && array.getGameBoard()[8] === `${symbol}`:
        return (`${symbol} won`);
      case array.getGameBoard()[1] === `${symbol}` && array.getGameBoard()[4] === `${symbol}` && array.getGameBoard()[7] === `${symbol}`:
        return (`${symbol} won`);
      case array.getGameBoard()[0] === `${symbol}` && array.getGameBoard()[3] === `${symbol}` && array.getGameBoard()[6] === `${symbol}`:
        return (`${symbol} won`);
      case array.getGameBoard()[0] === `${symbol}` && array.getGameBoard()[1] === `${symbol}` && array.getGameBoard()[2] === `${symbol}`:
        return (`${symbol} won`);
      case array.getGameBoard()[3] === `${symbol}` && array.getGameBoard()[4] === `${symbol}` && array.getGameBoard()[5] === `${symbol}`:
        return (`${symbol} won`);
      case array.getGameBoard()[6] === `${symbol}` && array.getGameBoard()[7] === `${symbol}` && array.getGameBoard()[8] === `${symbol}`:
        return (`${symbol} won`);
      case array.getGameBoard()[0] === `${symbol}` && array.getGameBoard()[4] === `${symbol}` && array.getGameBoard()[8] === `${symbol}`:
        return (`${symbol} won`);
      case array.getGameBoard()[2] === `${symbol}` && array.getGameBoard()[4] === `${symbol}` && array.getGameBoard()[6] === `${symbol}`:
        return (`${symbol} won`);
      case array.getGameBoard()[1] === `${symbol}` && array.getGameBoard()[4] === `${symbol}` && array.getGameBoard()[7] === `${symbol}`:
        return (`${symbol} won`);
      case array.getGameBoard()[3] === `${symbol}` && array.getGameBoard()[4] === `${symbol}` && array.getGameBoard()[5] === `${symbol}`:
        return (`${symbol} won`);
    }
  }

  restartButton.addEventListener("click", (e) => {
    playerPrompt.textContent = "Player X's turn"
    emptyStringCount = 9
    currentPlayer = null;
    array.clearGameBoard();
    display.clearDisplay();
    display.updateDisplay();
    placeMarker();
  });

  function placeMarker() {
    const spots = doc.querySelectorAll("[data-index]");
    spots.forEach((spot) => {
        spot.addEventListener("click", attachPlacer);
    });
    checkWin();
  }

  function attachPlacer(e) {
    const spotIndex = e.target.getAttribute("data-index");
    if (array.getGameBoard()[spotIndex] == "") {
      array.getGameBoard()[spotIndex] = switchPlayer().marker;
      display.clearDisplay();
      display.updateDisplay();
      placeMarker();
    }
  }

})(gameBoard, displayController, document);