// 关闭eslint,反向代理。。。
module.exports = {
  lintOnSave: false,
  // 反向代理配置解决跨域问题
  devServer: {
    proxy: {
      '/ajax': {
        target: 'https://m.maoyan.com',
        changeOrigin: true
      }
    }
  }
}
