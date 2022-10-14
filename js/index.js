const gameBoard = (function() {
  const gameBoard = ["x", "o", "x", "o", "x", "x", "o", "x", "x"];

  return {gameBoard}
})();

const player = function(marker) {
  return {marker}
}

const game = (function() {
  
})()

const displayController = (function(array, doc) {
    array.forEach((mark, index) => {
        const spot = doc.createElement("div");
        spot.setAttribute("data-index", index)
        spot.textContent = mark;
        doc.querySelector("body > div > div").appendChild(spot);
    });
})(gameBoard.gameBoard, document);

// console.log(isArray(gameBoard.gameBoard))