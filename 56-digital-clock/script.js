const hourEl = document.getElementById('hours');
const minuteEl = document.getElementById('minutes');
const secondEl = document.getElementById('seconds');
const ampmEl = document.getElementById('ampm');
const dayEl = document.getElementById('day-name');
const dateEl = document.getElementById('full-date');
const formatToggle = document.getElementById('format-toggle');

let is24Hour = localStorage.getItem('clock-format') === '24H' || true;

function updateClock() {
    const now = new Date();
    
    let h = now.getHours();
    const m = now.getMinutes();
    const s = now.getSeconds();

    // Day and Date
    const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
    
    dayEl.textContent = days[now.getDay()];
    dateEl.textContent = `${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`;

    // Format Logic
    if (!is24Hour) {
        ampmEl.style.display = 'inline';
        ampmEl.textContent = h >= 12 ? 'PM' : 'AM';
        h = h % 12 || 12;
    } else {
        ampmEl.style.display = 'none';
    }

    // Update Text
    hourEl.textContent = h < 10 ? '0' + h : h;
    minuteEl.textContent = m < 10 ? '0' + m : m;
    secondEl.textContent = s < 10 ? '0' + s : s;
}

formatToggle.addEventListener('click', () => {
    is24Hour = !is24Hour;
    formatToggle.textContent = `Format: ${is24Hour ? '24H' : '12H'}`;
    localStorage.setItem('clock-format', is24Hour ? '24H' : '12H');
    updateClock();
});

// Initial Setup
formatToggle.textContent = `Format: ${is24Hour ? '24H' : '12H'}`;
setInterval(updateClock, 1000);
updateClock();
