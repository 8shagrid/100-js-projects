const formSteps = document.querySelectorAll('.form-step');
const stepDots = document.querySelectorAll('.step-dot');
const progressBar = document.getElementById('progress-bar');
const backBtn = document.getElementById('back-btn');
const nextBtn = document.getElementById('next-btn');

let currentStep = 0;

function updateForm() {
    // Update steps visibility
    formSteps.forEach((step, index) => {
        step.classList.toggle('active', index === currentStep);
    });

    // Update progress bar & dots
    stepDots.forEach((dot, index) => {
        dot.classList.toggle('active', index <= currentStep);
    });
    
    const progressWidth = (currentStep / (formSteps.length - 1)) * 100;
    progressBar.style.width = `${progressWidth}%`;

    // Update buttons
    backBtn.disabled = currentStep === 0;
    
    if (currentStep === formSteps.length - 1) {
        nextBtn.innerText = 'Kirim';
        nextBtn.style.backgroundColor = '#2ecc71';
    } else {
        nextBtn.innerText = 'Lanjut';
        nextBtn.style.backgroundColor = '#3498db';
    }
}

nextBtn.addEventListener('click', () => {
    if (currentStep < formSteps.length - 1) {
        currentStep++;
        updateForm();
    } else {
        alert('Formulir berhasil dikirim! 🎉');
        // Reset or redirect
    }
});

backBtn.addEventListener('click', () => {
    if (currentStep > 0) {
        currentStep--;
        updateForm();
    }
});
