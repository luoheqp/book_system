import Vue from "vue";
import { IArticleItem } from "@/types/info";

// fake data
import articleGroupData from "./fakeData/articleGroup";

let book = {
  state: {
    articleGroupInfo: articleGroupData
  },
  mutations: {
    setArticleInfo(state: any, data: any) {
      state.articleGroupInfo = data;
    }
  },
  actions: {}
};

export default book;
