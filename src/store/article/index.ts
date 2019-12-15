import { IArticleInfo } from "@/types/article";
import { ActionTree } from "vuex";
import { postTocreateArticle } from "@/apis/article";

class State {
  public article!: IArticleInfo;
}

const actions = <ActionTree<State, any>>{
  createArticle({ commit }, data) {
    return new Promise((resolve, reject) => {
      postTocreateArticle(data).then((res: any) => {
        console.log(res);
      });
    });
  }
};

const ArticleModule = {
  namespaced: true,
  state: new State(),
  actions: actions
};

export default ArticleModule;
