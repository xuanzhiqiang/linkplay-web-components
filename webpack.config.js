const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const webpack = require('webpack');

module.exports = {
    entry: [
        'react-hot-loader/patch',
        './src/index.js'
    ],
    output: {
        publicPath: '/',
        filename: 'demo.js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({ template: './src/index.html' }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: "babel-loader",
                exclude: /node_modules/,
                query: {
                    presets: ["@babel/preset-env", "@babel/preset-react"],
                    plugins: [
                        ["@babel/plugin-proposal-class-properties", { loose: true }],
                    ],
                }
            },
            { test: /\.css$/, use: ['style-loader', 'css-loader'] },
            { test: /\.(png|svg|jpg|gif)$/, use: ['file-loader'] }
        ]
    },
    devtool: 'inline-source-map',
    target: 'web',
    devServer: {
        contentBase: path.join(__dirname, 'src'),
        compress: true,
        hot: true
    },
};