import axiosInstance from "./request";

export function getBookInfo() {
  axiosInstance
    .get("/testBookInfo")
    .then(res => {
      console.log(res.data.data);
      //   commit("setBookInfo", res.data.data);
    })
    .catch(err => {
      console.log(err);
    });
}
