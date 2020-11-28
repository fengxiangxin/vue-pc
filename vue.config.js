const path = require("path");

module.exports = {
  /* 这里的配置会和Vue的webpack配置合并 */
  configureWebpack: {
    resolve: {
      alias: {
        /* 配置路径别名，用于简写路径 */
        "@api": path.resolve(__dirname, "src/api"),
        "@assets": path.resolve(__dirname, "src/assets"),
        "@components": path.resolve(__dirname, "src/components"),
        "@store": path.resolve(__dirname, "src/store"),
        "@utils": path.resolve(__dirname, "src/utils"),
        "@views": path.resolve(__dirname, "src/views"),
      },
    },
  },

  /* 配置代理服务器，解决跨域问题 */
  devServer: {
    proxy: {
      "/api": {
        /* 转发请求到目标服务器地址 */
        target: "http://182.92.128.115",
        /* 允许跨域 */
        changeOrgin: true,
      },
    },
  },
};
