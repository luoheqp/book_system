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
import Epub from "epubjs";

// components
import SettingGroup from "./components/SettingGroup.vue";
import BasicGroup from "./components/BasicGroup.vue";
import { State, Mutation, Action } from "vuex-class";
import { IBook } from "../../types/book";

@Component({
  components: {
    SettingGroup,
    BasicGroup
  }
})
export default class Reader extends Vue {
  public EPUB_ADDRESS = "http://www.resource.com:8001/book/";

  // === 电子书相关 data ===
  public book!: any;
  public rendition: any = "";
  public navigation: any = "";
  public locations: any = "";

  @Action("book/getBookInfo") getBookInfo!: Function;
  @Mutation("book/setEbook") setEbook!: Function;

  created() {
    // 监听键盘 , 触发翻页
    document.addEventListener("keyup", (e: any) => {
      let key = e.keyCode;
      if (key === 37) {
        this.changePage(0);
      } else if (key === 39) {
        this.changePage(1);
      }
    });
  }

  async mounted() {
    // 加载电子书
    await this.loadingEpub();

    // TODO: 存在 token 则记录用户阅读过

    // 页面缩放时改变大小
    const ebook = this.$refs.ebook as any;
    // TODO: 节流
    window.addEventListener("resize", () => {
      this.rendition.resize(ebook.offsetWidth, ebook.offsetHeight);
    });
  }

  async loadingEpub() {
    const bookId = this.$route.params.id;
    let bookInfo = await this.getBookInfo(bookId);
    this.EPUB_ADDRESS += `${bookInfo.md5}.epub`;
    this.initEpub();
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
    this.book.ready
      .then(() => {
        this.setEbook(this.book);
      })
      .then(() => {
        this.locations = this.book.locations;
        const locations = this.book.locations;
        console.log(locations.epubcfi);
      });
  }

  // 0 - 向前翻页
  // 1 - 向后翻页
  changePage(type: 0 | 1) {
    if (this.rendition) {
      if (type) {
        this.rendition.next();
      } else {
        this.rendition.prev();
      }

      const epubCfi = this.locations.epubcfi;
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
