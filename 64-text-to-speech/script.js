const textInput = document.getElementById('text-input');
const voiceSelect = document.getElementById('voice-select');
const rateInput = document.getElementById('rate');
const pitchInput = document.getElementById('pitch');
const speakBtn = document.getElementById('speak-btn');
const stopBtn = document.getElementById('stop-btn');

const rateVal = document.getElementById('rate-val');
const pitchVal = document.getElementById('pitch-val');

const synth = window.speechSynthesis;
let voices = [];

function populateVoiceList() {
    voices = synth.getVoices();
    
    voiceSelect.innerHTML = '';
    voices.forEach((voice, i) => {
        const option = document.createElement('option');
        option.textContent = `${voice.name} (${voice.lang})`;
        
        if (voice.default) {
            option.textContent += ' -- DEFAULT';
        }

        option.setAttribute('data-lang', voice.lang);
        option.setAttribute('data-name', voice.name);
        voiceSelect.appendChild(option);
    });
}

// Voices are loaded asynchronously
if (synth.onvoiceschanged !== undefined) {
    synth.onvoiceschanged = populateVoiceList;
}

function speak() {
    if (synth.speaking) {
        console.error('Masih ada pembicaraan berlangsung...');
        return;
    }

    if (textInput.value !== '') {
        const utterThis = new SpeechSynthesisUtterance(textInput.value);
        
        const selectedOption = voiceSelect.selectedOptions[0].getAttribute('data-name');
        voices.forEach(voice => {
            if (voice.name === selectedOption) {
                utterThis.voice = voice;
            }
        });

        utterThis.rate = rateInput.value;
        utterThis.pitch = pitchInput.value;

        utterThis.onstart = () => {
            speakBtn.disabled = true;
            speakBtn.textContent = 'Bercakap...';
        };

        utterThis.onend = () => {
            speakBtn.disabled = false;
            speakBtn.textContent = 'Dengarkan';
        };

        synth.speak(utterThis);
    }
}

// Event Listeners
speakBtn.addEventListener('click', speak);

stopBtn.addEventListener('click', () => {
    synth.cancel();
    speakBtn.disabled = false;
    speakBtn.textContent = 'Dengarkan';
});

rateInput.addEventListener('input', () => {
    rateVal.textContent = rateInput.value;
});

pitchInput.addEventListener('input', () => {
    pitchVal.textContent = pitchInput.value;
});

// Initial call for voices
populateVoiceList();
