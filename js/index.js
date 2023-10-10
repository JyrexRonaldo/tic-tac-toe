const gameboard = (function() {
    let board = ["", "", "", "", "", "", "", "", ""]
    const getBoard = () => {
        return board;
    }
    
    const addMarker = (marker, index) => {
        if (board[index]) {
            return 
        }
        board[index] = marker;
    }

    const resetBoard = () => {
        board = ["", "", "", "", "", "", "", "", ""];
    }
    
    return {
        getBoard,
        addMarker,
        resetBoard
    }
})()

function player(name, marker) {
    return {name, marker}
}

const gameController = (function() {
    let board = gameboard.getBoard()
    let addCode = 1
    
    const players = [ 
        player("Kaiden", "X"),
        player("Alenko", "O")
    ]

    let activePlayer = players[0];

    let gameStatus = `${activePlayer.name}'s turn`

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0]; 
    }

    function getWinner(board, player) {
        switch (true) {
            case 
            board[0] === player.marker && board[1] === player.marker && board[2] === player.marker ||
            board[3] === player.marker && board[4] === player.marker && board[5] === player.marker ||
            board[6] === player.marker && board[7] === player.marker && board[8] === player.marker ||
            board[0] === player.marker && board[3] === player.marker && board[6] === player.marker ||
            board[1] === player.marker && board[4] === player.marker && board[7] === player.marker ||
            board[2] === player.marker && board[5] === player.marker && board[8] === player.marker ||
            board[0] === player.marker && board[4] === player.marker && board[8] === player.marker ||
            board[6] === player.marker && board[4] === player.marker && board[2] === player.marker :
                return player;
                break;
            default:
                return false;
                break;
        }
    }

    function playRound(index) {
        if (board[index] !== "") {
            return
        }

        if (addCode) {
            gameboard.addMarker(activePlayer.marker, index)    
        } 
        
        if (getWinner(board, activePlayer)) {
            gameStatus = `${activePlayer.name} has won!`
            addCode = 0;
            return;
        } else {
            if (isBoardFull()) {
                gameStatus = "It's a draw"
            } else {
                switchPlayerTurn()
                gameStatus = `${activePlayer.name}'s turn`
            }
        }
    }

    function isBoardFull() {
        for (let i = 0; i < board.length; i++) {
          if (board[i] === "") {
            return false;
          } 
        }
        return true;
    } 

    function getGameStatus() {
        return gameStatus;
    }

    function resetGame() {
        gameboard.resetBoard();
        addCode = 1;
        activePlayer = players[0];
        gameStatus = `${activePlayer.name}'s turn`;
        board = gameboard.getBoard()
    }
 
    return {
        getGameStatus,
        playRound,
        resetGame
    }

})()

const screenController = (function () {
    const boardDiv = document.querySelector(".board");
    const infoDiv = document.querySelector(".turn");
    const restartButton = document.querySelector(".reset");

    const updateScreen = () => {
        boardDiv.textContent = "";
        const board = gameboard.getBoard()

        board.forEach((marker, index) => {
            const markerDiv = document.createElement("button");
            markerDiv.dataset.index = index;
            markerDiv.textContent = marker;
            boardDiv.appendChild(markerDiv);
        })
        infoDiv.textContent = `${gameController.getGameStatus()}`
    }

    boardDiv.addEventListener("click", (e) => {
        gameController.playRound(e.target.dataset.index)
        updateScreen()
    })

    restartButton.addEventListener("click", (e) => {
        gameController.resetGame()
        updateScreen()
    })

    updateScreen()

})()