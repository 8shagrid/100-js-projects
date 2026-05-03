const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('#score');
const timerDisplay = document.querySelector('#timer');
const moles = document.querySelectorAll('.mole');
const startBtn = document.querySelector('#start-btn');

let lastHole;
let timeUp = false;
let score = 0;
let timeLeft = 30;
let timerId;

function randomTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function randomHole(holes) {
    const idx = Math.floor(Math.random() * holes.length);
    const hole = holes[idx];
    if (hole === lastHole) {
        return randomHole(holes);
    }
    lastHole = hole;
    return hole;
}

function peep() {
    const time = randomTime(500, 1000);
    const hole = randomHole(holes);
    hole.classList.add('up');
    setTimeout(() => {
        hole.classList.remove('up');
        if (!timeUp) peep();
    }, time);
}

function startGame() {
    score = 0;
    timeLeft = 30;
    scoreBoard.textContent = 0;
    timerDisplay.textContent = timeLeft;
    timeUp = false;
    startBtn.disabled = true;

    peep();
    
    timerId = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timerId);
            timeUp = true;
            startBtn.disabled = false;
            alert(`Game Over! Skor akhir Anda: ${score}`);
        }
    }, 1000);
}

function whack(e) {
    if (!e.isTrusted) return; // Prevent cheaters
    score++;
    this.parentNode.classList.remove('up');
    scoreBoard.textContent = score;
}

moles.forEach(mole => mole.addEventListener('click', whack));
startBtn.addEventListener('click', startGame);
