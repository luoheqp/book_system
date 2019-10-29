import Vue from "vue";
import Vuex from "vuex";

// modules
import user from "./user";
import book from "./book";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: "this is a token"
  },
  modules: {
    user,
    book
  }
});
