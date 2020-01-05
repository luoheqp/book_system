import Vue from "vue";
import ToastComponent from "./Toast.vue";

const Toast = {};
let showToast = false; // 存储loading显示状态
let toastNode = null; // 存储loading节点元素
const ToastConstructor = Vue.extend(ToastComponent);

Toast.install = function(Vue, options) {
  // 参数
  var opt = {
    duration: "2000"
  };
  for (var property in options) {
    opt[property] = options[property];
  }
  Vue.prototype.$toast = function(tips, type) {
    return new Promise(resolve => {
      if (type === "hide") {
        toastNode.isToastShow = showToast = false;
      } else {
        if (showToast) {
          // 如果toast还在，则不再执行
          return;
        }
        toastNode = new ToastConstructor({
          data: {
            isToastShow: showToast,
            content: tips
          }
        });
        toastNode.$mount();
        document.body.appendChild(toastNode.$el);
        toastNode.isToastShow = showToast = true;
        setTimeout(function() {
          toastNode.isToastShow = showToast = false;
          resolve();
        }, opt.duration);
      }
    });
  };

  ["show", "hide"].forEach(function(type) {
    Vue.prototype.$toast[type] = function(tips) {
      return Vue.prototype.$toast(tips, type);
    };
  });
};

export default Toast;
