const shareBtn = document.getElementById('share-btn');
const statusMsg = document.getElementById('status');

// Elements
const titleInput = document.getElementById('share-title');
const textInput = document.getElementById('share-text');
const urlInput = document.getElementById('share-url');

function setStatus(msg, type = 'info') {
    statusMsg.textContent = msg;
    statusMsg.className = `status-msg ${type}`;
    statusMsg.style.display = 'block';
}

// Check for Support
if (!navigator.share) {
    shareBtn.disabled = true;
    shareBtn.style.opacity = '0.5';
    shareBtn.style.cursor = 'not-allowed';
    setStatus('Web Share API tidak didukung di browser ini. Silakan coba di perangkat mobile.', 'error');
}

shareBtn.addEventListener('click', async () => {
    const shareData = {
        title: titleInput.value,
        text: textInput.value,
        url: urlInput.value
    };

    try {
        await navigator.share(shareData);
        setStatus('Berhasil dibagikan!', 'info');
        
        // Hide success message after 3 seconds
        setTimeout(() => {
            statusMsg.style.display = 'none';
        }, 3000);
    } catch (err) {
        // AbortError happens if user cancels the share sheet
        if (err.name !== 'AbortError') {
            console.error('Sharing failed:', err);
            setStatus('Gagal membagikan konten.', 'error');
        }
    }
});
