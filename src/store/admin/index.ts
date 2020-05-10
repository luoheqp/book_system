import { IUserInfo } from "@/types/user";
import { ActionTree, MutationTree } from "vuex";
import { adminGetUserInfo } from "@/apis/admin";

class State {
  public userInfoList: IUserInfo[] = [];
}

const mutations = <MutationTree<State>>{
  saveUserInfo(state, data: IUserInfo[]) {
    state.userInfoList = data;
  }
};

const actions = <ActionTree<State, any>>{
  getUserInfo({ commit }, data = "") {
    return new Promise(resolve => {
      adminGetUserInfo(data).then(res => {
        commit("saveUserInfo", res);
        resolve(res);
      });
    });
  }
};

const AdminModule = {
  namespaced: true,
  state: new State(),
  actions: actions,
  mutations: mutations
};

export default AdminModule;
