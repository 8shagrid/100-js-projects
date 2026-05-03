const birthdayEl = document.getElementById('birthday');
const calculateBtn = document.getElementById('calculate');
const resultEl = document.getElementById('result');

calculateBtn.addEventListener('click', () => {
    const birthdayValue = birthdayEl.value;
    
    if (birthdayValue === '') {
        alert('Silakan pilih tanggal lahir Anda!');
        return;
    }
    
    const age = calculateAge(birthdayValue);
    if (age === null) {
        resultEl.innerText = "Tanggal lahir tidak boleh di masa depan!";
    } else {
        resultEl.innerHTML = `Umur Anda adalah <span>${age.years}</span> tahun, <span>${age.months}</span> bulan, dan <span>${age.days}</span> hari.`;
    }
});

function calculateAge(birthdayValue) {
    const today = new Date();
    const birthDate = new Date(birthdayValue);
    
    if (birthDate > today) return null;
    
    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();
    
    if (days < 0) {
        months--;
        const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
        days += lastMonth.getDate();
    }
    
    if (months < 0) {
        years--;
        months += 12;
    }
    
    return { years, months, days };
}
