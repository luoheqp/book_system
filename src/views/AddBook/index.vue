<template>
  <div class="add-book-wrap">
    <div class="title">
      <h3 class="big">Add your book</h3>
      <span class="sub">
        You can select and upload your book file in this page <br />
        it will be public if <em>it through our check</em>
      </span>
    </div>
    <div class="info-area">
      <label
        class="upload"
        for="real"
        @drop="handleDropFile"
        @dragenter="handleBlock"
        @dragover="handleBlock"
      >
        <input class="real" type="file" id="real" />
        <span class="mask">add book here</span>
      </label>
      <div class="info">
        <img :src="cover" alt="" />
        <p>name: <span>{{}}</span></p>
      </div>
      <ul class="chapter">
        <li v-for="item in navigation.toc" :key="item.id">
          {{ item.label }}
          <ul v-if="item.subitems.length">
            <li v-for="sub in item.subitems" :key="sub.id">
              {{ sub.label }}
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

// epubjs
import Epub, { Book } from "epubjs";
import Navigation from "epubjs/types/navigation";

// components

@Component({
  components: {}
})
export default class AddBook extends Vue {
  private bookFile!: File;
  private book!: Book;
  private cover: string = "";
  private navigation: Navigation | object = {};

  private mounted() {}

  // 拖拽获取文件
  private handleDropFile(e: DragEvent) {
    this.handleBlock(e);
    if (e.dataTransfer) {
      this.bookFile = e.dataTransfer.files[0];
    }
    this.getBookInfo();
  }

  //  阻止默认事件和冒泡
  private handleBlock(e: DragEvent) {
    e.stopPropagation();
    e.preventDefault();
  }

  private getBookInfo() {
    // 获取 epub 相关数据
    this.initEpub();
  }

  private initEpub() {
    this.book = Epub();
    let reader = new FileReader();
    reader.readAsArrayBuffer(this.bookFile);
    reader.onload = e => {
      if (e.target) {
        this.book.open(e.target.result as ArrayBuffer);

        this.book.ready.then(async () => {
          // 获取 navigation 信息
          this.navigation = this.book.navigation;
          this.book.archive
            .createUrl(this.cover, { base64: false })
            .then(url => {
              console.log(url);
              this.cover = url;
            });
        });
      }
    };
  }
}
</script>

<style lang="less" scoped>
@import "../../assets/styles/index.less";

.add-book-wrap {
  padding: 0 @defMargin;

  .title {
    margin-bottom: @doubleMargin;

    .big {
      font-size: 36px;
      font-weight: bold;
      margin-bottom: 10px;
    }

    .sub {
      font-size: 16px;
      line-height: 1.2;
    }
  }

  .info-area {
    .upload {
      .flex-center();
      position: relative;
      width: 300px;
      height: 150px;
      border-radius: @defMargin;
      border: 1px dashed #333;
      box-sizing: border-box;
      cursor: pointer;
      transition: border 0.2s linear;

      &:hover {
        border: 1.5px dashed #333;
      }

      .real {
        width: 0;
        height: 0;
        opacity: 0;
      }

      .mask {
      }
    }
  }
}
</style>
