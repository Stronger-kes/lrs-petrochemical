module.exports = {
  // configureWebpack 表示配置我们的webpack.config 文件
  devServer: {
    proxy: {
      '/API': {    // 定义代理的名称
        changeOrigin: true,  // 是否启动代理
        target: 'http://test.vue.longshihua.cn/shop/', // 代理的域名
        // target: 'http://192.168.1.20:8085', // 代理的域名  安
        // target: 'http://192.168.1.35:8085', // 代理的域名
        pathRewrite: { '^/API': '/' }  // 如果你的真实的api路径中没有/API这一个路径，把这句加上，如果本来就有/API这一路径的话，这句一定要去掉，要不然会导致域名找不到的
      }
    }
  },
  configureWebpack: {
    //解决路径的一些问题
    resolve: {
      // 设置后路径的后缀 可以不写
      extensions: [],
      // 配置别名
      alias: {
        // 默认已经配置好的路径别名 '@':'src'
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views',
      }
    }
  }
}
