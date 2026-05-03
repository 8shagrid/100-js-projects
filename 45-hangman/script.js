const wordDisplay = document.getElementById('word-display');
const keyboard = document.getElementById('keyboard');
const figureParts = document.querySelectorAll('.figure-part');
const popup = document.getElementById('popup');
const finalMsg = document.getElementById('final-msg');
const wordReveal = document.getElementById('word-reveal');
const playAgainBtn = document.getElementById('play-again');

const words = ['JAVASCRIPT', 'HTML', 'PROGRAMMING', 'DEVELOPER', 'CSS', 'GITHUB', 'FRONTEND', 'DATABASE', 'BROWSER', 'FUNCTION'];
let selectedWord = '';
let correctLetters = [];
let wrongGuesses = 0;

function initGame() {
    selectedWord = words[Math.floor(Math.random() * words.length)];
    correctLetters = [];
    wrongGuesses = 0;
    
    // Reset Visuals
    figureParts.forEach(part => part.style.display = 'none');
    popup.style.display = 'none';
    
    displayWord();
    createKeyboard();
}

function displayWord() {
    wordDisplay.innerHTML = selectedWord.split('').map(letter => `
        <div class="letter-blank">
            ${correctLetters.includes(letter) ? letter : ''}
        </div>
    `).join('');

    const innerWord = wordDisplay.innerText.replace(/\n/g, '');
    if (innerWord === selectedWord) {
        gameOver(true);
    }
}

function createKeyboard() {
    keyboard.innerHTML = '';
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    letters.split('').forEach(char => {
        const btn = document.createElement('button');
        btn.classList.add('key');
        btn.textContent = char;
        btn.addEventListener('click', () => handleGuess(char, btn));
        keyboard.appendChild(btn);
    });
}

function handleGuess(letter, btn) {
    btn.disabled = true;
    
    if (selectedWord.includes(letter)) {
        correctLetters.push(letter);
        displayWord();
    } else {
        wrongGuesses++;
        updateFigure();
        if (wrongGuesses === figureParts.length) {
            gameOver(false);
        }
    }
}

function updateFigure() {
    figureParts[wrongGuesses - 1].style.display = 'block';
}

function gameOver(win) {
    popup.style.display = 'flex';
    finalMsg.textContent = win ? 'Selamat! Anda Menang! 🎉' : 'Sayang sekali, Anda Kalah! 💀';
    finalMsg.style.color = win ? 'var(--success)' : 'var(--accent)';
    wordReveal.textContent = `Kata yang benar: ${selectedWord}`;
}

playAgainBtn.addEventListener('click', initGame);

// Allow physical keyboard
window.addEventListener('keydown', e => {
    if (popup.style.display === 'flex') return;
    const char = e.key.toUpperCase();
    if (/[A-Z]/.test(char) && char.length === 1) {
        const buttons = document.querySelectorAll('.key');
        const btn = Array.from(buttons).find(b => b.textContent === char);
        if (btn && !btn.disabled) {
            handleGuess(char, btn);
        }
    }
});

initGame();
