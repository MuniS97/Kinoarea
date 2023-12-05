import { getMovieData } from "../../modules/helpers";
import {
  genre_types,
  header_create,
  reload_movies,
  search_reload_actors,
  search_reload_movies,
} from "../../modules/ui";

let header = document.querySelector("header");
let moviePlace = document.querySelector(".movies");
let moviePlaceTwo = document.querySelector(".movies2");
let genresPlace = document.querySelector(".genres");
let mainBg = document.querySelector(".mainBg");
let searchInp = document.querySelector(".search input");
let searchPlaceMovies = document.querySelector(".answers");
let searchPlaceActors = document.querySelector(".actors");

header_create(header);

Promise.all([
  getMovieData("/movie/now_playing?language=ru&page=1"),
  getMovieData("/movie/now_playing?language=ru&page=2"),
  getMovieData("/genre/movie/list?language=ru"),
]).then(([movies2, movies3, genres]) => {
  // console.log(movies2.data.results);
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
  // filter now playing movies by genres
  let genres_types = document.querySelectorAll(".genres a");
  let chosedGenre = [];
  genres_types.forEach((item) => {
    item.onclick = () => {
      if (item.classList.contains("chose")) {
        item.classList.remove("chose");
        let index = chosedGenre.indexOf(item.dataset.genreId);
        if (index !== -1) {
          chosedGenre.splice(index, 1);
        }
      } else {
        item.classList.add("chose");
        chosedGenre.push(item.dataset.genreId);
      }
      let indexes = chosedGenre.join(",");
      getMovieData(
        "/discover/movie?with_genres=" + indexes + "&language=ru&page=1"
      ).then((res) => {
        reload_movies(
          res.data.results,
          moviePlace,
          genres.data.genres,
          mainBg,
          true
        );
      });
      getMovieData(
        "/discover/movie?with_genres=" + indexes + "&language=ru&page=2"
      ).then((res) => {
        reload_movies(
          res.data.results,
          moviePlaceTwo,
          genres.data.genres,
          mainBg,
          true
        );
      });
    };
  });
});

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
    console.log(movies);
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