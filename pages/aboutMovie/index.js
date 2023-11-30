import { getMovieData } from "../../modules/helpers";
import { header_create, movieInf } from "../../modules/ui";

let header = document.querySelector("header");
header_create(header);

let movieId = location.search.split("=").at(-1);
let place = document.querySelector(".movie");
let mainBg = document.querySelector(".mainBg");

getMovieData("/movie/" + movieId + "?language=ru").then((res) => {
  movieInf(res.data, place, mainBg);
});
