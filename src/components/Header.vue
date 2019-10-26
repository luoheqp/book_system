<template>
  <div class="header-wrap">
    <div class="header">
      <div class="logo-wrap">
        <router-link to="/">
          <span class="logo-icon"></span>
          <span class="logo-text">MYBOOK</span>
        </router-link>
      </div>
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

@Component
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

    .logo-wrap {
      display: flex;
      align-items: center;

      .logo-icon {
        width: 15px;
        height: 15px;
        display: inline-block;
        margin-right: 5px;
        background-color: #333;
        position: relative;

        &::after,
        &::before {
          content: "";
          display: block;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background-color: #333;
        }

        &::after {
          top: -8px;
        }

        &::before {
          bottom: -8px;
        }
      }

      .logo-text {
        display: inline-block;
        font-size: 16px;
        border-bottom: 1px solid #333;
        padding-bottom: 2px;
        letter-spacing: 2px;
      }
    }

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
