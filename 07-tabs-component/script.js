const tabBtns = document.querySelectorAll('.tab-btn');
const tabPanes = document.querySelectorAll('.tab-pane');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons and panes
        tabBtns.forEach(b => b.classList.remove('active'));
        tabPanes.forEach(p => p.classList.remove('active'));

        // Add active class to current button
        btn.classList.add('active');

        // Show matching content pane
        const target = btn.getAttribute('data-target');
        const targetPane = document.getElementById(target);
        if (targetPane) {
            targetPane.classList.add('active');
        }
    });
});
