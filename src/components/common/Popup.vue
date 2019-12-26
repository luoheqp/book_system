<template>
  <div class="popup-wrap" @click.self="toggleShowState">
    <div class="popup">
      <h3 class="title" v-show="title">
        <span>{{ title }}</span>
      </h3>
      <span class="cancel" @click="toggleShowState">
        <i class="iconfont icon-Cancelcontrol"></i>
      </span>
      <slot @toggleShowState="toggleShowState"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class Popup extends Vue {
  @Prop({ default: "" }) title!: string;

  toggleShowState() {
    this.$emit("toggleShowState");
  }
}
</script>

<style lang="less" scoped>
@import "../../assets/styles/index.less";

.popup-wrap {
  .flex-center();
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(255, 255, 255, 0.85);
  z-index: 3;

  .popup {
    background-color: #fff;
    border-radius: 4px;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 10px;
    animation: jelly 1s linear both;
    position: relative;
    margin: 0 @doubleMargin;
    max-height: 800px;
    max-width: 800px;
    overflow-x: hidden;

    .title {
      font-size: 20px;
      font-weight: bold;
      border-bottom: 1px solid @grayColor;
      padding-bottom: @defMargin;
      margin-bottom: @defMargin;
      display: flex;
      justify-content: space-between;
    }

    .cancel {
      position: absolute;
      top: 16px;
      right: 16px;
      color: rgba(0, 0, 0, 0.6);
      cursor: pointer;

      .iconfont {
        font-size: 24px;
      }

      &:hover {
        color: #000;
      }
    }
  }
}
</style>
