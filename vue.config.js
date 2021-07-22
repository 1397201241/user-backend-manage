// vue.config.js
const path = require("path");
module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://192.168.110.85',
        changeOrigin: true,
      }
    }
  },
  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "less",
      patterns: [path.resolve(__dirname, "src/global.less")]
    }
  }

};
