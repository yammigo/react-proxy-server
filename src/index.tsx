/*
 * @Author: fanjiantao
 * @Date: 2022-03-20 13:01:34
 * @LastEditors: OBKoro1
 * @LastEditTime: 2022-03-20 16:19:16
 */


import "./scss/index.scss"
import "./scss/base.scss"
import React,{useState,useEffect}from "react"
import ReactDOM from "react-dom"
import {useLang} from "./local/lang/index"
import Home from "./view/home"
import { BrowserRouter,Route,Routes,Link,HashRouter} from "react-router-dom"
import Ctx from "./view/ctx"
import LangCtx from "./context/langCtx"
import Login from "./view/login/index"
import Proxy from "./view/proxy"
import VgEdit from "./view/code_edit"

const App=()=>{
    const currentThem =  window.localStorage.getItem("them")
    const currenLang = window.localStorage.getItem("lang")
    useLang(currenLang||"en")//激活语言选项
    let [langConfig,setLangConfig]= useState({
        lang:"en",
        toggleLang:(arg)=>{
           setLangConfig(arg)
        }
    });
    let [them,toggleThem]=useState(currentThem||"light")
    let [themConfig,setThemConfig]= useState({
         them,
         toggleThem
    })
    useEffect(()=>{
        window.localStorage.setItem("them",them);
        document.querySelector("html").className=them;
        document.body.setAttribute('arco-theme', them);
        setThemConfig({
            them,
            toggleThem
        })
    },[them])
    return (
        <Ctx.Provider value={themConfig}>
            <LangCtx.Provider value={langConfig}>
            <HashRouter>
                    {/* <button className=" bg-blue-600 m-10 border rounded active:bg-blue-500 outline-none appearance-none box-borderc text-gray-200 p-2" onClick={()=>{sevname(vname+1)}}>切换语言</button>
                    <Link to="/home">主页1</Link>
                    <Link to="/tab2">主页2</Link>
                    <Link to="/login">登录</Link>
                    <Link to="/proxy">代理</Link> */}
                    <Routes>
                        <Route path="/" element={<Login/>} />
                        <Route path="/login" element={<Login/>} />
                        <Route path="/home" element={<Home/>} />
                        <Route path="/proxy" element={<Proxy />} />
                        <Route path="/codeEdit" element={<VgEdit />} />
                    </Routes>
            </HashRouter>
            </LangCtx.Provider>
        </Ctx.Provider>
    )
}
ReactDOM.render(<App/>, document.getElementById("root"))