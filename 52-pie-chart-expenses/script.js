const form = document.getElementById('expense-form');
const categoryInput = document.getElementById('category');
const amountInput = document.getElementById('amount');
const expenseList = document.getElementById('expense-list');
const totalAmountEl = document.getElementById('total-amount');
const pieChart = document.getElementById('pie-chart');
const legend = document.getElementById('legend');
const emptyMsg = document.getElementById('empty-msg');

let expenses = JSON.parse(localStorage.getItem('expenses-pie')) || [];

const colors = ['#4a90e2', '#2ecc71', '#f1c40f', '#e67e22', '#e74c3c', '#9b59b6', '#34495e', '#16a085'];

function updateUI() {
    // Save
    localStorage.setItem('expenses-pie', JSON.stringify(expenses));

    // List
    expenseList.innerHTML = '';
    let total = 0;
    expenses.forEach((ex, index) => {
        total += ex.amount;
        const div = document.createElement('div');
        div.classList.add('expense-item');
        div.innerHTML = `
            <span>${ex.category}</span>
            <span>Rp ${ex.amount.toLocaleString()} <button onclick="deleteExpense(${index})" style="background:none; color:#e74c3c; padding:0; margin-left:10px;">&times;</button></span>
        `;
        expenseList.appendChild(div);
    });

    totalAmountEl.textContent = `Rp ${total.toLocaleString()}`;

    // Chart
    renderChart(total);
}

function renderChart(total) {
    pieChart.innerHTML = '';
    legend.innerHTML = '';
    
    if (expenses.length === 0) {
        emptyMsg.style.display = 'block';
        return;
    }
    emptyMsg.style.display = 'none';

    let cumulativePercentage = 0;
    const radius = 16;
    const circumference = 2 * Math.PI * radius;

    expenses.forEach((ex, index) => {
        const percentage = (ex.amount / total) * 100;
        const color = colors[index % colors.length];

        // Create SVG segment
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', '50');
        circle.setAttribute('cy', '50');
        circle.setAttribute('r', radius);
        circle.setAttribute('stroke', color);
        circle.setAttribute('stroke-dasharray', `${circumference} ${circumference}`);
        
        const offset = circumference - (percentage / 100) * circumference;
        const rotationOffset = (cumulativePercentage / 100) * circumference;
        
        circle.setAttribute('stroke-dashoffset', offset);
        circle.style.transform = `rotate(${(cumulativePercentage / 100) * 360}deg)`;
        circle.style.transformOrigin = '50px 50px';

        pieChart.appendChild(circle);

        // Add Legend
        const legendItem = document.createElement('div');
        legendItem.classList.add('legend-item');
        legendItem.innerHTML = `
            <div class="color-box" style="background: ${color}"></div>
            <span>${ex.category} (${Math.round(percentage)}%)</span>
        `;
        legend.appendChild(legendItem);

        cumulativePercentage += percentage;
    });
}

function deleteExpense(index) {
    expenses.splice(index, 1);
    updateUI();
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const category = categoryInput.value;
    const amount = parseFloat(amountInput.value);

    if (category && amount) {
        expenses.push({ category, amount });
        categoryInput.value = '';
        amountInput.value = '';
        updateUI();
    }
});

// Initial
updateUI();
