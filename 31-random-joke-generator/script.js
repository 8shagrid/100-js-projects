const jokeText = document.getElementById('joke-text');
const jokeBtn = document.getElementById('joke-btn');

async function getJoke() {
    jokeText.textContent = 'Mencari tawa...';
    
    try {
        const response = await fetch('https://icanhazdadjoke.com/', {
            headers: {
                'Accept': 'application/json'
            }
        });
        
        if (!response.ok) throw new Error('Gagal mengambil lelucon');
        
        const data = await response.json();
        jokeText.textContent = data.joke;
    } catch (error) {
        jokeText.textContent = 'Oops! Leluconnya menghilang. Coba lagi nanti.';
        console.error(error);
    }
}

jokeBtn.addEventListener('click', getJoke);

// Initial joke
getJoke();
