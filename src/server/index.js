const Koa = require("koa");
const koaBody = require("koa-body");
const router = require("./router");

const app = new Koa();

// body 解析
app.use(
  koaBody({
    multipart: true,
    formidable: {
      maxFileSize: 1000 * 1024 * 1024,
      uploadDir: "upload/",
      onFileBegin: (name, file) => {
        file.name = name;
        file.path = `upload/${name}`;
      }
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
