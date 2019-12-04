<template>
  <div class="header-wrap">
    <div class="header">
      <div class="nav-main-wrap">
        <router-link to="/">
          <Icon class="icon"></Icon>
        </router-link>
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
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { INavItem } from "../types/header";
import VueRouter from "vue-router";

// components
import Icon from "@/components/Icon.vue";

@Component({
  components: {
    Icon
  }
})
export default class Header extends Vue {
  // data
  private nav: Array<INavItem> = [
    {
      name: "home",
      content: "首页",
      path: "/"
    },
    {
      name: "random",
      content: "随机",
      path: "/random"
    },
    {
      name: "read",
      content: "阅读器",
      path: "/read"
    },
    {
      name: "user",
      content: "用户中心",
      path: "/user"
    },
    {
      name: "signIn",
      content: "登录",
      path: "/signIn"
    },
    {
      name: "register",
      content: "注册",
      path: "/register"
    }
  ];

  @Prop({ default: "home" }) private path!: string;
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

      .icon {
      }
    }

    .nav-sub-wrap {
      height: 50px;
      display: flex;
      align-items: center;

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
