<template>
  <div class="header-wrap">
    <div class="header">
      <div :class="['nav-main-wrap', isNeedFixed ? 'fixed' : '']">
        <div class="icon-wrap">
          <router-link to="/">
            <Icon class="icon"></Icon>
          </router-link>
        </div>
        <div class="user-wrap">
          <Search />
          <ul v-if="!token">
            <li class="item" @click="toggleSignUp">Sign up</li>
            <li class="item" @click="toggleSignIn">Sign in</li>
          </ul>
          <ul v-else>
            <li class="avatar-wrap item">
              <div class="avatar">
                <img :src="info.avatar" alt="" />
              </div>
              <div class="operate-wrap">
                <Operate />
              </div>
            </li>
          </ul>
        </div>
      </div>
      <!-- TODO: 吸顶 -->
      <div :class="['nav-sub-wrap', isNeedFixed ? 'fixed' : '']">
        <ul class="nav-sub">
          <li
            v-for="item in nav"
            :class="['item', path === item.name ? 'active' : '']"
            :key="item.name"
          >
            <router-link :to="item.path">{{ item.content }}</router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { State, Mutation } from "vuex-class";
import { INavItem } from "../../types/header";
import VueRouter from "vue-router";

// components
import Icon from "@/components/Icon.vue";
import Popup from "@/components/common/Popup.vue";
import Operate from "./components/Operate.vue";
import Search from "./components/Search.vue";

import { IUserInfo } from "../../types/user";

@Component({
  components: {
    Icon,
    Popup,
    Operate,
    Search
  }
})
export default class Header extends Vue {
  // data
  private nav: Array<INavItem> = [
    {
      name: "home",
      content: "HOME",
      path: "/"
    },
    {
      name: "market",
      content: "MARKET",
      path: "/market"
    }
  ];
  // 是否固定副导航
  private isNeedFixed: boolean = false;

  // props
  @Prop({ default: "home" }) private path!: string;

  // state
  @State(state => state.user.token) token!: String;
  @State(state => state.user.info) info!: IUserInfo;
  @Mutation("normal/toggleSignIn") toggleSignIn!: Function;
  @Mutation("normal/toggleSignUp") toggleSignUp!: Function;

  private mounted() {
    window.addEventListener("scroll", this.handleScrollEvent);
  }

  // 滚动触发
  private handleScrollEvent(e: Event) {
    if (pageYOffset > 65) {
      this.isNeedFixed = true;
    } else {
      this.isNeedFixed = false;
    }
  }
}
</script>

<style lang="less" scoped>
@import "../../assets/styles/index.less";

.header-wrap {
  background-color: #fff;
  margin-bottom: 15px;

  .header {
    padding: 0 @defMargin;
    box-sizing: border-box;

    .nav-main-wrap {
      .flex-center();
      max-width: @contentWidth;
      margin: 0 auto;
      height: 65px;
      justify-content: space-between;

      &.fixed {
        margin-bottom: 50px;
      }

      .user-wrap {
        .flex-center();
        height: 100%;

        ul {
          display: flex;
          height: 100%;

          .item {
            .flex-align-center();
            cursor: pointer;
            margin-left: @defMargin;

            &:hover {
              .txt-hover();
            }
          }

          .avatar-wrap {
            position: relative;
            height: 100%;
            display: flex;
            align-items: center;

            &:hover {
              .operate-wrap {
                display: block;
              }
            }

            .avatar {
              width: 32px;
              height: 32px;
              border-radius: 50%;
              background: #ccc;
              overflow: hidden;

              img {
                max-width: 100%;
                max-height: 100%;
              }
            }

            .operate-wrap {
              position: absolute;
              right: 0;
              top: 30px;
              display: none;
            }
          }
        }
      }
    }

    .nav-sub-wrap {
      height: 50px;
      max-width: @contentWidth;
      margin: 0 auto;
      display: flex;
      background: #fff;

      &.fixed {
        height: 40px;
        padding: 0 @defMargin;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 1;
        box-shadow: 0 2px 2px -2px rgba(0, 0, 0, 0.15);
        z-index: 10;
      }

      .nav-sub {
        display: flex;

        .item {
          padding: 10px 20px 10px 0;
          display: flex;
          align-items: center;
          border-radius: 20px;
          font-size: 15px;
          letter-spacing: 2px;
          box-sizing: border-box;

          a {
            color: rgba(0, 0, 0, 0.5);
          }

          &:not(.active):hover a {
            .txt-hover();
          }

          &.active a {
            color: @mainColor;
          }
        }
      }
    }
  }
}
</style>
