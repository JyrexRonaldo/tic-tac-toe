const gameboard = (function() {
    const board = ["X", "O", "X", "O", "X", "O", "X", "O", "X"] 

    const getBoard = () => {
        return board;
    }
    
    return {
        getBoard
    }
})()

function player(marker) {

}

const gameController = (function() {

})()

const screenController = (function () {
    const boardDiv = document.querySelector(".board");

    const updateScreen = () => {
        boardDiv.innerHTML = "";
        const board = gameboard.getBoard()

        console.log(board)
        board.forEach((marker, index) => {
            const markerDiv = document.createElement("button");
            markerDiv.dataset.index = index;
            markerDiv.textContent = marker;
            boardDiv.appendChild(markerDiv);
        })

        boardDiv.addEventListener("click", (e) => {
            console.log(e.target.dataset.index)
        })

    }

    updateScreen()

})()