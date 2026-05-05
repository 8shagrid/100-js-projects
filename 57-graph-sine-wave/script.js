const canvas = document.getElementById('waveCanvas');
const ctx = canvas.getContext('2d');

const ampInput = document.getElementById('amplitude');
const freqInput = document.getElementById('frequency');
const speedInput = document.getElementById('speed');

const ampVal = document.getElementById('amp-val');
const freqVal = document.getElementById('freq-val');
const speedVal = document.getElementById('speed-val');

let amplitude = 50;
let frequency = 0.02;
let speed = 0.05;
let phase = 0;

function resize() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
}

window.addEventListener('resize', resize);
resize();

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#00ffcc';
    ctx.shadowBlur = 15;
    ctx.shadowColor = '#00ffcc';

    const centerY = canvas.height / 2;

    for (let x = 0; x < canvas.width; x++) {
        // Sine Wave Formula: y = A * sin(B * x + C)
        const y = centerY + amplitude * Math.sin(x * frequency + phase);
        
        if (x === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    }

    ctx.stroke();
    
    // Add a secondary thinner wave for aesthetic
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'rgba(0, 255, 204, 0.3)';
    ctx.shadowBlur = 0;
    for (let x = 0; x < canvas.width; x++) {
        const y = centerY + (amplitude * 0.5) * Math.sin(x * (frequency * 0.8) + phase * 0.5);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
    }
    ctx.stroke();

    phase -= speed; // Increment phase for movement
    requestAnimationFrame(animate);
}

// Input listeners
ampInput.addEventListener('input', (e) => {
    amplitude = parseFloat(e.target.value);
    ampVal.textContent = amplitude;
});

freqInput.addEventListener('input', (e) => {
    frequency = parseFloat(e.target.value);
    freqVal.textContent = frequency;
});

speedInput.addEventListener('input', (e) => {
    speed = parseFloat(e.target.value);
    speedVal.textContent = speed;
});

// Start animation
animate();
