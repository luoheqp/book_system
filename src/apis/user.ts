import axiosInstance from "./request";
import {
  IUserSignUpInfo,
  IUserSignInInfo,
  IUserChangeInfo,
  IUserChangeCollection,
  IUserChangeLike
} from "@/types/user";
// import { IUserSignUpSuccess } from "@/store/user/types";

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

export function postChangeUserInfo(changeInfo: IUserChangeInfo) {
  return axiosInstance({
    url: "user",
    method: "patch",
    data: changeInfo
  });
}

export function postChangeUserCollection(changeInfo: IUserChangeCollection) {
  return axiosInstance({
    url: "user/collect",
    method: "patch",
    data: changeInfo
  });
}

export function postChangeUserLike(changeInfo: IUserChangeLike) {
  return axiosInstance({
    url: "user/like",
    method: "patch",
    data: changeInfo
  });
}

export function postToSaveReadSetting(changeInfo: any) {
  return axiosInstance({
    url: "user/readSet",
    method: "patch",
    data: { setting: changeInfo }
  });
}

export function getToGetCollection() {
  return axiosInstance({
    url: "/user/collection",
    method: "get"
  });
}

export function patchToUpdateBookRecord(data: any) {
  return axiosInstance({
    url: "/user/updateRecord",
    method: "patch",
    data
  });
}

export function getToGetReadHistory() {
  return axiosInstance({
    url: "/user/readHistory",
    method: "get"
  });
}
