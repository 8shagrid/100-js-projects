const bg = document.getElementById('bg');
const mercury = document.getElementById('mercury');
const tempVal = document.getElementById('temp-val');
const tempSlider = document.getElementById('temp-slider');
const tempNum = document.getElementById('temp-num');

function updateThermometer(value) {
    // Sync inputs
    tempSlider.value = value;
    tempNum.value = value;
    tempVal.textContent = value;

    // Calculate mercury height
    // Range is -20 to 100 (total range 120)
    const percentage = ((value - (-20)) / 120) * 100;
    mercury.style.height = `${percentage}%`;

    // Update Background Color based on Temperature
    // Freezing (-20): Blue (200 HSL)
    // Hot (100): Red (0 HSL)
    // We map -20...100 to 200...0 hue
    const hue = 200 - ((value - (-20)) / 120) * 200;
    bg.style.backgroundColor = `hsl(${hue}, 70%, 85%)`;

    // Also change mercury color slightly
    const mercuryHue = 10 - ((value - (-20)) / 120) * 40; // Small shift for red/orange
    // Wait, let's keep mercury consistent red but change intensity
    // mercury.style.background = `linear-gradient(to top, hsl(0, 100%, 40%), hsl(${hue}, 100%, 50%))`;
}

tempSlider.addEventListener('input', (e) => {
    updateThermometer(e.target.value);
});

tempNum.addEventListener('input', (e) => {
    let val = e.target.value;
    if (val > 100) val = 100;
    if (val < -20) val = -20;
    updateThermometer(val);
});

// Initial Render
updateThermometer(25);
