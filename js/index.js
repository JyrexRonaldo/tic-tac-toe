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
  const jyrex = player("x");
  display.updateDisplay();
  attachEvent();

  function checkWin(array) {
    switch (true) {
      case array[2] === "x" && array[5] === "x" && array[8] === "x":
        console.log("Ass won again");
        break;
      case array[1] === "x" && array[4] === "x" && array[7] === "x":
        console.log("Ass won again");
        break;
      case array[0] === "x" && array[3] === "x" && array[6] === "x":
        console.log("Ass won again");
        break;
      case array[0] === "x" && array[1] === "x" && array[2] === "x":
        console.log("Ass won again");
        break;
      case array[3] === "x" && array[4] === "x" && array[5] === "x":
        console.log("Ass won again");
        break;
      case array[6] === "x" && array[7] === "x" && array[8] === "x":
        console.log("Ass won again");
        break;
      case array[0] === "x" && array[4] === "x" && array[8] === "x":
        console.log("Ass won again");
        break;
      case array[2] === "x" && array[4] === "x" && array[6] === "x":
        console.log("Ass won again");
        break;
      case array[1] === "x" && array[4] === "x" && array[7] === "x":
        console.log("Ass won again");
        break;
      case array[3] === "x" && array[4] === "x" && array[5] === "x":
        console.log("Ass won again");
        break;
    }
  }

  function checkPattern(symbol) {}

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
