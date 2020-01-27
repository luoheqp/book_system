<template>
  <div class="reader-wrap">
    <div class="ebook-wrap">
      <div id="ebook" ref="ebook"></div>
      <div class="mask">
        <div class="left" @click="changePage(0)"></div>
        <div class="right" @click="changePage(1)"></div>
      </div>
    </div>
    <div class="opt-wrap">
      <BasicGroup class="basic-group" />
      <SettingGroup :rendition="rendition" />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { IEbookSet } from "@/types/reader";
import ePub from "epubjs";

// components
import SettingGroup from "./components/SettingGroup.vue";
import BasicGroup from "./components/BasicGroup.vue";
import { State, Mutation, Action } from "vuex-class";
import { IBook } from "../../types/book";
import { Route } from "vue-router";

Component.registerHooks(["beforeRouteLeave"]);

@Component({
  components: {
    SettingGroup,
    BasicGroup
  }
})
export default class Reader extends Vue {
  public bookId: string = "";

  // === 电子书相关 data ===
  public book!: any;
  public rendition: any = "";
  public progress: any = { cfi: "", percent: 0 };

  @State(state => state.user.token) token!: string;
  @Action("book/getBookInfo") getBookInfo!: Function;
  @Action("user/updateBookRecord") updateBookRecord!: Function;
  @Mutation("book/setEbook") setEbook!: Function;

  private async mounted() {
    // 加载电子书
    await this.loadingEpub();

    // 页面缩放时改变大小
    // TODO: 节流
    const ebook = this.$refs.ebook as any;
    window.addEventListener("resize", () => {
      this.rendition.resize(ebook.offsetWidth, ebook.offsetHeight);
    });

    // 在页面刷新的时候触发事件
    if (this.token) {
      window.onbeforeunload = (e: any) => {
        let { cfi, percent } = this.progress;
        let { bookId } = this;

        if (this.$route.name === "reader") {
          this.updateBookRecord({ bookId, cfi, percent });
        }
      };
    }
  }

  private beforeRouteLeave(to: Route, from: Route, next: any) {
    let { cfi, percent } = this.progress;
    let { bookId } = this;
    this.updateBookRecord({ bookId, cfi, percent });
    next();
  }

  async loadingEpub() {
    this.bookId = this.$route.params.id;
    let bookInfo = await this.getBookInfo(this.bookId);
    let EPUB_ADDRESS = `http://www.resource.com:8001/book/${bookInfo.md5}.epub`;

    // 查询历史阅读进度
    if (bookInfo.cfi) {
      this.progress.cfi = bookInfo.cfi;
    }

    this.initEpub(EPUB_ADDRESS);
  }

  // 初始化解析电子书
  async initEpub(url: string) {
    const ebook = this.$refs.ebook as any;
    this.book = ePub(url);
    let { book } = this;

    // 通过 book.renderTo 生成 Rendition
    this.rendition = book.renderTo("ebook", {
      width: ebook.offsetWidth,
      height: ebook.offsetHeight
    });

    this.bandingKeyToRendition();

    // 通过 Redition.display 渲染电子书
    this.rendition.display();

    // 监听进度变化
    book.ready.then(() => {
      this.setEbook(book);
      this.book = book;

      this.locationListener();
    });
  }

  // 监听按键
  bandingKeyToRendition() {
    this.rendition.on("keyup", this.keyListener);
    document.addEventListener("keyup", this.keyListener, false);
  }

  keyListener(e: KeyboardEvent) {
    let key = e.keyCode;
    if (key == 37) {
      this.changePage(0);
    } else if (key == 39) {
      this.changePage(1);
    }
  }

  // 0 - 向前翻页 1 - 向后翻页
  changePage(type: 0 | 1) {
    if (this.rendition) {
      if (type) {
        this.rendition.next();
      } else {
        this.rendition.prev();
      }
    }
  }

  locationListener() {
    if (this.progress.cfi) {
      this.book.locations.generate();
      this.rendition.display(this.progress.cfi);
    }

    this.rendition.on("relocated", (location: any) => {
      let cfi = location.start.cfi;
      this.progress.cfi = cfi;
      let percent = this.book.locations.percentageFromCfi(cfi);
      let percentage = Math.floor(percent * 100);
      this.progress.percent = percentage;
    });
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
    }
  }

  .opt-wrap {
    flex: 0 0 80px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;

    .basic-group {
      margin-bottom: @defMargin;
    }
  }
}
</style>
