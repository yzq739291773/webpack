const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin')

module.exports = {
    entry:{
        app:"./app.js"
    },
    output:{
        // js 引用路径或者cdn地址
        publicPath:__dirname + '/dist',
        // 打包文件的输出目录
        path:path.resolve(__dirname,'dist'),
        // 打包后生成的jsw文件
        filename:"bundle.js"
    },
    plugins:[
        // // 默认情况下，此插件将删除 webpack output.path目录中的所有文件，以及每次成功重建后所有未使用的 webpack 资产
        new CleanWebpackPlugin()
    ]
}