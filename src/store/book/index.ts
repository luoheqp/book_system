import { ActionTree, MutationTree } from "vuex";
import {
  postToCreateBook,
  getToGetBookTag,
  getToGetBookGroupInfo
} from "@/apis/book";
import { ITag, ILineListItem } from "@/types/info";
import { IEbookSet } from "@/types/reader";

class State {
  public bookList: any[] = [];
  public tagList: ITag[] = [];
  public randomBookGroupInfo: ILineListItem[] = [];
  public ebookSet: IEbookSet = {
    fontSize: 12,
    theme: "default",
    isFull: false
  };
}

const mutations = <MutationTree<State>>{
  saveTagList(state, tagList) {
    state.tagList = tagList;
  },
  saveBookGroupInfo(state, bookGroupInfo) {
    state.randomBookGroupInfo = bookGroupInfo;
  },
  setEbookSet(state, data) {
    // TODO: 枚举类型解决 ?
    state.ebookSet[data.key as "fontSize"] = data.value;
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
