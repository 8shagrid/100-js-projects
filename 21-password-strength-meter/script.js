const passwordInput = document.getElementById('password');
const strengthBar = document.getElementById('strength-bar');
const strengthText = document.getElementById('strength-text');

passwordInput.addEventListener('input', () => {
    const val = passwordInput.value;
    const score = checkStrength(val);
    updateUI(score, val.length);
});

function checkStrength(password) {
    let score = 0;
    
    if (password.length > 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    
    return score;
}

function updateUI(score, length) {
    if (length === 0) {
        strengthBar.style.width = '0%';
        strengthText.innerText = 'Berikan masukan...';
        strengthText.style.color = '#7f8c8d';
        return;
    }

    const levels = [
        { label: 'Sangat Lemah', color: '#e74c3c', width: '25%' },
        { label: 'Lemah', color: '#e74c3c', width: '25%' },
        { label: 'Cukup', color: '#f1c40f', width: '50%' },
        { label: 'Baik', color: '#3498db', width: '75%' },
        { label: 'Sangat Kuat', color: '#2ecc71', width: '100%'}
    ];
    
    // Adjust score 1 to show as weak
    const level = levels[score];
    
    strengthBar.style.width = level.width;
    strengthBar.style.backgroundColor = level.color;
    strengthText.innerText = level.label;
    strengthText.style.color = level.color;
}
