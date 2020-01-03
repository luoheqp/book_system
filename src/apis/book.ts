import axiosInstance from "./request";

export function postToCreateBook(data: FormData) {
  return axiosInstance({
    url: "/book",
    method: "post",
    data: data
  });
}
