const Player = (name, symbol) => { //Player factory
    return {name, symbol};
};

const Play = (() => {
    const playerOne = Player("Player One", "x");
    const playerTwo = Player("Player Two", "o");
    let continueGame ;
    return {
        playerOne,
        playerTwo,
    }
})();

const MainGameModule = (() => {
    let gameBoard = [];
    const restart = () => {
        gameBoard.splice(0, gameBoard.length);
        for (const gameD of gameDiv) {
            gameD.innerText = "";
            gameD.classList.remove("winningBox");
        };
        addPlayerOneSymbol()
    };
    const push = (index, symbol) => {
        gameBoard[index] = symbol;
    };
    const changeName1 = () => {
        let newName = prompt("Player One Name:");
        playerOneName.innerText = newName;
    };
    const changeName2 = () => {
        let newName = prompt("Player Two Name:");
        playerTwoName.innerText = newName;
    };
    const addPlayerOneSymbol = () => {
        playerTwoName.classList.remove("active-player");
        playerOneName.classList.add("active-player");
        for (const event of gameDiv) {
            event.addEventListener('click', (e) => {
                push(e.srcElement.id, Play.playerOne.symbol);
                DisplayController.render(e.srcElement.id);
                addPlayerTwoSymbol(); 
            });
        };
    };
    const addPlayerTwoSymbol = () => {
        playerOneName.classList.remove("active-player");
        playerTwoName.classList.add("active-player");
        for (const event of gameDiv) {
            event.addEventListener('click', (e) => {
                push(e.srcElement.id, Play.playerTwo.symbol);
                DisplayController.render(e.srcElement.id);
                addPlayerOneSymbol(); 
            });
        };
    };
    const resetBtn = document.querySelector("#resetBtn");
    resetBtn.addEventListener('click', restart);
    const gameDiv = document.querySelectorAll(".game-div");
    const playerOneName = document.querySelector("#player-one");
    playerOneName.addEventListener('click', changeName1);
    const playerTwoName = document.querySelector("#player-two");
    playerTwoName.addEventListener('click', changeName2);
    return {
        gameBoard,
        restart,
        push,
        changeName1,
        changeName2,
    }   
})();

const DisplayController = (() => {
    const render = (i) => {
        const gameDiv = document.getElementById(`${i}`);
        gameDiv.innerHTML = MainGameModule.gameBoard[i];
    };
    return {
        render,
    }
})();