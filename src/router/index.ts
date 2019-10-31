import Vue from "vue";
import VueRouter from "vue-router";

// views
import Home from "../views/Home/index.vue";
import Random from "../views/Random/index.vue";
import Read from "../views/Read/index.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: {
      name: "home"
    }
  },
  {
    path: "/home",
    name: "home",
    component: Home
  },
  {
    path: "/random",
    name: "random",
    component: Random
  },
  {
    path: "/read",
    name: "read",
    component: Read
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
