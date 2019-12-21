<template>
  <div class="pic-edit-wrap">
    <!-- 裁剪容器 -->
    <div :class="['cropper-wrap', isCropperShow ? 'active' : '']">
      <div class="ok" @click="handleGetAvatarData">
        <i class="iconfont icon-ok"></i>
      </div>
      <img src="" ref="cropper" />
      <div class="cancel" @click="() => toggleCropperState(false)">
        <i class="iconfont icon-Cancelcontrol"></i>
      </div>
    </div>
    <!-- 选图按键 -->
    <div :class="['select-pic', isCropperShow ? 'active' : '']">
      <label for="avatarFile" class="select">
        <i class="iconfont icon-pic"></i>
      </label>
      <input
        type="file"
        id="avatarFile"
        accept="image/*"
        @change="handleAvatarChange"
      />
    </div>
    <!-- 效果容器 -->
    <div class="avatar" :class="[isCropperShow ? 'active' : '']">
      <img :src="avatar" alt="avatar" />
    </div>
    <!-- 裁剪按键 -->
    <div
      :class="['other', isCropperShow ? 'active' : '']"
      @click="() => toggleCropperState('true')"
    >
      <i class="iconfont icon-jianqie"></i>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";

// vue-cropperjs
import Cropper from "cropperjs";
import "cropperjs/dist/cropper.css";

@Component({})
export default class PicEdit extends Vue {
  // cropper
  public cropper!: Cropper;
  public canCropperSubmit: boolean = false;
  public isCropperShow: boolean = false;
  private avatar: string =
    "http://www.resource.com:8000/user/avatar/default.png";

  private mounted() {
    this.cropper = new Cropper(this.$refs.cropper as HTMLCanvasElement, {
      aspectRatio: 1 / 1, // 裁剪框比例
      viewMode: 1, // 视图模式
      dragMode: "move", // 拖动模式
      // preview: "#preview", // 预览元素
      movable: true, // 是否可以移动后面的图片
      rotatable: false, // 是否允许旋转图像
      scalable: false, // 是否允许缩放图像
      zoomable: true, // 是否允许放大图像
      cropBoxMovable: false, // 是否允许裁剪部分移动
      cropBoxResizable: false, // 是否允许裁剪部分缩放
      minCropBoxWidth: 200,
      minCropBoxHeight: 200
    });
  }

  // 上传图片后触发
  private handleAvatarChange(e: any) {
    const file = e.target.files[0];

    // 上传图片并加载到 Cropper 中
    let avatar: FileReader = new FileReader();
    avatar.readAsDataURL(file);

    avatar.onerror = () => {
      alert("上传图像失败 , 请重试");
      return false;
    };

    avatar.onload = () => {
      if (avatar.result !== null) {
        this.cropper.replace(avatar.result.toString());
        this.canCropperSubmit = true;
      }
    };
    this.toggleCropperState();
  }

  private toggleCropperState(flag?: boolean) {
    if (flag) {
      this.isCropperShow = flag;
      return true;
    }
    this.isCropperShow = !this.isCropperShow;
    return true;
  }

  // 获取截图的数据
  private async handleGetAvatarData() {
    const cav = this.cropper.getCroppedCanvas({
      imageSmoothingQuality: "medium"
    });
    cav.toBlob((blob: Blob | null): void => {
      if (blob !== null) {
        // 保存 blob 对象
        this.$emit("getBlob", blob);
        // 将 blob 对象转换成图片可显示的状态
        let avatar = new FileReader();
        this.avatar = window.URL.createObjectURL(blob);
        // 切换 cropper 弹窗状态
        this.toggleCropperState();
      }
    }, "image/jpg");
  }
}
</script>

<style lang="less" scoped>
@import "../../assets/styles/index.less";

.pic-edit-wrap {
  .flex-center();
  flex-direction: column;
  position: relative;

  .avatar,
  .select-pic,
  .other {
    position: absolute;
    transition: all 0.3s ease-in;

    &.active {
      transform: scale(0);
    }
  }

  .avatar {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    overflow: hidden;
    margin-bottom: @doubleMargin;
    object-fit: fill;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .select-pic {
    left: -20px;

    .select {
      .flex-center();
      cursor: pointer;
      background: #ccc;
      border-radius: 50%;
      width: 50px;
      height: 50px;
      color: #fff;
      transition: all 0.3s linear;

      &:hover {
        background: #333;
      }

      .icon-pic {
        font-size: 26px;
      }
    }

    input {
      display: none;
    }
  }

  .other {
    .flex-center();
    right: -20px;
    cursor: pointer;
    background: #ccc;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    color: #fff;
    transition: all 0.3s linear;

    &:hover {
      background: #333;
    }

    .icon-jianqie {
      font-size: 26px;
    }
  }

  .cropper-wrap {
    position: relative;
    width: 400px;
    height: 300px;
    opacity: 0;
    // display: none;
    transition: all 0.3s linear;

    .ok,
    .cancel {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      cursor: pointer;
    }

    .ok {
      left: -50px;

      .icon-ok {
        font-size: 20px;
      }
    }

    .cancel {
      right: -50px;
    }

    &.active {
      opacity: 1;
      display: inline-block;
    }
  }
}
</style>
