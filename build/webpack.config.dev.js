const { merge } = require("webpack-merge")
const webpack = require("webpack")
const path = require("path")
const baseconfig = require("./webpack.config.base")
const htmlWebpackPlugin = require("html-webpack-plugin")
module.exports = merge(baseconfig, {
    mode: "development",
    devtool: 'source-map',
    module: {
        rules: [{
                test: /\.css$/i,
                use: [{
                        loader: "style-loader"
                    },
                    {
                        loader: "postcss-loader",
                    },
                ]
            },
            {
                test: /\.s[ac]ss$/,
                use: [{
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader",
                        options: {
                            esModule: false,
                        }
                    },
                    {
                        loader: "postcss-loader",
                    },

                    {
                        loader: "sass-loader",
                    }
                ]
            },
            {
                test: /\.less$/,
                use: [{
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader",
                        options: {
                            esModule: false,
                        }
                    },
                    {
                        loader: "postcss-loader",
                    },

                    {
                        loader: "less-loader",
                    },

                ]
            },
            {
                test: /.(js|ts|jsx|tsx)$/,
                include: path.resolve(__dirname, "../src"),
                exclude: path.resolve(__dirname, "../node_modules"),
                use: [{
                    loader: "babel-loader"
                }]
            },
        ]
    },
    plugins: [
        new htmlWebpackPlugin({
            template: path.resolve(__dirname, "../public/index.html"),
            inject: "body",
        }),

        // new webpack.HotModuleReplacementPlugin(),
    ],
    devServer: {
        open: true,
        hot: true,
        compress: false,
        port: 9000,
    }
})