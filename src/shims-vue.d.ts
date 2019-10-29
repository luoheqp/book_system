declare module "*.vue" {
  import Vue from "vue";
  export default Vue;
}

declare module "vue-awesome-swiper" {
  export const swiper: any;
  export const swiperSlide: any;
}

declare module "mockjs" {
  let Mock: any;
  export default Mock;
}
