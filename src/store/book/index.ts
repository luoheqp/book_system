import { ActionTree, MutationTree } from "vuex";
import { postToCreateBook } from "@/apis/book";

class State {
  public bookList: any[] = [];
}

const mutations = <MutationTree<State>>{};

const actions = <ActionTree<State, any>>{
  createBook({ commit }, data) {
    postToCreateBook(data).then((res: any) => {
      if (res.code === 0) {
        return res;
      }
    });
  }
};

const BookModule = {
  namespaced: true,
  state: new State(),
  actions: actions,
  mutations: mutations
};

export default BookModule;
