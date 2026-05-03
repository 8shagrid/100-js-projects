const gameContainer = document.getElementById('memory-game');
const movesEl = document.getElementById('moves');
const restartBtn = document.getElementById('restart-btn');

const items = ['🍎', '🍌', '🍇', '🍓', '🍒', '🥑', '🍍', '🥝'];
let cards = [...items, ...items];
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let moves = 0;
let matchCount = 0;

function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}

function createCard(icon) {
    const card = document.createElement('div');
    card.classList.add('memory-card');
    card.dataset.framework = icon;

    card.innerHTML = `
        <div class="front-face">${icon}</div>
        <div class="back-face">?</div>
    `;

    card.addEventListener('click', flipCard);
    return card;
}

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    moves++;
    movesEl.textContent = moves;
    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    
    matchCount++;
    if (matchCount === items.length) {
        setTimeout(() => {
            alert(`Selamat! Anda menang dalam ${moves} langkah.`);
        }, 500);
    }

    resetBoard();
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
    }, 1000);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

function initGame() {
    gameContainer.innerHTML = '';
    moves = 0;
    matchCount = 0;
    movesEl.textContent = moves;
    shuffle(cards);
    cards.forEach(icon => {
        gameContainer.appendChild(createCard(icon));
    });
}

restartBtn.addEventListener('click', initGame);

// Start
initGame();
