import { getMovieData, setTrailers } from "./helpers";

export function header_create(place) {
  place.innerHTML = `
  <div class="left">
        <a href="/"><img src="/public/img/headerLeft.svg" alt="logo" /></a>
        <div class="socials">
          <a href="#"
            ><img src="/public/img/headerLeft (1).svg" alt="social"
          /></a>
          <a href="#"
            ><img src="/public/img/headerLeft (2).svg" alt="social"
          /></a>
          <a href="#"
            ><img src="/public/img/headerLeft (3).svg" alt="social"
          /></a>
          <a href="#"
            ><img src="/public/img/headerLeft (4).svg" alt="social"
          /></a>
        </div>
      </div>
      <div class="center">
        <nav>
          <ul>
            <li><a href="#">Афиша</a></li>
            <li><a href="#">Медиа</a></li>
            <li><a href="#">Фильмы</a></li>
            <li><a href="#">Актёры</a></li>
            <li><a href="#">Новости</a></li>
            <li><a href="#">Подборки</a></li>
            <li><a href="#">Категории</a></li>
          </ul>
        </nav>
      </div>
      <div class="right">
        <a href="#"
          ><div class="search">
            <img src="/public/img/headerRight.svg" alt="search_icon" /></div
        ></a>
        <button class="btn-donate">Войти</button>
      </div>
      `;
}
export function reload_movies(arr, place, genres, bg, plite) {
  place.innerHTML = "";
  if (plite === false) {
    for (let item of arr) {
      let block = document.createElement("div");
      let img = document.createElement("img");
      let ratingBlock = document.createElement("div");
      let rating = document.createElement("p");
      let name = document.createElement("h4");
      let genre = document.createElement("p");
      let genreTitles = [];

      for (let id of item.genre_ids) {
        for (let genre of genres) {
          if (id === genre.id) {
            genreTitles.push(genre.name);
          }
        }
      }

      name.classList.add("title");
      genre.classList.add("genre");
      ratingBlock.classList.add("ratingBlock");
      rating.classList.add("rating");

      img.src = "https://image.tmdb.org/t/p/original" + item.poster_path;
      name.innerHTML = item.title;
      genre.innerHTML = genreTitles.join(", ");
      rating.innerHTML = item.vote_average;

      let hoverBg = document.createElement("div");
      let hoverBtn = document.createElement("button");

      hoverBtn.innerHTML = "Карточка фильма";
      hoverBg.classList.add("hoverBlock");

      block.onmouseenter = () => {
        bg.style.backgroundImage =
          "url(https://image.tmdb.org/t/p/original" + item.backdrop_path + ")";
        hoverBg.classList.add("flex");
      };
      block.onmouseleave = () => {
        hoverBg.classList.remove("flex");
      };

      img.onclick = () => {
        console.log(click);
        let iframe = document.querySelector("#mainFrame");
        let id = item.id;
        getMovieData(`/movie/${id}/videos`).then((res) =>
          setTrailers(res.data.results[0], iframe)
        );
      };
      hoverBtn.onclick = () => {
        location.assign("../pages/aboutMovie/");
      };

      place.append(block);
      block.append(img, hoverBg, ratingBlock, name, genre);
      ratingBlock.append(rating);
      hoverBg.append(hoverBtn);
    }
  } else {
    for (let idx = 0; idx < 8; idx++) {
      let block = document.createElement("div");
      let img = document.createElement("img");
      let ratingBlock = document.createElement("div");
      let rating = document.createElement("p");
      let name = document.createElement("h4");
      let genre = document.createElement("p");
      let genreTitles = [];

      for (let id of arr[idx].genre_ids) {
        for (let genre of genres) {
          if (id === genre.id) {
            genreTitles.push(genre.name);
          }
        }
      }

      name.classList.add("title");
      genre.classList.add("genre");
      ratingBlock.classList.add("ratingBlock");
      rating.classList.add("rating");

      img.src = "https://image.tmdb.org/t/p/original" + arr[idx].poster_path;
      name.innerHTML = arr[idx].title;
      genre.innerHTML = genreTitles.join(", ");
      rating.innerHTML = arr[idx].vote_average;

      let hoverBg = document.createElement("div");
      let hoverBtn = document.createElement("button");

      hoverBtn.innerHTML = "Карточка фильма";
      hoverBg.classList.add("hoverBlock");

      block.onmouseenter = () => {
        bg.style.backgroundImage =
          "url(https://image.tmdb.org/t/p/original" +
          arr[idx].backdrop_path +
          ")";
        hoverBg.classList.add("flex");
      };
      block.onmouseleave = () => {
        hoverBg.classList.remove("flex");
      };

      hoverBg.onclick = () => {
        let iframe = document.querySelector("#mainFrame");
        let title = document.querySelector(".sec1 .bottom .left .title");
        let id = arr[idx].id;
        getMovieData(`/movie/${id}/videos`).then((res) =>
          setTrailers(res.data.results[0], iframe)
        );
        title.innerHTML = arr[idx].title;
      };
      hoverBtn.onclick = () => {
        location.assign("../pages/aboutMovie/");
      };

      place.append(block);
      block.append(img, hoverBg, ratingBlock, name, genre);
      ratingBlock.append(rating);
      hoverBg.append(hoverBtn);
    }
  }
}

