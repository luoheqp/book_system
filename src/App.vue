<template>
  <div id="app">
    <Header :path="path"></Header>
    <div class="container">
      <router-view />
    </div>
    <!-- <Footer></Footer> -->
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import Cookie from "js-cookie";

// components
import Header from "@/components/Header/index.vue";
import Footer from "@/components/Footer.vue";
import { State, Mutation, Action } from "vuex-class";

@Component({ components: { Header, Footer } })
export default class App extends Vue {
  get path(): string {
    return this.$route.path.split("/")[1];
  }

  @State(state => state.user.token) vuexToken!: string;
  @Mutation("user/saveToken") saveToken!: Function;
  @Action("user/getUserInfo") getUserInfo!: Function;

  private mounted() {
    // 验证登录状态
    const token = Cookie.get("token");
    if (!this.vuexToken && token) {
      console.log("app get token");
      this.saveToken(token);
      this.getUserInfo();
    }
  }
}
</script>

<style lang="less">
@import "./assets/styles/index.less";

#app {
  // ""
  font-family: "medium", -apple-system, system-ui, BlinkMacSystemFont,
    Helvetica Neue, PingFang SC, Hiragino Sans GB, Microsoft YaHei, Arial,
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  // background-color: @defBg;

  .container {
    flex: 1;
    max-width: @contentWidth;
    width: 100%;
    margin: 0 auto;
    position: relative;
  }
}
</style>
