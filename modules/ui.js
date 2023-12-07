import { getMovieData, setTrailers } from "./helpers";

// header reload
export function header_create(place) {
  place.innerHTML = `
  <div class="left">
        <a href="/"><img src="/public/img/headerLeft.svg" alt="logo" /></a>
        <div class="socials">
          <a href="#"
            ><img src="/public/img/headerLeft (1).svg" alt="social"
          /></a>
          <a href="#"
            ><img src="/public/img/headerLeft (3).svg" alt="social"
          /></a>
          <a href="#"
            ><img src="/public/img/headerLeft (5).svg" alt="social"
          /></a>
          <a href="#"
            ><img src="/public/img/headerLeft (6).svg" alt="social"
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
        <a id="search_btn" href="#"
          ><div class="search">
            <img src="/public/img/headerRight.svg" alt="search_icon" /></div
        ></a>
       <a href="/pages/profile/"><button class="btn-donate">Войти</button></a>
      </div>
      `;
}

// main movie reload
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

      item.poster_path
        ? (img.src = "https://image.tmdb.org/t/p/original" + item.poster_path)
        : (img.src = "/movie_placeholder.jpg");
      item.title.length <= 20
        ? (name.innerHTML = item.title)
        : (name.innerHTML = item.title.slice(0, 20) + " ...");
      genreTitles.join(", ").length <= 20
        ? (genre.innerHTML = genreTitles.join(", "))
        : (genre.innerHTML = genreTitles.join(", ").slice(0, 20) + " ...");
      rating.innerHTML = item.vote_average;

      bg.style.backgroundImage =
        "url(https://image.tmdb.org/t/p/original" + arr[0].backdrop_path + ")";

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

      item.poster_path
        ? (img.src = "https://image.tmdb.org/t/p/original" + item.poster_path)
        : (img.src = "/movie_placeholder.jpg");
      item.title.length <= 20
        ? (name.innerHTML = item.title)
        : (name.innerHTML = item.title.slice(0, 20) + " ...");
      genreTitles.join(", ").length <= 20
        ? (genre.innerHTML = genreTitles.join(", "))
        : (genre.innerHTML = genreTitles.join(", ").slice(0, 20) + " ...");
      rating.innerHTML = item.vote_average;
      bg.style.backgroundImage =
        "url(https://image.tmdb.org/t/p/original" + arr[0].backdrop_path + ")";

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
        location.assign(`/pages/aboutMovie/?movie_id=${item.id}`);
      };

      place.append(mainBlock);
      mainBlock.append(block);
      block.append(img, hoverBg, ratingBlock, name, genre);
      ratingBlock.append(rating);
      hoverBg.append(hoverBtn);
    }
  }
}

// genres reload
export function genre_types(arr, place) {
  place.innerHTML = "";
  for (let item of arr) {
    let a = document.createElement("a");
    let p = document.createElement("p");

    a.href = "#";
    p.innerHTML = item.name;
    a.dataset.genreId = item.id;

    place.append(a);
    a.append(p);
  }
}

// header pages switch
export function btns_switch(arr) {
  let choseGenre = 0;
  arr.forEach((item, idx) => {
    item.onclick = () => {
      arr[choseGenre].classList.remove("chose");
      arr[idx].classList.add("chose");
      choseGenre = idx;
    };
  });
}

// top rated movies
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

// min trailers function
export const trailers = (arr, place) => {
  place.innerHTML = "";
  for (let item of arr) {
    let block = document.createElement("div");
    let imgBlock = document.createElement("div");
    let img = document.createElement("img");
    let icon = document.createElement("img");
    let title = document.createElement("p");

    icon.classList.add("icon");

    img.src = "https://image.tmdb.org/t/p/original" + item.backdrop_path;
    icon.src = "/public/img/trailersArrow.svg";
    item.title.length < 20
      ? (title.innerHTML = item.title)
      : (title.innerHTML = item.title.slice(0, 20) + " ...");

    icon.onclick = () => {
      let iframe = document.querySelector("#mainFrame");
      let title = document.querySelector(".sec1 .bottom .left .title");
      let id = item.id;
      getMovieData(`/movie/${id}/videos`).then((res) =>
        setTrailers(res.data.results[0], iframe)
      );
      title.innerHTML = item.title;
    };

    place.append(block);
    block.append(imgBlock, title);
    imgBlock.append(img, icon);
  }
};

