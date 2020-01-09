<template>
  <div class="reader-wrap">
    <div class="ebook-wrap">
      <div id="ebook" ref="ebook"></div>
      <div class="mask">
        <div class="left" @click="prevPage"></div>
        <div class="right" @click="nextPage"></div>
      </div>
    </div>
    <div class="opt-wrap">
      <SettingGroup :rendition="rendition" :navigation="navigation" />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { IEbookSet } from "@/types/reader";
import Epub from "epubjs";

// components
import CatalogPop from "./components/CatalogPop.vue";
import SettingGroup from "./components/SettingGroup.vue";
import { State } from "vuex-class";

@Component({
  components: {
    CatalogPop,
    SettingGroup
  }
})
export default class Reader extends Vue {
  public EPUB_ADDRESS = "http://www.resource.com:8000/book/";

  // === 电子书相关 data ===
  public book!: any;
  public rendition: any = "";
  public navigation: any = "";

  created() {
    // 监听键盘 , 触发翻页
    document.addEventListener("keyup", (e: any) => {
      let key = e.keyCode;
      if (key === 37) {
        this.prevPage();
      } else if (key === 39) {
        this.nextPage();
      }
    });
  }

  mounted() {
    // 加载电子书
    const bookId = this.$route.params.id;
    this.EPUB_ADDRESS = `${this.EPUB_ADDRESS}${bookId}.epub`;

    this.initEpub();

    // 页面缩放时改变大小
    const ebook = this.$refs.ebook as any;
    // TODO: 节流
    window.addEventListener("resize", () => {
      this.rendition.resize(ebook.offsetWidth, ebook.offsetHeight);
    });
  }

  // 初始化解析电子书
  initEpub() {
    const ebook = this.$refs.ebook as any;

    this.book = Epub(this.EPUB_ADDRESS);
    // 通过 book.renderTo 生成 Rendition
    this.rendition = this.book.renderTo("ebook", {
      width: ebook.offsetWidth,
      height: ebook.offsetHeight
    });
    // 通过 Redition.display 渲染电子书
    this.rendition.display();
    // 生成 navigation
    this.book.ready.then(() => {
      this.navigation = this.book.navigation;
      // 生成 locations
      // return this.book.locations.generate();
    });
  }

  // 向前翻页
  prevPage() {
    if (this.rendition) {
      this.rendition.prev();
    }
  }

  // 向后翻页
  nextPage() {
    if (this.rendition) {
      this.rendition.next();
    }
  }
}
</script>

<style lang="less" scoped>
@import "../../assets/styles/index.less";

// TODO: 样式有问题
.reader-wrap {
  position: absolute;
  height: 100%;
  width: 100%;
  display: flex;
  padding-bottom: @defMargin;
  box-sizing: border-box;

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
    flex: 0 0 80px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
  }
}
</style>
