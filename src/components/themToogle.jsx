
import React,{useEffect,useState, useContext}from "react"
import {Sun,Moon} from "@icon-park/react"
import Ctx from "../view/ctx"
import light from "../static/icons/sun-fill.png"
const ThemCom = ()=>{
    let ctx = useContext(Ctx)
    let darkStatus = window.localStorage.getItem("them")=="dark"?true:false;
    const [drak,setDrak] = useState(darkStatus);
    const switchToggle =()=>{
       setDrak(!drak)
       ctx.toggleThem(drak?"light":"dark");
    }
    return  <div onClick={switchToggle} className=" overflow-hidden cursor-pointer w-8  h-8 box-border  rounded-full inline-block mx-2">
        {drak?<Sun theme="outline" size="24" fill="#fff"/>:<Moon theme="outline" size="24" fill="#fff"/>}
       </div>
}

export default React.memo(ThemCom)