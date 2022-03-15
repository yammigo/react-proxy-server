import en from "./en"
import zh_cn from "./zh_cn"
/**import base language */
let currentLang = "en"

let language = {
        "en": en,
        "zh_cn": zh_cn
    }
    // console.log(language, "当前语言列表")

export function useLang(lang) {
    currentLang = lang || "en"
}

export function $lan(text, source) {

    /*兼容局部源利于语言扩展*/
    if (typeof source == "undefined") {
        return language[currentLang][text]
    } else {
        return source[currentLang][text]
    }
}

/**自行实现语言切换功能 */