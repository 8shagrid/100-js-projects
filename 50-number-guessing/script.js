let secretNumber;
let attempts = 0;
let previousGuesses = [];

const messageEl = document.getElementById('message');
const guessInput = document.getElementById('guess-input');
const guessBtn = document.getElementById('guess-btn');
const attemptsEl = document.getElementById('attempts');
const historyEl = document.getElementById('history');
const restartBtn = document.getElementById('restart-btn');

function initGame() {
    secretNumber = Math.floor(Math.random() * 100) + 1;
    attempts = 0;
    previousGuesses = [];
    
    attemptsEl.textContent = '0';
    historyEl.innerHTML = '';
    messageEl.textContent = 'Mulai menebak...';
    messageEl.style.color = 'var(--primary)';
    
    guessInput.value = '';
    guessInput.disabled = false;
    guessBtn.disabled = false;
    restartBtn.style.display = 'none';
    guessInput.focus();
}

function handleGuess() {
    const userGuess = parseInt(guessInput.value);

    // Validation
    if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
        messageEl.textContent = 'Masukkan angka 1-100!';
        messageEl.style.color = 'var(--accent)';
        return;
    }

    if (previousGuesses.includes(userGuess)) {
        messageEl.textContent = 'Anda sudah menebak angka ini!';
        messageEl.style.color = 'var(--accent)';
        return;
    }

    attempts++;
    attemptsEl.textContent = attempts;
    previousGuesses.push(userGuess);
    updateHistory(userGuess);

    if (userGuess === secretNumber) {
        gameOver(true);
    } else if (userGuess < secretNumber) {
        messageEl.textContent = 'Terlalu RENDAH! Coba lagi.';
        messageEl.style.color = 'var(--primary)';
    } else {
        messageEl.textContent = 'Terlalu TINGGI! Coba lagi.';
        messageEl.style.color = 'var(--primary)';
    }

    guessInput.value = '';
    guessInput.focus();
}

function updateHistory(guess) {
    const tag = document.createElement('span');
    tag.classList.add('history-tag');
    tag.textContent = guess;
    historyEl.appendChild(tag);
}

function gameOver(win) {
    messageEl.textContent = `🎉 BENAR! Angkanya adalah ${secretNumber}.`;
    messageEl.style.color = 'var(--secondary)';
    guessInput.disabled = true;
    guessBtn.disabled = true;
    restartBtn.style.display = 'block';
}

guessBtn.addEventListener('click', handleGuess);
guessInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleGuess();
});
restartBtn.addEventListener('click', initGame);

// Start initial game
initGame();
