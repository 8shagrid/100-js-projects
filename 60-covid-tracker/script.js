const countrySelect = document.getElementById('country-select');
const statsGrid = document.getElementById('stats-grid');
const loading = document.getElementById('loading');
const errorMsg = document.getElementById('error-msg');

// DOM Elements for Stats
const totalCasesEl = document.getElementById('total-cases');
const newCasesEl = document.getElementById('new-cases');
const activeCasesEl = document.getElementById('active-cases');
const recoveredEl = document.getElementById('recovered');
const newRecoveredEl = document.getElementById('new-recovered');
const deathsEl = document.getElementById('deaths');
const newDeathsEl = document.getElementById('new-deaths');

async function fetchCountries() {
    try {
        const response = await fetch('https://disease.sh/v3/covid-19/countries');
        const countries = await response.json();
        
        countries.forEach(country => {
            const option = document.createElement('option');
            option.value = country.countryInfo.iso2 || country.country;
            option.textContent = country.country;
            countrySelect.appendChild(option);
        });
    } catch (error) {
        console.error('Error fetching countries:', error);
    }
}

async function fetchStats(countryCode = 'all') {
    setLoading(true);
    errorMsg.style.display = 'none';

    const url = countryCode === 'all' 
        ? 'https://disease.sh/v3/covid-19/all' 
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Data not found');
        const data = await response.json();
        updateUI(data);
    } catch (error) {
        console.error('Error fetching stats:', error);
        errorMsg.style.display = 'block';
        statsGrid.style.opacity = '0.3';
    } finally {
        setLoading(false);
    }
}

function updateUI(data) {
    statsGrid.style.opacity = '1';
    
    totalCasesEl.textContent = formatNum(data.cases);
    newCasesEl.textContent = formatNum(data.todayCases);
    activeCasesEl.textContent = formatNum(data.active);
    recoveredEl.textContent = formatNum(data.recovered);
    newRecoveredEl.textContent = formatNum(data.todayRecovered);
    deathsEl.textContent = formatNum(data.deaths);
    newDeathsEl.textContent = formatNum(data.todayDeaths);
}

function formatNum(num) {
    return new Intl.NumberFormat('id-ID').format(num);
}

function setLoading(isLoading) {
    loading.style.display = isLoading ? 'block' : 'none';
    statsGrid.style.display = isLoading ? 'none' : 'grid';
}

countrySelect.addEventListener('change', (e) => {
    fetchStats(e.target.value);
});

// Initial Load
fetchCountries();
fetchStats();
