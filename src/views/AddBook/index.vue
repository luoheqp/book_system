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
      <vue-dropzone
        ref="myVueDropzone"
        id="dropzone"
        :options="dzOpt"
      ></vue-dropzone>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

// components
import vue2Dropzone from "vue2-dropzone";
import "vue2-dropzone/dist/vue2Dropzone.min.css";

@Component({
  components: {
    vueDropzone: vue2Dropzone
  }
})
export default class AddBook extends Vue {
  private dzOpt: any = {
    url: this.handleFileUpload,
    thumbnailWidth: 150,
    maxFilesize: 0.5,
    acceptedFiles: "application/pdf"
  };

  private mounted() {}

  private handleFileUpload(e: any) {
    console.log(e);
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
    .book-file {
      .flex-center();
      position: relative;
      width: 300px;
      height: 150px;
      background: #ccc;
      border-radius: @defMargin;
      border: 1px dashed #333;
      box-sizing: border-box;
      cursor: pointer;
      transition: border 0.2s linear;

      &:hover {
        border: 3px dashed #333;
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
