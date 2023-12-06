import { getMovieData } from "../../modules/helpers";
import {
  aboutMoviePosters,
  aboutMovieSameMovies,
  actorInf,
  header_create,
  search_reload_actors,
  search_reload_movies,
} from "../../modules/ui";

let header = document.querySelector("header");
let actorId = location.search.split("=").at(-1);
let actorPlace = document.querySelector(".actor");
let actorMoviesPlace = document.querySelector(
  ".actor_sec1 .swiper .swiper-wrapper"
);
let photosPlace = document.querySelector('.actor_sec2 .posters')
let searchInp = document.querySelector(".search input");
let searchPlaceMovies = document.querySelector(".answers");
let searchPlaceActors = document.querySelector(".actors");

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
// search modal window activation
let search_mw_act_btn = document.querySelector("#search_btn");
let search_mw = document.querySelector(".searchModals");
let hide_mw = document.querySelector(".off");
search_mw_act_btn.onclick = (e) => {
  e.preventDefault();
  document.body.style.overflowY = "hidden";
  search_mw.classList.add("show");
};

hide_mw.onclick = () => {
  document.body.style.overflowY = "auto";
  search_mw.classList.remove("show");
};

// search input functions
function debounce(func, timeout = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}
function saveInput() {
  Promise.all([
    getMovieData(
      `/search/movie?query=${searchInp.value}&include_adult=false&language=ru&page=1`
    ),
    getMovieData("/genre/movie/list?language=ru"),
  ]).then(([movies, genres]) => {
    search_reload_movies(
      movies.data.results,
      searchPlaceMovies,
      genres.data.genres
    );
  });
  getMovieData(
    `/search/person?query=${searchInp.value}&include_adult=false&page=1`
  ).then((res) => {
    search_reload_actors(res.data.results, searchPlaceActors);
  });
}
const processChange = debounce(() => saveInput());
searchInp.onkeyup = () => {
  processChange();
};