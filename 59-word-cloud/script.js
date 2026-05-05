const textInput = document.getElementById('text-input');
const generateBtn = document.getElementById('generate-btn');
const cloud = document.getElementById('cloud');

const colors = ['#2563eb', '#7c3aed', '#db2777', '#dc2626', '#ea580c', '#16a34a', '#0891b2'];
const stopWords = ['dan', 'yang', 'di', 'ke', 'dari', 'untuk', 'pada', 'dengan', 'adalah', 'itu', 'ini', 'juga', 'dalam', 'sebagai', 'serta', 'the', 'and', 'to', 'of', 'in', 'is', 'it'];

function generateCloud() {
    const text = textInput.value;
    if (!text.trim()) return;

    const words = processText(text);
    renderCloud(words);
}

function processText(text) {
    // Clean and split
    const cleanText = text.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
    const rawWords = cleanText.split(/\s+/);
    
    // Count frequency
    const freqMap = {};
    rawWords.forEach(word => {
        if (word.length > 2 && !stopWords.includes(word)) {
            freqMap[word] = (freqMap[word] || 0) + 1;
        }
    });

    // Convert to array and sort
    return Object.entries(freqMap)
        .map(([text, size]) => ({ text, size }))
        .sort((a, b) => b.size - a.size)
        .slice(0, 50); // Top 50 words
}

function renderCloud(words) {
    cloud.innerHTML = '';
    if (words.length === 0) return;

    const maxSize = words[0].size;
    const minSize = words[words.length - 1].size;

    words.forEach(word => {
        const span = document.createElement('span');
        span.classList.add('word');
        span.textContent = word.text;

        // Font size calculation (14px to 60px)
        const fontSize = words.length > 1 
            ? 14 + ((word.size - minSize) / (maxSize - minSize)) * (60 - 14)
            : 40;

        span.style.fontSize = `${fontSize}px`;
        span.style.color = colors[Math.floor(Math.random() * colors.length)];
        
        // Random Position (simplified, could overlap)
        const x = Math.random() * (cloud.clientWidth - 100);
        const y = Math.random() * (cloud.clientHeight - 50);
        
        // Random Rotation (0 or 90)
        const rotate = Math.random() > 0.8 ? 90 : 0;

        span.style.left = `${x}px`;
        span.style.top = `${y}px`;
        span.style.transform = `rotate(${rotate}deg)`;
        span.style.opacity = '0';

        cloud.appendChild(span);

        // Fade in animation
        setTimeout(() => {
            span.style.opacity = '1';
        }, Math.random() * 500);
    });
}

generateBtn.addEventListener('click', generateCloud);

// Initial Render
generateCloud();
