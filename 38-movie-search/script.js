const searchForm = document.getElementById('search-form');
const movieInput = document.getElementById('movie-input');
const movieCard = document.getElementById('movie-card');

const API_KEY = '625d16d1'; // Public educational key
const API_URL = `https://www.omdbapi.com/?apikey=${API_KEY}&t=`;

async function fetchMovie(title) {
    movieCard.innerHTML = '<div class="initial-msg">Mencari info film...</div>';

    try {
        const response = await fetch(API_URL + encodeURIComponent(title));
        const data = await response.json();

        if (data.Response === 'False') {
            throw new Error(data.Error);
        }

        renderMovie(data);
    } catch (error) {
        movieCard.innerHTML = `
            <div class="error-msg">
                <h2>Oops!</h2>
                <p>${error.message === 'Movie not found!' ? 'Film tidak ditemukan.' : 'Terjadi kesalahan sistem.'}</p>
            </div>
        `;
    }
}

function renderMovie(movie) {
    movieCard.innerHTML = `
        <div class="poster-container">
            <img src="${movie.Poster !== 'N/A' ? movie.Poster : 'https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'}" alt="${movie.Title}">
        </div>
        <div class="movie-details">
            <h2>${movie.Title}</h2>
            <div class="meta">
                <div class="rating">⭐ ${movie.imdbRating}</div>
                <div>${movie.Year}</div>
                <div>${movie.Runtime}</div>
            </div>
            <div class="genre">${movie.Genre}</div>
            <p class="plot">${movie.Plot}</p>
            <div class="cast">
                <p><span>Sutradara:</span> ${movie.Director}</p>
                <p><span>Pemain:</span> ${movie.Actors}</p>
            </div>
        </div>
    `;
}

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const movie = movieInput.value.trim();
    if (movie) {
        fetchMovie(movie);
    }
});
