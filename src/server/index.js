const Koa = require("koa");
const router = require("./router");

const app = new Koa();
app.use(async ctx => {
  console.log(ctx.request);
});

app.use(router.routes());

app.listen(3000, function() {
  console.log("3000 is running");
});
