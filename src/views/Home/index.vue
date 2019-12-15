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
      cover: "https://cdn-images-1.medium.com/fit/c/152/156/0*fnlQjIyet5-Mx57V",
      title: "Let Us Read < Tuesdays with Morrie >",
      like: 13
    },
    {
      id: 2,
      book:
        "Animal Spirits：How Human Psychology Drives the Economy, and Why It Matters for Global capitalism",
      author: "George A. Akerlof，Robert J. Shiller",
      desc: "Tell you so many question",
      time: "2019.12.12 21:01",
      tag: ["english", "economy"],
      title: "I love this book, you need read it",
      like: 14
    },
    {
      id: 3,
      book: "Sweetbitter",
      author: "Stephanie Danler",
      desc:
        "your mouth waters itself. Salting the most nuanced of enterprises, the food always requesting more, but the tipping point fatal.",
      time: "2019.12.12 20:55",
      tag: ["english"],
      cover:
        "https://cdn-images-1.medium.com/fit/c/152/156/1*5IwI3UFT8BmTwyY9k_vcbg.jpeg",
      title: "Now, enjoy it",
      like: 20
    },
    {
      id: 4,
      book: "Tuesdays with Morrie",
      author: "Mitch Albom",
      desc: "Be with someone you’re comfortable being weird with.",
      time: "2019.12.12 8:42",
      tag: ["literature", "english"],
      cover: "https://cdn-images-1.medium.com/fit/c/152/156/0*fnlQjIyet5-Mx57V",
      title: "Let Us Read < Tuesdays with Morrie >",
      like: 13
    },
    {
      id: 5,
      book:
        "Animal Spirits：How Human Psychology Drives the Economy, and Why It Matters for Global capitalism",
      author: "George A. Akerlof，Robert J. Shiller",
      desc: "Tell you so many question",
      time: "2019.12.12 21:01",
      tag: ["english", "economy"],
      title: "I love this book, you need read it",
      like: 14
    },
    {
      id: 6,
      book: "Sweetbitter",
      author: "Stephanie Danler",
      desc:
        "your mouth waters itself. Salting the most nuanced of enterprises, the food always requesting more, but the tipping point fatal.",
      time: "2019.12.12 20:55",
      tag: ["english"],
      cover:
        "https://cdn-images-1.medium.com/fit/c/152/156/1*5IwI3UFT8BmTwyY9k_vcbg.jpeg",
      title: "Now, enjoy it",
      like: 20
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
