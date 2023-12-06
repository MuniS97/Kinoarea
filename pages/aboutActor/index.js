import { getMovieData } from "../../modules/helpers";
import {
  aboutMoviePosters,
  aboutMovieSameMovies,
  actorInf,
  header_create,
} from "../../modules/ui";

let header = document.querySelector("header");
let actorId = location.search.split("=").at(-1);
let actorPlace = document.querySelector(".actor");
let actorMoviesPlace = document.querySelector(
  ".actor_sec1 .swiper .swiper-wrapper"
);
let photosPlace = document.querySelector('.actor_sec2 .posters')

header_create(header);

Promise.all([
  getMovieData(`/person/${actorId}?language=ru`),
  getMovieData("/genre/movie/list?language=ru"),
  getMovieData(`/person/${actorId}/combined_credits`),
  getMovieData(`/person/${actorId}/images`)
]).then(([actor, genres, movies, images]) => {
  actorInf(actor.data, actorPlace);
  aboutMovieSameMovies(
    movies.data.cast,
    actorMoviesPlace,
    genres.data.genres,
    " ",
    false
  );
  console.log(images);
  aboutMoviePosters(images.data.profiles.slice(0, 8), photosPlace)
});

// swiper for actor movies
new Swiper(".mySwiper", {
  slidesPerView: 5,
  spaceBetween: 20,
  pagination: {
    el: ".swiper-pagination",
    type: "fraction",
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});
