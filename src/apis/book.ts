import axiosInstance from "./request";

export function postToCreateBook(data: FormData) {
  return axiosInstance({
    url: "/book",
    method: "post",
    data: data
  });
}

export function getToGetBookTag() {
  return axiosInstance({
    url: "/bookTag",
    method: "get"
  });
}

export function getToGetBookGroupInfo() {
  return axiosInstance({
    url: "/book",
    method: "get"
  });
}
