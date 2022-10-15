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
  const jyrex = player("");
  display.updateDisplay();
  attachEvent();

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
  }
})(gameBoard.gameBoard, displayController, document);
