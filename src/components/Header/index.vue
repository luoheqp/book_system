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
          <ul v-if="!token">
            <li class="item" @click="togglePopState('signup')">Sign up</li>
            <li class="item" @click="togglePopState('signin')">Sign in</li>
          </ul>
          <ul v-else>
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

    <Popup class="su-pop" v-if="popState" @toggleShowState="togglePopState">
      <SignUp v-if="popType === 'signup'" @toSignIn="switchPopType('signin')" />
      <SignIn v-if="popType === 'signin'" @toSignUp="switchPopType('signup')" />
    </Popup>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { State } from "vuex-class";
import { INavItem } from "../../types/header";
import VueRouter from "vue-router";

// components
import Icon from "@/components/Icon.vue";
import Popup from "@/components/common/Popup.vue";
import SignUp from "./components/SignUp.vue";
import SignIn from "./components/SignIn.vue";
import { IUserInfo } from "../../types/user";

@Component({
  components: {
    Icon,
    Popup,
    SignUp,
    SignIn
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
      name: "random",
      content: "RANDOM",
      path: "/random"
    },
    {
      name: "read",
      content: "READER",
      path: "/read"
    },
    {
      name: "user",
      content: "USER",
      path: "/user"
    },
    {
      name: "reader",
      content: "READER",
      path: "/reader"
    },
    {
      name: "write",
      content: "WRITE",
      path: "/write"
    }
  ];
  private popState: boolean = false;
  private popType: "signup" | "singin" = "signup";

  // props
  @Prop({ default: "home" }) private path!: string;

  // state
  @State(state => state.user.token) token!: String;
  @State(state => state.user.info) info!: IUserInfo;

  private togglePopState(type: "signup" | "singin") {
    this.switchPopType(type);
    this.popState = !this.popState;
  }

  private switchPopType(type: "signup" | "singin") {
    this.popType = type;
  }
}
</script>

<style lang="less" scoped>
@import "../../assets/styles/index.less";

.header-wrap {
  background-color: #fff;
  margin-bottom: 15px;
  box-shadow: 0 2px 2px -2px rgba(0, 0, 0, 0.15);

  .header {
    max-width: @contentWidth;
    padding: 0 @defMargin;
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

          .item {
            .flex-align-center();
            cursor: pointer;

            &:hover {
              .txt-hover();
            }

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
          padding: 10px 20px 10px 0;
          display: flex;
          align-items: center;
          border-radius: 20px;
          font-size: 15px;
          letter-spacing: 2px;
          box-sizing: border-box;

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
