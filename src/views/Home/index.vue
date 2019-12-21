<template>
  <div class="home-wrap">
    <div class="home">
      <div class="book-list">
        <ArticleItem
          class="list-item"
          v-for="item in articleList"
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
import { State, Action } from "vuex-class";
import { IArticleItem } from "../../types/info";

// components
import ArticleItem from "@/components/item/ArticleItem.vue";
import Commend from "./components/Commend.vue";
import { IArticleInfo } from "../../types/article";

@Component({
  components: {
    ArticleItem,
    Commend
  }
})
export default class Home extends Vue {
  @State(state => state.article.articleList) articleList!: IArticleInfo[];
  @Action("article/getArticleList") getArticleList: any;

  private mounted() {
    this.getArticleList();
  }
}
</script>

<style lang="less" scoped>
@import "../../assets/styles/index.less";

.home-wrap {
  background-color: #fff;

  .home {
    display: flex;

    .book-list {
      width: 680px;
      padding-right: 24px;

      .list-item {
        &:not(:last-child) {
          margin-bottom: 48px;
        }
      }
    }

    .commend-wrap {
      width: 328px;
    }
  }
}

@media (max-width: 960px) {
  .home {
    align-items: center;

    .book-list {
      width: 100% !important;
      padding: 0 20px 0 20px !important;
      box-sizing: border-box;
    }

    .commend-wrap {
      display: none;
    }
  }
}
</style>
