import axiosInstance from "./request";
import { ICreateArticleInfo } from "@/types/article";

export function postTocreateArticle(data: ICreateArticleInfo) {
  return axiosInstance({
    url: "/article",
    method: "post",
    data: data
  });
}
