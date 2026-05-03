const calculateBtn = document.getElementById('calculate');
const amountInput = document.getElementById('amount');
const interestInput = document.getElementById('interest');
const monthsInput = document.getElementById('months');
const resultBox = document.getElementById('result-box');
const paymentDisplay = document.getElementById('payment');

calculateBtn.addEventListener('click', () => {
    const loanAmount = parseFloat(amountInput.value);
    const annualInterest = parseFloat(interestInput.value);
    const monthsToPay = parseFloat(monthsInput.value);

    if (isNaN(loanAmount) || isNaN(annualInterest) || isNaN(monthsToPay) || loanAmount <= 0) {
        alert('Silakan masukkan nilai yang valid!');
        return;
    }

    // Calculation logic
    const monthlyInterest = (annualInterest / 100) / 12;
    let monthlyPayment;

    if (monthlyInterest === 0) {
        monthlyPayment = loanAmount / monthsToPay;
    } else {
        monthlyPayment = (loanAmount * monthlyInterest * Math.pow(1 + monthlyInterest, monthsToPay)) / (Math.pow(1 + monthlyInterest, monthsToPay) - 1);
    }

    displayResult(monthlyPayment);
});

function displayResult(payment) {
    resultBox.style.display = 'block';
    
    // Format currency to IDR style or simple number
    const formatted = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(payment);

    paymentDisplay.innerText = formatted;
}
