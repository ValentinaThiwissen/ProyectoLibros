
const API_SERVER = 'https://api.themoviedb.org/3';
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYTJjYTAwZDYxZWIzOTEyYjZlNzc4MDA4YWQ3ZmNjOCIsInN1YiI6IjYyODJmNmYwMTQ5NTY1MDA2NmI1NjlhYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4MJSPDJhhpbHHJyNYBtH_uCZh4o0e3xGhZpcBIDy-Y8'
        
    }
};

const cargarPeliculasTendencia = async (page = 1) => {
    const response = await fetch(`${API_SERVER}/movie/popular?page=${page}`, options);
    const data = await response.json();
    const movies = data.results;
    console.log(movies);
    const tendenciasContainer = document.querySelector('.librosTendencia .libros');
    tendenciasContainer.innerHTML = '';

    movies.forEach(movie => {

        const ancla = document.createElement('a');
        ancla.href = './pages/detalle.html';

        const pelicula = document.createElement('div');
        pelicula.classList.add('pelicula');

        const img = document.createElement('img');
        img.classList.add('imgTendencia');
        img.src = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
        img.alt = movie.title;
        img.loading = 'lazy';

        const tituloPelicula = document.createElement('div');
        tituloPelicula.classList.add('tituloPelicula');

        const titulo = document.createElement('h4');
        titulo.textContent = movie.title;

        ancla.appendChild(pelicula);
        pelicula.appendChild(img);
        pelicula.appendChild(tituloPelicula);
        tituloPelicula.appendChild(titulo);
        tendenciasContainer.appendChild(ancla);
      
    });


    tendenciasContainer.parentElement.setAttribute('data-page', page);
};

const botonAnterior = document.getElementById('botonAnterior');
const botonSiguiente = document.getElementById('botonSiguiente');
const seccionTendencias = document.getElementById('tendencias');

botonAnterior.addEventListener('click', () => {
    let currentPage = Number(seccionTendencias.getAttribute('data-page'));
    if (currentPage <= 1) return;
    cargarPeliculasTendencia(currentPage - 1);
});

botonSiguiente.addEventListener('click', () => {
    let currentPage = Number(seccionTendencias.getAttribute('data-page'));
    cargarPeliculasTendencia(currentPage + 1);
});

document.addEventListener('DOMContentLoaded', () => {
    cargarPeliculasTendencia();
});