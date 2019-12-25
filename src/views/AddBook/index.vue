<template>
  <div class="add-book-wrap">
    <div class="title">
      <h3 class="big">Add your book</h3>
      <span class="sub">
        You can select and upload your book file in this page <br />
        it will be public if <em>it through our check</em>
      </span>
    </div>
    <div class="info-wrap">
      <!-- 添加按钮 -->
      <label
        v-if="!isLoading && !bookFile"
        class="upload"
        for="real"
        @drop="handleChangeFile"
        @dragenter="handleBlock"
        @dragover="handleBlock"
      >
        <input class="real" type="file" id="real" @change="handleChangeFile" />
        <span class="mask">add here</span>
      </label>
      <Loading v-if="isLoading" txt="processing" />
      <div class="info" v-if="!loading && bookFile">
        <div class="cover-wrap">
          <img :src="coverData" alt="" />
        </div>
        <div class="basic-wrap">
          <p>book name: {{ bookInfo.name }}</p>
          <p>author: {{ bookInfo.author }}</p>
          <p>description: {{ bookInfo.desc }}</p>
          <p>publish date: {{ bookInfo.pubdate }}</p>
          <p>press: {{ bookInfo.press }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import { dataURItoBlob } from "@/utils/func_tool";
import { IBookUploadInfo } from "@/types/book";

// epubjs
import Epub, { Book } from "epubjs";
import Navigation from "epubjs/types/navigation";

// components
import Loading from "@/components/common/Loading.vue";

@Component({
  components: {
    Loading
  }
})
export default class AddBook extends Vue {
  private bookFile: File | string = "";

  // about epub
  private book!: Book;
  private navigation!: Navigation;

  // about info
  private cover: Blob = new Blob(); // 书籍封面
  private coverData: string = "";
  private chapter: object[] = [];
  private bookInfo!: IBookUploadInfo;

  // state
  private isLoading: boolean = false;

  @Watch("bookFile")
  onBookFileChange(val: File) {
    this.getBookInfo();
  }

  private mounted() {}

  // 拖拽或点击获取文件
  private handleChangeFile(e: any) {
    this.handleBlock(e);
    this.isLoading = true;
    if (e.dataTransfer) {
      this.bookFile = e.dataTransfer.files[0];
    } else {
      this.bookFile = e.target.files[0];
    }
    this.getBookInfo();
  }

  //  阻止默认事件和冒泡
  private handleBlock(e: Event) {
    e.stopPropagation();
    e.preventDefault();
  }

  private getBookInfo() {
    // 获取 epub 相关数据
    this.initEpub();
  }

  // 初始化 epub
  private initEpub() {
    this.book = Epub();
    let reader = new FileReader();
    reader.readAsArrayBuffer(this.bookFile as File);
    reader.onload = async e => {
      if (e.target) {
        this.book.open(e.target.result as ArrayBuffer);

        await this.getNavigation();
        await this.getEpubCover();
        await this.getMetaData();
        this.isLoading = false;
      }
    };
  }

  // 获取 navigation 信息
  private getNavigation() {
    return new Promise((resolve, reject) => {
      this.book.loaded.navigation.then(navigation => {
        this.navigation = navigation;
        // 获取展示相关的章节信息
        this.chapter = navigation.toc;
        resolve();
      });
    });
  }

  // 获取 cover 信息
  private getEpubCover() {
    return new Promise((resolve, reject) => {
      this.book.loaded.cover.then(cover => {
        this.book.archive.createUrl(cover, { base64: true }).then(url => {
          this.cover = dataURItoBlob(url);

          let reader = new FileReader();
          reader.readAsDataURL(this.cover);
          reader.onload = e => {
            if (e.target) {
              this.coverData = e.target.result as string;
              resolve();
            }
          };
        });
      });
    });
  }

  // 获取 mate 信息
  private getMetaData() {
    return new Promise((resolve, reject) => {
      this.book.loaded.metadata.then(metadata => {
        let { title, creator, description, pubdate, publisher } = metadata;
        this.bookInfo = Object.assign({}, this.bookInfo, {
          name: title,
          author: creator,
          desc: description,
          pubdate: pubdate,
          press: publisher
        });
        resolve();
      });
    });
  }
}
</script>

<style lang="less" scoped>
@import "../../assets/styles/index.less";

.add-book-wrap {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  .title {
    margin-bottom: @doubleMargin;
    text-align: center;

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

  .info-wrap {
    .flex-center();
    min-width: 300px;
    min-height: 150px;

    .upload {
      .flex-center();
      position: relative;
      width: 150px;
      height: 75px;
      border-radius: 5px;
      border: 1px dashed #333;
      box-sizing: border-box;
      cursor: pointer;
      transition: transform 0.1s linear;

      &:hover {
        transform: scale(1.5);

        span {
          transform: scale(0.5);
        }
      }

      .real {
        width: 0;
        height: 0;
        opacity: 0;
      }
    }

    .info {
      .flex-center();
      width: 515px;
      align-items: flex-start;
      justify-content: space-between;

      .cover-wrap {
        height: 350px;
        flex: 0 0 250px;
        margin-right: @defMargin;
        background-image: url("../../assets/images/stripe-bg.jpg");
        background-size: 40%;
        padding: @defMargin;
        box-sizing: border-box;

        img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
      }

      .basic-wrap {
        flex: 0 0 250px;

        p {
          &:not(:last-child) {
            margin-bottom: @defMargin;
          }
        }
      }
    }
  }
}
</style>
