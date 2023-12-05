import { getMovieData } from "./modules/helpers";
import {
  btns_switch,
  genre_types,
  header_create,
  other_actors_reload,
  reload_movies,
  search_reload_actors,
  search_reload_movies,
  topMovies,
  top_two_actors_reload,
  trailers,
} from "./modules/ui";

let form = document.forms.subs;
let header = document.querySelector("header");
let moviePlace = document.querySelector(".movies");
let genresPlace = document.querySelector(".genres");
let mainBg = document.querySelector(".mainBg");
let btnShowAll = document.querySelector(".btn-show-all");
let like_dislike = document.querySelectorAll(".sec1 .bottom .right div");
let popularMovies = document.querySelector(".swiper-wrapper");
let upcomingPlace = document.querySelector("#upcoming");
let topMoviesPlace = document.querySelector(".top-movies");
let otherTrailers = document.querySelector(".otherMovies");
let searchInp = document.querySelector(".search input");
let searchPlaceMovies = document.querySelector(".answers");
let searchPlaceActors = document.querySelector(".actors");
let years = document.querySelectorAll(".years a");
let pages = document.querySelectorAll("header .center nav ul li");
let moments = document.querySelectorAll(".moments a");
let first_actor = document.querySelector(".sec3 .bottom .top1");
let second_actor = document.querySelector(".sec3 .bottom .top2");
let other_actors = document.querySelector(".sec3 .bottom .tops .scroll-able");

// header functions
header_create(header);
btns_switch(pages);

//get data
Promise.all([
  getMovieData("/movie/now_playing?language=ru"),
  getMovieData("/genre/movie/list?language=ru"),
  getMovieData("/movie/popular?language=ru"),
  getMovieData("/movie/upcoming?language=ru"),
]).then(([movies, genres, popular, upcoming]) => {
  genre_types(genres.data.genres, genresPlace);
  reload_movies(
    movies.data.results.slice(0, 10),
    moviePlace,
    genres.data.genres,
    mainBg,
    true
  );
  reload_movies(
    popular.data.results,
    popularMovies,
    genres.data.genres,
    mainBg,
    false
  );
  reload_movies(
    upcoming.data.results,
    upcomingPlace,
    genres.data.genres,
    mainBg,
    false
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
        "/discover/movie?with_genres=" + indexes + "&language=ru"
      ).then((res) => {
        reload_movies(
          res.data.results.slice(0, 10),
          moviePlace,
          genres.data.genres,
          mainBg,
          true
        );
      });
    };
  });

  // trailer
  let iframe = document.querySelector("#mainFrame");
  let tralerTitle = document.querySelector("main .sec1 .bottom .left .title");
  getMovieData(`/movie/${movies.data.results[0].id}/videos`).then((res) => {
    iframe.src = "https://www.youtube.com/embed/" + res.data.results[0].key;
    tralerTitle.innerHTML = res.data.results[0].name;
  });

  // filter popular movies by years
  let choseYear = [];
  years.forEach((year) => {
    year.onclick = (e) => {
      if (year.classList.contains("chose")) {
        year.classList.remove("chose");
        let index = choseYear.indexOf(year.dataset.year);
        if (index !== -1) {
          choseYear.splice(index, 1);
        }
      } else {
        year.classList.add("chose");
        choseYear.push(year.dataset.year);
      }
      let years = choseYear.join(",");
      e.preventDefault();
      getMovieData(
        `/discover/movie?language=ru&primary_release_year=${years}`
      ).then((res) => {
        reload_movies(
          res.data.results,
          popularMovies,
          genres.data.genres,
          mainBg,
          false
        );
      });
    };
  });
});

// show all movies function
btnShowAll.onclick = () => {
  location.assign("./pages/showAllMovies/");
};

// like / dislike switch
like_dislike.forEach((btn) => {
  btn.onclick = () => {
    like_dislike.forEach((button) => (button.style.background = "#1b2133"));
    btn.style.background = "black";
  };
});

// swiper for popular movies
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

// swiper for upcoming movies
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

// top rated movies function
getMovieData("/movie/top_rated?language=ru").then((res) => {
  if (res.status !== 200 && res.status !== 201) return;
  for (let item of res.data.results.slice(0, 5)) {
    let id = item.id;
    getMovieData("/movie/" + id).then((res) => {
      if (res.status !== 200 && res.status !== 201) return;
      topMovies(res.data, topMoviesPlace);
    });
  }
});

// form function
form.onsubmit = (e) => {
  e.preventDefault();
  let data = {};
  let fm = new FormData(form);
  fm.forEach((value, key) => {
    data[key] = value;
  });
  console.log(data);
};

// min trailers function
getMovieData("/movie/now_playing?language=ru").then((res) => {
  trailers(res.data.results, otherTrailers);
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
let person_details = [];
getMovieData("/person/popular?language=ru").then((res) => {
  if (res.status !== 200 && res.status !== 201) return;
  console.log(res);
  getMovieData(`/person/${res.data.results[0].id}`).then((detail) => {
    if (detail.status !== 200 && detail.status !== 201) return;
    top_two_actors_reload(
      res.data.results[0],
      first_actor,
      detail.data,
      "1-й место"
    );
  });
  getMovieData(`/person/${res.data.results[1].id}`).then((detail) => {
    if (detail.status !== 200 && detail.status !== 201) return;
    top_two_actors_reload(
      res.data.results[1],
      second_actor,
      detail.data,
      "2-й место"
    );
  });
  res.data.results.slice(2).forEach((person) => {
    getMovieData(`/person/${person.id}`).then((detail) => {
      if (detail.status !== 200 && detail.status !== 201) return;
      person_details.push(detail.data);
        if (Boolean(person_details.push(detail.data))) {
          other_actors_reload(
            res.data.results.slice(2),
            other_actors,
            person_details,
            "?-й место"
          );
        }
    });
  });
});
