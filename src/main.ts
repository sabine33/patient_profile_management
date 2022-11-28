import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import { router } from "./router";

const app = createApp(App);
app.use(createPinia());

import Vue3EasyDataTable from "vue3-easy-data-table";
import "vue3-easy-data-table/dist/style.css";

import Notifications from "@kyvg/vue3-notification";

app.component("EasyDataTable", Vue3EasyDataTable);
app.use(router);
app.use(Notifications);

app.config.errorHandler = (err) => {
  // alert(err);
};

app.mount("#app");
