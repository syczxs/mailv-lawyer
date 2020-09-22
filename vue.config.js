const webpack=require('webpack')
// const Timestamp = new Date().getTime();
module.exports = {
  publicPath:  './',
  outputDir: 'dist',
  assetsDir: 'static',
  indexPath: 'index.html',
  filenameHashing: true,



  // // 版本号
  // configureWebpack: { // webpack 配置
  //   output: { // 输出重构  打包编译后的 文件名称  【模块名称.版本号.时间戳】
  //     filename: `[name].${process.env.VUE_APP_Version}.${Timestamp}.js`,
  //     chunkFilename: `[name].${process.env.VUE_APP_Version}.${Timestamp}.js`
  //   },
  // },


  devServer: {
    
    port:"8080",
    host:"127.0.0.1",
    open: true,
    proxy: {
      '/api': {
        target: 'http://www.mailvjt.com:8090/',
        ws: true,
        changeOrigin: true,
        pathRewrite:{
          '^/api':''
        }
      }
    }
  },

  configureWebpack: {

    plugins: [

       new webpack.ProvidePlugin({

         $:"jquery",

         jQuery:"jquery",

         "windows.jQuery":"jquery"

       })

     ]
    },



}
