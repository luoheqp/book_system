import Mock from "mockjs";
let bookinfo: Array<Object> = Mock.mock({
  "list|1-10": [
    {
      "id|+1": 1
    }
  ]
});

let book = {
  state: {
    bookname: "this is bookname",
    bookinfo: bookinfo
  }
};

export default book;
