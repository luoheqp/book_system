<template>
  <div class="random-wrap">
    <div class="random">
      <swiper :options="swiperOption">
        <swiper-slide
          v-for="(item, index) in 10"
          :key="index"
          :data-key="index"
        >
          <div class="content">Slide {{ item }}</div>
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
        <div class="swiper-button-prev" slot="button-prev"></div>
        <div class="swiper-button-next" slot="button-next"></div>
      </swiper>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

// vue-awesome-swiper
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";

@Component({
  components: {
    swiper,
    swiperSlide
  }
})
export default class Random extends Vue {
  // data
  public nowIndex: number = -1;
  private swiperOption: Object = {
    slidesPerView: 6,
    slidesPerGroup: 6,
    loopFillGroupWithBlank: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev"
    },
    on: {
      click: function(this: any): void {
        let clickedIndex: number = this.clickedIndex;
        nowIndex = this.clickedSlide.dataset.key;
      }
    }
  };

  // method
}
</script>

<style lang="less">
@import "../../assets/styles/index.less";

.random-wrap {
  .random {
    .swiper-container {
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
