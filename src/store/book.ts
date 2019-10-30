import Vue from "vue";
import { getBookInfo } from "@/apis/index";

let book = {
  state: {
    bookname: "this is bookname",
    bookInfo: [
      {
        id: "10",
        picPath: "@image(200x200)",
        name: "@title(3, 5)",
        author: "@author",
        date: "@date(yyy-MM-dd)",
        press: "@press",
        desc: "@cparagraph",
        tag: "@range(2, 6)"
      },
      {
        id: "11",
        picPath: "@image(200x200)",
        name: "@title(3, 5)",
        author: "@author",
        date: "@date(yyy-MM-dd)",
        press: "@press",
        desc: "@cparagraph",
        tag: "@range(2, 6)"
      },
      {
        id: "12",
        picPath: "@image(200x200)",
        name: "@title(3, 5)",
        author: "@author",
        date: "@date(yyy-MM-dd)",
        press: "@press",
        desc: "@cparagraph",
        tag: "@range(2, 6)"
      },
      {
        id: "13",
        picPath: "@image(200x200)",
        name: "@title(3, 5)",
        author: "@author",
        date: "@date(yyy-MM-dd)",
        press: "@press",
        desc: "@cparagraph",
        tag: "@range(2, 6)"
      },
      {
        id: "14",
        picPath: "@image(200x200)",
        name: "@title(3, 5)",
        author: "@author",
        date: "@date(yyy-MM-dd)",
        press: "@press",
        desc: "@cparagraph",
        tag: "@range(2, 6)"
      },
      {
        id: "15",
        picPath: "@image(200x200)",
        name: "@title(3, 5)",
        author: "@author",
        date: "@date(yyy-MM-dd)",
        press: "@press",
        desc: "@cparagraph",
        tag: "@range(2, 6)"
      },
      {
        id: "16",
        picPath: "@image(200x200)",
        name: "@title(3, 5)",
        author: "@author",
        date: "@date(yyy-MM-dd)",
        press: "@press",
        desc: "@cparagraph",
        tag: "@range(2, 6)"
      },
      {
        id: "17",
        picPath: "@image(200x200)",
        name: "@title(3, 5)",
        author: "@author",
        date: "@date(yyy-MM-dd)",
        press: "@press",
        desc: "@cparagraph",
        tag: "@range(2, 6)"
      },
      {
        id: "18",
        picPath: "@image(200x200)",
        name: "@title(3, 5)",
        author: "@author",
        date: "@date(yyy-MM-dd)",
        press: "@press",
        desc: "@cparagraph",
        tag: "@range(2, 6)"
      },
      {
        id: "19",
        picPath: "@image(200x200)",
        name: "@title(3, 5)",
        author: "@author",
        date: "@date(yyy-MM-dd)",
        press: "@press",
        desc: "@cparagraph",
        tag: "@range(2, 6)"
      }
    ]
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
