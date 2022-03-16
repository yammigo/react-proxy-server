const path = require("path")

module.exports = {
    entry: {
        index: path.resolve(__dirname, "../src/index")
    },
    output: {
        path: path.resolve(__dirname, "../dist"),
        filename: "[name].[hash].js"
    },
    module: {
        rules: [

            {
                test: /\.(png|jpg|gif|jpeg)$/,
                include: path.resolve(__dirname, "../src"),
                use: [{
                    loader: "url-loader",
                    options: {
                        limit: 10 * 1024, //如果图片小于10k，就使用base64处理
                        name: `static\/images\/[name].[hash].[ext]`
                    }
                }],
            },
            {
                test: /\.(eot|ttf|woff|woff2)(\?.*)?$/,
                include: path.resolve(__dirname, "../src"),
                use: [{
                    loader: "file-loader",
                    options: {
                        name: `static\/fonts\/[name].[ext]`,

                    }
                }],

            },
            {
                include: path.resolve(__dirname, "../src"),
                test: /\.(svg)(\?.*)?$/,
                use: [{
                    loader: "file-loader",
                    options: {
                        name: `static\/images\/svg\/[name].[hash].[ext]`,
                    }
                }],
            },
            {
                test: /.(ts)$/,
                include: path.resolve(__dirname, "../src"),
                use: [{
                    loader: "ts-loader"
                }]
            }

        ]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.tsx'],
    },
}