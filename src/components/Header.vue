<template>
  <div class="header-wrap">
    <div class="header">
      <router-link to="/">
        <Icon></Icon>
      </router-link>
      <ul class="nav">
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
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { INavItem } from "@/types/header";
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
  height: 60px;
  background-color: #fff;
  margin-bottom: 15px;

  .header {
    max-width: @contentWidth;
    height: 100%;
    display: flex;
    justify-content: space-between;
    padding: 0 20px;
    margin: 0 auto;
    box-sizing: border-box;
    display: flex;
    align-items: center;

    .nav {
      display: flex;

      .item {
        padding: 10px 20px;
        display: flex;
        align-items: center;
        border-radius: 20px;
        font-weight: bold;
        letter-spacing: 2px;
        box-sizing: border-box;

        &:not(.active):hover a {
          color: @mainColor;
          transition: all 0.3s linear;
        }

        &.active {
          background-color: @mainColor;

          a {
            color: #fff !important;
          }
        }
      }
    }
  }
}
</style>
