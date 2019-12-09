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
        <h2>Commend For You</h2>
        <ol class="commend-list">
          <li class="item" v-for="(item, index) in 10" :key="index">
            <div class="order">{{ 10 > ++index ? `0${index}` : index }}</div>
            <div class="content">
              <h3>
                How My Startup Got Acquired After Six Months
              </h3>
              <p class="info"><span>Leoljustsave</span>in<span>Flipe</span></p>
              <p class="time">Dec 3 · 13 min</p>
            </div>
          </li>
        </ol>
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
  public articleGroupInfo: IArticleItem[] = [];
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
      h2 {
        font-size: 24px;
        font-weight: 600;
        margin: 32px 32px 0 32px;
        padding-bottom: 16px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.15);
      }

      .commend-list {
        padding: 32px;

        .item {
          display: flex;

          &:not(:last-child) {
            margin-bottom: 24px;
          }

          .order {
            font-size: 34px;
            color: rgba(0, 0, 0, 0.15);
          }
          .content {
            flex: 1;
            margin-left: 16px;
            font-size: 15px;
            line-height: 20px;

            h3 {
              font-size: 16px;
              font-weight: bold;
              text-transform: capitalize;
              margin-bottom: 4px;
            }

            .info {
              color: rgba(0, 0, 0, 0.84);
            }

            .time {
              color: rgba(0, 0, 0, 0.54);
            }
          }
        }
      }
    }
  }
}
</style>
