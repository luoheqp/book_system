<template>
  <router-link :to="`/reader/${info._id}`" class="book-item-wrap">
    <div class="pic">
      <img :src="info.cover" alt="" />
    </div>
    <div class="info">
      <p class="name">{{ info.name }}</p>
      <p class="author">{{ info.author }}</p>
      <p class="progress">progress: {{ info.percent }} %</p>
      <p class="time">last time:</p>
    </div>
  </router-link>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class BookItem extends Vue {
  @Prop({
    default: () => {
      return {};
    }
  })
  info!: any;
}
</script>

<style lang="less" scoped>
@import "../../../assets/styles/index.less";

.book-item-wrap {
  .flex-center();
  padding: @defMargin;
  box-sizing: border-box;
  align-items: unset;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s linear;

  &:hover {
    box-shadow: 0 0 20px 0px #33333330;
  }

  .pic {
    flex: 0 0 70px;
    height: 100px;
    background-color: #ccc;
    margin-right: @defMargin;
    border-radius: 10px;

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
  .info {
    flex: 1;
    // BUG: 去掉试试 ?
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    p {
      .one-line();

      &:not(:last-child) {
        margin-bottom: 5px;
      }
    }

    .name {
      font-size: 26px;
    }

    .author {
      font-size: 16px;
    }

    .progress {
    }

    .time {
      font-family: SFNSRounded;
      font-size: 12px;
    }
  }
}
</style>
