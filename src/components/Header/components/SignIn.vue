<template>
  <div class="su-wrap">
    <h3>Sign in to enjoy</h3>
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
    <input
      @click="handleNext"
      @keyup.enter="handleNext"
      class="continue"
      type="button"
      :value="step === 2 ? 'Submit' : 'Continue'"
    />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { regularCheck } from "@/utils/func_tool";
import { Action } from "vuex-class";

// interface
import { IUserSignInInfo } from "@/types/user";

@Component({})
export default class SignIn extends Vue {
  // sign up data
  private infoError: boolean = false;
  private step: number = 1;
  private userInfo: IUserSignInInfo = {
    account: "61442@qq.com",
    password: "12345"
  };

  @Action("user/signin") signin: any;

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

    if (step === 2) {
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
    let { account, password } = this.userInfo;
    userData.append("account", account);
    userData.append("password", password);
    this.signin(userData).then((res: any) => {
      if (res.code === 0) {
        this.$router.go(0);
      }
    });
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
