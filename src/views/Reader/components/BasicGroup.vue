<template>
  <div class="basic-group-wrap">
    <ul class="opt">
      <li class="opt-item">
        <i class="iconfont icon-write" @click="handleWrite"></i>
      </li>
      <li class="opt-item">
        <i
          class="iconfont icon-dropdowncollected"
          @click="handleCollect"
          v-if="isCollection"
        ></i>
        <i
          class="iconfont icon-centericcollection"
          @click="handleCollect"
          v-else
        ></i>
      </li>
      <li class="opt-item">
        <i
          class="iconfont icon-icon-like"
          @click="handleLike"
          v-if="isLike"
        ></i>
        <i class="iconfont icon-like" @click="handleLike" v-else></i>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Action, Mutation } from "vuex-class";
import Cookie from "js-cookie";

@Component({})
export default class BasicGroup extends Vue {
  private bookId: string = "";
  private isCollection: boolean = false;
  private isLike: boolean = false;

  @Action("user/postUserCollect") postUserCollect!: Function;
  @Action("user/postUserLike") postUserLike!: Function;
  @Mutation("normal/toggleSignInState") toggleSignInState!: Function;

  private mounted() {
    this.bookId = this.$route.params.id;
  }

  private handleCollect() {
    const { isCollection, bookId } = this;

    if (!bookId) {
      this.$toast.show("missing book id");
    }

    this.postUserCollect({ bookId: bookId, type: +!isCollection }).then(() => {
      this.isCollection = !isCollection;
    });
  }

  private handleLike() {
    const { isLike, bookId } = this;

    if (!bookId) {
      this.$toast.show("missing book id");
    }

    this.postUserLike({ bookId: bookId, type: +!isLike }).then(() => {
      this.isLike = !isLike;
    });
  }

  private handleWrite() {
    const token = Cookie.get("token");
    const { bookId } = this;

    if (!token) {
      this.toggleSignInState();
      return false;
    }

    this.$router.push(`/write/${bookId}`);
  }
}
</script>

<style lang="less" scoped>
@import "../../../assets/styles/index.less";

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
</style>
