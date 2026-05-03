const gameArea = document.getElementById('game-area');
const icon = document.getElementById('icon');
const message = document.getElementById('message');
const subMessage = document.getElementById('sub-message');
const bestTimeEl = document.getElementById('best-time');

let startTime, endTime;
let timeoutId;
let state = 'IDLE'; // IDLE, WAITING, READY, RESULT

// Load Personal Best
let bestTime = localStorage.getItem('reaction-best') || Infinity;
if (bestTime !== Infinity) {
    bestTimeEl.textContent = bestTime;
}

function startGame() {
    state = 'WAITING';
    gameArea.className = 'game-area waiting';
    icon.textContent = '...';
    message.textContent = 'Tunggu warna hijau...';
    subMessage.textContent = '';

    const delay = Math.floor(Math.random() * 3000) + 2000; // 2-5 seconds

    timeoutId = setTimeout(() => {
        state = 'READY';
        gameArea.className = 'game-area ready';
        icon.textContent = '⚡';
        message.textContent = 'KLIK SEKARANG!';
        startTime = performance.now();
    }, delay);
}

function handleEarlyClick() {
    clearTimeout(timeoutId);
    state = 'RESULT';
    gameArea.className = 'game-area result';
    icon.textContent = '⚠️';
    message.textContent = 'Terlalu cepat!';
    subMessage.textContent = 'Klik untuk mencoba lagi.';
}

function handleSuccessClick() {
    endTime = performance.now();
    const reactionTime = Math.round(endTime - startTime);
    state = 'RESULT';
    gameArea.className = 'game-area result';
    
    icon.textContent = '⏱️';
    message.textContent = `${reactionTime} ms`;
    subMessage.textContent = 'Klik untuk mencoba lagi.';

    if (reactionTime < bestTime) {
        bestTime = reactionTime;
        localStorage.setItem('reaction-best', bestTime);
        bestTimeEl.textContent = bestTime;
        subMessage.textContent = 'Rekor Baru! Klik untuk mencoba lagi.';
    }
}

gameArea.addEventListener('mousedown', (e) => {
    if (state === 'IDLE' || state === 'RESULT') {
        startGame();
    } else if (state === 'WAITING') {
        handleEarlyClick();
    } else if (state === 'READY') {
        handleSuccessClick();
    }
});
