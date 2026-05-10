const startBtn = document.getElementById('start-btn');
const status = document.getElementById('status');
const outputText = document.getElementById('output-text');
const copyBtn = document.getElementById('copy-btn');
const clearBtn = document.getElementById('clear-btn');

// Check for Speech Recognition support
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (!SpeechRecognition) {
    startBtn.disabled = true;
    status.textContent = 'Browser Anda tidak mendukung Speech Recognition (Gunakan Chrome/Edge).';
    status.style.color = '#ef4444';
} else {
    const recognition = new SpeechRecognition();
    recognition.continuous = false; // Set to false for better stability in some environments
    recognition.interimResults = true;
    recognition.lang = 'id-ID';

    let isListening = false;

    recognition.onstart = () => {
        console.log('Voice recognition started');
        isListening = true;
        startBtn.classList.add('active');
        status.textContent = 'Mendengarkan... Silakan bicara';
        status.style.color = '#a855f7';
    };

    recognition.onresult = (event) => {
        const transcript = Array.from(event.results)
            .map(result => result[0])
            .map(result => result.transcript)
            .join('');

        outputText.value = transcript;
        console.log('Transcript:', transcript);
    };

    recognition.onerror = (event) => {
        console.error('Speech Recognition Error:', event.error);
        if (event.error === 'not-allowed') {
            status.textContent = 'Izin mikrofon ditolak.';
        } else {
            status.textContent = 'Error: ' + event.error;
        }
        stopListening();
    };

    recognition.onend = () => {
        console.log('Voice recognition ended');
        stopListening();
    };

    function stopListening() {
        isListening = false;
        startBtn.classList.remove('active');
        status.textContent = 'Klik mikrofon untuk bicara';
        status.style.color = '#94a3b8';
    }

    startBtn.addEventListener('click', () => {
        if (isListening) {
            recognition.stop();
        } else {
            try {
                recognition.start();
            } catch (e) {
                console.error('Start error:', e);
            }
        }
    });
}

// Utility Functions
copyBtn.addEventListener('click', () => {
    if (!outputText.value) return;
    navigator.clipboard.writeText(outputText.value).then(() => {
        const originalText = copyBtn.textContent;
        copyBtn.textContent = 'Tersalin!';
        setTimeout(() => copyBtn.textContent = originalText, 2000);
    });
});

clearBtn.addEventListener('click', () => {
    outputText.value = '';
});
