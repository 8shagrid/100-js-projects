const catImg = document.getElementById('cat-img');
const catFact = document.getElementById('cat-fact');
const nextBtn = document.getElementById('next-btn');
const loader = document.getElementById('loader');

async function getCatData() {
    // Show Loading state
    catImg.classList.add('loading');
    loader.classList.add('active');
    nextBtn.disabled = true;
    catFact.textContent = 'Mencari fakta baru...';

    try {
        // Fetch Parallelly
        const [factRes, imgRes] = await Promise.all([
            fetch('https://catfact.ninja/fact'),
            fetch('https://api.thecatapi.com/v1/images/search')
        ]);

        if (!factRes.ok || !imgRes.ok) throw new Error('Gagal mengambil data');

        const factData = await factRes.json();
        const imgData = await imgRes.json();

        // Update UI
        catFact.textContent = factData.fact;
        
        // Use Image.onload to ensure image is ready before removing loader
        const tempImg = new Image();
        tempImg.src = imgData[0].url;
        tempImg.onload = () => {
            catImg.src = imgData[0].url;
            catImg.classList.remove('loading');
            loader.classList.remove('active');
            nextBtn.disabled = false;
        };

    } catch (error) {
        catFact.textContent = 'Oops! Kucingnya sedang tidur. Coba lagi nanti.';
        catImg.classList.remove('loading');
        loader.classList.remove('active');
        nextBtn.disabled = false;
        console.error(error);
    }
}

nextBtn.addEventListener('click', getCatData);

// Initial call
getCatData();
