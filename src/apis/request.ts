import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import router from "@/router";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: "https://www.easy-mock.com/mock/5db80f643a19ea177648c646/api",
  timeout: 10000,
  headers: {
    contentType: "application/json;charset=UTF-8"
  }
});

// 添加请求拦截
axiosInstance.interceptors.request.use(
  function(config): AxiosRequestConfig {
    // config.headers: Object
    return config;
  },
  function(err) {
    return Promise.reject(err);
  }
);

// 添加响应拦截
axiosInstance.interceptors.response.use(
  function(response: AxiosResponse): any {
    if (response.status === 200) {
      return handleResponse(response);
    }
  },
  function(err) {
    console.log("err: ", err);
    return Promise.reject(err);
  }
);

// 处理后台返回响应的状态码
enum codeStatus {
  FINE = 0, // 没问题
  NEED_LOGIN = 1 // 未登录 , 需要进行登录操作
}

const handleResponse = async (response: AxiosResponse) => {
  const data = response.data;
  if (data.code === codeStatus.FINE) {
    // 响应无异常 , 传达数据
    return Promise.resolve(data.data);
  }
  if (data.code === codeStatus.NEED_LOGIN) {
    // 没有登录 , 进行消息提示并跳转登录页面
    router.replace("login");
    return;
  }
  return Promise.reject(data);
};

export default axiosInstance;
