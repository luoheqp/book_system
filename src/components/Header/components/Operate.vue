<template>
  <div class="operate-wrap">
    <div class="user-card card">
      <img :src="info.avatar" alt="" />
      <div class="name-part">
        {{ userName }}
      </div>
    </div>
    <ul class="base-opt card">
      <li class="item"><router-link to="/user">Profile</router-link></li>
      <li class="item"><router-link to="/user">Help</router-link></li>
      <li class="item"><a href="#" @click="handleSignOut">Sign out</a></li>
    </ul>
    <ul class="card">
      <li class="item"><router-link to="/addBook">Add book</router-link></li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { State, Mutation } from "vuex-class";
import { IUserInfo } from "../../../types/user";

@Component({})
export default class Operate extends Vue {
  @State(state => state.user.info) info!: IUserInfo;
  @Mutation("user/signOut") signOut!: Function;

  get userName(): String {
    let { account } = this.info;
    if (account) {
      return this.info.account.split("@")[0];
    } else {
      return "";
    }
  }

  private handleSignOut() {
    this.signOut();
    this.$router.push("/home");
  }
}
</script>

<style lang="less" scoped>
@import "../../../assets/styles/index.less";

.operate-wrap {
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.25), 0 0 1px rgba(0, 0, 0, 0.35);
  border-radius: 3px;
  width: 230px;
  z-index: 999;
  position: relative;
  padding: 8px 0;
  background: #fff;

  &::after {
    content: "";
    display: block;
    width: 14px;
    height: 14px;
    transform: rotate(45deg);
    box-shadow: -1px -1px 1px -1px rgba(0, 0, 0, 0.54);
    position: absolute;
    right: 9px;
    top: -6px;
    background: #fff;
  }

  .card {
    .flex-center();
    flex-direction: column;
    padding: 10px 0;

    .item {
      width: 100%;
      margin: 0;

      a {
        color: rgba(0, 0, 0, 0.6);
        padding: 7px 25px;

        &:hover {
          cursor: pointer;
          color: @mainColor;
        }
      }
    }

    &:not(:last-child) {
      border-bottom: 1px solid rgba(0, 0, 0, 0.05);
    }
  }

  .user-card {
    .flex-center();
    justify-content: flex-start;
    flex-direction: row;
    padding: 25px;

    > img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      margin-right: 15px;
    }

    .name-part {
      font-weight: bold;
    }
  }
}
</style>
