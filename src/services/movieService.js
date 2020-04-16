import http from './httpService';
import {apiUrl} from '../config.json';


const apiEndpoint = apiUrl + 'movies/';

export function getMovies() {
  return http.get(apiEndpoint);
}


export function getMovie(movieId) {
  return http.get(apiEndpoint + movieId);
}

export function saveMovie(movie) {
  if (movie.id) {
    const body = {...movie};
    delete body.id;
    return http.put(apiEndpoint + movie.id, body);
  }
  return http.post(apiEndpoint, movie);
}


export function deleteMovie(movieId) {
  return http.delete(apiEndpoint + movieId);
}