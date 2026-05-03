const stars = document.querySelectorAll('.star');
const ratingValue = document.getElementById('rating-value');
let currentRating = 0;

stars.forEach((star, index) => {
    // Click event to set rating
    star.addEventListener('click', () => {
        currentRating = index + 1;
        updateStars(currentRating);
        ratingValue.textContent = currentRating;
    });

    // Hover event to preview rating
    star.addEventListener('mouseover', () => {
        highlightStars(index + 1);
    });

    // Reset highlight when mouse leaves the container
});

const container = document.getElementById('stars-container');
container.addEventListener('mouseleave', () => {
    removeHighlights();
    updateStars(currentRating);
});

function highlightStars(count) {
    removeHighlights();
    for (let i = 0; i < count; i++) {
        stars[i].classList.add('hovered');
    }
}

function updateStars(count) {
    stars.forEach((star, i) => {
        if (i < count) {
            star.classList.add('active');
        } else {
            star.classList.remove('active');
        }
    });
}

function removeHighlights() {
    stars.forEach(star => {
        star.classList.remove('hovered');
    });
}
