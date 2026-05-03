const display = document.getElementById('display');
const startBtn = document.getElementById('start');
const stopBtn = document.getElementById('stop');
const resetBtn = document.getElementById('reset');

let timer = null;
let startTime = 0;
let elapsedTime = 0;

function formatTime(ms) {
    const hours = Math.floor(ms / 3600000);
    const minutes = Math.floor((ms % 3600000) / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const centiseconds = Math.floor((ms % 1000) / 10);
    
    const pad = (num) => String(num).padStart(2, '0');
    
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}:${pad(centiseconds)}`;
}

function updateDisplay() {
    const currentTime = Date.now();
    const totalElapsed = elapsedTime + (currentTime - startTime);
    display.innerText = formatTime(totalElapsed);
}

startBtn.addEventListener('click', () => {
    if (timer) return;
    
    startTime = Date.now();
    timer = setInterval(updateDisplay, 10);
    
    startBtn.disabled = true;
    startBtn.style.opacity = '0.5';
});

stopBtn.addEventListener('click', () => {
    if (!timer) return;
    
    clearInterval(timer);
    timer = null;
    elapsedTime += (Date.now() - startTime);
    
    startBtn.disabled = false;
    startBtn.style.opacity = '1';
});

resetBtn.addEventListener('click', () => {
    clearInterval(timer);
    timer = null;
    startTime = 0;
    elapsedTime = 0;
    display.innerText = '00:00:00:00';
    
    startBtn.disabled = false;
    startBtn.style.opacity = '1';
});
