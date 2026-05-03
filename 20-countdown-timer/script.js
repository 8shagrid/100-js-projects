const display = document.getElementById('display');
const minutesInput = document.getElementById('minutes-input');
const secondsInput = document.getElementById('seconds-input');
const startBtn = document.getElementById('start');
const pauseBtn = document.getElementById('pause');
const resetBtn = document.getElementById('reset');

let timer = null;
let totalSeconds = 0;
let isPaused = false;

// Web Audio API for alarm
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function playAlarm() {
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(880, audioCtx.currentTime); // A5 note

    gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
    gainNode.gain.linearRampToValueAtTime(1, audioCtx.currentTime + 0.1);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 1);

    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 1);
}

function updateDisplay() {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    const pad = (num) => String(num).padStart(2, '0');
    display.innerText = `${pad(mins)}:${pad(secs)}`;
}

startBtn.addEventListener('click', () => {
    if (timer) return;
    
    // Initial start
    if (!isPaused) {
        const mins = parseInt(minutesInput.value) || 0;
        const secs = parseInt(secondsInput.value) || 0;
        totalSeconds = (mins * 60) + secs;
        
        if (totalSeconds <= 0) {
            alert('Silakan tentukan waktu terlebih dahulu!');
            return;
        }
    }
    
    isPaused = false;
    updateDisplay();
    
    timer = setInterval(() => {
        totalSeconds--;
        updateDisplay();
        
        if (totalSeconds <= 0) {
            clearInterval(timer);
            timer = null;
            playAlarm();
            alert('Waktu habis! 🔔');
        }
    }, 1000);
    
    startBtn.disabled = true;
});

pauseBtn.addEventListener('click', () => {
    if (!timer) return;
    
    clearInterval(timer);
    timer = null;
    isPaused = true;
    startBtn.disabled = false;
});

resetBtn.addEventListener('click', () => {
    clearInterval(timer);
    timer = null;
    totalSeconds = 0;
    isPaused = false;
    updateDisplay();
    startBtn.disabled = false;
    minutesInput.value = 0;
    secondsInput.value = 0;
});
