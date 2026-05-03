const calculateBtn = document.getElementById('calculate');
const billInput = document.getElementById('bill');
const tipSelect = document.getElementById('tip');
const peopleInput = document.getElementById('people');
const resultBox = document.getElementById('result-box');
const tipDisplay = document.getElementById('tip-amount');
const totalDisplay = document.getElementById('total-per-person');

calculateBtn.addEventListener('click', () => {
    const bill = parseFloat(billInput.value);
    const tipPercent = parseFloat(tipSelect.value);
    const people = parseInt(peopleInput.value);

    if (isNaN(bill) || bill <= 0) {
        alert('Silakan masukkan total tagihan yang valid!');
        return;
    }

    if (isNaN(people) || people <= 0) {
        alert('Silakan masukkan jumlah orang yang valid!');
        return;
    }

    const totalTip = bill * (tipPercent / 100);
    const totalBill = bill + totalTip;
    const totalPerPerson = totalBill / people;

    displayResult(totalTip, totalPerPerson);
});

function displayResult(tip, perPerson) {
    resultBox.style.display = 'block';

    const formatter = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    });

    tipDisplay.innerText = formatter.format(tip);
    totalDisplay.innerText = formatter.format(perPerson);
}
