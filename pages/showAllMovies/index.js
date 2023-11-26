import { getMovieData } from "../../modules/helpers";
import { genre_types, header_create, reload_movies } from "../../modules/ui";

let header = document.querySelector("header");
let moviePlace = document.querySelector(".movies");
let genresPlace = document.querySelector(".genres");
let mainBg = document.querySelector(".mainBg");

header_create(header);

Promise.all([
  getMovieData("/movie/now_playing?language=ru&page=2"),
  getMovieData("/genre/movie/list?language=ru"),
]).then(([movies, genres]) => {
  console.log(movies.data.results);
  genre_types(genres.data.genres.slice(0, 5), genresPlace);
  reload_movies(
    movies.data.results,
    moviePlace,
    genres.data.genres,
    mainBg,
    true
  );
});
