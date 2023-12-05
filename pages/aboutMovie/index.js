import { getMovieData } from "../../modules/helpers";
import {
  aboutMovie,
  aboutMovieActors,
  aboutMovieCrew,
  aboutMoviePosters,
  aboutMovieSameMovies,
  header_create,
  movieInf,
} from "../../modules/ui";

let header = document.querySelector("header");
header_create(header);

let movieId = location.search.split("=").at(-1);
let place = document.querySelector(".movie");
let mainBg = document.querySelector(".mainBg");
let aboutMovieTop = document.querySelector(".sec2 .top2");
let aboutMovieBottomFirst = document.querySelector(".sec2 .bottom2 #first");
let aboutMovieBottomSecond = document.querySelector(".sec2 .bottom2 #second");
let aboutMovieBottomThird = document.querySelector(".sec2 .bottom2 #third div");
let aboutMovieBottomFour = document.querySelector(".sec2 .bottom2 #four div");
let movieActors = document.querySelector("#movieActors");
let trailer = document.querySelector("#mainFrame");
let trailerTitle = document.querySelector("#trailerTitle");
let sec5_movieName = document.querySelector(".movieName");
let postersPlace = document.querySelector(".sec5 .posters");
let momentsPlace = document.querySelector(".section6 .posters");
let sameMoviesPlace = document.querySelector(".sec7 #sameMovies");

Promise.all([
  getMovieData(`/movie/${movieId}?language=ru`),
  getMovieData(`/movie/${movieId}/credits?language=ru`),
  getMovieData(`/movie/${movieId}/videos?language=ru`),
  getMovieData(`/movie/${movieId}/images?language=ru`),
  getMovieData(`/movie/${movieId}/recommendations?language=ru`),
  getMovieData("/genre/movie/list?language=ru"),
]).then(([movie, credits, videos, images, sameMovies, genres]) => {
  let video = videos.data.results[0] ? videos.data.results[0].key : "null";
  trailer.src = "https://www.youtube.com/embed/" + video;
  trailerTitle.innerHTML = movie.data.title;
  sec5_movieName.innerHTML = movie.data.title;
  aboutMoviePosters(images.data.posters.slice(0, 4), postersPlace);
  aboutMoviePosters(images.data.backdrops.slice(0, 8), momentsPlace);
  movieInf(movie.data, place, mainBg);
  aboutMovie(movie.data, aboutMovieTop, credits.data.crew);
  aboutMovieActors(credits.data.cast.slice(0, 10), movieActors);
  aboutMovieSameMovies(
    sameMovies.data.results,
    sameMoviesPlace,
    genres.data.genres
  );

  credits.data.crew.forEach((item) => {
    if (item.job === "Producer" && item.department === "Production") {
      aboutMovieCrew(item, aboutMovieBottomFirst, true);
    }
    if (item.job === "Executive Producer" && item.department === "Production") {
      aboutMovieCrew(item, aboutMovieBottomSecond, true);
    }
    if (item.known_for_department === "Production") {
      aboutMovieCrew(item, aboutMovieBottomThird, false);
    }
    if (item.department === "Visual Effects") {
      aboutMovieCrew(item, aboutMovieBottomFour, false);
    }
  });
});
// sameMovies swiper
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
