import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Programs from "../views/Programs.vue";
import Workshops from "../views/Workshops.vue";
import DanceList from "../components/workshops/dance/danceWorkshopList.vue";
import CreateDance from "../components/workshops/dance/danceWorkshopCreate.vue";
import Advice from "../views/Advice.vue";
import Contact from "../views/Contact.vue";

const routes = [
  { path: "/", name: "Home", component: Home },
  {
    path: "/programs/:param?",
    name: "Programs",
    component: Programs,
    props: true,
    beforeEnter: (to, from, next) => {
      const { param } = to.params;
      if (!param || /^[a-zA-Z]+$/.test(param)) {
        next();
      } else {
        next(false);
      }
    },
  },
  {
    path: "/workshops/:param?",
    name: "Workshops",
    component: Workshops,
    props: true,
    beforeEnter: (to, from, next) => {
      const { param } = to.params;
      if (!param || /^[a-zA-Z]+$/.test(param)) {
        next();
      } else {
        next(false);
      }
    },
  },
  { path: "/workshops/dances", name: "DanceList", component: DanceList },
  {
    path: "/workshops/dances/create",
    name: "CreateDance",
    component: CreateDance,
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

export default router;
