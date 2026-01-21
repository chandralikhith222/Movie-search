const API_KEY = "c9599832c6df0a55c2ab2fc904de9a6d";
const BASE_URL = "https://api.themoviedb.org/3";
const IMG_URL = "https://image.tmdb.org/t/p/w500";

const movieId = new URLSearchParams(window.location.search).get("id");
const detailsDiv = document.getElementById("movieDetails");

async function loadMovie() {
  const res = await fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`);
  const movie = await res.json();

  const castRes = await fetch(`${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}`);
  const castData = await castRes.json();

  detailsDiv.innerHTML = `
    <div class="details">
      <img src="${IMG_URL + movie.poster_path}">
      <div>
        <h1>${movie.title}</h1>
        <p>${movie.overview}</p>
        <h3>Cast</h3>
        <p>${castData.cast ? castData.cast.slice(0, 5).map(c => c.name).join(", ") : 'N/A'}</p>
      </div>
    </div>
  `;
}

loadMovie();
