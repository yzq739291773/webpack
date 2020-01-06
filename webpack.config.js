const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin')

module.exports = {
    entry:{
        main:"./src/index.js"
    },
    output:{
        // js 引用路径或者cdn地址
        publicPath:__dirname + '/dist/',
        // 打包文件的输出目录
        path:path.resolve(__dirname,'dist'),
        // 打包后生成的jsw文件
        filename:"bundle.js",
        chunkFilename: '[name].js' // 代码拆分后的文件名
    },
    optimization: {
        splitChunks: {
          chunks: 'all',
          minSize: 10000,
          maxSize: 0,
          minChunks: 1,
          maxAsyncRequests: 5,
          maxInitialRequests: 3,
          automaticNameDelimiter: '~',
          name: true,
          cacheGroups: {
            lodash: {
              name: 'lodash',
              test: /[\\/]node_modules[\\/]lodash[\\/]/,
              priority: 10  // 优先级要大于 vendors 不然会被打包进 vendors
            },
            commons: {
                name: 'commons',
                minSize: 0, //表示在压缩前的最小模块大小,默认值是 30kb
                minChunks: 2, // 最小公用次数
                priority: 5, // 优先级
                reuseExistingChunk: true // 公共模块必开启
              },
            vendors: {
              test: /[\\/]node_modules[\\/]/,
              priority: -10
            },
            default: {
              minChunks: 2,
              priority: -20,
              reuseExistingChunk: true
            }
          }
          
        }
      },   
    plugins:[
        // // 默认情况下，此插件将删除 webpack output.path目录中的所有文件，以及每次成功重建后所有未使用的 webpack 资产
        new CleanWebpackPlugin()
    ]

}