// search movies reload
export const search_reload_movies = (arr, place, genres) => {
  place.innerHTML = "";
  for (let item of arr) {
    let block = document.createElement("div");
    let left = document.createElement("div");
    let img = document.createElement("img");
    let leftInf = document.createElement("div");
    let title = document.createElement("h3");
    let originTitle = document.createElement("p");
    let genresP = document.createElement("p");
    let right = document.createElement("div");
    let rating = document.createElement("p");
    let genreTitles = [];

    for (let id of item.genre_ids) {
      for (let genre of genres) {
        if (id === genre.id) {
          genreTitles.push(genre.name);
        }
      }
    }

    left.classList.add("left");
    leftInf.classList.add("leftInf");
    genresP.classList.add("genres");
    right.classList.add("right");

    item.poster_path
      ? (img.src = "https://image.tmdb.org/t/p/original" + item.poster_path)
      : (img.src = "/movie_placeholder.jpg");

    item.title.length <= 50
      ? (title.innerHTML = item.title || "Movie")
      : (title.innerHTML = item.title.slice(0, 50) + " ..." || "Movie");
    item.original_title.length <= 50
      ? (originTitle.innerHTML = item.original_title || "None")
      : (originTitle.innerHTML =
          item.original_title.slice(0, 50) + " ..." || "None");
    genreTitles.join(", ").length <= 50
      ? (genresP.innerHTML = genreTitles.join(", "))
      : (genresP.innerHTML = genreTitles.join(", ").slice(0, 50) + " ...");
    rating.innerHTML = item.vote_average;

    place.append(block);
    block.append(left, right);
    left.append(img, leftInf);
    leftInf.append(title, originTitle, genresP);
    right.append(rating);

    block.onclick = () => {
      location.assign(`/pages/aboutMovie/?movie_id=${item.id}`);
    };
  }
};

// search actors reload
export const search_reload_actors = (arr, place) => {
  place.innerHTML = "";
  for (let item of arr) {
    let block = document.createElement("div");
    let left = document.createElement("div");
    let img = document.createElement("img");
    let leftInf = document.createElement("div");
    let title = document.createElement("h3");
    let originTitle = document.createElement("p");
    let desc = document.createElement("p");
    let right = document.createElement("div");
    let rating = document.createElement("p");

    left.classList.add("left");
    leftInf.classList.add("leftInf");
    desc.classList.add("genres");
    right.classList.add("right");

    item.profile_path
      ? (img.src = "https://image.tmdb.org/t/p/original" + item.profile_path)
      : (img.src = "/placeholder.jpg");

    title.innerHTML = item.name || "Actor";
    originTitle.innerHTML = item.original_name || "None";

    desc.innerHTML = item.known_for_department;
    rating.innerHTML = item.popularity;

    place.append(block);
    block.append(left, right);
    left.append(img, leftInf);
    leftInf.append(title, originTitle, desc);
    right.append(rating);

    block.onclick = () => {
      location.assign("/pages/aboutActor/?actor_id=" + item.id);
    };
  }
};

