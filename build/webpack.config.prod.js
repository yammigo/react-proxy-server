const { merge } = require("webpack-merge")
const webpack = require("webpack")
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
console.log(process.env.NODE_ENV, "当前环境")
const path = require("path")
const baseconfig = require("./webpack.config.base")
const htmlWebpackPlugin = require("html-webpack-plugin")
module.exports = merge(baseconfig, {
    mode: "production",
    module: {
        rules: [{
                test: /\.css$/,
                use: [{
                    loader: MiniCssExtractPlugin.loader
                }, {
                    loader: "css-loader",
                    options: {
                        esModule: false,
                    }
                }, { loader: "postcss-loader" }, ],
            },

            {
                test: /\.(scss|sass)$/,
                use: [{
                        loader: MiniCssExtractPlugin.loader
                    }, {
                        loader: "css-loader",
                        options: {
                            esModule: false,
                        }
                    }, { loader: "postcss-loader" },
                    {
                        loader: "sass-loader",
                    }
                ]
            },
            {
                test: /\.less$/,
                use: [{
                    loader: MiniCssExtractPlugin.loader
                }, {
                    loader: "css-loader",
                    options: {
                        esModule: false,
                    }
                }, { loader: "postcss-loader" }, {
                    loader: "less-loader",
                }]
            },
            {
                test: /.(js|ts|jsx|tsx)$/,
                include: path.resolve(__dirname, "../src"),
                use: [{
                    loader: "babel-loader",
                }]
            },
            {
                test: /\.(js|mjs)$/,
                exclude: /core-js/,
                loader: 'babel-loader',
            },
        ]
    },
    resolve: {
        modules: ['node_modules']
    },
    optimization: {
        minimizer: [
            new CssMinimizerPlugin(), //压缩css
            new TerserPlugin(), //压缩js
        ],
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all',
                },
            },
        },
    },
    plugins: [
        new MiniCssExtractPlugin(),
        new htmlWebpackPlugin({
            template: path.resolve(__dirname, "../public/index.html"),
            inject: "body",
        })
    ],
})