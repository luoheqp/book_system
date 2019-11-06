const Koa = require("koa");
const koaBody = require("koa-body");
const router = require("./router");

const app = new Koa();

// body 解析
app.use(
  koaBody({
    multipart: true,
    formLimit: "10mb",
    formidable: {
      maxFileSize: 1000 * 1024 * 1024,
      keepExtensions: true
    }
  })
);

// 鉴权
app.use(async (ctx, next) => {
  next();
});

// 路由使用
app.use(router.routes());

// 端口监听
app.listen(3000, function() {
  console.log("3000 is running");
});
