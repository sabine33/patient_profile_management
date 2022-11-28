import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from "vue-router";

import { useAuthStore } from "@/store";
import authRoutes from "./auth.route";
import dashboardRoutes from "./dashboard.route";

export const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  linkActiveClass: "active",
  routes: [
    { ...authRoutes },
    { ...dashboardRoutes },
    { path: "/:pathMatch(.*)*", redirect: "/" },
  ],
});

router.beforeEach(async (to) => {
  const publicPages = ["/auth/login", "/auth/register"];
  const authRequired = !publicPages.includes(to.path);
  const authStore = useAuthStore();

  if (authRequired && !authStore.user) {
    authStore.returnUrl = to.fullPath;
    return "/auth/login";
  }
});
