import { defineStore } from "pinia";

import { Auth } from "@/helpers/apiHelpers";
import { router } from "@/router";
import { errorAlert, successAlert } from "@/helpers";
import { notify } from "@kyvg/vue3-notification";

interface IAuthInterface {
  user: null | any;
  returnUrl: string | null;
  token: string | null;
}

export const useAuthStore = defineStore({
  id: "auth",
  state: (): IAuthInterface => ({
    user:
      JSON.parse(localStorage.getItem("user") || JSON.stringify("")) || null,
    token:
      JSON.parse(localStorage.getItem("token") || JSON.stringify("")) || null,
    returnUrl: "/dashboard",
  }),
  actions: {
    async login(email: string, password: string) {
      try {
        const response = await Auth.login(email, password);
        this.user = response.data.user;
        this.token = response.data.token;
        localStorage.setItem("user", JSON.stringify(this.user));
        localStorage.setItem("token", JSON.stringify(this.token));
        await router.push(this.returnUrl || "/");
        successAlert(response);
      } catch (error: any) {
        errorAlert(error);
      }
    },
    async signup(email: string, password: string) {
      try {
        const response = await Auth.signup(email, password);
        successAlert(response);
        await router.push("/auth/login");
      } catch (ex) {
        errorAlert(ex);
      }
    },
    logout() {
      this.user = null;
      this.token = null;
      localStorage.setItem("user", "");
      localStorage.setItem("token", "");
      router.push("/auth/login");
      notify({ title: "Successfully logged out" });
    },
  },
});
