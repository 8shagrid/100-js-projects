const passwordInput = document.getElementById('password');
const toggleBtn = document.getElementById('toggle');

toggleBtn.addEventListener('click', () => {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    
    toggleBtn.innerText = type === 'password' ? 'Show' : 'Hide';
});
