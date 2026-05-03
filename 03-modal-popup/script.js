// Tangkap elemen-elemen yang dibutuhkan
const openBtn = document.getElementById('openModalBtn');
const closeBtn = document.getElementById('closeModalBtn');
const modalBackdrop = document.getElementById('modalBackdrop');

// 1. Fungsi untuk membuka modal
openBtn.addEventListener('click', () => {
    modalBackdrop.classList.add('active');
});

// 2. Fungsi untuk menutup modal via tombol tutup
closeBtn.addEventListener('click', () => {
    modalBackdrop.classList.remove('active');
});

// 3. Fungsi untuk menutup modal saat klik backdrop (area gelap)
modalBackdrop.addEventListener('click', function(event) {
    // Cek apakah yang diklik benar-benar backdrop-nya, bukan konten di dalamnya
    if (event.target === this) {
        modalBackdrop.classList.remove('active');
    }
});