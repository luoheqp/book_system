<template>
  <div class="write-wrap">
    <div class="write">
      <div class="do-wrap">
        <textarea
          class="editor"
          id="editor"
          @keyup="handleInputChange"
        ></textarea>
      </div>
      <div class="preview-wrap">
        <article class="markdown-body" v-html="preview"></article>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import axios from "axios";

// marked
import marked from "marked";
import hljs from "highlight.js"; // 高亮
import DOMPurify from "dompurify"; // DOM 化 , 防止 XSS 攻击
import "@/assets/styles/markdown/github-markdown.css";

@Component({})
export default class Write extends Vue {
  private preview = "";

  mounted() {
    marked.setOptions({
      renderer: new marked.Renderer(),
      highlight: function(code) {
        return hljs.highlightAuto(code).value;
      },
      baseUrl: "", // 所有相对链接的基础链接
      pedantic: false,
      gfm: true,
      breaks: false, // 每段之间添加一个 <br />
      smartLists: true,
      smartypants: false,
      xhtml: false
    });
  }

  // 输入内容发生改变
  private handleInputChange(e: any) {
    this.preview = marked(e.target.value);
  }
}
</script>

<style lang="less" scoped>
@import "../../assets/styles/index.less";

.write-wrap {
  .write {
    .flex-center();

    .do-wrap {
      flex: 1;

      .editor {
        width: 100%;
        height: 100%;
      }
    }
    .preview-wrap {
      flex: 1;
      .markdown-body {
        box-sizing: border-box;
        min-width: 200px;
        max-width: 980px;
        margin: 0 auto;
        padding: 45px;
      }
    }
  }
}

@media (max-width: 767px) {
  .markdown-body {
    padding: 15px;
  }
}
</style>
