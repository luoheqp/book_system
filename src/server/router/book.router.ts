const router = require("koa-router");
const path = require("path");

const bookApi = new router();

bookApi.get(
  "/book/getBookInfo",
  async (ctx: { body: { code: number; msg: string } }, next: any) => {
    // console.log(ctx.request);
    ctx.body = {
      code: 0,
      msg: "get book info succes"
    };
  }
);

// 上传书籍
bookApi.post(
  "/book/postBookInfo",
  async (
    ctx: { request: { files: any; body: any }; body: string },
    next: any
  ) => {
    console.log(ctx.request.files);
    // 在上传书籍的时候分析信息 , 分类保存文件且录入数据库
    ctx.body = JSON.stringify(ctx.request.body);
  }
);

module.exports = bookApi;
