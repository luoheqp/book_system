<template>
  <div class="edit-wrap">
    <PicEdit class="pic-edit" :defImg="userInfo.avatar" @getBlob="getAvatar" />
    <label for="pwd">
      <span>PASSWORD: </span>
      <input v-model="changeInfo.password" type="password" id="pwd" />
    </label>
    <label for="again">
      <span>CONFORM: </span>
      <input v-model="conform" type="password" id="again" />
    </label>
    <input class="submit" @click="handleSubmit" type="button" value="submit" />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

// components
import PicEdit from "@/components/common/PicEdit.vue";
import { State, Action } from "vuex-class";
import { IUserInfo, IUserChangeInfo } from "../../../types/user";

@Component({
  components: {
    PicEdit
  }
})
export default class UserInfoEdit extends Vue {
  // change info
  private changeInfo: IUserChangeInfo = {
    avatar: undefined,
    password: ""
  };
  private conform: string = "";

  @State(state => state.user.info) userInfo!: IUserInfo;
  @Action("user/changeUserInfo") changeUserInfo: any;

  private getAvatar(avatar: Blob) {
    this.changeInfo.avatar = avatar;
  }

  private handleSubmit() {
    const { password, avatar } = this.changeInfo;
    const { conform } = this;
    let info: FormData = new FormData();
    let flag = false;

    // 存在 pwd 且 confirm 正确
    if (password && password === conform) {
      info.append("password", password);
      flag = true;
    } else if (password) {
      console.log("conform error");
      return false;
    }

    if (avatar) {
      info.append("avatar", avatar);
      flag = true;
    }

    if (flag) {
      this.changeUserInfo(info).then((res: any) => {
        if (res.code === 0) {
          window.location.reload();
        }
      });
    }
  }
}
</script>

<style lang="less" scoped>
@import "../../../assets/styles/index.less";

.edit-wrap {
  .flex-center();
  flex-direction: column;
  padding: 44px 56px;

  .pic-edit {
    margin-bottom: @defMargin;
  }

  label {
    .flex-center();
    justify-content: space-between;
    width: 210px;
    margin-bottom: @defMargin;

    input {
      border: none;
      width: 120px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.34);
      font-size: 16px;
      font-weight: 300;
      outline: none;
      font-family: "medium-number";
      letter-spacing: 1.5px;
    }
  }

  .submit {
    margin-top: @defMargin;
  }
}
</style>
