import { getMovieData } from "../../modules/helpers";
import { header_create, movieInf } from "../../modules/ui";

let header = document.querySelector("header");
header_create(header);

let movieId = location.search.split("=").at(-1);
let place = document.querySelector("main");

getMovieData("/movie/" + movieId + "?language=ru")
.then((res) => {
  movieInf(res.data, place);
});