export function genre_types(arr, place) {
  place.innerHTML = "";
  for (let idx = 0; idx < 5; idx++) {
    let a = document.createElement("a");
    let p = document.createElement("p");

    a.href = "#";
    p.innerHTML = arr[idx].name;

    place.append(a);
    a.append(p);
  }
}

export function reload_popular(arr, place, genres, bg) {
  place.innerHTML = "";
  for (let idx = 0; idx < 15; idx++) {
    let mainBlock = document.createElement("div");
    let block = document.createElement("div");
    let img = document.createElement("img");
    let ratingBlock = document.createElement("div");
    let rating = document.createElement("p");
    let name = document.createElement("h4");
    let genre = document.createElement("p");
    let genreTitles = [];

    for (let id of arr[idx].genre_ids) {
      for (let genre of genres) {
        if (id === genre.id) {
          genreTitles.push(genre.name);
        }
      }
    }

    name.classList.add("title");
    genre.classList.add("genre");
    ratingBlock.classList.add("ratingBlock");
    rating.classList.add("rating");
    mainBlock.classList.add("swiper-slide");

    img.src = "https://image.tmdb.org/t/p/original" + arr[idx].poster_path;
    name.innerHTML = arr[idx].title;
    genre.innerHTML = genreTitles.join(", ");
    rating.innerHTML = arr[idx].vote_average;

    let hoverBg = document.createElement("div");
    let hoverBtn = document.createElement("button");

    hoverBtn.innerHTML = "Карточка фильма";
    hoverBg.classList.add("hoverBlock");

    block.onmouseenter = () => {
      bg.style.backgroundImage =
        "url(https://image.tmdb.org/t/p/original" +
        arr[idx].backdrop_path +
        ")";
      hoverBg.classList.add("flex");
    };
    block.onmouseleave = () => {
      hoverBg.classList.remove("flex");
    };

    hoverBg.onclick = () => {
      let iframe = document.querySelector("#mainFrame");
      let title = document.querySelector(".sec1 .bottom .left .title");
      let id = arr[idx].id;
      getMovieData(`/movie/${id}/videos`).then((res) =>
        setTrailers(res.data.results[0], iframe)
      );
      title.innerHTML = arr[idx].title;
    };
    hoverBtn.onclick = () => {
      location.assign("../pages/aboutMovie/");
    };

    place.append(mainBlock);
    mainBlock.append(block);
    block.append(img, hoverBg, ratingBlock, name, genre);
    ratingBlock.append(rating);
    hoverBg.append(hoverBtn);
  }
}
