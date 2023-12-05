import { getMovieData } from "../../modules/helpers";
import { actorInf, header_create } from "../../modules/ui";

let header = document.querySelector("header");
let actorId = location.search.split("=").at(-1);
let actorPlace = document.querySelector(".actor");

header_create(header);

Promise.all([getMovieData("/person/" + actorId)]).then(([actor]) => {
  actorInf(actor.data, actorPlace);
});
