<template>
  <div class="user-wrap">
    <!-- BUG: 此容器名字过长的话会变形 , 原因未知 -->
    <div class="user">
      <div class="user-info">
        <div class="line">
          <p class="user-name">{{ userInfo.account }}</p>
          <p class="setting" @click="togglePopState">Edit profile</p>
        </div>
      </div>
      <div class="user-pic">
        <img :src="userInfo.avatar" alt="user-avatar" />
      </div>
    </div>
    <div class="read">
      <ul class="nav">
        <li
          :class="['nav-item', nav === 'read' ? 'active' : '']"
          @click="() => handleChangeNav('read')"
        >
          Reading
        </li>
        <li
          :class="['nav-item', nav === 'write' ? 'active' : '']"
          @click="() => handleChangeNav('write')"
        >
          Writing
        </li>
      </ul>
      <div :class="['read-box-wrap', nav === 'read' ? 'active' : '']">
        <BookList></BookList>
      </div>
      <div :class="['write-box-wrap', nav === 'write' ? 'active' : '']">
        write box
      </div>
      <Popup v-if="popState" @toggleShowState="togglePopState">
        <UserInfoEdit />
      </Popup>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

// components
import BookList from "@/views/User/components/BookList.vue";
import Popup from "@/components/common/Popup.vue";
import UserInfoEdit from "./components/UserInfoEdit.vue";

import { State } from "vuex-class";
import { IUserInfo } from "../../types/user";

@Component({
  components: {
    BookList,
    Popup,
    UserInfoEdit
  }
})
export default class User extends Vue {
  private nav: string = "read";
  private popState: boolean = false;

  @State(state => state.user.info) userInfo!: IUserInfo;

  handleChangeNav(nav: string) {
    this.nav = nav;
  }

  togglePopState() {
    this.popState = !this.popState;
  }
}
</script>

<style lang="less" scoped>
@import "../../assets/styles/index.less";

.user-wrap {
  padding: 0 @defMargin;

  .user {
    .flex-center();
    justify-content: space-between;
    place-items: flex-start;
    background-color: #fff;
    // padding: @doubleMargin;
    margin-bottom: @defMargin;
    box-sizing: border-box;

    .user-info {
      flex: 1;
      margin-right: @defMargin;

      .line {
        width: 100%;
        display: flex;
        align-items: center;
        margin-bottom: @defMargin;
      }

      .user-name {
        .one-line();
        max-width: 400px;
        font-size: 30px;
        font-weight: bold;
        margin-right: @defMargin;
        box-sizing: border-box;
      }

      .setting {
        font-size: 16px;
        font-weight: normal;
        border: 1px solid #333;
        border-radius: 5px;
        padding: 2px 5px;
        transition: all 0.1s linear;
        cursor: pointer;

        &:hover {
          background: #333;
          color: #fff;
        }
      }
    }

    .user-pic {
      .flex-center();
      flex: 0 0 100px;
      height: 100px;
      border-radius: 50%;
      overflow: hidden;
      background-color: #ccc;

      img {
        max-width: 100%;
        max-height: 100%;
        object-fit: contain;
      }
    }
  }

  .read {
    .nav {
      padding: @defMargin 0;
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
      padding: @defMargin 0;
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
