import { getData, postData } from "../../modules/helpers";

let form = document.forms.signUp;

form.onsubmit = (e) => {
  e.preventDefault();

  let user = {};

  let fm = new FormData(form);
  fm.forEach((value, key) => (user[key] = value));

  getData("/users?email=" + user.email).then((res) => {
    if (res.status !== 200 && res.status !== 201) return;
    if (res.data.length > 0) {
      alert("account already taken!");
      return;
    }

    postData("/users", user).then((res) => {
      if (res.status !== 200 && res.status !== 201) return;
      location.assign("/pages/login/");
      form.reset();
    });
  });
};
