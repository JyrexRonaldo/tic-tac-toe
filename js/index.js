const gameboard = (function() {
    // const board = [ 
    //     "X", "O", "X", 
    //     "O", "X", "O", 
    //     "O", "O", "X"
    // ] 
    const board = ["", "", "", "", "", "", "", "", ""]
    const getBoard = () => {
        return board;
    }
    
    const addMarker = (marker, index) => {
        if (board[index]) {
            return 
        }
        board[index] = marker;
    }
    
    return {
        getBoard,
        addMarker
    }
})()

function player(name, marker) {
    return {name, marker}
}

const gameController = (function() {
    const board = gameboard.getBoard()
    
    const players = [ 
        player("Kaiden", "X"),
        player("Alenko", "O")
    ]

    let activePlayer = players[0];

    const switchPlayerTurn = () => {
        console.log(activePlayer)
        activePlayer = activePlayer === players[0] ? players[1] : players[0]; 
        console.log("yeah")
        
    }

    function checkPattern(board, marker) {
        switch (true) {
            case 
            board[0] === marker && board[1] === marker && board[2] === marker ||
            board[3] === marker && board[4] === marker && board[5] === marker ||
            board[6] === marker && board[7] === marker && board[8] === marker ||
            board[0] === marker && board[3] === marker && board[6] === marker ||
            board[1] === marker && board[4] === marker && board[7] === marker ||
            board[2] === marker && board[5] === marker && board[8] === marker ||
            board[0] === marker && board[4] === marker && board[8] === marker ||
            board[6] === marker && board[4] === marker && board[2] === marker :
                return true;
                break;
            default:
                return false;
                break;
        }
    }

    console.log(checkPattern(board, "X"))
    console.log(checkPattern(board, "O"))

    function getWinner(board, player) {
        if (checkPattern(board, player.marker) === true) {
            return player;
        } else {
            return false
        }
    }

    function playRound(index) {
        gameboard.addMarker(activePlayer.marker, index)

        if (getWinner(gameboard.getBoard(), activePlayer)) {
            console.log(`${activePlayer.name} has won `)
        }

        switchPlayerTurn()    
        console.log(gameboard.getBoard())
    }

    console.log(getWinner(board, players))

    // addMarker("x", 4)
    // addMarker("x", 5)
    // addMarker("o", 2)
    // addMarker("o", 1)
    console.log(board)

    return {
        playRound
    }

})()

const screenController = (function () {
    const boardDiv = document.querySelector(".board");

    const updateScreen = () => {
        boardDiv.textContent = "";
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