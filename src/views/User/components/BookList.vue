<template>
  <div class="book-list-wrap">
    <BookItem class="item"></BookItem>
    <BookItem class="item"></BookItem>
    <BookItem class="item"></BookItem>
    <BookItem class="item"></BookItem>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

// components
import BookItem from "@/views/User/components/BookItem.vue";

@Component({
  components: {
    BookItem
  }
})
export default class BookList extends Vue {}
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
