import axiosInstance from "./request";
import { IUserSignUpInfo } from "@/types/user";
import { IUserSignUpSuccess } from "@/store/user/types";

export function postUserInfoToSignUp(userInfo: IUserSignUpInfo) {
  return axiosInstance({
    method: "post",
    url: "user",
    data: userInfo
  });
}

export function getUserInfo() {
  return axiosInstance({
    method: "get",
    url: "user"
  });
}
