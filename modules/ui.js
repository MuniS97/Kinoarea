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
  if (plite) {
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

      // img.onclick = () => {
      //   console.log(click);
      //   let iframe = document.querySelector("#mainFrame");
      //   let id = item.id;
      //   getMovieData(`/movie/${id}/videos`).then((res) =>
      //     setTrailers(res.data.results[0], iframe)
      //   );
      // };
      hoverBg.onclick = () => {
        location.assign(`../pages/aboutMovie/?movie_id=${item.id}`);
      };

      place.append(block);
      block.append(img, hoverBg, ratingBlock, name, genre);
      ratingBlock.append(rating);
      hoverBg.append(hoverBtn);
    }
  } else {
    for (let item of arr) {
      let mainBlock = document.createElement("div");
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
      mainBlock.classList.add("swiper-slide");

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
      hoverBg.onclick = () => {
        location.assign(`../pages/aboutMovie?movie_id=${item.id}`);
      };

      place.append(mainBlock);
      mainBlock.append(block);
      block.append(img, hoverBg, ratingBlock, name, genre);
      ratingBlock.append(rating);
      hoverBg.append(hoverBtn);
    }
  }
}

export function genre_types(arr, place) {
  place.innerHTML = "";
  for (let item of arr) {
    let a = document.createElement("a");
    let p = document.createElement("p");

    a.href = "#";
    p.innerHTML = item.name;

    place.append(a);
    a.append(p);
  }
}

export function btns_switch(arr) {
  let choseGenre = 0;
  arr.forEach((genre, idx) => {
    genre.onclick = () => {
      arr[choseGenre].classList.remove("chose");
      arr[idx].classList.add("chose");
      choseGenre = idx;
    };
  });
}

export const topMovies = (object, place) => {
  let div = document.createElement("div");
  let img = document.createElement("img");
  let inf_div = document.createElement("div");
  let title = document.createElement("h3");
  let revenue = document.createElement("p");
  let budget = document.createElement("p");

  revenue.classList.add("gold");

  img.src = "https://image.tmdb.org/t/p/original" + object.poster_path;
  title.innerHTML = object.title;
  revenue.innerHTML = `Сбор: ${object.revenue}`;
  budget.innerHTML = `Бюджет: ${object.budget}`;

  place.append(div);
  div.append(img, inf_div);
  inf_div.append(title, revenue, budget);
};

export const movieInf = (movie, place) => {
  place.innerHTML = "";

  let topBlock = document.createElement("div");
  let img = document.createElement("img");
  let topInfBlock = document.createElement("div");
  let way = document.createElement("p");
  let title = document.createElement("h1");
  let origTitle = document.createElement("h2");
  let rating = document.createElement("p");
  let desc = document.createElement("p");
  let infBottomBlock = document.createElement("div");
  let btn = document.createElement("button");
  let socials = document.createElement("div");
  let img1 = document.createElement("img");
  let img2 = document.createElement("img");
  let img3 = document.createElement("img");
  let img4 = document.createElement("img");

  topBlock.classList.add("topBlock");
  topInfBlock.classList.add("topInfBlock");
  way.classList.add("way");
  title.classList.add("title");
  origTitle.classList.add("origTitle");
  rating.classList.add("rating");
  desc.classList.add("desc");
  infBottomBlock.classList.add("infBottomBlock");
  socials.classList.add("socials");

  img.src = "https://image.tmdb.org/t/p/original" + movie.poster_path;
  way.innerHTML = `Главная > Фильмы > <span>${movie.title}</span>`;
  title.innerHTML = movie.title;
  origTitle.innerHTML = movie.original_title;
  rating.innerHTML = `Рейтинг : ${movie.vote_average}`;
  desc.innerHTML = movie.overview;
  btn.innerHTML = "Смотреть трейлер";
  img1.src = "/public/img/headerLeft (1).svg";
  img2.src = "/public/img/headerLeft (2).svg";
  img3.src = "/public/img/headerLeft (3).svg";
  img4.src = "/public/img/headerLeft (4).svg";

  place.append(topBlock);
  topBlock.append(img, topInfBlock);
  topInfBlock.append(way, title, origTitle, rating, desc, infBottomBlock);
  infBottomBlock.append(btn, socials);
  socials.append(img1, img2, img3, img4);
};

export const trailers = (arr, place) => {
  place.innerHTML = "";
  for (let item of arr) {
    let img = document.createElement("img");

    img.src = "https://image.tmdb.org/t/p/original" + item.poster_path;

    img.onclick = () => {
      let iframe = document.querySelector("#mainFrame");
      let title = document.querySelector(".sec1 .bottom .left .title");
      let id = item.id;
      getMovieData(`/movie/${id}/videos`).then((res) =>
        setTrailers(res.data.results[0], iframe)
      );
      title.innerHTML = item.title;
    };

    place.append(img);
  }
};