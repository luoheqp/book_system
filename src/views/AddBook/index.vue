<template>
  <div class="add-book-wrap">
    <div class="main-wrap">
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
          <input
            class="real"
            type="file"
            id="real"
            @change="handleChangeFile"
          />
          <span class="mask">add here</span>
        </label>
        <Loading v-if="isLoading" txt="processing" />
        <div class="info" v-if="!isLoading && bookFile">
          <div class="wrap">
            <div class="cover-wrap">
              <img :src="coverData" alt="" />
            </div>
            <div class="basic-wrap">
              <p>
                <em>book name</em><span>{{ bookInfo.name }}</span>
              </p>
              <p>
                <em>author</em><span>{{ bookInfo.author }}</span>
              </p>
              <p>
                <em>description</em><span>{{ bookInfo.desc }}</span>
              </p>
              <p>
                <em>publish date</em><span>{{ bookInfo.pubdate }}</span>
              </p>
              <p>
                <em>press</em><span>{{ bookInfo.press }}</span>
              </p>
              <input
                type="button"
                value="check chapter"
                @click="toggleChapterPopState"
              />
            </div>
          </div>
          <input class="upload" type="button" value="Upload Now!" />
        </div>
      </div>
    </div>
    <Popup
      class="chapter-pop"
      v-if="isChapterPopShow"
      @toggleShowState="toggleChapterPopState"
    >
      <div class="chapter-wrap">
        <ul class="chapter-list">
          <li class="chapter-item" v-for="item in chapter" :key="item.id">
            {{ item.label }}
            <ul class="sub-list" v-if="item.subitems.length">
              <li class="sub-item" v-for="sub in item.subitems" :key="sub.id">
                {{ sub.label }}
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </Popup>
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
import Popup from "@/components/common/Popup.vue";
import { Action } from "vuex-class";

@Component({
  components: {
    Loading,
    Popup
  }
})
export default class AddBook extends Vue {
  // about epub
  private book!: Book;
  private navigation: Navigation | object = {};

  // about info
  private bookFile: File | string = ""; // 书籍本体
  private cover: Blob = new Blob(); // 书籍封面
  private coverData: string = "";
  private chapter: object[] = [];
  private bookInfo!: IBookUploadInfo;

  // state
  private isLoading: boolean = false;
  private isChapterPopShow: boolean = false;

  @Watch("bookFile")
  onBookFileChange(val: File) {
    this.getBookInfo();
  }

  @Action("book/createBook") createBook: any;

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

  private toggleChapterPopState() {
    this.isChapterPopShow = !this.isChapterPopShow;
  }

  private handleCreateBook() {
    this.createBook().then(res => {});
  }
}
</script>

<style lang="less" scoped>
@import "../../assets/styles/index.less";

.add-book-wrap {
  .main-wrap {
    .abs-center();
    top: 40%;

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
      margin-bottom: @defMargin;

      > .upload {
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
        .flex-justify-center();
        flex-direction: column;
        align-items: center;

        .wrap {
          .flex-justify-center();
          margin-bottom: @doubleMargin;

          .cover-wrap {
            height: 350px;
            width: 250px;
            margin-right: @doubleMargin;
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
            width: 250px;

            p {
              em {
                display: inline-block;
                font-size: 16px;
                margin-bottom: 8px;
                font-family: SFNSRounded;
                letter-spacing: 1px;
                border-bottom: 1px solid #333;
                padding: 0 10px 3px 0;

                &::first-letter {
                  text-transform: uppercase;
                  font-weight: bold;
                }
              }

              span {
                .one-line();
                line-height: 1.1;
              }

              &:not(:last-child) {
                margin-bottom: 10px;
              }
            }
          }
        }

        .upload {
          width: 200px;
          height: 60px;
        }
      }
    }
  }

  .chapter-pop {
    .chapter-wrap {
      padding: @doubleMargin;

      .chapter-list {
        .flex-justify-center();
        flex-direction: column;

        .chapter-item {
          font-weight: bold;

          &:not(:last-child) {
            margin-bottom: @defMargin;
          }

          .sub-list {
            .flex-align-center();
            flex-wrap: wrap;
            font-weight: normal;
            margin-top: @defMargin;
            margin-right: -15px;

            .sub-item {
              width: 300px;
              margin: 0 @defMargin @defMargin 0;
            }
          }
        }
      }
    }
  }
}
</style>
