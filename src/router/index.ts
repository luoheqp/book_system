import Vue from "vue";
import VueRouter from "vue-router";

// views
import Home from "../views/Home/index.vue";
import Random from "../views/Random/index.vue";
import Read from "../views/Read/index.vue";
import User from "../views/User/index.vue";
import SignIn from "../views/SignIn/index.vue";
import SignUp from "../views/SignUp/index.vue";
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
    path: "/read",
    name: "read",
    component: Read
  },
  {
    path: "/user",
    name: "user",
    component: User
  },
  {
    path: "/signIn",
    name: "signIn",
    component: SignIn
  },
  {
    path: "/signUp",
    name: "signUp",
    component: SignUp
  },
  {
    path: "/write",
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
