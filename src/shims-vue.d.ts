declare module "*.vue" {
  import Vue from "vue";
  export default Vue;
}

declare module "vue-awesome-swiper" {
  export const swiper: any;
  export const swiperSlide: any;
}

declare module "vue2-dropzone" {
  let vue2Dropzone: any;
  export default vue2Dropzone;
}

declare module "@/components/global/Toast" {
  let Toast: any;
  export default Toast;
}
