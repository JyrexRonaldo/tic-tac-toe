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
  const jyrex = player("o");
  display.updateDisplay();
  attachEvent();

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

  function attachEvent() {
    const spots = doc.querySelectorAll("[data-index]");
    spots.forEach((spot) => {
      spot.addEventListener("click", (e) => {
        const spotIndex = e.target.getAttribute("data-index");
        console.log(spotIndex);
        if (array[spotIndex] == "") {
          array[spotIndex] = jyrex.marker;
          display.clearDisplay();
          console.log(array);
          display.updateDisplay();
          attachEvent();
        }
      });
    });
    checkWin(array);
  }
})(gameBoard.gameBoard, displayController, document);
