<template>
  <div class="random-wrap">
    <div class="random">
      <LineList
        v-for="item in randomBookGroupInfo"
        :key="item.id"
        :listInfo="item"
        :nowSwiper="activeSwiper"
        @updateActiveSwiper="handleUpdateActiveSwiper"
      ></LineList>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { State, Action } from "vuex-class";
import { IListItem, ILineListItem } from "@/types/info";

// components
import LineList from "./components/LineList.vue";

@Component({
  components: {
    LineList
  }
})
export default class Random extends Vue {
  public activeSwiper: number = -1;

  @State(state => state.book.randomBookGroupInfo)
  randomBookGroupInfo!: ILineListItem[];

  @Action("getBookInfo") getBookInfo!: Function;

  handleUpdateActiveSwiper(id: number): void {
    this.activeSwiper = id;
  }
}
</script>

<style lang="less">
@import "../../assets/styles/index.less";

.random-wrap {
  .random {
  }
}
</style>
