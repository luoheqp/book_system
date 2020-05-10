import Vue from "vue";
import VueRouter from "vue-router";

// views
import Home from "../views/Home/index.vue";
import Market from "../views/Market/index.vue";
import Reader from "../views/Reader/index.vue";
import User from "../views/User/index.vue";
import Write from "../views/Write/index.vue";
import AddBook from "../views/AddBook/index.vue";
import Article from "../views/Article/index.vue";

// admin
import MUser from "../views/Admin/user.vue";

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
    path: "/market",
    name: "market",
    component: Market
  },
  {
    path: "/reader/:id",
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
  },
  {
    path: "/addBook",
    name: "addBook",
    component: AddBook
  },
  {
    path: "/article/:articleId",
    name: "article",
    component: Article
  },
  {
    path: "/admin/user",
    name: "adminUser",
    component: MUser
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
