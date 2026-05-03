const inputs = document.querySelectorAll('#otp-inputs input');
const verifyBtn = document.getElementById('verify-btn');

inputs.forEach((input, index) => {
    // Handle typing
    input.addEventListener('input', (e) => {
        const val = e.target.value;
        if (val.length === 1 && index < inputs.length - 1) {
            inputs[index + 1].focus();
        }
    });

    // Handle backspace
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Backspace' && !e.target.value && index > 0) {
            inputs[index - 1].focus();
        }
    });

    // Handle paste
    input.addEventListener('paste', (e) => {
        e.preventDefault();
        const data = e.clipboardData.getData('text').slice(0, 6);
        const digits = data.split('');
        
        digits.forEach((digit, i) => {
            if (inputs[i]) {
                inputs[i].value = digit;
            }
        });
        
        // Focus the last filled input or the current one
        const lastIndex = Math.min(digits.length, inputs.length - 1);
        inputs[lastIndex].focus();
    });
});

verifyBtn.addEventListener('click', () => {
    const code = Array.from(inputs).map(i => i.value).join('');
    if (code.length === 6) {
        alert(`Kode OTP yang dimasukkan: ${code}`);
    } else {
        alert('Silakan masukkan 6 digit kode OTP!');
    }
});
