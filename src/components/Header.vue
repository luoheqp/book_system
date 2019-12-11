<template>
  <div class="header-wrap">
    <div class="header">
      <div class="nav-main-wrap">
        <div class="icon-wrap">
          <router-link to="/">
            <Icon class="icon"></Icon>
          </router-link>
        </div>
        <div class="user-wrap">
          <span class="icon"><i class="iconfont icon-search"></i></span>
          <ul v-show="!token">
            <li class="item" @click="toggleSignUpPopState">Sign up</li>
            <li class="item">
              <router-link to="/signIn">Sign in</router-link>
            </li>
          </ul>
          <ul v-show="token">
            <li class="avatar">
              <img :src="`http://${info.avatar}`" alt="" />
            </li>
          </ul>
        </div>
      </div>
      <!-- TODO: 吸顶 -->
      <div class="nav-sub-wrap">
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

    <Popup
      class="su-pop"
      v-if="suPopState"
      @toggleShowState="toggleSignUpPopState"
    >
      <SignUp />
    </Popup>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { State } from "vuex-class";
import { INavItem } from "../types/header";
import VueRouter from "vue-router";

// components
import Icon from "@/components/Icon.vue";
import Popup from "@/components/Popup.vue";
import SignUp from "@/components/SignUp.vue";
import { IUserInfo } from "../types/user";

@Component({
  components: {
    Icon,
    Popup,
    SignUp
  }
})
export default class Header extends Vue {
  // data
  private nav: Array<INavItem> = [
    {
      name: "home",
      content: "Home",
      path: "/"
    },
    {
      name: "random",
      content: "Random",
      path: "/random"
    },
    {
      name: "read",
      content: "Reader",
      path: "/read"
    },
    {
      name: "user",
      content: "User",
      path: "/user"
    }
  ];
  private suPopState: boolean = false;

  // props
  @Prop({ default: "home" }) private path!: string;

  // state
  @State(state => state.user.token) token!: String;
  @State(state => state.user.info) info!: IUserInfo;

  private toggleSignUpPopState() {
    this.suPopState = !this.suPopState;
  }
}
</script>

<style lang="less" scoped>
@import "../assets/styles/index.less";

.header-wrap {
  background-color: #fff;
  margin-bottom: 15px;

  .header {
    max-width: @contentWidth;
    padding: 0 20px;
    margin: 0 auto;
    box-sizing: border-box;

    .nav-main-wrap {
      .flex-center();
      height: 65px;
      justify-content: space-between;

      .user-wrap {
        .flex-center();

        .icon {
          .flex-center();

          width: 25px;
          height: 25px;
          margin-right: 16px;
        }

        ul {
          display: flex;

          li {
            .flex-align-center();

            &:not(:first-child) {
              margin-left: @defMargin;
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
        }
      }
    }

    .nav-sub-wrap {
      height: 50px;
      display: flex;

      .nav-sub {
        display: flex;

        .item {
          padding: 10px 20px;
          display: flex;
          align-items: center;
          border-radius: 20px;
          font-size: 15px;
          letter-spacing: 2px;
          box-sizing: border-box;

          &:not(.active):hover a {
            color: @mainColor;
            transition: all 0.2s linear;
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
