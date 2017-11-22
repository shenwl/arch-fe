const path = require('path')
const baseWebpackConfig = require('./base.config.js')
const devWebpackPartialConfig = {
    //开启webpack watch模式，监听文件变化
    watch: true,
    devServer: {
        contentBase: path.join(process.cwd(), "sample"),
        compress: true,
        port: 7778
    }, 
}
module.exports = Object.assign({}, 
    baseWebpackConfig,
    devWebpackPartialConfig
)