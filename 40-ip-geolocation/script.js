const userIp = document.getElementById('user-ip');
const userLocation = document.getElementById('user-location');
const userIsp = document.getElementById('user-isp');
const refreshBtn = document.getElementById('refresh-btn');

let map;
let marker;

async function fetchGeolocation() {
    // Show Loading
    userIp.textContent = 'Mendapatkan data...';
    refreshBtn.disabled = true;

    try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();

        if (data.error) throw new Error(data.reason);

        updateUI(data);
        updateMap(data.latitude, data.longitude, `${data.city}, ${data.country_name}`);
    } catch (error) {
        userIp.textContent = 'Gagal memuat data.';
        console.error(error);
    } finally {
        refreshBtn.disabled = false;
    }
}

function updateUI(data) {
    userIp.textContent = data.ip;
    userLocation.textContent = `${data.city}, ${data.region_code}, ${data.country_name}`;
    userIsp.textContent = data.org || '--';
}

function updateMap(lat, lon, locationName) {
    // Initialize map if it doesn't exist
    if (!map) {
        map = L.map('map').setView([lat, lon], 13);
        
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors'
        }).addTo(map);

        marker = L.marker([lat, lon]).addTo(map)
            .bindPopup(locationName)
            .openPopup();
    } else {
        // Move map and marker
        map.setView([lat, lon], 13);
        marker.setLatLng([lat, lon])
            .getPopup()
            .setContent(locationName)
            .openOn(map);
    }
}

refreshBtn.addEventListener('click', fetchGeolocation);

// Initial Load
fetchGeolocation();
