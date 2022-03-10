import React,{useState,useContext}from "react"
import langCtx from "../context/langCtx"
import { useLang } from "../local/lang"
const Lang= ()=>{
     const ctx = useContext(langCtx);
     const [lang,toggleLang] = useState(window.localStorage.getItem("lang")||"en")
     return <select value={lang} onChange={(e)=>{
         window.localStorage.setItem("lang",e.target.value)
         useLang(e.target.value)
         toggleLang(e.target.value)
         ctx.toggleLang({
             lang:e.target.value,
             toggleLang:ctx.toggleLang
         });
     }} className=" h-7 test-sm cursor-pointer text-blue-600 w-28 rounded-sm px-2 shadow-md">
        <option value="zh_cn">简体中文</option>
        <option value="en">English</option>
    </select>
}
export default React.memo(Lang)