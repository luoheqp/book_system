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
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

// components
import ArticleItem from "@/components/item/ArticleItem.vue";
import { State } from "vuex-class";
import { IArticleItem } from "../../types/info";

@Component({
  components: {
    ArticleItem
  }
})
export default class Home extends Vue {
  @State(state => state.article.articleGroupInfo)
  articleGroupInfo!: IArticleItem[];
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
