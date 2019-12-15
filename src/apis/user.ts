import axiosInstance from "./request";
import { IUserSignUpInfo, IUserSignInInfo } from "@/types/user";
import { IUserSignUpSuccess } from "@/store/user/types";

export function postUserInfoToSignUp(userInfo: IUserSignUpInfo) {
  return axiosInstance({
    url: "user",
    method: "post",
    data: userInfo
  });
}

export function postUserInfoToSignIn(userInfo: IUserSignInInfo) {
  return axiosInstance({
    url: "user/login",
    method: "post",
    data: userInfo
  });
}

export function getUserInfo() {
  return axiosInstance({
    url: "user",
    method: "get"
  });
}
