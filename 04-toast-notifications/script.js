const toastContainer = document.getElementById('toast-container');

function showToast(type, message) {
    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    // Create inner content
    toast.innerHTML = `
        <span class="toast-message">${message}</span>
        <button class="toast-close" onclick="removeToast(this.parentElement)">&times;</button>
        <div class="toast-progress">
            <div class="toast-progress-fill"></div>
        </div>
    `;

    // Append to container
    toastContainer.appendChild(toast);

    // Auto remove after 5 seconds
    const timeout = setTimeout(() => {
        removeToast(toast);
    }, 5000);

    // Store timeout ID to clear it if manually closed
    toast.dataset.timeoutId = timeout;
}

function removeToast(toast) {
    if (toast.classList.contains('hiding')) return;
    
    // Clear auto-dismiss timeout
    if (toast.dataset.timeoutId) {
        clearTimeout(parseInt(toast.dataset.timeoutId));
    }

    // Add hiding class for animation
    toast.classList.add('hiding');

    // Remove from DOM after animation finishes
    toast.addEventListener('animationend', () => {
        toast.remove();
    });
}
