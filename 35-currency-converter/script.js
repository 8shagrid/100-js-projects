const fromCurrency = document.getElementById('from-currency');
const toCurrency = document.getElementById('to-currency');
const amountInput = document.getElementById('amount');
const rateText = document.getElementById('rate-text');
const totalText = document.getElementById('total-text');
const swapBtn = document.getElementById('swap-btn');

const currencies = ["USD", "IDR", "EUR", "GBP", "JPY", "AUD", "CAD", "CHF", "CNY", "HKD", "SGD", "INR", "KRW"];

// Global Rates Cache
let exchangeRates = {};

async function fetchRates() {
    try {
        const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
        const data = await response.json();
        exchangeRates = data.rates;
        populateDropdowns();
        calculate();
    } catch (error) {
        rateText.textContent = 'Gagal memuat nilai tukar.';
        console.error(error);
    }
}

function populateDropdowns() {
    currencies.forEach(currency => {
        const option1 = document.createElement('option');
        option1.value = currency;
        option1.textContent = currency;
        fromCurrency.appendChild(option1);

        const option2 = document.createElement('option');
        option2.value = currency;
        option2.textContent = currency;
        toCurrency.appendChild(option2);
    });

    fromCurrency.value = 'USD';
    toCurrency.value = 'IDR';
}

function calculate() {
    const from = fromCurrency.value;
    const to = toCurrency.value;
    const amount = amountInput.value;

    if (!exchangeRates[from] || !exchangeRates[to]) return;

    // Convert from -> USD -> to
    const rate = (exchangeRates[to] / exchangeRates[from]);
    const total = (amount * rate).toLocaleString('id-ID', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    rateText.textContent = `1 ${from} = ${rate.toFixed(4)} ${to}`;
    totalText.textContent = `${total} ${to}`;
}

fromCurrency.addEventListener('change', calculate);
toCurrency.addEventListener('change', calculate);
amountInput.addEventListener('input', calculate);

swapBtn.addEventListener('click', () => {
    const temp = fromCurrency.value;
    fromCurrency.value = toCurrency.value;
    toCurrency.value = temp;
    calculate();
});

// Initial load
fetchRates();
