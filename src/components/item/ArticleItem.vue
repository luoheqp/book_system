<template>
  <div class="article-item-wrap">
    <div class="article-item">
      <div class="book">
        <div class="link">
          关联图书
          <a href="#">{{ info.book }}</a>
        </div>
        <div class="tag">{{ info.tag }}</div>
      </div>
      <h2 class="name">{{ info.title }}</h2>
      <div class="sentence">{{ info.title }}</div>
      <div class="other">
        <div class="info">
          <div class="author">{{ info.author }}</div>
          <div class="time">{{ info.time }} · {{ timeUntilNow }}</div>
        </div>
        <div class="action">
          <span class="like">
            <i class="iconfont icon-like"></i>
            {{ info.like }}
          </span>
          <span class="comment">
            <i class="iconfont icon-comments"></i>
            {{ 3 }}
          </span>
        </div>
      </div>
    </div>
    <div class="article-cover"></div>
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
  display: flex;
  justify-content: space-between;

  &:hover {
    background-color: @hoverGray;
  }

  .article-item {
    flex: 1;
    margin-right: @defMargin;

    .book {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 16px;
      line-height: 20px;
      color: @lightText;
      margin-bottom: 5px;

      .link {
        display: flex;

        a {
          margin-left: 10px;
          font-style: italic;
          color: @lightText;

          &:hover {
            text-decoration: underline;
          }
        }
      }
    }

    .name {
      margin-bottom: 10px;
      font-size: 24px;
      line-height: 28px;
      font-weight: 600;
      overflow: hidden;
      max-height: 84px;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      color: #333;
    }

    .sentence {
      overflow: hidden;
      max-height: 84px;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      font-size: 16px;
      line-height: 20px;
      color: @lightText;
      margin-bottom: 12px;
    }

    .other {
      font-size: 15px;
      line-height: 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .info {
        flex: 1;

        .time {
          color: @lightText;
        }
      }

      .action {
      }
    }
  }

  .article-cover {
    background-color: #333;
    width: 150px;
  }
}
</style>