export const top_two_actors_reload = (object, place, details, status) => {
  place.innerHTML = "";

  let actor_status = document.createElement("p");
  let actor_inf = document.createElement("div");
  let name = document.createElement("h3");
  let original_name = document.createElement("p");
  let age = document.createElement("p");

  actor_status.classList.add("status");
  name.classList.add("name");
  original_name.classList.add("original_name");
  age.classList.add("age");

  place.style.backgroundImage =
    "url(https://image.tmdb.org/t/p/original" + object.profile_path + ")";
  actor_status.innerHTML = status;
  name.innerHTML = object.name;
  original_name.innerHTML = object.original_name;
  let actor_age = details.birthday
    ? new Date().getFullYear() - details.birthday.split("-")[0]
    : "?";
  age.innerHTML = actor_age + " лет";

  place.onclick = () => {
    location.assign("/pages/aboutActor/?actor_id=" + object.id);
  };

  place.append(actor_status, actor_inf);
  actor_inf.append(name, original_name, age);
};

export const other_actors_reload = (arr, place, details, status) => {
  place.innerHTML = "";
  for (let idx = 3; idx < arr.length; idx++) {
    let block = document.createElement("div");
    let left = document.createElement("div");
    let name = document.createElement("h3");
    let original_name = document.createElement("h5");
    let age = document.createElement("p");
    let actor_status = document.createElement("p");

    actor_status.classList.add("status");
    left.classList.add("left");

    name.innerHTML = arr[idx].name;
    original_name.innerHTML = arr[idx].original_name;
    actor_status.innerHTML = status;
    let actor_age = details[idx].birthday
      ? new Date().getFullYear() - details[idx].birthday.split("-")[0]
      : "?";
    age.innerHTML = actor_age + " лет";
    actor_status.innerHTML = idx + "-й место";

    place.append(block);
    block.append(left, actor_status);
    left.append(name, original_name, age);

    block.onclick = () => {
      location.assign("/pages/aboutActor/?actor_id=" + arr[idx].id);
    };
  }
};

// page reload about chose movie
export const movieInf = (movie, place, bg) => {
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

  bg.style.backgroundImage =
    "url(https://image.tmdb.org/t/p/original" + movie.backdrop_path + ")";
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
  img2.src = "/public/img/headerLeft (3).svg";
  img3.src = "/public/img/headerLeft (5).svg";
  img4.src = "/public/img/headerLeft (6).svg";

  place.append(topBlock);
  topBlock.append(img, topInfBlock);
  topInfBlock.append(way, title, origTitle, rating, desc, infBottomBlock);
  infBottomBlock.append(btn, socials);
  socials.append(img1, img2, img3, img4);
};

