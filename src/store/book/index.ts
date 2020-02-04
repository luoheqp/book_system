import { ActionTree, MutationTree } from "vuex";
import {
  postToCreateBook,
  getToGetBookTag,
  getToGetBookGroupInfo,
  getToGetBookInfo
} from "@/apis/book";
import { ITag, ILineListItem } from "@/types/info";
import { IEbookSet } from "@/types/reader";
import { IBook } from "@/types/book";

class State {
  public book: any = "";
  public bookInfo: IBook | object = {};
  public bookList: any[] = [];
  public tagList: ITag[] = [];
  public bookGroupInfo: ILineListItem[] = [];
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
    state.bookGroupInfo = bookGroupInfo;
  },
  setEbookSet(state, data) {
    // TODO: 枚举类型解决 ?
    state.ebookSet[data.key as "fontSize"] = data.value;
  },
  setEbook(state, data) {
    state.book = data;
  },
  saveBookInfo(state, data) {
    state.bookInfo = data;
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
  },
  getBookInfo({ commit }, data) {
    return new Promise(resolve => {
      getToGetBookInfo(data).then((res: any) => {
        commit("saveBookInfo", res.data as IBook);
        resolve(res.data);
        return res;
      });
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
