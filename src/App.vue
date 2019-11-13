<template>
  <div id="app">
    <!-- <Header :path="path"></Header> -->
    <div class="container">
      <router-view />
    </div>
    <!-- <Footer></Footer> -->
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

// components
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";

@Component({ components: { Header, Footer } })
export default class App extends Vue {
  get path(): string {
    return this.$route.path.split("/")[1];
  }
}
</script>

<style lang="less">
@import "./assets/styles/index.less";

#app {
  // "SFNSRounded"
  font-family: -apple-system, system-ui, BlinkMacSystemFont, Helvetica Neue,
    PingFang SC, Hiragino Sans GB, Microsoft YaHei, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  // background-color: @defBg;

  .container {
    flex: 1;
    width: @contentWidth;
    margin: 0 auto;
    position: relative;
  }
}
</style>
