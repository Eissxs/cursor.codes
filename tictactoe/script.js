const board = document.getElementById('board');
const cells = document.querySelectorAll('[data-cell]');
const status = document.getElementById('status');
const resetButton = document.getElementById('resetButton');
const confirmationModal = document.getElementById('confirmationModal');
const closeModal = document.getElementById('closeModal');
const confirmReset = document.getElementById('confirmReset');
const cancelReset = document.getElementById('cancelReset');
const xWinsDisplay = document.getElementById('xWins');
const oWinsDisplay = document.getElementById('oWins');
const drawsDisplay = document.getElementById('draws');

let currentPlayer = 'X';
let gameActive = true;
let gameState = ['', '', '', '', '', '', '', '', ''];
let xWins = 0;
let oWins = 0;
let draws = 0;

const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagonals
];

cells.forEach((cell, index) => {
    cell.addEventListener('click', () => handleCellClick(cell, index));
});

resetButton.addEventListener('click', () => {
    confirmationModal.style.display = "block";
});

closeModal.addEventListener('click', () => {
    confirmationModal.style.display = "none";
});

cancelReset.addEventListener('click', () => {
    confirmationModal.style.display = "none";
});

confirmReset.addEventListener('click', resetGame);

function handleCellClick(cell, index) {
    if (gameState[index] !== '' || !gameActive) return;

    gameState[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer.toLowerCase());

    if (checkWin()) {
        gameActive = false;
        status.textContent = `Player ${currentPlayer} wins!`;
        updateStats(currentPlayer);
        highlightWinningCells();
        return;
    }

    if (checkDraw()) {
        gameActive = false;
        status.textContent = "It's a draw!";
        draws++;
        drawsDisplay.textContent = `Draws: ${draws}`;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    status.textContent = `Player ${currentPlayer}'s turn`;
}

function checkWin() {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return gameState[index] === currentPlayer;
        });
    });
}

function checkDraw() {
    return gameState.every(cell => cell !== '');
}

function highlightWinningCells() {
    winningCombinations.forEach(combination => {
        if (combination.every(index => gameState[index] === currentPlayer)) {
            combination.forEach(index => {
                cells[index].classList.add('winner');
            });
        }
    });
}

function resetGame() {
    gameState = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'X';
    status.textContent = `Player ${currentPlayer}'s turn`;
    
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('x', 'o', 'winner');
    });

    confirmationModal.style.display = "none";
}

function updateStats(winner) {
    if (winner === 'X') {
        xWins++;
        xWinsDisplay.textContent = `Player X Wins: ${xWins}`;
    } else {
        oWins++;
        oWinsDisplay.textContent = `Player O Wins: ${oWins}`;
    }
}