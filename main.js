import { getMovieData } from "./modules/helpers";
import {
  genre_types,
  header_create,
  reload_movies,
  reload_popular,
} from "./modules/ui";

let header = document.querySelector("header");
let moviePlace = document.querySelector(".movies");
let genresPlace = document.querySelector(".genres");
let mainBg = document.querySelector(".mainBg");
let btnShowAll = document.querySelector(".btn-show-all");
let like_dislike = document.querySelectorAll(".sec1 .bottom .right div");
let popularMovies = document.querySelector(".swiper-wrapper");

header_create(header);

Promise.all([
  getMovieData("/movie/now_playing?language=ru"),
  getMovieData("/genre/movie/list?language=ru"),
]).then(([movies, genres]) => {
  console.log(movies.data.results);
  genre_types(genres.data.genres, genresPlace);
  reload_movies(
    movies.data.results,
    moviePlace,
    genres.data.genres,
    mainBg,
    true
  );
  reload_popular(
    movies.data.results,
    popularMovies,
    genres.data.genres,
    mainBg
  );
});

btnShowAll.onclick = () => {
  location.assign("./pages/showAllMovies/");
};

like_dislike.forEach((btn) => {
  btn.onclick = () => {
    like_dislike.forEach((button) => (button.style.background = "#1b2133"));
    btn.style.background = "black";
  };
});

new Swiper(".mySwiper", {
  slidesPerView: 3,
  spaceBetween: 30,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});
