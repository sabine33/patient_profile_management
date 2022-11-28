import { Layout, Login, Signup } from "@/components/auth";

export default {
  path: "/auth",
  component: Layout,
  children: [
    { path: "", redirect: "login" },
    { path: "login", component: Login },
    { path: "register", component: Signup },
    { path: "logout", component: Login },
  ],
};
