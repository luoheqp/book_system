import { GetterTree, MutationTree, ActionTree, Action } from "vuex";
import Cookies from "js-cookie";
import {
  postUserInfoToSignUp,
  postUserInfoToSignIn,
  getUserInfo,
  postChangeUserInfo,
  postChangeUserCollection,
  postChangeUserLike,
  postToSaveReadSetting,
  getToGetCollection,
  patchToUpdateBookRecord,
  getToGetReadHistory,
  getToGetArticle
} from "@/apis/user";
import {
  IUserInfo,
  IUserChangeInfo,
  IUserChangeCollection,
  IUserChangeLike,
  IUserCollect
} from "@/types/user";

class State {
  public token: string = "";
  public info: IUserInfo = {} as IUserInfo;
  public userCollect: IUserCollect[] = [];
  public isAdmin: Boolean = false;
}

const mutations = <MutationTree<State>>{
  saveToken(state, token) {
    state.token = token;
  },
  saveUserInfo(state, userInfo) {
    state.info = userInfo;
  },
  signOut(state) {
    state.token = "";
    state.info = {} as IUserInfo;
    Cookies.remove("token");
  },
  saveUserCollect(state, userCollect) {
    state.userCollect = userCollect;
  },
  deleteUserCollect(state, id) {
    let temp = state.userCollect;
    state.userCollect = temp.map((item: IUserCollect) => {
      if (item._id !== id) {
        return item;
      }
    }) as IUserCollect[];
  },
  setIsAdmin(state, type) {
    state.isAdmin = type;
  }
};

const actions = <ActionTree<State, any>>{
  signup({ commit }, data) {
    return new Promise((resolve, reject) => {
      // 注册执行
      postUserInfoToSignUp(data).then((res: any) => {
        if (res.code === 0) {
          const { token } = res;
          // 保存 token 并持久化
          commit("saveToken", token);
          // cookie 保存三天
          Cookies.set("token", token, { expires: 3 });
          resolve();
        } else {
          reject(res.msg);
        }
      });
    });
  },
  signin({ commit }, data) {
    return new Promise((resolve, reject) => {
      // 注册执行
      postUserInfoToSignIn(data).then((res: any) => {
        if (res.code === 0) {
          const { token } = res;
          // 保存 token 并持久化
          commit("saveToken", token);
          // cookie 保存三天
          Cookies.set("token", token, { expires: 3 });
          resolve();
        } else {
          reject(res.msg);
        }
      });
    });
  },
  getUserInfo({ commit }) {
    return new Promise((resolve, reject) => {
      getUserInfo().then((res: any) => {
        const { data } = res;
        commit("saveUserInfo", data);
        // 设置是否为管理员
        commit("setIsAdmin", !!data.isAdmin);
        resolve(data);
      });
    });
  },
  changeUserInfo({ commit }, data: IUserChangeInfo) {
    return new Promise((resolve, reject) => {
      postChangeUserInfo(data).then((res: any) => {
        if (res.code === 0) {
          resolve({ code: 0 });
        }
      });
    });
  },
  postUserCollect({ commit }, data: IUserChangeCollection) {
    return new Promise(resolve => {
      postChangeUserCollection(data).then((res: any) => {
        if (!data.type) {
          commit("deleteUserCollect", data.bookId);
        }
        resolve();
      });
    });
  },
  postUserLike({ commit }, data: IUserChangeLike) {
    return new Promise(resolve => {
      postChangeUserLike(data).then((res: any) => {
        resolve();
      });
    });
  },
  saveSetting({ commit }, data: any) {
    return new Promise(resolve => {
      postToSaveReadSetting(data).then((res: any) => {
        console.log(res);
      });
    });
  },
  getCollect({ commit }) {
    return new Promise(resolve => {
      getToGetCollection().then((res: any) => {
        const { data } = res;
        commit("saveUserCollect", data);
        resolve(data);
      });
    });
  },
  updateBookRecord({ commit }, data: any) {
    patchToUpdateBookRecord(data);
  },
  getReadHistory({ commit }) {
    return new Promise(resolve => {
      getToGetReadHistory().then(res => {
        resolve(res.data);
      });
    });
  },
  getArticle({ commit }) {
    return new Promise(resolve => {
      getToGetArticle().then((res: any) => {
        resolve(res.data);
      });
    });
  }
};

const UserModule = {
  namespaced: true,
  state: new State(),
  mutations: mutations,
  actions: actions
};

export default UserModule;
