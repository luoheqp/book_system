import Vue from "vue";
import { getBookInfo } from "@/apis/index";
import { ILineListItem, IListItem } from "@/types/info";

let book = {
  state: {
    randomBookGroupInfo: [
      {
        id: 9907,
        name: "lishi",
        bookGroup: [
          {
            id: "10",
            picPath: "@image(200x200)",
            name: "@title(3, 5)1",
            author: "@author",
            date: "@date(yyy-MM-dd)",
            press: "@press",
            desc: "@cparagraph",
            tag: "@range(2, 6)"
          },
          {
            id: "11",
            picPath: "@image(200x200)",
            name: "@title(3, 5)2",
            author: "@author",
            date: "@date(yyy-MM-dd)",
            press: "@press",
            desc: "@cparagraph",
            tag: "@range(2, 6)"
          },
          {
            id: "12",
            picPath: "@image(200x200)",
            name: "@title(3, 5)3",
            author: "@author",
            date: "@date(yyy-MM-dd)",
            press: "@press",
            desc: "@cparagraph",
            tag: "@range(2, 6)"
          },
          {
            id: "13",
            picPath: "@image(200x200)",
            name: "@title(3, 5)4",
            author: "@author",
            date: "@date(yyy-MM-dd)",
            press: "@press",
            desc: "@cparagraph",
            tag: "@range(2, 6)"
          },
          {
            id: "14",
            picPath: "@image(200x200)",
            name: "@title(3, 5)5",
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
      {
        id: 9917,
        name: "zzhi",
        bookGroup: [
          {
            id: "10",
            picPath: "@image(200x200)",
            name: "@title(3, 5)1",
            author: "@author",
            date: "@date(yyy-MM-dd)",
            press: "@press",
            desc: "@cparagraph",
            tag: "@range(2, 6)"
          },
          {
            id: "11",
            picPath: "@image(200x200)",
            name: "@title(3, 5)2",
            author: "@author",
            date: "@date(yyy-MM-dd)",
            press: "@press",
            desc: "@cparagraph",
            tag: "@range(2, 6)"
          },
          {
            id: "12",
            picPath: "@image(200x200)",
            name: "@title(3, 5)3",
            author: "@author",
            date: "@date(yyy-MM-dd)",
            press: "@press",
            desc: "@cparagraph",
            tag: "@range(2, 6)"
          },
          {
            id: "13",
            picPath: "@image(200x200)",
            name: "@title(3, 5)4",
            author: "@author",
            date: "@date(yyy-MM-dd)",
            press: "@press",
            desc: "@cparagraph",
            tag: "@range(2, 6)"
          },
          {
            id: "14",
            picPath: "@image(200x200)",
            name: "@title(3, 5)5",
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
      {
        id: 9922,
        name: "dili",
        bookGroup: [
          {
            id: "10",
            picPath: "@image(200x200)",
            name: "@title(3, 5)1",
            author: "@author",
            date: "@date(yyy-MM-dd)",
            press: "@press",
            desc: "@cparagraph",
            tag: "@range(2, 6)"
          },
          {
            id: "11",
            picPath: "@image(200x200)",
            name: "@title(3, 5)2",
            author: "@author",
            date: "@date(yyy-MM-dd)",
            press: "@press",
            desc: "@cparagraph",
            tag: "@range(2, 6)"
          },
          {
            id: "12",
            picPath: "@image(200x200)",
            name: "@title(3, 5)3",
            author: "@author",
            date: "@date(yyy-MM-dd)",
            press: "@press",
            desc: "@cparagraph",
            tag: "@range(2, 6)"
          },
          {
            id: "13",
            picPath: "@image(200x200)",
            name: "@title(3, 5)4",
            author: "@author",
            date: "@date(yyy-MM-dd)",
            press: "@press",
            desc: "@cparagraph",
            tag: "@range(2, 6)"
          },
          {
            id: "14",
            picPath: "@image(200x200)",
            name: "@title(3, 5)5",
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
