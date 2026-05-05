const circle = document.getElementById('progress-circle');
const percentText = document.getElementById('percent-text');
const slider = document.getElementById('progress-slider');

const radius = circle.r.baseVal.value;
const circumference = 2 * Math.PI * radius;

// Initial Setup
circle.style.strokeDasharray = `${circumference} ${circumference}`;
circle.style.strokeDashoffset = circumference;

function setProgress(percent) {
    const offset = circumference - (percent / 100) * circumference;
    circle.style.strokeDashoffset = offset;
    percentText.textContent = percent;
}

slider.addEventListener('input', (e) => {
    setProgress(e.target.value);
});

// Initial Render
setTimeout(() => {
    setProgress(slider.value);
}, 100);
