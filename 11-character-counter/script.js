const textarea = document.getElementById('textarea');
const totalCounter = document.getElementById('total-counter');
const remainingCounter = document.getElementById('remaining-counter');

textarea.addEventListener('input', () => {
    updateCounter();
});

function updateCounter() {
    const totalChars = textarea.value.length;
    const limit = textarea.getAttribute('maxlength');
    const remainingChars = limit - totalChars;

    totalCounter.innerText = totalChars;
    remainingCounter.innerText = remainingChars;
}
