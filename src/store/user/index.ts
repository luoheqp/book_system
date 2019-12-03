import { GetterTree, MutationTree, ActionTree, Action } from "vuex";

class State {}

const mutations = <MutationTree<State>>{};

const actions = <ActionTree<State, any>>{};

const UserModule = {
  namespaced: true,
  state: new State(),
  mutations: mutations,
  actions: actions
};

export default UserModule;
