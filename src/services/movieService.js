import http from './httpService';

const apiEndpoint = 'http://127.0.0.1:8000/api/movie/movies/';

export function getMovies() {
  return http.get(apiEndpoint);
}

export function deleteMovie(movieId) {
  return http.delete(apiEndpoint + movieId);
}