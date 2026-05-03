const calculateBtn = document.getElementById('calculate');
const heightInput = document.getElementById('height');
const weightInput = document.getElementById('weight');
const resultBox = document.getElementById('result-box');
const bmiValue = document.getElementById('bmi-value');
const bmiStatus = document.getElementById('bmi-status');

calculateBtn.addEventListener('click', () => {
    const height = parseFloat(heightInput.value);
    const weight = parseFloat(weightInput.value);

    if (isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
        alert('Silakan masukkan nilai tinggi dan berat badan yang valid!');
        return;
    }

    const bmi = (weight / ((height / 100) ** 2)).toFixed(1);
    displayResult(bmi);
});

function displayResult(bmi) {
    bmiValue.innerText = bmi;
    resultBox.style.display = 'block';

    let status = '';
    let color = '';

    if (bmi < 18.5) {
        status = 'Kurus (Underweight)';
        color = '#3498db';
    } else if (bmi >= 18.5 && bmi <= 24.9) {
        status = 'Normal';
        color = '#2ecc71';
    } else if (bmi >= 25 && bmi <= 29.9) {
        status = 'Berat Badan Berlebih (Overweight)';
        color = '#f1c40f';
    } else {
        status = 'Obesitas';
        color = '#e74c3c';
    }

    bmiStatus.innerText = status;
    bmiValue.style.color = color;
}
