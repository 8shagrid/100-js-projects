const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');
const scoreVal = document.getElementById('score-val');
const finalScore = document.getElementById('final-score');
const startScreen = document.getElementById('start-screen');
const gameOverScreen = document.getElementById('game-over');
const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');

// Game constants
const gravity = 0.25;
const jump = -4.5;
const pipeWidth = 50;
const pipeGap = 120;
const pipeSpeed = 2;

// Game state
let bird = { x: 50, y: 150, w: 34, h: 24, velocity: 0 };
let pipes = [];
let score = 0;
let gameRunning = false;
let frameCount = 0;

function resetGame() {
    bird.y = 150;
    bird.velocity = 0;
    pipes = [];
    score = 0;
    frameCount = 0;
    scoreVal.textContent = '0';
    gameOverScreen.style.display = 'none';
    startScreen.style.display = 'none';
    gameRunning = true;
    requestAnimationFrame(update);
}

function update() {
    if (!gameRunning) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Bird physics
    bird.velocity += gravity;
    bird.y += bird.velocity;

    // Draw Bird (Simplified)
    ctx.fillStyle = "#f1c40f";
    ctx.beginPath();
    ctx.arc(bird.x + bird.w/2, bird.y + bird.h/2, 12, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#000";
    ctx.stroke();

    // Pipe logic
    if (frameCount % 100 === 0) {
        let h = Math.random() * (canvas.height - pipeGap - 100) + 50;
        pipes.push({ x: canvas.width, top: h, bottom: canvas.height - h - pipeGap });
    }

    pipes.forEach((p, index) => {
        p.x -= pipeSpeed;

        // Draw Top Pipe
        ctx.fillStyle = "#2ecc71";
        ctx.fillRect(p.x, 0, pipeWidth, p.top);
        ctx.strokeRect(p.x, 0, pipeWidth, p.top);

        // Draw Bottom Pipe
        ctx.fillRect(p.x, canvas.height - p.bottom, pipeWidth, p.bottom);
        ctx.strokeRect(p.x, canvas.height - p.bottom, pipeWidth, p.bottom);

        // Collision detection
        if (bird.x + bird.w > p.x && bird.x < p.x + pipeWidth) {
            if (bird.y < p.top || bird.y + bird.h > canvas.height - p.bottom) {
                gameOver();
            }
        }

        // Score logic
        if (p.x + pipeWidth === bird.x) {
            score++;
            scoreVal.textContent = score;
        }

        // Remove old pipes
        if (p.x + pipeWidth < 0) {
            pipes.splice(index, 1);
        }
    });

    // Boundary collision
    if (bird.y + bird.h > canvas.height || bird.y < 0) {
        gameOver();
    }

    frameCount++;
    requestAnimationFrame(update);
}

function gameOver() {
    gameRunning = false;
    finalScore.textContent = score;
    gameOverScreen.style.display = 'flex';
}

function handleInput() {
    if (gameRunning) {
        bird.velocity = jump;
    }
}

window.addEventListener('keydown', (e) => {
    if (e.code === 'Space') handleInput();
});

canvas.addEventListener('click', handleInput);
startBtn.addEventListener('click', resetGame);
restartBtn.addEventListener('click', resetGame);
