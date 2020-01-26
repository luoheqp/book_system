<template>
  <div class="article-wrap">
    <div class="header-wrap">
      <h3 class="title">{{ articleInfo.title }}</h3>
      <div class="author-info">
        <div class="avatar">
          <img :src="authorInfo.avatar" alt="" />
        </div>
        <div class="info">
          <p class="name">{{ authorInfo.account }}</p>
          <p class="time">{{ articleInfo.time }} · {{ timeUntilNow }}</p>
        </div>
      </div>
    </div>
    <div class="content-wrap">
      <article class="markdown-body" v-html="article"></article>
    </div>
    <div class="operate-wrap">
      <ul class="opt">
        <li class="opt-item">
          <i class="iconfont icon-dropdowncollected" v-if="isCollection"></i>
          <i class="iconfont icon-centericcollection" v-else></i>
        </li>
        <li class="opt-item">
          <i class="iconfont icon-icon-like" v-if="isLike"></i>
          <i class="iconfont icon-like" v-else></i>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Action } from "vuex-class";
import { IArticle, IArticleInfo } from "../../types/article";
import moment from "moment";
import "@/assets/styles/markdown/github-markdown.css";

@Component({})
export default class Article extends Vue {
  public articleId: string = "";
  public articleInfo: IArticleInfo = {} as IArticleInfo;
  public authorInfo: any = {};
  public article: string = "";

  @Action("article/getArticle") getArticle!: Function;

  get timeUntilNow(): string {
    let time: string = this.articleInfo.time;
    return moment(time).fromNow();
  }

  private mounted() {
    this.articleId = this.$route.params.articleId;

    this.getArticle(this.articleId).then((res: any) => {
      this.article = res.content.content;
      this.articleInfo = res.article;
      this.authorInfo = res.author;
    });
  }
}
</script>

<style lang="less" scoped>
@import "../../assets/styles/index.less";

.article-wrap {
  .header-wrap {
    .title {
      font-size: 40px;
      line-height: 48px;
      font-family: medium;
    }

    .author-info {
      display: flex;
      margin-top: @doubleMargin;

      .avatar {
        width: 48px;
        height: 48px;
        border-radius: 50%;
        overflow: hidden;
        margin-right: 12px;

        img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
      }

      .info {
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;

        .name {
          font-size: 16px;
          color: #333;
          font-family: medium;
        }
      }
    }
  }

  .content-wrap {
    margin: @doubleMargin;
    margin-left: 0;
    display: flex;
  }

  .operate-wrap {
    position: fixed;
    right: @defMargin;
    bottom: @doubleMargin;

    .opt {
      .opt-item {
        .flex-center();
        flex-direction: column;
        border-radius: 25px;
        box-sizing: border-box;

        i {
          .flex-center();
          width: 40px;
          height: 40px;
          font-size: 20px;
          cursor: pointer;
          position: relative;

          &::after {
            content: "";
            display: inline-block;
            position: absolute;
            bottom: 5px;
            left: 5px;
            opacity: 0;
            width: 13px;
            height: 13px;
            border-radius: 50%;
            background: @mainColor;
            z-index: -1;
            transition: all 0.1s linear;
          }

          &:hover {
            &::after {
              bottom: 10px;
              left: 10px;
              opacity: 1;
            }
          }
        }
      }
    }
  }
}
</style>
