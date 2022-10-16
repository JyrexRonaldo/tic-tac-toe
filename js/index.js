const gameBoard = (function () {
  let gameBoard = ["", "", "", "", "", "", "", "", ""];
  const clearGameBoard = () => {
    gameBoard = ["", "", "", "", "", "", "", "", ""];
    return gameBoard;
  }
  const getGameBoard = () => {
    return gameBoard;
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
  display.updateDisplay();
  placeMarker();

  function switchPlayer() {
  
    if (currentPlayer === null) {
      currentPlayer = playerX
    } else if (currentPlayer === playerX) {
      currentPlayer = playerO
    } else if (currentPlayer === playerO) {
      currentPlayer = playerX
    }
    return currentPlayer

  }

  function checkWin() {
    checkPattern("x")
    checkPattern("o")
  }

  function checkPattern(symbol) {
    switch (true) {
      case array.getGameBoard()[2] === `${symbol}` && array.getGameBoard()[5] === `${symbol}` && array.getGameBoard()[8] === `${symbol}`:
        console.log(`${symbol} won`);
        break;
      case array.getGameBoard()[1] === `${symbol}` && array.getGameBoard()[4] === `${symbol}` && array.getGameBoard()[7] === `${symbol}`:
        console.log(`${symbol} won`);
        break;
      case array.getGameBoard()[0] === `${symbol}` && array.getGameBoard()[3] === `${symbol}` && array.getGameBoard()[6] === `${symbol}`:
        console.log(`${symbol} won`);
        break;
      case array.getGameBoard()[0] === `${symbol}` && array.getGameBoard()[1] === `${symbol}` && array.getGameBoard()[2] === `${symbol}`:
        console.log(`${symbol} won`);
        break;
      case array.getGameBoard()[3] === `${symbol}` && array.getGameBoard()[4] === `${symbol}` && array.getGameBoard()[5] === `${symbol}`:
        console.log(`${symbol} won`);
        break;
      case array.getGameBoard()[6] === `${symbol}` && array.getGameBoard()[7] === `${symbol}` && array.getGameBoard()[8] === `${symbol}`:
        console.log(`${symbol} won`);
        break;
      case array.getGameBoard()[0] === `${symbol}` && array.getGameBoard()[4] === `${symbol}` && array.getGameBoard()[8] === `${symbol}`:
        console.log(`${symbol} won`);
        break;
      case array.getGameBoard()[2] === `${symbol}` && array.getGameBoard()[4] === `${symbol}` && array.getGameBoard()[6] === `${symbol}`:
        console.log(`${symbol} won`);
        break;
      case array.getGameBoard()[1] === `${symbol}` && array.getGameBoard()[4] === `${symbol}` && array.getGameBoard()[7] === `${symbol}`:
        console.log(`${symbol} won`);
        break;
      case array.getGameBoard()[3] === `${symbol}` && array.getGameBoard()[4] === `${symbol}` && array.getGameBoard()[5] === `${symbol}`:
        console.log(`${symbol} won`);
        break;
    }
  }

  restartButton.addEventListener("click", (e) => {
    currentPlayer = null;
    array.clearGameBoard();
    console.log(array.getGameBoard());
    display.clearDisplay();
    display.updateDisplay();
    placeMarker();
  });

  function placeMarker() {
    const spots = doc.querySelectorAll("[data-index]");
    spots.forEach((spot) => {
      spot.addEventListener("click", (e) => {
        const spotIndex = e.target.getAttribute("data-index");
        console.log(spotIndex);
        if (array.getGameBoard()[spotIndex] == "") {
          array.getGameBoard()[spotIndex] = switchPlayer().marker;
          display.clearDisplay();
          console.log(array.getGameBoard());
          display.updateDisplay();
          placeMarker();
        }
      });
    });
    checkWin();
  }
})(gameBoard, displayController, document);
