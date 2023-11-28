import { getMovieData } from "../../modules/helpers";
import { genre_types, header_create, reload_movies } from "../../modules/ui";

let header = document.querySelector("header");
let moviePlace = document.querySelector(".movies");
let moviePlaceTwo = document.querySelector(".movies2");
let genresPlace = document.querySelector(".genres");
let mainBg = document.querySelector(".mainBg");

header_create(header);

Promise.all([
  getMovieData("/movie/now_playing?language=ru&page=2"),
  getMovieData("/movie/now_playing?language=ru&page=3"),
  getMovieData("/genre/movie/list?language=ru"),
]).then(([movies2, movies3, genres]) => {
  console.log(movies2.data.results);
  genre_types(genres.data.genres, genresPlace);
  reload_movies(
    movies2.data.results,
    moviePlace,
    genres.data.genres,
    mainBg,
    true
  );
  reload_movies(
    movies3.data.results,
    moviePlaceTwo,
    genres.data.genres,
    mainBg,
    true
  );
});
