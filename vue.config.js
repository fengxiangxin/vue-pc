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
};
