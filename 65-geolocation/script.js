const getBtn = document.getElementById('get-location-btn');
const infoBox = document.getElementById('info-box');
const latEl = document.getElementById('lat');
const longEl = document.getElementById('long');
const accuracyEl = document.getElementById('accuracy');
const gmapsLink = document.getElementById('gmaps-link');
const status = document.getElementById('status');

// Initialize Map (Default: Jakarta)
const map = L.map('map').setView([-6.2088, 106.8456], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

let marker;

function getLocation() {
    getBtn.disabled = true;
    getBtn.textContent = 'Mencari Lokasi...';
    status.textContent = '';

    if (!navigator.geolocation) {
        status.textContent = 'Geolocation tidak didukung oleh browser Anda.';
        getBtn.disabled = false;
        getBtn.textContent = 'Cari Lokasi Saya';
        return;
    }

    navigator.geolocation.getCurrentPosition(
        (position) => {
            const { latitude, longitude, accuracy } = position.coords;

            // Update UI
            latEl.textContent = latitude.toFixed(6);
            longEl.textContent = longitude.toFixed(6);
            accuracyEl.textContent = `${accuracy.toFixed(1)} m`;
            gmapsLink.href = `https://www.google.com/maps?q=${latitude},${longitude}`;
            infoBox.style.display = 'block';

            // Update Map
            map.setView([latitude, longitude], 16);
            
            if (marker) map.removeLayer(marker);
            marker = L.marker([latitude, longitude]).addTo(map)
                .bindPopup('Anda berada di sini!')
                .openPopup();

            getBtn.disabled = false;
            getBtn.textContent = 'Cari Lokasi Saya';
        },
        (error) => {
            console.error('Geolocation Error:', error);
            let msg = 'Gagal mendapatkan lokasi.';
            if (error.code === 1) msg = 'Izin lokasi ditolak.';
            else if (error.code === 2) msg = 'Posisi tidak tersedia.';
            else if (error.code === 3) msg = 'Waktu permintaan habis.';
            
            status.textContent = msg;
            getBtn.disabled = false;
            getBtn.textContent = 'Cari Lokasi Saya';
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
}

getBtn.addEventListener('click', getLocation);
