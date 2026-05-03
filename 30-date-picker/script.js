const dateInput = document.getElementById('date-input');
const calendar = document.getElementById('calendar');
const monthYearDisplay = document.getElementById('month-year');
const daysContainer = document.getElementById('calendar-days');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

const months = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
];

let currentDate = new Date();
let selectedDate = null;

function renderCalendar() {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    monthYearDisplay.textContent = `${months[month]} ${year}`;

    // Get first day of the month (0 = Sunday, 1 = Monday ...)
    const firstDay = new Date(year, month, 1).getDay();
    // Get last day of the month
    const lastDate = new Date(year, month + 1, 0).getDate();

    daysContainer.innerHTML = '';

    // Empty spaces before the first day
    for (let i = 0; i < firstDay; i++) {
        const emptyDiv = document.createElement('div');
        emptyDiv.classList.add('empty');
        daysContainer.appendChild(emptyDiv);
    }

    // Days of the month
    for (let i = 1; i <= lastDate; i++) {
        const dayDiv = document.createElement('div');
        dayDiv.textContent = i;

        // Check if today
        const today = new Date();
        if (i === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
            dayDiv.classList.add('today');
        }

        // Check if selected
        if (selectedDate && i === selectedDate.getDate() && month === selectedDate.getMonth() && year === selectedDate.getFullYear()) {
            dayDiv.classList.add('selected');
        }

        dayDiv.addEventListener('click', () => {
            selectedDate = new Date(year, month, i);
            dateInput.value = `${i} ${months[month]} ${year}`;
            calendar.classList.remove('active');
            renderCalendar(); // Refresh to show selected
        });

        daysContainer.appendChild(dayDiv);
    }
}

dateInput.addEventListener('click', () => {
    calendar.classList.toggle('active');
});

prevBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
});

nextBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
});

// Close when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.datepicker-wrapper')) {
        calendar.classList.remove('active');
    }
});

// Initial render
renderCalendar();
