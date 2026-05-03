const tooltip = document.getElementById('tooltip');
const iconItems = document.querySelectorAll('.icon-item');

iconItems.forEach(item => {
    item.addEventListener('mouseenter', e => {
        const text = item.getAttribute('data-tooltip');
        tooltip.innerText = text;
        tooltip.classList.add('show');
        positionTooltip(item);
    });

    item.addEventListener('mouseleave', () => {
        tooltip.classList.remove('show');
    });

    item.addEventListener('mousemove', () => {
        positionTooltip(item);
    });
});

function positionTooltip(element) {
    const rect = element.getBoundingClientRect();
    const tooltipRect = tooltip.getBoundingClientRect();
    
    // Position tooltip above the center of the icon
    const left = rect.left + (rect.width / 2) - (tooltipRect.width / 2);
    const top = rect.top - tooltipRect.height - 10;
    
    tooltip.style.left = `${left + window.scrollX}px`;
    tooltip.style.top = `${top + window.scrollY}px`;
}
