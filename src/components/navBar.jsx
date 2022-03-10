import React,{useState,useContext,useEffect}from "react"

import Ctx from "../view/ctx"
import Lang from "./langToggle"
import ThemCom from "./themToogle"

const navBar = ()=>{
     let ctx = useContext(Ctx)
     return  <div className="h-14 box-border items-center shadow-md flex justify-between bg-blue-600 text-white p-2 w-full fixed top-0  overflow-hidden">
     <span className="  text-sm font-bold">VG_PROXY  version 1.0.0</span>
     <span>
        <span className=" mr-2 font-bold">
           {ctx.them}
        </span>
        <ThemCom></ThemCom>
        <Lang></Lang>
     </span>
 </div>
}
export default React.memo(navBar)