const qrInput = document.getElementById('qr-input');
const qrDisplay = document.getElementById('qr-display');
const generateBtn = document.getElementById('generate-btn');
const downloadBtn = document.getElementById('download-btn');

let qrcode = new QRCode(qrDisplay, {
    width: 200,
    height: 200,
    colorDark: "#000000",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H
});

function generateQR() {
    const text = qrInput.value.trim();
    
    if (text) {
        qrcode.clear();
        qrcode.makeCode(text);
        
        // Enable download button after QR is generated
        // We wait a tiny bit to ensure the canvas/img is rendered
        setTimeout(() => {
            downloadBtn.disabled = false;
        }, 100);
    } else {
        alert('Silakan masukkan teks atau URL terlebih dahulu.');
    }
}

function downloadQR() {
    const qrImg = qrDisplay.querySelector('img');
    const qrCanvas = qrDisplay.querySelector('canvas');
    
    if (qrImg && qrImg.src) {
        // Preference for img src (dataURL)
        const link = document.createElement('a');
        link.href = qrImg.src;
        link.download = `qrcode-${Date.now()}.png`;
        link.click();
    } else if (qrCanvas) {
        // Fallback for canvas
        const link = document.createElement('a');
        link.href = qrCanvas.toDataURL("image/png");
        link.download = `qrcode-${Date.now()}.png`;
        link.click();
    }
}

generateBtn.addEventListener('click', generateQR);

qrInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        generateQR();
    }
});

downloadBtn.addEventListener('click', downloadQR);

// Initial placeholder
qrcode.makeCode("https://github.com");
downloadBtn.disabled = false;
