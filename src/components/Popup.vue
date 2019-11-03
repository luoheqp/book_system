<template>
  <div class="popup-wrap" @click.self="toggleShowState">
    <div class="popup">
      <h3 class="title" v-show="title">
        <span>{{ title }}</span>
        <span class="cancel" @click="toggleShowState">cancel</span>
      </h3>
      <slot @toggleShowState="toggleShowState"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class Popup extends Vue {
  @Prop({ default: "2333" }) title!: string;

  toggleShowState() {
    this.$emit("toggleShowState");
  }
}
</script>

<style lang="less" scoped>
@import "../assets/styles/index.less";

.popup-wrap {
  .flex-center();
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.8);

  .popup {
    background-color: #fff;
    padding: @doubleMargin;
    border-radius: @defMargin;

    .title {
      font-size: 20px;
      font-weight: bold;
      border-bottom: 1px solid @grayColor;
      padding-bottom: @defMargin;
      margin-bottom: @defMargin;
      display: flex;
      justify-content: space-between;

      .cancel {
        cursor: pointer;
      }
    }
  }
}
</style>
