<template>
  <div class="su-wrap">
    <h3>Sign up to join us</h3>
    <div class="step-wrap" v-show="step === 1">
      <p class="sub-title">
        Enter your email address
      </p>
      <div class="input-wrap">
        <p>Your Email</p>
        <input
          v-model="userInfo.account"
          :class="['su-input', infoError ? 'error' : '']"
          type="text"
          @blur="e => handleCheck(e.target.value, 'email')"
        />
        <span class="error-msg">please enter right email</span>
      </div>
    </div>
    <div class="step-wrap" v-show="step === 2">
      <p class="sub-title">
        Enter your password
      </p>
      <div class="input-wrap">
        <p>Your Password</p>
        <input
          v-model="userInfo.password"
          :class="['su-input', infoError ? 'error' : '']"
          type="password"
          @blur="e => handleCheck(e.target.value, 'pwd')"
        />
        <span class="error-msg">please enter right password</span>
      </div>
    </div>
    <div class="step-wrap" v-show="step === 3">
      <p class="sub-title">
        Select your avatar
      </p>
      <div class="avatar-wrap">
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
    </div>
    <input
      @click="handleNext"
      @keyup.enter="handleNext"
      class="continue"
      type="button"
      :value="step === 3 ? 'Submit' : 'Continue'"
    />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { regularCheck } from "@/utils/func_tool";
import { Action } from "vuex-class";

// interface
import { IUserSignUpInfo } from "../types/user";

// vue-cropperjs
import Cropper from "cropperjs";
import "cropperjs/dist/cropper.css";

@Component({})
export default class SignUp extends Vue {
  // sign up data
  private infoError: boolean = false;
  private step: number = 1;
  private userInfo: IUserSignUpInfo = {
    account: "61442@qq.com",
    password: "12345",
    avatar: new Blob()
  };

  // cropper
  private cropper!: Cropper;
  private canCropperSubmit: boolean = false;
  private isCropperShow: boolean = false;
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

  @Action("user/signup") signup: any;

  // input func
  private handleCheck(value: string, reg: string) {
    if (!regularCheck(value, reg)) {
      this.infoError = true;
      return false;
    }
    this.infoError = false;
    return true;
  }

  // 下一步或执行提交
  private handleNext() {
    let flag: boolean = true;
    let { step } = this;
    switch (step) {
      case 1:
        // flag = this.handleCheck(this.userInfo.account, "email");
        break;
      case 2:
        // flag = this.handleCheck(this.userInfo.password, "pwd");
        break;
    }

    if (step === 3) {
      this.handleSubmit();
      return true;
    }

    if (flag) {
      this.step = step + 1;
      return true;
    }
  }

  private async handleSubmit() {
    let userData = new FormData();
    let { account, password, avatar } = this.userInfo;
    userData.append("account", account);
    userData.append("password", password);
    userData.append("avatar", avatar);
    this.signup(userData).then((res: any) => {
      if (res.code === 0) {
        this.$router.go(0);
      }
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
        this.userInfo.avatar = blob;
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
@import "../../../assets/styles/index.less";

.su-wrap {
  .flex-center();
  flex-direction: column;
  width: 600px;
  height: 550px;
  padding: 44px 56px;
  box-sizing: border-box;
  text-align: center;

  h3 {
    line-height: 36px;
    font-size: 32px;
    font-weight: 500px;
    color: rgba(0, 0, 0, 0.84);
    margin-bottom: 8px;
  }

  .step-wrap {
    .flex-center();
    flex-direction: column;

    .sub-title {
      font-size: 16px;
      line-height: 20px;
      color: rgba(0, 0, 0, 0.54);
    }

    .input-wrap {
      margin: 25px 0 45px 0;
      width: 270px;
      position: relative;

      & > p {
        font-size: 15px;
        line-height: 20px;
        color: rgba(0, 0, 0, 0.84);
        margin: 12px;
      }

      .su-input {
        border: none;
        width: 100%;
        border-bottom: 1px solid rgba(0, 0, 0, 0.34);
        font-size: 16px;
        line-height: 24px;
        font-weight: 300;
        outline: none;
        text-align: center;
        font-family: "medium-number";
        letter-spacing: 1.5px;

        &.error {
          border-bottom-color: red;

          & + .error-msg {
            display: inline-block;
            white-space: nowrap;
            position: absolute;
            bottom: -20px;
            font-size: 14px;
            color: red;
            left: 50%;
            transform: translateX(-50%);
          }
        }
      }

      .error-msg {
        display: none;
      }
    }

    .avatar-wrap {
      .flex-center();
      width: 400px;
      height: 300px;
      margin: 25px 0 45px 0;
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
  }

  .continue {
    font-size: 14px;
    color: #fff;
    border-radius: 4px;
    padding: 8px 16px;
    background: rgba(0, 0, 0, 0.9);
  }
}
</style>
