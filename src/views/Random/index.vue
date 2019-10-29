<template>
  <div class="random-wrap">
    <div class="random">
      <swiper :options="swiperOption" ref="swiper" data-id="013">
        <swiper-slide v-for="(item, index) in 10" :key="index" :data-id="index">
          <div class="content">Slide {{ item }}</div>
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
        <div class="swiper-button-prev" slot="button-prev"></div>
        <div class="swiper-button-next" slot="button-next"></div>
      </swiper>
      <ListItem></ListItem>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { IListItem } from "@/types/info";
import { bindAndPassContext } from "@/utils/func_tool";
import { State, Action } from "vuex-class";

// components
import ListItem from "@/components/ListItem.vue";

// vue-awesome-swiper
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";

@Component({
  components: {
    ListItem,
    swiper,
    swiperSlide
  }
})
export default class Random extends Vue {
  // 选中书籍的信息 , 包括 swiper id 及其 slide id
  public selectedBook: number[] = [];
  // 获取到的所有列表信息
  public randomInfo: Object = {};
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
    this.selectedBook[0] = swiperInstance.dataset.id;
    this.selectedBook[1] = swiperInstance.clickedSlide.dataset.id;
  }

  @State(state => state.book.bookInfo) bookInfo!: string;
  @Action("getBookInfo") getBookInfo!: Function;

  private created(): void {
    this.getBookInfo();
  }

  private mounted(): void {
    console.log(this.bookInfo);
  }
}
</script>

<style lang="less">
@import "../../assets/styles/index.less";

.random-wrap {
  .random {
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
  }
}
</style>
