<template>
  <Popup @toggleShowState="togglePopState" :title="title">
    <div class="avatar-wrap">
      <div class="preview-wrap">
        <div id="preview"></div>
        <input
          type="file"
          @change="handleImageChange"
          class="select-btn"
          value="选择图片"
        />
        <input
          type="button"
          :disabled="!canCropperSubmit"
          @click="handleGetImageData"
          accept="image/*"
          class="submit-btn"
          value="点击上传"
        />
      </div>
      <div class="cropper-wrap">
        <img src="@/assets/images/slk.jpg" ref="cropper" />
      </div>
      <!-- <img src="" alt=""> -->
    </div>
  </Popup>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

// vue-cropperjs
import Cropper from "cropperjs";
import "cropperjs/dist/cropper.css";

// components
import Popup from "@/components/Popup.vue";

@Component({
  components: {
    Popup
  }
})
export default class AvatarPop extends Vue {
  // 头像相关
  // TODO: 需要一个默认的头像
  public imgSrc: string = "/images/slk.jpg";
  public title: string = "avatar selector";
  public cropper!: any;
  public canCropperSubmit: boolean = false;

  handleImageChange(e: any) {
    const file = e.target.files[0];
    // 如果上传的不是 image 类型的文件 , 清除 file 并提示
    if (!/image/.test(file.type)) {
      alert("only can use image as a avatar");
      e.target.value = "";
      return false;
    }

    // 上传图片并加载到 Cropper 中
    let avatar: FileReader = new FileReader();
    avatar.readAsDataURL(file);

    avatar.onerror = () => {
      alert("上传图像失败 , 请重试");
      return false;
    };

    avatar.onload = () => {
      this.cropper.replace(avatar.result);
      this.canCropperSubmit = true;
    };
  }

  handleGetImageData() {
    const cav = this.cropper.getCroppedCanvas({
      imageSmoothingQuality: "medium"
    });
    let avatarImg = cav.toDataURL("image/jpeg");
    console.log(avatarImg);
    this.$emit("handleGetImageData", avatarImg);
    this.togglePopState();
  }

  togglePopState() {
    this.$emit("togglePopState");
  }

  private mounted() {
    this.cropper = new Cropper(this.$refs.cropper as HTMLCanvasElement, {
      aspectRatio: 1 / 1, // 裁剪框比例
      viewMode: 1, // 视图模式
      dragMode: "move", // 拖动模式
      preview: "#preview", // 预览元素
      movable: false, // 是否可以移动后面的图片
      rotatable: false, // 是否允许旋转图像
      scalable: false, // 是否允许缩放图像
      zoomable: false // 是否允许放大图像
    });
  }
}
</script>

<style lang="less" scoped>
@import "../../../assets/styles/index.less";

.avatar-wrap {
  display: flex;

  .preview-wrap {
    flex: 1;
    margin-right: calc(@doubleMargin * 2);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    #preview {
      width: 200px;
      height: 200px;
      border-radius: 50%;
      overflow: hidden;
      margin-bottom: @doubleMargin;
    }

    .select-btn {
      margin-bottom: @doubleMargin;
    }

    .submit-btn {
    }
  }

  .cropper-wrap {
    width: 400px;
    height: 400px;

    img {
      max-width: 100%;
      max-height: 100%;
    }
  }
}
</style>
