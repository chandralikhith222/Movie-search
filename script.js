const API_KEY = "c9599832c6df0a55c2ab2fc904de9a6d";
const BASE_URL = "https://api.themoviedb.org/3";
const IMG_URL = "https://image.tmdb.org/t/p/w500";

const moviesDiv = document.getElementById("movies");
const genreSelect = document.getElementById("genreSelect");
const languageSelect = document.getElementById("languageSelect");

window.onload = () => {
  loadGenres();
  loadLanguages();
  loadTrending();
};

async function loadGenres() {
  const res = await fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}`);
  const data = await res.json();

  data.genres.forEach(genre => {
    const option = document.createElement("option");
    option.value = genre.id;
    option.textContent = genre.name;
    genreSelect.appendChild(option);
  });
}

function loadLanguages() {
  const languages = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'Hindi' },
    { code: 'bn', name: 'Bengali' },
    { code: 'te', name: 'Telugu' },
    { code: 'ta', name: 'Tamil' },
    { code: 'mr', name: 'Marathi' },
    { code: 'gu', name: 'Gujarati' },
    { code: 'kn', name: 'Kannada' },
    { code: 'ml', name: 'Malayalam' },
    { code: 'or', name: 'Odia' },
    { code: 'pa', name: 'Punjabi' },
    { code: 'as', name: 'Assamese' },
    { code: 'ur', name: 'Urdu' },
    { code: 'ne', name: 'Nepali' },
    { code: 'sd', name: 'Sindhi' },
    { code: 'ks', name: 'Kashmiri' },
    { code: 'sa', name: 'Sanskrit' },
    { code: 'en-GB', name: 'English (UK)' },
    { code: 'es', name: 'Spanish' },
    { code: 'fr', name: 'French' },
    { code: 'ja', name: 'Japanese' },
    { code: 'ko', name: 'Korean' },
    { code: 'de', name: 'German' },
    { code: 'zh', name: 'Chinese' }
  ];

  languages.forEach(lang => {
    const option = document.createElement('option');
    option.value = lang.code;
    option.textContent = lang.name;
    languageSelect.appendChild(option);
  });
}

async function applyFilters() {
  const genreId = genreSelect.value;
  const lang = languageSelect.value;

  if (!genreId && !lang) {
    loadTrending();
    return;
  }

  let url = `${BASE_URL}/discover/movie?api_key=${API_KEY}`;
  if (genreId) url += `&with_genres=${genreId}`;
  if (lang) url += `&with_original_language=${lang}`;

  const res = await fetch(url);
  const data = await res.json();
  displayMovies(data.results);
}

async function loadTrending() {
  const res = await fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`);
  const data = await res.json();
  displayMovies(data.results);
}

async function searchMovies() {
  const query = document.getElementById("searchInput").value;
  if (!query) return;

  const res = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`);
  const data = await res.json();
  displayMovies(data.results);
}

async function loadByGenre() {
  applyFilters();
}

function displayMovies(movies) {
  moviesDiv.innerHTML = "";

  movies.forEach(movie => {
    const div = document.createElement("div");
    div.classList.add("movie");

    div.onclick = () => {
      window.location.href = `movie.html?id=${movie.id}`;
    };

    div.innerHTML = `
      <img src="${movie.poster_path ? IMG_URL + movie.poster_path : 'https://via.placeholder.com/300'}">
      <div class="movie-info">
        <h3>${movie.title}</h3>
        <p>⭐ ${movie.vote_average}</p>
      </div>
    `;

    moviesDiv.appendChild(div);
  });
}

