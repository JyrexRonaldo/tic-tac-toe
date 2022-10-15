const gameBoard = (function() {
  const gameBoard = ["x", "x", "x", "x", "x", "x", "x", "x", "x"];
  return {gameBoard}
})();

const player = function(marker) {
  return {marker}
}


const displayController = (function(array, doc) {

  const updateDisplay = () => {
    // doc.querySelector(".shit").innerHTML = "";
    array.forEach((mark, index) => {
      const spot = doc.createElement("div");
      spot.setAttribute("data-index", index);
      spot.textContent = mark;
      doc.querySelector("body > div > div").appendChild(spot);  
  });
  }

  const clearDisplay = () => {
    doc.querySelector("[data-index]").textContent = "";
  }

  return {
    updateDisplay,
    clearDisplay
  }

})(gameBoard.gameBoard, document);

const game = (function(array, display, doc) {
  display.updateDisplay()
  
  const spot = doc.querySelectorAll("[data-index]");
  spot.forEach((spot) => {
    spot.addEventListener("click", (e) => {
      const spotIndex = e.target.getAttribute("data-index");
      array[spotIndex] += "Doggy"
      console.log(array)
      display.clearDisplay()
      display.updateDisplay()
    })
  })

  
})(gameBoard.gameBoard, displayController, document)