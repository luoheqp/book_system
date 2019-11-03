import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// reset style
import "@/assets/styles/reset.less";

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
