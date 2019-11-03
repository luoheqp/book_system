<template>
  <div class="register-wrap">
    <div class="register">
      <div class="avatar-wrap">
        <img v-if="userInfo.avatar" src="/images/slk.jpg" alt="avatar" />
        <Icon v-if="!userInfo.avatar"></Icon>
        <input
          type="button"
          class="avatar-btn"
          value="选择头像"
          @click="togglePopState"
        />
        <span class="note">/* 点击图片选择头像 */</span>
      </div>
      <input type="text" placeholder="用户名" />
      <input type="password" placeholder="密码" />
      <input type="password" placeholder="密码 again" />
      <input type="email" placeholder="邮箱" />
      <input type="button" value="注册" />
    </div>
    <AvatarPop
      v-if="isPopShow"
      @togglePopState="togglePopState"
      @handleGetImageData="handleGetImageData"
    ></AvatarPop>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { IUserRegisterInfo } from "@/types/user";

// components
import Icon from "@/components/Icon.vue";
import AvatarPop from "@/views/Register/components/AvatarPop.vue";

@Component({
  components: {
    Icon,
    AvatarPop
  }
})
export default class Register extends Vue {
  // 需要上传的数据
  public userInfo: IUserRegisterInfo = {
    name: "",
    account: "",
    password: "",
    avatar: ""
  };
  // 弹窗显示状态
  public isPopShow: boolean = false;

  // 切换弹窗显示状态
  togglePopState() {
    this.isPopShow = !this.isPopShow;
  }

  handleGetImageData(avatarImg: string) {
    this.userInfo.avatar = avatarImg;
  }
}
</script>

<style lang="less" scoped>
@import "../../assets/styles/index.less";

.register-wrap {
  .flex-center();
  position: absolute;
  height: 100%;
  width: 100%;
  min-height: 600px;

  .register {
    background-color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: @doubleMargin;

    .avatar-wrap {
      .flex-center();
      width: 150px;
      height: 150px;
      margin-bottom: 40px;
      border: 5px solid @mainColor;
      border-radius: 50%;
      position: relative;

      .avatar-btn {
        .abs-full();
        opacity: 0;
        background-color: rgba(0, 0, 0, 0.8);
        color: #fff;
        font-size: 16px;
        font-weight: bold;
        border: none;
        cursor: pointer;
        border-radius: 50%;
        transition: opacity 0.3s linear;
        outline: none;

        &:hover {
          opacity: 1;
        }
      }

      .note {
        font-size: 12px;
        color: @lightText;
        position: absolute;
        bottom: -25px;
        left: 50%;
        transform: translateX(-50%);
        white-space: nowrap;
      }

      img {
        max-width: 100%;
        max-height: 100%;
      }
    }
  }
}
</style>
