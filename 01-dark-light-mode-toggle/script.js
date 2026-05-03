const toggle = document.getElementById('themeToggle');
const body = document.body;

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    body.classList.add('dark');
    toggle.checked = true;
} else {
    body.classList.remove('dark');
    toggle.checked = false;
}

toggle.addEventListener('change', () => {
    if (toggle.checked) {
        body.classList.add('dark');
        localStorage.setItem('theme', 'dark');
    } else {
        body.classList.remove('dark');
        localStorage.setItem('theme', 'light');
    }
});

