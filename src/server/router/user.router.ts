const file = require("../utils/file");

const userApi = new router();

// 注册新用户
userApi.post(
  "/user/newUser",
  async (
    ctx: { request: { files: { avatar: any }; body: any } },
    next: any
  ) => {
    let avatarFile = ctx.request.files.avatar;
    let info = ctx.request.body;

    file
      .getFileTo(avatarFile, path.join(global.__dirname, path))
      .then((res: any) => {
        console.log(res);
      })
      .catch((err: string | undefined) => {
        throw new Error(err);
      });
  }
);

// 用户登录

// 修改用户信息
userApi.post(
  "/user/userInfo",
  async (ctx: { request: { body: any } }, next: any) => {
    let info = ctx.request.body;
    console.log(info);
  }
);

module.exports = userApi;
