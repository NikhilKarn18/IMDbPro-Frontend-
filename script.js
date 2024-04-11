// API key which is recieved from OMDB API
const apiKey = 'b5878076'; 
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');
const favoriteMoviesContainer = document.getElementById('favoriteMovies');

// Function to fetch search results from OMDB API
async function fetchMovies(query) {
    const response = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${query}`);
    const data = await response.json();
    return data.Search;
}

// Function to display search results
async function displaySearchResults() {
    const query = searchInput.value;
    if (query.trim() === '') {
        searchResults.innerHTML = '';
        return;
    }
    const movies = await fetchMovies(query);
    searchResults.innerHTML = '';
    if (movies) {
        movies.forEach(movie => {
            const movieElement = document.createElement('div');
            movieElement.innerHTML = `
                <h3>${movie.Title}</h3>
                <img src="${movie.Poster}" alt="${movie.Title}">
                <button onclick="addToFavorites('${movie.imdbID}', '${movie.Title}', '${movie.Poster}')">Add to Favorites</button>
                <button onclick="showMovieDetails('${movie.imdbID}')">More Info</button>
            `;
            searchResults.appendChild(movieElement);
        });
    }
}

// Function to add movie to favorites
function addToFavorites(movieId, title, poster) {
    const favoriteMovies = JSON.parse(localStorage.getItem('favoriteMovies')) || [];
    const movie = { id: movieId, title: title, poster: poster };
    if (!favoriteMovies.some(m => m.id === movieId)) {
        favoriteMovies.push(movie);
        localStorage.setItem('favoriteMovies', JSON.stringify(favoriteMovies));
        displayFavoriteMovies();
    }
}

// Function to display favorite movies
function displayFavoriteMovies() {
    const favoriteMovies = JSON.parse(localStorage.getItem('favoriteMovies')) || [];
    favoriteMoviesContainer.innerHTML = '';
    favoriteMovies.forEach(movie => {
        const movieElement = document.createElement('div');
        movieElement.innerHTML = `
            <h3>${movie.title}</h3>
            <img src="${movie.poster}" alt="${movie.title}">
            <button onclick="removeFromFavorites('${movie.id}')">Remove from Favorites</button>
        `;
        favoriteMoviesContainer.appendChild(movieElement);
    });
}

// Function to remove movie from favorites
function removeFromFavorites(movieId) {
    let favoriteMovies = JSON.parse(localStorage.getItem('favoriteMovies')) || [];
    favoriteMovies = favoriteMovies.filter(movie => movie.id !== movieId);
    localStorage.setItem('favoriteMovies', JSON.stringify(favoriteMovies));
    displayFavoriteMovies();
}

// Function to show movie details
function showMovieDetails(movieId) {
    window.location.href = `movie.html?movieId=${movieId}`;
}

searchInput.addEventListener('input', displaySearchResults);
displayFavoriteMovies();
