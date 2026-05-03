const hexInput = document.getElementById('hex-input');
const rgbResult = document.getElementById('rgb-result');
const preview = document.getElementById('preview');

hexInput.addEventListener('input', () => {
    let hex = hexInput.value;
    if (hex.charAt(0) !== '#') {
        hex = '#' + hex;
    }
    
    if (isValidHex(hex)) {
        const rgb = hexToRgb(hex);
        rgbResult.innerText = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
        preview.style.backgroundColor = hex;
    } else {
        rgbResult.innerText = 'Invalid Hex Code';
        preview.style.backgroundColor = '#ddd';
    }
});

function isValidHex(hex) {
    return /^#([A-Fa-f0-9]{3}){1,2}$/.test(hex);
}

function hexToRgb(hex) {
    let r = 0, g = 0, b = 0;
    
    // Sorthand hex (#ABC)
    if (hex.length === 4) {
        r = parseInt(hex[1] + hex[1], 16);
        g = parseInt(hex[2] + hex[2], 16);
        b = parseInt(hex[3] + hex[3], 16);
    } 
    // Standard hex (#AABBCC)
    else if (hex.length === 7) {
        r = parseInt(hex.substring(1, 3), 16);
        g = parseInt(hex.substring(3, 5), 16);
        b = parseInt(hex.substring(5, 7), 16);
    }
    
    return { r, g, b };
}
