import { createRouter, createWebHistory } from "vue-router";
import UserProfile from "./pages/UserProfile.vue";
import homepage from "./pages/homepage.vue";
import register from "./pages/register.vue";
const routes = [
  {
    path: "/",
    name: "home",
    component: homepage,
  },
  {
    path: "/user/:username",
    name: "user",
    component: UserProfile,
  },
  {
    path: "/register",
    name: "register",
    component: register,
  },
];

const routeur = createRouter({
  routes,
  history: createWebHistory(),
});

export default routeur;
