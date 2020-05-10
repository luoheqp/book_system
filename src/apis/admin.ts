import axiosInstance from "./request";

// 获取用户信息
export function adminGetUserInfo(id: string) {
  return axiosInstance({
    url: `/admin/user${id ? "?id=" + id : ""}`,
    method: "get"
  });
}
