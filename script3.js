// script.js
let currentPlayer = 'X';
let gameState = ['', '', '', '', '', '', '', '', ''];  // Empty board state
let gameActive = true;  // Flag to check if the game is ongoing

const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('reset-button');
const messageElement = document.getElementById('message');

const winningCombinations = [
    [0, 1, 2], // Row 1
    [3, 4, 5], // Row 2
    [6, 7, 8], // Row 3
    [0, 3, 6], // Column 1
    [1, 4, 7], // Column 2
    [2, 5, 8], // Column 3
    [0, 4, 8], // Diagonal 1
    [2, 4, 6]  // Diagonal 2
];

// Handle a cell click event
function handleCellClick(index) {
    if (!gameState[index] && gameActive) {
        gameState[index] = currentPlayer;
        cells[index].classList.add(currentPlayer.toLowerCase());
        cells[index].textContent = currentPlayer;

        // Check for a winner
        if (checkWinner()) {
            gameActive = false;
            messageElement.textContent = `${currentPlayer} wins!`;
            return;
        }

        // Check for a draw (no more empty cells)
        if (gameState.every(cell => cell !== '')) {
            gameActive = false;
            messageElement.textContent = "It's a draw!";
            return;
        }

        // Switch players
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        messageElement.textContent = `${currentPlayer}'s turn`;
    }
}

// Check if the current player has won
function checkWinner() {
    return winningCombinations.some(combination => {
        const [a, b, c] = combination;
        return gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c];
    });
}

// Reset the game
function resetGame() {
    gameState = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'X';
    cells.forEach(cell => {
        cell.classList.remove('x', 'o');
        cell.textContent = '';
    });
    messageElement.textContent = `${currentPlayer}'s turn`;
}

// Event listeners for cells and reset button
cells.forEach((cell, index) => {
    cell.addEventListener('click', () => handleCellClick(index));
});

resetButton.addEventListener('click', resetGame);

// Initial message
messageElement.textContent = `${currentPlayer}'s turn`;
