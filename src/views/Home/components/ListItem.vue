<template>
  <div class="book-item">
    <div class="pic">200 * 200</div>
    <div class="info">
      <p class="name">一本书读懂销售心理学（畅销书）</p>
      <p class="detail">
        <span class="author">李昊轩著</span>
        <span class="date">2012-10-01</span>
        <span class="press">中国商业出版社</span>
      </p>
      <p class="desc">
        本书正是从心理学角度解读销售活动，涉及心理学和营销学两个学科的内容，以销售活动为主线，配合相关的心理学术语，系统而科学地讲述了心理学在销售活动中的应用。对销售人员在销售过程中的不同阶段，消费者的不同心理，以及销售人员应该怎样去面对客户等方面都作了详细介绍，相信会对销售人员的工作有着很强的指导作用。
      </p>
      <div class="other">
        <div class="operate">
          <input type="button" value="详情" />
          <input type="button" value="收藏" />
        </div>
        <div class="tag">#心理</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class ListItem extends Vue {}
</script>

<style lang="less" scoped>
@import "../../../assets/styles/index.less";

.book-item {
  padding: @defMargin;
  height: 230px;
  box-sizing: border-box;
  display: flex;

  &:hover {
    background-color: @hoverGray;
  }

  .pic {
    .flex-center();
    width: 200px;
    height: 200px;
    background-color: #eee;
    margin-right: @defMargin;
  }

  .info {
    padding: 10px 0;
    color: @defText;
    box-sizing: border-box;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .name {
      font-size: 26px;
      font-weight: bold;
    }

    .detail {
      span:not(:last-child) {
        margin-right: 10px;
      }

      .author {
      }
      .date {
      }
      .press {
      }
    }

    .desc {
      line-height: 20px;
      color: @defText;
      flex: 1;
      max-height: 60px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
    }

    .other {
      display: flex;
      justify-content: space-between;

      .operate {
        input {
          appearance: none;
          border: 1px solid #333;
          background: #fff;
          padding: 5px 10px;
          border-radius: 15px;
          outline: none;
          cursor: pointer;

          &:not(:last-child) {
            margin-right: @defMargin;
          }
        }
      }

      .tag {
        font-size: 12px;
        color: @lightText;
      }
    }
  }
}
</style>
