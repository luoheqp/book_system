import { MutationTree } from "vuex";

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

const NormalModule = {
  namespaced: true,
  state: new State(),
  mutations: mutations
};

export default NormalModule;
