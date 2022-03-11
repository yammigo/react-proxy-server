
import React,{useEffect,useState, useContext}from "react"
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
    return  <div onClick={switchToggle} className=" overflow-hidden cursor-pointer w-8 bg-white h-8 box-border inline-table align-middle mr-4 rounded-full">
    <div  style={{
    backgroundImage:drak?'none':`url(${light}`,
    backgroundRepeat:"no-repeat",
   "transform":`translateX(${drak?'-10':'0'}px) translateY(${drak?'-3':'0'}px)`
   }}  className={"bg-cover-0.5 bg-center shadow transition-all h-9 w-9 border  rounded-full inline-block align-middle "+(drak?"bg-blue-600":" bg-blue-600")}></div>

</div>
}

export default React.memo(ThemCom)