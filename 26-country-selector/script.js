const countries = [
    { name: "Indonesia", code: "id" },
    { name: "Malaysia", code: "my" },
    { name: "Singapore", code: "sg" },
    { name: "Thailand", code: "th" },
    { name: "Vietnam", code: "vn" },
    { name: "Philippines", code: "ph" },
    { name: "United States", code: "us" },
    { name: "United Kingdom", code: "gb" },
    { name: "Japan", code: "jp" },
    { name: "South Korea", code: "kr" },
    { name: "China", code: "cn" },
    { name: "Australia", code: "au" },
    { name: "Germany", code: "de" },
    { name: "France", code: "fr" },
    { name: "Canada", code: "ca" },
    { name: "Brazil", code: "br" },
    { name: "India", code: "in" },
    { name: "Russia", code: "ru" },
    { name: "Saudi Arabia", code: "sa" },
    { name: "Turkey", code: "tr" }
];

const customSelect = document.getElementById('custom-select');
const selectHeader = document.getElementById('select-header');
const optionsList = document.getElementById('options-list');
const selectedFlag = document.getElementById('selected-flag');
const selectedName = document.getElementById('selected-name');

function getFlagUrl(code) {
    return `https://flagcdn.com/w40/${code}.png`;
}

// Populate list
countries.forEach(country => {
    const li = document.createElement('li');
    li.innerHTML = `
        <img src="${getFlagUrl(country.code)}" alt="${country.name}" class="flag-icon">
        <span>${country.name}</span>
    `;
    li.addEventListener('click', () => {
        selectedFlag.src = getFlagUrl(country.code);
        selectedFlag.style.display = 'block';
        selectedName.textContent = country.name;
        customSelect.classList.remove('active');
    });
    optionsList.appendChild(li);
});

// Toggle dropdown
selectHeader.addEventListener('click', () => {
    customSelect.classList.toggle('active');
});

// Close when clicking outside
document.addEventListener('click', (e) => {
    if (!customSelect.contains(e.target)) {
        customSelect.classList.remove('active');
    }
});
