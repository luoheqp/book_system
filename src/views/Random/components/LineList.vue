<template>
  <div class="line-list-wrap">
    <swiper :options="swiperOption" data-key="013">
      <swiper-slide v-for="item in bookInfo" :key="item.id" :data-key="item.id">
        <div class="content">{{ item.name }}</div>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
      <div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next"></div>
    </swiper>
    <ListItem
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
  @Prop() public bookInfo!: IListItem[];
  // 选中的 swiper id 及其 slide id
  public selected: ILineListSelected = {
    activeSwiper: -1,
    activeSlide: -1
  };
  // 选中书籍的信息
  public selectedBookInfo: IListItem = {
    id: 0,
    picPath: "null",
    name: "bookkkkkkkkkk name",
    author: "book author",
    date: "publsh data",
    press: "press",
    desc: "book description",
    tag: [""]
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

  // 获取点击的 slide 中的书籍 id
  @bindAndPassContext
  handleSwiperSlideClick(swiperInstance: any): void {
    this.selected.activeSwiper = swiperInstance.el.dataset.key;
    this.selected.activeSlide = swiperInstance.clickedSlide.dataset.key;

    // TODO: activeSwiper 判断
    this.selectedBookInfo = this.$store.state.book.bookInfo.filter(
      (item: IListItem) => item.id === this.selected.activeSlide
    )[0];
  }

  handleListItemCancel(): void {}
}
</script>

<style lang="less" scoped>
@import "../../../assets/styles/index.less";

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
</style>
