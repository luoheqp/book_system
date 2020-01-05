import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// reset style
import "@/assets/styles/reset.less";

// icon
// import "@/assets/icon/iconfont.css";

// toast
import Toast from "@/components/global/Toast";
Vue.use(Toast);

Vue.config.productionTip = false;

Vue.config.keyCodes = {
  lar: 37,
  rar: 39
};

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