export const aboutMovie = (object, place, credits) => {
  let div1 = document.createElement("div");
  let title1 = document.createElement("p");
  let div2 = document.createElement("div");
  let title2 = document.createElement("p");
  let div3 = document.createElement("div");
  let title3 = document.createElement("p");
  let div4 = document.createElement("div");
  let title4 = document.createElement("p");
  let div5 = document.createElement("div");
  let title5 = document.createElement("p");
  let div6 = document.createElement("div");
  let title6 = document.createElement("p");
  let div7 = document.createElement("div");
  let title7 = document.createElement("p");
  let div8 = document.createElement("div");
  let title8 = document.createElement("p");
  let div9 = document.createElement("div");
  let title9 = document.createElement("p");
  let div10 = document.createElement("div");
  let title10 = document.createElement("p");
  let div11 = document.createElement("div");
  let title11 = document.createElement("p");
  let div12 = document.createElement("div");
  let title12 = document.createElement("p");
  let div13 = document.createElement("div");
  let title13 = document.createElement("p");
  let div14 = document.createElement("div");
  let title14 = document.createElement("p");
  let div15 = document.createElement("div");
  let title15 = document.createElement("p");
  let div16 = document.createElement("div");
  let title16 = document.createElement("p");

  title1.innerHTML = "<b>Год: </b>" + object.release_date.split("-")[0] || "?";
  title2.innerHTML = "<b>Художник: </b>" + credits[1].name || "?";
  title3.innerHTML =
    "<b>Страна: </b>" + object.production_countries[0].name || "?";
  title4.innerHTML = "<b>Монтаж: </b>" + credits[0].name || "?";
  title5.innerHTML = "<b>Слоган: </b>" + object.tagline || "?";
  title6.innerHTML =
    "<b>Жанр: </b>" +
      object.genres[0].name +
      ", " +
      object.genres[1].name +
      "..." || "?";
  title7.innerHTML = "<b>Режиссер: </b>" + credits[2].name || "?";
  title8.innerHTML = "<b>Сборы в мире: </b>" + object.revenue || "?";
  title9.innerHTML =
    "<b>Сценарий: </b>" + credits[3].name + ", " + credits[3].name || "?";
  title10.innerHTML =
    "<b>Премьера(мир): </b>" + object.release_date.split("-")[0] || "?";
  title11.innerHTML =
    "<b>Продюсер: </b>" + credits[5].name + ", " + credits[4].name || "?";
  title12.innerHTML = "<b>Премьера(РФ): </b>" + "?" || "?";
  title13.innerHTML = "<b>Оператор: </b>" + credits[6].name || "?";
  title14.innerHTML = "<b>Возвраст: </b>" + "?" || "?";
  title15.innerHTML = "<b>Композитор: </b>" + credits[7].name || "?";
  title16.innerHTML = "<b>Время: </b>" + object.runtime + " сек" || "?";

  place.append(
    div1,
    div2,
    div3,
    div4,
    div5,
    div6,
    div7,
    div8,
    div9,
    div10,
    div11,
    div12,
    div13,
    div14,
    div15,
    div16
  );
  div1.append(title1);
  div2.append(title2);
  div3.append(title3);
  div4.append(title4);
  div5.append(title5);
  div6.append(title6);
  div7.append(title7);
  div8.append(title8);
  div9.append(title9);
  div10.append(title10);
  div11.append(title11);
  div12.append(title12);
  div13.append(title13);
  div14.append(title14);
  div15.append(title15);
  div16.append(title16);
};

export const aboutMovieCrew = (object, place, plite) => {
  if (plite) {
    let img = document.createElement("img");
    let div = document.createElement("div");
    let h4 = document.createElement("h4");
    let p = document.createElement("p");
    let h6 = document.createElement("h6");

    img.src = "https://image.tmdb.org/t/p/original" + object.profile_path;
    h4.innerHTML = object.name;
    p.innerHTML = object.original_name;
    h6.innerHTML = object.job;

    place.append(img, div);
    div.append(h4, p, h6);
    img.onclick = () => {
      location.assign("/pages/aboutActor/?actor_id=" + object.id);
    };
  } else {
    let p = document.createElement("p");
    p.innerHTML = object.name;
    place.append(p);
    p.onclick = () => {
      location.assign("/pages/aboutActor/?actor_id=" + object.id);
    };
  }
};

export const aboutMovieActors = (arr, place) => {
  place.innerHTML = "";
  for (let item of arr) {
    let block = document.createElement("div");
    let img = document.createElement("img");
    let name = document.createElement("h3");
    let orig_name = document.createElement("p");
    let movie_name = document.createElement("h4");
    block.classList.add("actor_block");

    item.profile_path
      ? (img.src = "https://image.tmdb.org/t/p/original" + item.profile_path)
      : (img.src = "/placeholder.jpg");

    name.innerHTML = item.name;
    orig_name.innerHTML = item.original_name;
    movie_name.innerHTML = item.character;

    place.append(block);
    block.append(img, name, orig_name, movie_name);

    img.onclick = () => {
      location.assign("/pages/aboutActor/?actor_id=" + item.id);
    };
  }
};

export const aboutMoviePosters = (arr, place) => {
  place.innerHTML = "";
  for (let item of arr) {
    let img = document.createElement("img");
    img.src = "https://image.tmdb.org/t/p/original" + item.file_path;
    place.append(img);
  }
};

