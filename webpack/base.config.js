const path = require('path')
const entry = require('./entry')
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    //指定webpack编译上下文，process.cwd()为当前node的启动目录
    context: path.resolve(process.cwd(), "src/app"),
    entry: entry,
    //开启webpack watch模式，监听文件变化
    watch: true,
    output: {
        path: path.resolve(process.cwd(), "dist"),
        filename: "[name].js",
    },
    plugins: [
        new ExtractTextPlugin("css/[name].css"),
        new HtmlWebpackPlugin({
            title: 'sale',
            template: path.resolve(
                process.cwd(), 
                'src/base/webpack.template.html'
            ),
            filename: 'sale.html',
            chunks: ['sale'],
        }),
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader'
            },
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'less-loader']
                })
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader']
                })  
            },
            {
                test: /\.(png|jpg|gif|woff|woff2|ttf|eot|svg|swf)$/,
                //img原文件名后面添加
                loader: "file-loader?name=[name]_[sha512:hash:base64:7].[ext]",
                options: {
                    name: 'img/[name]_[sha512:hash:base64:7].[ext]'
                }
            },
        ]
    },
}