<template>
  <div class="book-list-wrap">
    <BookItem
      v-for="item in info"
      :info="item"
      :key="item._id"
      :isCancel="isCancel"
      @cancel="handleCancel"
      class="item"
    ></BookItem>
    <div class="loading-wrap">
      <Loading v-if="!info && !info[0]._id" txt="loading" />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

// components
import BookItem from "@/views/User/components/BookItem.vue";
import Loading from "@/components/common/Loading.vue";

@Component({
  components: {
    BookItem,
    Loading
  }
})
export default class BookList extends Vue {
  @Prop({
    default: () => {
      return [{}];
    }
  })
  info!: any;
  @Prop({ default: false }) isCancel!: boolean;

  private handleCancel(id: string) {
    this.$emit("cancel", id);
  }
}
</script>

<style lang="less" scoped>
@import "../../../assets/styles/index.less";

.book-list-wrap {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  position: relative;

  .item {
    width: 49%;
    margin-bottom: @defMargin;
  }

  .loading-wrap {
    .abs-center();
  }
}
</style>
