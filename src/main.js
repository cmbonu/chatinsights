import Vue from "vue";
import App from "./App.vue";
//import router from "./router";
import store from "./store";
import VueRouter from 'vue-router'
import SummaryBar from "./components/GroupSummary.vue";
import UploadForm from "./components/UploadForm.vue";
import LoginComponent from "./components/LoginComponent.vue";
import './../node_modules/bulma/css/bulma.css';
import './../node_modules/chart.js';
import './../node_modules/@fortawesome/fontawesome-free/css/all.css';
import './../node_modules/axios/dist/axios.min.js';

Vue.config.productionTip = false;
Vue.use(VueRouter)

//const GroupSummary  = {template : SummaryBar}
//const ChatUploadForm = {template : UploadForm}

const routes = [
  {path : '/', component : LoginComponent},
  {path : '/login/:access_token', component : LoginComponent},
  {path : '/login', component : LoginComponent},
  {path : '/upload', component : UploadForm},
  {path : '/summary', component : SummaryBar},
]

const router = new VueRouter({
  routes // short for `routes: routes`
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
