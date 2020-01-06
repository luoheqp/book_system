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
      <ul class="opt">
        <li class="opt-item">
          <CatalogPop
            v-if="isPopShow"
            @togglePopState="togglePopState"
            @jumpTo="jumpTo"
            :catalogInfo="navigation"
          ></CatalogPop>
          <span class="opt-name" @click="togglePopState">
            <i class="iconfont icon-cl-icon-Catalog"></i>
          </span>
        </li>
        <!-- 切换全屏 -->
        <li class="opt-item">
          <span class="opt-name" @click.self="toggleFSState">
            <i
              :class="[
                'iconfont',
                ebookSet.isFull
                  ? 'icon-pro-fullscreen'
                  : 'icon-pro-exit-fullscreen'
              ]"
            ></i>
          </span>
        </li>
        <!-- 样式调整 -->
        <li class="opt-item set-reader-style">
          <div
            :class="[
              'select',
              'set-opt',
              showSet === 'reader-style' ? 'show' : ''
            ]"
          >
            <ul class="theme-list">
              <li
                :class="[
                  'theme-item',
                  ebookSet.theme === item.name ? 'selected' : ''
                ]"
                v-for="item in themeList"
                :style="{ backgroundColor: item.style.body.background }"
                :key="item.name"
                @click="() => setTheme(item.name)"
              ></li>
            </ul>
          </div>
          <span class="opt-name" @click.self="handleShowSet('reader-style')">
            <i class="iconfont icon-style"></i>
          </span>
        </li>
        <!-- 字体调整 -->
        <li class="opt-item set-font-size">
          <div
            :class="[
              'select',
              'set-opt',
              showSet === 'font-size' ? 'show' : ''
            ]"
          >
            <div
              class="select-wrap"
              v-for="(item, index) in fontSizeList"
              @click="setFontSize(item.fontSize)"
              :key="index"
              :style="{
                flex: index === 0 || index === fontSizeList.length - 1 ? 0.5 : 1
              }"
            >
              <div class="line" v-if="index !== 0"></div>
              <div class="point-wrap">
                <div class="point" v-show="ebookSet.fontSize === item.fontSize">
                  <div class="small-point"></div>
                </div>
              </div>
              <div class="line" v-if="index !== fontSizeList.length - 1"></div>
            </div>
          </div>
          <span class="opt-name" @click.self="handleShowSet('font-size')">
            <i class="iconfont icon-Aa"></i>
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { toggleBrowserFullScreenState } from "@/utils/browser_tool";
import { fontSizeList, themeList } from "./config";
import { IEbookSet } from "@/types/reader";
import Epub from "epubjs";

// components
import CatalogPop from "@/views/Reader/components/CatalogPop.vue";

@Component({
  components: {
    CatalogPop
  }
})
export default class Reader extends Vue {
  public fontSizeList: object[] = fontSizeList;
  public themeList: object[] = themeList;
  public EPUB_ADDRESS = "http://www.resource.com:8000/book/";

  // === 电子书相关 data ===
  public book!: any;
  public rendition!: any;
  public themes!: any;
  public navigation!: any;

  public isPopShow = false;

  // === 电子书设置相关 ===
  // 显示哪个设置
  public showSet: string = "";
  // 电子书默认设置
  public ebookSet: IEbookSet = {
    fontSize: 12,
    theme: "default",
    isFull: false
  };

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
    this.EPUB_ADDRESS = this.EPUB_ADDRESS = bookId;

    this.initEpub();
    this.setTheme("green");

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

    this.book = Epub(EPUB_ADDRESS);
    // 通过 book.renderTo 生成 Rendition
    this.rendition = this.book.renderTo("ebook", {
      width: ebook.offsetWidth,
      height: ebook.offsetHeight
    });
    // 通过 Redition.display 渲染电子书
    this.rendition.display();
    // 获取 theme 对象来控制文件的样式
    this.themes = this.rendition.themes;
    // 注册样式并初始化
    this.registerTheme();
    this.setTheme("green");
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

  // 设置文字大小
  setFontSize(fontSize: number) {
    if (this.themes) {
      this.ebookSet.fontSize = fontSize;
      this.themes.fontSize(fontSize + "px");
    }
  }

  // 设置阅读器样式
  setTheme(name: string) {
    this.ebookSet.theme = name;
    this.themes.select(name);
  }

  // 设置阅读设置显示
  handleShowSet(setting: string) {
    if (this.showSet === setting) {
      this.showSet = "";
      return;
    }
    this.showSet = setting;
  }

  // 切换全屏阅读模式
  toggleFSState() {
    toggleBrowserFullScreenState(this.ebookSet.isFull);
    this.ebookSet.isFull = !this.ebookSet.isFull;
  }

  // 章节跳转
  jumpTo(href: string) {
    this.rendition.display(href);
    this.togglePopState();
  }

  // 注册样式
  registerTheme() {
    themeList.map(item => {
      this.themes.register(item.name, item.style);
    });
  }

  // 切换弹窗显示状态
  togglePopState() {
    this.isPopShow = !this.isPopShow;
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

    .opt {
      .opt-item {
        .flex-center();
        flex-direction: column;
        width: 50px;
        min-height: 50px;
        background: #fff;
        border-radius: 25px;
        box-sizing: border-box;

        &:not(:last-child) {
          margin-bottom: @defMargin;
        }

        .set-opt {
          transition: max-height 0.5s linear;
          transition: padding 0.3s linear;
          max-height: 0;
          overflow: hidden;

          &.show {
            max-height: 500px;
            padding: 10px 0 15px 0;
          }
        }

        .opt-name {
          .flex-center();
          width: 50px;
          height: 50px;
          border-radius: 50%;
          border: 2px solid #fff;
          box-sizing: border-box;
          background: @mainColor;
          color: #fff;
          cursor: pointer;
        }

        &.set-reader-style {
          .select {
            &.show {
              padding-top: 0;
            }

            .theme-list {
              display: flex;
              flex-direction: column;

              .theme-item {
                width: 20px;
                height: 20px;
                border-radius: 10px;
                background: #333;

                &.selected {
                  border: 2px solid @deepColor;
                  box-sizing: border-box;
                }

                &:first-child {
                  margin-top: @defMargin;
                }

                &:not(:last-child) {
                  margin-bottom: 10px;
                }
              }
            }
          }
        }

        &.set-font-size {
          .select {
            display: flex;
            flex-direction: column;
            width: 100%;

            .select-wrap {
              flex: 1;
              display: flex;
              flex-direction: column;
              align-items: center;

              &:first-child {
                margin-top: @defMargin;
              }

              .line {
                height: 10px;
                border-left: 1px solid #ccc;

                &:not(:first-child),
                &:not(:last-child) {
                  border-top: none;
                }
              }

              .point-wrap {
                position: relative;
                flex: 0 0 0;
                width: 5px;
                border-top: 1px solid #ccc;
                .point {
                  .flex-center();
                  position: absolute;
                  top: -10px;
                  left: -6px;
                  width: 15px;
                  height: 15px;
                  border-radius: 50%;
                  background: white;
                  border: 1px solid #ccc;
                  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.15);

                  .small-point {
                    width: 5px;
                    height: 5px;
                    background: black;
                    border-radius: 50%;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
