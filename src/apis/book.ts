import axiosInstance from "./request";

// 获取指定书籍的信息
export function getToGetBookInfo(data: string) {
  return axiosInstance({
    url: `/book/${data}`,
    method: "get"
  });
}

// 创建书籍
export function postToCreateBook(data: FormData) {
  return axiosInstance({
    url: "/book",
    method: "post",
    data: data
  });
}

// 获取书籍分类标签
export function getToGetBookTag() {
  return axiosInstance({
    url: "/bookTag",
    method: "get"
  });
}

// 获取全部书籍的分组信息
export function getToGetBookGroupInfo() {
  return axiosInstance({
    url: "/book",
    method: "get"
  });
}

export function getBookInfoWithUserId(data: any) {
  return axiosInstance({
    url: "/book/bookInfo",
    method: "post",
    data: data
  });
}
