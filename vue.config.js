const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    headers: {
      "Cross-Origin-Opener-Policy": "same-origin",
      "Cross-Origin-Embedder-Policy": "require-corp"
    },
    proxy: {
      // 代理 taichibucket 路径
      '/taichibucket': {
        target: 'http://localhost:9005',
        changeOrigin: true,
        pathRewrite: {
          '^/taichibucket': '/taichibucket'
        }
      }
    }
  }
})