<template>
  <div class="line-list-wrap">
    <div class="head">
      <h3 class="title">{{ listInfo.name }}</h3>
      <span class="more">MORE></span>
    </div>
    <swiper :options="swiperOption" :data-key="listInfo.id">
      <swiper-slide
        v-for="item in listInfo.bookGroup"
        :key="item.id"
        :data-key="item.id"
      >
        <div
          :class="[
            'content',
            item.id === selected.activeSlide &&
            selected.activeSwiper === nowSwiper
              ? 'selected'
              : ''
          ]"
        >
          <span class="name">{{ item.name }}</span>
        </div>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
      <div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next"></div>
    </swiper>
    <ListItem
      :class="[
        'list-item',
        selected.activeSwiper === nowSwiper && selected.activeSlide !== -1
          ? 'show'
          : ''
      ]"
      :info="selectedBookInfo"
      :isCanHover="false"
      :isShowCancel="true"
      @cancel="handleListItemCancel"
    ></ListItem>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import { bindAndPassContext } from "@/utils/func_tool";
import { IListItem, ILineListSelected, ILineListItem } from "@/types/info";

// vue-awesome-swiper
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";

// components
import ListItem from "@/components/item/ListItem.vue";

@Component({
  components: {
    ListItem,
    swiper,
    swiperSlide
  }
})
export default class LineList extends Vue {
  // 父组件传递的基础信息
  @Prop() public listInfo!: ILineListItem;
  @Prop({ default: -1 }) public nowSwiper!: number;

  // swiper 配置 , 因为 this 指向原因 , 在 created 中进行初始化
  public swiperOption!: Object;
  // 选中的 swiper id 及其 slide id
  public selected: ILineListSelected = {
    activeSwiper: -1,
    activeSlide: -1
  };
  // 选中书籍的信息
  get selectedBookInfo(): IListItem {
    return this.listInfo.bookGroup.filter((item: IListItem) => {
      return item.id === this.selected.activeSlide;
    })[0];
  }

  // detail 关闭触发
  handleListItemCancel(): void {
    this.selected.activeSwiper = -1;
    this.selected.activeSlide = -1;
    this.$emit("updateActiveSwiper", this.selected.activeSwiper);
  }

  private created() {
    const self = this;

    // 为了拿到正确的 this , 在 created 中初始化
    this.swiperOption = {
      slidesPerView: 6,
      slidesPerGroup: 6,
      spaceBetween: 10,
      loopFillGroupWithBlank: true,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
      },
      on: {
        click(this: any) {
          self.selected.activeSwiper = this.el.dataset.key;
          // BUG: 点击左右的切换按钮也会触发这个 click 事件
          if (this.clickedSlide) {
            console.time();
            self.selected.activeSlide = this.clickedSlide.dataset.key;
            self.$emit("updateActiveSwiper", self.selected.activeSwiper);
            console.timeEnd();
          }
        }
      }
    };
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
      background-color: @mainColor;
      padding: 5px 10px;
      color: #fff;
      font-weight: bold;
      font-size: 12px;
      letter-spacing: 2px;
      cursor: pointer;
      transition: all 0.1s linear;

      &:hover {
        transform: scale(0.8);
      }
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
            transition: padding 0.05s linear;
            position: relative;

            .name {
              width: 100%;
              position: absolute;
              display: inline-block;
              bottom: 0;
              font-size: 16px;
              padding: 5px 10px;
              box-sizing: border-box;
              line-height: 22px;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 1;
              -webkit-box-orient: vertical;
              transition: all 0.3s linear;
            }

            &:hover .name {
              -webkit-line-clamp: inherit;
            }

            &.selected {
              // BUG: 样式有问题
              // border: 5px solid @mainColor;

              .name {
                padding-bottom: 15px;
                -webkit-line-clamp: inherit;
              }

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

  .list-item {
    max-height: 0;
    padding: 0;
    opacity: 0;

    &.show {
      transition: max-height 0.5s linear;
      max-height: 1000px;
      opacity: 1;
      margin-bottom: 15px;
      padding: @defMargin;
      border-bottom: 3px solid @mainColor;
    }
  }
}
</style>
