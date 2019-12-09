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
            <li class="avatar"></li>
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
      <Popup
        class="su-pop"
        v-if="suPopState"
        @toggleShowState="toggleSignUpPopState"
      >
        <div class="su-wrap">
          <h3>Sign up to join us</h3>
          <p class="sub-title">Enter your email address to create an account</p>
          <div class="input-wrap">
            <p>Your Email</p>
            <input
              v-model="userInfo.account"
              :class="['su-input', infoError ? 'error' : '']"
              type="text"
              @blur="e => handleCheck(e.target.value, 'email')"
            />
          </div>
          <input
            @click="handleNext"
            class="continue"
            type="button"
            value="Continue"
          />
        </div>
      </Popup>
    </div>
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

// func
import { regularCheck } from "@/utils/func_tool";
import { IUserSignUpInfo } from "../types/user";

@Component({
  components: {
    Icon,
    Popup
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
  // sign up data
  private infoError: boolean = false;
  private step: number = 1;
  private userInfo: IUserSignUpInfo = {
    account: "",
    password: "",
    avatar: ""
  };

  // props
  @Prop({ default: "home" }) private path!: string;

  // state
  @State(state => state.user.token) token!: object;

  private toggleSignUpPopState() {
    this.suPopState = !this.suPopState;
  }

  private handleCheck(value: string, reg: string) {
    if (!regularCheck(value, reg)) {
      this.infoError = true;
      return false;
    }
    this.infoError = false;
    return true;
  }

  private handleNext() {
    let flag: boolean = true;
    switch (this.step) {
      case 1:
        flag = this.handleCheck(this.userInfo.account, "email");
        break;
    }

    if (flag) {
      this.step = this.step + 1;
    }
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

      .icon-wrap {
      }

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

    .su-pop {
      .su-wrap {
        .flex-center();
        flex-direction: column;
        width: 600px;
        height: 550px;
        padding: 44px 56px;
        box-sizing: border-box;
        text-align: center;

        h3 {
          line-height: 36px;
          font-size: 32px;
          font-weight: 500px;
          color: rgba(0, 0, 0, 0.84);
          margin-bottom: 8px;
        }

        .sub-title {
          font-size: 16px;
          line-height: 20px;
          color: rgba(0, 0, 0, 0.54);
        }

        .input-wrap {
          margin: 25px 0 45px 0;
          width: 270px;

          & > p {
            font-size: 15px;
            line-height: 20px;
            color: rgba(0, 0, 0, 0.84);
            margin: 12px;
          }

          .su-input {
            border: none;
            width: 100%;
            border-bottom: 1px solid rgba(0, 0, 0, 0.34);
            font-size: 16px;
            line-height: 24px;
            font-weight: 300;
            outline: none;
            text-align: center;
            font-family: "medium-number";

            &.error {
              border-bottom-color: red;
            }
          }
        }

        .continue {
          background: rgba(0, 0, 0, 0.9);
          font-size: 14px;
          color: #fff;
          border-radius: 4px;
          padding: 8px 16px;
        }
      }
    }
  }
}
</style>
