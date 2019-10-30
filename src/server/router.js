const router = require("koa-router");
const bookApi = new router();

bookApi.get("/book/getBookInfo", async (ctx, next) => {
  console.log(ctx.request);
  ctx.body = {
    code: 0,
    msg: "get book info succes"
  };
});

module.exports = bookApi;
