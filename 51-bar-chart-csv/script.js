const csvInput = document.getElementById('csv-input');
const generateBtn = document.getElementById('generate-btn');
const chart = document.getElementById('chart');

function generateChart() {
    const data = parseCSV(csvInput.value);
    renderChart(data);
}

function parseCSV(csvText) {
    const lines = csvText.trim().split('\n');
    return lines.map(line => {
        const parts = line.split(',');
        if (parts.length < 2) return null;
        return {
            label: parts[0].trim(),
            value: parseFloat(parts[1].trim())
        };
    }).filter(item => item !== null && !isNaN(item.value));
}

function renderChart(data) {
    chart.innerHTML = '';
    
    if (data.length === 0) {
        chart.innerHTML = '<p style="align-self: center; color: #e74c3c;">Format data tidak valid. Gunakan: Label, Nilai</p>';
        return;
    }

    const maxValue = Math.max(...data.map(d => d.value));

    data.forEach(item => {
        const heightPercent = (item.value / maxValue) * 100;
        
        const wrapper = document.createElement('div');
        wrapper.classList.add('bar-wrapper');

        const bar = document.createElement('div');
        bar.classList.add('bar');
        bar.style.height = '0%'; // Start from 0 for animation
        
        const valueSpan = document.createElement('span');
        valueSpan.classList.add('bar-value');
        valueSpan.textContent = item.value;

        const labelSpan = document.createElement('span');
        labelSpan.classList.add('bar-label');
        labelSpan.textContent = item.label;

        bar.appendChild(valueSpan);
        bar.appendChild(labelSpan);
        wrapper.appendChild(bar);
        chart.appendChild(wrapper);

        // Trigger animation
        setTimeout(() => {
            bar.style.height = `${heightPercent}%`;
        }, 50);
    });
}

generateBtn.addEventListener('click', generateChart);

// Initial Render
generateChart();
