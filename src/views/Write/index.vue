<template>
  <div class="write-wrap">
    <div class="info-wrap">
      <div class="title-wrap">
        <input
          type="text"
          v-model="title"
          class="title"
          placeholder="Title here"
        />
        <input
          type="text"
          v-model="desc"
          class="desc"
          placeholder="Maybe you want write some description"
        />
      </div>
      <div class="cover-wrap">
        <label class="cover" for="cover">
          <input
            type="file"
            accept="image/*"
            id="cover"
            @change="e => handleCoverChange(e.target.files)"
          />
          <span>cover here</span>
        </label>
      </div>
    </div>
    <div class="tag-wrap">
      <ul class="list">
        <li class="item" v-for="(item, index) in tag" :key="index">
          # {{ item }}
        </li>
        <li class="item input" v-if="isAddTagInputShow">
          <input type="text" class="add-tag-input" v-model="addTag" autofocus />
          <i class="iconfont icon-ok" @click="handleAddTag"></i>
        </li>
        <li class="item add" v-else @click="toggleAddTagInputState">
          TAG
          <i class="iconfont icon-add"></i>
        </li>
      </ul>
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
      <div class="content-wrap">
        <article class="markdown-body" v-html="content"></article>
      </div>
    </div>
    <div class="sub-wrap">
      <input type="button" class="sub" @click="handleSubmit" value="Submit" />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

// marked
import marked from "marked";
import hljs from "highlight.js"; // 高亮
import DOMPurify from "dompurify"; // DOM 化 , 防止 XSS 攻击
import { Action } from "vuex-class";
import "@/assets/styles/markdown/github-markdown.css";

@Component({})
export default class Write extends Vue {
  // article info
  private title: string = "";
  private desc: string = "";
  private content: string = "";
  private cover!: File;
  private bookId: string = "";
  private tag: string[] = [];

  // page state
  private isAddTagInputShow: boolean = false;
  private addTag: string = "";

  @Action("article/createArticle") createArticle!: Function;

  private created() {
    // 获取书籍 id
    this.bookId = this.$route.params.bookId;
  }

  private mounted() {
    // 初始化 marked
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
    this.content = marked(e.target.value);
  }

  // 添加新的 tag
  private toggleAddTagInputState() {
    this.isAddTagInputShow = !this.isAddTagInputShow;
  }

  private handleAddTag() {
    if (this.addTag) {
      this.tag.push(this.addTag);
      this.addTag = "";
    }
    this.toggleAddTagInputState();
  }

  // 添加或替换 cover
  private handleCoverChange(files: FileList) {
    if (!files[0]) {
      return false;
    }
    // let avatar: FileReader = new FileReader();
    // avatar.readAsDataURL(files[0]);
    this.cover = files[0];
    // console.log(avatar);
  }

  // 完成文章
  private handleSubmit() {
    // 整合数据
    let data = new FormData();
    data.append("title", this.title);
    data.append("desc", this.desc);
    data.append("tag", JSON.stringify(this.tag));
    data.append("content", this.content);
    data.append("bookId", this.bookId);

    if (this.cover) {
      data.append("cover", this.cover);
    }

    this.createArticle(data).then(() => {
      this.$router.push("/home");
    });
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

  .info-wrap {
    .flex-center();
    margin-bottom: @defMargin;

    .title-wrap {
      .flex-align-center();
      flex: 1;
      flex-direction: column;
      margin-right: @defMargin;

      .title,
      .desc {
        width: 100%;
        border: none;
        border-bottom: 1px solid #333;
        font-family: "medium";
        letter-spacing: 2px;
        box-sizing: border-box;
        outline: none;
      }

      .title {
        padding-bottom: 5px;
        margin-bottom: @defMargin;
        font-size: 20px;
      }

      .desc {
        padding-bottom: 5px;
        font-size: 16px;
      }
    }

    .cover-wrap {
      height: 100%;
      width: 100px;
      overflow: hidden;

      > img {
        width: 100%;

        &:hover {
          transform: scale(1.2);
          transition: transform 0.2s linear;
        }
      }

      .cover {
        .flex-center();
        border: 1px dashed #333;
        height: 100%;
        box-sizing: border-box;

        input {
          width: 0;
          height: 0;
          opacity: 0;
        }
      }
    }
  }

  .tag-wrap {
    margin-bottom: @defMargin;
    .list {
      .flex-align-center();

      .item {
        .one-line();
        max-width: 120px;
        height: 24px;
        background: @mainColor;
        padding: 3px 5px;
        color: #fff;
        border-radius: 5px;
        box-sizing: border-box;
        border: 1px solid @mainColor;
        transition: all 0.2s linear;

        &:not(:last-child) {
          margin-right: 5px;
        }

        &.input {
          .flex-center();
          background: #fff;
          color: @mainColor;

          .add-tag-input {
            border: none;
            width: 100%;
            outline: none;
            margin-right: 5px;
            color: @mainColor;
          }

          .icon-ok {
            border: 1px solid @mainColor;
            border-radius: 50%;
            padding: 2px;
            box-sizing: border-box;
            transform: scale(0.7);
            transition: all 0.2s linear;

            &:hover {
              color: #fff;
              background: @mainColor;
              cursor: pointer;
            }
          }
        }

        &.add {
          cursor: pointer;

          &:hover {
            border: 1px solid @mainColor;
            background: #fff;
            color: @mainColor;
          }

          .icon-add {
            font-size: 10px;
          }
        }
      }
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
        padding-right: @defMargin;
        border: none;
        outline: none;
        font-family: "medium";
        letter-spacing: 2px;
        resize: none;
      }
    }
    .content-wrap {
      flex: 1;
      height: 100%;
      overflow-y: scroll;
      font-family: "medium";

      .markdown-body {
        box-sizing: border-box;
        min-width: 200px;
        max-width: 980px;
        margin: 0 auto;
        padding: 0 @defMargin;
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
</style>
