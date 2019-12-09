import axiosInstance from "./request";
import { IUserSignUpInfo } from "@/types/user";

export function postUserInfoToSignUp(userInfo: IUserSignUpInfo) {
  return axiosInstance({
    method: "post",
    url: "user",
    data: userInfo
  });
}