export const aboutMovieSameMovies = (arr, place, genres) => {
  place.innerHTML = "";
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

    item.poster_path
      ? (img.src = "https://image.tmdb.org/t/p/original" + item.poster_path)
      : (img.src = "/movie_placeholder.jpg");

    name.innerHTML = item.title;
    genre.innerHTML = genreTitles.join(", ");
    rating.innerHTML = item.vote_average;

    let hoverBg = document.createElement("div");
    let hoverBtn = document.createElement("button");

    hoverBtn.innerHTML = "Карточка фильма";
    hoverBg.classList.add("hoverBlock");

    block.onmouseenter = () => {
      hoverBg.classList.add("flex");
    };
    block.onmouseleave = () => {
      hoverBg.classList.remove("flex");
    };

    hoverBg.onclick = () => {
      location.assign(`/pages/aboutMovie/?movie_id=${item.id}`);
    };

    place.append(mainBlock);
    mainBlock.append(block);
    block.append(img, hoverBg, ratingBlock, name, genre);
    ratingBlock.append(rating);
    hoverBg.append(hoverBtn);
  }
};

export const actorInf = (actor, place) => {
  place.innerHTML = "";
  let img = document.createElement("img");
  let actorInf = document.createElement("div");
  let way = document.createElement("p");
  let name = document.createElement("h2");
  let div = document.createElement("div");
  let orig_name = document.createElement("p");
  let div_img1 = document.createElement("img");
  let div_img2 = document.createElement("img");
  let actor_inf = document.createElement("p");
  let actor_career = document.createElement("p");
  let actor_height = document.createElement("p");
  let actor_age = document.createElement("p");
  let actor_birthplace = document.createElement("p");
  let actor_gender = document.createElement("p");
  let actor_movies = document.createElement("p");
  let btn_div = document.createElement("div");
  let btn_img = document.createElement("img");

  actorInf.classList.add("actor_inf");
  way.classList.add("way");
  name.classList.add("name");
  btn_div.classList.add("btn");
  div.classList.add("min_div");

  actor.profile_path
    ? (img.src = "https://image.tmdb.org/t/p/original" + actor.profile_path)
    : (img.src = "/placeholder.jpg");
  way.innerHTML = `Главная > Актёры > <b>${actor.name}</b>`;
  name.innerHTML = actor.name;
  orig_name.innerHTML = actor.name;
  div_img1.src = "/public/img/headerLeft (5).svg";
  div_img2.src = "/public/img/headerLeft (6).svg";
  actor.biography
    ? (actor_inf.innerHTML = `Информация: <b>${actor.biography.slice(
        0,
        200
      )} ...</b>`)
    : (actor_inf.innerHTML = `Информация: <b>нет информации</b>`);
  actor.known_for_department
    ? (actor_career.innerHTML = `Карьера: <b>${actor.known_for_department}</b>`)
    : (actor_career.innerHTML = `Карьера: <b>нет информации</b>`);
  actor_height.innerHTML = "Рост: <b>нет информации</b>";
  actor.birthday
    ? (actor_age.innerHTML = `Дата рождения: <b>${
        new Date().getFullYear() - actor.birthday.split("-")[0]
      } лет</b>`)
    : (actor_age.innerHTML = `Дата рождения: <b>? лет</b>`);
  actor.place_of_birth
    ? (actor_birthplace.innerHTML = `Место рождения: <b>${actor.place_of_birth}</b>`)
    : (actor_birthplace.innerHTML = "Место рождения: <b>нет информации</b>");
  if (actor.gender === 1) {
    actor_gender.innerHTML = "Пол: <b>Женшина</b>";
  } else {
    actor_gender.innerHTML = "Пол: <b>Мужчина</b>";
  }
  actor_movies.innerHTML = "Все фильмов: <b>нет информации</b>";
  btn_img.src = "/public/img/heart 1.svg";

  place.append(img, actorInf);
  actorInf.append(
    way,
    name,
    div,
    actor_inf,
    actor_career,
    actor_height,
    actor_age,
    actor_birthplace,
    actor_gender,
    actor_movies,
    btn_div
  );
  div.append(orig_name, div_img1, div_img2);
  btn_div.append(btn_img);
};
