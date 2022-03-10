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
        ...envplugins()
    ]
}

module.exports = babelConfig