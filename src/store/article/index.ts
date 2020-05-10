import { IArticleInfo, IArticle } from "@/types/article";
import { ActionTree, MutationTree } from "vuex";
import {
  postTocreateArticle,
  getArticleList,
  getArticleById
} from "@/apis/article";

class State {
  public articleList: IArticleInfo[] = [];
  public article!: IArticle;
}

const mutations = <MutationTree<State>>{
  saveArticleList(state, data: IArticleInfo[]) {
    // let { articleList } = state;
    // articleList.push(...data);
    state.articleList = data;
  },
  saveArticle(state, data: IArticle) {
    state.article = data;
  }
};

const actions = <ActionTree<State, any>>{
  createArticle({ commit }, data) {
    return new Promise((resolve, reject) => {
      postTocreateArticle(data).then((res: any) => {
        resolve();
      });
    });
  },
  getArticleList({ commit }, data) {
    return new Promise((resolve, reject) => {
      getArticleList(data).then((res: any) => {
        const { data } = res;
        commit("saveArticleList", data);
        resolve(data);
      });
    });
  },
  getArticle({ commit }, data) {
    return new Promise(resolve => {
      getArticleById(data).then(res => {
        const { data } = res;
        commit("saveArticle", data);
        resolve(data);
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
