<template>
  <div class="book-list-wrap">
    <BookItem
      v-for="item in info"
      :info="item"
      :key="item._id"
      class="item"
    ></BookItem>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

// components
import BookItem from "@/views/User/components/BookItem.vue";

@Component({
  components: {
    BookItem
  }
})
export default class BookList extends Vue {
  @Prop({
    default: () => {
      return [{}];
    }
  })
  info!: any;
}
</script>

<style lang="less" scoped>
@import "../../../assets/styles/index.less";

.book-list-wrap {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  .item {
    width: 49%;
    margin-bottom: @defMargin;
  }
}
</style>
