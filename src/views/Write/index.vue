<template>
  <div class="write-wrap">
    <div class="title-wrap">
      <input type="text" class="title" placeholder="Title here" />
    </div>
    <div class="write">
      <div class="do-wrap">
        <textarea
          class="editor"
          id="editor"
          placeholder="Tell your story here"
          @keyup="handleInputChange"
        ></textarea>
      </div>
      <div class="preview-wrap">
        <article class="markdown-body" v-html="preview"></article>
      </div>
    </div>
    <div class="sub-wrap">
      <input type="button" class="sub" value="Submit" />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

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
      breaks: true, // 每段之间添加一个 <br />
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
  .abs-full();
  padding: 0 15px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;

  .title-wrap {
    .flex-align-center();
    margin-bottom: @defMargin;

    .title {
      flex: 1;
      border: none;
      border-bottom: 1px solid #333;
      padding-bottom: 5px;
      font-size: 20px;
      font-family: "medium";
      letter-spacing: 2px;
      box-sizing: border-box;
      outline: none;
    }
  }

  .write {
    .flex-center();
    height: 100%;
    box-sizing: border-box;

    .do-wrap {
      flex: 1;
      height: 100%;
      border-right: 1px solid #333;

      .editor {
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        padding: 15px 15px 15px 0;
        border: none;
        outline: none;
        font-family: "medium";
        letter-spacing: 2px;
        resize: none;
      }
    }
    .preview-wrap {
      flex: 1;
      height: 100%;
      overflow-y: scroll;
      font-family: "medium";

      .markdown-body {
        box-sizing: border-box;
        min-width: 200px;
        max-width: 980px;
        margin: 0 auto;
        padding: 15px;
      }
    }
  }
  .sub-wrap {
    .flex-center();
    padding: @defMargin;

    .sub {
    }
  }
}

// @media (max-width: 767px) {
//   .markdown-body {
//     padding: 15px;
//   }
// }
</style>
