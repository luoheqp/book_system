<template>
  <div class="setting-group-wrap">
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
          :class="['select', 'set-opt', showSet === 'font-size' ? 'show' : '']"
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
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import { fontSizeList, themeList } from "../config";
import { toggleBrowserFullScreenState } from "@/utils/browser_tool";
import { Mutation, State } from "vuex-class";
import { IEbookSet } from "../../../types/reader";

@Component({})
export default class SettingGroup extends Vue {
  @Prop({ default: undefined }) rendition!: any;

  public themes!: any;
  public navigation!: any;
  public themeList: object[] = themeList;
  public fontSizeList: object[] = fontSizeList;
  public showSet: string = "";
  public isPopShow = false;

  @Watch("rendition", { immediate: true })
  onRenditionChange() {
    if (this.rendition) {
      // 获取 theme 对象来控制文件的样式
      this.themes = this.rendition.themes;
      // 注册样式并初始化
      this.registerTheme();
      this.setTheme("green");
    }
  }

  // vuex
  @State(state => state.book.ebookSet)
  ebookSet!: IEbookSet;
  @Mutation("book/setEbookSet")
  setEbookSet!: Function;

  // 注册样式
  registerTheme() {
    themeList.map(item => {
      this.themes.register(item.name, item.style);
    });
  }

  // 设置阅读设置显示
  handleShowSet(setting: string) {
    if (this.showSet === setting) {
      this.showSet = "";
      return;
    }
    this.showSet = setting;
  }

  // 设置文字大小
  setFontSize(fontSize: number) {
    this.setEbookSet({ key: "fontSize", value: fontSize });
    this.themes.fontSize(fontSize + "px");
  }

  // 设置阅读器样式
  setTheme(name: string) {
    this.setEbookSet({ key: "theme", value: name });
    this.themes.select(name);
  }

  // 切换全屏阅读模式
  toggleFSState() {
    let { isFull } = this.ebookSet;
    toggleBrowserFullScreenState(isFull);
    this.setEbookSet({ key: "isFull", value: !isFull });
  }

  // 章节跳转
  jumpTo(href: string) {
    this.rendition.display(href);
    this.togglePopState();
  }

  // 切换弹窗显示状态
  togglePopState() {
    this.isPopShow = !this.isPopShow;
  }
}
</script>

<style lang="less" scoped>
@import "../../../assets/styles/index.less";

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
</style>
