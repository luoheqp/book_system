<template>
  <div class="article-wrap">
    article
    <article v-html="article"></article>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Action } from "vuex-class";
import { IArticle, IArticleInfo } from "../../types/article";

@Component({})
export default class Article extends Vue {
  public articleId: string = "";
  public articleInfo!: IArticleInfo;
  public article: string = "";

  @Action("article/getArticle") getArticle!: Function;

  private mounted() {
    this.articleId = this.$route.params.articleId;

    this.getArticle(this.articleId).then((res: any) => {
      this.article = res.content.content;
      this.articleInfo = res.article;
    });
  }
}
</script>

<style lang="less" scoped>
.article-wrap {
}
</style>
