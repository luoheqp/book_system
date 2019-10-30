<template>
  <div class="random-wrap">
    <div class="random">
      <LineList :bookInfo="bookInfo"></LineList>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { State, Action } from "vuex-class";
import { IListItem } from "@/types/info";

// components
import LineList from "./components/LineList.vue";

@Component({
  components: {
    LineList
  }
})
export default class Random extends Vue {
  @State(state => state.book.bookInfo) bookInfo!: IListItem[];
  @Action("getBookInfo") getBookInfo!: Function;
}
</script>

<style lang="less">
@import "../../assets/styles/index.less";

.random-wrap {
  .random {
  }
}
</style>
