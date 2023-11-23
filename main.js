import { getMovieData } from "./modules/helpers";
import { headerCreate, reload_movies } from "./modules/ui";

let header = document.querySelector("header");
let now_playing_movies = document.querySelector(".movies");

headerCreate(header);

getMovieData("/movie/now_playing")
.then((res) => {
  console.log(res.data.results);
    reload_movies(res.data.results, now_playing_movies);
});
