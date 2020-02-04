import axiosInstance from "./request";

export function postSearchInfo(search: string) {
  return axiosInstance({
    url: "search",
    method: "post",
    data: { search }
  });
}
