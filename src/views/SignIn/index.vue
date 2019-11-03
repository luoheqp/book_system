<template>
  <div class="sign-in-wrap">
    <div class="sign-in">
      <Icon class="icon"></Icon>
      <input
        class="input-item"
        type="text"
        placeholder="此处为账号"
        v-model="account"
      />
      <input
        class="input-item"
        type="password"
        placeholder="此处为密码"
        v-model="password"
      />
      <p class="note">
        <span class="register">
          没有账号?
          <router-link to="/register">注册</router-link>
        </span>
        <span class="forget">
          <router-link to="/forgetPwd">忘记密码</router-link>
        </span>
      </p>
      <input class="input-btn" type="button" value="登录" />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

// components
import Icon from "@/components/Icon.vue";

@Component({
  components: {
    Icon
  }
})
export default class SignIn extends Vue {
  public account!: string;
  public password!: string;
}
</script>

<style lang="less" scoped>
@import "../../assets/styles/index.less";

.sign-in-wrap {
  .flex-center();
  position: absolute;
  height: 100%;
  width: 100%;
  min-height: 600px;

  .sign-in {
    .flex-center();
    flex-direction: column;

    .icon {
      zoom: 2;
      margin-bottom: @defMargin;
    }

    .input-item {
      width: 100%;
      margin-bottom: @defMargin;
      appearance: none;
      border: 1px solid #333;
      padding: 5px;
      outline-color: @mainColor;
      box-sizing: border-box;
    }

    .note {
      width: 100%;
      display: flex;
      justify-content: space-between;
      margin-bottom: @defMargin;
      font-size: 12px;

      .register {
        display: flex;

        a {
          margin-left: 5px;
        }
      }

      a {
        color: @mainColor;
      }
    }

    .input-btn {
      appearance: none;
      border: none;
      background-color: @mainColor;
      padding: 5px @defMargin;
      color: #fff;
    }
  }
}
</style>
