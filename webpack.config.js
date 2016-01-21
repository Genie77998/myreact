var fs = require('fs')
var path = require('path')
var webpack = require('webpack')
var md5 = require('md5')
var version = md5(new Date().valueOf()).substr(0, 10)
module.exports = {
    hash: version,
    devtool: 'eval',
    entry: {
        'bundle': './myProgram/App/js/app.js'
    },
    output: {
        path: __dirname + "/public",
        filename: '[name].js',
        publicPath: '/public/'
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel?presets[]=react,presets[]=es2015'
        }, {
            test: /\.scss$/,
            loader: 'style!css!sass'
        }, {
            test: /\.css$/, // Only .css files
            loader: 'style!css' // Run both loaders
        }, {
            test: /\.(png|jpg)$/,
            loader: 'url-loader?limit=8192'
        }]
    },
    resolve: {
        //查找module的话从这里开始查找
        //root: 'E:/github/flux-example/src', //绝对路径
        //自动扩展文件后缀名，意味着我们require模块可以省略不写后缀名
        //extensions: ['', '.js', '.json', '.scss', '.css'],
        //模块别名定义，方便后续直接引用别名，无须多写长长的地址
        alias: {

        }
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.optimize.UglifyJsPlugin({compress: {warnings: false}}),
        new webpack.DefinePlugin({
            '__DEV__': true,
            '__TEST__': true,
            '__PROD__': false,
            '__DEBUG__': false
        }),
        new webpack.ProvidePlugin({
            "$": path.join(__dirname, 'myProgram/App/js/lib/zepto'),
            "Zepto": path.join(__dirname, 'myProgram/App/js/lib/zepto'),
            "_": "underscore",
            "FastClick": "fastclick",
            "Daze": path.join(__dirname, 'myProgram/App/js/libs_native/daze')
        })
    ]
};
