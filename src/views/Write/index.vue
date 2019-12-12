<template>
  <div class="write-wrap">
    <div class="write">
      <h3>write page</h3>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import axios from "axios";

@Component({})
export default class Write extends Vue {
  public content: any = new FormData();
  public txt: any = "this is a txt";

  mounted() {}
}
</script>

<style lang="less" scoped></style>
