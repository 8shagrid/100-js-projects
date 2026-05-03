const boardEl = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const statusMsg = document.getElementById('status');
const restartBtn = document.getElementById('restart-btn');

let currentPlayer = 'X';
let gameActive = true;
let boardState = ["", "", "", "", "", "", "", "", ""];

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellClick(e) {
    const clickedCell = e.target;
    const clickedIndex = parseInt(clickedCell.getAttribute('data-index'));

    if (boardState[clickedIndex] !== "" || !gameActive) return;

    updateCell(clickedCell, clickedIndex);
    checkResult();
}

function updateCell(cell, index) {
    boardState[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer.toLowerCase());
}

function checkResult() {
    let roundWon = false;
    let winningLine = null;

    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (boardState[a] === "" || boardState[b] === "" || boardState[c] === "") continue;
        if (boardState[a] === boardState[b] && boardState[b] === boardState[c]) {
            roundWon = true;
            winningLine = [a, b, c];
            break;
        }
    }

    if (roundWon) {
        statusMsg.textContent = `Pemain ${currentPlayer} Menang! 🎉`;
        statusMsg.style.color = currentPlayer === 'X' ? 'var(--primary)' : 'var(--secondary)';
        highlightWinner(winningLine);
        gameActive = false;
        return;
    }

    let roundDraw = !boardState.includes("");
    if (roundDraw) {
        statusMsg.textContent = "Permainan Seri! 🤝";
        statusMsg.style.color = 'var(--text-muted)';
        gameActive = false;
        return;
    }

    // Change Player
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusMsg.textContent = `Giliran Pemain ${currentPlayer}`;
    statusMsg.style.color = currentPlayer === 'X' ? 'var(--primary)' : 'var(--secondary)';
}

function highlightWinner(line) {
    line.forEach(index => {
        cells[index].classList.add('winner');
    });
}

function restartGame() {
    currentPlayer = 'X';
    gameActive = true;
    boardState = ["", "", "", "", "", "", "", "", ""];
    statusMsg.textContent = "Giliran Pemain X";
    statusMsg.style.color = 'var(--primary)';
    cells.forEach(cell => {
        cell.textContent = "";
        cell.className = 'cell';
    });
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartBtn.addEventListener('click', restartGame);
