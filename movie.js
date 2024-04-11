// Key which is receivable from OMDb Api
const apiKey = 'b5878076'; 
const movieDetails = document.getElementById('movieDetails');

// Function to fetch movie from OMDb api
async function fetchMovieDetails(movieId) {
    const response = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&i=${movieId}`);
    const data = await response.json();
    return data;
}

// Function to display movie details
async function displayMovieDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const movieId = urlParams.get('movieId');
    if (movieId) {
        const movie = await fetchMovieDetails(movieId);
        if (movie) {
            movieDetails.innerHTML = `
                <h2>${movie.Title}</h2>
                <img src="${movie.Poster}" alt="${movie.Title}">
                <p><strong>Plot:</strong> ${movie.Plot}</p>
                <p><strong>Director:</strong> ${movie.Director}</p>
                <p><strong>Actors:</strong> ${movie.Actors}</p>
                <p><strong>Genre:</strong> ${movie.Genre}</p>
                <p><strong>Released:</strong> ${movie.Released}</p>
                <button onclick="addToFavorites('${movie.imdbID}', '${movie.Title}', '${movie.Poster}')">Add to Favorites</button>
            `;
        }
    }
}

// Function to add movie to favorites list
function addToFavorites(movieId, title, poster) {
    const favoriteMovies = JSON.parse(localStorage.getItem('favoriteMovies')) || [];
    const movie = { id: movieId, title: title, poster: poster };
    if (!favoriteMovies.some(m => m.id === movieId)) {
        favoriteMovies.push(movie);
        localStorage.setItem('favoriteMovies', JSON.stringify(favoriteMovies));
    }
}

displayMovieDetails();
