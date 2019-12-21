import { IArticleInfo } from "@/types/article";
import { ActionTree, MutationTree } from "vuex";
import { postTocreateArticle, getArticleList } from "@/apis/article";

class State {
  public articleList: IArticleInfo[] = [];
}

const mutations = <MutationTree<State>>{
  saveArticleList(state, data: IArticleInfo[]) {
    let { articleList } = state;
    // articleList.push(...data);
    state.articleList = data;
  }
};

const actions = <ActionTree<State, any>>{
  createArticle({ commit }, data) {
    return new Promise((resolve, reject) => {
      postTocreateArticle(data).then((res: any) => {
        console.log(res);
      });
    });
  },
  getArticleList({ commit }, data) {
    return new Promise((resolve, reject) => {
      getArticleList(data).then((res: any) => {
        const { data } = res;
        commit("saveArticleList", data);
        resolve({ code: 0 });
      });
    });
  }
};

const ArticleModule = {
  namespaced: true,
  state: new State(),
  actions: actions,
  mutations: mutations
};

export default ArticleModule;
