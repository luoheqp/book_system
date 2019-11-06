<template>
  <div class="write-wrap">
    <div class="write">
      <h3>write page</h3>
      <!-- <Editor></Editor> -->
      <input type="text" v-model="txt" />
      <input type="file" @change="handleChange" ref="file" />
      <input type="button" value="submit" @click="handleSubmit" />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import axios from "axios";

// import "tui-editor/dist/tui-editor.css";
// import "tui-editor/dist/tui-editor-contents.css";
// import "codemirror/lib/codemirror.css";
// import { Editor } from "@toast-ui/vue-editor";

@Component({
  // components: { Editor }
})
export default class Write extends Vue {
  public content: any = new FormData();
  public txt: any = "this is a txt";

  handleChange(e: any) {
    console.log(e.target.files[0]);
    this.content.append("filename", e.target.files[0]);
    console.log(this.content.filename);
  }

  handleSubmit() {
    this.content.append("textinfo", this.txt);
    axios({
      method: "POST",
      url: "/book/postBookInfo",
      data: this.content,
      headers: {}
    });
  }

  mounted() {}
}
</script>

<style lang="less" scoped></style>
