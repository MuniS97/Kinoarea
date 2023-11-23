import { user } from "./user";

if (!user) {
  location.assign("/pages/login/");
}
