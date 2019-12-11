import axiosInstance from "./request";
import { IUserSignUpInfo, IUserSignInInfo } from "@/types/user";
import { IUserSignUpSuccess } from "@/store/user/types";

export function postUserInfoToSignUp(userInfo: IUserSignUpInfo) {
  return axiosInstance({
    method: "post",
    url: "user",
    data: userInfo
  });
}

export function postUserInfoToSignIn(userInfo: IUserSignInInfo) {
  return axiosInstance({
    method: "post",
    url: "user/login",
    data: userInfo
  });
}

export function getUserInfo() {
  return axiosInstance({
    method: "get",
    url: "user"
  });
}
