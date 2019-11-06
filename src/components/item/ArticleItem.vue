<template>
  <div class="article-item-wrap">
    <div class="article-item">
      <ul class="tag-list">
        <li class="item">{{ info.book }}</li>
        <li class="item">{{ info.author }}</li>
        <li class="item">{{ timeUntilNow }}</li>
        <li class="item">{{ info.tag }}</li>
      </ul>
      <p class="article-name">{{ info.title }}</p>
      <input type="button" :value="`${info.like}likes`" />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { IArticleItem } from "@/types/info";
import moment from "moment";

@Component
export default class ArticleItem extends Vue {
  @Prop({ default: {} }) info!: IArticleItem;

  get timeUntilNow(): string {
    let time: string[] = this.info.time.split("-");
    return moment(time).fromNow();
  }
}
</script>

<style lang="less" scoped>
@import "../../assets/styles/index.less";

.article-item-wrap {
  padding: @defMargin;

  &:hover {
    background-color: @hoverGray;
  }

  .article-item {
    .tag-list {
      display: flex;
      font-size: 12px;
      color: @lightText;

      .item {
        &:not(:first-child) {
          margin-left: @defMargin;
        }
      }
    }

    .article-name {
      margin: 10px 0;
      font-size: 16px;
      font-weight: bold;
    }
  }
}
</style>
