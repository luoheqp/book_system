<template>
  <div :class="['book-item', isCanHover ? 'hover' : '']">
    <!-- pic -->
    <div class="pic">
      <img :src="info.cover" alt />
    </div>
    <!-- info -->
    <div class="info-wrap">
      <div class="info">
        <p class="name">{{ info.name }}</p>
        <p class="detail">
          <span class="author">Author: {{ info.author }}</span>
          <span class="date">Published date: {{ info.pubdate }}</span>
          <span class="press">Press: {{ info.press }}</span>
        </p>
        <p class="desc">{{ info.desc }}</p>
      </div>
      <div class="other">
        <div class="operate">
          <router-link class="item" :to="`/reader/${info.md5}`">
            Read
          </router-link>
          <router-link class="item" :to="`/book/${info._id}`">Like</router-link>
        </div>
        <div class="tag">
          <span v-for="item in info.tag" :key="item._id"
            >#{{ item.tagName }}</span
          >
        </div>
      </div>
    </div>
    <!-- cancel btn -->
    <div class="cancel-btn" @click="handleCancel" v-show="isShowCancel"></div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { IListItem } from "@/types/info";

@Component
export default class ListItem extends Vue {
  // ListItem 所展示的信息内容
  @Prop({
    default: () => ({
      id: 0,
      picPath: "null",
      name: "book name",
      author: "book author",
      date: "publsh data",
      press: "press",
      desc: "book description",
      tag: [""]
    })
  })
  public info!: IListItem;
  // 是否有 hover 效果
  @Prop({ default: true })
  private isCanHover!: boolean;
  // 是否显示 cancel 按钮
  @Prop({ default: false })
  private isShowCancel!: boolean;

  // cancel 按钮事件
  handleCancel() {
    this.$emit("cancel");
  }
}
</script>

<style lang="less" scoped>
@import "../../assets/styles/index.less";

.book-item {
  padding: @defMargin 0;
  height: 230px;
  box-sizing: border-box;
  display: flex;
  background-color: #fff;
  position: relative;

  &.hover:hover {
    background-color: @hoverGray;
  }

  .pic {
    .flex-center();
    width: 200px;
    height: 200px;
    background-color: #eee;
    margin-right: @defMargin;
    object-fit: contain;

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  .info-wrap {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .info {
      color: @defText;
      box-sizing: border-box;
      flex: 1;
      display: flex;
      flex-direction: column;

      .name {
        font-size: 26px;
        font-weight: bold;
        margin-bottom: 10px;

        &::first-letter {
          text-transform: uppercase;
        }
      }

      .detail {
        display: flex;
        flex-direction: column;
        font-size: 16px;

        span {
          margin-bottom: 7px;
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
    }

    .other {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;

      .operate {
        display: flex;

        > .item {
          padding: 5px 10px;
          background: #333;
          color: #fff;
          border-radius: 5px;

          &:not(:last-child) {
            margin-right: @defMargin;
          }
        }
      }

      .tag {
        font-size: 12px;
        color: @lightText;

        span:not(:last-child) {
          margin-right: 5px;
        }
      }
    }
  }

  .cancel-btn {
    position: absolute;
    top: 20px;
    right: 20px;
    width: 30px;
    height: 30px;
    background-image: url("../../assets/images/close.svg");
    background-size: contain;
    background-repeat: no-repeat;
    cursor: pointer;
    transition: all 0.2s linear;

    &:hover {
      transform: scale(0.8);
    }
  }
}
</style>
