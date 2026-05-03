const slides = document.getElementById('slides');
const slideItems = document.querySelectorAll('.slide');
const nextBtn = document.getElementById('right');
const prevBtn = document.getElementById('left');
const dots = document.querySelectorAll('.dot');

let currentIndex = 0;
const totalSlides = slideItems.length;

function updateSlider() {
    // Move the slide track
    slides.style.transform = `translateX(-${currentIndex * 100}%)`;
    
    // Update dots
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
    });
}

nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateSlider();
});

prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    updateSlider();
});

dots.forEach(dot => {
    dot.addEventListener('click', () => {
        currentIndex = parseInt(dot.getAttribute('data-index'));
        updateSlider();
    });
});

// Auto slide (optional, can be commented out)
// setInterval(() => {
//     nextBtn.click();
// }, 5000);
