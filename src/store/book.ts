import axios from "axios";

let book = {
  state: {
    bookname: "this is bookname",
    bookInfo: []
  },
  mutations: {
    setBookInfo(state: any, data: any) {
      state.bookInfo = data;
    }
  },
  actions: {
    getBookInfo({ state, commit }: any) {
      axios
        .get(
          "https://www.easy-mock.com/mock/5db80f643a19ea177648c646/api/testBookInfo"
        )
        .then(res => {
          console.log(res.data.data);
          commit("setBookInfo", res.data.data);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};

export default book;
