const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const weatherCard = document.getElementById('weather-card');
const statusMsg = document.getElementById('status-msg');

const cityName = document.getElementById('city-name');
const weatherIcon = document.getElementById('weather-icon');
const temp = document.getElementById('temp');
const description = document.getElementById('description');
const humidity = document.getElementById('humidity');
const wind = document.getElementById('wind');

// WMO Weather interpretation codes (WW)
const weatherMap = {
    0: { desc: "Cerah", icon: "☀️" },
    1: { desc: "Utamanya Cerah", icon: "🌤️" },
    2: { desc: "Sedikit Berawan", icon: "⛅" },
    3: { desc: "Berawan", icon: "☁️" },
    45: { desc: "Kabut", icon: "🌫️" },
    48: { desc: "Kabut Rime", icon: "🌫️" },
    51: { desc: "Gerimis Ringan", icon: "🌦️" },
    53: { desc: "Gerimis Sedang", icon: "🌦️" },
    55: { desc: "Gerimis Lebat", icon: "🌦️" },
    61: { desc: "Hujan Ringan", icon: "🌧️" },
    63: { desc: "Hujan Sedang", icon: "🌧️" },
    65: { desc: "Hujan Lebat", icon: "🌧️" },
    71: { desc: "Salju Ringan", icon: "❄️" },
    73: { desc: "Salju Sedang", icon: "❄️" },
    75: { desc: "Salju Lebat", icon: "❄️" },
    80: { desc: "Hujan Showers Ringan", icon: "🌦️" },
    81: { desc: "Hujan Showers Sedang", icon: "🌦️" },
    82: { desc: "Hujan Showers Lebat", icon: "🌧️" },
    95: { desc: "Badai Petir", icon: "⛈️" },
};

async function getWeather(city) {
    statusMsg.textContent = 'Mencari data cuaca...';
    weatherCard.style.display = 'none';

    try {
        // 1. Geocoding
        const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en&format=json`);
        const geoData = await geoRes.json();

        if (!geoData.results || geoData.results.length === 0) {
            throw new Error('Kota tidak ditemukan');
        }

        const { latitude, longitude, name, country } = geoData.results[0];

        // 2. Weather
        const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m`);
        const weatherData = await weatherRes.json();

        const current = weatherData.current;
        const weather = weatherMap[current.weather_code] || { desc: "Tidak diketahui", icon: "❓" };

        cityName.textContent = `${name}, ${country}`;
        temp.textContent = `${Math.round(current.temperature_2m)}°C`;
        description.textContent = weather.desc;
        weatherIcon.textContent = weather.icon;
        humidity.textContent = `${current.relative_humidity_2m}%`;
        wind.textContent = `${current.wind_speed_10m} km/h`;

        statusMsg.textContent = '';
        weatherCard.style.display = 'block';

    } catch (error) {
        statusMsg.textContent = error.message === 'Kota tidak ditemukan' ? 'Kota tidak ditemukan. Silakan cek ejaan.' : 'Gagal mengambil data cuaca.';
        console.error(error);
    }
}

searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) getWeather(city);
});

cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const city = cityInput.value.trim();
        if (city) getWeather(city);
    }
});
