<template>
  <div class="logo-wrap">
    <span class="logo-icon"></span>
    <span class="logo-text">MYBOOK</span>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class Icon extends Vue {}
</script>

<style lang="less" scoped>
.logo-wrap {
  display: flex;
  align-items: center;

  .logo-icon {
    width: 15px;
    height: 15px;
    display: inline-block;
    margin-right: 5px;
    background-color: #333;
    position: relative;

    &::after,
    &::before {
      content: "";
      display: block;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background-color: #333;
    }

    &::after {
      top: -8px;
    }

    &::before {
      bottom: -8px;
    }
  }

  .logo-text {
    display: inline-block;
    font-size: 16px;
    border-bottom: 1px solid #333;
    padding-bottom: 2px;
    letter-spacing: 2px;
  }
}
</style>
