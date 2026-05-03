const generateBtn = document.getElementById('generate');
const copyBtn = document.getElementById('copy');
const colorBox = document.getElementById('color-box');
const hexText = document.getElementById('hex-code');

function generateRandomColor() {
    const chars = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += chars[Math.floor(Math.random() * 16)];
    }
    return color;
}

function updateColor() {
    const newColor = generateRandomColor();
    colorBox.style.backgroundColor = newColor;
    hexText.innerText = newColor;
    // Optional: Update body background subtly or fully
    // document.body.style.backgroundColor = newColor + '22'; // Very light
}

generateBtn.addEventListener('click', updateColor);

copyBtn.addEventListener('click', () => {
    const textToCopy = hexText.innerText;
    navigator.clipboard.writeText(textToCopy).then(() => {
        const originalText = copyBtn.innerText;
        copyBtn.innerText = 'Copied!';
        setTimeout(() => {
            copyBtn.innerText = originalText;
        }, 1500);
    });
});

// Initial color
updateColor();
