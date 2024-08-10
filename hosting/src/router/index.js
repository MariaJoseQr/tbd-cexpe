import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import Home from "../views/Home.vue";
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
import Programs from "../views/programs/Programs.vue";
import RegisterProgram from "../views/programs/options/Register.vue";
import EditProgram from "../views/programs/options/Edit.vue";
import Categories from "../views/categories/Categories.vue";
import RegisterCategory from "../views/categories/options/Register.vue";
import EditCategory from "../views/categories/options/Edit.vue";
import Workshops from "../views/Workshops.vue";
import Advice from "../views/Advice.vue";
import Contact from "../views/Contact.vue";

const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/login", name: "Login", component: Login },
  { path: "/register", name: "Register", component: Register },
  {
    path: "/programs",
    name: "Programs",
    component: Programs,
    meta: { requiresAuth: true },
  },
  {
    path: "/programs/edit/:id",
    name: "EditProgram",
    component: EditProgram,
    meta: { requiresAuth: true },
  },
  {
    path: "/programs/register",
    name: "RegisterProgram",
    component: RegisterProgram,
    meta: { requiresAuth: true },
  },
  {
    path: "/categories",
    name: "Categories",
    component: Categories,
  },
  {
    path: "/categories/edit/:id",
    name: "EditCategory",
    component: EditCategory,
  },
  {
    path: "/categories/register",
    name: "RegisterCategory",
    component: RegisterCategory,
  },
  {
    path: "/workshops",
    name: "Workshops",
    component: Workshops,
  },
  {
    path: "/advice/:param?",
    name: "Advice",
    component: Advice,
    props: true,
    beforeEnter: (to, from, next) => {
      const { param } = to.params;
      if (!param || /^[0-9]+$/.test(param)) {
        next();
      } else {
        next(false);
      }
    },
  },
  { path: "/contact", name: "Contact", component: Contact },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  const isAuthenticated = !!authStore.user;

  if (
    to.matched.some((record) => record.meta.requiresAuth) &&
    !isAuthenticated
  ) {
    next({ name: "Login" });
  } else {
    next();
  }
});

export default router;
