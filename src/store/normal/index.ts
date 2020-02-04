import { MutationTree, ActionTree } from "vuex";
import { postSearchInfo } from "@/apis/common";

class State {
  public isSignInShow: boolean = false;
  public isSignUpShow: boolean = false;
}

const mutations = <MutationTree<State>>{
  toggleSignIn(state) {
    let { isSignInShow } = state;
    state.isSignInShow = !isSignInShow;
  },
  toggleSignUp(state) {
    let { isSignUpShow } = state;
    state.isSignUpShow = !isSignUpShow;
  }
};

const actions = <ActionTree<State, any>>{
  search({ commit }, searchKey: string[]) {
    return new Promise(resolve => {
      let search: string = JSON.stringify(searchKey);
      postSearchInfo(search).then((res: any) => {
        resolve(res.data);
      });
    });
  }
};

const NormalModule = {
  namespaced: true,
  state: new State(),
  mutations: mutations,
  actions: actions
};

export default NormalModule;
