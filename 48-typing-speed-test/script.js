const typingArea = document.getElementById('typing-area');
const inputField = document.getElementById('input-field');
const timerEl = document.getElementById('timer');
const wpmEl = document.getElementById('wpm');
const accuracyEl = document.getElementById('accuracy');
const restartBtn = document.getElementById('restart-btn');

const paragraphs = [
    "JavaScript adalah bahasa pemrograman tingkat tinggi dan dinamis. JavaScript populer digunakan di web, bersama dengan HTML dan CSS. Bahasa ini mendukung pemrograman berorientasi objek, imperatif, dan fungsional.",
    "Kemampuan mengetik cepat sangat berguna di era digital saat ini. Latihan yang konsisten akan meningkatkan kecepatan dan akurasi Anda secara signifikan dalam jangka panjang.",
    "The quick brown fox jumps over the lazy dog. Programming is the art of telling another human what one wants the computer to do. Clean code always looks like it was written by someone who cares.",
    "Web development involves many different technologies. React, Vue, and Angular are popular frameworks for building modern user interfaces that are fast and interactive."
];

let timer;
let timeLeft = 60;
let charIndex = 0;
let errors = 0;
let isTyping = false;

function loadParagraph() {
    const ranIndex = Math.floor(Math.random() * paragraphs.length);
    let html = "";
    paragraphs[ranIndex].split("").forEach(char => {
        html += `<span>${char}</span>`;
    });
    typingArea.innerHTML = html;
    typingArea.querySelectorAll("span")[0].classList.add("active");
    
    // Reset internal state
    inputField.value = "";
    charIndex = 0;
    errors = 0;
    
    // Force focus
    setTimeout(() => inputField.focus(), 0);
}

function initTyping() {
    const characters = typingArea.querySelectorAll("span");
    let typedChar = inputField.value.split("")[charIndex];

    if (charIndex < characters.length && timeLeft > 0) {
        if (!isTyping) {
            timer = setInterval(initTimer, 1000);
            isTyping = true;
        }

        // Handle Backspace (detected by typedChar being undefined/null when value length decreases)
        if (typedChar == null) {
            if (charIndex > 0) {
                charIndex--;
                if (characters[charIndex].classList.contains("incorrect")) {
                    errors--;
                }
                characters[charIndex].classList.remove("correct", "incorrect");
            }
        } else {
            if (characters[charIndex].innerText === typedChar) {
                characters[charIndex].classList.add("correct");
            } else {
                errors++;
                characters[charIndex].classList.add("incorrect");
            }
            charIndex++;
        }

        characters.forEach(span => span.classList.remove("active"));
        if (charIndex < characters.length) {
            characters[charIndex].classList.add("active");
        }

        // Stats calculation
        let wpm = Math.round(((charIndex - errors) / 5) / ((60 - timeLeft) / 60));
        wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;
        wpmEl.innerText = wpm;

        let accuracy = charIndex > 0 ? Math.round(((charIndex - errors) / charIndex) * 100) : 0;
        accuracyEl.innerText = `${accuracy}%`;
    } else {
        clearInterval(timer);
    }
}

function initTimer() {
    if (timeLeft > 0) {
        timeLeft--;
        timerEl.innerText = `${timeLeft}s`;
    } else {
        clearInterval(timer);
        inputField.disabled = true; // Disable input when time is up
    }
}

function resetGame() {
    clearInterval(timer);
    timeLeft = 60;
    charIndex = 0;
    errors = 0;
    isTyping = false;
    inputField.value = "";
    inputField.disabled = false;
    timerEl.innerText = `${timeLeft}s`;
    wpmEl.innerText = 0;
    accuracyEl.innerText = "0%";
    loadParagraph();
}

// Event Listeners
document.addEventListener("click", () => inputField.focus());
inputField.addEventListener("input", initTyping);
restartBtn.addEventListener("click", resetGame);

// Load initial paragraph
loadParagraph();
