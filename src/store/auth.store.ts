import { defineStore } from "pinia";

import { Auth } from "@/helpers/apiHelpers";
import { router } from "@/router";
import { errorAlert, successAlert } from "@/helpers";

interface IAuthInterface {
  user: null | any;
  returnUrl: string | null;
  token: string | null;
}

export const useAuthStore = defineStore({
  id: "auth",
  state: (): IAuthInterface => ({
    user: JSON.parse(localStorage.getItem("user")!),
    returnUrl: "/dashboard",
    token: null,
  }),
  actions: {
    async login(email: string, password: string) {
      try {
        //login via auth
        const response = await Auth.login(email, password);
        alert(JSON.stringify(response.data));
        //set local values
        this.user = response.data.user;
        this.token = response.data.token;
        //fill localstorage
        localStorage.setItem("user", JSON.stringify(this.user));
        localStorage.setItem("token", JSON.stringify(this.token));
        //redirect
        router.push(this.returnUrl || "/");
        //display alert
        successAlert(response);
      } catch (error: any) {
        errorAlert(error);
      }
    },
    async signup(email: string, password: string) {
      try {
        const response = await Auth.signup(email, password);
        successAlert(response);
      } catch (ex) {
        errorAlert(ex);
      }
    },
    logout() {
      this.user = null;
      this.token = null;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      router.push("/auth/login");
    },
  },
});
