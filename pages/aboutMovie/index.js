import { getMovieData } from "../../modules/helpers";
import {
  aboutMovie,
  aboutMovieActors,
  aboutMovieCrew,
  aboutMoviePosters,
  aboutMovieSameMovies,
  header_create,
  movieInf,
  search_reload_actors,
  search_reload_movies,
} from "../../modules/ui";

let header = document.querySelector("header");
header_create(header);

let movieId = location.search.split("=").at(-1);
let place = document.querySelector(".movie");
let mainBg = document.querySelector(".mainBg");
let aboutMovieTop = document.querySelector(".sec2 .top2");
// let aboutMovieBottomFirst = document.querySelector(".sec2 .bottom2 #first");
// let aboutMovieBottomSecond = document.querySelector(".sec2 .bottom2 #second");
// let aboutMovieBottomThird = document.querySelector(".sec2 .bottom2 #third div");
// let aboutMovieBottomFour = document.querySelector(".sec2 .bottom2 #four div");
let movieActors = document.querySelector("#movieActors");
let trailer = document.querySelector("#mainFrame");
let trailerTitle = document.querySelector("#trailerTitle");
let sec5_movieName = document.querySelector(".movieName");
let postersPlace = document.querySelector(".sec5 .posters");
let momentsPlace = document.querySelector(".section6 .posters");
let sameMoviesPlace = document.querySelector(".sec7 #sameMovies");
let searchInp = document.querySelector(".search input");
let searchPlaceMovies = document.querySelector(".answers");
let searchPlaceActors = document.querySelector(".actors");

Promise.all([
  getMovieData(`/movie/${movieId}?language=ru`),
  getMovieData(`/movie/${movieId}/credits`),
  getMovieData(`/movie/${movieId}/videos`),
  getMovieData(`/movie/${movieId}/images`),
  getMovieData(`/movie/${movieId}/recommendations?language=ru`),
  getMovieData("/genre/movie/list?language=ru"),
]).then(([movie, credits, videos, images, sameMovies, genres]) => {
  let fondVideo = videos.data.results.find((video) => video.type === "Trailer");
  trailer.src = "https://www.youtube.com/embed/" + fondVideo.key;
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

  // credits.data.crew.forEach((item) => {
  //   if (item.job === "Producer" && item.department === "Production") {
  //     aboutMovieCrew(item, aboutMovieBottomFirst, true);
  //   }
  //   if (item.job === "Executive Producer" && item.department === "Production") {
  //     aboutMovieCrew(item, aboutMovieBottomSecond, true);
  //   }
  //   if (item.known_for_department === "Production") {
  //     aboutMovieCrew(item, aboutMovieBottomThird, false);
  //   }
  //   if (item.department === "Visual Effects") {
  //     aboutMovieCrew(item, aboutMovieBottomFour, false);
  //   }
  // });
  let btnForTrailer = document.querySelector(
    "main .movie .topBlock .topInfBlock .infBottomBlock button"
  );
  btnForTrailer.onclick = () => {
    window.scrollTo({
      top: trailer.offsetTop - 100,
      left: 0,
      behavior: "smooth",
    });
  };
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
