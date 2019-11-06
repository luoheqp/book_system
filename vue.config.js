module.exports = {
  lintOnSave: false,
  devServer: {
    proxy: {
      "/book/*": {
        target: "http://localhost:3000", // 测试环境
        changeOrigin: true
      }
    }
  }
};
