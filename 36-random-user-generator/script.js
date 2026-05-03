const generateBtn = document.getElementById('generate-btn');
const userImg = document.getElementById('user-img');
const userName = document.getElementById('user-name');
const userEmail = document.getElementById('user-email');
const userPhone = document.getElementById('user-phone');
const userLocation = document.getElementById('user-location');

async function fetchUser() {
    // UI Loading State
    userImg.classList.add('loading');
    userName.textContent = 'Memuat...';
    generateBtn.disabled = true;

    try {
        const response = await fetch('https://randomuser.me/api/');
        if (!response.ok) throw new Error('Gagal mengambil data');

        const data = await response.json();
        const user = data.results[0];

        // Update UI
        userImg.src = user.picture.large;
        userImg.onload = () => userImg.classList.remove('loading');
        
        userName.textContent = `${user.name.first} ${user.name.last}`;
        userEmail.textContent = user.email;
        userPhone.textContent = user.phone;
        userLocation.textContent = `${user.location.city}, ${user.location.country}`;

    } catch (error) {
        userName.textContent = 'Oops! Gagal memuat data.';
        console.error(error);
    } finally {
        generateBtn.disabled = false;
    }
}

generateBtn.addEventListener('click', fetchUser);

// Initial Fetch
fetchUser();
