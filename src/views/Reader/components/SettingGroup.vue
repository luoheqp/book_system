<template>
  <div class="setting-group-wrap">
    <ul class="opt">
      <!-- 查看章节 -->
      <li class="opt-item">
        <CatalogPop
          v-if="isPopShow"
          @togglePopState="togglePopState"
          @jumpTo="jumpTo"
          :catalogInfo="navigation"
        ></CatalogPop>
        <span class="opt-name">
          <i class="iconfont icon-cl-icon-Catalog" @click="togglePopState"></i>
        </span>
      </li>
      <!-- 切换全屏 -->
      <li class="opt-item">
        <span class="opt-name">
          <i
            :class="[
              'iconfont',
              ebookSet.isFull
                ? 'icon-pro-fullscreen'
                : 'icon-pro-exit-fullscreen'
            ]"
            @click.self="toggleFSState"
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
        <span class="opt-name">
          <i
            class="iconfont icon-style"
            @click.self="handleShowSet('reader-style')"
          ></i>
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
        <span class="opt-name">
          <i class="iconfont icon-Aa" @click="handleShowSet('font-size')"></i>
        </span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import { fontSizeList, themeList } from "../config";
import { toggleBrowserFullScreenState } from "@/utils/browser_tool";
import { Mutation, State, Action } from "vuex-class";
import { IEbookSet } from "../../../types/reader";

// components
import CatalogPop from "./CatalogPop.vue";
import { IUserInfo } from "../../../types/user";
import Cookie from "js-cookie";

@Component({
  components: {
    CatalogPop
  }
})
export default class SettingGroup extends Vue {
  @Prop({ default: undefined }) rendition!: any;

  public themes!: any;
  public themeList: object[] = themeList;
  public fontSizeList: object[] = fontSizeList;
  public showSet: string = "";
  public isPopShow = false;
  public token: string | undefined = Cookie.get("token");

  @Watch("rendition", { immediate: true })
  async onRenditionChange() {
    if (this.rendition) {
      // 获取 theme 对象来控制文件的样式
      this.themes = this.rendition.themes;
      // 注册样式并初始化
      this.registerTheme();
      await this.initStyle();
    }
  }

  // vuex
  @State(state => state.book.book) book!: any;
  @State(state => state.book.ebookSet) ebookSet!: IEbookSet;
  @State(state => state.user.info) userInfo!: IUserInfo;
  @Mutation("book/setEbookSet") setEbookSet!: Function;
  @Action("user/saveSetting") saveSetting!: Function;

  get navigation() {
    const { book } = this;
    return book.navigation;
  }

  async initStyle() {
    let info!: IUserInfo;

    if (this.userInfo.readSet) {
      info = this.userInfo;
    }

    let { readSet = { fontSize: 16, theme: "default" } } = info;

    this.setFontSize(readSet.fontSize);
    this.setTheme(readSet.theme);
  }

  // 注册样式
  registerTheme() {
    themeList.map(async item => {
      await this.themes.register(item.name, item.style);
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
    if (this.token) {
      this.saveSetting({ fontSize: fontSize });
    }
  }

  // 设置阅读器样式
  setTheme(name: string) {
    this.setEbookSet({ key: "theme", value: name });
    this.themes.select(name);
    if (this.token) {
      this.saveSetting({ theme: name });
    }
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
      width: 40px;
      height: 40px;
      border-radius: 50%;
      box-sizing: border-box;
      background: @mainColor;
      color: #fff;
      cursor: pointer;

      i {
        .flex-center();
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }

    &.set-reader-style {
      box-shadow: 0 0 8px 0px #ccc;

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
      box-shadow: 0 0 8px 0px #ccc;

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
