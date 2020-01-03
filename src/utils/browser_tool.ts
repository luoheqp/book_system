import router from "@/router";

export const toggleBrowserFullScreenState = (flag?: boolean): void => {
  let el: any = document.documentElement;
  let event: any;

  if (flag) {
    // 关闭浏览器全屏 => 事件兼容性处理
    event = document.exitFullscreen;
    el = document;
  } else {
    // 开启浏览器全屏 => 事件兼容性处理
    event =
      el.requestFullScreen ||
      el.webkitRequestFullScreen ||
      el.mozRequestFullScreen ||
      el.msRequestFullScreen;
  }

  if (typeof event != "undefined" && event) {
    event.call(el);
  } else if (typeof window.ActiveXObject != "undefined") {
    const wscript = new ActiveXObject("WScript.Shell");
    if (wscript != null) {
      wscript.SendKeys("{F11}");
    }
  }
};

export const goTargetPage = (name: string, params: any) => {
  router.push({ name: name, params: params });
};
