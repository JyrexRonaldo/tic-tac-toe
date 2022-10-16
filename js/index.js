const gameBoard = (function () {
  const gameBoard = ["", "", "", "", "", "", "", "", ""];
  return { gameBoard };
})();

const player = function (marker) {
  return { marker };
};

const displayController = (function (array, doc) {
  const updateDisplay = () => {
    array.forEach((mark, index) => {
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
})(gameBoard.gameBoard, document);

const game = (function (array, display, doc) {
  const playerX = player("x");
  const playerO = player("o");
  let currentPlayer = null;
  const restartButton = doc.querySelector("[type=button]");
  display.updateDisplay();
  placeMarker();

  restartButton.addEventListener("click", (e) => {
    currentPlayer = null;
    array = ["", "", "", "", "", "", "", "", ""];
    console.log(array);
    display.clearDisplay();
    display.updateDisplay();
    placeMarker();
  });

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
      case array[2] === `${symbol}` && array[5] === `${symbol}` && array[8] === `${symbol}`:
        console.log(`${symbol} won`);
        break;
      case array[1] === `${symbol}` && array[4] === `${symbol}` && array[7] === `${symbol}`:
        console.log(`${symbol} won`);
        break;
      case array[0] === `${symbol}` && array[3] === `${symbol}` && array[6] === `${symbol}`:
        console.log(`${symbol} won`);
        break;
      case array[0] === `${symbol}` && array[1] === `${symbol}` && array[2] === `${symbol}`:
        console.log(`${symbol} won`);
        break;
      case array[3] === `${symbol}` && array[4] === `${symbol}` && array[5] === `${symbol}`:
        console.log(`${symbol} won`);
        break;
      case array[6] === `${symbol}` && array[7] === `${symbol}` && array[8] === `${symbol}`:
        console.log(`${symbol} won`);
        break;
      case array[0] === `${symbol}` && array[4] === `${symbol}` && array[8] === `${symbol}`:
        console.log(`${symbol} won`);
        break;
      case array[2] === `${symbol}` && array[4] === `${symbol}` && array[6] === `${symbol}`:
        console.log(`${symbol} won`);
        break;
      case array[1] === `${symbol}` && array[4] === `${symbol}` && array[7] === `${symbol}`:
        console.log(`${symbol} won`);
        break;
      case array[3] === `${symbol}` && array[4] === `${symbol}` && array[5] === `${symbol}`:
        console.log(`${symbol} won`);
        break;
    }
  }

  function placeMarker() {
    const spots = doc.querySelectorAll("[data-index]");
    spots.forEach((spot) => {
      spot.addEventListener("click", (e) => {
        const spotIndex = e.target.getAttribute("data-index");
        console.log(spotIndex);
        if (array[spotIndex] == "") {
          array[spotIndex] = switchPlayer().marker;
          display.clearDisplay();
          console.log(array);
          display.updateDisplay();
          placeMarker();
        }
      });
    });
    checkWin();
  }
})(gameBoard.gameBoard, displayController, document);
