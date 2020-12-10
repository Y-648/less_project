const path = require('path');//导入path模块
const htmlWebpackPlugin = require('html-webpack-plugin');//打包html的插件
const miniCssExtractPlugin = require('mini-css-extract-plugin');//分离css的插件
const {CleanWebpackPlugin}= require('clean-webpack-plugin');//打包清理插件
module.exports = {
    mode: 'production',//模式，默认为production生产模式，还有development开发模式
    entry: {
        index: "./src/index.js"
    },//多入口
    output: {
        path: path.resolve(__dirname, '../dist/'),//打包文件的绝对路径
        // filename:'bundle.js'//单入口打包文件的名字
        // filename: '[name].[hash].js'//多入口打包文件的名字
        filename: '[name].js'//多入口打包文件的名字
    },
    module: {
        rules: [//解析规则
            {
                test: /\.css$/,//解析匹配规则，正则规则
                use: [//解析需要用到的loader
                    // { loader: 'style-loader' },//将css写入style标签
                    { loader: miniCssExtractPlugin.loader },//使用css分离插件解析，就不需要将css写入style了
                    { loader: 'css-loader' }//引入css
                ]
            },
            {
                test: /\.less$/,//解析匹配规则，正则规则
                use: [//解析需要用到的loader
                    // { loader: 'style-loader' },//将css写入style标签
                    { loader: miniCssExtractPlugin.loader },//使用css分离插件解析，就不需要将css写入style了
                    { loader: 'css-loader' },//引入css
                    { loader: 'less-loader' }
                ]
            },
            {
                test: /\.scss$/,//解析匹配规则，正则规则
                use: [//解析需要用到的loader
                    // { loader: 'style-loader' },//将css写入style标签
                    { loader: miniCssExtractPlugin.loader },//使用css分离插件解析，就不需要将css写入style了
                    { loader: 'css-loader' },//引入css
                    { loader: 'sass-loader' }
                ]
            },

            // {
            //     test: /\.(jpg|png|webp|gif|jpeg)$/,//解析匹配规则，正则规则
            //     use: [//解析需要用到的loader
            //         { loader: 'file-loader'}
            //     ]
            // }
            {
                test: /\.(jpg|png|webp|gif|jpeg)$/,//解析匹配规则，正则规则
                use: [//解析需要用到的loader
                    {
                        loader: 'url-loader',
                        options: {//配置参数
                            limit: 102400 //单位byte,小于100k转成base64格式,否则就还是图片格式
                        }
                    }
                ]
            },
            {
                test: /\.js$/,//解析匹配规则，正则规则
                exclude: /(node_modules|bower_components)/,//排除node_modules和bower_components
                use: [//解析需要用到的loader
                    {
                        loader: 'babel-loader',
                        options: {//配置参数
                            presets: ['env']//es6转es5
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new htmlWebpackPlugin({
            title: '网页标题',//网页标题
            template: './src/html/index.html',//处理html模块路径
            inject: 'body',//script标签位于网页的位置,默认值true,还有head，body，false
            minify: {//html压缩规则
                removeComments: true,//是否移除注释
                removeEmptyAttributes: true,//是否移除属性的引号
                collapseWhitespace: true//是否移除空白
            },
            chunks:['index'],
            filename: 'index.html'//输出模块名称
        }),
        new miniCssExtractPlugin({
            filename: '[name].[hash].css'//输出模块的名称
        }),
        new CleanWebpackPlugin()
    ],
    devServer: {
        contentBase: path.join(__dirname, "../dist"),
        compress: true,
        port: 8000,
        open: true
    }
}