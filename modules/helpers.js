import axios from "axios";

let base_url = import.meta.env.VITE_BASE_URL;
let movies_base_url = import.meta.env.VITE_TMDB_URL;

export const getData = async (path) => {
  try {
    const res = await axios.get(base_url + path);
    return res;
  } catch (e) {
    console.log(e);
  }
};

export const postData = async (path, body) => {
  try {
    const res = await axios.post(base_url + path, body);

    return res;
  } catch (e) {
    console.log(e);
  }
};

export const patchData = async (path, body) => {
  try {
    const res = await axios.patch(base_url + path, body);

    return res;
  } catch (e) {
    console.log(e);
  }
};

export const getMovieData = async (path) => {
  try {
    const res = await axios.get(movies_base_url + path, {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmYzRhYzI3YTkyZTg4ZTA1NmIyYmQ4MGMwOTU3OTFiNCIsInN1YiI6IjY1NWUwYjM0N2YyZDRhMDBlYTI1YmQ2MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.NpqkdyCFS90-L19f11mfJV-DEogp5l9lkgsdq0-bYXc`,
      },
    });

    return res;
  } catch (e) {
    console.log(e);
  }
};
