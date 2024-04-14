const Gameboard = (function () {
    const board = [0, 0, 0, 0, 0, 0, 0, 0, 0];

    const getBoard = () => board;

    const placeMark = (square, player) => {
        let target = document.querySelector(`[data-index="${square}"]`);
        let index = target.dataset.index;
        if(player == 2) {
            target.classList.add('p2');
            target.innerHTML += '<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 32 32"><path d="M16 7.5C11.3056 7.5 7.5 11.3056 7.5 16C7.5 20.6944 11.3056 24.5 16 24.5C20.6944 24.5 24.5 20.6944 24.5 16C24.5 11.3056 20.6944 7.5 16 7.5ZM2 16C2 8.26801 8.26801 2 16 2C23.732 2 30 8.26801 30 16C30 23.732 23.732 30 16 30C8.26801 30 2 23.732 2 16Z"/></svg>';
            board[index] = 2;
        }
        if(player == 1) {
            target.classList.add('p1');
            target.innerHTML += '<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 32 32"><path d="M24.8787 2.87868C26.0503 1.70711 27.9497 1.70711 29.1213 2.87868C30.2929 4.05025 30.2929 5.94975 29.1213 7.12132L20.331 15.9116C20.2822 15.9604 20.2822 16.0396 20.331 16.0884L29.1213 24.8787C30.2929 26.0503 30.2929 27.9497 29.1213 29.1213C27.9497 30.2929 26.0503 30.2929 24.8787 29.1213L16.0884 20.331C16.0396 20.2822 15.9604 20.2822 15.9116 20.331L7.12132 29.1213C5.94975 30.2929 4.05025 30.2929 2.87868 29.1213C1.70711 27.9497 1.70711 26.0503 2.87868 24.8787L11.669 16.0884C11.7178 16.0396 11.7178 15.9604 11.669 15.9116L2.87868 7.12132C1.70711 5.94975 1.70711 4.05025 2.87868 2.87868C4.05025 1.70711 5.94975 1.70711 7.12132 2.87868L15.9116 11.669C15.9604 11.7178 16.0396 11.7178 16.0884 11.669L24.8787 2.87868Z"/></svg>';
            board[index] = 1;
        }
    };

    const drawBoard = () => {
        let squareIndex = 0;
        for(cell in board) {
            const square = document.createElement('div');
            square.dataset.index = squareIndex;
            square.classList.add('square');
            document.querySelector('.gameboard').appendChild(square);
            squareIndex++;
        }
    };
    return {getBoard, placeMark, drawBoard};
})();

const GameController = (function () {
    const board = Gameboard.getBoard();

    let turn = 1;
    let gameOver = 0;
    let winner = 0;

    const getTurn = () => turn % 2 ? 1 : 2;

    const playTurn = (square) => {
        if(gameOver) return;
        if(turn % 2) {
            Gameboard.placeMark(square, 1);
            //test using a tertiary operator instead of the second
            //parameter and instead of the whole if else statement
        } else {
            Gameboard.placeMark(square, 2);
        }
        if(turn > 4) checkWin();
        turn++;
        updateGamestate();
    }

    const updateGamestate = () => {
        const gamestateText = document.querySelector('.gamestate');
        if (gameOver && winner) {
            return gamestateText.textContent = `Player ${winner} wins!`
        } else if (gameOver) {
            return gamestateText.textContent = `Tie!`
        }
        gamestateText.textContent = `Player ${getTurn()}'s turn`;
    }

    const checkWin = () => {
        const winCond = [123, 456, 789, 147, 258, 369, 159, 357];
        for(i = 0; i < winCond.length; i++) {
            const winLine = winCond[i].toString().split('');
            let a = board[winLine[0] - 1];
            let b = board[winLine[1] - 1];
            let c = board[winLine[2] - 1];
            if(a == 2 && b == 2 && c == 2) {
                winner = 2;
                gameOver++;
            } else if(a == 1 && b == 1 && c == 1) {
                winner = 1;
                gameOver++;
            } else if(turn == 9) {
                gameOver++;
            }
        }
    }

    return {getTurn, playTurn, updateGamestate};
})();

Gameboard.drawBoard();

document.querySelector('.gameboard').addEventListener('click', (e) => {
    if(!e.target.classList.contains('square') || e.target.classList.contains('p1') || e.target.classList.contains('p2')) return;
    const square = e.target.dataset.index;
    GameController.playTurn(square);
});

//TODO
//add score tracker
//add replay button
//add CPU AI
//indicate player turn with icon and color