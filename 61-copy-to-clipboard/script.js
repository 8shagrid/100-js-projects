const textInput = document.getElementById('text-input');
const copyBtn = document.getElementById('copy-btn');
const clearBtn = document.getElementById('clear-btn');
const toast = document.getElementById('toast');

function showToast(message) {
    toast.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 2500);
}

copyBtn.addEventListener('click', () => {
    const text = textInput.value;

    if (!text) {
        showToast('Teks kosong, tidak ada yang disalin!');
        return;
    }

    // Use Modern Clipboard API
    navigator.clipboard.writeText(text).then(() => {
        showToast('Berhasil disalin ke clipboard!');
        
        // Visual button feedback
        const originalText = copyBtn.querySelector('span').textContent;
        copyBtn.querySelector('span').textContent = 'Tersalin!';
        copyBtn.style.backgroundColor = '#10b981'; // Green success
        
        setTimeout(() => {
            copyBtn.querySelector('span').textContent = originalText;
            copyBtn.style.backgroundColor = ''; // Revert to CSS default
        }, 1500);
    }).catch(err => {
        console.error('Gagal menyalin:', err);
        showToast('Gagal menyalin teks.');
    });
});

clearBtn.addEventListener('click', () => {
    textInput.value = '';
    textInput.focus();
});
