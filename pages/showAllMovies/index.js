import { getMovieData } from "../../modules/helpers";
import {
  genre_types,
  header_create,
  reload_movies_all,
} from "../../modules/ui";

let header = document.querySelector("header");
let moviePlace = document.querySelector(".movies");
let genresPlace = document.querySelector(".genres");
let mainBg = document.querySelector(".mainBg");

header_create(header);

Promise.all([
  getMovieData("/movie/now_playing?language=ru"),
  getMovieData("/genre/movie/list?language=ru"),
]).then(([movies, genres]) => {
  console.log(movies.data.results);
  genre_types(genres.data.genres, genresPlace);
  reload_movies_all(
    movies.data.results,
    moviePlace,
    genres.data.genres,
    mainBg
  );
});
