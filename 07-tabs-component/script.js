const tabBtns = document.querySelectorAll('.tab-btn');
const tabPanes = document.querySelectorAll('.tab-pane');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        tabBtns.forEach(b => b.classList.remove('active'));
        tabPanes.forEach(p => p.classList.remove('active'));

        btn.classList.add('active');

        const target = btn.getAttribute('data-target');
        const targetPane = document.getElementById(target);
        if (targetPane) {
            targetPane.classList.add('active');
        }
    });
});
