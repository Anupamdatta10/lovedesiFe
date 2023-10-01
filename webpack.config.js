const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackZipBuild = require('webpack-zip-build');
const RemovePlugin = require('remove-files-webpack-plugin');
const path = require('path');
const SRC = path.resolve(__dirname, 'node_modules');
const CopyPlugin = require("copy-webpack-plugin");
module.exports = env => {
    return {
        entry: ["babel-polyfill", "./src/index.js"],
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env', '@babel/react'],
                            plugins: ['@babel/proposal-class-properties', '@babel/plugin-proposal-object-rest-spread', '@babel/plugin-syntax-dynamic-import']
                        }
                    }
                },
                { test: /\.css$/, use: ['style-loader', 'css-loader'] },
                //{ test: /\.json$/, use: ['json-loader'] },
                {
                    test: /\.(png|svg|jpg|gif|ico)$/,
                    use: [{
                        loader: 'url-loader',
                        options: {
                            limit: 8000, // Convert images < 8kb to base64 strings
                            name: 'images/[hash]-[name].[ext]'
                        }
                    }]
                },
                { test: /\.(woff|woff2|eot|ttf)$/, loader: 'url-loader?limit=100000' },
                {
                    test: /\.mp3$/,
                    include: SRC,
                    loader: 'file-loader'
                },
                {
                    test: /\.scss$/,
                    use: [
                        "style-loader", // creates style nodes from JS strings
                        "css-loader", // translates CSS into CommonJS
                        "sass-loader" // compiles Sass to CSS, using Node Sass by default
                    ]
                },
                {
                    test: /\.mjs$/,
                    include: /node_modules/,
                    type: "javascript/auto"
                }
            ]
        },
        optimization: {
            sideEffects: false,
        },
        resolve: {
            extensions: ['*', '.mjs', '.js', '.jsx', '.mp3']
        },
        output: {
            path: __dirname + '/build_' + env.buildtype,
            publicPath: './',
            filename: 'bundle.js'
        },
        plugins: [
            new webpack.DefinePlugin({
                'process.env.API_CONFIG': JSON.stringify(env.buildtype)
            }),
            new webpack.HotModuleReplacementPlugin(),
            new Dotenv(),
            new HtmlWebpackPlugin({
                template: './public/index.html',
                favicon: './public/favicon.ico'
            }),
            new WebpackZipBuild({
                entries: ['./build_' + env.buildtype + '/*', './build_' + env.buildtype + '/images/*'],
                output: './build_' + env.buildtype,
                format: 'zip',
            }),
            new RemovePlugin({
                before: {
                    // parameters.
                    include: ['./build_' + env.buildtype + '.zip', './build_' + env.buildtype]
                },
                after: {
                    // parameters.
                    //include: ['./build_'+env.buildtype]
                }
            }),
            // new CopyPlugin({
            //     patterns: [
            //         { from: "./public/locales", to: `./locales` }
            //     ]
            // })
        ],
        mode: 'development',
        devServer: {
            host: 'localhost',
            port: '3007',
            publicPath: "/",
            contentBase: './public',
            inline: false,
            liveReload: false,
            historyApiFallback: true
        }
    }
};
