<template>
  <div class="edit-wrap">
    edit
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

Component({});
export default class UserInfoEdit extends Vue {}
</script>

<style lang="less" scoped>
@import "../../../assets/styles/index.less";

.edit-wrap {
  .flex-center();
  padding: 44px 56px;
}
</style>
