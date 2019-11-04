<template>
  <div class="user-wrap">
    <div class="user">
      <div class="user-pic">
        <img src="/images/slk.jpg" alt="user-pic" />
      </div>
      <div class="user-info">
        <p class="user-name">user name</p>
        <p class="read-statistic">
          <span class="sub">读书经历:</span>
          你已读
          <em>3</em> 本书 , 写了 <em>10</em> 篇读后感 , 还请再接再厉哟 ~
        </p>
        <p class="upload-statistic">
          <span class="sub">书籍积累:</span>
          你已上传
          <em>3</em> 本书 , 写了 <em>10</em> 篇读后感 , 还请再接再厉哟 ~
        </p>
      </div>
      <div class="setting">
        <input type="button" style="input-item" value="修改个人设置" />
      </div>
    </div>
    <div class="read">
      <ul class="nav">
        <li
          :class="['nav-item', nav === 'read' ? 'active' : '']"
          @click="() => handleChangeNav('read')"
        >
          读书
        </li>
        <li
          :class="['nav-item', nav === 'write' ? 'active' : '']"
          @click="() => handleChangeNav('write')"
        >
          有感
        </li>
      </ul>
      <div :class="['read-box-wrap', nav === 'read' ? 'active' : '']">
        <BookList></BookList>
      </div>
      <div :class="['write-box-wrap', nav === 'write' ? 'active' : '']">
        write box
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

// components
import BookList from "@/views/User/components/BookList.vue";

@Component({
  components: {
    BookList
  }
})
export default class User extends Vue {
  private nav: string = "read";

  handleChangeNav(nav: string) {
    this.nav = nav;
  }
}
</script>

<style lang="less" scoped>
@import "../../assets/styles/index.less";

.user-wrap {
  .user {
    .flex-center();
    place-items: flex-start;
    background-color: #fff;
    padding: @doubleMargin;
    margin-bottom: @defMargin;

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
        margin-bottom: @defMargin;
      }

      .read-statistic,
      .upload-statistic {
        font-size: 12px;
        color: @lightText;
        margin-bottom: 10px;

        em {
          color: @mainColor;
        }
      }
    }
  }

  .read {
    .nav {
      margin-bottom: @defMargin;
      padding: @defMargin;
      display: flex;
      background-color: #fff;

      .nav-item {
        padding: 5px 10px;
        cursor: pointer;

        &:not(:first-child) {
          margin-left: 10px;
        }

        &:hover:not(.active) {
          color: @mainColor;
        }

        &.active {
          border-bottom: 2px solid @mainColor;
        }
      }
    }

    .read-box-wrap,
    .write-box-wrap {
      padding: @defMargin;
      background-color: #fff;
      display: none;

      &.active {
        display: block;
      }
    }

    .read-box-wrap {
    }

    .write-box-wrap {
    }
  }
}
</style>
