const form = document.getElementById('bubble-form');
const chart = document.getElementById('chart');
const dataList = document.getElementById('data-list');
const tooltip = document.getElementById('tooltip');

let bubbles = JSON.parse(localStorage.getItem('bubbles-data')) || [
    { label: 'Startup A', x: 20, y: 30, size: 40 },
    { label: 'Company B', x: 60, y: 80, size: 70 },
    { label: 'Agency C', x: 80, y: 20, size: 30 }
];

const colors = ['#6366f1', '#22c55e', '#f59e0b', '#ec4899', '#06b6d4', '#8b5cf6'];

function updateUI() {
    localStorage.setItem('bubbles-data', JSON.stringify(bubbles));
    renderList();
    renderChart();
}

function renderList() {
    dataList.innerHTML = '';
    bubbles.forEach((b, index) => {
        const color = colors[index % colors.length];
        const item = document.createElement('div');
        item.classList.add('data-item');
        item.innerHTML = `
            <div style="display: flex; align-items: center; gap: 10px;">
                <div style="width: 12px; height: 12px; border-radius: 3px; background: ${color}"></div>
                <span>${b.label} <small style="color: #94a3b8;">(${b.x}, ${b.y})</small></span>
            </div>
            <button onclick="deleteBubble(${index})">&times;</button>
        `;
        dataList.appendChild(item);
    });
}

function renderChart() {
    // Clear previous bubbles (keep the axis lines)
    const existingBubbles = chart.querySelectorAll('.bubble-group');
    existingBubbles.forEach(e => e.remove());

    bubbles.forEach((b, index) => {
        const color = colors[index % colors.length];
        
        // SVG coordinates (0-100 mapped to 0-500)
        // Note: SVG Y increases downwards, so we subtract from 500
        const cx = b.x * 5;
        const cy = 500 - (b.y * 5);
        const r = b.size / 2;

        const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        group.classList.add('bubble-group');

        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', cx);
        circle.setAttribute('cy', cy);
        circle.setAttribute('r', r);
        circle.setAttribute('fill', color);
        circle.classList.add('bubble');


        // Tooltip logic
        circle.addEventListener('mousemove', (e) => {
            tooltip.style.display = 'block';
            tooltip.style.left = e.clientX + 20 + 'px';
            tooltip.style.top = e.clientY + 20 + 'px';
            tooltip.innerHTML = `
                <strong>${b.label}</strong>
                <span>X: ${b.x} unit</span><br>
                <span>Y: ${b.y} unit</span><br>
                <span>Size: ${b.size} px</span>
            `;
        });

        circle.addEventListener('mouseleave', () => {
            tooltip.style.display = 'none';
        });

        group.appendChild(circle);
        chart.appendChild(group);
    });
}

function deleteBubble(index) {
    bubbles.splice(index, 1);
    updateUI();
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const label = document.getElementById('label').value;
    const x = parseInt(document.getElementById('pos-x').value);
    const y = parseInt(document.getElementById('pos-y').value);
    const size = parseInt(document.getElementById('size').value);

    bubbles.push({ label, x, y, size });
    form.reset();
    updateUI();
});

// Initial Render
updateUI();
