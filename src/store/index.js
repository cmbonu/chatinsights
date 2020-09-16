import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    authToken:'',
    //backend_server: 'http://localhost:5000'
    backend_server: 'https://chata-services-anpd3pbcxq-ew.a.run.app'
  },
  mutations: {
    setToken(state, payload){
      state.authToken = payload.token
    }
  },
  actions: {},
  modules: {}
});
