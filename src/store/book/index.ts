import { ActionTree, MutationTree } from "vuex";

class State {
  public bookList: any[] = [];
}

const mutations = <MutationTree<State>>{};

const actions = <ActionTree<State, any>>{
  createBook({ commit }, data) {}
};

const ArticleModule = {
  namespaced: true,
  state: new State(),
  actions: actions,
  mutations: mutations
};

export default ArticleModule;
