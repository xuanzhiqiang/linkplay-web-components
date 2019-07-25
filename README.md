# React + webpack

## 安装这些东西

    npm install --save-dev webpack
    npm install --save-dev webpack-cli
    npm install --save-dev webpack-dev-server


    npm install --save-dev file-loader
    npm install --save-dev style-loader css-loader
    npm i @babel/core babel-loader @babel/preset-env @babel/preset-react --save-dev


    npm install clean-webpack-plugin --save-dev
    npm install --save-dev html-webpack-plugin

    npm i prop-types --save-dev

    npm install --save-dev react-hot-loader



## 配置： 

### .babelrc

    {
        "presets": [
            "@babel/preset-env",
            "@babel/preset-react"
        ]
    }


### webpack.config.js

    const path = require('path');
    const HtmlWebpackPlugin = require('html-webpack-plugin');
    const { CleanWebpackPlugin } = require('clean-webpack-plugin');

    const webpack = require('webpack');

    module.exports = {
        entry: {
            app: './src/index.js'
        },
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
                { test: /\.js$/, exclude: /node_modules/, use: { loader: "babel-loader" } },
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