import Vue from "vue";
import Vuex, { StoreOptions } from "vuex";
import { RootState } from "./types";

// modules
import normal from "./normal/index";
import user from "./user/index";
import article from "./article/index";
import book from "./book/index";
import admin from "./admin/index";

Vue.use(Vuex);

const store: StoreOptions<RootState> = {
  state: {},
  modules: {
    normal,
    user,
    article,
    book,
    admin
  }
};

export default new Vuex.Store<RootState>(store);
