export function headerCreate(place) {
  place.innerHTML = "";
  place.innerHTML = `
      <div class="left">
        <a href='/'>
          <img src="/public/img/headerLeft (1).svg" alt="image">
        </a>
        <img src="/public/img/headerLeft (2).svg" alt="image">
      </div>
      <nav>
        <a href="#">Афиша</a>
        <a href="#">Медиа</a>
        <a href="#">Фильмы</a>
        <a href="#">Актёры</a>
        <a href="#">Новости</a>
        <a href="#">Подборки</a>
        <a href="#">Категории</a>
      </nav>
      <div class="right">
        <button data-popup="search">
          <img src="/public/img/headerRight.svg" alt="icon">
        </button>
        <button data-popup="sign-in">Войти</button>
      </div>
      `;
}

export function reload_movies(arr, place) {
  place.innerHTML = "";
  for (let idx = 0; idx < 8; idx++) {
    const poster = arr[idx].poster_path;
    let img = document.createElement("img");
    img.src = "https://image.tmdb.org/t/p/original" + poster;
    place.append(img);
  }
}
