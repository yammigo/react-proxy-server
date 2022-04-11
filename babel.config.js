/*
 * @Author: fanjiantao
 * @Date: 2022-03-20 13:01:33
 * @LastEditors: OBKoro1
 * @LastEditTime: 2022-04-04 22:14:53
 */
const envpresets = () => {
    if (process.env.NODE_ENV == "production") {
        return [
            ["@babel/preset-env", {
                "modules": false,
                "corejs": 2,
                "useBuiltIns": "usage",
                "targets": {
                    "browsers": ["> 0.2%", "last 2 versions", "not ie <= 8"]
                        // "ie": 9
                }

            }]
        ]
    } else {
        return [

        ]
    }
}

const envplugins = () => {
    if (process.env.NODE_ENV == "production") {
        return [
            "@babel/plugin-transform-runtime"
        ]
    } else {
        return [

        ]
    }
}



const babelConfig = {
    "generatorOpts": {
        "compact": true
    },
    "sourceType": "unambiguous",
    "presets": [
        ...envpresets(),
        "@babel/preset-typescript",
        "@babel/preset-react"
    ],
    "plugins": [
        [
            "import",
            {
                "libraryName": "@icon-park/react",
                "libraryDirectory": "es/icons",
                "camel2DashComponentName": false
            },
            "icon-park"
        ],
        [
            'import',
            {
                "libraryName": '@arco-design/web-react',
                "libraryDirectory": 'es',
                "camel2DashComponentName": false,
                "style": true, // 样式按需加载
            },
            "arco-design"
        ],
        // [
        //     'babel-plugin-import',
        //     {
        //         libraryName: '@arco-design/web-react/icon',
        //         libraryDirectory: 'react-icon',
        //         camel2DashComponentName: false,
        //     },
        // ],
        ...envplugins()
    ]
}

module.exports = babelConfig