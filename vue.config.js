module.exports = {
  lintOnSave: false,
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:3000", // 测试环境
        changeOrigin: true,
        pathRewrite: {
          "/api": ""
        }
      }
    }
  }
};
