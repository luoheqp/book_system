<template>
  <div class="book-item-wrap">
    <div class="pic"></div>
    <div class="info">
      <p class="name"></p>
      <p class="progress"></p>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class BookItem extends Vue {}
</script>

<style lang="less" scoped>
@import "../../../assets/styles/index.less";

.book-item-wrap {
  width: 16%;
  padding: 10px;
  box-sizing: border-box;
  margin-bottom: @defMargin;

  &:hover {
  }

  .pic {
    width: 100%;
    height: 100px;
    background-color: @mainColor;
  }
  .info {
    .name {
    }
    .progress {
    }
  }
}
</style>
