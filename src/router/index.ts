import Vue from "vue";
import VueRouter from "vue-router";

// views
import Home from "../views/Home/index.vue";
import Random from "../views/Random/index.vue";
import Reader from "../views/Reader/index.vue";
import User from "../views/User/index.vue";
import Write from "../views/Write/index.vue";

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
    path: "/reader",
    name: "reader",
    component: Reader
  },
  {
    path: "/user",
    name: "user",
    component: User
  },
  {
    path: "/write/:bookId",
    name: "write",
    component: Write
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
