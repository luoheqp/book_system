const Koa = require("koa");
const koaBody = require("koa-body");
const bookRouter = require("./router/book.router");
const userRouter = require("./router/user.router");

const app = new Koa();

// body 解析
app.use(
  koaBody({
    multipart: true,
    formidable: {
      maxFileSize: 1000 * 1024 * 1024,
      keepExtensions: true
    }
  })
);

// 鉴权
app.use(async (ctx: any, next: () => void) => {
  next();
});

// 路由使用
// TODO: 路由分离规划
app.use(bookRouter.routes());
app.use(userRouter.routes());

// 端口监听
app.listen(3000, function() {
  console.log("3000 is running");
});
