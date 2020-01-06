<template>
  <div class="book-item-wrap">
    <div class="pic"></div>
    <div class="info">
      <p class="name">name</p>
      <p class="author">author</p>
      <p class="progress">progress:</p>
      <p class="time">last time:</p>
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
      font-style: italic;
      font-size: 18px;
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
