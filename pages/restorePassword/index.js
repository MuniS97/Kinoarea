import { getData, patchData } from "../../modules/helpers";

let form = document.forms.restorePass;

form.onsubmit = (e) => {
  e.preventDefault();

  let user = {};

  let fm = new FormData(form);
  fm.forEach((value, key) => (user[key] = value));

  getData("/users?email=" + user.email).then((res) => {
    if (!res) return;
    if (res.status !== 200 && res.status !== 201) return;
    if (res.data.length === 0) {
      alert("not found");
      return;
    }

    let [res_user] = res.data;

    patchData(`/users/${res_user.id}`, { password: +user.password }).then(
      (res) => {
        if (res.status !== 200 && res.status !== 201) return;
        alert("success");
        location.assign("/pages/login");
        form.reset();
      }
    );
  });
};
