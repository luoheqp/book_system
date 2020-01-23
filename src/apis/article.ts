import axiosInstance from "./request";
import { ICreateArticleInfo, IGetArticleListInfo } from "@/types/article";

export function postTocreateArticle(data: ICreateArticleInfo) {
  return axiosInstance({
    url: "/article",
    method: "post",
    data: data
  });
}

export function getArticleList(data: IGetArticleListInfo) {
  return axiosInstance({
    url: "/article",
    method: "get",
    params: data
  });
}

export function getArticleById(data: string) {
  return axiosInstance({
    url: `/article/${data}`,
    method: "get"
  });
}
