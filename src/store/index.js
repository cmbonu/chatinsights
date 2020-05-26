import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    authToken:''
  },
  mutations: {
    setToken(state, payload){
      state.authToken = payload.token
    }
  },
  actions: {},
  modules: {}
});
