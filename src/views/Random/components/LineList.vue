<template>
  <div class="line-list-wrap">
    <div class="head">
      <h3 class="title">{{ title }}</h3>
      <span class="more">MORE></span>
    </div>
    <swiper :options="swiperOption" :data-key="id">
      <swiper-slide v-for="item in bookInfo" :key="item.id" :data-key="item.id">
        <div
          :class="[
            'content',
            item.id === selected.activeSlide ? 'selected' : ''
          ]"
        >
          {{ item.name }}
        </div>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
      <div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next"></div>
    </swiper>
    <ListItem
      v-if="selected.activeSwiper === nowSwiper && selected.activeSlide !== -1"
      class="mb"
      :info="selectedBookInfo"
      :isCanHover="false"
      :isShowCancel="true"
      @cancel="handleListItemCancel"
    ></ListItem>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { bindAndPassContext } from "@/utils/func_tool";
import { IListItem, ILineListSelected } from "@/types/info";

// vue-awesome-swiper
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";

// components
import ListItem from "@/components/ListItem.vue";

@Component({
  components: {
    ListItem,
    swiper,
    swiperSlide
  }
})
export default class LineList extends Vue {
  // 父组件传递的基础信息
  @Prop() public bookInfo!: IListItem[];
  @Prop({ default: "group title" }) public title!: string;
  @Prop({ default: -1 }) public nowSwiper!: number;
  @Prop({ default: 1 }) public id!: number;

  // 选中的 swiper id 及其 slide id
  public selected: ILineListSelected = {
    activeSwiper: -1,
    activeSlide: -1
  };
  // swiper 配置
  public swiperOption: Object = {
    slidesPerView: 6,
    slidesPerGroup: 6,
    spaceBetween: 10,
    loopFillGroupWithBlank: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev"
    },
    on: {
      click: this.handleSwiperSlideClick
    }
  };
  // 选中书籍的信息
  get selectedBookInfo(): IListItem {
    console.log("object");
    this.$emit("updateActiveSwiper", this.selected.activeSwiper);
    return this.bookInfo.filter(
      (item: IListItem) => item.id === this.selected.activeSlide
    )[0];
  }

  // 获取点击的 slide 中的书籍 id
  @bindAndPassContext
  handleSwiperSlideClick(swiperInstance: any): void {
    this.selected.activeSwiper = swiperInstance.el.dataset.key;
    // BUG: 点击左右的切换按钮也会触发这个 click 事件
    if (swiperInstance.clickedSlide) {
      this.selected.activeSlide = swiperInstance.clickedSlide.dataset.key;
    }
  }

  handleListItemCancel(): void {
    this.selected.activeSwiper = -1;
    this.selected.activeSlide = -1;
  }
}
</script>

<style lang="less" scoped>
@import "../../../assets/styles/index.less";

.line-list-wrap {
  .head {
    .mb();

    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    .title {
      font-size: 26px;
      font-weight: bold;
      text-transform: capitalize;
      letter-spacing: 3px;
      padding-left: 5px;
    }

    .more {
      font-size: 16px;
      letter-spacing: 2px;
    }
  }

  .swiper-container {
    margin-bottom: @defMargin;

    .swiper {
      &-wrapper {
        .swiper-slide {
          .flex-center();

          .content {
            .flex-center();
            height: 150px;
            width: 150px;
            background-color: #fff;
            box-sizing: border-box;
            transition: all 0.1s linear;
            position: relative;

            &.selected {
              border: 5px solid @mainColor;

              &::before {
                content: "";
                display: block;
                position: absolute;
                left: 50%;
                bottom: 0px;
                -webkit-transform: translateX(-50%);
                transform: translateX(-50%);
                border: 12px solid transparent;
                border-bottom-color: @mainColor;
              }
            }
          }
        }
      }

      &-pagination {
      }

      &-button {
        &-prev,
        &-next {
          opacity: 0.3;
          transform: scale(0.5);
          transition: all 0.2s linear;
          // background-image

          &:hover {
            transform: scale(0.8);
            opacity: 1;
          }
        }
      }
    }
  }
}
</style>
