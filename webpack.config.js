const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin') // 将 css 单独打包成文件
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin') // 压缩 css

module.exports = {
    entry:{
        main:"./src/index.js"
    },
    output:{
        // js 引用路径或者cdn地址
        publicPath:'./',
        // 打包文件的输出目录
        path:path.resolve(__dirname,'dist'),
        // 打包后生成的jsw文件
        filename:"bundle.js",
        chunkFilename: '[name].js' // 代码拆分后的文件名
    },
    module: {
      rules: [
        {
          test: /\.(scss|css)$/, // 针对 .scss 或者 .css 后缀的文件设置 loader
          use: [
            {
              loader: MiniCssExtractPlugin.loader
            },
            'css-loader',
             // 使用 postcss 为 css 加上浏览器前缀
            {
              loader: 'postcss-loader',
              options: {
                plugins: [require('autoprefixer')]
              }
            },
            'sass-loader' // 使用 sass-loader 将 scss 转为 css
          ]
        }
      ]
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
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
          // 打包输出HTML
          title: '自动生成 HTML',
          minify: {
            // 压缩 HTML 文件
            removeComments: true, // 移除 HTML 中的注释
            collapseWhitespace: true, // 删除空白符与换行符
            minifyCSS: true // 压缩内联 css
          },
          filename: 'index.html', // 生成后的文件名
          template: 'index.html' // 根据此模版生成 HTML 文件
        }),
        new MiniCssExtractPlugin({
          filename: '[name].css',
          chunkFilename: '[id].css'
        }),
        new OptimizeCssAssetsPlugin({
          assetNameRegExp: /\.css$/g,
          cssProcessor: require('cssnano'), //用于优化\最小化 CSS 的 CSS处理器，默认为 cssnano
          cssProcessorOptions: { safe: true, discardComments: { removeAll: true } }, //传递给 cssProcessor 的选项，默认为{}
          canPrint: true //布尔值，指示插件是否可以将消息打印到控制台，默认为 true
        })
    ]

}