const countries = [
    "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan",
    "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia",
    "Brazil", "Brunei", "Bulgaria", "Cambodia", "Cameroon", "Canada", "Chile", "China", "Colombia", "Croatia",
    "Cuba", "Denmark", "Egypt", "Finland", "France", "Germany", "Greece", "Iceland", "India", "Indonesia",
    "Iran", "Iraq", "Ireland", "Italy", "Japan", "Jordan", "Kenya", "Korea", "Kuwait", "Laos",
    "Malaysia", "Mexico", "Monaco", "Netherlands", "New Zealand", "Norway", "Pakistan", "Philippines", "Poland", "Portugal",
    "Qatar", "Russia", "Saudi Arabia", "Singapore", "Spain", "Sweden", "Switzerland", "Thailand", "Turkey", "Ukraine",
    "United Kingdom", "United States", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
];

const searchInput = document.getElementById('search-input');
const suggestionsList = document.getElementById('suggestions-list');

searchInput.addEventListener('input', (e) => {
    const val = e.target.value.toLowerCase();
    suggestionsList.innerHTML = '';
    
    if (!val) {
        suggestionsList.classList.remove('active');
        return;
    }

    const filtered = countries.filter(country => 
        country.toLowerCase().includes(val)
    );

    if (filtered.length > 0) {
        filtered.forEach(country => {
            const li = document.createElement('li');
            li.textContent = country;
            li.addEventListener('click', () => {
                searchInput.value = country;
                suggestionsList.classList.remove('active');
            });
            suggestionsList.appendChild(li);
        });
        suggestionsList.classList.add('active');
    } else {
        suggestionsList.classList.remove('active');
    }
});

// Close list when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.search-box')) {
        suggestionsList.classList.remove('active');
    }
});
