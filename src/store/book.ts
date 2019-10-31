import Vue from "vue";
import { getBookInfo } from "@/apis/index";
import { ILineListItem, IListItem } from "@/types/info";

// fake data
import bookGroupData from "./fakeData/bookGroup";

let book = {
  state: {
    randomBookGroupInfo: bookGroupData
  },
  mutations: {
    setBookInfo(state: any, data: any) {
      state.bookInfo = data;
    }
  },
  actions: {
    getBookInfo({ state, commit }: any) {
      getBookInfo();
    }
  }
};

export default book;
