const textarea = document.getElementById('textarea');
const wordCountDisplay = document.getElementById('word-count');
const charCountDisplay = document.getElementById('char-count');

textarea.addEventListener('input', () => {
    updateStats();
});

function updateStats() {
    const text = textarea.value.trim();
    
    // Word counting logic: split by whitespace and filter empty strings
    const words = text === '' ? [] : text.split(/\s+/);
    const wordCount = words.length;
    
    // Character counting logic: total including spaces
    const charCount = textarea.value.length;
    
    wordCountDisplay.innerText = wordCount;
    charCountDisplay.innerText = charCount;
}
