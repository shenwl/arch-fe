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
        publicPath: "dist/",
        path: path.resolve(process.cwd(), "dist"),
        filename: "[name].js",
    },
    plugins: [
        new ExtractTextPlugin("css/[name].css"),
        new HtmlWebpackPlugin({
            title: 'sale',
            template: 'base/webpack.template.html',
            //chunk可认为entry中的key, chunk（资源块）-> asset（我们所要的资源）
            chunks: ['sale'],
            filename: 'sale.html',
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
                    name: 'assets/[name]_[sha512:hash:base64:7].[ext]'
                }
            },
        ]
    },
}