<template>
  <div class="write-wrap">
    <div class="write">
      <h3>write page</h3>
      <!-- <Editor></Editor> -->
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

// import "tui-editor/dist/tui-editor.css";
// import "tui-editor/dist/tui-editor-contents.css";
// import "codemirror/lib/codemirror.css";
// import { Editor } from "@toast-ui/vue-editor";

@Component({
  // components: { Editor }
})
export default class Write extends Vue {
  public content: any = "";

  mounted() {}
}
</script>

<style lang="less" scoped></style>
