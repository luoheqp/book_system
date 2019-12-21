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
        <PicEdit @getBlob="getAvatar" />
      </div>
    </div>
    <input
      @click="handleNext"
      @keyup.enter="handleNext"
      class="continue"
      type="button"
      :value="step === 3 ? 'Submit' : 'Continue'"
    />
    <span class="have-account" v-show="step === 1"
      >Have Account? <em @click="handleToSignIn">Sign In</em></span
    >
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { regularCheck } from "@/utils/func_tool";
import { Action } from "vuex-class";

// interface
import { IUserSignUpInfo } from "@/types/user";

// components
import PicEdit from "@/components/common/PicEdit.vue";

@Component({
  components: {
    PicEdit
  }
})
export default class SignUp extends Vue {
  // sign up data
  private infoError: boolean = false;
  private step: number = 1;
  private userInfo: IUserSignUpInfo = {
    account: "614429937@qq.com",
    password: "12345",
    avatar: new Blob()
  };

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

  // 提交注册
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

  // 已有账号 , 直接登录
  private handleToSignIn() {
    this.$emit("toSignIn", "signup");
  }

  private getAvatar(avatar: Blob) {
    console.log(avatar);
    this.userInfo.avatar = avatar;
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
      width: 400px;
      height: 300px;
      margin: 25px 0 45px 0;
    }
  }

  .continue {
    margin-bottom: @defMargin;
  }

  .have-account {
    em {
      color: @mainColor;
    }
  }
}
</style>
