const path = require('path')
const webpack = require('webpack')
const htmlWebpackPlugin = require('html-webpack-plugin')
const htmlWebpackTemplate = require('html-webpack-template')

module.exports = {
    mode: 'development',
    entry: {
        app: path.resolve(__dirname, 'src/index.js')
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    resolve: { extensions: ['.js', '.jsx', '.*'] },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            }
        ]
    },
    plugins: [
        new htmlWebpackPlugin({
            inject: false,
            template: htmlWebpackTemplate,
            title: 'React Tetris',
            meta: [
                {
                    name: 'viewport',
                    content: 'width=device-width, initial-scale=1, shrink-to-fit=no'
                },
                {
                    charset: 'utf-8'
                },
                {
                    name: 'description',
                    content: 'A tetris game written in pure React.'
                }
            ],
            bodyHtmlSnippet: '<div id="root"></div>',
            devServer: 'http://localhost:3001'
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        hot: true,
        contentBase: './dist',
        port: 3001
    },
    devtool: 'eval-source-map'
}