<template>
  <div class="home-wrap">
    <div class="home">
      <div class="book-list">
        <ArticleItem
          class="list-item"
          v-for="item in articleGroupInfo"
          :key="item.id"
          :info="item"
        ></ArticleItem>
      </div>
      <div class="commend-wrap">
        <Commend />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { State } from "vuex-class";
import { IArticleItem } from "../../types/info";

// components
import ArticleItem from "@/components/item/ArticleItem.vue";
import Commend from "./components/Commend.vue";

@Component({
  components: {
    ArticleItem,
    Commend
  }
})
export default class Home extends Vue {
  public articleGroupInfo: IArticleItem[] = [
    {
      id: 1,
      book: "Tuesdays with Morrie",
      author: "Mitch Albom",
      desc: "Be with someone you’re comfortable being weird with.",
      time: "2019.12.12 8:42",
      tag: ["literature", "english"],
      title: "Let Us Read < Tuesdays with Morrie >",
      like: 13
    }
  ];
}
</script>

<style lang="less" scoped>
@import "../../assets/styles/index.less";

.home-wrap {
  background-color: #fff;

  .home {
    display: flex;

    .book-list {
      flex: 1;
      max-width: 680px;
      padding-right: 24px;

      .list-item {
        // border-bottom: 1px solid #b2bac226;
      }
    }

    .commend-wrap {
      width: 328px;
    }
  }
}
</style>
