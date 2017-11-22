const path = require('path')
const entry = require('./entry')
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    //指定webpack编译上下文，process.cwd()为当前node的启动目录
    context: path.resolve(process.cwd(), "src"),
    entry: entry,
    output: {
        //publicPath，所有的资源都会放在/dist下面
        publicPath: "/dist",
        path: path.resolve(process.cwd(), "dist"),
        filename: "[name].js",
    },
    plugins: [
        new ExtractTextPlugin("css/[name].css"),
        new HtmlWebpackPlugin({
            template: 'base/webpack.template.html',
            inject: true,
        }),
    ],
    //手动添加，默认只有".js", ".json"
    resolve: {
        extensions: [".js", ".jsx", ".json"],
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader'
            },
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
                    name: 'assets/[name]_[sha512:hash:base64:7].[ext]'
                }
            },
        ]
    },
}