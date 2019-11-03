<template>
  <div class="user-wrap">
    <div class="user">
      <div class="user-pic">
        <img src="/images/slk.jpg" alt="user-pic" />
      </div>
      <div class="user-info">
        <p class="user-name">user name</p>
        <p class="read-statistic">
          <span class="sub">读书经历: </span>
          你已读
          <em>3</em> 本书 , 写了 <em>10</em> 篇读后感 , 还请再接再厉哟 ~
        </p>
        <p class="upload-statistic">
          <span class="sub">书籍积累: </span>
          你已上传
          <em>3</em> 本书 , 写了 <em>10</em> 篇读后感 , 还请再接再厉哟 ~
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class User extends Vue {}
</script>

<style lang="less" scoped>
@import "../../assets/styles/index.less";

.user-wrap {
  background-color: #fff;
  padding: @doubleMargin;

  .user {
    .flex-center();
    place-items: flex-start;

    .user-pic {
      .flex-center();
      width: 100px;
      height: 100px;
      border-radius: 50%;
      overflow: hidden;
      margin-right: @defMargin;

      img {
        max-width: 100%;
        max-height: 100%;
      }
    }

    .user-info {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .user-name {
        font-size: 30px;
        font-weight: bold;
        margin-bottom: 10px;
      }

      .read-statistic {
        font-size: 12px;
        color: @lightText;

        em {
          color: @mainColor;
        }
      }
    }
  }
}
</style>
