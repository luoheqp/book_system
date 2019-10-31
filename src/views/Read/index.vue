<template>
  <div class="read-wrap">
    <div class="ebook-wrap">
      <div id="ebook" ref="ebook"></div>
      <div class="mask">
        <div class="left" @click="prevPage"></div>
        <div class="right" @click="nextPage"></div>
      </div>
    </div>
    <div class="opt-wrap">
      <ul class="opt">
        <li class="opt-item">1</li>
        <li class="opt-item">2</li>
        <li class="opt-item">Aa</li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import Epub from "epubjs";

// hard code resource
const EPUB_ADDRESS = "/flipped.epub";

@Component
export default class Read extends Vue {
  // 电子书相关 data
  public book!: any;
  public rendition!: any;
  public themes!: any;

  // 初始化解析电子书
  initEpub() {
    const ebook = this.$refs.ebook as any;

    this.book = Epub(EPUB_ADDRESS);
    // 通过 book.renderTo 生成 Rendition
    this.rendition = this.book.renderTo("ebook", {
      width: ebook.offsetWidth,
      height: ebook.offsetHeight
    });
    // 通过 Redition.display 渲染电子书
    this.rendition.display();
    // 获取 theme 对象来控制文件的样式
    // this.themes = this.rendition.themes;
  }

  prevPage() {
    if (this.rendition) {
      this.rendition.prev();
    }
  }

  nextPage() {
    if (this.rendition) {
      this.rendition.next();
    }
  }

  mounted() {
    // this.initEpub();
  }
}
</script>

<style lang="less" scoped>
@import "../../assets/styles/index.less";

.read-wrap {
  position: absolute;
  height: 100%;
  width: 100%;
  display: flex;

  .ebook-wrap {
    background-color: #fff;
    flex: 1;
    position: relative;

    #ebook {
      position: absolute;
      height: 100%;
      width: 100%;
    }

    .mask {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      display: flex;

      .left,
      .right {
        flex: 1;
      }

      .left {
      }

      .right {
      }
    }
  }

  .opt-wrap {
    flex: 0 0 100px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;

    .opt {
      .opt-item {
        .flex-center();
        width: 50px;
        height: 50px;
        background: #fff;
        border-radius: 50%;

        &:not(:last-child) {
          margin-bottom: @defMargin;
        }
      }
    }
  }
}
</style>
