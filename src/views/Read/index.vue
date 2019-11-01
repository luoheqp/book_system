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
        <!-- 自动翻页 -->
        <li class="opt-item" @click="handleShowSet('auto')">Auto</li>
        <!-- 样式调整 -->
        <li
          class="opt-item set-read-style"
          @click="handleShowSet('read-style')"
        >
          <div
            :class="[
              'select',
              'set-opt',
              showSet === 'font-size' ? 'show' : ''
            ]"
          ></div>
          M
        </li>
        <!-- 字体调整 -->
        <li class="opt-item set-font-size" @click="handleShowSet('font-size')">
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
                <div class="point" v-show="defaultFontSize === item.fontSize">
                  <div class="small-point"></div>
                </div>
              </div>
              <div class="line" v-if="index !== fontSizeList.length - 1"></div>
            </div>
          </div>
          <span class="opt-name">Aa</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { IThemeItem } from "@/types/read";
import Epub from "epubjs";

// hard code resource
const EPUB_ADDRESS = "/flipped.epub";

@Component
export default class Read extends Vue {
  // === 电子书相关 data ===
  public book!: any;
  public rendition!: any;
  public themes!: any;

  // === 电子书设置相关 ===
  // 显示那个设置
  public showSet: string = "";
  // 文字大小列表
  public fontSizeList: Object[] = [
    { fontSize: 24 },
    { fontSize: 22 },
    { fontSize: 20 },
    { fontSize: 18 },
    { fontSize: 16 },
    { fontSize: 14 },
    { fontSize: 12 }
  ];
  // 默认文字大小
  public defaultFontSize: number = 12;
  // 阅读样式
  public themeList: IThemeItem[] = [
    {
      name: "default",
      style: { body: { color: "#000", background: "#fff" } }
    },
    {
      name: "green",
      style: { body: { color: "#000", background: "#ceeaba" } }
    },
    {
      name: "night",
      style: { body: { color: "#fff", background: "#000" } }
    }
  ];
  // 默认阅读样式
  public defaultTheme: string = "default";

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
      this.defaultFontSize = fontSize;
      this.themes.fontSize(fontSize + "px");
    }
  }

  // 设置阅读器样式
  setTheme(name: string) {
    this.defaultTheme = name;
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

  // 注册样式
  registerTheme() {
    this.themeList.map(item => {
      this.themes.register(item.name, item.style);
    });
  }

  mounted() {
    this.initEpub();
    this.setTheme("green");
  }
}
</script>

<style lang="less" scoped>
@import "../../assets/styles/index.less";

// TODO: 样式有问题
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
        flex-direction: column;
        width: 50px;
        min-height: 50px;
        background: #fff;
        border-radius: 25px;
        padding: @defMargin;
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
          // margin-top: @defMargin;
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
                .line {
                  &:first-child {
                    border-top: none;
                  }
                }
              }
              &:last-child {
                .line {
                  &:last-child {
                    border-top: none;
                  }
                }
              }

              .line {
                height: 10px;
                border-left: 1px solid #ccc;
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
