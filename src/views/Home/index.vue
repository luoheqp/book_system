<template>
  <div class="home-wrap">
    <div class="home">
      <div class="book-list">
        <ListItem></ListItem>
        <ListItem></ListItem>
        <ListItem></ListItem>
        <ListItem></ListItem>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

// components
import ListItem from "./components/ListItem.vue";

@Component({
  components: {
    ListItem
  }
})
export default class Home extends Vue {}
</script>

<style lang="less" scoped>
@import "../../assets/styles/index.less";

.home-wrap {
  background-color: #fff;

  .home {
    .book-list {
    }
  }
}
</style>
