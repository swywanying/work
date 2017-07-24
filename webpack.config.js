var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpack = require("webpack");
var CopyWebpackPlugin = require("copy-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: {
        index:'./main.js',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/dist/',
        filename: '[name]-[hash].js'
    },
    module: {
        loaders: [
            {test:/\.scss$/,loader:ExtractTextPlugin.extract({fallback:'style-loader',use:'css-loader!sass-loader'})},
            {test:/\.css$/,loader:ExtractTextPlugin.extract({fallback:'style-loader',use:'css-loader'})},
            {test:/\.vue$/,loader:'vue-loader'},
            // {
            //     test: /\.((woff2?|svg|eot|ttf)(\?v=[0-9]\.[0-9]\.[0-9]))|(woff2?|svg|jpe?g|png|gif|ico)$/,
            //     loaders: [
            //         // 小于10KB的图片会自动转成dataUrl
            //         'url?limit=10240&name=img/[hash:8].[name].[ext]',
            //         'image?{bypassOnDebug:true, progressive:true,optimizationLevel:3,pngquant:{quality:"100",speed:4}}'
            //     ]
            // },
            {
                test:/\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
                loader:'file-loader'
            }
        ],
        exprContextCritical: false,
    },
    plugins:[
        new HtmlWebpackPlugin({
            filename:'index.html',
            template:'index.html',
            inject: true,
            chunks:['index']
        }),
        new ExtractTextPlugin("[name]-[hash].css"),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        }),
        new CopyWebpackPlugin([
            {
                from: __dirname + '/common/js/lib',
                to: 'lib'
            },
            {
                from: __dirname + '/common/js/g_config.js',
                to: 'g_config.js'
            },
            {
                from: __dirname + '/common/img',
                to: 'img'
            },
            // {
            //     from: __dirname + '/app/static',
            //     to: 'static'
            // },
            {
                from: __dirname + '/node_modules/iview/dist/',
                to: 'lib/iview'
            }
        ])
    ],
    // require 文件时可省略后缀 .js 和 .ts
    resolve: {
        extensions: ['.js','sass','scss'],
        alias: {
            'vue$': 'vue/dist/vue.common.js',
            'vue-router$': 'vue-router/dist/vue-router.common.js',
            'services$':'common/js/services.js'
        }
    },
    // 配置 webpack-dev-server
    devServer:{
        historyApiFallback: true,
        hot: true,
        inline: true,
        port: 8088 // 修改端口，一般默认是8080
    }
};