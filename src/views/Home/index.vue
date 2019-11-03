<template>
  <div class="home-wrap">
    <div class="home">
      <div class="book-list">
        <ListItem
          class="list-item"
          v-for="item in randomBookGroupInfo[0].bookGroup"
          :key="item.id"
          :info="item"
        ></ListItem>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

// components
import ListItem from "@/components/ListItem.vue";
import { State } from "vuex-class";
import { ILineListItem } from "../../types/info";

@Component({
  components: {
    ListItem
  }
})
export default class Home extends Vue {
  @State(state => state.book.randomBookGroupInfo)
  randomBookGroupInfo!: ILineListItem[];
}
</script>

<style lang="less" scoped>
@import "../../assets/styles/index.less";

.home-wrap {
  background-color: #fff;

  .home {
    .book-list {
      .list-item {
        border-bottom: 1px solid #b2bac226;
      }
    }
  }
}
</style>
