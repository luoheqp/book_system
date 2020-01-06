import { ActionTree, MutationTree } from "vuex";
import {
  postToCreateBook,
  getToGetBookTag,
  getToGetBookGroupInfo,
  getToGetBook
} from "@/apis/book";
import { ITag, ILineListItem } from "@/types/info";

class State {
  public bookList: any[] = [];
  public tagList: ITag[] = [];
  public randomBookGroupInfo: ILineListItem[] = [];
}

const mutations = <MutationTree<State>>{
  saveTagList(state, tagList) {
    state.tagList = tagList;
  },
  saveBookGroupInfo(state, bookGroupInfo) {
    state.randomBookGroupInfo = bookGroupInfo;
  }
};

const actions = <ActionTree<State, any>>{
  createBook({ commit }, data) {
    postToCreateBook(data).then((res: any) => {
      return res;
    });
  },
  getBookTag({ commit }) {
    getToGetBookTag().then((res: any) => {
      commit("saveTagList", res.data);
      return res;
    });
  },
  getBookGroupInfo({ commit }) {
    getToGetBookGroupInfo().then((res: any) => {
      commit("saveBookGroupInfo", res.data);
      return res;
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
