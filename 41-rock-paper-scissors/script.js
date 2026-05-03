const userScoreEl = document.getElementById('user-score');
const compScoreEl = document.getElementById('comp-score');
const resultText = document.getElementById('result-text');
const userIcon = document.getElementById('user-choice-icon');
const compIcon = document.getElementById('comp-choice-icon');
const choiceButtons = document.querySelectorAll('.choice-btn');
const resetBtn = document.getElementById('reset-btn');

let userScore = 0;
let compScore = 0;

const choices = {
    rock: '🪨',
    paper: '📄',
    scissors: '✂️'
};

function getComputerChoice() {
    const keys = Object.keys(choices);
    return keys[Math.floor(Math.random() * keys.length)];
}

function play(userChoice) {
    const compChoice = getComputerChoice();
    
    // Update Icons
    userIcon.textContent = choices[userChoice];
    compIcon.textContent = choices[compChoice];
    
    // Animate
    userIcon.style.transform = 'scale(1.2)';
    compIcon.style.transform = 'scale(1.2)';
    setTimeout(() => {
        userIcon.style.transform = 'scale(1)';
        compIcon.style.transform = 'scale(1)';
    }, 200);

    // Determine Winner
    if (userChoice === compChoice) {
        updateResult('draw', 'Seri! 🤝');
    } else if (
        (userChoice === 'rock' && compChoice === 'scissors') ||
        (userChoice === 'paper' && compChoice === 'rock') ||
        (userChoice === 'scissors' && compChoice === 'paper')
    ) {
        userScore++;
        updateResult('win', 'Anda Menang! 🎉');
    } else {
        compScore++;
        updateResult('loss', 'Komputer Menang! 🤖');
    }

    // Update Score UI
    userScoreEl.textContent = userScore;
    compScoreEl.textContent = compScore;
}

function updateResult(type, message) {
    resultText.textContent = message;
    resultText.className = 'result-display ' + type;
}

choiceButtons.forEach(button => {
    button.addEventListener('click', () => {
        play(button.dataset.choice);
    });
});

resetBtn.addEventListener('click', () => {
    userScore = 0;
    compScore = 0;
    userScoreEl.textContent = '0';
    compScoreEl.textContent = '0';
    resultText.textContent = 'Skor direset. Pilih lagi!';
    resultText.className = 'result-display';
    userIcon.textContent = '?';
    compIcon.textContent = '?';
});
